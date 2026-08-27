"""Auth service — user verification, password hashing, JWT token management.

Supports both Firestore-backed users and a built-in demo user for testing.
"""

from datetime import datetime, timezone, timedelta

import bcrypt
import jwt

from config import settings

# Built-in demo user (always available, no database needed)
_DEMO_PASSWORD_HASH = bcrypt.hashpw("Password@123".encode(), bcrypt.gensalt()).decode()

BUILTIN_USERS = {
    "demo@sentinel.com": {
        "id": "demo-user-001",
        "email": "demo@sentinel.com",
        "password_hash": _DEMO_PASSWORD_HASH,
        "first_name": "Demo",
        "last_name": "User",
        "verified": True,
        "created_at": "2026-08-27T00:00:00Z",
    }
}


def hash_password(password: str) -> str:
    """Hash a password with bcrypt."""
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def verify_password(password: str, hashed: str) -> bool:
    """Verify a password against its hash."""
    return bcrypt.checkpw(password.encode(), hashed.encode())


def create_token(user_id: str, email: str) -> str:
    """Create a JWT access token."""
    payload = {
        "sub": user_id,
        "email": email,
        "iat": datetime.now(timezone.utc),
        "exp": datetime.now(timezone.utc) + timedelta(hours=settings.jwt_expiry_hours),
    }
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)


def decode_token(token: str) -> dict:
    """Decode and verify a JWT token.

    Raises:
        jwt.InvalidTokenError: If token is invalid or expired.
    """
    return jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])


async def get_user_by_email(email: str) -> dict | None:
    """Look up a user by email.

    Checks built-in users first, then Firestore.
    """
    # Check built-in users
    if email in BUILTIN_USERS:
        return BUILTIN_USERS[email]

    # Check Firestore (production)
    try:
        from google.cloud import firestore

        db = firestore.Client(
            project=settings.gcp_project_id,
            database=settings.firestore_database,
        )
        docs = (
            db.collection("users")
            .where("email", "==", email)
            .limit(1)
            .stream()
        )
        for doc in docs:
            data = doc.to_dict()
            data["id"] = doc.id
            return data
    except Exception:
        pass

    return None


async def get_user_by_id(user_id: str) -> dict | None:
    """Look up a user by ID.

    Checks built-in users first, then Firestore.
    """
    # Check built-in users
    for user in BUILTIN_USERS.values():
        if user["id"] == user_id:
            return user

    # Check Firestore (production)
    try:
        from google.cloud import firestore

        db = firestore.Client(
            project=settings.gcp_project_id,
            database=settings.firestore_database,
        )
        doc = db.collection("users").document(user_id).get()
        if doc.exists:
            data = doc.to_dict()
            data["id"] = doc.id
            return data
    except Exception:
        pass

    return None


async def create_user(email: str, password: str, first_name: str, last_name: str) -> dict:
    """Create a new user in Firestore.

    Returns:
        Created user dict with id.
    """
    from google.cloud import firestore

    db = firestore.Client(
        project=settings.gcp_project_id,
        database=settings.firestore_database,
    )

    hashed = hash_password(password)
    user_data = {
        "email": email,
        "password_hash": hashed,
        "first_name": first_name,
        "last_name": last_name,
        "verified": False,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    doc_ref = db.collection("users").document()
    doc_ref.set(user_data)
    user_data["id"] = doc_ref.id
    return user_data
