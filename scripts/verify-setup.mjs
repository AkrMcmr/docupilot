#!/usr/bin/env node
// verify-setup.mjs — Checks that all external services are configured and reachable.
// Run: node scripts/verify-setup.mjs
//
// Requires env vars to be set (via .env.local or environment).

import https from "node:https";

function fetchJSON(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const req = https.request(
      {
        hostname: urlObj.hostname,
        path: urlObj.pathname + urlObj.search,
        method: options.method || "GET",
        headers: options.headers || {},
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode, data });
        });
      }
    );
    req.on("error", reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

const CHECKS = [
  {
    name: "GITHUB_APP_ID",
    envVar: "GITHUB_APP_ID",
    required: true,
  },
  {
    name: "GITHUB_APP_PRIVATE_KEY",
    envVar: "GITHUB_APP_PRIVATE_KEY",
    required: true,
    validate: (v) => v.includes("BEGIN") && v.includes("PRIVATE KEY"),
    hint: "Should be a PEM-formatted private key",
  },
  {
    name: "GITHUB_WEBHOOK_SECRET",
    envVar: "GITHUB_WEBHOOK_SECRET",
    required: true,
  },
  {
    name: "GITHUB_OAUTH_CLIENT_ID",
    envVar: "GITHUB_OAUTH_CLIENT_ID",
    required: true,
  },
  {
    name: "GITHUB_OAUTH_CLIENT_SECRET",
    envVar: "GITHUB_OAUTH_CLIENT_SECRET",
    required: true,
  },
  {
    name: "ANTHROPIC_API_KEY",
    envVar: "ANTHROPIC_API_KEY",
    required: true,
    validate: (v) => v.startsWith("sk-ant-"),
    hint: "Should start with sk-ant-",
  },
  {
    name: "STRIPE_SECRET_KEY",
    envVar: "STRIPE_SECRET_KEY",
    required: true,
    validate: (v) => v.startsWith("sk_"),
    hint: "Should start with sk_test_ or sk_live_",
  },
  {
    name: "STRIPE_STARTER_PRICE_ID",
    envVar: "STRIPE_STARTER_PRICE_ID",
    required: true,
    validate: (v) => v.startsWith("price_"),
    hint: "Should start with price_",
  },
  {
    name: "STRIPE_PRO_PRICE_ID",
    envVar: "STRIPE_PRO_PRICE_ID",
    required: true,
    validate: (v) => v.startsWith("price_"),
    hint: "Should start with price_",
  },
  {
    name: "STRIPE_WEBHOOK_SECRET",
    envVar: "STRIPE_WEBHOOK_SECRET",
    required: true,
    validate: (v) => v.startsWith("whsec_"),
    hint: "Should start with whsec_",
  },
  {
    name: "SESSION_SECRET",
    envVar: "SESSION_SECRET",
    required: true,
    validate: (v) => v.length >= 32,
    hint: "Should be at least 32 characters",
  },
];

async function checkAnthropicAPI(apiKey) {
  try {
    const body = JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 5,
      messages: [{ role: "user", content: "Hi" }],
    });
    const res = await fetchJSON("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body,
    });
    if (res.ok) return { ok: true };
    try {
      const parsed = JSON.parse(res.data);
      return { ok: false, error: `${res.status} ${parsed?.error?.message || ""}` };
    } catch {
      return { ok: false, error: `${res.status}` };
    }
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

async function checkStripeAPI(secretKey) {
  try {
    const res = await fetchJSON("https://api.stripe.com/v1/products?limit=1", {
      headers: { Authorization: `Bearer ${secretKey}` },
    });
    if (res.ok) return { ok: true };
    return { ok: false, error: `${res.status}` };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

async function checkGitHubApp(appId) {
  // Without JWT auth, we just check the env var format
  return { ok: /^\d+$/.test(appId), note: "Format OK (auth test requires JWT)" };
}

async function main() {
  console.log("\n  DocuPilot Setup Verification\n");
  console.log("=".repeat(50));

  let passed = 0;
  let failed = 0;
  let warnings = 0;

  // Check env vars
  console.log("\n[ENV VARS]\n");
  for (const check of CHECKS) {
    const value = process.env[check.envVar];
    if (!value) {
      console.log(`  FAIL  ${check.name} — not set`);
      failed++;
      continue;
    }
    if (check.validate && !check.validate(value)) {
      console.log(`  WARN  ${check.name} — set but ${check.hint}`);
      warnings++;
      continue;
    }
    console.log(`  OK    ${check.name}`);
    passed++;
  }

  // Live API checks
  console.log("\n[API CONNECTIVITY]\n");

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (anthropicKey) {
    const result = await checkAnthropicAPI(anthropicKey);
    if (result.ok) {
      console.log("  OK    Anthropic API — connected");
      passed++;
    } else {
      console.log(`  FAIL  Anthropic API — ${result.error}`);
      failed++;
    }
  } else {
    console.log("  SKIP  Anthropic API — no key");
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (stripeKey) {
    const result = await checkStripeAPI(stripeKey);
    if (result.ok) {
      console.log("  OK    Stripe API — connected");
      passed++;
    } else {
      console.log(`  FAIL  Stripe API — ${result.error}`);
      failed++;
    }
  } else {
    console.log("  SKIP  Stripe API — no key");
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log(`\n  Passed: ${passed}  Failed: ${failed}  Warnings: ${warnings}\n`);

  if (failed === 0 && warnings === 0) {
    console.log("  All checks passed! Ready for launch.\n");
  } else if (failed > 0) {
    console.log("  Fix the FAIL items above before launching.\n");
  }

  process.exit(failed > 0 ? 1 : 0);
}

main();
