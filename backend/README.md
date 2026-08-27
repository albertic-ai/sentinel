# Sentinel — Backend

API and agent orchestration service built with Python, FastAPI, and Google ADK.

## Tech Stack

- Python 3.12
- FastAPI + Uvicorn
- Google ADK (Agent Development Kit)
- Gemini 2.5 Flash via Vertex AI
- Google Cloud (Cloud Run, Firestore, Pub/Sub)
- OpenTelemetry for observability
- httpx for async HTTP

## Structure

```
backend/
├── main.py             # FastAPI entry point
├── config.py           # Settings (pydantic-settings)
├── Dockerfile          # Cloud Run deployment
├── agents/             # ADK agent definitions
│   ├── orchestrator/   # Root orchestrator
│   ├── wildfire/       # Wildfire Sentinel
│   ├── air_quality/    # Air Quality Analyst
│   ├── deforestation/  # Deforestation Tracker
│   └── compliance/     # Compliance Reporter
├── gateway/            # Routing + Model Armor middleware
├── memory/             # Memory Bank integration
├── identity/           # Agent Identity (SPIFFE)
├── registry/           # Agent Registry client
├── observability/      # OpenTelemetry + audit
├── connectors/         # Environmental data APIs
├── api/                # FastAPI route handlers
├── models/             # Pydantic schemas
└── tests/              # Test suite
```

## Getting Started

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.example .env.local
# Fill in .env.local values
uvicorn main:app --reload
```

## Endpoints

- `GET /health` — Health check
- `GET /api/agents` — List agents
- `POST /api/agents/{name}/run` — Execute an agent
- `GET /api/fleet/status` — Fleet status
- `GET /api/fleet/health` — Fleet health
- `GET /api/memory/{agent}` — Agent memories
- `GET /api/registry` — Browse registry
- `GET /api/registry/discover?query=` — Discover agents

## Deploy to Cloud Run

```bash
gcloud run deploy sentinel-backend \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```
