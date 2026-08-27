"""Tools for the Compliance Reporter agent."""

from google.adk import tool

from memory.bank import MemoryBankClient


@tool
async def get_memory_history(agent_name: str, days: int = 30) -> dict:
    """Retrieve historical observations from Memory Bank for a specific agent.

    Args:
        agent_name: Name of the agent whose history to retrieve.
        days: Number of days of history (default 30).

    Returns:
        Dictionary containing historical observations and findings.
    """
    client = MemoryBankClient()
    return await client.get_agent_memories(agent_name, days)


@tool
async def generate_report(
    title: str, findings: str, period_days: int = 30
) -> dict:
    """Generate a structured compliance report document.

    Args:
        title: Report title.
        findings: Compiled findings text.
        period_days: Reporting period in days.

    Returns:
        Dictionary containing the formatted report.
    """
    return {
        "title": title,
        "period_days": period_days,
        "findings": findings,
        "status": "generated",
    }
