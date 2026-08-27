"""Registry-related Pydantic models."""

from pydantic import BaseModel


class RegistryEntry(BaseModel):
    """An agent's entry in the registry."""

    name: str
    description: str
    version: str
    status: str = "active"
    owner: str = ""
    capabilities: list[str] = []
    data_sources: list[str] = []


class RegistrySearchResult(BaseModel):
    """Search result from registry discovery."""

    agents: list[RegistryEntry] = []
    total: int = 0
    query: str = ""
