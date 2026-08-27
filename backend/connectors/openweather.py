"""OpenWeather connector — weather and climate data.

API docs: https://openweathermap.org/api
"""

import httpx

from config import settings


class OpenWeatherClient:
    """Client for OpenWeather API."""

    BASE_URL = "https://api.openweathermap.org/data/2.5"

    def __init__(self):
        self.api_key = settings.openweather_api_key

    async def get_current(self, latitude: float, longitude: float) -> dict:
        """Get current weather conditions.

        Args:
            latitude: Location latitude.
            longitude: Location longitude.

        Returns:
            Current weather data.
        """
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.BASE_URL}/weather",
                params={
                    "lat": latitude,
                    "lon": longitude,
                    "appid": self.api_key,
                    "units": "metric",
                },
            )
            response.raise_for_status()
            return response.json()

    async def get_air_pollution_forecast(
        self, latitude: float, longitude: float, hours: int = 48
    ) -> dict:
        """Get air pollution forecast.

        Args:
            latitude: Location latitude.
            longitude: Location longitude.
            hours: Forecast horizon in hours.

        Returns:
            Air pollution forecast data.
        """
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.BASE_URL}/air_pollution/forecast",
                params={
                    "lat": latitude,
                    "lon": longitude,
                    "appid": self.api_key,
                },
            )
            response.raise_for_status()
            data = response.json()
            # Trim to requested hours
            if "list" in data:
                data["list"] = data["list"][: hours]
            return data
