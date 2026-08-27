# Sentinel Backend — Agent Rules

## Rules

- Python 3.12, async/await throughout
- Use Pydantic for all data validation
- Access config via `config.settings`
- Each ADK agent has: `__init__.py`, `agent.py`, `tools.py`
- Tools use `@tool` decorator from `google.adk`
- Connectors are async httpx clients
- All TODO comments indicate GEAP integration points

## Code Style

- Files: snake_case
- Functions/variables: snake_case
- Classes: PascalCase
- Constants: UPPER_SNAKE_CASE

## Security

- Never hardcode secrets
- Validate all inputs (Pydantic models)
- Use parameterized queries
- All agent actions logged via `observability.audit`
