"""Connectors API endpoints."""

from fastapi import APIRouter

import demo_data

router = APIRouter()


@router.get("/")
async def list_connectors():
    """List all data source connectors."""
    return {"connectors": demo_data.CONNECTORS}
