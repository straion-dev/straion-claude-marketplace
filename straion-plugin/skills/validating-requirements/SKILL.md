---
name: validating-requirements
description: |
  Validates code, specifications, and tasks against project requirements using Straion's semantic matching. Use when checking compliance, validating PRs, reviewing specs against requirements, or when user asks "does this meet requirements", "check compliance", "validate this".
---

# Validating Requirements

## Process

1. Receive description of what to validate (spec, task, or code)
2. Run `straion find-requirements` — see [../shared/STRAION_CLI.md](../shared/STRAION_CLI.md)
3. Analyze compliance against each returned requirement
4. Report structured findings

## Validation Levels

| Level | What | Check Against |
|-------|------|--------------|
| Spec | PRDs, ADRs, RFCs | Architecture, security, design principles |
| Task | Implementation tasks | Technical requirements, API contracts, testing |
| Code | Actual changes | Coding standards, security, performance |

## Compliance Analysis

For each requirement returned by the CLI:

1. Read and understand what it mandates/prohibits
2. Compare against the input
3. Identify gaps or violations
4. Assess severity (critical, important, minor)

## Output Format

```
## Requirements Validation Report

### Summary
[X requirements checked, Y compliant, Z issues]

### Compliant ✅
- **REQ-123**: [Requirement summary] — ✅ [What was done correctly]

### Partial Compliance ⚠️
- **REQ-456**: [Requirement summary] — ⚠️ [What's missing]
  - **Recommendation**: [Specific fix]

### Violations ❌
- **REQ-789**: [Requirement summary] — ❌ [The violation]
  - **Risk**: [Impact]
  - **Fix**: [Concrete solution]
```

## Severity Guidelines

- **Critical**: Block until fixed
- **Important**: Address before proceeding
- **Minor**: Note for consideration

## Validation Loop

When violations are found:
1. Report specific violations with concrete fixes
2. User applies fixes
3. Re-validate to confirm compliance
4. Repeat until critical violations are resolved

## Reference
- CLI usage: [../shared/STRAION_CLI.md](../shared/STRAION_CLI.md)
- Terminology: [../shared/TERMINOLOGY.md](../shared/TERMINOLOGY.md)
- Error handling: [../shared/ERROR_HANDLING.md](../shared/ERROR_HANDLING.md)
