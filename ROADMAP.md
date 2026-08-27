# Roadmap

This document outlines planned features and milestones for Sentinel.

---

## Phase 1 — Foundation

*Platform scaffolding and core infrastructure*

- [x] Monorepo structure (frontend + backend)
- [x] Next.js frontend with shadcn/ui and Tailwind CSS v4
- [x] Project documentation and governance files
- [x] Backend service scaffolding (FastAPI)
- [x] Authentication and authorization system (JWT + bcrypt)
- [x] API layer (agents, fleet, registry, memory, connectors, observability, settings, chat)

## Phase 2 — Agent Core

*Agent lifecycle and identity management*

- [x] Agent definitions with Google ADK (orchestrator + 4 specialists)
- [x] Chat interface with GenKit + Gemini
- [x] Connectors registered as agent tools
- [ ] Agent identity and credential provisioning
- [ ] Agent deployment and health check system
- [ ] Persistent memory layer (Memory Bank integration)
- [ ] Agent-to-agent communication protocol

## Phase 3 — Environmental Intelligence

*Data integrations and domain capabilities*

- [x] Environmental data connectors (NASA FIRMS, OpenAQ, Sentinel Hub, OpenWeather)
- [ ] Geospatial data processing pipeline
- [ ] Environmental anomaly detection models
- [ ] Shared knowledge graph for agent fleets
- [ ] Data lineage and provenance tracking

## Phase 4 — Governance and Security

*Enterprise-grade controls*

- [ ] Policy engine for agent behavior constraints
- [ ] Role-based access control (RBAC) for fleet operations
- [ ] Full audit trail for agent actions and decisions
- [ ] Model Armor guardrails (prompt injection, PII, tool poisoning)
- [ ] Secret management and rotation
- [ ] Multi-tenant isolation

## Phase 5 — Observability and Operations

*Fleet monitoring and operational maturity*

- [x] Fleet dashboard (status, health, activity, alerts)
- [ ] Structured logging with OpenTelemetry
- [ ] Alerting and anomaly detection on agent behavior
- [ ] Agent memory versioning and rollback
- [ ] Fleet-wide configuration management

## Phase 6 — Scale and Production

*Production readiness and enterprise deployment*

- [x] Cloud Run deployment (frontend + backend)
- [x] CI/CD pipeline (GitHub Actions)
- [ ] Automated test coverage
- [ ] Infrastructure as Code (IaC) deployment
- [ ] Disaster recovery and backup strategies
- [ ] Performance optimization and caching
- [ ] SDK and API documentation for integrators

---

*This roadmap is subject to change as the project evolves. Phases may overlap.*
