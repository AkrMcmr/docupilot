import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

interface GeneratedDocs {
  readme?: string;
  changelog?: string;
}

export async function generateDocs(
  repoFiles: { path: string; content: string }[],
  commits: { message: string; added: string[]; modified: string[]; removed: string[] }[],
  existingReadme?: string,
  existingChangelog?: string,
): Promise<GeneratedDocs> {
  const filesSummary = repoFiles
    .map((f) => `### ${f.path}\n\`\`\`\n${f.content.slice(0, 3000)}\n\`\`\``)
    .join("\n\n");

  const commitsSummary = commits
    .map((c) => `- ${c.message} (added: ${c.added.join(", ")}, modified: ${c.modified.join(", ")})`)
    .join("\n");

  const prompt = `You are DocuPilot, an AI that generates project documentation.

Analyze the following codebase and recent commits, then generate updated documentation.

## Recent Commits
${commitsSummary}

## Source Files
${filesSummary}

${existingReadme ? `## Current README.md\n${existingReadme}` : "## No existing README.md"}

${existingChangelog ? `## Current CHANGELOG.md\n${existingChangelog}` : "## No existing CHANGELOG.md"}

Generate the following as a JSON object with keys "readme" and "changelog":

1. **readme**: A comprehensive README.md with: project title, description, features, installation, usage, API reference (if applicable), and contributing section. If an existing README exists, update it with new information while preserving its structure.

2. **changelog**: A CHANGELOG.md entry for the latest changes based on the commits. Use Keep a Changelog format. If an existing CHANGELOG exists, prepend the new entry.

Respond ONLY with valid JSON. No markdown code fences.`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";

  try {
    return JSON.parse(text) as GeneratedDocs;
  } catch {
    // Try to extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as GeneratedDocs;
    }
    throw new Error("Failed to parse Claude response as JSON");
  }
}
