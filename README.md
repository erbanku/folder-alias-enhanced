# Folder Alias Enhanced - Folder Alias Plugin

A practical plugin for VSCode file explorer that adds custom alias labels to folders and files, helping you better identify and organize your code projects.

![Demo](./docs/images/simple.gif)

## ✨ Features

- 🏷️ **Folder Alias Labels**: Add custom aliases to folders and files, displayed in the file tree
- 🎯 **Context Menu Integration**: Quickly add or modify aliases through right-click menu
- 💾 **Configuration Management**: Alias configurations are saved in `.vscode/folder-alias.json` in your workspace
- 🔄 **Real-time Updates**: Alias changes take effect immediately in the file tree
- 🌐 **Multi-workspace Support**: Support for multiple workspaces simultaneously
- 📝 **Tooltips**: Hover to display detailed information

## 📦 Installation

### Method 1: Install from VSCode Extension Marketplace
1. Open VSCode
2. Click the "Extensions" icon in the left activity bar (or press `Ctrl+Shift+X`)
3. Search for "Folder Alias Enhanced"
4. Click the "Install" button
5. Restart VSCode (if necessary)

### Method 2: Manual Installation
1. Download the `.vsix` extension package
2. In VSCode, press `Ctrl+Shift+P` to open the command palette
3. Type "Extensions: Install from VSIX..."
4. Select the downloaded `.vsix` file to install

## 🚀 Usage

### Adding an Alias
1. In the file explorer, right-click on the folder or file you want to add an alias to
2. Select "Add Alias" from the context menu
3. Enter your desired alias in the input box
4. Press Enter to confirm, and the alias will be displayed immediately in the file tree

### Modifying an Alias
1. Right-click on a folder or file that already has an alias
2. Select "Add Alias"
3. Modify the alias content in the input box
4. Press Enter to save the changes

### Deleting an Alias
1. Right-click on a folder or file with an alias
2. Select "Add Alias"
3. Clear the input box content
4. Press Enter to confirm deletion

## ⚙️ Configuration

The plugin creates the following configuration files in the `.vscode` directory of each workspace:

- `folder-alias.json`: Public alias configuration (can be committed to version control)
- `private-folder-alias.json`: Private alias configuration (recommended to add to .gitignore)

### Configuration File Format Example
```json
{
  "src/components": {
    "description": "🧩 Components",
    "tooltip": "React component library directory"
  },
  "src/utils": {
    "description": "🛠️ Utils",
    "tooltip": "Common utility functions"
  }
}
```

## 🎨 Usage Tips

1. **Use Emojis**: Use emojis in aliases to make the file tree more intuitive
   - 📁 Folder
   - 🧩 Components
   - 🛠️ Tools
   - 📝 Documentation
   - ⚙️ Configuration

2. **Keep it Concise**: Aliases should be short and clear to avoid affecting display

3. **Establish Standards**: In team projects, it's recommended to establish unified alias naming conventions

## 📋 System Requirements

- VSCode Version: 1.100.0 or higher
- Operating System: Windows, macOS, Linux

## 🛠️ Development & Build

### Requirements
- Node.js 18+
- npm or pnpm
- VSCode 1.100.0+

### Building the Extension from Source

If you want to build the extension from source, follow these steps:

#### 1. Clone the Repository
```bash
git clone https://github.com/Peaceful-World-X/folder-alias-enhanced.git
cd folder-alias-enhanced
```

#### 2. Install Dependencies
```bash
# Using npm (recommended, supports domestic mirrors)
npm install --registry https://registry.npmmirror.com

# Or using pnpm
pnpm install
```

#### 3. Compile Source Code
```bash
# Compile TypeScript to JavaScript
npm run build
```

#### 4. Package the Extension
```bash
# Generate .vsix extension package
npm run pack
```

#### 5. Install the Extension
After compilation, a `folder-alias-enhanced-0.1.2.vsix` file will be generated in the project root directory:

**Method 1: VSCode Command Installation**
1. Press `Ctrl+Shift+P` in VSCode to open the command palette
2. Type "Extensions: Install from VSIX..."
3. Select the generated `.vsix` file to install

**Method 2: Command Line Installation**
```bash
code --install-extension folder-alias-enhanced-0.1.2.vsix
```

### Project Structure
```
folder-alias-enhanced/
├── src/                    # TypeScript source code
│   ├── index.ts           # Extension entry point
│   ├── file-alias.ts      # File alias core functionality
│   ├── command/           # Command handlers
│   ├── hooks/             # Configuration management hooks
│   └── utils/             # Utility functions
├── dist/                  # Compiled JavaScript files
├── media/                 # Icon resources
├── package.json           # Project configuration
└── folder-alias-enhanced-0.1.2.vsix  # Generated extension package
```

### Development Scripts
- `npm run build` - Compile TypeScript source code
- `npm run pack` - Package the VSCode extension
- `npm run vscode:prepublish` - Pre-publish preparation

## 🔧 Development Information

- **Project Repository**: https://github.com/Peaceful-World-X/folder-alias-enhanced
- **Author**: Peaceful-World-X
- **Version**: 0.1.2
- **License**: GPL-3.0

## 🐛 Issue Reporting

If you encounter any issues or have feature suggestions while using the extension, please contact us through:

- GitHub Issues: https://github.com/Peaceful-World-X/folder-alias-enhanced/issues

## 📝 Changelog

### v0.1.2
- Fixed some known issues
- Improved user experience
- Updated documentation

## 🤝 Contributing

Pull requests and issues are welcome to help improve this extension!

## 📄 License

This project is licensed under GPL-3.0. See the [LICENSE](LICENSE) file for details.
