# Sentinel Backend — AI Context

Python backend using FastAPI + Google ADK on Cloud Run.

## Structure

- `agents/` — ADK agent definitions (orchestrator + 4 sub-agents)
- `api/` — FastAPI route handlers
- `connectors/` — Environmental data API clients (NASA FIRMS, OpenAQ, Sentinel Hub, OpenWeather)
- `gateway/` — Routing + Model Armor middleware
- `identity/` — User auth + agent SPIFFE identity
- `memory/` — GEAP Memory Bank client
- `models/` — Pydantic schemas
- `observability/` — OpenTelemetry tracing + audit logs
- `registry/` — GEAP Agent Registry client
- `tests/` — Test suite

## Conventions

- Python 3.12, async/await throughout
- Pydantic for data validation
- `config.settings` for all configuration
- Each agent: `__init__.py`, `agent.py`, `tools.py`
- Connectors: thin async httpx clients
- No mock data — return empty structures

## Commands

```bash
pip install -r requirements.txt
uvicorn main:app --reload  # localhost:8080
```
