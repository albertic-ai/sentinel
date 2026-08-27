# Sentinel

**Enterprise Agent Fleet for Environmental Intelligence**

Sentinel enables organizations to securely deploy, manage, and monitor specialized AI agents that work autonomously with Earth and environmental data. It provides persistent memory, identity, governance, security, and end-to-end observability for agent fleets operating at scale.

**Live App:** [sentinel-frontend-429151084374.us-central1.run.app](https://sentinel-frontend-429151084374.us-central1.run.app)

Repository: [github.com/albertic-ai/sentinel](https://github.com/albertic-ai/sentinel)

---

## Project Structure

```
sentinel/
├── frontend/              # Next.js dashboard (fleet management UI)
├── backend/               # Python FastAPI + Google ADK agents
├── .github/workflows/     # CI/CD pipelines
├── .env.example           # Environment variable template (committed)
├── .gitignore             # Root gitignore
├── AGENTS.md              # Agent coding rules
├── CHANGELOG.md           # Release history
├── CLAUDE.md              # AI context
├── CODE_OF_CONDUCT.md     # Community standards
├── CONTRIBUTING.md        # Contribution guide
├── LICENSE                # MIT License
├── README.md              # This file
├── ROADMAP.md             # Planned features
└── SECURITY.md            # Security policy
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 (App Router), React, TypeScript, Tailwind CSS v4, shadcn/ui, Lucide React |
| Backend | Python 3.12, FastAPI, Google ADK |
| AI Model | Gemini 3.5 Flash via Vertex AI or Gemini API |
| Chat | GenKit with connector tools |
| Auth | JWT (PyJWT) + bcrypt |
| Infrastructure | Google Cloud (Cloud Run, Firestore, Pub/Sub) |
| Observability | OpenTelemetry |
| Font | Google Sans Flex |

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full system architecture and diagrams.

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- Python >= 3.12

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.example .env.local
uvicorn main:app --reload
```

API available at [http://localhost:8080](http://localhost:8080).

### Environment Variables

```bash
cp .env.example .env.local
```

See `.env.example` at root and in each subdirectory for all available variables.

## Live Demo

The frontend is deployed on Google Cloud Run:

- **Frontend:** https://sentinel-frontend-429151084374.us-central1.run.app

**Demo credentials:**

- Email: `demo@sentinel.com`
- Password: `Password@123`

## Deployment

Both services deploy to Cloud Run directly from source:

```bash
# Frontend
gcloud run deploy sentinel-frontend --source ./frontend --region us-central1 --allow-unauthenticated

# Backend
gcloud run deploy sentinel-backend --source ./backend --region us-central1 --allow-unauthenticated
```

## Routes

### Frontend Pages

| Route | Description |
|-------|-------------|
| `/` | Redirects to `/auth/login` |
| `/auth/login` | Sign in |
| `/auth/signup` | Create account |
| `/auth/forgot` | Forgot password |
| `/auth/reset` | Reset password |
| `/auth/verify` | Email verification |
| `/legal/terms` | Terms of Service |
| `/legal/privacy` | Privacy Policy |
| `/legal/cookies` | Cookie Policy |
| `/console/dashboard` | Fleet overview |
| `/console/chat` | Chat with the agent fleet |
| `/console/agents` | Agent management |
| `/console/agents/[name]` | Agent detail |
| `/console/registry` | Agent Registry browser |
| `/console/registry/[name]` | Registry entry detail |
| `/console/memory` | Memory Explorer |
| `/console/memory/[id]` | Memory entry detail |
| `/console/observability/logs` | Structured logs |
| `/console/observability/traces` | Reasoning traces |
| `/console/observability/traces/[id]` | Trace detail |
| `/console/connectors` | Data source connections |
| `/console/connectors/[name]` | Connector detail |
| `/console/settings/profile` | Profile settings |
| `/console/settings/organization` | Organization settings |
| `/console/settings/security` | Security settings |
| `/console/settings/api-keys` | API key management |
| `/console/settings/notifications` | Notification preferences |
| `/console/help` | Help & getting started |

### Backend Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /health` | Health check |
| `POST /api/auth/login` | Log in, returns JWT |
| `POST /api/auth/register` | Register a new user |
| `GET /api/auth/me` | Current user |
| `GET /api/agents` | List agents |
| `GET /api/agents/{name}` | Agent detail |
| `GET /api/fleet/dashboard` | Dashboard stats, health, activity, alerts |
| `GET /api/registry` | List registered agents |
| `GET /api/memory` | Memories and per-agent counts |
| `GET /api/connectors` | Data source connectors |
| `GET /api/observability/logs` | Structured logs |
| `GET /api/observability/traces` | Reasoning traces |
| `GET /api/observability/audit` | Audit trail |
| `GET /api/settings/organization` | Organization and members |
| `GET /api/settings/credentials` | Data source credentials |
| `GET /api/chat/agents` | List chat agents with suggested prompts |
| `POST /api/chat/` | Send a message to an agent |

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Contributing](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security](SECURITY.md)
- [Changelog](CHANGELOG.md)
- [Roadmap](ROADMAP.md)

## License

MIT — see [LICENSE](LICENSE) for details.
