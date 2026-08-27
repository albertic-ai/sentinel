"""Gateway policy definitions and enforcement."""

from dataclasses import dataclass


@dataclass
class PolicyResult:
    """Result of a policy check."""

    allowed: bool
    reason: str = ""


async def check_policy(agent_name: str, payload: dict) -> PolicyResult:
    """Check if a request is allowed by gateway policies.

    Args:
        agent_name: Target agent.
        payload: Request payload.

    Returns:
        PolicyResult indicating if the request is allowed.
    """
    # TODO: Integrate with GEAP Agent Gateway policy engine
    # For now, allow all requests
    return PolicyResult(allowed=True)
