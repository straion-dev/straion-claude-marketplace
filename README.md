# Straion Marketplace for Claude Code

Official marketplace for Straion's Claude Code plugins.

## Installation

Add this marketplace to Claude Code:

```bash
/plugin marketplace add straion-dev/straion-claude-marketplace
```

**Installation:**

```bash
/plugin install straion@straion-claude-marketplace
```

**Quick Start:**

```bash
# Configure API credentials
/straion-configure
```

## For Teams

### Automatic Installation

Add to your project's `.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "straion": {
      "source": {
        "source": "github",
        "repo": "your-org/straion-marketplace"
      }
    }
  },
  "enabledPlugins": {
    "straion@straion": true
  }
}
```

Commit this file. Team members will automatically:

1. Get the marketplace configured
2. Be prompted to install the plugin
3. Have consistent tooling

### Manual Installation

```bash
/plugin marketplace add straion-dev/straion-claude-marketplace
/plugin install straion@straion-claude-marketplace
/straion-configure
```

## Updating Plugins

Refresh marketplace:

```bash
/plugin marketplace update straion-marketplace
```

Update plugin:

```bash
/plugin update straion@straion-marketplace
```

## Requirements

- Claude Code (latest version)
- Node.js (for plugin execution)
- Straion API access (API key required)

## Support

- **Plugin Documentation**: [straion-plugin](https://github.com/straion-dev/straion-claude-plugin)
- **Issues**: [GitHub Issues](https://github.com/straion-dev/straion-claude-marketplace/issues)
- **Straion API**: Refer to your straion documentation

## Adding Plugins to This Marketplace

Want to contribute a plugin? See [CONTRIBUTING.md](CONTRIBUTING.md)

## Marketplace Management

### List Installed Marketplaces

```bash
/plugin marketplace list
```

### Remove Marketplace

```bash
/plugin marketplace remove straion-claude-marketplace
```

**Maintained by**: Straion
**Contact**: support@straion.com
