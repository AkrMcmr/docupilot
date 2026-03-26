import Anthropic from "@anthropic-ai/sdk";
import { type DocuPilotConfig, DEFAULT_CONFIG } from "./config";

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
  config: DocuPilotConfig = DEFAULT_CONFIG,
): Promise<GeneratedDocs> {
  const filesSummary = repoFiles
    .map((f) => `### ${f.path}\n\`\`\`\n${f.content.slice(0, 3000)}\n\`\`\``)
    .join("\n\n");

  const commitsSummary = commits
    .map((c) => `- ${c.message} (added: ${c.added.join(", ")}, modified: ${c.modified.join(", ")})`)
    .join("\n");

  const docTypes: string[] = [];
  if (config.generate.readme) {
    docTypes.push(`**readme**: A comprehensive README.md with: project title, description, features, installation, usage, API reference (if applicable), and contributing section. If an existing README exists, update it with new information while preserving its structure.`);
  }
  if (config.generate.changelog) {
    docTypes.push(`**changelog**: A CHANGELOG.md entry for the latest changes based on the commits. Use Keep a Changelog format. If an existing CHANGELOG exists, prepend the new entry.`);
  }

  const languageInstruction = config.language !== "en"
    ? `\n\nIMPORTANT: Write ALL documentation in ${config.language}. Code examples and technical terms can remain in English.`
    : "";

  const customInstruction = config.custom_instructions
    ? `\n\nAdditional instructions from the repository owner: ${config.custom_instructions}`
    : "";

  const prompt = `You are DocuPilot, an AI that generates project documentation.

Analyze the following codebase and recent commits, then generate updated documentation.

## Recent Commits
${commitsSummary}

## Source Files
${filesSummary}

${config.generate.readme && existingReadme ? `## Current README.md\n${existingReadme}` : config.generate.readme ? "## No existing README.md" : ""}

${config.generate.changelog && existingChangelog ? `## Current CHANGELOG.md\n${existingChangelog}` : config.generate.changelog ? "## No existing CHANGELOG.md" : ""}

Generate the following as a JSON object with keys "readme" and "changelog" (set to null if not requested):

${docTypes.map((d, i) => `${i + 1}. ${d}`).join("\n\n")}${languageInstruction}${customInstruction}

Respond ONLY with valid JSON. No markdown code fences.`;

  let message;
  try {
    message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error(`[DocuPilot] Claude API error: ${errMsg}`);
    throw new Error(`Claude API call failed: ${errMsg}`);
  }

  const text = message.content[0].type === "text" ? message.content[0].text : "";

  try {
    return JSON.parse(text) as GeneratedDocs;
  } catch {
    // Try to extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as GeneratedDocs;
    }
    console.error(`[DocuPilot] Failed to parse Claude response: ${text.slice(0, 500)}`);
    throw new Error("Failed to parse Claude response as JSON");
  }
}
