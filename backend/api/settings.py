"""Settings API endpoints — organization, credentials."""

from fastapi import APIRouter

import demo_data

router = APIRouter()


@router.get("/organization")
async def get_organization():
    """Get organization details and members."""
    return demo_data.ORGANIZATION


@router.get("/credentials")
async def get_credentials():
    """Get data source credential status."""
    return {"credentials": demo_data.DATA_SOURCE_CREDENTIALS}
