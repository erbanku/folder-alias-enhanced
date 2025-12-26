# Folder Alias Enhanced

Easily add custom alias labels to folders and files in VS Code for better project organization. Now with enhanced features and active maintenance.

![Demo](./docs/images/image.png)

## Features

-   **Custom Alias Labels** - Add descriptive labels to any folder/file in the Explorer tree
-   **Context Menu Integration** - Right-click any folder to add, edit, or remove aliases
-   **Public & Private Configs** - Share aliases with your team (public) or keep them local (private)
-   **Visual Type Indicator** - Toggle between public (👁️ eye icon) and private (🔒 lock icon) when adding aliases
-   **Multi-Root Workspace Support** - Each workspace folder maintains its own independent alias configuration
-   **Auto-Truncation** - Long aliases are automatically truncated to 15 characters with full text shown in tooltip
-   **Smart Auto-Detection** - Automatically detects if you're editing an existing alias or adding a new one
-   **Configurable Defaults** - Set default alias type (public/private) and auto-create config files on startup
-   **GitIgnore Integration** - Automatically adds private config to `.gitignore` to keep personal aliases local
-   **Live Updates** - Alias changes are reflected immediately without restarting VS Code

## What's Different?

-   Active maintenance & bug fixes
-   Improved tooltips with full alias text on hover
-   Enhanced UI with public/private toggle button
-   Better multi-root workspace handling
-   Reactive state management for instant updates

## Install

-   Search "Folder Alias Enhanced" in VS Code Extensions and install
-   Or: Download `.vsix` and install via Command Palette > Extensions: Install from VSIX

## Usage

### Adding an Alias

1. Right-click any folder or file in the Explorer
2. Select **Add/Edit Alias** from the context menu
3. Enter your desired alias name
4. Click the icon button to toggle between:
    - 👁️ **Public** (shared with team, version controlled)
    - 🔒 **Private** (local only, gitignored)
5. Press Enter to save

### Editing an Alias

The extension automatically detects existing aliases. When you right-click a folder with an alias and select **Add/Edit Alias**, the current value and type are pre-filled for easy editing.

### Removing an Alias

Right-click the folder and select **Remove Alias** from the context menu. This removes the alias from both public and private configurations.

## Configuration

### Extension Settings

Access these settings in VS Code Settings (search for "Folder Alias"):

-   `folder-alias-enhanced.enable` - Enable/disable the extension (default: `true`)
-   `folder-alias-enhanced.defaultAliasType` - Default type for new aliases: `"public"` or `"private"` (default: `"public"`)
-   `folder-alias-enhanced.autoCreatePublicConfig` - Auto-create public config file on startup (default: `false`)
-   `folder-alias-enhanced.autoCreatePrivateConfig` - Auto-create private config file on startup (default: `false`)
-   `folder-alias-enhanced.autoAddPrivateToGitignore` - Auto-add private config to `.gitignore` (default: `true`)

### Config Files

Aliases are stored in workspace-relative JSON files:

-   **Public**: `.vscode/public-folder-alias.json` (versioned, shared)
-   **Private**: `.vscode/private-folder-alias.json` (gitignored, local)

Example configuration:

```json
{
    "src/components": {
        "description": "Components",
        "tooltip": "React UI Components"
    },
    "src/utils": {
        "description": "Utilities"
    }
}
```

**Note:** Private aliases take precedence over public aliases for the same path.

## License

[GPL-3.0](LICENSE) © All contributors

## Credits

-   Original: [Muromi-Rikka/folder-alias](https://github.com/Muromi-Rikka/folder-alias)
-   Fork: [Peaceful-World-X/folder-alias-fixed](https://github.com/Peaceful-World-X/folder-alias-fixed)
