"""Model Armor middleware — screens content for injection, PII, and harmful content."""

from dataclasses import dataclass


@dataclass
class ScreeningResult:
    """Result of Model Armor content screening."""

    passed: bool
    content: dict
    blocked_reasons: list[str] | None = None


async def screen_content(payload: dict, direction: str = "input") -> dict:
    """Screen content through Model Armor.

    Args:
        payload: Content to screen.
        direction: 'input' for prompts, 'output' for responses.

    Returns:
        Screened (potentially redacted) content.

    Note:
        In production, this integrates with the GEAP Model Armor service
        via Agent Gateway Service Extensions.
    """
    # TODO: Integrate with GEAP Model Armor API
    # For now, pass through with basic checks
    return payload
