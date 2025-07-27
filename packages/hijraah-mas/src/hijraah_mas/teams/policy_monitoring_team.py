"""
Policy Monitoring Team for Hijraah MAS.

This module implements a specialized team focused on real-time immigration
policy monitoring and change detection. The team coordinates multiple agents
to provide comprehensive policy analysis and impact assessment.
"""

from typing import Dict, Any, Optional, List
from datetime import datetime
import agentops
from agno.team.team import Team
from agno.models.openai import OpenAIChat
from agno.models.anthropic import Claude
from agno.tools.reasoning import ReasoningTools
from agno.tools.duckduckgo import DuckDuckGoTools

from ..agents.policy_research_agent import PolicyResearchAgent
from ..agents.prediction_agent import PredictionAgent
from ..agents.community_validation_agent import CommunityValidationAgent
from ..config.settings import settings


class PolicyMonitoringTeam:
    """
    Specialized team for immigration policy monitoring and change detection.
    
    This team orchestrates agents to provide:
    - Real-time policy change detection and analysis
    - Impact assessment on different user categories
    - Trend analysis and prediction
    - Community validation of policy interpretations
    - Automated alerts and notifications
    """
    
    def __init__(
        self,
        supabase_url: Optional[str] = None,
        supabase_key: Optional[str] = None,
        team_model: str = "claude-3-5-sonnet-20241022",
        enable_agentops: bool = True,
    ):
        """
        Initialize the Policy Monitoring Team.
        
        Args:
            supabase_url: Supabase project URL (defaults to settings)
            supabase_key: Supabase service key (defaults to settings)
            team_model: AI model for team coordination
            enable_agentops: Whether to enable AgentOps monitoring
        """
        self.supabase_url = supabase_url or settings.supabase_url
        self.supabase_key = supabase_key or settings.supabase_key
        self.team_model = team_model
        
        # Initialize AgentOps monitoring if enabled
        if enable_agentops:
            agentops.init()
        
        # Initialize specialized agents for policy monitoring
        self.policy_researcher = PolicyResearchAgent(
            supabase_url=self.supabase_url,
            supabase_key=self.supabase_key,
        ).agent
        
        self.prediction_agent = PredictionAgent(
            supabase_url=self.supabase_url,
            supabase_key=self.supabase_key,
        ).agent
        
        self.community_validator = CommunityValidationAgent(
            supabase_url=self.supabase_url,
            supabase_key=self.supabase_key,
        ).agent
        
        # Create the specialized policy monitoring team
        self.team = Team(
            name="Policy Monitoring Team",
            mode="coordinate",
            model=self._get_team_model(),
            members=[
                self.policy_researcher,
                self.prediction_agent,
                self.community_validator,
            ],
            tools=[
                ReasoningTools(add_instructions=True),
                DuckDuckGoTools(),
            ],
            instructions=self._get_team_instructions(),
            success_criteria=self._get_success_criteria(),
            markdown=True,
            show_members_responses=True,
            enable_agentic_context=True,
            add_datetime_to_instructions=True,
        )
    
    def _get_team_model(self):
        """Get the appropriate AI model for team coordination."""
        if self.team_model.startswith("claude"):
            return Claude(id=self.team_model)
        else:
            return OpenAIChat(id=self.team_model)
    
    def _get_team_instructions(self) -> List[str]:
        """Get comprehensive instructions for policy monitoring team coordination."""
        return [
            "You are the coordinator of a specialized policy monitoring team consisting of:",
            "- Policy Research Specialist: Monitors official sources for policy changes",
            "- Prediction Specialist: Analyzes impact and predicts trends",
            "- Community Validation Specialist: Validates policy interpretations with community data",
            "",
            "TEAM MISSION:",
            "Provide real-time, comprehensive monitoring of immigration policy changes",
            "and their implications for different user categories and immigration pathways.",
            "",
            "COORDINATION PRINCIPLES:",
            "1. Prioritize official government sources and authoritative information",
            "2. Provide rapid detection and analysis of policy changes",
            "3. Assess impact on different user profiles and immigration categories",
            "4. Validate policy interpretations against community experiences",
            "5. Generate actionable insights and recommendations",
            "6. Maintain high accuracy and reliability standards",
            "",
            "WORKFLOW ORCHESTRATION:",
            "1. Policy Research Specialist monitors sources and detects changes",
            "2. Prediction Specialist analyzes impact and generates forecasts",
            "3. Community Validation Specialist validates interpretations",
            "4. Synthesize findings into comprehensive policy analysis",
            "5. Generate alerts and recommendations for affected users",
            "",
            "ANALYSIS FRAMEWORK:",
            "- Change Detection: Identify and categorize policy changes",
            "- Impact Assessment: Analyze effects on different user groups",
            "- Trend Analysis: Identify patterns and predict future changes",
            "- Risk Evaluation: Assess risks and opportunities",
            "- Recommendation Generation: Provide actionable guidance",
            "",
            "QUALITY STANDARDS:",
            "- Verify all information through multiple authoritative sources",
            "- Provide confidence levels for all assessments",
            "- Include clear timelines and effective dates",
            "- Distinguish between confirmed changes and proposed changes",
            "- Maintain objectivity and avoid speculation",
            "",
            "RESPONSE PRIORITIES:",
            "1. Critical changes requiring immediate user action",
            "2. Major changes affecting large user populations",
            "3. Moderate changes with specific category impacts",
            "4. Minor changes and clarifications",
            "5. Trend analysis and future predictions",
        ]
    
    def _get_success_criteria(self) -> str:
        """Define success criteria for policy monitoring operations."""
        return (
            "The team has successfully detected, analyzed, and assessed the impact "
            "of immigration policy changes, providing accurate, timely, and actionable "
            "information with appropriate confidence levels and recommendations."
        )
    
    async def monitor_policy_changes(
        self,
        countries: List[str],
        monitoring_period: str = "24 hours",
        priority_areas: Optional[List[str]] = None,
    ) -> Dict[str, Any]:
        """
        Monitor immigration policy changes across specified countries.
        
        Args:
            countries: List of countries to monitor
            monitoring_period: Time period for monitoring (e.g., "24 hours", "1 week")
            priority_areas: Specific policy areas to prioritize
            
        Returns:
            Comprehensive policy monitoring report
        """
        prompt_parts = [
            "POLICY MONITORING REQUEST",
            "=" * 30,
            f"Countries to Monitor: {', '.join(countries)}",
            f"Monitoring Period: {monitoring_period}",
        ]
        
        if priority_areas:
            prompt_parts.append(f"Priority Areas: {', '.join(priority_areas)}")
        
        prompt_parts.extend([
            "",
            "Please conduct comprehensive policy monitoring including:",
            "",
            "1. CHANGE DETECTION:",
            "   - Scan official government sources for policy updates",
            "   - Identify new policies, amendments, and clarifications",
            "   - Categorize changes by type and significance",
            "   - Verify information through multiple sources",
            "",
            "2. IMPACT ANALYSIS:",
            "   - Assess impact on different immigration categories",
            "   - Analyze effects on processing times and requirements",
            "   - Evaluate implications for pending applications",
            "   - Predict effects on success rates and outcomes",
            "",
            "3. TREND IDENTIFICATION:",
            "   - Identify patterns in policy changes",
            "   - Analyze directional trends (restrictive vs. liberal)",
            "   - Compare changes across different countries",
            "   - Predict future policy directions",
            "",
            "4. COMMUNITY VALIDATION:",
            "   - Cross-reference with community experiences",
            "   - Validate policy interpretations",
            "   - Identify discrepancies between policy and practice",
            "   - Assess community sentiment and reactions",
            "",
            "5. ALERT GENERATION:",
            "   - Prioritize changes by urgency and impact",
            "   - Generate alerts for critical changes",
            "   - Provide recommendations for affected users",
            "   - Include timelines for required actions",
            "",
            "Coordinate all team members to provide comprehensive analysis.",
        ])
        
        full_prompt = "\n".join(prompt_parts)
        
        response = await self.team.arun(full_prompt)
        
        return {
            "monitoring_report": response.content,
            "countries_monitored": countries,
            "monitoring_period": monitoring_period,
            "priority_areas": priority_areas,
            "report_date": datetime.now().isoformat(),
            "team_coordinator": "Policy Monitoring Team",
        }
    
    async def analyze_policy_impact(
        self,
        policy_change: Dict[str, Any],
        affected_populations: List[Dict[str, Any]],
        analysis_depth: str = "comprehensive",
    ) -> Dict[str, Any]:
        """
        Analyze the impact of a specific policy change on affected populations.
        
        Args:
            policy_change: Details of the policy change
            affected_populations: User groups potentially affected
            analysis_depth: Level of analysis (quick, standard, comprehensive)
            
        Returns:
            Detailed policy impact analysis
        """
        prompt = f"""
        POLICY IMPACT ANALYSIS REQUEST
        ==============================
        
        Policy Change: {policy_change}
        Affected Populations: {affected_populations}
        Analysis Depth: {analysis_depth}
        
        Please provide comprehensive impact analysis including:
        
        1. DIRECT IMPACT ASSESSMENT:
           - Immediate effects on affected populations
           - Changes to eligibility requirements
           - New process requirements or procedures
           - Timeline and cost implications
        
        2. PREDICTIVE IMPACT MODELING:
           - Expected changes in success rates
           - Processing time predictions
           - Cost impact projections
           - Long-term trend implications
        
        3. COMMUNITY VALIDATION:
           - Validation against historical community experiences
           - Assessment of policy interpretation accuracy
           - Identification of potential implementation variations
           - Community sentiment and reaction analysis
        
        4. RISK AND OPPORTUNITY ANALYSIS:
           - Risks introduced by the policy change
           - New opportunities created
           - Mitigation strategies for negative impacts
           - Optimization strategies for positive impacts
        
        5. ACTIONABLE RECOMMENDATIONS:
           - Immediate actions for affected users
           - Strategic adjustments for different populations
           - Timeline for implementing recommendations
           - Monitoring and follow-up requirements
        
        Ensure all team members contribute their specialized expertise.
        """
        
        response = await self.team.arun(prompt)
        
        return {
            "impact_analysis": response.content,
            "policy_change": policy_change,
            "affected_populations": affected_populations,
            "analysis_depth": analysis_depth,
            "analysis_date": datetime.now().isoformat(),
            "team_coordinator": "Policy Monitoring Team",
        }
    
    async def generate_policy_alerts(
        self,
        detected_changes: List[Dict[str, Any]],
        user_segments: List[Dict[str, Any]],
        alert_criteria: Dict[str, Any],
    ) -> Dict[str, Any]:
        """
        Generate targeted policy alerts for different user segments.
        
        Args:
            detected_changes: List of detected policy changes
            user_segments: Different user segments to consider
            alert_criteria: Criteria for generating alerts
            
        Returns:
            Targeted policy alerts and notifications
        """
        prompt = f"""
        POLICY ALERT GENERATION REQUEST
        ===============================
        
        Detected Changes: {detected_changes}
        User Segments: {user_segments}
        Alert Criteria: {alert_criteria}
        
        Please generate targeted policy alerts including:
        
        1. ALERT PRIORITIZATION:
           - Critical alerts requiring immediate action
           - Important alerts for planning and preparation
           - Informational alerts for awareness
           - Future alerts for upcoming changes
        
        2. SEGMENT-SPECIFIC ALERTS:
           - Customized alerts for each user segment
           - Relevance assessment for each segment
           - Impact severity for each group
           - Specific actions required by segment
        
        3. ALERT CONTENT:
           - Clear, concise change descriptions
           - Impact assessment and implications
           - Required actions and timelines
           - Resources and support information
        
        4. VALIDATION AND VERIFICATION:
           - Confidence levels for each alert
           - Source verification and reliability
           - Community validation of interpretations
           - Expert review recommendations
        
        5. DELIVERY RECOMMENDATIONS:
           - Optimal timing for alert delivery
           - Appropriate communication channels
           - Follow-up and monitoring requirements
           - Feedback collection mechanisms
        
        Coordinate team expertise to ensure alert accuracy and relevance.
        """
        
        response = await self.team.arun(prompt)
        
        return {
            "policy_alerts": response.content,
            "detected_changes": detected_changes,
            "user_segments": user_segments,
            "alert_criteria": alert_criteria,
            "generation_date": datetime.now().isoformat(),
            "team_coordinator": "Policy Monitoring Team",
        }
    
    async def track_policy_trends(
        self,
        countries: List[str],
        time_horizon: str = "6 months",
        trend_categories: Optional[List[str]] = None,
    ) -> Dict[str, Any]:
        """
        Track and analyze immigration policy trends across countries.
        
        Args:
            countries: Countries to analyze for trends
            time_horizon: Time period for trend analysis
            trend_categories: Specific trend categories to focus on
            
        Returns:
            Comprehensive policy trend analysis
        """
        prompt = f"""
        POLICY TREND ANALYSIS REQUEST
        =============================
        
        Countries: {', '.join(countries)}
        Time Horizon: {time_horizon}
        Trend Categories: {trend_categories or "All major categories"}
        
        Please provide comprehensive trend analysis including:
        
        1. TREND IDENTIFICATION:
           - Major policy trends across countries
           - Directional changes (restrictive vs. liberal)
           - Emerging policy themes and patterns
           - Cross-country policy convergence or divergence
        
        2. PREDICTIVE TREND MODELING:
           - Future trend predictions based on current patterns
           - Probability assessments for different scenarios
           - Timeline predictions for anticipated changes
           - Confidence intervals for trend projections
        
        3. COMMUNITY TREND VALIDATION:
           - Validation of trends against community experiences
           - Assessment of trend impact on user outcomes
           - Identification of trend-related opportunities
           - Community sentiment regarding trend directions
        
        4. STRATEGIC IMPLICATIONS:
           - Strategic recommendations for different user segments
           - Optimal timing for applications based on trends
           - Risk mitigation strategies for negative trends
           - Opportunity maximization for positive trends
        
        5. MONITORING RECOMMENDATIONS:
           - Key indicators to monitor for trend continuation
           - Early warning signals for trend reversals
           - Monitoring frequency and methodology
           - Adaptation strategies for trend changes
        
        Leverage all team expertise for comprehensive trend analysis.
        """
        
        response = await self.team.arun(prompt)
        
        return {
            "trend_analysis": response.content,
            "countries": countries,
            "time_horizon": time_horizon,
            "trend_categories": trend_categories,
            "analysis_date": datetime.now().isoformat(),
            "team_coordinator": "Policy Monitoring Team",
        }
    
    def get_team_info(self) -> Dict[str, Any]:
        """
        Get information about the policy monitoring team.
        
        Returns:
            Team information and capabilities
        """
        return {
            "name": "Policy Monitoring Team",
            "description": "Specialized team for immigration policy monitoring and change detection",
            "team_model": self.team_model,
            "coordination_mode": "coordinate",
            "members": [
                {
                    "name": member.name,
                    "role": member.role,
                    "model": member.model.id if hasattr(member.model, 'id') else str(member.model),
                }
                for member in self.team.members
            ],
            "capabilities": [
                "Real-time policy change detection",
                "Impact analysis and assessment",
                "Policy trend identification and prediction",
                "Community validation of policy interpretations",
                "Alert generation and prioritization",
                "Cross-country policy comparison",
                "Strategic recommendation generation",
            ],
            "tools": [
                "Reasoning Tools",
                "Web Research and Monitoring",
                "Supabase Integration",
                "Vector Search",
                "Community Data Validation",
            ],
            "success_criteria": self._get_success_criteria(),
        }
    
    async def health_check(self) -> Dict[str, Any]:
        """
        Perform a health check on the policy monitoring team.
        
        Returns:
            Health status of the team
        """
        try:
            # Test basic team functionality
            test_response = await self.team.arun("Perform a quick policy monitoring system check and confirm all agents are operational.")
            
            return {
                "status": "healthy",
                "team_operational": True,
                "members_count": len(self.team.members),
                "test_response_length": len(test_response.content) if test_response.content else 0,
                "last_check": datetime.now().isoformat(),
            }
        except Exception as e:
            return {
                "status": "unhealthy",
                "team_operational": False,
                "error": str(e),
                "last_check": datetime.now().isoformat(),
            }