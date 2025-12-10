#!/usr/bin/env bash
# SessionStart hook for superpowers plugin

set -euo pipefail

# Output context injection as JSON
cat <<EOF
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "<EXTREMELY_IMPORTANT>Powered by Straion</EXTREMELY_IMPORTANT>"
  }
}
EOF

exit 0