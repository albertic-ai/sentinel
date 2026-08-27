"""Agent management API endpoints."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def list_agents():
    """List all available agents."""
    return {
        "agents": [
            {
                "name": "wildfire_sentinel",
                "description": "Monitors thermal anomalies and fire hotspots",
                "status": "active",
            },
            {
                "name": "air_quality_analyst",
                "description": "Tracks AQI and predicts pollution events",
                "status": "active",
            },
            {
                "name": "deforestation_tracker",
                "description": "Detects land-use changes from satellite imagery",
                "status": "active",
            },
            {
                "name": "compliance_reporter",
                "description": "Generates environmental compliance reports",
                "status": "active",
            },
        ]
    }


@router.get("/{agent_name}")
async def get_agent(agent_name: str):
    """Get details of a specific agent."""
    # TODO: Fetch from Agent Registry
    return {"agent_name": agent_name, "status": "active"}


@router.post("/{agent_name}/run")
async def run_agent(agent_name: str, payload: dict):
    """Execute an agent with the given payload."""
    # TODO: Route through gateway → runtime
    return {"agent_name": agent_name, "status": "queued", "payload": payload}
