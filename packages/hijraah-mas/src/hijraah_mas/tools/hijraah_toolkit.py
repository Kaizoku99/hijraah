"""
Hijraah Integrated Toolkit for Agno MAS using latest patterns.

This module provides a comprehensive toolkit that integrates all Hijraah-specific tools
for use with Agno agents, using the latest @tool decorator patterns and best practices.
"""

from typing import Dict, Any, List, Optional, Union
from agno.tools import tool
from supabase import create_client, Client
from datetime import datetime, timedelta
import json
import logging

# Import individual tool modules
from .enhanced_supabase_tools import SupabaseTools
from .enhanced_vector_search_tools import *
from .enhanced_firecrawl_tools import *
from .ml_prediction_tools import *

logger = logging.getLogger(__name__)


class HijraahToolkit:
    """
    Comprehensive toolkit for Hijraah MAS agents using latest Agno patterns.
    
    Integrates all Hijraah-specific tools including:
    - Supabase database operations
    - Vector search and semantic matching
    - Web scraping and policy monitoring
    - ML predictions and analytics
    - Document processing and OCR
    - Real-time notifications
    """
    
    def __init__(self, supabase_url: str, supabase_key: str, **kwargs):
        """
        Initialize Hijraah toolkit with configuration.
        
        Args:
            supabase_url: Supabase project URL
            supabase_key: Supabase service role key
            **kwargs: Additional configuration options
        """
        self.supabase_client = create_client(supabase_url, supabase_key)
        self.config = kwargs
        logger.info("Initialized HijraahToolkit with latest Agno patterns")


# Integration and Orchestration Tools
@tool(
    name="analyze_user_immigration_case",
    description="Comprehensive analysis of user's immigration case with predictions and recommendations",
    show_result=True,
    cache_results=True,
    cache_ttl=1800  # Cache for 30 minutes
)
def analyze_user_immigration_case(
    user_id: str,
    pathway: str,
    target_country: str,
    include_predictions: bool = True,
    include_similar_cases: bool = True,
    supabase_client: Client
) -> Dict[str, Any]:
    """
    Perform comprehensive analysis of user's immigration case.
    
    Args:
        user_id: User ID for analysis
        pathway: Immigration pathway (H-1B, EB-1, etc.)
        target_country: Target country for immigration
        include_predictions: Whether to include ML predictions
        include_similar_cases: Whether to find similar cases
        supabase_client: Supabase client instance
        
    Returns:
        Comprehensive case analysis with predictions and recommendations
    """
    try:
        logger.info(f"Analyzing immigration case for user {user_id}")
        
        # Get user profile
        profile_result = get_user_profile(user_id, supabase_client)
        if not profile_result.get("success"):
            return profile_result
        
        user_profile = profile_result["profile"]["basic_info"]
        
        analysis_result = {
            "user_id": user_id,
            "pathway": pathway,
            "target_country": target_country,
            "profile_analysis": {
                "completeness": profile_result["profile"]["profile_completeness"],
                "strengths": _identify_profile_strengths(user_profile, pathway),
                "areas_for_improvement": _identify_improvement_areas(user_profile, pathway),
            },
        }
        
        # Add ML predictions if requested
        if include_predictions:
            immigration_pathway = {"type": pathway, "country": target_country}
            
            # Success prediction
            success_prediction = predict_immigration_success(
                user_profile, immigration_pathway
            )
            
            # Timeline estimation
            timeline_estimation = estimate_processing_timeline(
                user_profile, immigration_pathway
            )
            
            # Cost prediction
            cost_prediction = calculate_cost_predictions(
                user_profile, immigration_pathway
            )
            
            analysis_result["predictions"] = {
                "success": success_prediction,
                "timeline": timeline_estimation,
                "costs": cost_prediction,
            }
        
        # Find similar cases if requested
        if include_similar_cases:
            similar_cases = find_similar_immigration_cases(
                user_profile, limit=5, include_outcomes=True
            )
            analysis_result["similar_cases"] = similar_cases
        
        # Get relevant policies and recent changes
        policies = get_immigration_policies(
            target_country, pathway, include_recent_changes=True, supabase_client=supabase_client
        )
        analysis_result["relevant_policies"] = policies
        
        # Generate comprehensive recommendations
        analysis_result["recommendations"] = _generate_comprehensive_recommendations(
            user_profile, pathway, analysis_result.get("predictions", {})
        )
        
        return {
            "success": True,
            "analysis": analysis_result,
            "analyzed_at": datetime.now().isoformat(),
        }
        
    except Exception as e:
        logger.error(f"Error analyzing immigration case: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "user_id": user_id,
            "pathway": pathway,
        }


@tool(
    name="monitor_policy_changes_for_user",
    description="Monitor policy changes relevant to specific user's immigration case",
    show_result=True,
    cache_results=True,
    cache_ttl=3600  # Cache for 1 hour
)
def monitor_policy_changes_for_user(
    user_id: str,
    notification_preferences: Optional[Dict[str, Any]] = None,
    supabase_client: Client
) -> Dict[str, Any]:
    """
    Monitor policy changes relevant to user's specific case.
    
    Args:
        user_id: User ID to monitor for
        notification_preferences: User's notification preferences
        supabase_client: Supabase client instance
        
    Returns:
        Relevant policy changes and impact assessment
    """
    try:
        logger.info(f"Monitoring policy changes for user {user_id}")
        
        # Get user profile and cases
        profile_result = get_user_profile(user_id, supabase_client)
        if not profile_result.get("success"):
            return profile_result
        
        user_cases = profile_result["profile"]["immigration_cases"]
        
        relevant_changes = []
        impact_assessment = {}
        
        # Monitor changes for each active case
        for case in user_cases:
            if case.get("status") in ["active", "pending", "in_progress"]:
                pathway = case.get("pathway")
                country = case.get("target_country")
                
                # Get recent policy changes
                changes = track_policy_changes(
                    [country], days_back=30, supabase_client=supabase_client
                )
                
                if changes.get("success"):
                    case_changes = [
                        change for change in changes["changes"]
                        if change.get("visa_type") == pathway or not change.get("visa_type")
                    ]
                    
                    relevant_changes.extend(case_changes)
                    
                    # Assess impact on user's case
                    impact_assessment[case["id"]] = _assess_policy_impact_on_case(
                        case, case_changes
                    )
        
        # Generate notifications if needed
        notifications = []
        if notification_preferences and relevant_changes:
            notifications = _generate_policy_change_notifications(
                relevant_changes, impact_assessment, notification_preferences
            )
        
        return {
            "success": True,
            "user_id": user_id,
            "relevant_changes": relevant_changes,
            "impact_assessment": impact_assessment,
            "notifications": notifications,
            "monitoring_summary": {
                "total_changes": len(relevant_changes),
                "high_impact_changes": len([c for c in relevant_changes if c.get("impact_level") == "high"]),
                "cases_affected": len(impact_assessment),
            },
            "monitored_at": datetime.now().isoformat(),
        }
        
    except Exception as e:
        logger.error(f"Error monitoring policy changes: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "user_id": user_id,
        }


@tool(
    name="generate_immigration_roadmap",
    description="Generate personalized immigration roadmap with timeline and milestones",
    show_result=True,
    cache_results=True,
    cache_ttl=7200  # Cache for 2 hours
)
def generate_immigration_roadmap(
    user_profile: Dict[str, Any],
    pathway: str,
    target_country: str,
    preferences: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """
    Generate comprehensive immigration roadmap for user.
    
    Args:
        user_profile: User's profile and background
        pathway: Immigration pathway
        target_country: Target country
        preferences: User preferences for timeline, budget, etc.
        
    Returns:
        Detailed roadmap with timeline, milestones, and action items
    """
    try:
        logger.info(f"Generating immigration roadmap for {pathway} to {target_country}")
        
        immigration_pathway = {"type": pathway, "country": target_country}
        
        # Get timeline estimation
        timeline_result = estimate_processing_timeline(user_profile, immigration_pathway)
        
        # Get cost estimation
        cost_result = calculate_cost_predictions(user_profile, immigration_pathway)
        
        # Get success prediction
        success_result = predict_immigration_success(user_profile, immigration_pathway)
        
        # Generate detailed roadmap phases
        roadmap_phases = _generate_roadmap_phases(
            user_profile, pathway, timeline_result, cost_result, preferences
        )
        
        # Create milestone tracking system
        milestones = _create_milestone_tracking(roadmap_phases, timeline_result)
        
        # Generate action items and checklists
        action_items = _generate_action_items(user_profile, pathway, roadmap_phases)
        
        # Risk mitigation plan
        risk_mitigation = _create_risk_mitigation_plan(
            user_profile, pathway, success_result
        )
        
        roadmap = {
            "overview": {
                "pathway": pathway,
                "target_country": target_country,
                "estimated_timeline": timeline_result.get("timeline_estimates", {}),
                "estimated_costs": cost_result.get("cost_breakdown", {}),
                "success_probability": success_result.get("prediction", {}).get("success_probability"),
            },
            "phases": roadmap_phases,
            "milestones": milestones,
            "action_items": action_items,
            "risk_mitigation": risk_mitigation,
            "optimization_opportunities": _identify_optimization_opportunities(
                timeline_result, cost_result, success_result
            ),
        }
        
        return {
            "success": True,
            "roadmap": roadmap,
            "user_profile": user_profile,
            "generated_at": datetime.now().isoformat(),
        }
        
    except Exception as e:
        logger.error(f"Error generating roadmap: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "pathway": pathway,
            "target_country": target_country,
        }


@tool(
    name="validate_document_completeness",
    description="Validate completeness and quality of immigration documents using AI",
    show_result=True,
    requires_confirmation=True  # Confirm before processing documents
)
def validate_document_completeness(
    document_list: List[Dict[str, Any]],
    pathway: str,
    target_country: str,
    validation_level: str = "comprehensive"  # basic, standard, comprehensive
) -> Dict[str, Any]:
    """
    Validate document completeness and quality using AI analysis.
    
    Args:
        document_list: List of documents to validate
        pathway: Immigration pathway
        target_country: Target country
        validation_level: Level of validation to perform
        
    Returns:
        Comprehensive document validation results with recommendations
    """
    try:
        logger.info(f"Validating {len(document_list)} documents for {pathway}")
        
        # Get required documents for pathway
        required_docs = _get_required_documents(pathway, target_country)
        
        validation_results = {
            "document_count": len(document_list),
            "required_count": len(required_docs),
            "validation_level": validation_level,
            "completeness_score": 0,
            "quality_score": 0,
            "document_analysis": [],
            "missing_documents": [],
            "recommendations": [],
        }
        
        # Check document completeness
        provided_doc_types = [doc.get("type") for doc in document_list]
        missing_docs = [
            req_doc for req_doc in required_docs
            if req_doc["type"] not in provided_doc_types
        ]
        
        validation_results["missing_documents"] = missing_docs
        validation_results["completeness_score"] = (
            (len(required_docs) - len(missing_docs)) / len(required_docs) * 100
        )
        
        # Analyze each document
        for doc in document_list:
            doc_analysis = _analyze_document_quality(doc, pathway, validation_level)
            validation_results["document_analysis"].append(doc_analysis)
        
        # Calculate overall quality score
        if validation_results["document_analysis"]:
            quality_scores = [
                analysis.get("quality_score", 0)
                for analysis in validation_results["document_analysis"]
            ]
            validation_results["quality_score"] = sum(quality_scores) / len(quality_scores)
        
        # Generate recommendations
        validation_results["recommendations"] = _generate_document_recommendations(
            validation_results, pathway, target_country
        )
        
        # Overall assessment
        validation_results["overall_assessment"] = _generate_overall_document_assessment(
            validation_results
        )
        
        return {
            "success": True,
            "validation": validation_results,
            "pathway": pathway,
            "target_country": target_country,
            "validated_at": datetime.now().isoformat(),
        }
        
    except Exception as e:
        logger.error(f"Error validating documents: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "pathway": pathway,
            "target_country": target_country,
        }


# Helper functions for integrated tools
def _identify_profile_strengths(profile: Dict[str, Any], pathway: str) -> List[str]:
    """Identify strengths in user profile for the pathway."""
    strengths = []
    
    if profile.get("education_level") in ["masters", "phd"]:
        strengths.append("Advanced education level")
    
    if profile.get("work_experience", 0) > 5:
        strengths.append("Extensive work experience")
    
    if profile.get("english_proficiency", 0) > 7:
        strengths.append("Strong English proficiency")
    
    return strengths


def _identify_improvement_areas(profile: Dict[str, Any], pathway: str) -> List[str]:
    """Identify areas for improvement in user profile."""
    improvements = []
    
    if profile.get("english_proficiency", 0) < 6:
        improvements.append("English language proficiency")
    
    if not profile.get("work_experience"):
        improvements.append("Relevant work experience documentation")
    
    return improvements


def _generate_comprehensive_recommendations(
    profile: Dict[str, Any], 
    pathway: str, 
    predictions: Dict[str, Any]
) -> List[Dict[str, Any]]:
    """Generate comprehensive recommendations based on analysis."""
    recommendations = []
    
    # Success probability recommendations
    success_prob = predictions.get("success", {}).get("prediction", {}).get("success_probability", 0)
    if success_prob < 70:
        recommendations.append({
            "category": "success_improvement",
            "priority": "high",
            "recommendation": "Consider strengthening application with additional qualifications",
            "impact": "Increase success probability by 10-15%",
        })
    
    # Timeline recommendations
    timeline = predictions.get("timeline", {}).get("timeline_estimates", {})
    if timeline.get("most_likely_timeline", 0) > 365:
        recommendations.append({
            "category": "timeline_optimization",
            "priority": "medium",
            "recommendation": "Consider premium processing if available",
            "impact": "Reduce processing time significantly",
        })
    
    return recommendations


def _assess_policy_impact_on_case(case: Dict[str, Any], changes: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Assess impact of policy changes on specific case."""
    impact_levels = []
    affected_areas = []
    
    for change in changes:
        impact_level = change.get("impact_level", "low")
        impact_levels.append(impact_level)
        
        if "fee" in change.get("change_description", "").lower():
            affected_areas.append("costs")
        if "timeline" in change.get("change_description", "").lower():
            affected_areas.append("processing_time")
        if "requirement" in change.get("change_description", "").lower():
            affected_areas.append("eligibility")
    
    overall_impact = "high" if "high" in impact_levels else "medium" if "medium" in impact_levels else "low"
    
    return {
        "overall_impact": overall_impact,
        "affected_areas": list(set(affected_areas)),
        "change_count": len(changes),
        "requires_action": overall_impact in ["high", "medium"],
    }


def _generate_policy_change_notifications(
    changes: List[Dict[str, Any]], 
    impact_assessment: Dict[str, Any], 
    preferences: Dict[str, Any]
) -> List[Dict[str, Any]]:
    """Generate notifications for policy changes."""
    notifications = []
    
    for change in changes:
        if change.get("impact_level") in preferences.get("notification_levels", ["high", "medium"]):
            notifications.append({
                "type": "policy_change",
                "urgency": change.get("impact_level", "medium"),
                "title": f"Policy Change: {change.get('title', 'Immigration Update')}",
                "message": change.get("summary", "Important immigration policy change detected"),
                "action_required": change.get("impact_level") == "high",
                "created_at": datetime.now().isoformat(),
            })
    
    return notifications


def _generate_roadmap_phases(
    profile: Dict[str, Any], 
    pathway: str, 
    timeline_result: Dict[str, Any], 
    cost_result: Dict[str, Any],
    preferences: Optional[Dict[str, Any]]
) -> List[Dict[str, Any]]:
    """Generate detailed roadmap phases."""
    return [
        {
            "phase": "Preparation",
            "duration_days": 60,
            "description": "Document gathering and preparation",
            "tasks": [
                "Gather required documents",
                "Get credential evaluations",
                "Prepare translations",
                "Medical examinations",
            ],
            "estimated_cost": 1500,
        },
        {
            "phase": "Application",
            "duration_days": 30,
            "description": "Application submission and initial processing",
            "tasks": [
                "Complete application forms",
                "Submit application package",
                "Pay government fees",
                "Biometrics appointment",
            ],
            "estimated_cost": 1000,
        },
        {
            "phase": "Processing",
            "duration_days": timeline_result.get("timeline_estimates", {}).get("most_likely_timeline", 180),
            "description": "Government processing and review",
            "tasks": [
                "Wait for initial review",
                "Respond to any RFEs",
                "Interview if required",
                "Final decision",
            ],
            "estimated_cost": 500,
        },
    ]


def _create_milestone_tracking(phases: List[Dict[str, Any]], timeline_result: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Create milestone tracking system."""
    milestones = []
    cumulative_days = 0
    
    for phase in phases:
        cumulative_days += phase["duration_days"]
        milestones.append({
            "milestone": f"{phase['phase']} Complete",
            "target_date": (datetime.now() + timedelta(days=cumulative_days)).isoformat(),
            "description": phase["description"],
            "status": "pending",
        })
    
    return milestones


def _generate_action_items(
    profile: Dict[str, Any], 
    pathway: str, 
    phases: List[Dict[str, Any]]
) -> List[Dict[str, Any]]:
    """Generate actionable items for the roadmap."""
    action_items = []
    
    for phase in phases:
        for task in phase["tasks"]:
            action_items.append({
                "phase": phase["phase"],
                "task": task,
                "priority": "high" if phase["phase"] == "Preparation" else "medium",
                "estimated_time": "2-5 days",
                "status": "pending",
            })
    
    return action_items


def _create_risk_mitigation_plan(
    profile: Dict[str, Any], 
    pathway: str, 
    success_result: Dict[str, Any]
) -> Dict[str, Any]:
    """Create risk mitigation plan."""
    return {
        "identified_risks": [
            {
                "risk": "Document rejection",
                "probability": "medium",
                "mitigation": "Use certified translation services",
            },
            {
                "risk": "Processing delays",
                "probability": "high",
                "mitigation": "Consider premium processing",
            },
        ],
        "contingency_plans": [
            {
                "scenario": "RFE received",
                "response_plan": "Engage legal counsel immediately",
                "timeline_impact": "30-60 days",
            },
        ],
    }


def _identify_optimization_opportunities(
    timeline_result: Dict[str, Any], 
    cost_result: Dict[str, Any], 
    success_result: Dict[str, Any]
) -> List[Dict[str, Any]]:
    """Identify optimization opportunities."""
    return [
        {
            "opportunity": "Premium Processing",
            "benefit": "Faster processing time",
            "cost": 2500,
            "recommended": True,
        },
        {
            "opportunity": "Legal Consultation",
            "benefit": "Higher success probability",
            "cost": 3000,
            "recommended": success_result.get("prediction", {}).get("success_probability", 0) < 75,
        },
    ]


def _get_required_documents(pathway: str, country: str) -> List[Dict[str, Any]]:
    """Get required documents for pathway."""
    # Placeholder - would get from database
    return [
        {"type": "passport", "required": True, "description": "Valid passport"},
        {"type": "education_credentials", "required": True, "description": "Educational credentials"},
        {"type": "work_authorization", "required": True, "description": "Work authorization documents"},
    ]


def _analyze_document_quality(doc: Dict[str, Any], pathway: str, validation_level: str) -> Dict[str, Any]:
    """Analyze individual document quality."""
    return {
        "document_type": doc.get("type"),
        "quality_score": 85,  # Placeholder
        "issues_found": [],
        "recommendations": ["Ensure document is clearly legible"],
        "compliance_status": "compliant",
    }


def _generate_document_recommendations(
    validation_results: Dict[str, Any], 
    pathway: str, 
    country: str
) -> List[Dict[str, Any]]:
    """Generate document recommendations."""
    recommendations = []
    
    if validation_results["missing_documents"]:
        recommendations.append({
            "category": "missing_documents",
            "priority": "high",
            "recommendation": f"Obtain {len(validation_results['missing_documents'])} missing documents",
        })
    
    if validation_results["quality_score"] < 80:
        recommendations.append({
            "category": "quality_improvement",
            "priority": "medium",
            "recommendation": "Improve document quality and clarity",
        })
    
    return recommendations


def _generate_overall_document_assessment(validation_results: Dict[str, Any]) -> Dict[str, Any]:
    """Generate overall document assessment."""
    completeness = validation_results["completeness_score"]
    quality = validation_results["quality_score"]
    
    overall_score = (completeness + quality) / 2
    
    if overall_score >= 90:
        status = "excellent"
    elif overall_score >= 80:
        status = "good"
    elif overall_score >= 70:
        status = "acceptable"
    else:
        status = "needs_improvement"
    
    return {
        "overall_score": overall_score,
        "status": status,
        "ready_for_submission": overall_score >= 80,
        "estimated_approval_probability": min(95, overall_score + 5),
    }