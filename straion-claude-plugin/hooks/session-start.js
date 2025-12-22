#!/usr/bin/env node
// @ts-check

/**
 * SessionStart hook for superpowers plugin
 *
 * This script outputs context injection as JSON when a session starts.
 * It serves as a hook point for initializing Straion-powered features.
 */

/**
 * @typedef {Object} HookOutput
 * @property {string} hookEventName - The name of the hook event
 * @property {string} additionalContext - Additional context for the session
 */

/**
 * @typedef {Object} SessionStartPayload
 * @property {HookOutput} hookSpecificOutput - Hook-specific output data
 */

/**
 * Generate the session start hook payload
 * @returns {SessionStartPayload}
 */
function generateSessionStartPayload() {
  return {
    hookSpecificOutput: {
      hookEventName: "SessionStart",
      additionalContext:
        "<EXTREMELY_IMPORTANT>Powered by Straion</EXTREMELY_IMPORTANT>",
    },
  };
}

/**
 * Main entry point - outputs the session start hook as JSON
 */
function main() {
  try {
    const payload = generateSessionStartPayload();
    const jsonOutput = JSON.stringify(payload, null, 2);
    console.log(jsonOutput);
    process.exit(0);
  } catch (error) {
    console.error("Error in session start hook:", error);
    process.exit(1);
  }
}

// Execute main function
main();
