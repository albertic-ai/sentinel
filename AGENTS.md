# Sentinel — Agent Rules

## What is Sentinel?

Sentinel is an enterprise agent fleet for environmental intelligence. It enables organizations to securely deploy, manage, and monitor specialized AI agents that work autonomously with Earth and environmental data, while providing persistent memory, identity, governance, security, and end-to-end observability.

## Project Structure

```
sentinel/
├── frontend/          # Next.js dashboard (fleet management UI)
│   ├── app/           # Next.js App Router pages
│   ├── components/    # React components
│   │   └── ui/        # shadcn/ui primitives
│   └── lib/           # Utilities
├── backend/           # API and agent orchestration service
│   ├── agents/        # Agent definitions and capabilities
│   ├── memory/        # Persistent memory layer
│   ├── governance/    # Policy engine and access control
│   ├── observability/ # Logging, metrics, tracing
│   └── integrations/  # Environmental data connectors
```

## Rules

- Always work within the correct subdirectory (`frontend/` or `backend/`)
- Use TypeScript for all new code
- Follow existing patterns and conventions in each package
- Do not commit `.env.local` or `.vscode/` — they are gitignored
- Use `.env.example` as the template for environment variables
- Run `npm run lint` before committing frontend changes
- Follow Conventional Commits format for all commits

## Domain Context

| Concept | Description |
|---------|-------------|
| Agent | Autonomous AI unit with identity, memory, and environmental capabilities |
| Fleet | Collection of agents under shared governance policies |
| Memory | Persistent contextual storage for agent knowledge |
| Governance | Policy engine constraining agent behavior and access |
| Connector | Integration with an environmental data source |
| Observability | Logging, metrics, traces, and alerts for fleet operations |

## Frontend Commands

```bash
cd frontend
npm install       # Install dependencies
npm run dev       # Dev server (localhost:3000)
npm run build     # Production build
npm run lint      # Lint check
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js (App Router), React, TypeScript, Tailwind CSS v4, shadcn/ui, Lucide React |
| Backend | TBD |
| Database | TBD (PostgreSQL + vector store) |
| Observability | TBD (OpenTelemetry) |

## Code Style

- Components: PascalCase (`AgentCard.tsx`)
- Utilities: camelCase (`formatTimestamp.ts`)
- Constants: UPPER_SNAKE_CASE
- Types/Interfaces: PascalCase with descriptive names (`AgentConfig`, `FleetPolicy`)
- Files: kebab-case for non-component files

## Security Considerations

- Never hardcode secrets or credentials
- Agent operations must be auditable
- Follow least-privilege for agent capabilities
- Validate all inputs at API boundaries
- Use parameterized queries for database access
