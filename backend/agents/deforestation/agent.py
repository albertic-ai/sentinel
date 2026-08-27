"""Deforestation Tracker agent definition."""

from google.adk import Agent

from .tools import get_ndvi_data, compare_land_cover, get_forest_alerts

deforestation_agent = Agent(
    name="deforestation_tracker",
    model="gemini-3.5-flash",
    description="Detects land-use changes and forest cover loss over time using satellite imagery.",
    instruction="""You are the Deforestation Tracker agent. You analyze satellite imagery
to detect changes in forest cover. Your responsibilities:

1. Retrieve NDVI (vegetation index) data for monitored regions
2. Compare land cover between time periods to detect changes
3. Identify potential deforestation events
4. Track forest boundary changes over time
5. Generate change detection reports with affected area estimates

Always include the time period compared, area affected in hectares, and confidence level.""",
    tools=[get_ndvi_data, compare_land_cover, get_forest_alerts],
)
