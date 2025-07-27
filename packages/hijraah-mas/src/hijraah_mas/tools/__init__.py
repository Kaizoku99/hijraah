"""
Hijraah MAS Tools Module.

This module contains specialized tools for Agno agents to interact with
Hijraah's infrastructure and external services using the latest Agno patterns.
"""

# Original tools
from .supabase_tools import SupabaseTools
from .vector_search_tools import VectorSearchTools
from .firecrawl_tools import FirecrawlTools
from .document_processing_tools import DocumentProcessingTools
from .ocr_tools import OCRTools

# Enhanced tools with latest Agno patterns
from .enhanced_supabase_tools import SupabaseTools as EnhancedSupabaseTools
from .enhanced_vector_search_tools import (
    semantic_search_knowledge_base,
    find_similar_immigration_cases,
)
from .enhanced_firecrawl_tools import (
    scrape_government_immigration_site,
    monitor_policy_changes_batch,
    extract_immigration_document_data,
)
from .ml_prediction_tools import (
    predict_immigration_success,
    estimate_processing_timeline,
    calculate_cost_predictions,
)

__all__ = [
    # Original tools
    "SupabaseTools",
    "VectorSearchTools",
    "FirecrawlTools", 
    "DocumentProcessingTools",
    "OCRTools",
    
    # Enhanced tools
    "EnhancedSupabaseTools",
    "semantic_search_knowledge_base",
    "find_similar_immigration_cases",
    "scrape_government_immigration_site",
    "monitor_policy_changes_batch",
    "extract_immigration_document_data",
    "predict_immigration_success",
    "estimate_processing_timeline",
    "calculate_cost_predictions",
]