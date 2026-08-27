"""Chat service — powered by GenKit + Gemini.

Falls back to a helpful message when GEMINI_API_KEY is not configured, so the
app remains functional for demos without an API key.
"""

from config import settings

# System prompts per agent
AGENT_PROMPTS = {
    "sentinel_orchestrator": (
        "You are the Sentinel Orchestrator, coordinating an environmental "
        "intelligence agent fleet. Help users monitor wildfires, air quality, "
        "and deforestation. Use the available tools to fetch real data when a "
        "location is provided. Delegate conceptually to the right specialist "
        "and explain your reasoning clearly and concisely."
    ),
    "wildfire_sentinel": (
        "You are the Wildfire Sentinel agent. You monitor satellite thermal data "
        "to detect active fires and hotspots. Use tools to check active fires and "
        "weather. Provide coordinates, confidence, and clear recommendations."
    ),
    "air_quality_analyst": (
        "You are the Air Quality Analyst. You track air quality indices and "
        "predict pollution events. Use tools to check air quality and weather. "
        "Always include AQI, primary pollutant, and a health recommendation."
    ),
    "deforestation_tracker": (
        "You are the Deforestation Tracker. You analyze satellite imagery to "
        "detect forest cover changes. Use the vegetation tool to check NDVI. "
        "Report affected area and confidence."
    ),
    "compliance_reporter": (
        "You are the Compliance Reporter. You compile environmental observations "
        "into compliance reports, highlighting regulatory thresholds and trends."
    ),
}

DEFAULT_AGENT = "sentinel_orchestrator"

# Demo responses used when no API key is configured (keeps demos functional)
DEMO_RESPONSES = {
    "sentinel_orchestrator": (
        "I coordinate the Sentinel environmental intelligence fleet. Based on your "
        "request I'd delegate to the right specialist — for example, routing a "
        "wildfire question to the Wildfire Sentinel, which would query NASA FIRMS "
        "for active hotspots near your coordinates. Ask me about wildfire risk, "
        "air quality, or deforestation for a specific location."
    ),
    "wildfire_sentinel": (
        "Scanning satellite thermal data via NASA FIRMS. For the requested region I "
        "would report active fire hotspots with coordinates, confidence levels, and "
        "how current readings compare to the seasonal baseline. If anomalies exceed "
        "300% of baseline, I raise a critical alert for field teams."
    ),
    "air_quality_analyst": (
        "Checking OpenAQ sensor networks and weather conditions. For your location I "
        "would report the current AQI, the primary pollutant (often PM2.5), and a "
        "48-hour pollution forecast. When AQI is predicted above 300, I issue a "
        "health advisory for outdoor activity."
    ),
    "deforestation_tracker": (
        "Comparing Sentinel Hub satellite imagery across time. For the monitored "
        "region I would report NDVI vegetation health, detected land-cover changes, "
        "and the affected area in hectares — flagging accelerating loss near road "
        "networks."
    ),
    "compliance_reporter": (
        "Compiling observations from the fleet's Memory Bank into a compliance "
        "report. I would summarize findings, highlight any regulatory thresholds "
        "exceeded (e.g., EPA limits), and include 90-day trend analysis with "
        "recommended corrective actions."
    ),
}

# Lazily initialized GenKit instance
_genkit_app = None


def _get_genkit():
    """Initialize GenKit.

    Uses Vertex AI (GCP credits, no API key) when a project is configured;
    otherwise falls back to the Gemini API key if provided.
    Returns None if neither is available.
    """
    global _genkit_app
    if _genkit_app is not None:
        return _genkit_app

    import logging

    log = logging.getLogger("sentinel.chat")

    # Prefer Vertex AI (uses GCP credits, authenticates via the service account)
    if settings.gcp_project_id:
        try:
            from genkit import Genkit
            from genkit_google_genai import VertexAI

            _genkit_app = Genkit(
                plugins=[VertexAI(location=settings.gcp_region or "us-central1")],
                model="vertexai/gemini-2.5-flash",
            )
            return _genkit_app
        except Exception as exc:  # noqa: BLE001
            log.error("Vertex AI init failed: %s", exc, exc_info=True)

    # Fallback: Gemini API key
    if settings.gemini_api_key:
        try:
            from genkit import Genkit
            from genkit_google_genai import GoogleAI

            _genkit_app = Genkit(
                plugins=[GoogleAI(api_key=settings.gemini_api_key)],
                model="googleai/gemini-flash-latest",
            )
            return _genkit_app
        except Exception as exc:  # noqa: BLE001
            log.error("GoogleAI init failed: %s", exc, exc_info=True)

    return None


async def generate_reply(agent_name: str, message: str, history: list[dict]) -> dict:
    """Generate an agent reply to a user message.

    Args:
        agent_name: Which agent to converse with.
        message: The user's latest message.
        history: Prior messages [{role, content}].

    Returns:
        {reply, agent, powered_by}
    """
    agent = agent_name if agent_name in AGENT_PROMPTS else DEFAULT_AGENT
    system_prompt = AGENT_PROMPTS[agent]

    ai = _get_genkit()
    if ai is None:
        # Demo mode — return a realistic canned response for the agent
        return {
            "reply": DEMO_RESPONSES.get(agent, DEMO_RESPONSES[DEFAULT_AGENT]),
            "agent": agent,
            "powered_by": "demo",
        }

    # Build the conversation context
    convo = system_prompt + "\n\n"
    for turn in history[-8:]:
        role = "User" if turn.get("role") == "user" else "Agent"
        convo += f"{role}: {turn.get('content', '')}\n"
    convo += f"User: {message}\nAgent:"

    try:
        response = await ai.generate(prompt=convo)
        text = getattr(response, "text", None) or DEMO_RESPONSES.get(agent, DEMO_RESPONSES[DEFAULT_AGENT])
        return {"reply": text, "agent": agent, "powered_by": "gemini"}
    except Exception as exc:  # noqa: BLE001
        import logging

        logging.getLogger("sentinel.chat").error("Gemini generate failed: %s", exc, exc_info=True)
        # Fall back to a demo response rather than surfacing a raw error
        return {
            "reply": (
                "I'm temporarily unable to reach the model. Here's what I would "
                "normally do:\n\n" + DEMO_RESPONSES.get(agent, DEMO_RESPONSES[DEFAULT_AGENT])
            ),
            "agent": agent,
            "powered_by": "fallback",
        }
