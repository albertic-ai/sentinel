"""Agent management API endpoints."""

from fastapi import APIRouter, HTTPException

import demo_data

router = APIRouter()


@router.get("/")
async def list_agents():
    """List all available agents."""
    return {"agents": demo_data.AGENTS}


@router.get("/{agent_name}")
async def get_agent(agent_name: str):
    """Get details of a specific agent."""
    agent = demo_data.AGENTS_BY_NAME.get(agent_name)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agent


@router.post("/{agent_name}/run")
async def run_agent(agent_name: str, payload: dict):
    """Execute an agent with the given payload."""
    agent = demo_data.AGENTS_BY_NAME.get(agent_name)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return {"agent_name": agent_name, "status": "queued", "payload": payload}
