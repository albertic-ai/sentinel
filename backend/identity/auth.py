"""User authentication middleware."""

from fastapi import Request, HTTPException


async def get_current_user(request: Request) -> dict:
    """Extract and verify the current user from request headers.

    Args:
        request: The incoming request.

    Returns:
        User info dictionary.

    Raises:
        HTTPException: If authentication fails.
    """
    # TODO: Integrate with Firebase Auth / Google Identity Platform
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        raise HTTPException(status_code=401, detail="Not authenticated")

    return {"user_id": "placeholder", "email": "user@example.com"}
