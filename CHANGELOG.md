# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Monorepo structure with `frontend/` and `backend/` directories
- Next.js frontend with shadcn/ui, Tailwind CSS v4, and Lucide React
- Auth pages (login, signup, forgot, reset, verify) with real API integration
- Legal pages (terms, privacy, cookies)
- Console pages (dashboard, agents, registry, memory, observability, connectors, settings, help)
- Responsive layout with mobile navigation
- Python FastAPI backend with Google ADK agent scaffolding
- JWT-based authentication API (login, register, me) with bcrypt password hashing
- Backend deployed to Cloud Run
- Frontend deployed to Cloud Run
- Gemini 3.5 Flash integration (Vertex AI or Gemini API)
- Environmental data connectors (NASA FIRMS, OpenAQ, Sentinel Hub, OpenWeather)
- Demo data across all console endpoints (dashboard, agents, registry, memory, connectors, observability, settings)
- Console and settings pages wired to live backend API with loading states
- Detail pages for agents, registry, memory, connectors, and traces with clickable interactions
- Agent chat interface (`/console/chat`) powered by GenKit + Gemini
- Chat supports both Vertex AI and Gemini API auth, with demo responses and prompt suggestions
- Environmental connectors registered as chat tools (NASA FIRMS, OpenAQ, Sentinel Hub, OpenWeather)
- Architecture documentation with Mermaid diagrams (docs/ARCHITECTURE.md)
- Root-level documentation: README, LICENSE (MIT), SECURITY, CODE_OF_CONDUCT, CONTRIBUTING, ROADMAP, CHANGELOG
- Environment variable management (.env.example template, .env.local gitignored)
- Agent and AI context files (AGENTS.md, CLAUDE.md)
- CI/CD workflows and Docker configuration for both services
