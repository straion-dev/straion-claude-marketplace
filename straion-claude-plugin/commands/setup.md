---
name: straion:setup
description: Configure straion API credentials and endpoint
---

# Setup Straion MCP Server

Configure your Straion MCP server to integrate requirements validation and management into Claude Code. This command guides you through setting up the HTTP-based MCP server connection.

## Usage

```
/straion:setup
```

This command will guide you through:

1. Adding the Straion MCP server configuration
2. Setting up your API credentials
3. Verifying the connection

## Configuration Steps

### Step 1: Configure MCP Server (Recommended)

Use the `/mcp` command to interactively set up the Straion MCP server:

```
/mcp
```

This will guide you through adding the Straion MCP server configuration with the following settings:

- **Server name**: `straion`
- **Server type**: `http`
- **URL**: `https://api.straion.app/mcp`
- **Headers**: `Authorization: Bearer ${STRAION_API_KEY}`

The `/mcp` command will help you add this configuration to your Claude Code MCP servers config file automatically.

### Step 2: Set API Key

Set your Straion API key as an environment variable. Choose one of the following options:

**Option A: Shell environment**

Add to your shell configuration file (e.g., `~/.zshrc`, `~/.bashrc`):

```bash
export STRAION_API_KEY="your-api-key-here"
```

**Option B: Claude Code settings**

Add to `.claude/settings.local.json`:

```json
{
  "env": {
    "STRAION_API_KEY": "your-api-key-here"
  }
}
```

### Step 3: Restart Claude Code

After setting the API key, restart Claude Code to load the configuration.

---

### Alternative: Manual Configuration

If you prefer to manually configure the MCP server, add this to your MCP config file:

```json
{
  "mcpServers": {
    "straion": {
      "type": "http",
      "url": "https://api.straion.app/mcp",
      "headers": {
        "Authorization": "Bearer ${STRAION_API_KEY}"
      }
    }
  }
}
```

## Environment Variables

- `STRAION_API_KEY` (Required) - Your Straion API authentication token
- `STRAION_API_BASEURL` (Optional) - Custom API endpoint URL (defaults to `https://api.straion.app`)

## Getting Your API Key

To obtain a Straion API key:

1. Log into your Straion account
2. Navigate to [Access Tokens](https://<your-tenant>.straion.app/organization/tokens)
3. Generate a new API key with appropriate permissions
4. Copy the key immediately (it won't be shown again)
5. Use it in the environment variable setup above

## When to Use

- **First-time setup**: When using the Straion plugin for the first time
- **API key rotation**: When your Straion API key has been changed
- **Endpoint changes**: When switching between Straion environments
- **Troubleshooting**: When experiencing authentication or connection errors

## Troubleshooting

### "Configuration not initialized"

- Verify your MCP server configuration is correctly added
- Ensure environment variables are set and Claude Code has been restarted
- Run `/straion:setup` to verify the setup steps

### "Invalid API key" or Authentication errors

- Verify your API key is correct and properly set in environment variables
- Check if the key has necessary permissions in Straion
- Ensure the key is active and not expired
- Confirm no extra spaces or characters in the key

### Connection errors

- Verify the `STRAION_API_BASEURL` is correct (or omit to use default)
- Check your network connection and firewall settings
- Ensure the Straion API endpoint is accessible from your network

---

## Implementation Notes

When this command is invoked:

1. Display the configuration steps above
2. Guide the user to add the MCP server configuration
3. Instruct the user to set environment variables - NEVER ask them to paste sensitive keys directly into the conversation
4. Remind them to restart Claude Code
5. Offer to help verify the connection after setup is complete
