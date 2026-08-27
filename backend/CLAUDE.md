# Sentinel Backend — AI Context

Python backend using FastAPI + Google ADK on Cloud Run.

## Conventions

- Python 3.12, async/await throughout
- Pydantic for data validation
- Use `config.settings` for all configuration
- Each agent in `agents/` has `__init__.py`, `agent.py`, and `tools.py`
- Connectors are thin API clients in `connectors/`
- GEAP integrations are in `gateway/`, `memory/`, `identity/`, `registry/`
- API routes in `api/`, models in `models/`

## Commands

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```
