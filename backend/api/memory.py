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


@router.get("/entry/{memory_id}")
async def get_memory(memory_id: str):
    """Get a single memory entry by ID."""
    from fastapi import HTTPException

    memory = demo_data.memory_by_id(memory_id)
    if not memory:
        raise HTTPException(status_code=404, detail="Memory not found")
    return memory


@router.get("/{agent_name}")
async def get_agent_memories(agent_name: str):
    """Get memories for a specific agent."""
    return {"agent": agent_name, "memories": demo_data.memories_for_agent(agent_name)}
