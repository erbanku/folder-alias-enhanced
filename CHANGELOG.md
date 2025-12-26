# Changelog

All notable changes to the "Folder Alias Enhanced" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.6]

### Added

-   **Realtime Config Updates**: Both `public-folder-alias.json` and `private-folder-alias.json` are now watched for changes and updates are applied instantly without reloading the extension
-   **Configurable Alias Priority**: New `folder-alias-enhanced.aliasPriority` setting to control whether private or public aliases take precedence when both exist for the same path
    -   `"private-first"` (default): Private aliases override public ones
    -   `"public-first"`: Public aliases override private ones
-   **Welcome Page**: Interactive setup wizard that opens automatically on first install
    -   Configure all extension settings in one place
    -   Clean, professional UI with VS Code theming
    -   Can be reopened anytime via command palette: "Folder Alias: Show Welcome Page"
    -   Setup completion state stored in global state to prevent repeated displays
-   **Show Welcome Page Command**: New command to manually open the welcome/configuration page at any time

### Changed

-   Improved file decoration refresh logic to trigger on both config file types
-   Enhanced config merge strategy to respect the new priority setting
-   Updated documentation to reflect new features and settings
-   Removed emojis from welcome page for a more professional appearance

### Fixed

-   Config file watchers now properly detect changes to both public and private config files
-   File decorations now refresh correctly when either config file is modified

## [0.1.5]

### Features

-   Custom alias labels for folders and files in Explorer
-   Public and private configuration files
-   Context menu integration (Add/Edit Alias, Remove Alias)
-   Visual type indicator with eye/lock icons for public/private toggle
-   Multi-root workspace support
-   Auto-truncation of long aliases (15 characters with full tooltip)
-   Smart auto-detection of existing aliases for editing
-   Configurable defaults for alias type
-   GitIgnore integration for private config files
-   Auto-create config files on startup (optional)
-   Reactive state management for instant updates

### Technical

-   Built with reactive-vscode for reactive state management
-   Uses FileDecorationProvider API for badge display
-   TypeScript with strict type checking
-   Modern build pipeline with tsdown

## Credits

-   Original project: [Muromi-Rikka/folder-alias](https://github.com/Muromi-Rikka/folder-alias)
-   Fork basis: [Peaceful-World-X/folder-alias-fixed](https://github.com/Peaceful-World-X/folder-alias-fixed)
