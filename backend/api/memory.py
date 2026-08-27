"""Memory Bank exploration API endpoints."""

from fastapi import APIRouter

import demo_data

router = APIRouter()


@router.get("/")
async def list_memories():
    """List all memories and per-agent counts."""
    return {
        "counts": demo_data.memory_counts(),
        "memories": demo_data.MEMORIES,
    }


@router.get("/{agent_name}")
async def get_agent_memories(agent_name: str):
    """Get memories for a specific agent."""
    return {"agent": agent_name, "memories": demo_data.memories_for_agent(agent_name)}
