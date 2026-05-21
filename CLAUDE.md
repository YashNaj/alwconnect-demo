## Project Configuration

- **Language**: TypeScript
- **Package Manager**: bun
- **Add-ons**: prettier, eslint, tailwindcss, sveltekit-adapter, drizzle, mcp

---

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available Svelte MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.


# context-mem Integration

context-mem is active in this project. It compresses tool outputs via 14 content-aware summarizers (99% token savings) and serves optimized context through MCP.

## Workflow (IMPORTANT — follow this order)

1. **Session start**: Call `restore_session` to recover prior context
2. **Before re-reading files**: Call `search` first — the answer may already be stored
3. **After large outputs**: Call `observe` to compress and store content
4. **Need details on a search result?**: Call `get` with the ID — never guess content
5. **Need chronological context?**: Call `timeline` — optionally with `anchor` ID for before/after view
6. **When learning patterns**: Call `save_knowledge` for decisions, error fixes, API patterns
7. **Periodically**: Call `budget_status` — if >80%, call `restore_session` to save state and reclaim context

## Rules

- ALWAYS `search` before `get` — never guess observation IDs
- ALWAYS `observe` outputs over 500 tokens — keep context clean
- NEVER call `get` without first finding the ID via `search` or `timeline`
- When `budget_status` shows >80%: save your work, call `restore_session`

## Available MCP Tools

- `observe` — store and compress content (auto-summarized)
- `search` / `get` / `timeline` — retrieve stored context (use in this order)
- `stats` — view compression statistics
- `save_knowledge` / `search_knowledge` — persistent knowledge base
- `budget_status` / `budget_configure` — token budget management
- `emit_event` / `query_events` — event tracking
- `restore_session` — session continuity + context reclaim
