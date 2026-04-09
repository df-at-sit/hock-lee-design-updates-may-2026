# Hock Lee Bus Riots — Design Source of Truth

This directory is the **design source of truth** for the Hock Lee Bus Riots pixel scenario gameplay. It is a standalone Next.js app that runs the scenario in isolation, decoupled from auth, Supabase, and the rest of the platform.

Treat this as the canonical reference for scene flow, art direction, choices, dispositions, and UX. Any changes to gameplay design land here first, then get integrated into the main app.

Extracted from `sit/ui-changes` branch (see CYO-104/105/106 for the integration plan).

## Run

```bash
cd design-sot
npm install
npm run dev
```

Open http://localhost:3100 — the root redirects to `/hock-lee-bus-riots-pixel`.

## Structure

- `src/app/hock-lee-bus-riots-pixel/` — the entire pixel scenario (scenes, cutscenes, character select, map, story-paths, scene-variants, disposition radar)
- `public/background/`, `public/artifacts/`, `public/npcfigures/` — required art assets

## What is intentionally NOT included

- Supabase / auth / middleware
- Game session API routes
- AI narration providers
- Main app landing/dashboard/profile flow

These belong to the platform integration work tracked separately.
