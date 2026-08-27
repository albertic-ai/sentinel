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


@router.get("/agents")
async def chat_agents():
    """List agents available for chat."""
    return {
        "agents": [
            {"name": name, "label": name.replace("_", " ").title()}
            for name in AGENT_PROMPTS
        ]
    }


@router.post("/", response_model=ChatResponse)
async def chat(body: ChatRequest):
    """Send a message to an agent and get a reply."""
    history = [{"role": m.role, "content": m.content} for m in body.history]
    result = await generate_reply(body.agent, body.message, history)
    return ChatResponse(**result)
