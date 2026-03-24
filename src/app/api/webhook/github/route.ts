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

function verifySignature(payload: string, signature: string | null): boolean {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const expected =
    "sha256=" +
    crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
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
      (err) => console.error("[DocuPilot] Doc generation failed:", err)
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

  console.log(`[DocuPilot] Generating docs for ${repoFullName}@${branch}`);

  // 1. Fetch repo tree and source files
  const tree = await getRepoTree(token, owner, repo, branch);
  const sourceFiles = tree.filter(
    (f) =>
      f.type === "blob" &&
      (f.size ?? 0) < 50000 &&
      /\.(ts|tsx|js|jsx|py|go|rs|java|rb)$/.test(f.path) &&
      !f.path.includes("node_modules") &&
      !f.path.includes(".next")
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

  // 2. Get existing docs
  let existingReadme: string | undefined;
  let existingChangelog: string | undefined;
  try {
    existingReadme = await getFileContent(token, owner, repo, "README.md", branch);
  } catch { /* no existing readme */ }
  try {
    existingChangelog = await getFileContent(token, owner, repo, "CHANGELOG.md", branch);
  } catch { /* no existing changelog */ }

  // 3. Generate docs with Claude
  const docs = await generateDocs(validFiles, commits, existingReadme, existingChangelog);

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
}
