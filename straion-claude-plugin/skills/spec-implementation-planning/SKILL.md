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

Clarify the implementation objectives, constraints, and success criteria.

**When to use AskUserQuestion at this step**:
- Spec is ambiguous or lacks detail on key decisions
- Multiple valid architectural approaches exist
- Scope boundaries are unclear (MVP vs full feature)
- Technical constraints or preferences are unstated
- Trade-offs exist between different implementation strategies
- User preferences will significantly impact task breakdown

**Key questions to clarify**:
- What is the primary goal? (User value, technical improvement, compliance, etc.)
- What constraints exist? (Timeline, resources, compatibility, performance)
- What does success look like? (Measurable acceptance criteria)
- What is the implementation scope? (MVP, incremental, complete)

**Example AskUserQuestion usage**:
```
When spec says "Add notification system" without details:

AskUserQuestion:
- Question: "What type of notification system should we build?"
  Header: "Scope"
  Options:
    - Email only (simplest, lower cost, delayed delivery)
    - Email + in-app (better UX, more complex, requires UI)
    - Email + in-app + push (complete solution, highest complexity)
    - Webhooks only (for integrations, no direct user notifications)

- Question: "What delivery approach should we take?"
  Header: "Strategy"
  Options:
    - Synchronous (immediate, blocks request, simpler)
    - Asynchronous queue (reliable, scalable, requires queue infrastructure)
    - Hybrid (sync for critical, async for others, balanced)
```

**Step 4: Break spec into manageable implementation tasks**

Create detailed, actionable implementation tasks that enable agents to implement features efficiently with minimal additional context gathering. Follow industry best practices for task size.

**When to use AskUserQuestion at this step**:
- Multiple valid task breakdown strategies exist
- Task granularity has significant trade-offs
- Implementation sequence matters (sequential vs parallel)
- Testing strategy choices affect task structure
- Dependencies suggest different ordering options

**Example AskUserQuestion usage**:
```
When creating tasks for a complex feature:

AskUserQuestion:
- Question: "How should we structure the implementation tasks?"
  Header: "Structure"
  Options:
    - Vertical slices (each task = complete user story, easier to test)
    - Horizontal layers (backend → frontend → tests, clear separation)
    - Core-first (build essential features first, then enhancements)
    - Risk-first (tackle complex/unknown parts first, fail fast)

- Question: "What testing approach should we include?"
  Header: "Testing"
  multiSelect: true
  Options:
    - Unit tests for business logic (essential, fast feedback)
    - Integration tests for API contracts (important, catch interface issues)
    - End-to-end tests for critical flows (comprehensive, slower)
    - Manual testing checklist (complement automated tests)
```

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

**When to use AskUserQuestion at this step**:
- Validation reveals multiple ways to fix task violations
- Multiple tasks have compliance gaps that need prioritization
- Trade-offs exist between compliance and implementation complexity
- User input needed to choose between different approaches recommended by validator

**Example AskUserQuestion usage**:
```
When validation feedback offers choices:

Scenario: Task validation found 3 tasks with partial compliance

AskUserQuestion:
- Question: "Which compliance gaps should we address in this iteration?"
  Header: "Priority"
  multiSelect: true
  Options:
    - Task 1: Add rate limiting (REQ-456, critical for production)
    - Task 2: Add audit logging (REQ-457, important for compliance)
    - Task 3: Add monitoring (REQ-458, can be added later)
    - Address all gaps now (complete compliance, more work)

Scenario: Validation suggests a task needs security enhancement

AskUserQuestion:
- Question: "How should we implement the security requirement?"
  Header: "Security"
  Options:
    - Add field-level encryption (highest security, performance impact)
    - Add transport-layer encryption (good security, standard approach)
    - Add hashing for sensitive fields (moderate security, faster)
    - Request requirement exemption (requires approval)
```

Note: The requirements-validator skill handles the actual requirement fetching and compliance checking. This skill focuses on incorporating that feedback into the implementation plan.

---

## Using AskUserQuestion in Planning

The AskUserQuestion tool helps gather critical information and make collaborative decisions during the planning process.

### When to Use AskUserQuestion

**✅ DO use AskUserQuestion when**:
- Spec lacks detail on implementation approach
- Multiple valid architectural strategies exist
- Scope boundaries need clarification (MVP vs complete)
- Task breakdown has meaningful trade-offs
- Testing strategy choices affect the plan
- User preferences will significantly impact implementation
- Validation feedback offers multiple resolution paths

**❌ DON'T use AskUserQuestion when**:
- Spec is clear and detailed
- Best practice approach is obvious
- Repository patterns make the approach clear
- Simple, single-step implementation
- Question is informational without actionable options

### Common Patterns for Planning

#### Pattern 1: Scope Clarification
When spec is vague about feature boundaries:

```
AskUserQuestion:
- Question: "What scope should we target for the initial implementation?"
  Header: "Scope"
  Options:
    - Minimal MVP (core functionality only, fastest delivery)
    - Standard feature set (common use cases covered)
    - Complete implementation (all requirements, longer timeline)
```

#### Pattern 2: Architecture Choice
When multiple technical approaches are valid:

```
AskUserQuestion:
- Question: "What architectural approach should we take?"
  Header: "Architecture"
  Options:
    - Monolithic (simpler, faster to build, easier to debug)
    - Microservices (scalable, independent deployment, more complex)
    - Hybrid (critical services separate, balanced approach)
```

#### Pattern 3: Task Structure
When task breakdown can be organized differently:

```
AskUserQuestion:
- Question: "How should we structure the implementation tasks?"
  Header: "Structure"
  Options:
    - Vertical slices (complete features end-to-end, testable early)
    - Horizontal layers (backend first, then frontend, clear separation)
    - Core-first (essential features, then enhancements)
    - Risk-first (complex parts first, fail fast)
```

#### Pattern 4: Testing Strategy
When testing approach needs definition:

```
AskUserQuestion:
- Question: "What testing coverage should we include?"
  Header: "Testing"
  multiSelect: true
  Options:
    - Unit tests (essential, fast feedback)
    - Integration tests (important, API contracts)
    - E2E tests (comprehensive, critical flows)
    - Performance tests (if performance-critical)
```

#### Pattern 5: Validation Refinement
When compliance gaps need prioritization:

```
AskUserQuestion:
- Question: "Which compliance gaps should we address first?"
  Header: "Priority"
  multiSelect: true
  Options:
    - Security requirements (critical, blocks production)
    - Performance requirements (important, affects UX)
    - Monitoring requirements (valuable, can defer)
    - All requirements (complete compliance)
```

### Integration with Planning Steps

**At Step 2 (Gather Information)**:
- Generally don't use AskUserQuestion yet
- Focus on gathering context from codebase
- Save questions for after you understand the codebase

**At Step 3 (Understand Goal)**:
- Use AskUserQuestion for ambiguous requirements
- Clarify scope, constraints, and success criteria
- Define architectural approaches if unclear

**At Step 4 (Break Down Tasks)**:
- Use AskUserQuestion for task structure decisions
- Clarify testing strategy if not specified
- Choose implementation sequence when options exist

**At Step 6 (Refine Based on Validation)**:
- Use AskUserQuestion when validation offers choices
- Prioritize compliance gaps if resources limited
- Choose between fix approaches when multiple exist

### Best Practices

1. **Gather context first**: Read codebase before asking questions
2. **Ask early in planning**: Get clarity before creating tasks
3. **Explain implications**: Help user understand trade-offs
4. **Recommend when appropriate**: Mark preferred option
5. **Keep focused**: 2-3 related questions maximum
6. **Use answers**: Apply user selections to shape the plan
7. **Document choices**: Include rationale in task descriptions

### Example Planning Flow with AskUserQuestion

```
Step 1: Read spec
→ Spec: "Add user notification system"
→ Vague - needs clarification

Step 2: Gather codebase context
→ Found: Email service exists, no notification table
→ Found: Frontend uses React with notification component library

Step 3: Understand goal - Use AskUserQuestion
→ Ask about notification types (email, in-app, push)
→ Ask about delivery approach (sync, async)
→ User selects: "Email + in-app" and "Async queue"

Step 4: Break down tasks
→ Create tasks based on user selections:
  1. Create notification database schema
  2. Build notification service with async queue
  3. Implement email notification handler
  4. Implement in-app notification handler
  5. Add notification UI components
  6. Write tests for notification system

Step 5: Validate each task
→ Use requirements-validator skill
→ Found: REQ-567 requires notification preferences

Step 6: Refine based on validation - Use AskUserQuestion
→ Ask: "Should we add user notification preferences now or later?"
→ User selects: "Add now for complete compliance"
→ Add task: "Implement notification preference management"

Final output: 7 validated, prioritized tasks ready for implementation
```

---
