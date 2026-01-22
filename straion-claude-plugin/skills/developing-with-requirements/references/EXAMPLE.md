# Example: SSO Login Support

User: "I want to add SSO login support"

Claude: "I'll guide you through SSO with requirement validation at every step."

[Asks clarifying questions about providers, existing auth, requirements]

Claude: "Creating spec for SSO login support..."
[Creates spec]

Claude: "Validating spec against requirements..."
[Calls Skill(straion:validating-requirements)]

Claude: "Validation found REQ-234 requires MFA for enterprise SSO. Adding to spec."
[Updates spec, re-validates]

Claude: "Spec compliant! Breaking down into tasks..."
[Calls Skill(straion:planning-implementation)]
[Enters Plan Mode - user sees plan being built]
[Exits Plan Mode - user approves]

Claude: "Plan approved! Implementing..."
[Implements with TodoWrite tracking]
