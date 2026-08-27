# Sentinel Backend — AI Context

## What is this?

The backend service for Sentinel — handles agent orchestration, persistent memory, governance, environmental data integrations, and observability.

## Domain Concepts

- **Agent** — Autonomous AI unit with identity, memory, and environmental capabilities
- **Memory** — Persistent contextual storage (vector store + relational)
- **Governance** — Policy engine constraining agent behavior and access
- **Connector** — Integration with an environmental data source
- **Observability** — Structured logging, metrics, traces, and alerts

## Conventions

- Use TypeScript for all new code
- Follow Conventional Commits
- Validate all inputs at API boundaries
- Use parameterized queries for database access
- Never hardcode secrets — use environment variables
- Agents operate under least-privilege principles

## Tech Stack

- TBD (Node.js / Python)
- Database: TBD (PostgreSQL + vector store)
- Observability: TBD (OpenTelemetry)
