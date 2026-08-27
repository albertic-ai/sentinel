"""Application configuration loaded from environment variables."""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Sentinel backend settings."""

    # Application
    debug: bool = False
    port: int = 8080
    cors_origins: str = ""

    # Google Cloud
    gcp_project_id: str = ""
    gcp_region: str = ""

    # Vertex AI / Gemini
    gemini_model: str = ""

    # GEAP — Agent Registry
    agent_registry_location: str = ""

    # GEAP — Memory Bank
    memory_bank_id: str = ""

    # Firestore
    firestore_database: str = ""

    # Environmental Data APIs
    nasa_firms_api_key: str = ""
    openaq_api_key: str = ""
    sentinel_hub_client_id: str = ""
    sentinel_hub_client_secret: str = ""
    openweather_api_key: str = ""

    # Auth / JWT
    jwt_secret: str = ""
    jwt_algorithm: str = "HS256"
    jwt_expiry_hours: int = 24

    class Config:
        env_file = ".env.local"
        env_file_encoding = "utf-8"


settings = Settings()
