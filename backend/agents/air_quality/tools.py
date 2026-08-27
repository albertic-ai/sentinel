"""Tools for the Air Quality Analyst agent."""

from google.adk import tool

from connectors.openaq import OpenAQClient
from connectors.openweather import OpenWeatherClient


@tool
async def get_air_quality(latitude: float, longitude: float) -> dict:
    """Get current air quality data for a location.

    Args:
        latitude: Location latitude.
        longitude: Location longitude.

    Returns:
        Dictionary containing AQI, pollutant levels, and sensor data.
    """
    client = OpenAQClient()
    return await client.get_latest(latitude, longitude)


@tool
async def get_weather_conditions(latitude: float, longitude: float) -> dict:
    """Get current weather conditions that affect air quality.

    Args:
        latitude: Location latitude.
        longitude: Location longitude.

    Returns:
        Dictionary containing wind, humidity, temperature, and pressure data.
    """
    client = OpenWeatherClient()
    return await client.get_current(latitude, longitude)


@tool
async def get_pollution_forecast(latitude: float, longitude: float, hours: int = 48) -> dict:
    """Get air pollution forecast for upcoming hours.

    Args:
        latitude: Location latitude.
        longitude: Location longitude.
        hours: Forecast horizon in hours (default 48).

    Returns:
        Dictionary containing predicted AQI values over time.
    """
    client = OpenWeatherClient()
    return await client.get_air_pollution_forecast(latitude, longitude, hours)
