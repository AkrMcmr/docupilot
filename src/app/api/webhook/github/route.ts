import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {
  getInstallationToken,
  getRepoTree,
  getFileContent,
  getFileSha,
  createOrUpdateFile,
  createBranch,
  getBranchSha,
  createPullRequest,
} from "@/lib/github";
import { generateDocs } from "@/lib/generate-docs";
import { parseConfig, DEFAULT_CONFIG, type DocuPilotConfig } from "@/lib/config";
import { logActivity } from "@/lib/activity";

function verifySignature(payload: string, signature: string | null): boolean {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const expected =
    "sha256=" +
    crypto.createHmac("sha256", secret).update(payload).digest("hex");
  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (sigBuf.length !== expectedBuf.length) return false;
  return crypto.timingSafeEqual(sigBuf, expectedBuf);
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("x-hub-signature-256");
  const event = request.headers.get("x-github-event");

  if (process.env.GITHUB_WEBHOOK_SECRET) {
    if (!verifySignature(body, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  const payload = JSON.parse(body);

  if (event === "push") {
    const repoFullName = payload.repository?.full_name;
    const branch = payload.ref?.replace("refs/heads/", "");
    const commits = payload.commits || [];
    const installationId = payload.installation?.id;

    console.log(
      `[DocuPilot] Push received: ${repoFullName}@${branch} (${commits.length} commits)`
    );

    // Skip if push is from DocuPilot itself (avoid infinite loops)
    if (branch?.startsWith("docupilot/")) {
      return NextResponse.json({ status: "skipped", reason: "docupilot branch" });
    }

    if (!installationId) {
      return NextResponse.json({ status: "skipped", reason: "no installation id" });
    }

    // Process async - respond immediately, generate docs in background
    processDocGeneration(repoFullName, branch, commits, installationId).catch(
      (err) => {
        console.error(`[DocuPilot] Doc generation failed for ${repoFullName}@${branch}:`, err.message || err);
        logActivity({
          type: "docs_failed",
          repo: repoFullName,
          branch,
          error: err.message || String(err),
        }).catch(() => {});
      }
    );

    return NextResponse.json({
      status: "queued",
      repo: repoFullName,
      branch,
      commits: commits.length,
    });
  }

  if (event === "installation" || event === "installation_repositories") {
    const action = payload.action;
    const sender = payload.sender?.login;
    console.log(`[DocuPilot] App ${action} by ${sender}`);

    if (action === "created") {
      const repos = payload.repositories?.map((r: { full_name: string }) => r.full_name) || [];
      for (const repoName of repos) {
        await logActivity({ type: "app_installed", repo: repoName, userId: sender });
      }
    } else if (action === "deleted") {
      await logActivity({ type: "app_uninstalled", repo: sender || "unknown", userId: sender });
    }

    return NextResponse.json({ status: "ok", event, action });
  }

  return NextResponse.json({ status: "ignored", event });
}

async function processDocGeneration(
  repoFullName: string,
  branch: string,
  commits: { message: string; added: string[]; modified: string[]; removed: string[] }[],
  installationId: number
) {
  const [owner, repo] = repoFullName.split("/");
  const token = await getInstallationToken(installationId);

  console.log(`[DocuPilot] Generating docs for ${repoFullName}@${branch} (installation: ${installationId})`);
  console.log(`[DocuPilot] Token obtained, length: ${token.length}`);

  // 0. Read .docupilot.yml config if it exists
  let config: DocuPilotConfig = DEFAULT_CONFIG;
  try {
    const configYaml = await getFileContent(token, owner, repo, ".docupilot.yml", branch);
    config = parseConfig(configYaml);
    console.log(`[DocuPilot] Config loaded: generate=${JSON.stringify(config.generate)}, language=${config.language}`);
  } catch {
    console.log(`[DocuPilot] No .docupilot.yml found, using defaults`);
  }

  // Skip if nothing to generate
  if (!config.generate.readme && !config.generate.changelog && !config.generate.api_docs) {
    console.log("[DocuPilot] All doc types disabled in config, skipping");
    return;
  }

  // 1. Fetch repo tree and source files
  const tree = await getRepoTree(token, owner, repo, branch);
  console.log(`[DocuPilot] Tree fetched: ${tree.length} entries`);

  const ignorePatterns = config.ignore.map((pattern) => {
    const regex = pattern.replace(/\*\*/g, ".*").replace(/\*/g, "[^/]*");
    return new RegExp(`^${regex}$`);
  });

  const sourceFiles = tree.filter(
    (f) =>
      f.type === "blob" &&
      (f.size ?? 0) < 50000 &&
      /\.(ts|tsx|js|jsx|py|go|rs|java|rb)$/.test(f.path) &&
      !f.path.includes("node_modules") &&
      !f.path.includes(".next") &&
      !ignorePatterns.some((re) => re.test(f.path))
  );

  // Read up to 20 source files
  const fileContents = await Promise.all(
    sourceFiles.slice(0, 20).map(async (f) => {
      try {
        const content = await getFileContent(token, owner, repo, f.path, branch);
        return { path: f.path, content };
      } catch {
        return null;
      }
    })
  );
  const validFiles = fileContents.filter(Boolean) as { path: string; content: string }[];
  console.log(`[DocuPilot] Source files: ${sourceFiles.length} found, ${validFiles.length} read`);

  // 2. Get existing docs
  let existingReadme: string | undefined;
  let existingChangelog: string | undefined;
  if (config.generate.readme) {
    try {
      existingReadme = await getFileContent(token, owner, repo, "README.md", branch);
    } catch { /* no existing readme */ }
  }
  if (config.generate.changelog) {
    try {
      existingChangelog = await getFileContent(token, owner, repo, "CHANGELOG.md", branch);
    } catch { /* no existing changelog */ }
  }

  console.log(`[DocuPilot] Existing README: ${existingReadme ? 'yes' : 'no'}, CHANGELOG: ${existingChangelog ? 'yes' : 'no'}`);

  // 3. Generate docs with Claude
  console.log(`[DocuPilot] Calling Claude API...`);
  const docs = await generateDocs(validFiles, commits, existingReadme, existingChangelog, config);
  console.log(`[DocuPilot] Claude response: README=${!!docs.readme}, CHANGELOG=${!!docs.changelog}`);

  if (!docs.readme && !docs.changelog) {
    console.log("[DocuPilot] No docs to update");
    return;
  }

  // 4. Create branch and PR
  const branchName = `docupilot/update-docs-${Date.now()}`;
  const baseSha = await getBranchSha(token, owner, repo, branch);
  await createBranch(token, owner, repo, branchName, baseSha);

  // 5. Update files on the new branch
  if (docs.readme) {
    const readmeSha = await getFileSha(token, owner, repo, "README.md", branchName);
    await createOrUpdateFile(
      token, owner, repo, "README.md", docs.readme,
      "docs: update README.md via DocuPilot", branchName, readmeSha
    );
  }

  if (docs.changelog) {
    const changelogSha = await getFileSha(token, owner, repo, "CHANGELOG.md", branchName);
    await createOrUpdateFile(
      token, owner, repo, "CHANGELOG.md", docs.changelog,
      "docs: update CHANGELOG.md via DocuPilot", branchName, changelogSha
    );
  }

  // 6. Create PR
  const pr = await createPullRequest(
    token, owner, repo,
    "📝 DocuPilot: Update documentation",
    "This PR was automatically generated by [DocuPilot](https://docupilot-alpha.vercel.app).\n\nDocuPilot analyzed your latest code changes and updated the documentation accordingly.",
    branchName, branch
  );
  console.log(`[DocuPilot] PR created: ${pr.html_url}`);

  const filesUpdated = [
    ...(docs.readme ? ["README.md"] : []),
    ...(docs.changelog ? ["CHANGELOG.md"] : []),
  ];
  await logActivity({
    type: "docs_generated",
    repo: repoFullName,
    branch,
    prUrl: pr.html_url,
    filesUpdated,
  });
}
