# Security Policy

Sentinel handles sensitive environmental data and orchestrates autonomous AI agents. Security is a core concern.

## Supported Versions

| Version | Supported |
|---------|-----------|
| latest (main) | Yes |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly.

**Do not open a public issue.**

Send a report to the project maintainers via private channels.

Include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact and severity assessment
- Affected component (frontend, backend, agent runtime, etc.)
- Suggested fix if available

### Response Timeline

- **Acknowledgment:** Within 48 hours
- **Initial assessment:** Within 5 business days
- **Critical fix:** Within 7 days
- **Non-critical fix:** Within 30 days

## Security Principles

### Agent Security
- Agents operate under least-privilege principles
- All agent actions are logged and auditable
- Agent credentials are scoped and rotatable
- Cross-agent communication is authenticated and encrypted

### Data Security
- Environmental data is classified and access-controlled
- Data at rest is encrypted
- Data in transit uses TLS 1.3
- Data lineage is tracked for compliance

### Platform Security
- Role-based access control (RBAC) for all operations
- Multi-factor authentication for administrative access
- Secrets managed through dedicated secret stores (never in code)
- Regular dependency auditing and vulnerability scanning

### Operational Security
- Infrastructure follows principle of least privilege
- Network segmentation between components
- Automated security scanning in CI/CD pipeline
- Incident response procedures documented and tested

## Security Best Practices for Contributors

- Never commit secrets, credentials, or API keys
- Use `.env.local` for local secrets (gitignored)
- Use `.env.example` as a template (no real values)
- Keep dependencies up to date
- Review code changes for security implications
- Use parameterized queries for database access
- Validate and sanitize all inputs
- Follow OWASP guidelines for web security
