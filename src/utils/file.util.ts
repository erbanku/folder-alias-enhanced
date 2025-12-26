import type { RecordConfig } from "../typings/common.typing";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { destr } from "destr";

function readConfig(configPath: string): RecordConfig {
  if (!existsSync(configPath)) {
    return {};
  }
  return destr(readFileSync(configPath).toString());
}

function writeConfig(configPath: string, config: RecordConfig): void {
  try {
    console.log('[folder-alias] Writing config to:', configPath);
    const dir = dirname(configPath);
    console.log('[folder-alias] Directory:', dir);
    if (!existsSync(dir)) {
      console.log('[folder-alias] Creating directory:', dir);
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(configPath, JSON.stringify(config, null, 4));
    console.log('[folder-alias] Successfully wrote config file');
  } catch (error) {
    console.error('[folder-alias] Error writing config:', error);
    throw error;
  }
}

function addToGitignore(gitignorePath: string, entry: string): void {
  if (!existsSync(gitignorePath)) {
    writeFileSync(gitignorePath, `${entry}\n`);
    return;
  }
  const content = readFileSync(gitignorePath, "utf-8");
  if (!content.includes(entry)) {
    const prefix = content.length > 0 && !content.endsWith("\n") ? "\n" : "";
    writeFileSync(gitignorePath, `${content}${prefix}${entry}\n`);
  }
}

export { readConfig, writeConfig, addToGitignore };
