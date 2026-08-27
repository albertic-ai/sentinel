"""Fleet management API endpoints."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/status")
async def fleet_status():
    """Get overall fleet status."""
    return {
        "total_agents": 4,
        "active": 4,
        "idle": 0,
        "errored": 0,
    }


@router.get("/health")
async def fleet_health():
    """Get fleet health metrics."""
    return {
        "agents": [
            {"name": "wildfire_sentinel", "health": "healthy", "last_active": None},
            {"name": "air_quality_analyst", "health": "healthy", "last_active": None},
            {"name": "deforestation_tracker", "health": "healthy", "last_active": None},
            {"name": "compliance_reporter", "health": "healthy", "last_active": None},
        ]
    }
