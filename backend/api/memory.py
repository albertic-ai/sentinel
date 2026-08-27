"""Memory Bank exploration API endpoints."""

from fastapi import APIRouter

from memory.bank import MemoryBankClient

router = APIRouter()


@router.get("/{agent_name}")
async def get_agent_memories(agent_name: str, days: int = 30):
    """Get memories for a specific agent."""
    client = MemoryBankClient()
    return await client.get_agent_memories(agent_name, days)


@router.post("/{agent_name}/generate")
async def generate_memories(agent_name: str, session_id: str):
    """Generate memories from a session."""
    client = MemoryBankClient()
    memory_ids = await client.generate_memories(session_id)
    return {"generated": memory_ids}
