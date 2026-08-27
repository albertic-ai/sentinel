# Sentinel — Backend

API and agent orchestration service built with Python, FastAPI, and Google ADK.

## Tech Stack

- Python 3.12
- FastAPI + Uvicorn
- Google ADK (Agent Development Kit)
- Gemini 3.5 Flash via Vertex AI
- Google Cloud (Cloud Run, Firestore, Pub/Sub)
- OpenTelemetry for observability
- httpx for async HTTP
- Pydantic for data validation

## Structure

```
backend/
├── main.py                          # FastAPI entry point
├── config.py                        # Settings (pydantic-settings, env vars)
├── Dockerfile                       # Cloud Run deployment
├── requirements.txt                 # Python dependencies
├── .env.example                     # Environment variable template
├── agents/                          # ADK agent definitions
│   ├── orchestrator/
│   │   ├── agent.py                 # Root orchestrator (delegates to sub-agents)
│   │   └── __init__.py
│   ├── wildfire/
│   │   ├── agent.py                 # Wildfire Sentinel agent
│   │   ├── tools.py                 # NASA FIRMS tools
│   │   └── __init__.py
│   ├── air_quality/
│   │   ├── agent.py                 # Air Quality Analyst agent
│   │   ├── tools.py                 # OpenAQ + OpenWeather tools
│   │   └── __init__.py
│   ├── deforestation/
│   │   ├── agent.py                 # Deforestation Tracker agent
│   │   ├── tools.py                 # Sentinel Hub tools
│   │   └── __init__.py
│   ├── compliance/
│   │   ├── agent.py                 # Compliance Reporter agent
│   │   ├── tools.py                 # Memory Bank + report tools
│   │   └── __init__.py
│   └── __init__.py
├── api/                             # FastAPI route handlers
│   ├── agents.py                    # Agent CRUD + execution
│   ├── fleet.py                     # Fleet status + health
│   ├── memory.py                    # Memory exploration
│   ├── registry.py                  # Registry browsing
│   └── __init__.py
├── connectors/                      # Environmental data source clients
│   ├── nasa_firms.py                # NASA FIRMS API (active fires)
│   ├── openaq.py                    # OpenAQ API (air quality)
│   ├── openweather.py               # OpenWeather API (weather + pollution)
│   ├── sentinel_hub.py              # Sentinel Hub API (satellite imagery)
│   └── __init__.py
├── gateway/                         # Agent Gateway + Model Armor
│   ├── router.py                    # Request routing + policy enforcement
│   ├── middleware.py                # Model Armor content screening
│   ├── policies.py                  # Policy definitions
│   └── __init__.py
├── identity/                        # Agent Identity + auth
│   ├── auth.py                      # User authentication
│   ├── agent_identity.py            # SPIFFE identity per agent
│   └── __init__.py
├── memory/                          # Memory Bank integration
│   ├── bank.py                      # Store, fetch, generate memories
│   └── __init__.py
├── models/                          # Pydantic schemas
│   ├── agent.py                     # Agent config, run request/response
│   ├── memory.py                    # Memory entry models
│   ├── registry.py                  # Registry entry models
│   └── __init__.py
├── observability/                   # Telemetry
│   ├── tracing.py                   # OpenTelemetry setup
│   ├── audit.py                     # Audit log events
│   └── __init__.py
├── registry/                        # Agent Registry integration
│   ├── client.py                    # Register, discover, version agents
│   └── __init__.py
└── tests/                           # Test suite
    ├── test_agents.py
    └── __init__.py
```

## Getting Started

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.example .env.local
uvicorn main:app --reload
```

API available at http://localhost:8080

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| POST | `/api/auth/login` | Log in, returns JWT |
| POST | `/api/auth/register` | Register a new user |
| GET | `/api/auth/me` | Get current user (requires Bearer token) |
| GET | `/api/agents` | List all agents |
| GET | `/api/agents/{name}` | Get agent details |
| POST | `/api/agents/{name}/run` | Execute an agent |
| GET | `/api/fleet/status` | Fleet status summary |
| GET | `/api/fleet/health` | Per-agent health |
| GET | `/api/memory/{agent}` | Get agent memories |
| POST | `/api/memory/{agent}/generate` | Generate memories from session |
| GET | `/api/registry` | List registered agents |
| GET | `/api/registry/discover?query=` | Discover agents |
| GET | `/api/registry/{name}` | Get registry entry |

## Authentication

Auth uses JWT tokens with bcrypt password hashing. A built-in demo user is
available for testing without a database connection:

- **Email:** `demo@sentinel.com`
- **Password:** `Password@123`

Registered users (via `/api/auth/register`) are stored in Firestore.

## Deploy to Cloud Run

```bash
gcloud run deploy sentinel-backend \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```
