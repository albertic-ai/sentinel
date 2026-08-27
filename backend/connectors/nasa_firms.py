"""NASA FIRMS (Fire Information for Resource Management System) connector.

Provides active fire data from MODIS and VIIRS satellite sensors.
API docs: https://firms.modaps.eosdis.nasa.gov/api/
"""

import httpx

from config import settings


class NASAFirmsClient:
    """Client for NASA FIRMS API."""

    BASE_URL = "https://firms.modaps.eosdis.nasa.gov/api"

    def __init__(self):
        self.api_key = settings.nasa_firms_api_key

    async def get_active_fires(
        self, latitude: float, longitude: float, radius_km: float = 50.0
    ) -> dict:
        """Get active fire hotspots near a location.

        Args:
            latitude: Center latitude.
            longitude: Center longitude.
            radius_km: Search radius in km.

        Returns:
            Active fire data.
        """
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.BASE_URL}/area",
                params={
                    "key": self.api_key,
                    "source": "VIIRS_SNPP_NRT",
                    "latitude": latitude,
                    "longitude": longitude,
                    "radius": radius_km,
                    "days": 1,
                },
            )
            response.raise_for_status()
            return response.json()

    async def get_fire_history(
        self, latitude: float, longitude: float, days: int = 30
    ) -> dict:
        """Get historical fire data.

        Args:
            latitude: Center latitude.
            longitude: Center longitude.
            days: Days of history.

        Returns:
            Historical fire data.
        """
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.BASE_URL}/area",
                params={
                    "key": self.api_key,
                    "source": "VIIRS_SNPP_NRT",
                    "latitude": latitude,
                    "longitude": longitude,
                    "radius": 50,
                    "days": days,
                },
            )
            response.raise_for_status()
            return response.json()

    async def get_thermal_data(self, latitude: float, longitude: float) -> dict:
        """Get thermal anomaly readings.

        Args:
            latitude: Location latitude.
            longitude: Location longitude.

        Returns:
            Thermal anomaly data.
        """
        # Uses same FIRMS endpoint with brightness temperature data
        return await self.get_active_fires(latitude, longitude, radius_km=10.0)
