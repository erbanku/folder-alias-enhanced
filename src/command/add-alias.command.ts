import type { UseFileAliasReturn } from "../file-alias";
import { useCommand } from "reactive-vscode";
import * as vscode from "vscode";
import { config } from "../config";

function registerCommands(contextMap: Map<string, UseFileAliasReturn>) {
  function getContext(uri: vscode.Uri) {
    const ws = vscode.workspace.getWorkspaceFolder(uri);
    if (!ws) return undefined;
    const fileAlias = contextMap.get(ws.uri.toString());
    return { ws, fileAlias };
  }

  // Helper function to check if a folder has an alias
  function hasAlias(uri: vscode.Uri, workspace: vscode.WorkspaceFolder, fileAlias: UseFileAliasReturn): boolean {
    const { configFile } = fileAlias;
    const relativelyPath = uri.path.substring(workspace.uri.path.length + 1);
    return !!configFile.value[relativelyPath];
  }

  // Helper function to show merged input with alias type selection
  async function showAliasInput(uri: vscode.Uri, existingAlias: string = "", existingType: string = "") {
    const globalDefaultType = config.defaultAliasType || "public";
    const defaultType = existingType || globalDefaultType;
    let currentType = defaultType;

    const inputBox = vscode.window.createInputBox();
    inputBox.title = existingAlias ? "Edit Alias" : "Add Alias";
    inputBox.placeholder = "Enter alias name";
    inputBox.value = existingAlias || "";

    // Define buttons
    const getButton = (type: string) => {
      const isPublic = type === "public";
      return {
        iconPath: new vscode.ThemeIcon(isPublic ? "eye" : "lock"),
        tooltip: isPublic
          ? `Current: Public (Visible to all)${globalDefaultType === "public" ? " - Default" : ""}. Click to switch to Private.`
          : `Current: Private (Local only)${globalDefaultType === "private" ? " - Default" : ""}. Click to switch to Public.`,
      };
    };

    inputBox.buttons = [getButton(currentType)];

    return new Promise<{ alias: string; type: string } | undefined>((resolve) => {
      inputBox.onDidTriggerButton(() => {
        currentType = currentType === "public" ? "private" : "public";
        inputBox.buttons = [getButton(currentType)];
      });

      inputBox.onDidAccept(() => {
        inputBox.hide();
        if (inputBox.value && inputBox.value.trim()) {
          resolve({ alias: inputBox.value.trim(), type: currentType });
        }
        else {
          resolve(undefined);
        }
      });

      inputBox.onDidHide(() => {
        inputBox.dispose();
        resolve(undefined);
      });

      inputBox.show();
    });
  }

  // Helper function to save alias
  function saveAlias(uri: vscode.Uri, alias: string, type: string, workspace: vscode.WorkspaceFolder, fileAlias: UseFileAliasReturn) {
    console.log('[folder-alias] saveAlias called:', { uri: uri.toString(), alias, type });
    const { publicConfig, privateConfig, resetConfig, savePrivate, savePublic, changeEmitter } = fileAlias;
    const relativelyPath = uri.path.substring(workspace.uri.path.length + 1);
    console.log('[folder-alias] Relative path:', relativelyPath);

    if (type === "private") {
      // Remove from public if exists
      if (publicConfig.value[relativelyPath]) {
        delete publicConfig.value[relativelyPath];
        savePublic();
      }
      privateConfig.value[relativelyPath] = {
        ...privateConfig.value[relativelyPath],
        description: alias,
      };
      savePrivate();
    }
    else {
      // Remove from private if exists
      if (privateConfig.value[relativelyPath]) {
        delete privateConfig.value[relativelyPath];
        savePrivate();
      }
      publicConfig.value[relativelyPath] = {
        ...publicConfig.value[relativelyPath],
        description: alias,
      };
      savePublic();
    }

    resetConfig();
    changeEmitter(uri);
  }

  // Helper function to remove alias
  function removeAlias(uri: vscode.Uri, workspace: vscode.WorkspaceFolder, fileAlias: UseFileAliasReturn) {
    const { publicConfig, privateConfig, resetConfig, savePrivate, savePublic, changeEmitter } = fileAlias;
    const relativelyPath = uri.path.substring(workspace.uri.path.length + 1);

    // Remove from both configs
    if (publicConfig.value[relativelyPath]) {
      delete publicConfig.value[relativelyPath];
      savePublic();
    }
    if (privateConfig.value[relativelyPath]) {
      delete privateConfig.value[relativelyPath];
      savePrivate();
    }

    resetConfig();
    changeEmitter(uri);
  }

  // Add/Edit Alias command - automatically handles both scenarios
  useCommand("folder-alias.addAlias", async (uri?: vscode.Uri) => {
    console.log("[folder-alias] addAlias command triggered", uri?.toString());

    if (!uri) {
      vscode.window.showErrorMessage("Please right-click on a folder to add an alias.");
      return;
    }

    const ctx = getContext(uri);
    console.log("[folder-alias] context:", ctx);

    if (!ctx || !ctx.fileAlias) {
      vscode.window.showErrorMessage("Could not resolve workspace context for this folder.");
      return;
    }
    const { ws, fileAlias } = ctx;

    // Check if alias already exists
    if (hasAlias(uri, ws, fileAlias)) {
      // Editing existing alias
      const { configFile, privateConfig } = fileAlias;
      const relativelyPath = uri.path.substring(ws.uri.path.length + 1);
      const existingAlias = configFile.value[relativelyPath]?.description || "";
      let existingType = "public";
      if (privateConfig.value[relativelyPath]) {
        existingType = "private";
      }

      const result = await showAliasInput(uri, existingAlias, existingType);
      if (result) {
        saveAlias(uri, result.alias, result.type, ws, fileAlias);
      }
    }
    else {
      // Adding new alias
      const result = await showAliasInput(uri);
      if (result) {
        saveAlias(uri, result.alias, result.type, ws, fileAlias);
      }
    }
  });

  // Remove Alias command - only works when alias exists
  useCommand("folder-alias.removeAlias", (uri?: vscode.Uri) => {
    console.log("[folder-alias] removeAlias command triggered", uri?.toString());

    if (!uri) {
      vscode.window.showErrorMessage("Please right-click on a folder to remove an alias.");
      return;
    }

    const ctx = getContext(uri);
    console.log("[folder-alias] context:", ctx);

    if (!ctx || !ctx.fileAlias) {
      vscode.window.showErrorMessage("Could not resolve workspace context for this folder.");
      return;
    }
    const { ws, fileAlias } = ctx;

    if (!hasAlias(uri, ws, fileAlias)) {
      vscode.window.showWarningMessage("This folder doesn't have an alias to remove.");
      return;
    }

    removeAlias(uri, ws, fileAlias);
    vscode.window.showInformationMessage("Alias removed successfully.");
  });
}

export { registerCommands };
