"""Tools for the Deforestation Tracker agent."""

from google.adk import tool

from connectors.sentinel_hub import SentinelHubClient


@tool
async def get_ndvi_data(
    latitude: float, longitude: float, date_from: str, date_to: str
) -> dict:
    """Get NDVI (Normalized Difference Vegetation Index) data for a region.

    Args:
        latitude: Center latitude.
        longitude: Center longitude.
        date_from: Start date (YYYY-MM-DD).
        date_to: End date (YYYY-MM-DD).

    Returns:
        Dictionary containing NDVI values and vegetation health indicators.
    """
    client = SentinelHubClient()
    return await client.get_ndvi(latitude, longitude, date_from, date_to)


@tool
async def compare_land_cover(
    latitude: float,
    longitude: float,
    date_before: str,
    date_after: str,
) -> dict:
    """Compare land cover between two dates to detect changes.

    Args:
        latitude: Center latitude.
        longitude: Center longitude.
        date_before: Earlier date (YYYY-MM-DD).
        date_after: Later date (YYYY-MM-DD).

    Returns:
        Dictionary containing change detection results and affected area.
    """
    client = SentinelHubClient()
    return await client.compare_land_cover(latitude, longitude, date_before, date_after)


@tool
async def get_forest_alerts(latitude: float, longitude: float, days: int = 7) -> dict:
    """Get recent forest disturbance alerts for a region.

    Args:
        latitude: Center latitude.
        longitude: Center longitude.
        days: Number of days to look back (default 7).

    Returns:
        Dictionary containing recent deforestation alerts.
    """
    client = SentinelHubClient()
    return await client.get_forest_alerts(latitude, longitude, days)
