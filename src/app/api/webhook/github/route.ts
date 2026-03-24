import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

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

  // Verify webhook signature in production
  if (process.env.GITHUB_WEBHOOK_SECRET) {
    if (!verifySignature(body, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  const payload = JSON.parse(body);

  if (event === "push") {
    const repo = payload.repository?.full_name;
    const branch = payload.ref?.replace("refs/heads/", "");
    const commits = payload.commits || [];

    console.log(
      `[DocuPilot] Push received: ${repo}@${branch} (${commits.length} commits)`
    );

    // TODO: Queue documentation generation job
    // 1. Fetch repo contents via GitHub API
    // 2. Analyze code changes in the push
    // 3. Generate/update docs using Claude API
    // 4. Create PR with updated docs

    return NextResponse.json({
      status: "queued",
      repo,
      branch,
      commits: commits.length,
    });
  }

  if (event === "installation" || event === "installation_repositories") {
    const action = payload.action;
    const sender = payload.sender?.login;
    console.log(`[DocuPilot] App ${action} by ${sender}`);

    // TODO: Store installation info in database

    return NextResponse.json({ status: "ok", event, action });
  }

  return NextResponse.json({ status: "ignored", event });
}
