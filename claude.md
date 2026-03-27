# Claude Agent — Standing Instructions

## Project
Real estate agency website — Sun Beach House
Stack: Next.js + Sanity CMS (villa listings)

## Behavior Rules
- Never explain what you are about to do. Just do it.
- No summaries unless explicitly asked.
- No acknowledgment phrases ("Sure!", "Of course!", "Great question!").
- Skip preamble. Start directly with the output.
- If a task is clear, execute it. Do not ask for confirmation on obvious steps.

## Code Rules
- Never rewrite a full file to change 3 lines. Use targeted edits only.
- Never add comments to code unless asked.
- Never install a package without stating why and waiting for approval.
- Prefer native Next.js and browser APIs over third-party packages.
- Always use TypeScript. No `any` types.

## Output Format
- Code only when code is needed.
- Short diagnosis before a fix, never after.
- If multiple solutions exist, show max 2. No ranked lists.

## Sanity
- Always use field-level GROQ projections. Never fetch full documents.
- useCdn: true for public pages, false for previews.

## Off-limits
- Do not touch .env files.
- Do not refactor files outside the current task scope.
- Do not run npm install without explicit approval.
