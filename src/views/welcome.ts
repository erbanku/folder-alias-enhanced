import type { ExtensionContext, WebviewPanel } from "vscode";
import { ViewColumn, window, workspace } from "vscode";
import { config } from "../config";
import { getWelcomeHtml } from "./welcome-html";

let welcomePanel: WebviewPanel | undefined;

export function showWelcomePage(context: ExtensionContext) {
    // If panel already exists, reveal it
    if (welcomePanel) {
        welcomePanel.reveal(ViewColumn.One);
        return;
    }

    // Create webview panel
    welcomePanel = window.createWebviewPanel(
        "folderAliasWelcome",
        "Welcome to Folder Alias Enhanced",
        ViewColumn.One,
        {
            enableScripts: true,
            retainContextWhenHidden: true,
        },
    );

    // Set HTML content
    welcomePanel.webview.html = getWelcomeHtml();

    // Handle messages from webview
    welcomePanel.webview.onDidReceiveMessage(
        async (message) => {
            switch (message.type) {
                case "ready":
                    // Send current settings to webview
                    welcomePanel?.webview.postMessage({
                        type: "loadSettings",
                        settings: {
                            enable: config.enable,
                            defaultAliasType: config.defaultAliasType,
                            aliasPriority: config.aliasPriority,
                            autoCreatePublicConfig: config.autoCreatePublicConfig,
                            autoCreatePrivateConfig: config.autoCreatePrivateConfig,
                            autoAddPrivateToGitignore: config.autoAddPrivateToGitignore,
                        },
                    });
                    break;

                case "saveSettings": {
                    // Update workspace/user settings
                    const wsConfig = workspace.getConfiguration("folder-alias-enhanced");
                    await wsConfig.update("enable", message.settings.enable, true);
                    await wsConfig.update("defaultAliasType", message.settings.defaultAliasType, true);
                    await wsConfig.update("aliasPriority", message.settings.aliasPriority, true);
                    await wsConfig.update("autoCreatePublicConfig", message.settings.autoCreatePublicConfig, true);
                    await wsConfig.update("autoCreatePrivateConfig", message.settings.autoCreatePrivateConfig, true);
                    await wsConfig.update("autoAddPrivateToGitignore", message.settings.autoAddPrivateToGitignore, true);

                    window.showInformationMessage("Folder Alias Enhanced settings saved successfully!");

                    // Mark that setup is complete
                    await context.globalState.update("folder-alias-enhanced.setupComplete", true);

                    // Close panel
                    welcomePanel?.dispose();
                    break;
                }

                case "close":
                    // Mark setup as complete even if skipped
                    await context.globalState.update("folder-alias-enhanced.setupComplete", true);
                    welcomePanel?.dispose();
                    break;
            }
        },
        undefined,
        context.subscriptions,
    );

    // Clean up when panel is closed
    welcomePanel.onDidDispose(
        () => {
            welcomePanel = undefined;
        },
        null,
        context.subscriptions,
    );
}

export function shouldShowWelcomePage(context: ExtensionContext): boolean {
    // Check if setup has been completed
    const setupComplete = context.globalState.get("folder-alias-enhanced.setupComplete", false);
    return !setupComplete;
}
