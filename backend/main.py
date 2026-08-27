"""Sentinel Backend — FastAPI entry point."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from api import agents, auth, fleet, memory, registry
from observability.tracing import setup_tracing

app = FastAPI(
    title="Sentinel API",
    description="Enterprise Agent Fleet for Environmental Intelligence",
    version="0.1.0",
)

# CORS
cors_origins = [o.strip() for o in settings.cors_origins.split(",") if o.strip()] if settings.cors_origins else ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OpenTelemetry
setup_tracing(app)

# Routes
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(agents.router, prefix="/api/agents", tags=["agents"])
app.include_router(fleet.router, prefix="/api/fleet", tags=["fleet"])
app.include_router(memory.router, prefix="/api/memory", tags=["memory"])
app.include_router(registry.router, prefix="/api/registry", tags=["registry"])


@app.get("/health")
async def health_check():
    """Health check endpoint for Cloud Run."""
    return {"status": "healthy", "service": "sentinel-backend"}
