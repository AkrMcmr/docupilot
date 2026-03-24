"use client";

const MANIFEST = {
  name: "DocuPilot",
  url: "https://docupilot-alpha.vercel.app",
  hook_attributes: {
    url: "https://docupilot-alpha.vercel.app/api/webhook/github",
    active: true,
  },
  redirect_url:
    "https://docupilot-alpha.vercel.app/api/setup/callback",
  description:
    "AI-powered documentation generator. Automatically updates README, API docs, and CHANGELOG on every push.",
  public: true,
  default_events: ["push", "installation", "installation_repositories"],
  default_permissions: {
    contents: "read",
    pull_requests: "write",
    metadata: "read",
  },
};

export default function SetupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold">DocuPilot Setup</h1>
        <p className="text-gray-400">
          Create the DocuPilot GitHub App with one click. This will register the
          app on your GitHub account.
        </p>
        <form
          action="https://github.com/settings/apps/new?state=docupilot"
          method="post"
        >
          <input
            type="hidden"
            name="manifest"
            value={JSON.stringify(MANIFEST)}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-semibold text-lg transition-colors"
          >
            Create GitHub App
          </button>
        </form>
      </div>
    </div>
  );
}
