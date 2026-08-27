"""Tools for the Wildfire Sentinel agent."""

from google.adk import tool

from connectors.nasa_firms import NASAFirmsClient


@tool
async def get_active_fires(latitude: float, longitude: float, radius_km: float = 50.0) -> dict:
    """Get active fire hotspots within a radius of a given location.

    Args:
        latitude: Center latitude of the search area.
        longitude: Center longitude of the search area.
        radius_km: Search radius in kilometers (default 50km).

    Returns:
        Dictionary containing active fire data with coordinates and confidence levels.
    """
    client = NASAFirmsClient()
    return await client.get_active_fires(latitude, longitude, radius_km)


@tool
async def get_fire_history(latitude: float, longitude: float, days: int = 30) -> dict:
    """Get historical fire data for a location over a time period.

    Args:
        latitude: Center latitude.
        longitude: Center longitude.
        days: Number of days of history to retrieve (default 30).

    Returns:
        Dictionary containing historical fire events.
    """
    client = NASAFirmsClient()
    return await client.get_fire_history(latitude, longitude, days)


@tool
async def get_satellite_thermal(latitude: float, longitude: float) -> dict:
    """Get latest satellite thermal imagery data for a location.

    Args:
        latitude: Location latitude.
        longitude: Location longitude.

    Returns:
        Dictionary containing thermal anomaly readings.
    """
    client = NASAFirmsClient()
    return await client.get_thermal_data(latitude, longitude)
