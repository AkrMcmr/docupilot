// Parse .docupilot.yml config from a repository.
// Uses a simple YAML subset parser (no external dependency).
//
// Supported keys: generate (readme/changelog/api_docs), language,
// ignore (glob patterns), auto_merge, custom_instructions

export interface DocuPilotConfig {
  generate: {
    readme: boolean;
    changelog: boolean;
    api_docs: boolean;
  };
  language: string;
  ignore: string[];
  auto_merge: boolean;
  custom_instructions: string | null;
}

const DEFAULT_CONFIG: DocuPilotConfig = {
  generate: { readme: true, changelog: true, api_docs: false },
  language: "en",
  ignore: [],
  auto_merge: false,
  custom_instructions: null,
};

/**
 * Parse a simple YAML config. Handles flat keys, nested one-level objects,
 * and arrays with "- item" syntax. No external deps needed.
 */
export function parseConfig(yamlContent: string): DocuPilotConfig {
  const config = structuredClone(DEFAULT_CONFIG);
  const lines = yamlContent.split("\n");

  let currentSection: string | null = null;
  let currentArray: string[] | null = null;

  for (const line of lines) {
    const trimmed = line.trimEnd();

    // Skip comments and empty lines
    if (!trimmed || trimmed.startsWith("#")) continue;

    // Array item
    if (trimmed.match(/^\s+-\s+/)) {
      const value = trimmed.replace(/^\s+-\s+/, "").replace(/^["']|["']$/g, "");
      if (currentArray) {
        currentArray.push(value);
      }
      continue;
    }

    // Key-value pair
    const kvMatch = trimmed.match(/^(\s*)(\w+):\s*(.*)$/);
    if (!kvMatch) continue;

    const indent = kvMatch[1].length;
    const key = kvMatch[2];
    const rawValue = kvMatch[3].trim();

    if (indent === 0) {
      currentSection = key;
      currentArray = null;

      if (!rawValue) {
        // Section header (like "generate:" or "ignore:")
        if (key === "ignore") {
          currentArray = config.ignore = [];
        }
        continue;
      }

      // Top-level scalar
      switch (key) {
        case "language":
          config.language = rawValue.replace(/^["']|["']$/g, "");
          break;
        case "auto_merge":
          config.auto_merge = rawValue === "true";
          break;
        case "custom_instructions":
          config.custom_instructions = rawValue.replace(/^["']|["']$/g, "");
          break;
      }
    } else if (indent > 0 && currentSection === "generate") {
      const boolVal = rawValue === "true";
      if (key === "readme") config.generate.readme = boolVal;
      if (key === "changelog") config.generate.changelog = boolVal;
      if (key === "api_docs") config.generate.api_docs = boolVal;
    }
  }

  return config;
}

export { DEFAULT_CONFIG };
