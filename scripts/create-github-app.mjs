#!/usr/bin/env node
/**
 * GitHub App Manifest Flow - Automated Setup
 *
 * 1. Opens browser with auto-submit form to GitHub
 * 2. User approves on GitHub
 * 3. GitHub redirects to local callback
 * 4. Exchanges code for app credentials
 * 5. Outputs credentials as JSON
 */

import http from 'node:http';
import { execSync } from 'node:child_process';

const PORT = 3456;

const MANIFEST = JSON.stringify({
  name: "DocuPilot",
  url: "https://docupilot-alpha.vercel.app",
  hook_attributes: {
    url: "https://docupilot-alpha.vercel.app/api/webhook/github",
    active: true,
  },
  redirect_url: `http://localhost:${PORT}/callback`,
  description: "AI-powered documentation generator. Automatically updates README, API docs, and CHANGELOG on every push.",
  public: true,
  default_events: ["push", "installation", "installation_repositories"],
  default_permissions: {
    contents: "read",
    pull_requests: "write",
    metadata: "read",
  },
});

const html = `<!DOCTYPE html>
<html><body>
<p>Redirecting to GitHub to create DocuPilot app...</p>
<form id="f" action="https://github.com/settings/apps/new?state=docupilot" method="post">
  <input type="hidden" name="manifest" value='${MANIFEST.replace(/'/g, "&#39;")}'>
</form>
<script>document.getElementById('f').submit()</script>
</body></html>`;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname === '/callback') {
    const code = url.searchParams.get('code');
    if (!code) {
      res.writeHead(400);
      res.end('Missing code parameter');
      return;
    }

    try {
      const token = execSync('gh auth token', { encoding: 'utf-8' }).trim();
      const response = await fetch(
        `https://api.github.com/app-manifests/${code}/conversions`,
        {
          method: 'POST',
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github+json',
          },
        }
      );
      const data = await response.json();

      if (data.id) {
        // Save credentials to file
        const creds = {
          GITHUB_APP_ID: String(data.id),
          GITHUB_APP_NAME: data.name,
          GITHUB_CLIENT_ID: data.client_id,
          GITHUB_CLIENT_SECRET: data.client_secret,
          GITHUB_WEBHOOK_SECRET: data.webhook_secret,
          GITHUB_PRIVATE_KEY: data.pem,
          INSTALL_URL: data.html_url + '/installations/new',
        };

        const credsPath = new URL('../.github-app-credentials.json', import.meta.url).pathname;
        const fs = await import('node:fs');
        fs.writeFileSync(credsPath, JSON.stringify(creds, null, 2));

        console.log('\n✅ GitHub App created successfully!');
        console.log(`   App ID: ${creds.GITHUB_APP_ID}`);
        console.log(`   App Name: ${creds.GITHUB_APP_NAME}`);
        console.log(`   Credentials saved to: ${credsPath}`);
        console.log(`\n   Install the app: ${creds.INSTALL_URL}`);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<!DOCTYPE html><html><body style="font-family:sans-serif;padding:40px;text-align:center">
          <h1>✅ DocuPilot GitHub App Created!</h1>
          <p>App ID: <strong>${creds.GITHUB_APP_ID}</strong></p>
          <p>Credentials saved. You can close this window.</p>
          <p><a href="${creds.INSTALL_URL}" style="display:inline-block;margin-top:20px;padding:12px 24px;background:#238636;color:white;border-radius:8px;text-decoration:none">Install DocuPilot on a Repository</a></p>
        </body></html>`);
      } else {
        console.error('❌ Error:', JSON.stringify(data, null, 2));
        res.writeHead(500);
        res.end('Error creating app. Check terminal.');
      }
    } catch (err) {
      console.error('❌ Error:', err.message);
      res.writeHead(500);
      res.end('Error: ' + err.message);
    }

    setTimeout(() => { server.close(); process.exit(0); }, 2000);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  }
});

server.listen(PORT, () => {
  console.log(`\n🚀 GitHub App setup server running on http://localhost:${PORT}`);
  console.log('   Opening browser...\n');
  try {
    execSync(`open http://localhost:${PORT}`);
  } catch {
    console.log(`   Please open http://localhost:${PORT} in your browser`);
  }
});
