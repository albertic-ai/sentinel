# Sentinel — Agent Rules

## What is Sentinel?

Sentinel is an enterprise agent fleet for environmental intelligence. It enables organizations to securely deploy, manage, and monitor specialized AI agents that work autonomously with Earth and environmental data, while providing persistent memory, identity, governance, security, and end-to-end observability.

## Repository

https://github.com/albertic-ai/sentinel

## Project Structure

```
sentinel/
├── frontend/              # Next.js 16 dashboard
│   ├── app/               # App Router pages
│   │   ├── auth/          # Login, signup, forgot, reset, verify
│   │   ├── console/       # Dashboard, agents, registry, memory, observability, connectors, settings, help
│   │   └── legal/         # Terms, privacy, cookies
│   ├── components/
│   │   ├── app/           # AppHeader, AppFooter, AppLayout
│   │   ├── console/       # ConsoleHeader, ConsoleLayout, ConsoleSidebar, SettingsSidebar
│   │   └── ui/            # shadcn/ui primitives
│   └── lib/               # Utilities
├── backend/               # Python FastAPI + Google ADK
│   ├── agents/            # ADK agent definitions
│   │   ├── orchestrator/  # Root orchestrator (delegates to sub-agents)
│   │   ├── wildfire/      # Wildfire Sentinel (NASA FIRMS)
│   │   ├── air_quality/   # Air Quality Analyst (OpenAQ, OpenWeather)
│   │   ├── deforestation/ # Deforestation Tracker (Sentinel Hub)
│   │   └── compliance/    # Compliance Reporter (Memory Bank)
│   ├── api/               # FastAPI route handlers
│   ├── connectors/        # Environmental data source clients
│   ├── gateway/           # Routing + Model Armor middleware
│   ├── identity/          # Agent Identity + auth
│   ├── memory/            # Memory Bank integration
│   ├── models/            # Pydantic schemas
│   ├── observability/     # OpenTelemetry + audit logging
│   ├── registry/          # Agent Registry client
│   └── tests/             # Test suite
└── .github/workflows/     # CI/CD
```

## Rules

- Always work within the correct subdirectory (`frontend/` or `backend/`)
- Frontend: TypeScript, Next.js App Router, shadcn/ui, Tailwind CSS v4
- Backend: Python 3.12, FastAPI, Google ADK, async/await
- Do not commit `.env.local` or `.vscode/`
- Use `.env.example` as the template for environment variables
- Run `npm run lint` before committing frontend changes
- Follow Conventional Commits format for all commits
- No mock data in committed code — use skeleton loading states
- Light theme only (no dark mode)
- Font: Google Sans Flex

## Code Style

| Area | Convention |
|------|-----------|
| Frontend components | PascalCase (`AgentCard.tsx`) |
| Frontend utilities | camelCase (`formatTimestamp.ts`) |
| Frontend non-component files | kebab-case |
| Python files | snake_case |
| Constants | UPPER_SNAKE_CASE |
| Types/Interfaces | PascalCase |

## Security

- Never hardcode secrets or credentials
- Validate all inputs at API boundaries
- Use parameterized queries for database access
