# Sentinel Backend — Agent Rules

## Structure

```
backend/
├── agents/        # Agent definitions, runtime, and lifecycle
├── memory/        # Persistent memory layer
├── governance/    # Policy engine and access control
├── observability/ # Logging, metrics, and tracing
└── integrations/  # Environmental data source connectors
```

## Rules

- Use TypeScript for all new code
- Follow existing patterns and conventions
- Validate all inputs at API boundaries
- Use parameterized queries for database access
- Never hardcode secrets or credentials
- Agent operations must be auditable
- Follow least-privilege for agent capabilities
- Follow Conventional Commits format

## Code Style

- Files: kebab-case
- Functions/variables: camelCase
- Types/Interfaces: PascalCase
- Constants: UPPER_SNAKE_CASE
