#!/usr/bin/env node

const { execSync } = require("child_process");

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  const { session_id } = JSON.parse(input);
  try {
    execSync(`straion session-start --session-id "${session_id}"`, {
      stdio: "inherit",
    });
  } catch (e) {
    process.exit(e.status || 1);
  }
});
