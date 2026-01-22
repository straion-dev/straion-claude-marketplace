---
name: developing-with-requirements
description: |
  Guides users through requirements-first feature implementation from idea to production code. Validates specs, tasks, and implementation against project requirements at every step. Use when building features, implementing specs, or when user says "help me build", "implement this", "add feature", or wants requirements compliance checking.
context: fork
allowed-tools: Bash, Skill
---

# Developing with Requirements

## Contents

- [Mission](#mission)
- [Core Philosophy](#core-philosophy)
- [Workflow](#workflow)
- [Workflow Modes](#workflow-modes)
- [Skill Coordination](#skill-coordination)
- [User Interaction](#user-interaction)
- [Error Handling](#error-handling)

---

## Mission

Guide users through a systematic, requirements-first approach to software development. Every feature aligns with project requirements and quality standards.

## Core Philosophy

- **Requirements First**: Build the RIGHT features that meet documented requirements
- **Systematic Validation**: Validate at multiple levels to catch issues early
- **Guided Process**: Clear structure while remaining flexible

## Workflow

### Step 1: Idea to Specification

**Goal**: Transform a rough idea into a clear, lightweight specification.

**Process**:

1. **Understand the request** using `AskUserQuestion` when ambiguous
2. **Create lightweight spec** covering:
   - Overview, Goals, Scope
   - Key Requirements (must-have vs nice-to-have)
   - Acceptance Criteria, Technical Approach
   - Open Questions

---

### Step 2: Validate Specification

**Goal**: Ensure the spec complies with project requirements BEFORE planning.

**Process**:

1. **Call validating-requirements**:

   ```
   Skill(straion:validating-requirements)
   ```

   Pass the full spec or detailed feature description.

2. **Review feedback**:
   - ✅ Compliant: Proceed
   - ⚠️ Partial: Note adjustments needed
   - ❌ Violations: Must fix before proceeding

3. **Refine spec** based on feedback

4. **Re-validate** if major changes were made

**Gate**: Only proceed when spec has no critical violations.

---

### Step 3: Plan & Validate Tasks

**Goal**: Break down the validated spec into compliant implementation tasks.

**Process**:

1. **Call planning-implementation**:

   ```
   Skill(straion:planning-implementation)
   ```

   This skill will:
   - Enter Plan Mode for user approval
   - Gather codebase context
   - Create detailed tasks
   - Validate each task against requirements
   - Exit Plan Mode for user approval

2. **User approves the plan** via Plan Mode UI

3. **Proceed to implementation** once approved

**Output**: User-approved, validated task list ready for implementation.

---

### Step 4: Implement

**Goal**: Execute the validated tasks while maintaining compliance.

**Process**:

1. **Track with TodoWrite**: Create todo for each task, mark progress
2. **Implement task by task**: Follow task descriptions and validation feedback
3. **Validate as needed**: For complex tasks, call `validating-requirements`
4. **Test and verify**: Write tests, ensure acceptance criteria are met

---

## Workflow Modes

| Mode              | When                     | Flow               |
| ----------------- | ------------------------ | ------------------ |
| **Full**          | Starting from rough idea | Step 1 → 2 → 3 → 4 |
| **From Spec**     | Have existing spec       | Step 2 → 3 → 4     |
| **Validate Only** | Just check compliance    | Step 2 only        |
| **Plan Only**     | Just create tasks        | Step 3 only        |

---

## Skill Coordination

### validating-requirements

- **When**: Steps 2, and optionally during Step 4
- **Purpose**: Validate specs, tasks, or code against requirements
- **How**: `Skill(straion:validating-requirements)` with detailed description

### planning-implementation

- **When**: Step 3
- **Purpose**: Break spec into validated tasks
- **How**: `Skill(straion:planning-implementation)` with spec content
- **Note**: Uses Plan Mode for user approval, internally calls validating-requirements for each task

---

## User Interaction

- **Be Conversational**: Explain what you're doing, ask when unclear
- **Be Transparent**: Show validation results, explain violations, recommend solutions
- **Be Flexible**: Adapt to existing artifacts, skip unnecessary steps
- **Track Progress**: Use TodoWrite for multi-task implementations

---

## Example

See [EXAMPLE.md](./references/EXAMPLE.md) for a complete SSO login implementation walkthrough.

---

## Error Handling

See [../shared/ERROR_HANDLING.md](../shared/ERROR_HANDLING.md) for common error patterns.

---

## Reference

- [Terminology](../shared/TERMINOLOGY.md)
- [Error Handling](../shared/ERROR_HANDLING.md)

---

## Success Criteria

1. ✅ User understands what was built and why
2. ✅ Spec and tasks are validated
3. ✅ Critical violations are addressed
4. ✅ Implementation works and passes tests
5. ✅ Solution meets requirements
