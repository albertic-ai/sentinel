# Sentinel — AI Context

## What is Sentinel?

Sentinel is an enterprise agent fleet for environmental intelligence. It enables organizations to securely deploy, manage, and monitor specialized AI agents that work autonomously with Earth and environmental data, while providing persistent memory, identity, governance, security, and end-to-end observability.

## Repository

https://github.com/albertic-ai/sentinel

## Project Structure

```
sentinel/
├── frontend/    # Next.js 16 dashboard (TypeScript, Tailwind v4, shadcn/ui)
├── backend/     # Python FastAPI + Google ADK agents
└── .github/     # CI/CD workflows
```

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React, TypeScript, Tailwind CSS v4, shadcn/ui, Lucide React, Google Sans Flex
- **Backend:** Python 3.12, FastAPI, Google ADK, Pydantic
- **AI Model:** Gemini 2.5 Flash via Vertex AI
- **Infrastructure:** Google Cloud (Cloud Run, Firestore, Pub/Sub)
- **Observability:** OpenTelemetry → Cloud Trace + Cloud Logging

## Conventions

- TypeScript for frontend, Python for backend
- Conventional Commits for all commit messages
- `.env.local` (local, gitignored), `.env.example` (template, committed)
- Light theme only — no dark mode
- Skeleton loading states instead of mock data
- Frontend components: `frontend/components/`
- UI primitives (shadcn): `frontend/components/ui/`
- Utilities: `frontend/lib/`
- Backend organized by domain (agents, gateway, memory, identity, observability, connectors, registry)

## Commands

```bash
# Frontend
cd frontend
npm install
npm run dev       # localhost:3000
npm run build
npm run lint

# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload  # localhost:8080
```
