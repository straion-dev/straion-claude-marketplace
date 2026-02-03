---
name: validating-requirements
description: |
  Validates code, specifications, and tasks against project requirements using Straion's semantic matching. Use when checking compliance, validating PRs, reviewing specs against requirements, or when user asks "does this meet requirements", "check this against requirements", "validate this code/spec/task".
context: fork
allowed-tools: Bash
---

# Validating Requirements

## Contents

- [Purpose](#purpose)
- [Process](#process)
- [CLI Command](#cli-command-straion-find-requirements)
- [Validation Levels](#validation-levels)
- [Compliance Analysis](#compliance-analysis)
- [Output Format](#output-format)
- [Validation Loop](#validation-loop)
- [Error Handling](#error-handling)

---

## Purpose

Validate code, specifications, and tasks against project requirements using Straion's AI-powered semantic matching.

## Process

1. **Receive** description of what to validate (spec, task, or code)
2. **Fetch** requirements via `straion find-requirements` CLI command
3. **Analyze** compliance against each returned requirement
4. **Report** structured findings with actionable recommendations

## CLI Command: `straion find-requirements`

Use the Bash tool to call the Straion CLI to find matching requirements.

### Command Syntax

Inside Claude Code use `$CLAUDE_SESSION_ID` for `<session_id>` below.
Any other agent - replace `<session_id>` with your appropriate value for this chat session.

```bash
straion find-requirements --session "<session_id>" --title "<title>" --body "<body>" --summary "<summary>"
```

### Parameters

| Parameter   | Required | Description                                                     |
| ----------- | -------- | --------------------------------------------------------------- |
| `--session` | Yes      | Session ID (e.g. use `$CLAUDE_SESSION_ID` environment variable) |
| `--title`   | No       | Title of the task being validated                               |
| `--body`    | No       | Detailed body/content of the task                               |
| `--summary` | No       | Summary of the entire plan/context                              |

### Example Calls

**Simple task validation:**

```bash
straion find-requirements --session "<session_id>" --title "Add user authentication" --body "Implement JWT-based authentication with login, logout, and token refresh endpoints"
```

**Spec validation with full context:**

```bash
straion find-requirements --session "<session_id>" --title "User Profile Component" --body "Create a React component for user profiles with avatar, name, and role display using Radix UI components" --summary "Building a user management dashboard with profile viewing and editing capabilities"
```

### Output

Returns JSON array of matching requirements:

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

- "Implement user authentication using JWT tokens, including login, logout, and token refresh endpoints"
- "Create a React component for user profiles with avatar, name, and role using Radix UI"

Avoid vague descriptions like "add auth" or "update the component" - be specific.

## Validation Levels

| Level | What                                  | Check Against                                  |
| ----- | ------------------------------------- | ---------------------------------------------- |
| Spec  | PRDs, ADRs, RFCs, Implementation Plan | Architecture, security, design principles      |
| Task  | Implementation tasks                  | Technical requirements, API contracts, testing |
| Code  | Actual changes                        | Coding standards, security, performance        |

## Compliance Analysis

For each requirement:

1. Read and understand what it mandates/prohibits
2. Compare against the input
3. Identify gaps or violations
4. Assess severity (critical, important, minor)

## Output Format

```markdown
## Requirements Validation Report

### Summary

[X requirements checked, Y compliant, Z issues]

### Compliant ✅

- **REQ-123**: [Requirement summary]
  - ✅ [What was done correctly]

### Partial Compliance ⚠️

- **REQ-456**: [Requirement summary]
  - ⚠️ [What's missing]
  - **Recommendation**: [Specific fix]

### Violations ❌

- **REQ-789**: [Requirement summary]
  - ❌ [The violation]
  - **Risk**: [Impact]
  - **Fix**: [Concrete solution]

### Recommendations

1. [Prioritized action items]
```

## Severity Guidelines

- **Critical violations**: Block until fixed
- **Important gaps**: Address before proceeding
- **Minor issues**: Note for consideration
- **Compliant**: Approve with optional improvements

## Validation Loop

When violations are found:

1. Report specific violations with concrete fixes
2. User/caller applies the recommended fixes
3. Re-validate to confirm compliance
4. Repeat until all critical violations are resolved

## Error Handling

See [../shared/ERROR_HANDLING.md](../shared/ERROR_HANDLING.md) for common error patterns.

Common CLI errors:

- **Authentication error**: Tell the user to run `straion login`
- **Empty result**: No matching requirements found - try a more detailed description
- **Network error**: Check internet connection and Straion API availability

---

## Reference

- [Terminology](../shared/TERMINOLOGY.md)
- [Error Handling](../shared/ERROR_HANDLING.md)
