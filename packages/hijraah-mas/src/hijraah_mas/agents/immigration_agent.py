"""
Immigration Agent for Hijraah MAS using latest Agno patterns.

This agent specializes in providing expert immigration advice and policy analysis
using the latest Agno framework patterns and comprehensive Hijraah toolkit integration.
"""

from typing import Dict, Any, Optional, List
from datetime import datetime
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.models.anthropic import Claude
from agno.tools.duckduckgo import DuckDuckGoTools
from agno.tools.reasoning import ReasoningTools
from agno.memory.v2.db.sqlite import SqliteMemoryDb
from agno.memory.v2.memory import Memory
from textwrap import dedent

from ..tools.hijraah_toolkit import HijraahToolkit, analyze_user_immigration_case, generate_immigration_roadmap
from ..tools.enhanced_supabase_tools import get_user_profile, get_immigration_policies
from ..tools.ml_prediction_tools import predict_immigration_success, estimate_processing_timeline
from ..config.settings import settings


class ImmigrationAgent:
    """
    Advanced Immigration specialist agent using latest Agno patterns.
    
    This agent provides comprehensive immigration advice by:
    - Using the integrated Hijraah toolkit for comprehensive analysis
    - Leveraging ML predictions for success probability and timelines
    - Providing personalized roadmaps and recommendations
    - Monitoring policy changes and their impact
    - Maintaining conversation memory for personalized service
    """
    
    def __init__(
        self,
        supabase_url: Optional[str] = None,
        supabase_key: Optional[str] = None,
        model_name: str = "gpt-4o",
        user_id: str = "default",
        enable_memory: bool = True,
        temperature: float = 0.1,
    ):
        """
        Initialize the Immigration Agent with latest Agno patterns.
        
        Args:
            supabase_url: Supabase project URL (defaults to settings)
            supabase_key: Supabase service key (defaults to settings)
            model_name: AI model to use (defaults to gpt-4o)
            user_id: User ID for memory management
            enable_memory: Whether to enable conversation memory
            temperature: Model temperature for response generation
        """
        self.supabase_url = supabase_url or settings.supabase_url
        self.supabase_key = supabase_key or settings.supabase_key
        self.model_name = model_name
        self.user_id = user_id
        self.temperature = temperature
        
        # Initialize Hijraah toolkit
        self.hijraah_toolkit = HijraahToolkit(
            supabase_url=self.supabase_url,
            supabase_key=self.supabase_key
        )
        
        # Initialize comprehensive tools with latest patterns
        self.tools = [
            # Hijraah-specific integrated tools
            analyze_user_immigration_case,
            generate_immigration_roadmap,
            get_user_profile,
            get_immigration_policies,
            predict_immigration_success,
            estimate_processing_timeline,
            
            # General purpose tools
            DuckDuckGoTools(),
            ReasoningTools(add_instructions=True),
        ]
        
        # Initialize memory if enabled
        self.memory = None
        if enable_memory:
            self.memory = Memory(
                model=self._get_model(),
                db=SqliteMemoryDb(
                    table_name="immigration_agent_memories",
                    db_file=f"tmp/immigration_agent_{user_id}.db"
                ),
                delete_memories=False,  # Keep conversation history
                clear_memories=False,
            )
        
        # Initialize the agent with latest Agno patterns
        self.agent = Agent(
            name="Immigration Specialist",
            role="Expert immigration consultant and policy analyst",
            model=self._get_model(),
            tools=self.tools,
            instructions=self._get_enhanced_instructions(),
            user_id=self.user_id,
            memory=self.memory,
            enable_agentic_memory=enable_memory,
            markdown=True,
            show_tool_calls=True,
            add_datetime_to_instructions=True,
            stream_intermediate_steps=True,
            show_full_reasoning=True,
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
    
    def _get_enhanced_instructions(self) -> str:
        """Get enhanced instructions for the immigration agent using latest patterns."""
        return dedent("""
            You are an expert immigration consultant with deep knowledge of global immigration policies and procedures! 🌍
            
            Your expertise covers visa types, application processes, requirements, timelines, and policy changes across multiple countries.
            You have access to advanced tools including ML predictions, comprehensive case analysis, and real-time policy monitoring.
            
            ## CORE RESPONSIBILITIES:
            - Provide accurate, up-to-date immigration advice using the Hijraah toolkit
            - Always use analyze_user_immigration_case for comprehensive case analysis
            - Leverage ML predictions for success probability and timeline estimates
            - Generate personalized immigration roadmaps when appropriate
            - Monitor policy changes and assess their impact on users
            - Maintain conversation context and remember user preferences
            
            ## TOOL USAGE STRATEGY:
            1. **For new users**: Start with get_user_profile to understand their background
            2. **For case analysis**: Use analyze_user_immigration_case for comprehensive insights
            3. **For predictions**: Use predict_immigration_success and estimate_processing_timeline
            4. **For planning**: Use generate_immigration_roadmap for step-by-step guidance
            5. **For policy updates**: Use get_immigration_policies with recent changes enabled
            
            ## RESPONSE STRUCTURE:
            1. **Personalized Greeting**: Acknowledge the user's specific situation
            2. **Case Analysis**: Provide comprehensive analysis using available tools
            3. **ML Insights**: Include success probability and timeline predictions
            4. **Actionable Roadmap**: Offer step-by-step guidance
            5. **Risk Assessment**: Highlight potential challenges and mitigation strategies
            6. **Policy Context**: Include relevant policy changes and their impact
            7. **Next Steps**: Provide clear, prioritized action items
            
            ## QUALITY STANDARDS:
            - Always use the most appropriate tools for each query
            - Provide confidence levels and data sources for predictions
            - Include both optimistic and realistic scenarios
            - Cite official sources and provide verification links
            - Distinguish between AI predictions and official requirements
            - Include appropriate disclaimers for legal matters
            
            ## COMMUNICATION STYLE:
            - Use clear, professional language with appropriate emoji for emphasis
            - Structure information with headers, bullet points, and tables
            - Provide specific examples and real-world scenarios
            - Be empathetic to immigration stress and complexity
            - Encourage verification with official sources and legal counsel
            - Maintain conversation context and build on previous interactions
            
            ## MEMORY USAGE:
            - Remember user preferences, goals, and previous discussions
            - Track case progress and milestone achievements
            - Maintain context about user's immigration journey
            - Personalize recommendations based on conversation history
            
            Remember: You're not just providing information - you're guiding people through one of the most important journeys of their lives! 🚀
        """)
    
    async def analyze_case(
        self,
        user_id: str,
        pathway: str,
        target_country: str,
        query: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
    ) -> str:
        """
        Analyze an immigration case using comprehensive toolkit integration.
        
        Args:
            user_id: User ID for profile lookup
            pathway: Immigration pathway (H-1B, EB-1, etc.)
            target_country: Target country for immigration
            query: Specific immigration question or scenario
            context: Additional context for the analysis
            
        Returns:
            Comprehensive immigration analysis with ML predictions and roadmap
        """
        # Prepare the enhanced analysis prompt
        prompt_parts = [
            f"🎯 **Immigration Case Analysis Request**",
            f"User ID: {user_id}",
            f"Immigration Pathway: {pathway}",
            f"Target Country: {target_country}",
        ]
        
        if query:
            prompt_parts.append(f"Specific Query: {query}")
        
        if context:
            prompt_parts.append(f"Additional Context: {context}")
        
        prompt_parts.extend([
            "",
            "Please provide a comprehensive immigration case analysis using the available tools:",
            "",
            "1. **Use analyze_user_immigration_case** to get comprehensive analysis with ML predictions",
            "2. **Use generate_immigration_roadmap** to create a personalized step-by-step plan",
            "3. **Include success probability and timeline predictions**",
            "4. **Assess policy changes and their impact**",
            "5. **Provide similar case examples for context**",
            "6. **Generate actionable recommendations with priorities**",
            "",
            "Structure your response with clear sections and actionable insights! 📋",
        ])
        
        full_prompt = "\n".join(prompt_parts)
        
        # Get comprehensive analysis from the agent
        response = await self.agent.aprint_response(full_prompt, stream=True)
        return response
    
    async def get_policy_update(
        self,
        country: str,
        visa_type: Optional[str] = None,
        date_from: Optional[str] = None,
        user_id: Optional[str] = None,
    ) -> str:
        """
        Get recent policy updates with impact assessment using enhanced tools.
        
        Args:
            country: Country code or name
            visa_type: Specific visa type (optional)
            date_from: Date from which to check updates (optional)
            user_id: User ID for personalized impact assessment (optional)
            
        Returns:
            Comprehensive policy update analysis with impact assessment
        """
        prompt_parts = [
            f"📢 **Policy Update Analysis Request**",
            f"Country: {country}",
        ]
        
        if visa_type:
            prompt_parts.append(f"Visa Type: {visa_type}")
        
        if date_from:
            prompt_parts.append(f"Date Range: Since {date_from}")
        
        if user_id:
            prompt_parts.append(f"User ID for Impact Assessment: {user_id}")
        
        prompt_parts.extend([
            "",
            "Please provide comprehensive policy update analysis:",
            "",
            "1. **Use get_immigration_policies** with include_recent_changes=True",
            "2. **If user_id provided, use monitor_policy_changes_for_user** for personalized impact",
            "3. **Analyze the practical implications of each change**",
            "4. **Assess impact on different applicant categories**",
            "5. **Provide actionable recommendations for affected users**",
            "6. **Include official sources and effective dates**",
            "",
            "Focus on actionable insights and clear impact assessment! 🎯",
        ])
        
        full_prompt = "\n".join(prompt_parts)
        
        response = await self.agent.aprint_response(full_prompt, stream=True)
        return response
    
    async def compare_pathways(
        self,
        user_id: str,
        target_countries: List[str],
        pathways: Optional[List[str]] = None,
    ) -> str:
        """
        Compare immigration pathways across multiple countries with ML predictions.
        
        Args:
            user_id: User ID for profile-based comparison
            target_countries: List of countries to compare
            pathways: Specific pathways to compare (optional)
            
        Returns:
            Comprehensive comparative analysis with ML predictions
        """
        prompt = dedent(f"""
            🌍 **Multi-Country Immigration Pathway Comparison**
            
            User ID: {user_id}
            Target Countries: {', '.join(target_countries)}
            {f"Specific Pathways: {', '.join(pathways)}" if pathways else "All Available Pathways"}
            
            Please provide a comprehensive comparison using the available tools:
            
            **For Each Country/Pathway Combination:**
            1. **Use analyze_user_immigration_case** for detailed analysis
            2. **Use predict_immigration_success** for success probability
            3. **Use estimate_processing_timeline** for timeline predictions
            4. **Use calculate_cost_predictions** for comprehensive cost analysis
            
            **Comparison Framework:**
            - Success probability and confidence intervals
            - Processing timelines (best/worst case scenarios)
            - Total costs (government fees + professional services)
            - Eligibility requirements and gaps
            - Long-term prospects (PR, citizenship pathways)
            - Quality of life and economic factors
            
            **Deliverables:**
            - Comparative summary table with key metrics
            - Personalized recommendations based on user profile
            - Risk assessment for each option
            - Action plan for top 2-3 recommendations
            
            Make it comprehensive yet easy to understand! 📊
        """)
        
        response = await self.agent.aprint_response(prompt, stream=True)
        return response
    
    async def assess_eligibility(
        self,
        user_id: str,
        immigration_program: str,
        target_country: str,
    ) -> Dict[str, Any]:
        """
        Assess user's eligibility using comprehensive ML-powered analysis.
        
        Args:
            user_id: User ID for profile lookup
            immigration_program: Specific immigration program or visa type
            target_country: Target country for the program
            
        Returns:
            Comprehensive eligibility assessment with ML predictions
        """
        prompt = dedent(f"""
            🎯 **Comprehensive Eligibility Assessment**
            
            User ID: {user_id}
            Immigration Program: {immigration_program}
            Target Country: {target_country}
            
            Please provide a comprehensive eligibility assessment using all available tools:
            
            **Analysis Steps:**
            1. **Use get_user_profile** to retrieve complete user information
            2. **Use predict_immigration_success** to get ML-based eligibility score
            3. **Use analyze_user_immigration_case** for detailed requirement analysis
            4. **Use get_immigration_policies** to verify current requirements
            
            **Assessment Framework:**
            - **Eligibility Score**: ML-predicted success probability (0-100%)
            - **Requirements Analysis**: Met vs Missing requirements with specifics
            - **Gap Analysis**: Specific actions needed to improve eligibility
            - **Timeline to Eligibility**: Realistic timeline if requirements can be met
            - **Alternative Pathways**: Better-suited programs if current isn't optimal
            - **Risk Factors**: Potential challenges and mitigation strategies
            
            **Output Format:**
            - Executive summary with key findings
            - Detailed requirement checklist
            - Actionable improvement plan
            - Alternative recommendations
            - Next steps with priorities
            
            Provide actionable insights with confidence levels! 📈
        """)
        
        response = await self.agent.aprint_response(prompt, stream=True)
        
        return {
            "assessment": response,
            "agent_used": "Immigration Specialist (Enhanced)",
            "user_id": user_id,
            "program": immigration_program,
            "country": target_country,
            "timestamp": datetime.now().isoformat(),
            "tools_used": [tool.__name__ for tool in self.tools if hasattr(tool, '__name__')],
        }
    
    async def generate_comprehensive_report(
        self,
        user_id: str,
        pathway: str,
        target_country: str,
        include_alternatives: bool = True,
    ) -> str:
        """
        Generate a comprehensive immigration report with all analysis components.
        
        Args:
            user_id: User ID for personalized analysis
            pathway: Primary immigration pathway
            target_country: Target country
            include_alternatives: Whether to include alternative pathway analysis
            
        Returns:
            Comprehensive immigration report with all insights
        """
        prompt = dedent(f"""
            📋 **Comprehensive Immigration Report Generation**
            
            User ID: {user_id}
            Primary Pathway: {pathway}
            Target Country: {target_country}
            Include Alternatives: {include_alternatives}
            
            Please generate a comprehensive immigration report using all available tools and analysis:
            
            **Report Sections:**
            
            1. **Executive Summary**
               - Key findings and recommendations
               - Success probability and confidence level
               - Estimated timeline and costs
               - Critical action items
            
            2. **User Profile Analysis**
               - Strengths and advantages
               - Areas for improvement
               - Profile completeness assessment
            
            3. **Pathway Analysis**
               - Detailed eligibility assessment
               - Requirements checklist
               - Success probability with confidence intervals
               - Timeline estimation with scenarios
            
            4. **Cost Analysis**
               - Comprehensive cost breakdown
               - Budget vs premium options
               - Payment timeline
               - Cost optimization opportunities
            
            5. **Risk Assessment**
               - Identified risks and mitigation strategies
               - Contingency planning
               - Success factors
            
            6. **Policy Context**
               - Recent policy changes and impact
               - Monitoring recommendations
               - Future policy considerations
            
            7. **Personalized Roadmap**
               - Step-by-step action plan
               - Milestone tracking
               - Timeline with deadlines
            
            {f'''8. **Alternative Pathways**
               - Comparative analysis of other options
               - Pros and cons of each alternative
               - Recommendations for backup plans''' if include_alternatives else ''}
            
            9. **Next Steps**
               - Immediate actions (next 30 days)
               - Medium-term goals (3-6 months)
               - Long-term planning (6+ months)
            
            **Use ALL available tools** to provide the most comprehensive analysis possible! 🚀
        """)
        
        response = await self.agent.aprint_response(prompt, stream=True)
        return response
    
    def get_agent_info(self) -> Dict[str, Any]:
        """
        Get information about this enhanced agent.
        
        Returns:
            Agent information and capabilities
        """
        return {
            "name": "Immigration Specialist (Enhanced)",
            "role": "Expert immigration consultant with ML predictions and comprehensive analysis",
            "version": "2.0 - Latest Agno Patterns",
            "capabilities": [
                "Comprehensive case analysis with ML predictions",
                "Success probability estimation with confidence intervals",
                "Processing timeline prediction with scenarios",
                "Cost analysis with optimization recommendations",
                "Personalized immigration roadmap generation",
                "Policy change monitoring and impact assessment",
                "Multi-country pathway comparisons",
                "Document validation and completeness checking",
                "Risk assessment and mitigation planning",
                "Conversation memory and personalization",
            ],
            "tools": [
                "Hijraah Integrated Toolkit",
                "ML Prediction Engine",
                "Enhanced Supabase Integration",
                "Vector Search and Semantic Matching",
                "Policy Monitoring and Change Detection",
                "DuckDuckGo Search",
                "Advanced Reasoning Tools",
            ],
            "model": self.model_name,
            "memory_enabled": self.memory is not None,
            "user_id": self.user_id,
            "specializations": [
                "Work visas (H-1B, L-1, O-1, etc.)",
                "Employment-based permanent residence (EB-1, EB-2, EB-3)",
                "Student visas and academic pathways",
                "Family-based immigration",
                "Business and investor visas",
                "Citizenship and naturalization",
                "Policy analysis and compliance",
                "Cross-border mobility strategies",
            ],
            "features": [
                "Real-time policy monitoring",
                "ML-powered success predictions",
                "Personalized roadmap generation",
                "Comprehensive cost analysis",
                "Risk assessment and mitigation",
                "Document validation",
                "Multi-pathway comparisons",
                "Conversation memory",
                "Proactive recommendations",
            ],
        }