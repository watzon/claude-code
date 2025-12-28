# crystal-lsp

Crystal language server plugin for Claude Code.

## Table of Contents

- [Background](#background)
- [Install](#install)
  - [Prerequisites](#prerequisites)
  - [Plugin Installation](#plugin-installation)
  - [LSP Patch](#lsp-patch)
- [Usage](#usage)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Background

This plugin adds Crystal language support to Claude Code via [crystal_lsp](https://github.com/skuznetsov/crystal_lsp), providing:

- Document symbols (classes, methods, variables)
- Hover information (types, documentation)
- Go to definition
- Find references
- Semantic diagnostics (type errors, undefined variables)

## Install

### Prerequisites

Build and install [crystal_lsp](https://github.com/skuznetsov/crystal_lsp):

```bash
git clone https://github.com/skuznetsov/crystal_lsp
cd crystal_lsp
./build_lsp.sh
ln -s "$(pwd)/bin/crystal_v2_lsp" ~/.local/bin/crystal_lsp
```

Ensure `~/.local/bin` is in your PATH.

### Plugin Installation

**Via marketplace:**

1. Add to `~/.claude/settings.json`:
   ```json
   {
     "pluginMarketplaces": [
       "https://github.com/watzon/claude-code"
     ]
   }
   ```

2. Install:
   ```
   /plugin install crystal-lsp@watzon-marketplace
   ```

**Manual:** Copy this directory to `~/.claude/plugins/`.

### LSP Patch

Claude Code v2.0.76 has a bug where LSP plugins don't load ([#13952](https://github.com/anthropics/claude-code/issues/13952)).

Apply the fix from the parent directory:

```bash
../lsp-patch.sh
```

Or use [@Zamua's patch](https://gist.github.com/Zamua/f7ca58ce5dd9ba61279ea195a01b190c).

## Usage

After installation and restart, Claude Code provides Crystal language features for `.cr` and `.ecr` files:

```
# In Claude Code, use LSP operations on Crystal files:
LSP documentSymbol  # List symbols in file
LSP hover           # Get type info at cursor
LSP goToDefinition  # Jump to definition
```

## Configuration

The `.lsp.json` configures the language server:

```json
{
  "crystal": {
    "command": "crystal_lsp",
    "extensionToLanguage": {
      ".cr": "crystal",
      ".ecr": "crystal"
    },
    "env": {
      "CRYSTALV2_LSP_ENABLE_SEMANTIC_DIAGNOSTICS": "1"
    }
  }
}
```

### Using Crystalline

To use [crystalline](https://github.com/elbywan/crystalline) instead:

```json
{
  "crystal": {
    "command": "crystalline",
    ...
  }
}
```

## Troubleshooting

**LSP not loading:** Apply the LSP patch (see [Install](#lsp-patch)), then restart Claude Code.

**No diagnostics:** Verify `CRYSTALV2_LSP_ENABLE_SEMANTIC_DIAGNOSTICS=1` is set in `.lsp.json`, then restart.

**Command not found:** Ensure `crystal_lsp` is in your PATH.

## Contributing

PRs welcome. For bugs, open an issue at [watzon/claude-code](https://github.com/watzon/claude-code/issues).

## License

MIT © Chris Watson
