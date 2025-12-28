# Claude Code Plugins

Plugins and patches for [Claude Code](https://docs.anthropic.com/en/docs/claude-code), including an LSP fix and Crystal language support.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
  - [LSP Patch](#lsp-patch)
  - [Plugin Marketplace](#plugin-marketplace)
- [Plugins](#plugins)
- [Contributing](#contributing)
- [Credits](#credits)
- [License](#license)

## Background

Claude Code v2.0.76 has a bug ([#13952](https://github.com/anthropics/claude-code/issues/13952)) where LSP servers from plugins fail to load. The initialize function in the LSP server manager is empty and does nothing.

This repository provides:
1. A patch script to fix the LSP loading bug
2. A plugin marketplace with custom plugins (starting with Crystal language support)

## Install

### LSP Patch

```bash
git clone https://github.com/watzon/claude-code
cd claude-code
chmod +x lsp-patch.sh
./lsp-patch.sh
```

### Plugin Marketplace

Add to your Claude Code settings (`~/.claude/settings.json`):

```json
{
  "pluginMarketplaces": [
    "https://github.com/watzon/claude-code"
  ]
}
```

Then install plugins:

```
/plugin install crystal-lsp@watzon-marketplace
```

## Usage

### LSP Patch

```bash
# Check if patch is needed/applied
./lsp-patch.sh --check

# Apply the patch
./lsp-patch.sh

# Restore original (if needed)
./lsp-patch.sh --restore
```

The script auto-detects Claude Code installations:
- Bun global (`~/.bun/install/global/...`)
- Native (`~/.claude/local/...`)
- npm global (`/usr/local/lib/node_modules/...`)
- fnm/nvm managed Node versions

**Note:** The patch is overwritten when Claude Code updates. Re-run after updates if LSP stops working.

### Plugin Marketplace

After adding the marketplace to settings, use `/plugin` in Claude Code to browse and install plugins.

## Plugins

| Plugin | Description |
|--------|-------------|
| [crystal-lsp](./crystal-lsp/) | Crystal language server support |

## Contributing

PRs welcome. For bugs, please open an issue first.

To add a plugin:
1. Create a subdirectory with `.claude-plugin/plugin.json`
2. Add an entry to `.claude-plugin/marketplace.json`
3. Submit a PR

## Credits

- [@Zamua](https://github.com/Zamua) — Original LSP patch: https://gist.github.com/Zamua/f7ca58ce5dd9ba61279ea195a01b190c

## License

MIT © Chris Watson
