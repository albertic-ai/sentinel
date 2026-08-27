"""OpenTelemetry tracing setup for Cloud Trace."""

from fastapi import FastAPI

from config import settings


def setup_tracing(app: FastAPI) -> None:
    """Initialize OpenTelemetry tracing with Google Cloud Trace exporter.

    Args:
        app: FastAPI application instance.
    """
    if not settings.gcp_project_id:
        return

    # TODO: Full OpenTelemetry setup
    # from opentelemetry import trace
    # from opentelemetry.sdk.trace import TracerProvider
    # from opentelemetry.exporter.cloud_trace import CloudTraceSpanExporter
    # from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
    #
    # provider = TracerProvider()
    # provider.add_span_processor(
    #     BatchSpanProcessor(CloudTraceSpanExporter(project_id=settings.gcp_project_id))
    # )
    # trace.set_tracer_provider(provider)
    # FastAPIInstrumentor.instrument_app(app)
    pass
