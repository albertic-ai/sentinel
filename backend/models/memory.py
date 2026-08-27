"""Memory-related Pydantic models."""

from datetime import datetime

from pydantic import BaseModel


class MemoryEntry(BaseModel):
    """A single memory entry."""

    id: str
    agent_name: str
    content: str
    created_at: datetime
    session_id: str | None = None
    metadata: dict = {}


class MemoryListResponse(BaseModel):
    """Response containing a list of memories."""

    agent: str
    memories: list[MemoryEntry] = []
    total: int = 0
