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

# Lazily initialized GenKit instance
_genkit_app = None


def _get_genkit():
    """Initialize GenKit with the Google GenAI plugin, or return None if unavailable."""
    global _genkit_app
    if _genkit_app is not None:
        return _genkit_app
    if not settings.gemini_api_key:
        return None
    try:
        from genkit.ai import Genkit
        from genkit.plugins.google_genai import GoogleAI

        _genkit_app = Genkit(
            plugins=[GoogleAI(api_key=settings.gemini_api_key)],
            model="googleai/gemini-flash-latest",
        )
        return _genkit_app
    except Exception:
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
        return {
            "reply": (
                "The chat model is not configured yet. Set the GEMINI_API_KEY "
                "environment variable to enable live agent conversations. "
                f"(Agent: {agent})"
            ),
            "agent": agent,
            "powered_by": "unconfigured",
        }

    # Build the conversation context
    convo = system_prompt + "\n\n"
    for turn in history[-8:]:
        role = "User" if turn.get("role") == "user" else "Agent"
        convo += f"{role}: {turn.get('content', '')}\n"
    convo += f"User: {message}\nAgent:"

    try:
        response = await ai.generate(prompt=convo)
        return {"reply": response.text, "agent": agent, "powered_by": "gemini"}
    except Exception as exc:  # noqa: BLE001
        return {
            "reply": f"The chat model encountered an error: {exc}",
            "agent": agent,
            "powered_by": "error",
        }
