"""
Immigration Team for Hijraah MAS.

This module implements a coordinated team of specialized immigration agents
using the latest Agno framework patterns. The team provides comprehensive
immigration analysis through collaborative agent workflows.
"""

from typing import Dict, Any, Optional, List
from datetime import datetime
import agentops
from agno.team.team import Team
from agno.models.openai import OpenAIChat
from agno.models.anthropic import Claude
from agno.tools.reasoning import ReasoningTools

from ..agents.immigration_agent import ImmigrationAgent
from ..agents.policy_research_agent import PolicyResearchAgent
from ..agents.document_analysis_agent import DocumentAnalysisAgent
from ..agents.prediction_agent import PredictionAgent
from ..agents.community_validation_agent import CommunityValidationAgent
from ..config.settings import settings


class ImmigrationTeam:
    """
    Coordinated team of immigration specialists using Agno framework.
    
    This team orchestrates multiple specialized agents to provide comprehensive
    immigration analysis and advice. The team uses the latest Agno patterns
    including shared context, reasoning tools, and coordinated workflows.
    """
    
    def __init__(
        self,
        supabase_url: Optional[str] = None,
        supabase_key: Optional[str] = None,
        team_model: str = "claude-3-5-sonnet-20241022",
        enable_agentops: bool = True,
    ):
        """
        Initialize the Immigration Team.
        
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
        
        # Initialize individual agents with latest Agno patterns
        self.immigration_agent = ImmigrationAgent(
            supabase_url=self.supabase_url,
            supabase_key=self.supabase_key,
        ).agent
        
        self.policy_agent = PolicyResearchAgent(
            supabase_url=self.supabase_url,
            supabase_key=self.supabase_key,
        ).agent
        
        self.document_agent = DocumentAnalysisAgent(
            supabase_url=self.supabase_url,
            supabase_key=self.supabase_key,
        ).agent
        
        self.prediction_agent = PredictionAgent(
            supabase_url=self.supabase_url,
            supabase_key=self.supabase_key,
        ).agent
        
        self.community_agent = CommunityValidationAgent(
            supabase_url=self.supabase_url,
            supabase_key=self.supabase_key,
        ).agent
        
        # Create the coordinated team using latest Agno patterns
        self.team = Team(
            name="Immigration Advisory Team",
            mode="coordinate",
            model=self._get_team_model(),
            members=[
                self.immigration_agent,
                self.policy_agent,
                self.document_agent,
                self.prediction_agent,
                self.community_agent,
            ],
            tools=[
                ReasoningTools(add_instructions=True),
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
        """Get comprehensive instructions for team coordination."""
        return [
            "You are the coordinator of an expert immigration advisory team consisting of:",
            "- Immigration Specialist: Expert in immigration policies and procedures",
            "- Policy Research Specialist: Tracks policy changes and analyzes implications", 
            "- Document Analysis Specialist: Processes and analyzes immigration documents",
            "- Prediction Specialist: Generates success probability and timeline predictions",
            "- Community Validation Specialist: Verifies user experiences and manages data quality",
            "",
            "TEAM COORDINATION PRINCIPLES:",
            "1. Collaborate to provide comprehensive immigration analysis",
            "2. Each agent should contribute their specialized expertise",
            "3. Ensure all advice is current, accurate, and legally sound",
            "4. Provide actionable recommendations with clear timelines",
            "5. Include risk assessments and success probabilities",
            "6. Maintain consistency across all agent responses",
            "",
            "WORKFLOW ORCHESTRATION:",
            "1. Start with the Immigration Specialist for general assessment",
            "2. Engage Policy Research Specialist for current policy context",
            "3. Use Document Analysis Specialist for document-related queries",
            "4. Synthesize all inputs into a comprehensive response",
            "5. Ensure no conflicting advice between agents",
            "",
            "QUALITY STANDARDS:",
            "- All advice must be based on current, official sources",
            "- Include confidence levels for uncertain information",
            "- Provide clear disclaimers for complex legal matters",
            "- Encourage verification with official sources",
            "- Structure responses for maximum clarity and actionability",
            "",
            "RESPONSE FORMAT:",
            "1. Executive Summary (key findings and recommendations)",
            "2. Detailed Analysis (from each relevant specialist)",
            "3. Action Plan (step-by-step recommendations)",
            "4. Risk Assessment (potential challenges and mitigation)",
            "5. Timeline and Costs (realistic estimates)",
            "6. Next Steps (immediate actions required)",
        ]
    
    def _get_success_criteria(self) -> str:
        """Define success criteria for team operations."""
        return (
            "The team has successfully provided comprehensive immigration analysis "
            "including policy research, document review, eligibility assessment, "
            "actionable recommendations, risk analysis, and clear next steps. "
            "All advice is current, accurate, and properly sourced."
        )
    
    async def process_immigration_query(
        self,
        user_data: Dict[str, Any],
        query: str,
        context: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """
        Process a comprehensive immigration query using the full team.
        
        Args:
            user_data: User profile and background information
            query: Immigration question or scenario
            context: Additional context for the analysis
            
        Returns:
            Comprehensive immigration analysis from the team
        """
        # Prepare the comprehensive prompt
        prompt_parts = [
            "IMMIGRATION ADVISORY REQUEST",
            "=" * 50,
            f"User Information: {user_data}",
            f"Immigration Query: {query}",
        ]
        
        if context:
            prompt_parts.append(f"Additional Context: {context}")
        
        prompt_parts.extend([
            "",
            "Please provide a comprehensive immigration analysis including:",
            "",
            "1. ELIGIBILITY ASSESSMENT:",
            "   - Current eligibility status for relevant programs",
            "   - Missing requirements and how to fulfill them",
            "   - Alternative pathways if primary option is not viable",
            "",
            "2. POLICY ANALYSIS:",
            "   - Current policy status and recent changes",
            "   - Impact of policy changes on this specific case",
            "   - Upcoming policy changes that may affect the timeline",
            "",
            "3. DOCUMENT REQUIREMENTS:",
            "   - Complete list of required documents",
            "   - Document preparation guidelines",
            "   - Common issues and how to avoid them",
            "",
            "4. PROCESS GUIDANCE:",
            "   - Step-by-step application process",
            "   - Realistic timeline estimates",
            "   - Cost breakdown and fee schedule",
            "",
            "5. RISK ASSESSMENT:",
            "   - Potential challenges and obstacles",
            "   - Success probability assessment",
            "   - Risk mitigation strategies",
            "",
            "6. ACTION PLAN:",
            "   - Immediate next steps (next 30 days)",
            "   - Medium-term actions (3-6 months)",
            "   - Long-term strategy (6+ months)",
            "",
            "Ensure all team members contribute their expertise and provide a unified, comprehensive response.",
        ])
        
        full_prompt = "\n".join(prompt_parts)
        
        # Execute the team analysis
        response = await self.team.arun(full_prompt)
        
        # Calculate confidence score based on response quality
        confidence_score = self._calculate_confidence(response)
        
        return {
            "analysis": response.content,
            "team_members_used": [member.name for member in self.team.members],
            "confidence_score": confidence_score,
            "generated_at": datetime.now().isoformat(),
            "query_processed": query,
            "user_profile": user_data,
            "team_coordinator": "Immigration Advisory Team",
        }
    
    async def analyze_policy_impact(
        self,
        policy_change: Dict[str, Any],
        affected_users: List[Dict[str, Any]],
    ) -> Dict[str, Any]:
        """
        Analyze the impact of policy changes on specific user profiles.
        
        Args:
            policy_change: Details of the policy change
            affected_users: List of user profiles to analyze
            
        Returns:
            Comprehensive policy impact analysis
        """
        prompt = f"""
        POLICY IMPACT ANALYSIS REQUEST
        ================================
        
        Policy Change: {policy_change}
        Affected User Profiles: {affected_users}
        
        Please provide a comprehensive analysis of how this policy change affects each user profile:
        
        For each user profile, analyze:
        1. Direct impact on their current application status
        2. Changes to eligibility requirements
        3. New documentation or process requirements
        4. Timeline implications (delays, expedited processing, etc.)
        5. Cost implications (new fees, changed fees)
        6. Risk assessment (increased/decreased approval chances)
        7. Alternative options if negatively affected
        8. Immediate actions required
        9. Long-term strategic implications
        
        Provide a summary matrix showing impact levels and recommended actions for each profile.
        """
        
        response = await self.team.arun(prompt)
        
        return {
            "impact_analysis": response.content,
            "policy_change": policy_change,
            "users_analyzed": len(affected_users),
            "analysis_date": datetime.now().isoformat(),
            "team_coordinator": "Immigration Advisory Team",
        }
    
    async def compare_immigration_pathways(
        self,
        user_profile: Dict[str, Any],
        target_countries: List[str],
        pathway_types: Optional[List[str]] = None,
    ) -> Dict[str, Any]:
        """
        Compare immigration pathways across multiple countries.
        
        Args:
            user_profile: User's background and qualifications
            target_countries: Countries to compare
            pathway_types: Specific pathway types to focus on
            
        Returns:
            Comprehensive pathway comparison analysis
        """
        prompt_parts = [
            "IMMIGRATION PATHWAY COMPARISON REQUEST",
            "=" * 45,
            f"User Profile: {user_profile}",
            f"Target Countries: {', '.join(target_countries)}",
        ]
        
        if pathway_types:
            prompt_parts.append(f"Focus on Pathway Types: {', '.join(pathway_types)}")
        
        prompt_parts.extend([
            "",
            "Please provide a comprehensive comparison of immigration pathways:",
            "",
            "For each country, analyze:",
            "1. Available immigration categories/programs",
            "2. Eligibility requirements and scoring systems",
            "3. Application process and timeline",
            "4. Required documentation",
            "5. Processing fees and costs",
            "6. Success rates and approval statistics",
            "7. Post-approval benefits and restrictions",
            "8. Path to permanent residence and citizenship",
            "9. Current policy trends and stability",
            "",
            "Provide:",
            "- Comparative summary table",
            "- Recommended pathway ranking based on user profile",
            "- Risk-benefit analysis for each option",
            "- Strategic recommendations for application timing",
        ])
        
        full_prompt = "\n".join(prompt_parts)
        
        response = await self.team.arun(full_prompt)
        
        return {
            "pathway_comparison": response.content,
            "user_profile": user_profile,
            "countries_compared": target_countries,
            "pathway_types": pathway_types,
            "comparison_date": datetime.now().isoformat(),
            "team_coordinator": "Immigration Advisory Team",
        }
    
    async def process_document_analysis(
        self,
        documents: List[Dict[str, Any]],
        analysis_type: str = "comprehensive",
    ) -> Dict[str, Any]:
        """
        Process and analyze immigration documents using the team.
        
        Args:
            documents: List of document information and content
            analysis_type: Type of analysis (comprehensive, quick, specific)
            
        Returns:
            Document analysis results
        """
        prompt = f"""
        DOCUMENT ANALYSIS REQUEST
        ========================
        
        Documents to Analyze: {documents}
        Analysis Type: {analysis_type}
        
        Please provide comprehensive document analysis including:
        
        1. Document Classification and Verification
        2. Extracted Information and Data Points
        3. Completeness Assessment
        4. Quality and Authenticity Evaluation
        5. Compliance with Immigration Requirements
        6. Missing Information or Documents
        7. Recommendations for Improvement
        8. Next Steps for Document Preparation
        
        Focus on immigration-specific requirements and standards.
        """
        
        response = await self.team.arun(prompt)
        
        return {
            "document_analysis": response.content,
            "documents_processed": len(documents),
            "analysis_type": analysis_type,
            "analysis_date": datetime.now().isoformat(),
            "team_coordinator": "Immigration Advisory Team",
        }
    
    def _calculate_confidence(self, response) -> float:
        """
        Calculate confidence score based on response quality indicators.
        
        Args:
            response: Team response object
            
        Returns:
            Confidence score between 0.0 and 1.0
        """
        # This is a simplified confidence calculation
        # In practice, you might want more sophisticated analysis
        base_confidence = 0.8
        
        # Adjust based on response length (longer responses often more comprehensive)
        if hasattr(response, 'content') and response.content:
            content_length = len(response.content)
            if content_length > 2000:
                base_confidence += 0.1
            elif content_length < 500:
                base_confidence -= 0.1
        
        # Adjust based on tool usage (more tools used = more comprehensive)
        if hasattr(response, 'tool_calls') and response.tool_calls:
            tool_count = len(response.tool_calls)
            base_confidence += min(tool_count * 0.05, 0.15)
        
        return min(max(base_confidence, 0.0), 1.0)
    
    def get_team_info(self) -> Dict[str, Any]:
        """
        Get information about the immigration team.
        
        Returns:
            Team information and capabilities
        """
        return {
            "name": "Immigration Advisory Team",
            "description": "Coordinated team of immigration specialists",
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
                "Comprehensive immigration analysis",
                "Policy impact assessment",
                "Multi-country pathway comparison",
                "Document analysis and verification",
                "Risk assessment and mitigation",
                "Timeline and cost estimation",
                "Strategic planning and guidance",
            ],
            "tools": [
                "Reasoning Tools",
                "Supabase Integration",
                "Vector Search",
                "Web Research",
                "Document Processing",
                "Policy Monitoring",
            ],
            "success_criteria": self._get_success_criteria(),
        }
    
    async def health_check(self) -> Dict[str, Any]:
        """
        Perform a health check on the team and its components.
        
        Returns:
            Health status of the team
        """
        try:
            # Test basic team functionality
            test_response = await self.team.arun("Perform a quick system check and confirm all agents are operational.")
            
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