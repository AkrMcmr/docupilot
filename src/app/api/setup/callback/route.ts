import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code parameter" }, { status: 400 });
  }

  // Exchange the code for the app's credentials
  const response = await fetch(
    `https://api.github.com/app-manifests/${code}/conversions`,
    {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    return NextResponse.json(
      { error: "Failed to create GitHub App", details: error },
      { status: 500 }
    );
  }

  const appData = await response.json();

  // Log the important credentials (in production, store these securely)
  console.log("[DocuPilot Setup] GitHub App created successfully!");
  console.log(`  App ID: ${appData.id}`);
  console.log(`  App Name: ${appData.name}`);
  console.log(`  Client ID: ${appData.client_id}`);
  console.log(`  Webhook Secret: ${appData.webhook_secret}`);
  // Private key and client_secret are also in appData - store securely

  // Redirect to success page with app info
  const installUrl = `https://github.com/apps/${appData.slug}/installations/new`;

  return new NextResponse(
    `<!DOCTYPE html>
<html>
<head><title>DocuPilot - Setup Complete</title></head>
<body style="background:#0a0a0a;color:white;font-family:system-ui;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0">
<div style="max-width:600px;text-align:center;padding:2rem">
  <h1 style="color:#22c55e">✓ GitHub App Created!</h1>
  <p>App ID: <strong>${appData.id}</strong></p>
  <p>App Name: <strong>${appData.name}</strong></p>
  <p style="color:#9ca3af;font-size:0.875rem;margin-top:1rem">
    Important: Save these environment variables to Vercel:<br>
    <code>GITHUB_APP_ID=${appData.id}</code><br>
    <code>GITHUB_APP_PRIVATE_KEY=...</code> (check server logs)<br>
    <code>GITHUB_CLIENT_ID=${appData.client_id}</code>
  </p>
  <a href="${installUrl}"
     style="display:inline-block;margin-top:1.5rem;padding:0.75rem 1.5rem;background:#22c55e;color:white;border-radius:0.5rem;text-decoration:none;font-weight:600">
    Install DocuPilot on Your Repos →
  </a>
</div>
</body>
</html>`,
    {
      headers: { "Content-Type": "text/html" },
    }
  );
}
