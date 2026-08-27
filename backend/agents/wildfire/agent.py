"""Wildfire Sentinel agent definition."""

from google.adk import Agent

from .tools import get_active_fires, get_fire_history, get_satellite_thermal

wildfire_agent = Agent(
    name="wildfire_sentinel",
    model="gemini-2.5-flash",
    description="Monitors thermal anomalies and fire hotspots from satellite data.",
    instruction="""You are the Wildfire Sentinel agent. You monitor satellite thermal data
to detect active fires and hotspots. Your responsibilities:

1. Retrieve active fire data from NASA FIRMS for a given region
2. Analyze thermal anomaly patterns
3. Compare current data against historical baselines
4. Alert when anomalies exceed normal thresholds
5. Provide actionable recommendations for field teams

Always include coordinates, confidence levels, and satellite source in your reports.""",
    tools=[get_active_fires, get_fire_history, get_satellite_thermal],
)
