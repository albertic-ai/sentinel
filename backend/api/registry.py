"""Agent Registry browsing API endpoints."""

from fastapi import APIRouter, HTTPException

import demo_data

router = APIRouter()


@router.get("/")
async def list_registered_agents():
    """List all agents in the registry."""
    return {"agents": demo_data.registry_entries()}


@router.get("/discover")
async def discover_agents(query: str = ""):
    """Discover agents by search query."""
    entries = demo_data.registry_entries()
    if query:
        q = query.lower()
        entries = [
            e for e in entries
            if q in e["name"].lower() or q in e["description"].lower()
        ]
    return {"results": entries}


@router.get("/{agent_name}")
async def get_registry_entry(agent_name: str):
    """Get a specific agent's registry entry."""
    for entry in demo_data.registry_entries():
        if entry["name"] == agent_name:
            return entry
    raise HTTPException(status_code=404, detail="Agent not found")
