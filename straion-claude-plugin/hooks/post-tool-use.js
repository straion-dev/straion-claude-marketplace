#!/usr/bin/env node
/**
 * Post-tool-use hook for logging PostToolUse hooks
 */

const fs = require("fs");
const path = require("path");

/**
 * @typedef {Object} ToolInput
 * @property {string} [path] - File path being edited
 * @property {string} [operation] - Type of edit operation
 * @property {string} [old_str] - String being replaced
 * @property {string} [new_str] - Replacement string
 * @property {string} [description] - Description of the edit
 */

/**
 * @typedef {Object} ToolResult
 * @property {boolean} [success] - Whether the tool execution succeeded
 * @property {string} [status] - Status of the tool execution
 * @property {string} [error] - Error message if failed
 * @property {*} [data] - Result data
 */

/**
 * @typedef {Object} HookEvent
 * @property {string} tool_name - Name of the tool that was used
 * @property {ToolInput} tool_input - Input parameters passed to the tool
 * @property {ToolResult} tool_result - Result returned by the tool
 * @property {string} [prompt] - The prompt that led to this tool use
 * @property {string} [timestamp] - ISO timestamp of the event
 * @property {string} [session_id] - Current session identifier
 * @property {string} [conversation_id] - Current conversation identifier
 */

/**
 * @typedef {Object} LogEntry
 * @property {string} event - Event type identifier
 * @property {string} tool_name - Name of the tool
 * @property {string} [file_path] - Path to file being edited
 * @property {string} [operation] - Edit operation type
 * @property {string} [prompt_preview] - Truncated prompt
 * @property {number} [prompt_length] - Full prompt length
 * @property {boolean} success - Whether operation succeeded
 * @property {string} [session_id] - Session identifier
 * @property {string} [conversation_id] - Conversation identifier
 * @property {string} timestamp - ISO timestamp
 * @property {string} log_level - Log level (info, warn, error)
 */

// Setup log file path using CLAUDE_PROJECT_DIR
const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const LOG_DIR = path.join(projectDir, ".straion", "logs");
const LOG_FILE = path.join(LOG_DIR, "posttooluse.jsonl");

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

/**
 * Writes a structured log entry to the JSONL log file
 * @param {LogEntry} data - The log data to write
 * @returns {void}
 */
function writeLog(data) {
  const logLine = JSON.stringify(data) + "\n";
  fs.appendFileSync(LOG_FILE, logLine, "utf8");
}

/**
 * Creates a structured log entry for edittool usage
 * @param {HookEvent} event - The hook event data
 * @returns {LogEntry} Structured log entry
 */
function createLogEntry(event) {
  const {
    tool_name,
    tool_input,
    tool_result,
    prompt,
    session_id,
    conversation_id,
  } = event;

  const success = !tool_result?.error && tool_result?.success !== false;

  return {
    event: "PostToolUse",
    tool_name: tool_name,
    file_path: tool_input?.path || null,
    operation: tool_input?.operation || null,
    prompt_preview: prompt ? prompt.substring(0, 200) : null,
    prompt_length: prompt ? prompt.length : 0,
    success: success,
    session_id: session_id || null,
    conversation_id: conversation_id || null,
    timestamp: new Date().toISOString(),
    log_level: success ? "info" : "error",
  };
}

/**
 * Post-tool-use hook that logs usage with structured logging
 * Reads event data from stdin
 */
async function main() {
  // Read JSON from stdin
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }

  const input = Buffer.concat(chunks).toString();

  if (!input.trim()) {
    process.exit(0);
  }

  try {
    /** @type {HookEvent} */
    const event = JSON.parse(input);
    const logEntry = createLogEntry(event);
    writeLog(logEntry);
  } catch (error) {
    // Fail silently to avoid breaking the tool execution
    console.error("Failed to log tool usage:", error);
  }

  process.exit(0);
}

main();
