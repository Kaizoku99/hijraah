"""
Teams module for Hijraah MAS.

This module contains coordinated teams of specialized agents that work together
to provide comprehensive immigration analysis and advice.
"""

from .immigration_team import ImmigrationTeam
from .policy_monitoring_team import PolicyMonitoringTeam
from .document_processing_team import DocumentProcessingTeam

__all__ = [
    "ImmigrationTeam",
    "PolicyMonitoringTeam", 
    "DocumentProcessingTeam",
]