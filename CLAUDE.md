# Sentinel — AI Context

## What is Sentinel?

Sentinel is an enterprise agent fleet for environmental intelligence. It enables organizations to securely deploy, manage, and monitor specialized AI agents that work autonomously with Earth and environmental data, while providing persistent memory, identity, governance, security, and end-to-end observability.

## Project Structure

```
sentinel/
├── frontend/          # Next.js dashboard
├── backend/           # Backend service
├── .env.example       # Environment variable template (committed)
└── .env.local         # Local secrets (gitignored)
```

## Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS v4, shadcn/ui, Lucide React
- **Backend:** TBD
- **Database:** TBD
- **Observability:** TBD

## Conventions

- Use TypeScript throughout
- Follow Conventional Commits for commit messages
- Environment variables: `.env.local` (local, gitignored), `.env.example` (template, committed)
- Frontend components: `frontend/components/`
- UI primitives (shadcn): `frontend/components/ui/`
- Utilities: `frontend/lib/`

## Commands

```bash
# Frontend
cd frontend
npm install      # Install dependencies
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```
