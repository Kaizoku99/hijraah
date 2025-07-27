"""
Enhanced Supabase Tools for Hijraah MAS using latest Agno patterns.

This module provides tools for Agno agents to interact with Hijraah's Supabase database
using the latest @tool decorator patterns and best practices.
"""

from typing import Dict, Any, List, Optional, Union
from agno.tools import tool
from supabase import create_client, Client
from datetime import datetime, timedelta
import json
import logging

logger = logging.getLogger(__name__)


class SupabaseTools:
    """
    Enhanced Supabase integration tools for Hijraah MAS agents using latest Agno patterns.
    
    Provides access to:
    - User profiles and cases
    - Immigration policies and requirements
    - Community experiences and validation
    - Knowledge base and analytics
    - Real-time notifications and updates
    """
    
    def __init__(self, url: str, key: str):
        """
        Initialize Supabase tools.
        
        Args:
            url: Supabase project URL
            key: Supabase service role key
        """
        self.supabase: Client = create_client(url, key)
        logger.info("Initialized SupabaseTools with latest Agno patterns")


# User Profile Management Tools
@tool(
    name="get_user_profile",
    description="Retrieve comprehensive user profile from Supabase database",
    show_result=True,
    cache_results=True,
    cache_ttl=300  # Cache for 5 minutes
)
def get_user_profile(user_id: str, supabase_client: Client) -> Dict[str, Any]:
    """
    Retrieve user profile from Supabase.
    
    Args:
        user_id: User ID to retrieve profile for
        supabase_client: Supabase client instance
        
    Returns:
        User profile data with immigration preferences and history
    """
    try:
        # Get basic profile
        profile_response = supabase_client.table('user_profiles').select('*').eq('id', user_id).execute()
        
        if not profile_response.data:
            return {
                "success": False,
                "error": "User profile not found",
                "user_id": user_id,
            }
        
        profile = profile_response.data[0]
        
        # Get immigration cases
        cases_response = supabase_client.table('user_cases').select('*').eq('user_id', user_id).execute()
        
        # Get preferences
        prefs_response = supabase_client.table('user_preferences').select('*').eq('user_id', user_id).execute()
        
        logger.info(f"Retrieved comprehensive profile for user {user_id}")
        
        return {
            "success": True,
            "profile": {
                "basic_info": profile,
                "immigration_cases": cases_response.data,
                "preferences": prefs_response.data[0] if prefs_response.data else {},
                "profile_completeness": _calculate_profile_completeness(profile),
            },
            "retrieved_at": datetime.now().isoformat(),
        }
        
    except Exception as e:
        logger.error(f"Error retrieving user profile {user_id}: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "user_id": user_id,
        }


@tool(
    name="update_user_case_status",
    description="Update user's immigration case status with detailed tracking",
    show_result=True,
    requires_confirmation=True  # Require confirmation for data updates
)
def update_user_case_status(
    user_id: str, 
    case_id: str,
    status: str, 
    notes: str,
    milestone_data: Optional[Dict[str, Any]],
    supabase_client: Client
) -> Dict[str, Any]:
    """
    Update user's case status with comprehensive tracking.
    
    Args:
        user_id: User ID
        case_id: Immigration case ID
        status: New status
        notes: Status update notes
        milestone_data: Additional milestone information
        supabase_client: Supabase client instance
        
    Returns:
        Update confirmation with timeline tracking
    """
    try:
        update_data = {
            'status': status,
            'notes': notes,
            'updated_at': datetime.now().isoformat(),
            'milestone_data': milestone_data or {}
        }
        
        # Update case status
        case_response = (supabase_client.table('user_cases')
                        .update(update_data)
                        .eq('id', case_id)
                        .eq('user_id', user_id)
                        .execute())
        
        # Log status change for analytics
        status_log = {
            'user_id': user_id,
            'case_id': case_id,
            'old_status': None,  # Would get from previous record
            'new_status': status,
            'change_reason': notes,
            'changed_at': datetime.now().isoformat(),
        }
        
        supabase_client.table('case_status_history').insert(status_log).execute()
        
        logger.info(f"Updated case {case_id} status to {status} for user {user_id}")
        
        return {
            "success": True,
            "case_id": case_id,
            "user_id": user_id,
            "new_status": status,
            "updated_at": datetime.now().isoformat(),
            "milestone_recorded": milestone_data is not None,
        }
        
    except Exception as e:
        logger.error(f"Error updating case status: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "case_id": case_id,
            "user_id": user_id,
        }


# Policy and Legal Information Tools
@tool(
    name="get_immigration_policies",
    description="Get comprehensive immigration policy data with change tracking",
    show_result=True,
    cache_results=True,
    cache_ttl=1800  # Cache for 30 minutes
)
def get_immigration_policies(
    country: str, 
    visa_type: Optional[str] = None,
    include_recent_changes: bool = True,
    supabase_client: Client
) -> Dict[str, Any]:
    """
    Get comprehensive immigration policy data.
    
    Args:
        country: Country code or name
        visa_type: Specific visa type (optional)
        include_recent_changes: Whether to include recent policy changes
        supabase_client: Supabase client instance
        
    Returns:
        Comprehensive policy information with change history
    """
    try:
        # Build query
        query = supabase_client.table('immigration_policies').select('*').eq('country', country)
        
        if visa_type:
            query = query.eq('visa_type', visa_type)
        
        policies_response = query.execute()
        
        result = {
            "success": True,
            "country": country,
            "visa_type": visa_type,
            "policies": policies_response.data,
            "count": len(policies_response.data),
        }
        
        # Get recent changes if requested
        if include_recent_changes:
            changes_query = (supabase_client.table('policy_changes')
                           .select('*')
                           .eq('country', country)
                           .gte('created_at', (datetime.now() - timedelta(days=30)).isoformat())
                           .order('created_at', desc=True))
            
            if visa_type:
                changes_query = changes_query.eq('visa_type', visa_type)
            
            changes_response = changes_query.execute()
            result["recent_changes"] = changes_response.data
            result["changes_count"] = len(changes_response.data)
        
        result["retrieved_at"] = datetime.now().isoformat()
        
        logger.info(f"Retrieved {len(policies_response.data)} policies for {country}" + 
                   (f" ({visa_type})" if visa_type else ""))
        
        return result
        
    except Exception as e:
        logger.error(f"Error retrieving policies for {country}: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "country": country,
            "visa_type": visa_type,
        }


@tool(
    name="track_policy_changes",
    description="Track and analyze recent immigration policy changes with impact assessment",
    show_result=True
)
def track_policy_changes(
    countries: List[str],
    days_back: int = 30,
    impact_levels: Optional[List[str]] = None,
    supabase_client: Client
) -> Dict[str, Any]:
    """
    Track recent policy changes with impact analysis.
    
    Args:
        countries: List of countries to track
        days_back: Number of days to look back
        impact_levels: Filter by impact levels (critical, major, minor)
        supabase_client: Supabase client instance
        
    Returns:
        Comprehensive policy change analysis
    """
    try:
        cutoff_date = datetime.now() - timedelta(days=days_back)
        
        query = (supabase_client.table('policy_changes')
                .select('*')
                .in_('country', countries)
                .gte('created_at', cutoff_date.isoformat()))
        
        if impact_levels:
            query = query.in_('impact_level', impact_levels)
        
        changes_response = query.order('created_at', desc=True).execute()
        
        # Analyze changes by country and impact
        analysis = _analyze_policy_changes(changes_response.data)
        
        logger.info(f"Tracked {len(changes_response.data)} policy changes across {len(countries)} countries")
        
        return {
            "success": True,
            "countries_tracked": countries,
            "days_back": days_back,
            "total_changes": len(changes_response.data),
            "changes": changes_response.data,
            "analysis": analysis,
            "tracked_at": datetime.now().isoformat(),
        }
        
    except Exception as e:
        logger.error(f"Error tracking policy changes: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "countries": countries,
        }


# Community Data and Validation Tools
@tool(
    name="get_community_experiences",
    description="Get validated community immigration experiences with success metrics",
    show_result=True,
    cache_results=True,
    cache_ttl=600  # Cache for 10 minutes
)
def get_community_experiences(
    pathway: str,
    country: Optional[str] = None,
    user_profile_match: Optional[Dict[str, Any]] = None,
    verified_only: bool = True,
    supabase_client: Client
) -> Dict[str, Any]:
    """
    Get community experiences with advanced filtering and validation.
    
    Args:
        pathway: Immigration pathway or visa type
        country: Target country (optional)
        user_profile_match: User profile for similar experience matching
        verified_only: Whether to return only verified experiences
        supabase_client: Supabase client instance
        
    Returns:
        Community experiences with success metrics and validation status
    """
    try:
        query = supabase_client.table('community_experiences').select('*').eq('pathway', pathway)
        
        if country:
            query = query.eq('target_country', country)
        
        if verified_only:
            query = query.eq('verification_status', 'verified')
        
        experiences_response = query.order('created_at', desc=True).execute()
        
        # Calculate success metrics
        experiences = experiences_response.data
        success_metrics = _calculate_success_metrics(experiences)
        
        # Filter by profile similarity if provided
        if user_profile_match:
            experiences = _filter_by_profile_similarity(experiences, user_profile_match)
        
        logger.info(f"Retrieved {len(experiences)} community experiences for {pathway}")
        
        return {
            "success": True,
            "pathway": pathway,
            "country": country,
            "experiences": experiences,
            "success_metrics": success_metrics,
            "profile_matched": user_profile_match is not None,
            "verified_only": verified_only,
            "retrieved_at": datetime.now().isoformat(),
        }
        
    except Exception as e:
        logger.error(f"Error retrieving community experiences: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "pathway": pathway,
            "country": country,
        }


@tool(
    name="validate_community_submission",
    description="Validate and score community-submitted immigration experience",
    show_result=True,
    requires_confirmation=True
)
def validate_community_submission(
    submission_data: Dict[str, Any],
    validation_criteria: Dict[str, Any],
    validator_id: str,
    supabase_client: Client
) -> Dict[str, Any]:
    """
    Validate community submission with comprehensive scoring.
    
    Args:
        submission_data: The community submission to validate
        validation_criteria: Criteria for validation
        validator_id: ID of the validator
        supabase_client: Supabase client instance
        
    Returns:
        Validation results with quality scores
    """
    try:
        # Perform validation checks
        validation_results = _perform_validation_checks(submission_data, validation_criteria)
        
        # Store validation record
        validation_record = {
            'submission_id': submission_data.get('id'),
            'validator_id': validator_id,
            'validation_score': validation_results['overall_score'],
            'validation_details': validation_results,
            'validated_at': datetime.now().isoformat(),
        }
        
        supabase_client.table('community_validations').insert(validation_record).execute()
        
        # Update submission status if validation is complete
        if validation_results['overall_score'] >= 0.8:
            supabase_client.table('community_experiences').update({
                'verification_status': 'verified',
                'quality_score': validation_results['overall_score']
            }).eq('id', submission_data.get('id')).execute()
        
        logger.info(f"Validated community submission with score {validation_results['overall_score']}")
        
        return {
            "success": True,
            "submission_id": submission_data.get('id'),
            "validation_score": validation_results['overall_score'],
            "validation_details": validation_results,
            "status_updated": validation_results['overall_score'] >= 0.8,
            "validated_at": datetime.now().isoformat(),
        }
        
    except Exception as e:
        logger.error(f"Error validating community submission: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "submission_id": submission_data.get('id'),
        }


# Analytics and Intelligence Tools
@tool(
    name="get_success_analytics",
    description="Get comprehensive success analytics for immigration pathways",
    show_result=True,
    cache_results=True,
    cache_ttl=3600  # Cache for 1 hour
)
def get_success_analytics(
    pathway: str,
    user_profile: Optional[Dict[str, Any]] = None,
    time_period: str = "12_months",
    include_predictions: bool = True,
    supabase_client: Client
) -> Dict[str, Any]:
    """
    Get comprehensive success analytics with predictive insights.
    
    Args:
        pathway: Immigration pathway to analyze
        user_profile: User profile for personalized analytics
        time_period: Time period for analysis (6_months, 12_months, 24_months)
        include_predictions: Whether to include predictive analytics
        supabase_client: Supabase client instance
        
    Returns:
        Comprehensive analytics with success rates, timelines, and predictions
    """
    try:
        # Define time period
        months_back = {"6_months": 6, "12_months": 12, "24_months": 24}.get(time_period, 12)
        cutoff_date = datetime.now() - timedelta(days=months_back * 30)
        
        # Get outcome data
        query = (supabase_client.table('immigration_outcomes')
                .select('*')
                .eq('pathway', pathway)
                .gte('created_at', cutoff_date.isoformat()))
        
        outcomes_response = query.execute()
        outcomes = outcomes_response.data
        
        # Calculate comprehensive analytics
        analytics = _calculate_comprehensive_analytics(outcomes, user_profile)
        
        # Add predictive insights if requested
        if include_predictions and user_profile:
            predictions = _generate_success_predictions(outcomes, user_profile)
            analytics['predictions'] = predictions
        
        logger.info(f"Generated success analytics for {pathway} with {len(outcomes)} data points")
        
        return {
            "success": True,
            "pathway": pathway,
            "time_period": time_period,
            "data_points": len(outcomes),
            "analytics": analytics,
            "personalized": user_profile is not None,
            "generated_at": datetime.now().isoformat(),
        }
        
    except Exception as e:
        logger.error(f"Error generating success analytics: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "pathway": pathway,
        }


@tool(
    name="search_knowledge_base",
    description="Search immigration knowledge base with semantic and keyword search",
    show_result=True,
    cache_results=True,
    cache_ttl=900  # Cache for 15 minutes
)
def search_knowledge_base(
    query: str,
    search_type: str = "hybrid",  # semantic, keyword, hybrid
    limit: int = 10,
    filters: Optional[Dict[str, Any]] = None,
    supabase_client: Client
) -> Dict[str, Any]:
    """
    Search knowledge base with advanced search capabilities.
    
    Args:
        query: Search query
        search_type: Type of search (semantic, keyword, hybrid)
        limit: Maximum number of results
        filters: Additional filters (country, visa_type, etc.)
        supabase_client: Supabase client instance
        
    Returns:
        Search results with relevance scores and metadata
    """
    try:
        # Build search query based on type
        if search_type in ["keyword", "hybrid"]:
            # Use full-text search
            kb_query = (supabase_client.table('knowledge_base')
                       .select('*')
                       .text_search('content', query))
        else:
            # Use vector/semantic search (placeholder)
            kb_query = supabase_client.table('knowledge_base').select('*')
        
        # Apply filters
        if filters:
            for key, value in filters.items():
                if value:
                    kb_query = kb_query.eq(key, value)
        
        kb_response = kb_query.limit(limit).execute()
        
        # Enhance results with relevance scoring
        results = _enhance_search_results(kb_response.data, query, search_type)
        
        logger.info(f"Knowledge base search for '{query}' returned {len(results)} results")
        
        return {
            "success": True,
            "query": query,
            "search_type": search_type,
            "results": results,
            "total_found": len(results),
            "filters_applied": filters or {},
            "searched_at": datetime.now().isoformat(),
        }
        
    except Exception as e:
        logger.error(f"Error searching knowledge base: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "query": query,
        }


# Helper functions
def _calculate_profile_completeness(profile: Dict[str, Any]) -> float:
    """Calculate profile completeness percentage."""
    required_fields = ['name', 'email', 'country_of_origin', 'education_level', 'work_experience']
    completed_fields = sum(1 for field in required_fields if profile.get(field))
    return (completed_fields / len(required_fields)) * 100


def _analyze_policy_changes(changes: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Analyze policy changes for trends and impact."""
    if not changes:
        return {"total_changes": 0, "by_impact": {}, "by_country": {}}
    
    by_impact = {}
    by_country = {}
    
    for change in changes:
        impact = change.get('impact_level', 'unknown')
        country = change.get('country', 'unknown')
        
        by_impact[impact] = by_impact.get(impact, 0) + 1
        by_country[country] = by_country.get(country, 0) + 1
    
    return {
        "total_changes": len(changes),
        "by_impact": by_impact,
        "by_country": by_country,
        "most_active_country": max(by_country.items(), key=lambda x: x[1])[0] if by_country else None,
        "dominant_impact_level": max(by_impact.items(), key=lambda x: x[1])[0] if by_impact else None,
    }


def _calculate_success_metrics(experiences: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Calculate success metrics from community experiences."""
    if not experiences:
        return {"success_rate": 0, "average_timeline": 0, "sample_size": 0}
    
    successful = sum(1 for exp in experiences if exp.get('success', False))
    timelines = [exp.get('timeline_days', 0) for exp in experiences if exp.get('timeline_days')]
    
    return {
        "success_rate": (successful / len(experiences)) * 100,
        "average_timeline": sum(timelines) / len(timelines) if timelines else 0,
        "sample_size": len(experiences),
        "successful_cases": successful,
    }


def _filter_by_profile_similarity(experiences: List[Dict[str, Any]], profile: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Filter experiences by profile similarity."""
    # Placeholder implementation - would use actual similarity matching
    return experiences[:10]  # Return top 10 for now


def _perform_validation_checks(submission: Dict[str, Any], criteria: Dict[str, Any]) -> Dict[str, Any]:
    """Perform validation checks on community submission."""
    # Placeholder implementation
    return {
        "overall_score": 0.85,
        "completeness_score": 0.9,
        "consistency_score": 0.8,
        "credibility_score": 0.85,
        "issues_found": [],
        "recommendations": ["Add more specific timeline details"],
    }


def _calculate_comprehensive_analytics(outcomes: List[Dict[str, Any]], profile: Optional[Dict[str, Any]]) -> Dict[str, Any]:
    """Calculate comprehensive analytics from outcome data."""
    if not outcomes:
        return {"success_rate": 0, "average_timeline": 0, "confidence": "low"}
    
    successful = sum(1 for outcome in outcomes if outcome.get('success', False))
    timelines = [outcome.get('timeline_days', 0) for outcome in outcomes if outcome.get('timeline_days')]
    
    return {
        "success_rate": (successful / len(outcomes)) * 100,
        "average_timeline": sum(timelines) / len(timelines) if timelines else 0,
        "median_timeline": sorted(timelines)[len(timelines)//2] if timelines else 0,
        "sample_size": len(outcomes),
        "confidence": "high" if len(outcomes) > 50 else "medium" if len(outcomes) > 20 else "low",
    }


def _generate_success_predictions(outcomes: List[Dict[str, Any]], profile: Dict[str, Any]) -> Dict[str, Any]:
    """Generate success predictions based on profile and historical data."""
    # Placeholder implementation
    return {
        "predicted_success_rate": 78.5,
        "predicted_timeline": 185,
        "confidence_interval": {"lower": 65.2, "upper": 91.8},
        "key_factors": ["education_level", "work_experience", "country_of_origin"],
    }


def _enhance_search_results(results: List[Dict[str, Any]], query: str, search_type: str) -> List[Dict[str, Any]]:
    """Enhance search results with relevance scoring."""
    # Placeholder implementation - would add actual relevance scoring
    for i, result in enumerate(results):
        result['relevance_score'] = 0.9 - (i * 0.1)  # Decreasing relevance
        result['search_type_used'] = search_type
    
    return results