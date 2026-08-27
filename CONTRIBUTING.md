# Contributing to Sentinel

Thank you for your interest in contributing to Sentinel — an enterprise agent fleet for environmental intelligence.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Commit using conventional format: `git commit -m "feat: add your feature"`
6. Push to your branch: `git push origin feature/your-feature`
7. Open a Pull Request

## Development Setup

### Frontend

```bash
cd frontend
npm install
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

### Backend

```bash
cd backend
# Setup instructions TBD
```

### Environment Variables

```bash
cp .env.example .env.local
# Fill in required values — see .env.example for documentation
```

## Project Structure

```
sentinel/
├── frontend/    # Next.js dashboard (fleet management UI)
├── backend/     # API and agent orchestration service
```

- Frontend changes go in `frontend/`
- Backend changes go in `backend/`
- Shared documentation and config lives at the root

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Purpose |
|--------|---------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `style:` | Formatting, no code change |
| `refactor:` | Code restructuring, no behavior change |
| `test:` | Adding or updating tests |
| `chore:` | Build, tooling, or maintenance |
| `perf:` | Performance improvement |
| `security:` | Security-related changes |

## Pull Request Guidelines

- Keep PRs focused on a single concern
- Write clear descriptions explaining what and why
- Reference related issues where applicable
- Ensure linting passes (`npm run lint` in frontend)
- Update documentation if your change affects public interfaces
- Add tests for new functionality

## Areas of Contribution

- **Agent capabilities** — New agent types, skills, and behaviors
- **Data connectors** — Integrations with environmental data sources
- **Dashboard UI** — Fleet management interface improvements
- **Governance** — Policy engine rules and compliance features
- **Observability** — Logging, metrics, and alerting
- **Documentation** — Guides, API docs, and examples

## Reporting Issues

- Use GitHub Issues for bug reports and feature requests
- Include steps to reproduce for bugs
- Provide context: environment, expected vs. actual behavior
- Label issues appropriately (bug, enhancement, documentation)

## Security Vulnerabilities

Do **not** open public issues for security vulnerabilities. See [SECURITY.md](SECURITY.md) for reporting instructions.

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating.
