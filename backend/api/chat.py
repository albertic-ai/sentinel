"""Chat API endpoint — converse with the Sentinel agent fleet."""

from fastapi import APIRouter
from pydantic import BaseModel

from chat.service import generate_reply, AGENT_PROMPTS

router = APIRouter()


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    agent: str = "sentinel_orchestrator"
    message: str
    history: list[ChatMessage] = []


class ChatResponse(BaseModel):
    reply: str
    agent: str
    powered_by: str


SUGGESTIONS = {
    "sentinel_orchestrator": [
        "Check wildfire risk near Sierra Nevada",
        "What's the air quality in Delhi today?",
        "Any deforestation alerts in the Amazon?",
    ],
    "wildfire_sentinel": [
        "Are there active fires near 36.7, -119.4?",
        "Compare current hotspots to the 30-day baseline",
        "What's the fire risk this week?",
    ],
    "air_quality_analyst": [
        "What's the AQI in Delhi right now?",
        "Forecast pollution for the next 48 hours",
        "Is it safe for outdoor activity today?",
    ],
    "deforestation_tracker": [
        "Show forest cover change in Amazon sector 7",
        "What's the NDVI trend this quarter?",
        "Detect land-use changes near road networks",
    ],
    "compliance_reporter": [
        "Generate a Q3 compliance summary",
        "Which EPA thresholds were exceeded?",
        "Show the 90-day environmental trend",
    ],
}


@router.get("/agents")
async def chat_agents():
    """List agents available for chat with suggested prompts."""
    return {
        "agents": [
            {
                "name": name,
                "label": name.replace("_", " ").title(),
                "suggestions": SUGGESTIONS.get(name, []),
            }
            for name in AGENT_PROMPTS
        ]
    }


@router.post("/", response_model=ChatResponse)
async def chat(body: ChatRequest):
    """Send a message to an agent and get a reply."""
    history = [{"role": m.role, "content": m.content} for m in body.history]
    result = await generate_reply(body.agent, body.message, history)
    return ChatResponse(**result)
