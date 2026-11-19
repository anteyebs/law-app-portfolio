# Law App — Portfolio Demo
**Live demo:** https://law-app-portfolio--ceedini.replit.app

A full-stack TypeScript web application: an A–Z reference with structured entries, built as a pnpm monorepo.

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Express 5 API serving the entry dataset
- **Stack:** TypeScript, PostgreSQL + Drizzle ORM, Zod validation, OpenAPI codegen

## Demo note
This public version ships with **sample data only (15 entries)** so the code and structure can be reviewed. The full dataset is proprietary and lives in a private repository.

Developed with AI assistance and independently audited and refined by me.

## Run it locally

Requires Node.js v20+ and pnpm.

1. `pnpm install` (first time only)
2. Terminal 1: `PORT=3001 pnpm --filter api-server dev`
3. Terminal 2: `PORT=5173 BASE_PATH=/ pnpm --filter lawphabet dev`
4. Open http://localhost:5173

Letter A contains the sample entries; the other letters show an empty message by design in this demo version.
