"""Application configuration loaded from environment variables."""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Sentinel backend settings."""

    # Application
    app_name: str = "sentinel-backend"
    debug: bool = False
    port: int = 8080

    # CORS
    cors_origins: list[str] = ["http://localhost:3000"]

    # Google Cloud
    gcp_project_id: str = ""
    gcp_region: str = "us-central1"

    # Vertex AI / Gemini
    gemini_model: str = "gemini-2.5-flash"

    # Agent Registry
    agent_registry_location: str = "us-central1"

    # Memory Bank
    memory_bank_id: str = ""

    # Firestore
    firestore_database: str = "(default)"

    # Environmental Data APIs
    nasa_firms_api_key: str = ""
    openaq_api_key: str = ""
    sentinel_hub_client_id: str = ""
    sentinel_hub_client_secret: str = ""
    openweather_api_key: str = ""

    class Config:
        env_file = ".env.local"
        env_file_encoding = "utf-8"


settings = Settings()
