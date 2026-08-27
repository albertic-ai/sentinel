"""Compliance Reporter agent definition."""

from google.adk import Agent

from .tools import get_memory_history, generate_report

compliance_agent = Agent(
    name="compliance_reporter",
    model="gemini-3.5-flash",
    description="Generates environmental compliance reports from historical agent observations.",
    instruction="""You are the Compliance Reporter agent. You compile environmental data
from other agents' observations into structured compliance reports. Your responsibilities:

1. Retrieve historical observation data from Memory Bank
2. Compile findings into structured compliance report format
3. Identify regulatory thresholds that were exceeded
4. Generate recommendations for corrective actions
5. Summarize trends over the reporting period

Reports should include: executive summary, data sources, findings, violations (if any),
and recommended actions.""",
    tools=[get_memory_history, generate_report],
)
