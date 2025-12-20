# Folder Alias Enhanced

> Add custom alias labels to folders and files in the VS Code file explorer for better project organization and navigation.

![Demo](./docs/images/simple.gif)

## Features

-   **Custom Alias Labels** - Add descriptive aliases to any folder or file in your workspace
-   **Context Menu Integration** - Quick access via right-click in the file explorer
-   **Persistent Configuration** - Aliases are saved in `.vscode/folder-alias.json` within your workspace
-   **Real-time Updates** - Changes appear immediately in the file tree
-   **Multi-workspace Support** - Works seamlessly across multiple workspace folders
-   **Rich Tooltips** - Hover over aliased items to see additional details
-   **Public & Private Aliases** - Separate configuration files for team-shared and personal aliases

## Installation

### From VS Code Marketplace

1. Open VS Code
2. Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (macOS)
3. Search for "Folder Alias Enhanced"
4. Click **Install**

### From VSIX File

1. Download the `.vsix` file
2. Press `Ctrl+Shift+P` to open the Command Palette
3. Type `Extensions: Install from VSIX...`
4. Select the downloaded file

## Usage

### Add or Edit an Alias

1. Right-click any folder or file in the Explorer
2. Select **Add Alias** from the context menu
3. Enter your alias text (e.g., `🧩 Components` or `Utils`)
4. Press `Enter` to save

### Remove an Alias

1. Right-click the aliased item
2. Select **Add Alias**
3. Clear the input box
4. Press `Enter`

## Configuration

Alias configurations are stored in your workspace's `.vscode` directory:

-   **`folder-alias.json`** - Public aliases (commit to version control)
-   **`private-folder-alias.json`** - Private aliases (add to `.gitignore`)

### Configuration Format

```json
{
    "src/components": {
        "description": "🧩 Components",
        "tooltip": "React component library"
    },
    "src/utils": {
        "description": "🛠️ Utilities",
        "tooltip": "Helper functions and utilities"
    },
    "README.md": {
        "description": "📖 Docs"
    }
}
```

### Extension Settings

-   `folder-alias-enhanced.enable` - Enable/disable the extension (default: `true`)

## Best Practices

### Use Emojis for Visual Clarity

```
📁 Directories    🧩 Components    ⚙️ Config
🛠️ Tools         📝 Docs          🧪 Tests
🎨 Styles         🔌 Plugins       📦 Packages
```

### Keep Aliases Concise

Short, clear aliases work best in the file tree:

-   ✅ `Utils` or `🛠️ Utils`
-   ❌ `Utility Functions and Helper Methods`

### Establish Team Conventions

Define consistent alias patterns for team projects:

-   Feature modules: `🧩 [Module Name]`
-   Configuration: `⚙️ [Config Type]`
-   Documentation: `📝 [Doc Type]`

## Development

### Prerequisites

-   Node.js 18+
-   pnpm (or npm)
-   VS Code 1.100.0+

### Setup

```bash
# Clone the repository
git clone https://github.com/erbanku/folder-alias-enhanced.git
cd folder-alias-enhanced

# Install dependencies
pnpm install

# Build the extension
pnpm run build

# Package as VSIX
pnpm run pack
```

### Available Scripts

```bash
pnpm run build          # Compile TypeScript
pnpm run dev            # Watch mode with sourcemaps
pnpm run pack           # Create VSIX package
pnpm run publish        # Publish to marketplace
pnpm run lint           # Run ESLint
pnpm run typecheck      # TypeScript type checking
pnpm run test           # Run tests
```

### Project Structure

```
folder-alias-enhanced/
├── src/
│   ├── index.ts                    # Extension entry point
│   ├── file-alias.ts               # Core alias functionality
│   ├── config.ts                   # Configuration management
│   ├── command/                    # Command implementations
│   │   └── add-alias.command.ts
│   ├── hooks/                      # Reactive hooks
│   │   └── useConfig.ts
│   └── utils/                      # Utility functions
├── media/                          # Icons and images
├── dist/                           # Compiled output
└── package.json                    # Extension manifest
```

### Installing Development Build

After running `pnpm run pack`, install the generated `.vsix` file:

```bash
code --install-extension folder-alias-enhanced-0.1.2.vsix
```

Or use the Command Palette: `Extensions: Install from VSIX...`

## Requirements

-   VS Code 1.100.0 or higher
-   Supports Windows, macOS, and Linux

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[GPL-3.0](LICENSE) © erbanku

## Links

-   [GitHub Repository](https://github.com/erbanku/folder-alias-enhanced)
-   [Issue Tracker](https://github.com/erbanku/folder-alias-enhanced/issues)
-   [VS Code Marketplace](https://marketplace.visualstudio.com/)

---

**Enjoy organizing your workspace! ✨**

Pull requests and issues are welcome to help improve this extension!

## Credits

Special thanks to:

https://github.com/Muromi-Rikka/folder-alias

https://github.com/Peaceful-World-X/folder-alias-fixed

## 📄 License

This project is licensed under GPL-3.0. See the [LICENSE](LICENSE) file for details.
