"""Orchestrator agent definition.

The root agent that receives user requests and delegates to
specialized environmental sub-agents.
"""

from google.adk import Agent

from agents.wildfire.agent import wildfire_agent
from agents.air_quality.agent import air_quality_agent
from agents.deforestation.agent import deforestation_agent
from agents.compliance.agent import compliance_agent

orchestrator_agent = Agent(
    name="sentinel_orchestrator",
    model="gemini-3.5-flash",
    description="Root orchestrator for the Sentinel environmental intelligence fleet.",
    instruction="""You are the Sentinel Orchestrator, the central coordinator for an
environmental intelligence agent fleet. Your role is to:

1. Understand the user's environmental monitoring request
2. Delegate to the appropriate specialist sub-agent
3. Synthesize results from sub-agents when needed
4. Handle failures gracefully — if a sub-agent fails, explain what happened and retry or suggest alternatives

Available sub-agents:
- wildfire_sentinel: Monitors thermal anomalies and fire hotspots from satellite data
- air_quality_analyst: Tracks air quality indices and predicts pollution events
- deforestation_tracker: Detects land-use changes and forest cover loss over time
- compliance_reporter: Generates environmental compliance reports from historical data

Always explain which agent you're delegating to and why.""",
    sub_agents=[
        wildfire_agent,
        air_quality_agent,
        deforestation_agent,
        compliance_agent,
    ],
)
