"""
Hijraah Multi-Agent System (MAS)

A sophisticated multi-agent system for immigration analysis and advisory services.
"""

__version__ = "0.1.0"
__author__ = "Hijraah Team"
__email__ = "team@hijraah.com"

from .agents import (
    ImmigrationAgent,
    PolicyResearchAgent,
    DocumentAnalysisAgent,
    PredictionAgent,
    CommunityValidationAgent,
)
from .teams import ImmigrationTeam
from .tools import (
    SupabaseTools,
    VectorSearchTools,
    FirecrawlTools,
    DocumentProcessingTools,
    KnowledgeGraphTools,
)

__all__ = [
    # Version info
    "__version__",
    "__author__",
    "__email__",
    # Agents
    "ImmigrationAgent",
    "PolicyResearchAgent", 
    "DocumentAnalysisAgent",
    "PredictionAgent",
    "CommunityValidationAgent",
    # Teams
    "ImmigrationTeam",
    # Tools
    "SupabaseTools",
    "VectorSearchTools",
    "FirecrawlTools",
    "DocumentProcessingTools",
    "KnowledgeGraphTools",
]