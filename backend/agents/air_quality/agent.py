"""Air Quality Analyst agent definition."""

from google.adk import Agent

from .tools import get_air_quality, get_weather_conditions, get_pollution_forecast

air_quality_agent = Agent(
    name="air_quality_analyst",
    model="gemini-3.5-flash",
    description="Tracks air quality indices, monitors sensors, and predicts pollution events.",
    instruction="""You are the Air Quality Analyst agent. You monitor air quality data
from sensor networks and weather services. Your responsibilities:

1. Retrieve current AQI readings for a given location
2. Correlate air quality with weather conditions
3. Predict upcoming pollution events based on patterns
4. Identify pollution sources when possible
5. Provide health advisories based on AQI levels

Always include the AQI index, primary pollutant, and health recommendation.""",
    tools=[get_air_quality, get_weather_conditions, get_pollution_forecast],
)
