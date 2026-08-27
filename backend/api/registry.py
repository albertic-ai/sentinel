"""Agent Registry browsing API endpoints."""

from fastapi import APIRouter

from registry.client import AgentRegistryClient

router = APIRouter()


@router.get("/")
async def list_registered_agents():
    """List all agents in the registry."""
    client = AgentRegistryClient()
    return {"agents": await client.list_agents()}


@router.get("/discover")
async def discover_agents(query: str = ""):
    """Discover agents by search query."""
    client = AgentRegistryClient()
    return {"results": await client.discover_agents(query)}


@router.get("/{agent_name}")
async def get_registry_entry(agent_name: str):
    """Get a specific agent's registry entry."""
    client = AgentRegistryClient()
    entry = await client.get_agent(agent_name)
    if not entry:
        return {"error": "Agent not found"}
    return entry
