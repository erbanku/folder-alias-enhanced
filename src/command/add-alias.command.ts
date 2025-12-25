import type { UseFileAliasReturn } from "../file-alias";
import { useCommand } from "reactive-vscode";
import * as vscode from "vscode";
import { config } from "../config";

function addAlias(workspace: vscode.WorkspaceFolder, fileAlias: UseFileAliasReturn) {
  const { publicConfig, privateConfig, configFile, resetConfig, savePrivate, savePublic, changeEmitter } = fileAlias;

  // Helper function to check if a folder has an alias
  function hasAlias(uri: vscode.Uri): boolean {
    const relativelyPath = uri.path.substring(workspace.uri.path.length + 1);
    return !!configFile.value[relativelyPath];
  }

  // Helper function to show merged input with alias type selection
  async function showAliasInput(uri: vscode.Uri, existingAlias: string = "", existingType: string = "") {
    const defaultType = existingType || config.defaultAliasType || "public";

    // Create quick pick with custom items
    const quickPick = vscode.window.createQuickPick();
    quickPick.title = existingAlias ? "Edit Alias" : "Add Alias";
    quickPick.placeholder = "Enter alias name and select type (↑/↓ to change type)";
    quickPick.value = existingAlias;
    quickPick.matchOnDescription = true;
    quickPick.matchOnDetail = true;

    // Create items for type selection
    const items = [
      {
        label: "public",
        description: "Visible to all users (committed to git)",
        picked: defaultType === "public",
      },
      {
        label: "private",
        description: "Local only (git-ignored)",
        picked: defaultType === "private",
      },
    ];

    quickPick.items = items;
    quickPick.activeItems = items.filter(item => item.picked);
    quickPick.canSelectMany = false;

    return new Promise<{ alias: string; type: string } | undefined>((resolve) => {
      let selectedType = defaultType;
      let inputValue = quickPick.value;

      quickPick.onDidChangeSelection((selection) => {
        if (selection[0]) {
          selectedType = selection[0].label;
          // Update the items to show which one is selected
          quickPick.items = items.map(item => ({
            ...item,
            picked: item.label === selectedType,
          }));
        }
      });

      quickPick.onDidChangeValue((value) => {
        inputValue = value;
      });

      quickPick.onDidAccept(() => {
        quickPick.hide();
        if (inputValue && inputValue.trim()) {
          resolve({ alias: inputValue.trim(), type: selectedType });
        }
        else {
          resolve(undefined);
        }
      });

      quickPick.onDidHide(() => {
        quickPick.dispose();
        resolve(undefined);
      });

      quickPick.show();
    });
  }

  // Helper function to save alias
  function saveAlias(uri: vscode.Uri, alias: string, type: string) {
    const relativelyPath = uri.path.substring(workspace.uri.path.length + 1);

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
  function removeAlias(uri: vscode.Uri) {
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
    if (!uri) {
      vscode.window.showErrorMessage("Please right-click on a folder to add an alias.");
      return;
    }

    // Check if alias already exists
    if (hasAlias(uri)) {
      // Editing existing alias
      const relativelyPath = uri.path.substring(workspace.uri.path.length + 1);
      const existingAlias = configFile.value[relativelyPath]?.description || "";
      let existingType = "public";
      if (privateConfig.value[relativelyPath]) {
        existingType = "private";
      }

      const result = await showAliasInput(uri, existingAlias, existingType);
      if (result) {
        saveAlias(uri, result.alias, result.type);
      }
    }
    else {
      // Adding new alias
      const result = await showAliasInput(uri);
      if (result) {
        saveAlias(uri, result.alias, result.type);
      }
    }
  });

  // Remove Alias command - only works when alias exists
  useCommand("folder-alias.removeAlias", (uri?: vscode.Uri) => {
    if (!uri) {
      vscode.window.showErrorMessage("Please right-click on a folder to remove an alias.");
      return;
    }

    if (!hasAlias(uri)) {
      vscode.window.showWarningMessage("This folder doesn't have an alias to remove.");
      return;
    }

    removeAlias(uri);
    vscode.window.showInformationMessage("Alias removed successfully.");
  });
}

export { addAlias };
