---
name: planning-implementation
description: |
  Breaks down specifications into validated, actionable implementation tasks using Plan Mode for user approval. Validates each task against project requirements. Called by developing-with-requirements workflow, or directly for "create implementation plan", "break down this spec", "plan the implementation tasks".
context: fork
allowed-tools: EnterPlanMode, ExitPlanMode, Skill, AskUserQuestion, Grep, Glob, Read
---

# Planning Implementation

## Contents

- [Purpose](#purpose)
- [When Called](#when-called)
- [Planning Checklist](#planning-checklist)
- [Process](#process)
- [Output](#output)

---

## Purpose

Transform specifications into validated, actionable implementation tasks using Claude Code's Plan Mode for user approval.

## When Called

This skill is called internally by `developing-with-requirements`, or directly when user wants to plan implementation tasks.

## Planning Checklist

Track progress through the planning workflow:

```
- [ ] Analyze the spec
- [ ] Enter Plan Mode
- [ ] Gather codebase context
- [ ] Clarify ambiguities
- [ ] Create implementation plan
- [ ] Validate tasks against requirements
- [ ] Refine based on validation
- [ ] Exit Plan Mode for approval
```

## Process

### Step 1: Analyze the Spec

Read the specification from the provided context:

- Markdown file on disk
- GitHub issue
- User prompt

Identify goals, constraints, and success criteria.

### Step 2: Enter Plan Mode

Call `EnterPlanMode` to begin the planning process. This:

- Signals to the user that planning is starting
- Allows thorough codebase exploration
- Enables user approval before implementation

### Step 3: Gather Codebase Context

Use `Grep`, `Glob`, `Read` to understand:

- Architecture patterns
- Coding conventions
- Relevant existing structures
- Dependencies and integration points

Be thorough - good context leads to better tasks.

### Step 4: Clarify Ambiguities

If the spec is ambiguous, use `AskUserQuestion` for:

- Primary objective (user value, technical improvement, compliance)
- Constraints (compatibility, performance, resources)
- Success criteria (measurable acceptance)
- Scope (MVP vs complete feature)

### Step 5: Create Implementation Plan

Display the plan to the user. You MUST NOT exit plan mode at this point. Perform the validation first.

### Step 6: Validate Tasks Against Requirements

For each task, call `Skill(straion:validating-requirements)`:

- Pass the task description
- Review compliance feedback
- Note any violations or gaps
- Update plan with validation results

Add validation status to each task:

```markdown
- **Validation**: ✅ Compliant with REQ-123, REQ-456
```

### Step 7: Refine Based on Validation

Apply validation feedback:

- Address requirement violations
- Fill identified gaps
- Adjust scope or approach as needed
- Ensure each task is compliant

### Step 8: Exit Plan Mode

Once the plan is complete and validated:

1. Ensure the plan file is saved
2. Call `ExitPlanMode` for user approval
3. User reviews and approves the plan

## Output

The plan from the Plan Mode is stored by agent.

---

## Reference

- [Terminology](../shared/TERMINOLOGY.md)
- [Error Handling](../shared/ERROR_HANDLING.md)
