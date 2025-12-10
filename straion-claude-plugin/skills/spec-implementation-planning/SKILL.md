---
name: spec-implementation-planning
description: |
  The standard way to break down specifications into validated, actionable implementation tasks.
  Gathers codebase context, creates detailed tasks, and automatically validates each task against project requirements.

  ALWAYS use this skill when the user wants to implement features:
  - "implement [spec/feature/functionality]"
  - "add [new feature description]"
  - "build [feature description]"
  - "help me implement [feature description]"
  - "break down [spec/story] into tasks"

  This skill ensures all tasks are grounded in requirements before implementation begins.

  Skip only if: user asks a question (not implementation) or requests a trivial single-step change.
---

## Overview

This guide covers the essential information when breaking down and planning the implementation for software specifications (PRDs, ADRs, RFCs, issues, stories, or informal feature descriptions).

## Quick Start

Copy this checklist and track your progress:

```
Planning Progress:
- [ ] Step 1: Analyse the spec
- [ ] Step 2: Gather additional information relevant for the spec from the repository
- [ ] Step 3: Understand the Goal
- [ ] Step 4: Break spec into manageable implementation tasks
- [ ] Step 5: Find relevant company requirements for each task
- [ ] Step 6: Validate each task against its requirements and suggest changes
```

**Step 1: Analyse the spec**

Read the spec document - might be from a markdown file on disk, Github issue, Jira story or directly from the prompt.

**Step 2: Gather additional information relevant for the spec from the repository**

Use the `Grep`, `Glob`, `Read` tools to gather information from repository or directory relevant for the spec. Look for architecture patterns, coding conventions and understand the structures in the repository that are needed to implement the spec. Be precise and gather all information to create a detailed, well informed plan.

**Step 3: Understand the Goal**

- Ask clarifying questions about what needs to be built
- Understand constraints and success criteria

**Step 4: Break spec into manageable implementation tasks**

Create detailed, actionable implementation tasks that enable agents to implement features efficiently with minimal additional context gathering. Follow industry best practices for task size.

**Step 5: Validate each task against company requirements**

For each task created in Step 4, use the `requirements-validator` skill to check compliance:

- Call `Skill(straion:requirements-validator)` with the task description
- The skill will fetch relevant requirements and validate the task
- Review the validation feedback

**Step 6: Refine tasks based on validation feedback**

Apply the validation feedback from Step 5:

- Address any requirement violations identified
- Fill in gaps or missing elements
- Adjust task scope or approach as recommended
- Ensure each task is compliant before proceeding

Note: The requirements-validator skill handles the actual requirement fetching and compliance checking. This skill focuses on incorporating that feedback into the implementation plan.
