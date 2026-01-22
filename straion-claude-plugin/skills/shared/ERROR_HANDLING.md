# Common Error Handling

## Straion CLI Errors

| Error                | Cause           | Solution                                                             |
| -------------------- | --------------- | -------------------------------------------------------------------- |
| Authentication error | Not logged in   | Inform the user that they must run `straion login` on their machine. |
| Network error        | API unavailable | Check internet connection                                            |

## Workflow Errors

| Situation                   | Action                                              |
| --------------------------- | --------------------------------------------------- |
| Validation fails repeatedly | Check requirement definitions, skip validation      |
| Planning fails              | Fall back to manual breakdown, still validate tasks |
| Implementation blocked      | Pause, document blocker, suggest alternatives       |
