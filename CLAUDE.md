# Sentinel — AI Context

## What is Sentinel?

Sentinel is an enterprise agent fleet for environmental intelligence. It enables organizations to securely deploy, manage, and monitor specialized AI agents that work autonomously with Earth and environmental data, while providing persistent memory, identity, governance, security, and end-to-end observability.

## Project Structure

```
sentinel/
├── frontend/          # Next.js dashboard — fleet management UI
├── backend/           # API and agent orchestration service
├── .env.example       # Environment variable template (committed)
└── .env.local         # Local secrets (gitignored)
```

## Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS v4, shadcn/ui, Lucide React
- **Backend:** TBD (Node.js / Python)
- **Database:** TBD (PostgreSQL + vector store for agent memory)
- **Agent Runtime:** TBD
- **Observability:** TBD (OpenTelemetry)

## Domain Concepts

- **Agent** — An autonomous AI unit with identity, memory, and capabilities focused on environmental tasks
- **Fleet** — A collection of agents managed together under shared policies
- **Memory** — Persistent, contextual storage enabling agents to retain and recall information
- **Governance** — Policies constraining agent behavior, access, and decision-making
- **Observability** — Logging, metrics, tracing, and alerting for agent operations
- **Environmental Intelligence** — Insights derived from Earth observation, climate, and geospatial data

## Conventions

- Use TypeScript throughout
- Follow Conventional Commits for commit messages
- Environment variables: `.env.local` (local, gitignored), `.env.example` (template, committed)
- Frontend components: `frontend/components/`
- UI primitives (shadcn): `frontend/components/ui/`
- Utilities: `frontend/lib/`
- Backend modules organized by domain concern (agents, memory, governance, observability, integrations)

## Commands

```bash
# Frontend
cd frontend
npm install      # Install dependencies
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

## Key Design Decisions

- Monorepo for co-located frontend and backend development
- Agent-first architecture: agents are first-class entities with identity and lifecycle
- Persistent memory as a core primitive, not an afterthought
- Governance built-in from the start (not bolted on later)
- Environmental data integrations as pluggable connectors
