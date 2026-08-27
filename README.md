# Sentinel

**Enterprise Agent Fleet for Environmental Intelligence**

Sentinel enables organizations to securely deploy, manage, and monitor specialized AI agents that work autonomously with Earth and environmental data. It provides persistent memory, identity, governance, security, and end-to-end observability for agent fleets operating at scale.

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
| AI Model | Gemini 2.5 Flash via Vertex AI |
| Infrastructure | Google Cloud (Cloud Run, Firestore, Pub/Sub) |
| Observability | OpenTelemetry |
| Font | Google Sans Flex |

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
| `/console/agents` | Agent management |
| `/console/agents/[name]` | Agent detail |
| `/console/registry` | Agent Registry browser |
| `/console/memory` | Memory Explorer |
| `/console/observability/logs` | Structured logs |
| `/console/observability/traces` | Reasoning traces |
| `/console/connectors` | Data source connections |
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
| `GET /api/agents` | List agents |
| `GET /api/agents/{name}` | Agent detail |
| `POST /api/agents/{name}/run` | Execute agent |
| `GET /api/fleet/status` | Fleet status |
| `GET /api/fleet/health` | Fleet health |
| `GET /api/memory/{agent}` | Agent memories |
| `POST /api/memory/{agent}/generate` | Generate memories |
| `GET /api/registry` | List registered agents |
| `GET /api/registry/discover` | Discover agents |

## Documentation

- [Contributing](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security](SECURITY.md)
- [Changelog](CHANGELOG.md)
- [Roadmap](ROADMAP.md)

## License

MIT — see [LICENSE](LICENSE) for details.
