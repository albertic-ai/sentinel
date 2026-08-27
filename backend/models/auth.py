"""Auth-related Pydantic models."""

from pydantic import BaseModel, EmailStr


class RegisterRequest(BaseModel):
    """User registration request."""

    email: EmailStr
    password: str
    first_name: str
    last_name: str


class LoginRequest(BaseModel):
    """User login request."""

    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    """JWT token response."""

    access_token: str
    token_type: str = "bearer"
    user: "UserResponse"


class UserResponse(BaseModel):
    """Public user data (no password)."""

    id: str
    email: str
    first_name: str
    last_name: str


TokenResponse.model_rebuild()
