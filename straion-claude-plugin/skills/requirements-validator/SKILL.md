---
name: requirements-validator
description: |
  Core validation skill that ensures code, specs, and tasks comply with project requirements.
  Automatically used by other skills and agents during the development workflow. Can also be called directly.

  Automatically used during:
  - Feature implementation (via spec-implementation-planning skill)
  - Spec breakdown and task creation
  - Requirements-driven development workflow

  Can also be called directly for:
  - Ad-hoc validation: "validate this [code/spec/task]"
  - Code review: "check this PR against requirements"
  - Quick compliance checks

  Validates at multiple levels: specs (PRDs, ADRs, RFCs), tasks, or code changes.
tools: find_requirements_for_task
---

# Requirements Validator Skill

## Core Capability

Autonomously validate code, specifications, and tasks against project requirements using Straion's AI-powered semantic matching and requirement management system.

## How It Works

1. **Receive**: Task, spec, or code description from user or calling agent
2. **Fetch**: Call MCP tool to retrieve semantically matched requirements
3. **Analyze**: Compare the input against each relevant requirement
4. **Report**: Provide structured validation feedback with specific findings
5. **Recommend**: Suggest changes if violations or gaps are found

## MCP Tool Usage

### Tool: `find_requirements_for_task`

**Input Format** (`taskDescription` parameter):
Provide a detailed description of what you're validating:

- **For specs**: Describe the overall feature, goals, and approach
- **For tasks**: Include technical details, APIs, patterns, affected components
- **For code**: Describe functionality, files changed, patterns used

**Output Format**:
Returns an array of requirements, each containing:

- `id`: Requirement identifier
- `content`: Full requirement text/description
- `relevance`: Score indicating semantic match quality

Requirements are ranked by:

1. Semantic similarity (vector search)
2. AI classification and relevance
3. Topic-based reranking

### Best Practices for Task Descriptions

**Good Examples**:

- "Implement user authentication using JWT tokens, including login, logout, and token refresh endpoints in the NestJS gateway service"
- "Create a React component for displaying user profiles with avatar, name, email, and role information using Radix UI components"
- "Add database migration to create `organizations` table with columns for name, domain, settings, and timestamps"

**Avoid**:

- Vague descriptions: "add auth" (too generic)
- Missing context: "update the component" (which component? how?)
- No technical details: "make it work" (no actionable information)

## Validation Process

### Step 1: Fetch Requirements

```
Call the "find_requirements_for_task" tool with detailed description
→ Receive top 10 semantically matched requirements
```

### Step 2: Analyze Compliance

For each requirement:

1. **Read requirement carefully** - Understand what it mandates, prohibits, or recommends
2. **Compare against input** - Check if the spec/task/code complies
3. **Identify gaps** - Note missing elements or violations
4. **Assess severity** - Determine if it's critical, important, or minor

### Step 3: Report Findings

Provide structured feedback:

**✅ Compliant**: Requirements that are met

- List the requirement ID and what was done correctly
- Acknowledge good practices

**⚠️ Partial Compliance**: Requirements partially addressed

- Explain what's missing or incomplete
- Suggest specific additions or changes

**❌ Violations**: Requirements that are violated

- Clearly state the violation
- Explain the risk or impact
- Provide concrete fix recommendations

**❓ Unclear**: Requirements where compliance cannot be determined

- Explain what information is missing
- Ask clarifying questions

**When to use AskUserQuestion for unclear requirements**:
- Requirement language is ambiguous and could be interpreted multiple ways
- Insufficient detail in spec/task to determine compliance
- Context needed from user to make compliance determination
- Business domain knowledge required

**Example AskUserQuestion usage**:
```
Scenario: REQ-234 states "System must be performant"
This is too vague to validate - need clarification

AskUserQuestion:
- Question: "What performance targets should we meet for this feature?"
  Header: "Performance"
  Options:
    - Sub-100ms response times (aggressive, may need caching/optimization)
    - Sub-500ms response times (moderate, standard API performance)
    - Sub-2s response times (relaxed, acceptable for complex operations)
    - No specific target (follow general best practices)
```

### Step 4: Recommend Actions

Based on findings:

- **If critical violations**: Recommend blocking until fixed
- **If important gaps**: Suggest addressing before proceeding
- **If minor issues**: Note for future consideration
- **If compliant**: Give approval with any optional improvements

**When to use AskUserQuestion at this step**:
- Multiple valid approaches exist to fix violations
- Prioritization needed between competing requirements
- Business decision required for requirement interpretation
- Trade-offs exist between compliance and other factors (timeline, complexity)
- User input needed to choose between exemption vs implementation

**Example AskUserQuestion usage**:
```
When validation finds a violation with multiple solutions:

Scenario: REQ-789 violated - "All authentication must use MFA"
Current spec: "Implement JWT-based authentication"

AskUserQuestion:
- Question: "How should we address the MFA requirement violation?"
  Header: "MFA approach"
  Options:
    - Add TOTP-based MFA (standard approach, medium complexity, good UX)
    - Add SMS-based MFA (simpler, lower security, carrier dependencies)
    - Add email-based MFA (simplest, lower security, delays)
    - Request requirement exemption (requires approval, may not be granted)

Scenario: Partial compliance with multiple gaps
Validation found: Missing REQ-456 (rate limiting), REQ-457 (logging), REQ-458 (monitoring)

AskUserQuestion:
- Question: "Which compliance gaps should we address first?"
  Header: "Priority"
  multiSelect: true
  Options:
    - Rate limiting (prevents abuse, critical for production)
    - Logging (aids debugging, important for support)
    - Monitoring (enables observability, can be added later)
    - Address all now (complete compliance, more work)
```

## Validation Levels

This skill can validate at different levels of granularity:

### Level 1: Specification Validation (High-Level)

Validate overall feature specs (PRDs, ADRs, RFCs) against:

- Architecture requirements
- Security policies
- Design principles
- Business rules

**Example Input**:
"Validate this PRD for a new multi-tenant SaaS feature that allows organizations to customize their workspace branding, including logos, colors, and domain names."

### Level 2: Task Validation (Mid-Level)

Validate individual implementation tasks against:

- Technical requirements
- Code quality standards
- API contracts
- Testing requirements

**Example Input**:
"Validate this task: 'Create GraphQL mutation for updating organization branding settings with validation for image formats and color hex codes.'"

### Level 3: Code Validation (Implementation-Level)

Validate actual code changes against:

- Coding standards
- Security requirements
- Performance requirements
- Accessibility guidelines

**Example Input**:
"Validate this implementation in services/gateway/src/organizations/organizations.resolver.ts that adds a new mutation for branding updates using Kysely for database queries and Cerbos for authorization."

## Integration with Other Skills

This skill is designed to be called by other skills and agents:

### Called by `spec-implementation-planning`

At Steps 5-6, the planning skill calls this validator:

```
Step 5: For each task, call requirements-validator with task description
Step 6: Apply validation feedback to refine tasks
```

### Called by agents

Agents can call this skill at any point:

```
Skill(straion:requirements-validator)
```

### Autonomous Triggering

Claude may automatically invoke this skill when:

- User asks for validation or compliance checking
- Code review context is detected
- Implementation is complete and needs verification

## Example Usage Scenarios

### Scenario 1: Validate Spec Before Task Breakdown

```
User: "I've created a spec for adding SSO support. Can you validate it?"
→ This skill fetches requirements about authentication, security, SSO
→ Validates spec against those requirements
→ Reports compliance, gaps, recommendations
```

### Scenario 2: Validate Task Before Implementation

```
Calling agent: "I have a task to implement OAuth2 login flow"
→ This skill fetches requirements about OAuth, authentication, security
→ Validates task completeness and correctness
→ Suggests additions (e.g., token refresh, error handling)
```

### Scenario 3: Validate Code After Implementation

```
User: "Review this PR for the new email notification service"
→ This skill fetches requirements about notifications, email, templates
→ Validates implementation against requirements
→ Identifies any missing features or violations
```

## Output Format

Provide clear, actionable feedback:

```markdown
## Requirements Validation Report

### Summary

[Brief overview: X requirements checked, Y compliant, Z issues found]

### Compliant ✅

- **REQ-123**: User authentication must use industry-standard protocols
  - ✅ Implementation uses OAuth2 and JWT, both industry standards

### Partial Compliance ⚠️

- **REQ-456**: All API endpoints must include rate limiting
  - ⚠️ Rate limiting configured but missing on 2 endpoints: /refresh, /logout
  - **Recommendation**: Add rate limiting decorators to these endpoints

### Violations ❌

- **REQ-789**: Passwords must never be logged or stored in plain text
  - ❌ Found password logging in error handler at line 45
  - **Risk**: Critical security vulnerability
  - **Fix**: Remove password from error logs, use sanitized messages

### Recommendations

1. Address critical violation REQ-789 immediately
2. Complete rate limiting for REQ-456 before deployment
3. Consider adding MFA support (optional enhancement)
```

## Error Handling

If the MCP tool fails or returns no requirements:

- Inform the user that validation couldn't be completed
- Explain the reason (no requirements found, API error, etc.)
- Suggest next steps (check requirement setup, try different description)
- Still provide general best practice feedback if possible

## Quality Standards

Every validation should:

- Reference specific requirement IDs
- Provide concrete examples from the input
- Give actionable recommendations
- Distinguish between critical, important, and minor issues
- Be respectful and constructive in tone
- Help users improve, not just point out problems

---

## Using AskUserQuestion in Validation

The AskUserQuestion tool enhances the validation process by enabling interactive clarification and decision-making.

### When to Use AskUserQuestion

**✅ DO use AskUserQuestion when**:
- Multiple valid fix approaches exist for violations
- Prioritization needed between competing requirements
- Requirement interpretation requires business context
- Trade-offs exist between compliance and other factors
- Unclear requirements need user input to determine compliance
- User must choose between exemption and implementation

**❌ DON'T use AskUserQuestion when**:
- Violation has one clear fix (just recommend it)
- Best practice is unambiguous (just state it)
- Compliance is clearly met or not met (just report it)
- Question is purely informational without actionable options

### Common Patterns

#### Pattern 1: Multiple Fix Approaches
When a violation can be fixed in different ways with different trade-offs:

```
AskUserQuestion:
- Question: "How should we address [requirement]?"
  Header: "Approach"
  Options:
    - [Approach 1] (trade-offs explanation)
    - [Approach 2] (trade-offs explanation)
    - [Approach 3] (trade-offs explanation)
    - Request exemption (requires approval)
```

#### Pattern 2: Prioritization
When multiple requirements have gaps and resources are limited:

```
AskUserQuestion:
- Question: "Which compliance gaps should we address first?"
  Header: "Priority"
  multiSelect: true
  Options:
    - [Requirement 1] (impact explanation)
    - [Requirement 2] (impact explanation)
    - [Requirement 3] (impact explanation)
    - Address all (complete compliance)
```

#### Pattern 3: Clarifying Unclear Requirements
When requirement is vague or ambiguous:

```
AskUserQuestion:
- Question: "What does [vague requirement] mean for this implementation?"
  Header: "Definition"
  Options:
    - [Interpretation 1] (implications)
    - [Interpretation 2] (implications)
    - [Interpretation 3] (implications)
```

#### Pattern 4: Compliance Trade-offs
When compliance conflicts with other goals:

```
AskUserQuestion:
- Question: "How should we balance [requirement] with [other goal]?"
  Header: "Trade-off"
  Options:
    - Prioritize compliance (slower/more complex)
    - Partial compliance (balanced approach)
    - Defer compliance (faster but risk)
```

### Integration with Validation Steps

**At Step 2 (Analyze Compliance)**:
- Use AskUserQuestion when requirement interpretation is ambiguous
- Let user clarify what compliance means in their context

**At Step 3 (Report Findings)**:
- Use AskUserQuestion to categorize "Unclear" requirements
- Get user input to determine if something is compliant or not

**At Step 4 (Recommend Actions)**:
- Use AskUserQuestion when multiple fix approaches exist
- Let user choose priorities for partial compliance
- Enable decision between exemption vs implementation

### Best Practices

1. **Provide context first**: Explain the requirement and violation before asking
2. **Describe trade-offs**: Help user understand implications of each option
3. **Recommend when appropriate**: Mark preferred option as "(Recommended)"
4. **Limit options**: 2-4 choices maximum, keep focused
5. **Use multiSelect strategically**: Only when priorities are independent
6. **Follow up**: Apply user's choice to refine validation report

### Example Flow with AskUserQuestion

```
Step 1: Fetch requirements
→ Found REQ-456: "All API endpoints must include rate limiting"

Step 2: Analyze compliance
→ Spec describes 5 endpoints, no mention of rate limiting
→ Violation detected

Step 3: Report findings
→ ❌ REQ-456 violated: No rate limiting specified

Step 4: Recommend actions
→ Multiple implementation approaches exist
→ Use AskUserQuestion:

  Question: "How should we implement rate limiting for this API?"
  Header: "Rate limit"
  Options:
    - IP-based (simple, can be bypassed via proxies)
    - Token-based (more secure, requires auth)
    - Hybrid (IP + token, most secure, more complex)
    - Global default (apply org-wide rate limit)

Step 5: Apply user choice
→ User selected: "Token-based"
→ Update recommendation: "Add token-based rate limiting to all 5 endpoints using middleware pattern"
```

---
