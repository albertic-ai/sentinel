"""Chat tools — wrap environmental data connectors for use by the chat agent.

These async functions are registered as GenKit tools so the model can call
real environmental data sources during a conversation.
"""

from connectors.nasa_firms import NASAFirmsClient
from connectors.openaq import OpenAQClient
from connectors.openweather import OpenWeatherClient
from connectors.sentinel_hub import SentinelHubClient


async def check_active_fires(latitude: float, longitude: float, radius_km: float = 50.0) -> dict:
    """Check for active wildfire hotspots near a location using NASA FIRMS."""
    client = NASAFirmsClient()
    return await client.get_active_fires(latitude, longitude, radius_km)


async def check_air_quality(latitude: float, longitude: float) -> dict:
    """Check current air quality near a location using OpenAQ."""
    client = OpenAQClient()
    return await client.get_latest(latitude, longitude)


async def check_weather(latitude: float, longitude: float) -> dict:
    """Check current weather conditions using OpenWeather."""
    client = OpenWeatherClient()
    return await client.get_current(latitude, longitude)


async def check_vegetation(
    latitude: float, longitude: float, date_from: str, date_to: str
) -> dict:
    """Check vegetation health (NDVI) for a region using Sentinel Hub."""
    client = SentinelHubClient()
    return await client.get_ndvi(latitude, longitude, date_from, date_to)


# Registry of available tools by agent domain
AGENT_TOOLS = {
    "wildfire_sentinel": [check_active_fires, check_weather],
    "air_quality_analyst": [check_air_quality, check_weather],
    "deforestation_tracker": [check_vegetation],
    "sentinel_orchestrator": [
        check_active_fires,
        check_air_quality,
        check_weather,
        check_vegetation,
    ],
}
