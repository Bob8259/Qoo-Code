import type OpenAI from "openai"

const NEW_TASK_DESCRIPTION = `Create a focused subtask in a chosen mode. Best for simple, self-contained work (e.g. find files, search the codebase, gather information, inspect structure, read-only analysis). The result of the subtask will be returned to you.

The sub-agent starts without the main agent's conversation context. The main agent must provide all context the sub-agent needs in the message, including relevant file paths, requirements, constraints, prior findings, and the expected deliverable.

Prefer ask mode for read-only exploration. Keep the message to one objective with a clear deliverable. 
Do not use for complex implementation, or tasks that need ongoing user back-and-forth.

CRITICAL: Call this tool alone. Do NOT call it alongside other tools in the same turn.`

const MODE_PARAMETER_DESCRIPTION = `Mode slug to begin the subtask in (e.g. ask, code, debug, architect). Use ask for read-only exploration; use other modes only when edits or command execution are required.`

const MESSAGE_PARAMETER_DESCRIPTION = `Single objective for the subtask. The sub-agent has no access to the main agent's conversation context, so include all required context directly: relevant file paths, requirements, constraints, prior findings, and the expected deliverable. Finish with task_completion and a concise summary for the parent.`

const TODOS_PARAMETER_DESCRIPTION = `Optional short markdown checklist to scope a simple subtask; omit when not needed.`

export default {
	type: "function",
	function: {
		name: "new_task",
		description: NEW_TASK_DESCRIPTION,
		strict: true,
		parameters: {
			type: "object",
			properties: {
				mode: {
					type: "string",
					description: MODE_PARAMETER_DESCRIPTION,
				},
				message: {
					type: "string",
					description: MESSAGE_PARAMETER_DESCRIPTION,
				},
				todos: {
					type: ["string", "null"],
					description: TODOS_PARAMETER_DESCRIPTION,
				},
			},
			required: ["mode", "message", "todos"],
			additionalProperties: false,
		},
	},
} satisfies OpenAI.Chat.ChatCompletionTool
