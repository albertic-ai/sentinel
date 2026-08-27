"""Fleet management API endpoints."""

from fastapi import APIRouter

import demo_data

router = APIRouter()


@router.get("/status")
async def fleet_status():
    """Get overall fleet status."""
    return demo_data.fleet_status()


@router.get("/health")
async def fleet_health():
    """Get fleet health metrics."""
    return demo_data.fleet_health()


@router.get("/dashboard")
async def dashboard():
    """Get dashboard stats, activity, and alerts."""
    return {
        "stats": demo_data.dashboard_stats(),
        "health": demo_data.fleet_health()["agents"],
        "activity": demo_data.RECENT_ACTIVITY,
        "alerts": demo_data.ALERTS,
    }
