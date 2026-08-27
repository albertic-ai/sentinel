"""Seed script — creates the demo user in Firestore.

Usage:
    python seed.py
"""

from google.cloud import firestore

from config import settings
from identity.auth_service import hash_password, get_user_by_email

USERS_COLLECTION = "users"

DEMO_USER = {
    "email": "demo@sentinel.com",
    "password": "Password@123",
    "first_name": "Demo",
    "last_name": "User",
}


def seed_demo_user():
    """Create the demo user if it doesn't exist."""
    db = firestore.Client(
        project=settings.gcp_project_id,
        database=settings.firestore_database,
    )

    # Check if already exists
    docs = (
        db.collection(USERS_COLLECTION)
        .where("email", "==", DEMO_USER["email"])
        .limit(1)
        .stream()
    )
    for doc in docs:
        print(f"Demo user already exists (id: {doc.id}). Skipping.")
        return

    # Create user
    from datetime import datetime, timezone

    user_data = {
        "email": DEMO_USER["email"],
        "password_hash": hash_password(DEMO_USER["password"]),
        "first_name": DEMO_USER["first_name"],
        "last_name": DEMO_USER["last_name"],
        "created_at": datetime.now(timezone.utc).isoformat(),
    }

    doc_ref = db.collection(USERS_COLLECTION).document()
    doc_ref.set(user_data)
    print(f"Demo user created (id: {doc_ref.id})")
    print(f"  Email: {DEMO_USER['email']}")
    print(f"  Password: {DEMO_USER['password']}")


if __name__ == "__main__":
    seed_demo_user()
