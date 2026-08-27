"""Demo data for the Sentinel console.

Provides realistic sample data for demonstration and testing across all
console pages: dashboard, agents, registry, memory, observability, connectors,
and settings.
"""

from datetime import datetime, timezone, timedelta


def _iso(hours_ago: float) -> str:
    return (datetime.now(timezone.utc) - timedelta(hours=hours_ago)).isoformat()


# ------------------------------------------------------------
# Agents
# ------------------------------------------------------------
AGENTS = [
    {
        "name": "wildfire_sentinel",
        "label": "Wildfire Sentinel",
        "description": "Monitors thermal anomalies and fire hotspots from satellite data.",
        "status": "active",
        "version": "1.4.2",
        "model": "gemini-3.5-flash",
        "data_sources": ["NASA FIRMS", "Sentinel Hub"],
        "capabilities": ["satellite-monitoring", "thermal-analysis", "alerting"],
        "last_active": _iso(0.3),
        "runs_total": 1284,
        "runs_today": 47,
        "memories": 312,
        "region": "California, USA",
    },
    {
        "name": "air_quality_analyst",
        "label": "Air Quality Analyst",
        "description": "Tracks air quality indices and predicts pollution events.",
        "status": "active",
        "version": "1.2.0",
        "model": "gemini-3.5-flash",
        "data_sources": ["OpenAQ", "OpenWeather"],
        "capabilities": ["aqi-monitoring", "pollution-forecast", "health-advisory"],
        "last_active": _iso(1.1),
        "runs_total": 863,
        "runs_today": 22,
        "memories": 190,
        "region": "Delhi, India",
    },
    {
        "name": "deforestation_tracker",
        "label": "Deforestation Tracker",
        "description": "Detects land-use changes and forest cover loss over time.",
        "status": "active",
        "version": "0.9.5",
        "model": "gemini-3.5-flash",
        "data_sources": ["Sentinel Hub"],
        "capabilities": ["ndvi-analysis", "change-detection", "forest-alerts"],
        "last_active": _iso(3.5),
        "runs_total": 421,
        "runs_today": 8,
        "memories": 97,
        "region": "Amazon Basin, Brazil",
    },
    {
        "name": "compliance_reporter",
        "label": "Compliance Reporter",
        "description": "Generates environmental compliance reports from historical data.",
        "status": "idle",
        "version": "1.0.1",
        "model": "gemini-3.5-flash",
        "data_sources": ["Memory Bank"],
        "capabilities": ["report-generation", "historical-analysis", "compliance-audit"],
        "last_active": _iso(26),
        "runs_total": 156,
        "runs_today": 0,
        "memories": 64,
        "region": "Global",
    },
]

AGENTS_BY_NAME = {a["name"]: a for a in AGENTS}


# ------------------------------------------------------------
# Fleet
# ------------------------------------------------------------
def fleet_status() -> dict:
    active = sum(1 for a in AGENTS if a["status"] == "active")
    idle = sum(1 for a in AGENTS if a["status"] == "idle")
    return {
        "total_agents": len(AGENTS),
        "active": active,
        "idle": idle,
        "errored": 0,
    }


def fleet_health() -> dict:
    return {
        "agents": [
            {
                "name": a["name"],
                "label": a["label"],
                "health": "healthy" if a["status"] == "active" else "idle",
                "last_active": a["last_active"],
            }
            for a in AGENTS
        ]
    }


# ------------------------------------------------------------
# Dashboard
# ------------------------------------------------------------
def dashboard_stats() -> dict:
    return {
        "total_agents": len(AGENTS),
        "active_tasks": 6,
        "memories": sum(a["memories"] for a in AGENTS),
        "alerts": 3,
    }


RECENT_ACTIVITY = [
    {"agent": "Wildfire Sentinel", "action": "Detected 3 new thermal hotspots near Sierra Nevada", "time": _iso(0.2), "level": "alert"},
    {"agent": "Air Quality Analyst", "action": "AQI forecast generated for Delhi metro area", "time": _iso(0.8), "level": "info"},
    {"agent": "Wildfire Sentinel", "action": "Baseline recalibrated for monitored region", "time": _iso(2.1), "level": "info"},
    {"agent": "Deforestation Tracker", "action": "Land cover change detected: 14.2 hectares", "time": _iso(3.4), "level": "warning"},
    {"agent": "Compliance Reporter", "action": "Monthly compliance report generated", "time": _iso(26), "level": "info"},
]

ALERTS = [
    {"id": "alt-001", "agent": "Wildfire Sentinel", "severity": "critical", "message": "Thermal anomaly exceeds baseline by 340%", "time": _iso(0.2)},
    {"id": "alt-002", "agent": "Deforestation Tracker", "severity": "warning", "message": "Forest cover loss detected in monitored zone", "time": _iso(3.4)},
    {"id": "alt-003", "agent": "Air Quality Analyst", "severity": "warning", "message": "AQI predicted to exceed 300 within 24h", "time": _iso(5.0)},
]


# ------------------------------------------------------------
# Registry
# ------------------------------------------------------------
def registry_entries() -> list[dict]:
    return [
        {
            "name": a["name"],
            "label": a["label"],
            "version": a["version"],
            "description": a["description"],
            "owner": "sentinel-core",
            "capabilities": a["capabilities"],
            "status": "published",
        }
        for a in AGENTS
    ]


# ------------------------------------------------------------
# Memory
# ------------------------------------------------------------
MEMORIES = [
    {"id": "mem-001", "agent": "wildfire_sentinel", "content": "Sierra Nevada region shows recurring thermal spikes during 2-4 PM local time in dry season.", "created_at": _iso(1), "session_id": "sess-4821"},
    {"id": "mem-002", "agent": "wildfire_sentinel", "content": "False positive pattern: solar farm reflections near coordinates 36.7,-119.4 flagged as heat source.", "created_at": _iso(12), "session_id": "sess-4820"},
    {"id": "mem-003", "agent": "air_quality_analyst", "content": "Delhi PM2.5 correlates strongly with wind speed below 5 km/h and stubble burning season.", "created_at": _iso(4), "session_id": "sess-3102"},
    {"id": "mem-004", "agent": "deforestation_tracker", "content": "Amazon basin sector 7 shows 2.3% annual forest cover decline, accelerating near road networks.", "created_at": _iso(20), "session_id": "sess-2201"},
    {"id": "mem-005", "agent": "air_quality_analyst", "content": "User prefers health advisories framed for outdoor workers and school activity planning.", "created_at": _iso(30), "session_id": "sess-3099"},
    {"id": "mem-006", "agent": "compliance_reporter", "content": "Q3 report template requires EPA threshold comparisons and 90-day trend charts.", "created_at": _iso(48), "session_id": "sess-1450"},
]


def memories_for_agent(agent_name: str) -> list[dict]:
    return [m for m in MEMORIES if m["agent"] == agent_name]


def memory_counts() -> list[dict]:
    return [{"agent": a["label"], "name": a["name"], "count": a["memories"]} for a in AGENTS]


# ------------------------------------------------------------
# Connectors
# ------------------------------------------------------------
CONNECTORS = [
    {"name": "NASA FIRMS", "description": "Active fire data from MODIS and VIIRS satellite sensors.", "status": "connected", "used_by": ["wildfire_sentinel"], "last_sync": _iso(0.1)},
    {"name": "OpenAQ", "description": "Open-source air quality data from global sensor networks.", "status": "connected", "used_by": ["air_quality_analyst"], "last_sync": _iso(0.5)},
    {"name": "Sentinel Hub", "description": "Copernicus satellite imagery processing and NDVI analysis.", "status": "connected", "used_by": ["wildfire_sentinel", "deforestation_tracker"], "last_sync": _iso(1.2)},
    {"name": "OpenWeather", "description": "Weather, climate, and air pollution forecast data.", "status": "connected", "used_by": ["air_quality_analyst"], "last_sync": _iso(0.3)},
]


# ------------------------------------------------------------
# Observability — logs & traces
# ------------------------------------------------------------
LOGS = [
    {"timestamp": _iso(0.1), "level": "INFO", "agent": "wildfire_sentinel", "message": "Fetched 128 active fire records from NASA FIRMS"},
    {"timestamp": _iso(0.2), "level": "WARN", "agent": "wildfire_sentinel", "message": "Thermal anomaly exceeds baseline threshold near 36.7,-119.4"},
    {"timestamp": _iso(0.3), "level": "INFO", "agent": "air_quality_analyst", "message": "OpenAQ query returned 42 sensor readings for Delhi"},
    {"timestamp": _iso(0.6), "level": "INFO", "agent": "air_quality_analyst", "message": "Pollution forecast generated for next 48h"},
    {"timestamp": _iso(1.0), "level": "ERROR", "agent": "deforestation_tracker", "message": "Sentinel Hub rate limit reached, retrying in 30s"},
    {"timestamp": _iso(1.1), "level": "INFO", "agent": "deforestation_tracker", "message": "NDVI comparison complete for Amazon sector 7"},
    {"timestamp": _iso(2.0), "level": "INFO", "agent": "sentinel_orchestrator", "message": "Delegated request to wildfire_sentinel"},
    {"timestamp": _iso(2.4), "level": "INFO", "agent": "compliance_reporter", "message": "Retrieved 64 memory entries for Q3 report"},
]

TRACES = [
    {
        "id": "trace-9f2a",
        "agent": "sentinel_orchestrator",
        "query": "Check wildfire risk near Sierra Nevada",
        "duration_ms": 3420,
        "status": "success",
        "time": _iso(0.2),
        "steps": [
            {"step": "reasoning", "detail": "User asks about wildfire risk in a specific region"},
            {"step": "delegation", "detail": "Route to wildfire_sentinel agent"},
            {"step": "tool_call", "detail": "get_active_fires(lat=36.7, lon=-119.4, radius=50)"},
            {"step": "tool_call", "detail": "get_fire_history(days=30)"},
            {"step": "synthesis", "detail": "3 hotspots found, 340% above baseline — high risk"},
        ],
    },
    {
        "id": "trace-7b1c",
        "agent": "air_quality_analyst",
        "query": "Will Delhi air quality be safe tomorrow?",
        "duration_ms": 2180,
        "status": "success",
        "time": _iso(0.8),
        "steps": [
            {"step": "reasoning", "detail": "User asks about future AQI conditions"},
            {"step": "tool_call", "detail": "get_air_quality(lat=28.6, lon=77.2)"},
            {"step": "tool_call", "detail": "get_pollution_forecast(hours=48)"},
            {"step": "synthesis", "detail": "AQI predicted 280-320, unhealthy — advisory issued"},
        ],
    },
]

AUDIT = [
    {"timestamp": _iso(0.2), "agent": "wildfire_sentinel", "action": "tool.get_active_fires", "user": "demo@sentinel.com", "result": "success"},
    {"timestamp": _iso(0.8), "agent": "air_quality_analyst", "action": "tool.get_pollution_forecast", "user": "demo@sentinel.com", "result": "success"},
    {"timestamp": _iso(1.0), "agent": "deforestation_tracker", "action": "tool.compare_land_cover", "user": "demo@sentinel.com", "result": "retry"},
    {"timestamp": _iso(2.4), "agent": "compliance_reporter", "action": "memory.fetch", "user": "demo@sentinel.com", "result": "success"},
]


# ------------------------------------------------------------
# Settings — organization
# ------------------------------------------------------------
ORGANIZATION = {
    "name": "Sentinel Environmental",
    "domain": "sentinel.com",
    "region": "us-central1",
    "members": [
        {"name": "Demo User", "email": "demo@sentinel.com", "role": "Owner"},
        {"name": "Field Ranger", "email": "ranger@sentinel.com", "role": "Operator"},
        {"name": "Compliance Officer", "email": "compliance@sentinel.com", "role": "Viewer"},
    ],
}

DATA_SOURCE_CREDENTIALS = [
    {"name": "NASA FIRMS", "configured": True},
    {"name": "OpenAQ", "configured": True},
    {"name": "Sentinel Hub", "configured": True},
    {"name": "OpenWeather", "configured": True},
]
