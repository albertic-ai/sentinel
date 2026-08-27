"""Agent-related Pydantic models."""

from pydantic import BaseModel


class AgentConfig(BaseModel):
    """Agent configuration."""

    name: str
    description: str
    version: str = "1.0.0"
    status: str = "active"
    capabilities: list[str] = []


class AgentRunRequest(BaseModel):
    """Request to execute an agent."""

    query: str
    latitude: float | None = None
    longitude: float | None = None
    parameters: dict = {}


class AgentRunResponse(BaseModel):
    """Response from agent execution."""

    agent_name: str
    status: str
    result: dict = {}
    trace_id: str | None = None
