"""Audit logging for agent actions and decisions."""

import logging
from datetime import datetime, timezone

logger = logging.getLogger("sentinel.audit")


async def log_agent_action(
    agent_name: str,
    action: str,
    details: dict | None = None,
    user_id: str | None = None,
) -> None:
    """Log an auditable agent action.

    Args:
        agent_name: Agent performing the action.
        action: Description of the action taken.
        details: Additional context.
        user_id: User who triggered the action (if any).
    """
    entry = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "agent": agent_name,
        "action": action,
        "user_id": user_id,
        "details": details or {},
    }
    logger.info("AUDIT: %s", entry)
    # TODO: Write to Cloud Logging with structured audit format
