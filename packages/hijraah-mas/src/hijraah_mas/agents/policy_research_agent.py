"""
Policy Research Agent for Hijraah MAS.

This agent specializes in tracking and analyzing immigration policy changes
and their implications. It monitors official government sources for policy updates
and provides detailed analysis of how changes affect different user profiles.
"""

from typing import Dict, Any, Optional, List
from datetime import datetime, timedelta
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.models.anthropic import Claude
from agno.tools.duckduckgo import DuckDuckGoTools

from ..tools.supabase_tools import SupabaseTools
from ..tools.vector_search_tools import VectorSearchTools
from ..tools.firecrawl_tools import FirecrawlTools
from ..config.settings import settings


class PolicyResearchAgent:
    """
    Policy research specialist agent focused on immigration policy monitoring.
    
    This agent provides comprehensive policy research by:
    - Monitoring official government sources for policy updates
    - Analyzing the impact of policy changes on different user profiles
    - Providing detailed explanations of policy implications
    - Flagging critical changes that require immediate user attention
    - Tracking policy trends and patterns across jurisdictions
    """
    
    def __init__(
        self,
        supabase_url: Optional[str] = None,
        supabase_key: Optional[str] = None,
        model_name: str = "claude-3-5-sonnet-20241022",
        temperature: float = 0.1,
        max_tokens: int = 4000,
    ):
        """
        Initialize the Policy Research Agent.
        
        Args:
            supabase_url: Supabase project URL (defaults to settings)
            supabase_key: Supabase service key (defaults to settings)
            model_name: AI model to use (defaults to Claude Sonnet)
            temperature: Model temperature for response generation
            max_tokens: Maximum tokens for response generation
        """
        self.supabase_url = supabase_url or settings.supabase_url
        self.supabase_key = supabase_key or settings.supabase_key
        self.model_name = model_name
        self.temperature = temperature
        self.max_tokens = max_tokens
        
        # Initialize tools
        self.tools = [
            SupabaseTools(url=self.supabase_url, key=self.supabase_key),
            FirecrawlTools(),
            VectorSearchTools(),
            DuckDuckGoTools(),
        ]
        
        # Initialize the agent
        self.agent = Agent(
            name="Policy Research Specialist",
            role="Research and analyze immigration policy changes and implications",
            model=self._get_model(),
            tools=self.tools,
            instructions=self._get_instructions(),
            markdown=True,
            show_tool_calls=True,
            add_datetime_to_instructions=True,
        )
    
    def _get_model(self):
        """Get the appropriate AI model based on configuration."""
        if self.model_name.startswith("claude"):
            return Claude(
                id=self.model_name,
                temperature=self.temperature,
                max_tokens=self.max_tokens,
            )
        else:
            return OpenAIChat(
                id=self.model_name,
                temperature=self.temperature,
                max_tokens=self.max_tokens,
            )
    
    def _get_instructions(self) -> List[str]:
        """Get detailed instructions for the policy research agent."""
        return [
            "You are a specialized immigration policy research analyst with expertise in tracking and analyzing policy changes across multiple jurisdictions.",
            "Your primary focus is monitoring official government sources and providing detailed analysis of policy implications.",
            "",
            "CORE RESPONSIBILITIES:",
            "- Monitor official government websites and publications for policy updates",
            "- Analyze the impact of policy changes on different applicant categories",
            "- Track policy trends and patterns across jurisdictions",
            "- Provide detailed explanations of policy implications",
            "- Flag critical changes that require immediate attention",
            "- Compare policy approaches across different countries",
            "",
            "RESEARCH METHODOLOGY:",
            "1. Always prioritize official government sources",
            "2. Cross-reference information across multiple sources",
            "3. Verify publication dates and effective dates",
            "4. Identify the scope and applicability of changes",
            "5. Assess the impact on different user categories",
            "6. Track implementation timelines and deadlines",
            "",
            "ANALYSIS FRAMEWORK:",
            "- Policy Change Type: (New, Amendment, Clarification, Temporary, Permanent)",
            "- Effective Date: When the change takes effect",
            "- Affected Categories: Who is impacted by the change",
            "- Impact Level: (Critical, Major, Minor, Informational)",
            "- Geographic Scope: Which jurisdictions are affected",
            "- Implementation Details: How the change will be implemented",
            "",
            "REPORTING STANDARDS:",
            "- Provide clear, factual summaries of policy changes",
            "- Include direct quotes from official sources when relevant",
            "- Explain technical legal language in accessible terms",
            "- Highlight practical implications for applicants",
            "- Include relevant deadlines and transition periods",
            "- Provide links to official sources and documents",
            "",
            "CRITICAL CHANGE INDICATORS:",
            "- Changes to eligibility requirements",
            "- New application procedures or forms",
            "- Fee changes or new fees",
            "- Processing time modifications",
            "- Quota or cap adjustments",
            "- Document requirement changes",
            "- Deadline modifications",
        ]
    
    async def monitor_policy_changes(
        self,
        countries: List[str],
        policy_areas: Optional[List[str]] = None,
        date_from: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Monitor policy changes across specified countries and policy areas.
        
        Args:
            countries: List of countries to monitor
            policy_areas: Specific policy areas to focus on (optional)
            date_from: Date from which to check changes (optional)
            
        Returns:
            Comprehensive policy change report
        """
        if not date_from:
            # Default to last 30 days
            date_from = (datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d")
        
        prompt_parts = [
            f"Please monitor and analyze immigration policy changes for the following countries: {', '.join(countries)}",
            f"Time period: Changes since {date_from}",
        ]
        
        if policy_areas:
            prompt_parts.append(f"Focus areas: {', '.join(policy_areas)}")
        
        prompt_parts.extend([
            "",
            "For each significant change found, provide:",
            "1. Country and jurisdiction",
            "2. Policy area affected",
            "3. Type of change (New, Amendment, Clarification, etc.)",
            "4. Effective date and implementation timeline",
            "5. Affected applicant categories",
            "6. Impact level (Critical, Major, Minor, Informational)",
            "7. Summary of the change",
            "8. Practical implications for applicants",
            "9. Official source and reference links",
            "10. Recommended actions for affected users",
            "",
            "Prioritize changes by impact level and urgency.",
        ])
        
        full_prompt = "\n".join(prompt_parts)
        
        response = await self.agent.arun(full_prompt)
        
        return {
            "report": response.content,
            "countries_monitored": countries,
            "policy_areas": policy_areas,
            "monitoring_period": date_from,
            "generated_at": datetime.now().isoformat(),
            "agent_used": "Policy Research Specialist",
        }
    
    async def analyze_policy_impact(
        self,
        policy_change: Dict[str, Any],
        user_profiles: List[Dict[str, Any]],
    ) -> Dict[str, Any]:
        """
        Analyze the impact of a specific policy change on different user profiles.
        
        Args:
            policy_change: Details of the policy change
            user_profiles: List of user profiles to analyze impact for
            
        Returns:
            Detailed impact analysis for each user profile
        """
        prompt = f"""
        Policy Change Details: {policy_change}
        
        User Profiles to Analyze: {user_profiles}
        
        Please provide a detailed impact analysis of this policy change on each user profile:
        
        For each user profile, analyze:
        1. Direct Impact: How does this change directly affect their case?
        2. Eligibility Changes: Does this affect their eligibility status?
        3. Process Changes: Are there new steps or requirements?
        4. Timeline Impact: How does this affect their application timeline?
        5. Cost Impact: Are there new fees or cost implications?
        6. Risk Assessment: What are the potential risks or challenges?
        7. Opportunities: Are there any new opportunities created?
        8. Recommended Actions: What should they do in response?
        9. Urgency Level: How quickly do they need to act?
        10. Alternative Options: Are there alternative pathways to consider?
        
        Provide a summary table showing impact levels for each profile.
        """
        
        response = await self.agent.arun(prompt)
        
        return {
            "impact_analysis": response.content,
            "policy_change": policy_change,
            "profiles_analyzed": len(user_profiles),
            "analysis_date": datetime.now().isoformat(),
            "agent_used": "Policy Research Specialist",
        }
    
    async def track_policy_trends(
        self,
        countries: List[str],
        time_period: str = "12 months",
        focus_areas: Optional[List[str]] = None,
    ) -> Dict[str, Any]:
        """
        Track and analyze policy trends across countries and time periods.
        
        Args:
            countries: List of countries to analyze
            time_period: Time period for trend analysis
            focus_areas: Specific policy areas to focus on
            
        Returns:
            Comprehensive policy trend analysis
        """
        prompt_parts = [
            f"Please analyze immigration policy trends across {', '.join(countries)} over the past {time_period}.",
        ]
        
        if focus_areas:
            prompt_parts.append(f"Focus on these policy areas: {', '.join(focus_areas)}")
        
        prompt_parts.extend([
            "",
            "Provide analysis on:",
            "1. Major Policy Themes: What are the common themes in policy changes?",
            "2. Directional Trends: Are policies becoming more restrictive or liberal?",
            "3. Cross-Country Patterns: Are there similar changes across countries?",
            "4. Emerging Issues: What new policy areas are gaining attention?",
            "5. Seasonal Patterns: Are there timing patterns in policy announcements?",
            "6. Impact on Different Categories: How are different applicant types affected?",
            "7. Future Predictions: What trends might continue or emerge?",
            "8. Strategic Implications: What should applicants consider for planning?",
            "",
            "Include specific examples and data points to support your analysis.",
        ])
        
        full_prompt = "\n".join(prompt_parts)
        
        response = await self.agent.arun(full_prompt)
        
        return {
            "trend_analysis": response.content,
            "countries_analyzed": countries,
            "time_period": time_period,
            "focus_areas": focus_areas,
            "analysis_date": datetime.now().isoformat(),
            "agent_used": "Policy Research Specialist",
        }
    
    async def compare_policy_approaches(
        self,
        countries: List[str],
        policy_topic: str,
    ) -> Dict[str, Any]:
        """
        Compare policy approaches across different countries for a specific topic.
        
        Args:
            countries: List of countries to compare
            policy_topic: Specific policy topic to compare
            
        Returns:
            Comparative policy analysis
        """
        prompt = f"""
        Please provide a comprehensive comparison of {policy_topic} policies across these countries: {', '.join(countries)}
        
        For each country, analyze:
        1. Current Policy Framework: What is the current approach?
        2. Key Requirements: What are the main requirements or criteria?
        3. Process and Procedures: How is the policy implemented?
        4. Recent Changes: Have there been recent modifications?
        5. Unique Features: What makes this country's approach distinctive?
        6. Strengths and Weaknesses: What are the pros and cons?
        7. Applicant Experience: How user-friendly is the process?
        8. Success Rates: What are the approval/success rates (if available)?
        
        Provide a comparative summary table and recommendations for:
        - Best practices that could be adopted by other countries
        - Opportunities for policy harmonization
        - Implications for applicants choosing between countries
        """
        
        response = await self.agent.arun(prompt)
        
        return {
            "comparative_analysis": response.content,
            "countries_compared": countries,
            "policy_topic": policy_topic,
            "comparison_date": datetime.now().isoformat(),
            "agent_used": "Policy Research Specialist",
        }
    
    async def flag_critical_changes(
        self,
        policy_changes: List[Dict[str, Any]],
        user_categories: List[str],
    ) -> Dict[str, Any]:
        """
        Flag critical policy changes that require immediate attention.
        
        Args:
            policy_changes: List of policy changes to evaluate
            user_categories: User categories to consider for impact assessment
            
        Returns:
            Flagged critical changes with urgency levels
        """
        prompt = f"""
        Policy Changes to Evaluate: {policy_changes}
        User Categories: {', '.join(user_categories)}
        
        Please evaluate these policy changes and flag any that are critical or require immediate attention.
        
        For each change, assess:
        1. Urgency Level: (Critical, High, Medium, Low)
        2. Affected User Categories: Which user types are impacted?
        3. Time Sensitivity: Are there deadlines or time-limited opportunities?
        4. Impact Severity: How significantly will this affect users?
        5. Action Required: What immediate actions are needed?
        6. Communication Priority: Should this be communicated immediately?
        
        Provide a prioritized list of critical changes with:
        - Clear urgency indicators
        - Specific affected user groups
        - Recommended immediate actions
        - Communication templates for user notifications
        """
        
        response = await self.agent.arun(prompt)
        
        return {
            "critical_flags": response.content,
            "changes_evaluated": len(policy_changes),
            "user_categories": user_categories,
            "evaluation_date": datetime.now().isoformat(),
            "agent_used": "Policy Research Specialist",
        }
    
    def get_agent_info(self) -> Dict[str, Any]:
        """
        Get information about this agent.
        
        Returns:
            Agent information and capabilities
        """
        return {
            "name": "Policy Research Specialist",
            "role": "Research and analyze immigration policy changes and implications",
            "capabilities": [
                "Policy change monitoring",
                "Impact analysis",
                "Trend tracking",
                "Cross-country comparisons",
                "Critical change flagging",
                "Official source verification",
            ],
            "tools": [tool.__class__.__name__ for tool in self.tools],
            "model": self.model_name,
            "specializations": [
                "Government policy monitoring",
                "Regulatory change analysis",
                "Multi-jurisdictional research",
                "Policy trend analysis",
                "Impact assessment",
                "Critical alert systems",
            ],
        }