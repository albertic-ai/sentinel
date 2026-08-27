"""Agent Gateway router — routes requests and enforces policies."""

from fastapi import Request, HTTPException

from .policies import check_policy
from .middleware import screen_content


async def route_agent_request(request: Request, agent_name: str, payload: dict) -> dict:
    """Route a request through the gateway with policy checks.

    Args:
        request: The incoming HTTP request.
        agent_name: Target agent name.
        payload: Request payload.

    Returns:
        Processed response from the agent.

    Raises:
        HTTPException: If policy check fails.
    """
    # Policy enforcement
    policy_result = await check_policy(agent_name, payload)
    if not policy_result.allowed:
        raise HTTPException(status_code=403, detail=policy_result.reason)

    # Model Armor screening (input)
    screened_input = await screen_content(payload, direction="input")

    return {"agent": agent_name, "input": screened_input, "status": "routed"}
