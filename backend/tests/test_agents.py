"""Tests for agent definitions."""


def test_orchestrator_has_sub_agents():
    """Orchestrator should have all four sub-agents."""
    from agents.orchestrator import orchestrator_agent

    assert len(orchestrator_agent.sub_agents) == 4


def test_wildfire_agent_has_tools():
    """Wildfire agent should have monitoring tools."""
    from agents.wildfire import wildfire_agent

    assert len(wildfire_agent.tools) == 3
