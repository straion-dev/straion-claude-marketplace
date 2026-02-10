# Straion CLI Reference

## Find Requirements

Validate code, specs, or tasks against project requirements.

### Command

```bash
straion find-requirements \
  --session "<session_id>" \
  --title "<title>" \
  --body "<body>" \
  --summary "<summary>"
```

### Session ID

| Agent | Session ID |
|-------|-----------|
| Claude Code | `$CLAUDE_SESSION_ID` |
| Other agents | Use a unique session identifier for the current chat |

### Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--session` | Yes | Session identifier |
| `--title` | No | Title of what's being validated |
| `--body` | No | Detailed content to validate |
| `--summary` | No | Broader context / plan summary |

### Example

```bash
straion find-requirements \
  --session "$CLAUDE_SESSION_ID" \
  --title "Add user authentication" \
  --body "Implement JWT-based auth with login, logout, token refresh" \
  --summary "Building user management dashboard"
```

### Output

JSON array of matching requirements:

```json
[
  {
    "id": "REQ-123",
    "content": "All API endpoints must implement JWT authentication",
    "relevance": 0.95
  }
]
```

### Good Descriptions

Specific: "Implement JWT authentication with login, logout, and token refresh endpoints"
Vague (avoid): "add auth" or "update the component"

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `command not found: straion` | CLI not installed | Tell user to install the straion CLI |
| Authentication error | Not logged in | Tell user to run `straion login` |
| Empty result | No matching requirements | Try a more detailed description |
| Network error | API unavailable | Check internet connection |
