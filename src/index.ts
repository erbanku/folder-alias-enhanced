import * as fs from "node:fs";
import type { UseFileAliasReturn } from "./file-alias";
import { defineExtension } from "reactive-vscode";
import { joinURL } from "ufo";
import { workspace } from "vscode";
import { registerCommands } from "./command";
import { config } from "./config";
import { useFileAlias } from "./file-alias";
import { addToGitignore, writeConfig } from "./utils/file.util";
import { shouldShowWelcomePage, showWelcomePage } from "./views/welcome";

const { activate, deactivate } = defineExtension(async (context) => {
  // Show welcome page on first install
  if (shouldShowWelcomePage(context)) {
    showWelcomePage(context);
  }

  if (!workspace.workspaceFolders) {
    return;
  }

  const fileAliasMap = new Map<string, UseFileAliasReturn>();

  for (let index = 0; index < workspace.workspaceFolders.length; index++) {
    const ws = workspace.workspaceFolders[index];
    const workspaceDir: string = ws.uri.fsPath;
    const vscodeDir = joinURL(workspaceDir, ".vscode");
    if (!fs.existsSync(vscodeDir))
      fs.mkdirSync(vscodeDir);
    const configPath = joinURL(vscodeDir, "public-folder-alias.json");
    const privateConfigPath = joinURL(vscodeDir, "private-folder-alias.json");

    // Only auto-create if the setting is enabled
    if (config.autoCreatePublicConfig && !fs.existsSync(configPath)) {
      writeConfig(configPath, {});
    }
    if (config.autoCreatePrivateConfig && !fs.existsSync(privateConfigPath)) {
      writeConfig(privateConfigPath, {});
    }

    if (config.autoAddPrivateToGitignore) {
      const gitignorePath = joinURL(workspaceDir, ".gitignore");
      addToGitignore(gitignorePath, ".vscode/private-folder-alias.json");
    }

    const fileAlias = useFileAlias(ws.uri);
    fileAliasMap.set(ws.uri.toString(), fileAlias);
  }

  registerCommands(fileAliasMap, context);
});

export { activate, deactivate };
