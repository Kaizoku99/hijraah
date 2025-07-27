"""
Prediction Agent for Hijraah MAS.

This agent specializes in generating success probability and timeline predictions
for immigration applications. It uses historical data, statistical models, and
AI reasoning to provide accurate predictions with confidence intervals.
"""

from typing import Dict, Any, Optional, List
from datetime import datetime, timedelta
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.models.anthropic import Claude
from agno.tools.reasoning import ReasoningTools

from ..tools.supabase_tools import SupabaseTools
from ..tools.vector_search_tools import VectorSearchTools
from ..config.settings import settings


class PredictionAgent:
    """
    Prediction specialist agent for immigration success probability and timeline modeling.
    
    This agent provides comprehensive predictions by:
    - Using historical data and statistical models for predictions
    - Considering multiple factors including policy changes and user profiles
    - Providing confidence intervals and explaining prediction factors
    - Updating predictions based on new data and outcomes
    - Generating risk assessments and success probability estimates
    """
    
    def __init__(
        self,
        supabase_url: Optional[str] = None,
        supabase_key: Optional[str] = None,
        model_name: str = "gpt-4o",
        temperature: float = 0.1,
        max_tokens: int = 4000,
    ):
        """
        Initialize the Prediction Agent.
        
        Args:
            supabase_url: Supabase project URL (defaults to settings)
            supabase_key: Supabase service key (defaults to settings)
            model_name: AI model to use (defaults to gpt-4o)
            temperature: Model temperature for response generation
            max_tokens: Maximum tokens for response generation
        """
        self.supabase_url = supabase_url or settings.supabase_url
        self.supabase_key = supabase_key or settings.supabase_key
        self.model_name = model_name
        self.temperature = temperature
        self.max_tokens = max_tokens
        
        # Initialize tools with latest Agno patterns
        self.tools = [
            SupabaseTools(url=self.supabase_url, key=self.supabase_key),
            VectorSearchTools(),
            ReasoningTools(add_instructions=True),
        ]
        
        # Initialize the agent with latest Agno patterns
        self.agent = Agent(
            name="Prediction Specialist",
            role="Generate success probability and timeline predictions for immigration applications",
            model=self._get_model(),
            tools=self.tools,
            instructions=self._get_instructions(),
            markdown=True,
            show_tool_calls=True,
            add_datetime_to_instructions=True,
            reasoning=True,  # Enable reasoning capabilities
            stream_intermediate_steps=True,  # Show reasoning steps
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
        """Get detailed instructions for the prediction agent."""
        return [
            "You are a specialized immigration prediction analyst with expertise in statistical modeling and success probability assessment.",
            "Your primary focus is generating accurate, data-driven predictions for immigration applications with proper confidence intervals.",
            "",
            "CORE RESPONSIBILITIES:",
            "- Generate success probability predictions using historical data and statistical models",
            "- Estimate realistic timelines for immigration processes",
            "- Consider multiple factors including policy changes, user profiles, and current trends",
            "- Provide confidence intervals and explain key prediction factors",
            "- Update predictions based on new data and outcomes",
            "- Assess risks and provide mitigation strategies",
            "",
            "PREDICTION METHODOLOGY:",
            "1. Data Collection: Gather relevant historical and current data",
            "2. Factor Analysis: Identify and weight key influencing factors",
            "3. Statistical Modeling: Apply appropriate statistical methods",
            "4. Confidence Assessment: Calculate confidence intervals and uncertainty",
            "5. Validation: Cross-reference with similar cases and outcomes",
            "6. Explanation: Provide clear reasoning for predictions",
            "",
            "KEY PREDICTION FACTORS:",
            "- User profile characteristics (education, experience, language, etc.)",
            "- Target country and immigration program",
            "- Current policy environment and recent changes",
            "- Historical success rates for similar profiles",
            "- Processing times and capacity constraints",
            "- Economic and political factors",
            "- Seasonal variations and trends",
            "",
            "PREDICTION TYPES:",
            "- Success Probability: Likelihood of application approval (0-100%)",
            "- Timeline Estimates: Expected processing times with ranges",
            "- Cost Predictions: Total expected costs including fees and services",
            "- Risk Assessment: Potential challenges and failure points",
            "- Optimization Recommendations: Ways to improve success chances",
            "",
            "CONFIDENCE LEVELS:",
            "- High Confidence (90%+): Strong historical data and clear patterns",
            "- Medium Confidence (70-89%): Good data with some uncertainty",
            "- Low Confidence (50-69%): Limited data or high variability",
            "- Very Low Confidence (<50%): Insufficient data or unprecedented situation",
            "",
            "REPORTING STANDARDS:",
            "- Always provide confidence intervals, not just point estimates",
            "- Explain the key factors driving the prediction",
            "- Include assumptions and limitations",
            "- Provide actionable recommendations to improve outcomes",
            "- Update predictions when new information becomes available",
            "- Use clear, non-technical language for explanations",
            "",
            "RISK ASSESSMENT FRAMEWORK:",
            "- Identify potential failure points and bottlenecks",
            "- Assess impact and likelihood of various risks",
            "- Provide mitigation strategies for identified risks",
            "- Consider both controllable and uncontrollable factors",
            "- Include contingency planning recommendations",
        ]
    
    async def predict_success_probability(
        self,
        user_profile: Dict[str, Any],
        immigration_pathway: Dict[str, Any],
        current_context: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """
        Predict the success probability for an immigration application.
        
        Args:
            user_profile: User's background, qualifications, and characteristics
            immigration_pathway: Details of the immigration program/pathway
            current_context: Current policy and market context
            
        Returns:
            Success probability prediction with confidence intervals
        """
        prompt_parts = [
            "Please generate a comprehensive success probability prediction for this immigration application.",
            "",
            f"User Profile: {user_profile}",
            f"Immigration Pathway: {immigration_pathway}",
        ]
        
        if current_context:
            prompt_parts.append(f"Current Context: {current_context}")
        
        prompt_parts.extend([
            "",
            "Provide a detailed prediction analysis including:",
            "",
            "1. SUCCESS PROBABILITY ASSESSMENT:",
            "   - Overall success probability (percentage with confidence interval)",
            "   - Probability breakdown by application stage",
            "   - Comparison with similar profiles and historical data",
            "",
            "2. KEY INFLUENCING FACTORS:",
            "   - Positive factors (strengths that increase success chances)",
            "   - Negative factors (weaknesses that decrease success chances)",
            "   - Neutral factors (considerations that may or may not impact)",
            "   - Factor importance weighting and impact analysis",
            "",
            "3. CONFIDENCE ASSESSMENT:",
            "   - Confidence level in the prediction (High/Medium/Low)",
            "   - Data quality and availability assessment",
            "   - Uncertainty sources and limitations",
            "   - Reliability indicators and validation methods",
            "",
            "4. COMPARATIVE ANALYSIS:",
            "   - Performance vs. average applicant in this category",
            "   - Ranking within similar profile cohort",
            "   - Historical trends for this pathway and profile type",
            "",
            "5. IMPROVEMENT RECOMMENDATIONS:",
            "   - Specific actions to increase success probability",
            "   - Timeline for implementing improvements",
            "   - Expected impact of each recommendation",
            "   - Cost-benefit analysis of improvement strategies",
            "",
            "Use statistical reasoning and cite relevant data sources where available.",
        ])
        
        full_prompt = "\n".join(prompt_parts)
        
        response = await self.agent.arun(full_prompt)
        
        return {
            "success_prediction": response.content,
            "user_profile": user_profile,
            "immigration_pathway": immigration_pathway,
            "current_context": current_context,
            "prediction_date": datetime.now().isoformat(),
            "agent_used": "Prediction Specialist",
        }
    
    async def estimate_timeline(
        self,
        user_profile: Dict[str, Any],
        immigration_pathway: Dict[str, Any],
        current_processing_data: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """
        Estimate realistic timelines for immigration process completion.
        
        Args:
            user_profile: User's profile and current status
            immigration_pathway: Immigration program details
            current_processing_data: Current processing times and capacity data
            
        Returns:
            Comprehensive timeline estimates with ranges
        """
        prompt = f"""
        Please provide comprehensive timeline estimates for this immigration process.
        
        User Profile: {user_profile}
        Immigration Pathway: {immigration_pathway}
        Current Processing Data: {current_processing_data or "Use latest available data"}
        
        Provide detailed timeline analysis including:
        
        1. OVERALL TIMELINE ESTIMATE:
           - Best case scenario (optimistic timeline)
           - Most likely scenario (realistic timeline)
           - Worst case scenario (pessimistic timeline)
           - Confidence intervals for each estimate
        
        2. STAGE-BY-STAGE BREAKDOWN:
           - Document preparation phase
           - Application submission and initial review
           - Additional documentation requests (if applicable)
           - Interview or assessment phase (if applicable)
           - Final decision and processing
           - Post-approval steps (if applicable)
        
        3. INFLUENCING FACTORS:
           - Current processing backlogs and capacity
           - Seasonal variations and peak periods
           - Policy changes that may affect processing
           - User-specific factors that may cause delays
           - External factors (economic, political, etc.)
        
        4. RISK FACTORS AND DELAYS:
           - Common delay causes for this pathway
           - Probability of encountering each delay type
           - Expected duration of potential delays
           - Mitigation strategies to avoid delays
        
        5. OPTIMIZATION STRATEGIES:
           - Actions to minimize processing time
           - Optimal timing for application submission
           - Preparation strategies to avoid delays
           - Monitoring and follow-up recommendations
        
        6. MILESTONE TRACKING:
           - Key milestones and expected dates
           - Progress indicators to monitor
           - When to expect communications from authorities
           - Red flags that indicate potential problems
        
        Base estimates on current processing data and historical patterns.
        """
        
        response = await self.agent.arun(prompt)
        
        return {
            "timeline_estimate": response.content,
            "user_profile": user_profile,
            "immigration_pathway": immigration_pathway,
            "processing_data": current_processing_data,
            "estimate_date": datetime.now().isoformat(),
            "agent_used": "Prediction Specialist",
        }
    
    async def calculate_cost_prediction(
        self,
        user_profile: Dict[str, Any],
        immigration_pathway: Dict[str, Any],
        service_preferences: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """
        Calculate comprehensive cost predictions for immigration process.
        
        Args:
            user_profile: User's profile and requirements
            immigration_pathway: Immigration program details
            service_preferences: Preferred services and assistance levels
            
        Returns:
            Detailed cost breakdown and predictions
        """
        prompt = f"""
        Please provide comprehensive cost predictions for this immigration process.
        
        User Profile: {user_profile}
        Immigration Pathway: {immigration_pathway}
        Service Preferences: {service_preferences or "Standard service level"}
        
        Provide detailed cost analysis including:
        
        1. GOVERNMENT FEES:
           - Application fees (primary and dependents)
           - Processing fees and surcharges
           - Medical examination fees
           - Biometrics and background check fees
           - Interview or assessment fees (if applicable)
        
        2. PROFESSIONAL SERVICES:
           - Legal consultation and representation
           - Document preparation and review
           - Translation and certification services
           - Educational credential assessment
           - Professional skills assessment (if required)
        
        3. DOCUMENT COSTS:
           - Official document procurement
           - Notarization and authentication
           - Courier and shipping costs
           - Photography and document scanning
        
        4. TRAVEL AND ACCOMMODATION:
           - Interview travel costs (if required)
           - Medical examination travel
           - Document collection travel
           - Accommodation costs for required visits
        
        5. CONTINGENCY COSTS:
           - Additional documentation requests
           - Appeal or resubmission costs
           - Extended processing delays
           - Currency fluctuation buffer
        
        6. COST OPTIMIZATION:
           - Ways to reduce overall costs
           - DIY vs. professional service trade-offs
           - Timing strategies to minimize costs
           - Bulk service discounts and packages
        
        7. PAYMENT TIMELINE:
           - When each cost category is typically incurred
           - Payment scheduling recommendations
           - Budget planning suggestions
           - Financial preparation timeline
        
        Provide cost ranges (minimum, typical, maximum) with current market rates.
        """
        
        response = await self.agent.arun(prompt)
        
        return {
            "cost_prediction": response.content,
            "user_profile": user_profile,
            "immigration_pathway": immigration_pathway,
            "service_preferences": service_preferences,
            "prediction_date": datetime.now().isoformat(),
            "agent_used": "Prediction Specialist",
        }
    
    async def assess_risks(
        self,
        user_profile: Dict[str, Any],
        immigration_pathway: Dict[str, Any],
        current_context: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """
        Assess comprehensive risks for immigration application.
        
        Args:
            user_profile: User's profile and background
            immigration_pathway: Immigration program details
            current_context: Current policy and market context
            
        Returns:
            Comprehensive risk assessment with mitigation strategies
        """
        prompt = f"""
        Please provide a comprehensive risk assessment for this immigration application.
        
        User Profile: {user_profile}
        Immigration Pathway: {immigration_pathway}
        Current Context: {current_context or "Current policy environment"}
        
        Provide detailed risk analysis including:
        
        1. APPLICATION RISKS:
           - Document inadequacy or errors
           - Eligibility requirement changes
           - Application processing delays
           - Interview or assessment failures
           - Background check complications
        
        2. POLICY RISKS:
           - Immigration policy changes
           - Program closure or modification
           - Quota reductions or caps
           - Processing standard changes
           - Fee increases or new requirements
        
        3. PERSONAL RISKS:
           - Changes in personal circumstances
           - Employment or education disruptions
           - Health or family situation changes
           - Financial capacity limitations
           - Language proficiency requirements
        
        4. EXTERNAL RISKS:
           - Economic conditions impact
           - Political climate changes
           - International relations effects
           - Global events (pandemics, conflicts)
           - Technology or system changes
        
        5. RISK PRIORITIZATION:
           - High impact, high probability risks
           - High impact, low probability risks
           - Low impact, high probability risks
           - Risk severity and urgency matrix
        
        6. MITIGATION STRATEGIES:
           - Preventive measures for each risk category
           - Contingency planning recommendations
           - Risk monitoring and early warning systems
           - Alternative pathway preparations
           - Insurance and protection options
        
        7. RISK MONITORING:
           - Key indicators to track
           - Monitoring frequency and methods
           - Decision points and trigger events
           - Response protocols for risk materialization
        
        Assess both controllable and uncontrollable risk factors.
        """
        
        response = await self.agent.arun(prompt)
        
        return {
            "risk_assessment": response.content,
            "user_profile": user_profile,
            "immigration_pathway": immigration_pathway,
            "current_context": current_context,
            "assessment_date": datetime.now().isoformat(),
            "agent_used": "Prediction Specialist",
        }
    
    async def generate_optimization_recommendations(
        self,
        current_predictions: Dict[str, Any],
        user_goals: Dict[str, Any],
        constraints: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """
        Generate recommendations to optimize immigration outcomes.
        
        Args:
            current_predictions: Current success/timeline/cost predictions
            user_goals: User's specific goals and priorities
            constraints: User's constraints (time, budget, etc.)
            
        Returns:
            Optimization recommendations with impact analysis
        """
        prompt = f"""
        Based on current predictions, please provide optimization recommendations.
        
        Current Predictions: {current_predictions}
        User Goals: {user_goals}
        Constraints: {constraints or "No specific constraints provided"}
        
        Provide comprehensive optimization recommendations including:
        
        1. SUCCESS OPTIMIZATION:
           - Actions to increase approval probability
           - Profile strengthening strategies
           - Documentation improvements
           - Timing optimization for application
        
        2. TIMELINE OPTIMIZATION:
           - Strategies to reduce processing time
           - Preparation acceleration methods
           - Optimal submission timing
           - Delay prevention measures
        
        3. COST OPTIMIZATION:
           - Cost reduction strategies
           - Service level optimization
           - Bulk service opportunities
           - DIY vs. professional service decisions
        
        4. RISK OPTIMIZATION:
           - Risk mitigation priorities
           - Contingency planning improvements
           - Alternative pathway preparations
           - Insurance and protection strategies
        
        5. IMPLEMENTATION PLAN:
           - Priority ranking of recommendations
           - Implementation timeline and sequence
           - Resource requirements for each action
           - Expected impact and ROI analysis
        
        6. TRADE-OFF ANALYSIS:
           - Success vs. speed trade-offs
           - Cost vs. quality considerations
           - Risk vs. reward evaluations
           - Short-term vs. long-term implications
        
        7. MONITORING AND ADJUSTMENT:
           - Progress tracking methods
           - Performance indicators
           - Adjustment triggers and protocols
           - Continuous improvement strategies
        
        Prioritize recommendations based on impact potential and feasibility.
        """
        
        response = await self.agent.arun(prompt)
        
        return {
            "optimization_recommendations": response.content,
            "current_predictions": current_predictions,
            "user_goals": user_goals,
            "constraints": constraints,
            "recommendation_date": datetime.now().isoformat(),
            "agent_used": "Prediction Specialist",
        }
    
    async def update_predictions(
        self,
        original_predictions: Dict[str, Any],
        new_data: Dict[str, Any],
        changes: Dict[str, Any],
    ) -> Dict[str, Any]:
        """
        Update existing predictions based on new data or changed circumstances.
        
        Args:
            original_predictions: Previous prediction results
            new_data: New information that may affect predictions
            changes: Changes in user profile or circumstances
            
        Returns:
            Updated predictions with change analysis
        """
        prompt = f"""
        Please update the existing predictions based on new information and changes.
        
        Original Predictions: {original_predictions}
        New Data: {new_data}
        Changes: {changes}
        
        Provide updated predictions including:
        
        1. UPDATED PREDICTIONS:
           - Revised success probability with new confidence intervals
           - Updated timeline estimates with new ranges
           - Revised cost predictions with current rates
           - Updated risk assessment with new factors
        
        2. CHANGE IMPACT ANALYSIS:
           - How new data affects each prediction category
           - Magnitude and direction of changes
           - Confidence level changes
           - New factors introduced or removed
        
        3. COMPARISON WITH ORIGINAL:
           - Side-by-side comparison of old vs. new predictions
           - Explanation of significant changes
           - Validation of prediction accuracy improvements
           - Lessons learned from prediction updates
        
        4. RECOMMENDATION UPDATES:
           - Modified optimization strategies
           - New action items based on changes
           - Revised priority rankings
           - Updated implementation timelines
        
        5. MONITORING ADJUSTMENTS:
           - New indicators to track
           - Modified monitoring frequency
           - Updated decision triggers
           - Revised contingency plans
        
        6. PREDICTION RELIABILITY:
           - Assessment of prediction model performance
           - Confidence in updated predictions
           - Areas of continued uncertainty
           - Recommendations for additional data collection
        
        Highlight the most significant changes and their implications.
        """
        
        response = await self.agent.arun(prompt)
        
        return {
            "updated_predictions": response.content,
            "original_predictions": original_predictions,
            "new_data": new_data,
            "changes": changes,
            "update_date": datetime.now().isoformat(),
            "agent_used": "Prediction Specialist",
        }
    
    def get_agent_info(self) -> Dict[str, Any]:
        """
        Get information about this agent.
        
        Returns:
            Agent information and capabilities
        """
        return {
            "name": "Prediction Specialist",
            "role": "Generate success probability and timeline predictions for immigration applications",
            "capabilities": [
                "Success probability prediction",
                "Timeline estimation",
                "Cost prediction",
                "Risk assessment",
                "Optimization recommendations",
                "Prediction updates and refinement",
                "Statistical analysis and modeling",
                "Confidence interval calculation",
            ],
            "tools": [tool.__class__.__name__ for tool in self.tools],
            "model": self.model_name,
            "specializations": [
                "Statistical modeling and analysis",
                "Immigration success factors",
                "Timeline and cost estimation",
                "Risk assessment and mitigation",
                "Optimization strategies",
                "Predictive analytics",
            ],
        }