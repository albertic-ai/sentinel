"""Connectors API endpoints."""

from fastapi import APIRouter

import demo_data

router = APIRouter()


@router.get("/")
async def list_connectors():
    """List all data source connectors."""
    return {"connectors": demo_data.CONNECTORS}


@router.get("/{name}")
async def get_connector(name: str):
    """Get a single connector by name."""
    from fastapi import HTTPException

    connector = demo_data.connector_by_name(name)
    if not connector:
        raise HTTPException(status_code=404, detail="Connector not found")
    return connector
