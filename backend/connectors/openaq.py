"""OpenAQ connector — open-source air quality data.

API docs: https://api.openaq.org/
"""

import httpx

from config import settings


class OpenAQClient:
    """Client for OpenAQ API."""

    BASE_URL = "https://api.openaq.org/v3"

    def __init__(self):
        self.api_key = settings.openaq_api_key

    async def get_latest(self, latitude: float, longitude: float) -> dict:
        """Get latest air quality measurements near a location.

        Args:
            latitude: Location latitude.
            longitude: Location longitude.

        Returns:
            Latest AQI and pollutant measurements.
        """
        headers = {"X-API-Key": self.api_key} if self.api_key else {}
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.BASE_URL}/locations",
                headers=headers,
                params={
                    "coordinates": f"{latitude},{longitude}",
                    "radius": 25000,
                    "limit": 10,
                    "order_by": "distance",
                },
            )
            response.raise_for_status()
            return response.json()
