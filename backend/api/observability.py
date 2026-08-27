"""Observability API endpoints — logs, traces, audit."""

from fastapi import APIRouter

import demo_data

router = APIRouter()


@router.get("/logs")
async def get_logs(agent: str = "", level: str = ""):
    """Get structured logs, optionally filtered by agent or level."""
    logs = demo_data.LOGS
    if agent:
        logs = [log for log in logs if log["agent"] == agent]
    if level:
        logs = [log for log in logs if log["level"].lower() == level.lower()]
    return {"logs": logs}


@router.get("/traces")
async def get_traces():
    """Get reasoning chain traces."""
    return {"traces": demo_data.TRACES}


@router.get("/traces/{trace_id}")
async def get_trace(trace_id: str):
    """Get a single trace by ID."""
    from fastapi import HTTPException

    trace = demo_data.trace_by_id(trace_id)
    if not trace:
        raise HTTPException(status_code=404, detail="Trace not found")
    return trace


@router.get("/audit")
async def get_audit():
    """Get audit trail."""
    return {"audit": demo_data.AUDIT}
