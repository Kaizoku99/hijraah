"""
Community Validation Agent for Hijraah MAS.

This agent specializes in verifying user-submitted immigration experiences
and managing community-driven data validation. It ensures data quality
and reliability through collaborative validation processes.
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


class CommunityValidationAgent:
    """
    Community validation specialist agent for verifying user-submitted immigration experiences.
    
    This agent provides comprehensive validation by:
    - Verifying user-submitted immigration experiences and data
    - Managing collaborative validation processes
    - Detecting outliers and inconsistencies in community data
    - Calculating reputation scores and trust metrics
    - Orchestrating peer review workflows
    - Ensuring data quality and reliability standards
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
        Initialize the Community Validation Agent.
        
        Args:
            supabase_url: Supabase project URL (defaults to settings)
            supabase_key: Supabase service key (defaults to settings)
            model_name: AI model to use (defaults to Claude Sonnet for reasoning)
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
            name="Community Validation Specialist",
            role="Verify user-submitted immigration experiences and manage community data validation",
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
        """Get detailed instructions for the community validation agent."""
        return [
            "You are a specialized community validation expert with expertise in verifying user-submitted immigration experiences and managing collaborative data validation processes.",
            "Your primary focus is ensuring data quality, reliability, and trustworthiness of community-contributed information.",
            "",
            "CORE RESPONSIBILITIES:",
            "- Verify user-submitted immigration experiences and timeline data",
            "- Detect outliers, inconsistencies, and potentially fraudulent submissions",
            "- Manage collaborative validation workflows and peer review processes",
            "- Calculate reputation scores and trust metrics for community contributors",
            "- Orchestrate quality assurance processes for community data",
            "- Maintain data integrity and reliability standards",
            "",
            "VALIDATION METHODOLOGY:",
            "1. Initial Screening: Automated checks for obvious inconsistencies",
            "2. Data Consistency: Cross-reference with known patterns and official data",
            "3. Outlier Detection: Identify submissions that deviate significantly from norms",
            "4. Peer Review: Coordinate community validation by experienced users",
            "5. Expert Review: Escalate complex cases to immigration experts",
            "6. Consensus Building: Aggregate multiple validation opinions",
            "",
            "VALIDATION CRITERIA:",
            "- Timeline Plausibility: Are reported timelines realistic and consistent?",
            "- Process Accuracy: Do described processes match official procedures?",
            "- Detail Consistency: Are all details internally consistent?",
            "- Supporting Evidence: Is there adequate supporting information?",
            "- User Credibility: What is the submitter's track record and reputation?",
            "- Cross-Validation: How does this compare with similar experiences?",
            "",
            "QUALITY INDICATORS:",
            "- Completeness: How complete is the submitted information?",
            "- Specificity: How specific and detailed are the provided details?",
            "- Consistency: How consistent is the information internally and externally?",
            "- Verifiability: How much of the information can be independently verified?",
            "- Credibility: How credible is the source and submission?",
            "- Usefulness: How useful is this information for other users?",
            "",
            "VALIDATION OUTCOMES:",
            "- Verified: Information is confirmed accurate and reliable",
            "- Partially Verified: Some aspects confirmed, others uncertain",
            "- Unverified: Insufficient information to confirm accuracy",
            "- Disputed: Conflicting information or evidence of inaccuracy",
            "- Rejected: Clear evidence of inaccuracy or fraudulent submission",
            "",
            "COMMUNITY ENGAGEMENT:",
            "- Encourage high-quality submissions through clear guidelines",
            "- Provide constructive feedback to improve submission quality",
            "- Recognize and reward valuable community contributors",
            "- Build trust and transparency in the validation process",
            "- Foster collaborative validation culture",
            "",
            "REPUTATION SYSTEM:",
            "- Track user contribution history and quality",
            "- Calculate trust scores based on validation outcomes",
            "- Weight validation opinions based on user expertise and reputation",
            "- Provide incentives for quality contributions",
            "- Implement safeguards against gaming or manipulation",
        ]
    
    async def validate_user_experience(
        self,
        experience_data: Dict[str, Any],
        user_profile: Dict[str, Any],
        validation_context: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """
        Validate a user-submitted immigration experience.
        
        Args:
            experience_data: The immigration experience data to validate
            user_profile: Profile of the user who submitted the experience
            validation_context: Additional context for validation
            
        Returns:
            Comprehensive validation results
        """
        prompt_parts = [
            "Please validate this user-submitted immigration experience for accuracy and reliability.",
            "",
            f"Experience Data: {experience_data}",
            f"User Profile: {user_profile}",
        ]
        
        if validation_context:
            prompt_parts.append(f"Validation Context: {validation_context}")
        
        prompt_parts.extend([
            "",
            "Provide comprehensive validation analysis including:",
            "",
            "1. INITIAL ASSESSMENT:",
            "   - Overall credibility score (0-100)",
            "   - Completeness assessment (percentage)",
            "   - Internal consistency evaluation",
            "   - Red flags or concerns identified",
            "",
            "2. TIMELINE VALIDATION:",
            "   - Timeline plausibility analysis",
            "   - Comparison with typical processing times",
            "   - Identification of unusual delays or expedited processing",
            "   - Seasonal and policy context considerations",
            "",
            "3. PROCESS ACCURACY:",
            "   - Verification of described procedures",
            "   - Comparison with official process requirements",
            "   - Identification of process deviations or errors",
            "   - Assessment of process knowledge accuracy",
            "",
            "4. DETAIL CONSISTENCY:",
            "   - Cross-referencing of provided details",
            "   - Identification of contradictions or inconsistencies",
            "   - Assessment of detail specificity and authenticity",
            "   - Evaluation of supporting information quality",
            "",
            "5. COMPARATIVE ANALYSIS:",
            "   - Comparison with similar user profiles and experiences",
            "   - Statistical analysis against known patterns",
            "   - Outlier detection and significance assessment",
            "   - Contextual factors that may explain variations",
            "",
            "6. USER CREDIBILITY:",
            "   - Assessment of user's track record and reputation",
            "   - Evaluation of submission quality and detail",
            "   - Analysis of potential motivations or biases",
            "   - Cross-reference with user's other contributions",
            "",
            "7. VALIDATION RECOMMENDATION:",
            "   - Recommended validation status (Verified/Partially Verified/Unverified/Disputed/Rejected)",
            "   - Confidence level in the recommendation",
            "   - Specific areas requiring additional verification",
            "   - Suggestions for improving submission quality",
            "",
            "8. NEXT STEPS:",
            "   - Recommended follow-up actions",
            "   - Additional information needed",
            "   - Peer review requirements",
            "   - Expert review escalation criteria",
        ])
        
        full_prompt = "\n".join(prompt_parts)
        
        response = await self.agent.arun(full_prompt)
        
        return {
            "validation_results": response.content,
            "experience_data": experience_data,
            "user_profile": user_profile,
            "validation_context": validation_context,
            "validation_date": datetime.now().isoformat(),
            "agent_used": "Community Validation Specialist",
        }
    
    async def detect_outliers(
        self,
        experiences: List[Dict[str, Any]],
        detection_criteria: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """
        Detect outliers and anomalies in community-submitted experiences.
        
        Args:
            experiences: List of immigration experiences to analyze
            detection_criteria: Specific criteria for outlier detection
            
        Returns:
            Outlier detection results with analysis
        """
        prompt = f"""
        Please analyze these immigration experiences to detect outliers and anomalies.
        
        Experiences to Analyze: {experiences}
        Detection Criteria: {detection_criteria or "Use standard outlier detection methods"}
        
        Provide comprehensive outlier analysis including:
        
        1. STATISTICAL OUTLIERS:
           - Timeline outliers (unusually fast or slow processing)
           - Cost outliers (significantly higher or lower costs)
           - Success rate outliers (unexpected outcomes)
           - Geographic or demographic outliers
        
        2. PROCESS OUTLIERS:
           - Unusual process variations or deviations
           - Non-standard requirements or procedures
           - Unexpected document requests or interviews
           - Atypical decision-making patterns
        
        3. QUALITY OUTLIERS:
           - Submissions with unusually high or low detail
           - Inconsistent or contradictory information
           - Submissions lacking typical supporting evidence
           - Unusually positive or negative experiences
        
        4. USER BEHAVIOR OUTLIERS:
           - Users with atypical submission patterns
           - Accounts with suspicious activity indicators
           - Users with consistently outlying experiences
           - Potential coordinated or fraudulent submissions
        
        5. OUTLIER SIGNIFICANCE:
           - Statistical significance of each outlier
           - Potential explanations for outlying behavior
           - Impact on overall data quality and reliability
           - Recommendations for handling each outlier type
        
        6. PATTERN ANALYSIS:
           - Common characteristics of outliers
           - Clustering of outliers by category or user
           - Temporal patterns in outlier occurrence
           - Correlation with external factors or events
        
        7. VALIDATION RECOMMENDATIONS:
           - Priority ranking for manual review
           - Automated validation rules to implement
           - Community validation strategies
           - Expert review escalation criteria
        
        Focus on actionable insights for improving data quality.
        """
        
        response = await self.agent.arun(prompt)
        
        return {
            "outlier_analysis": response.content,
            "experiences_analyzed": len(experiences),
            "detection_criteria": detection_criteria,
            "analysis_date": datetime.now().isoformat(),
            "agent_used": "Community Validation Specialist",
        }
    
    async def orchestrate_peer_review(
        self,
        submission: Dict[str, Any],
        reviewer_pool: List[Dict[str, Any]],
        review_criteria: Dict[str, Any],
    ) -> Dict[str, Any]:
        """
        Orchestrate peer review process for community submissions.
        
        Args:
            submission: The submission to be peer reviewed
            reviewer_pool: Available reviewers and their qualifications
            review_criteria: Criteria and guidelines for review
            
        Returns:
            Peer review orchestration plan and results
        """
        prompt = f"""
        Please orchestrate a peer review process for this community submission.
        
        Submission to Review: {submission}
        Available Reviewers: {reviewer_pool}
        Review Criteria: {review_criteria}
        
        Provide comprehensive peer review orchestration including:
        
        1. REVIEWER SELECTION:
           - Optimal reviewer selection based on expertise and experience
           - Reviewer qualification assessment
           - Conflict of interest screening
           - Workload balancing considerations
        
        2. REVIEW ASSIGNMENT:
           - Number of reviewers needed for this submission
           - Review timeline and deadlines
           - Review instructions and guidelines
           - Quality standards and expectations
        
        3. REVIEW PROCESS:
           - Step-by-step review workflow
           - Review criteria and evaluation framework
           - Scoring or rating system to use
           - Documentation requirements for reviewers
        
        4. CONSENSUS BUILDING:
           - Method for aggregating multiple review opinions
           - Conflict resolution procedures
           - Consensus threshold requirements
           - Escalation procedures for disagreements
        
        5. QUALITY ASSURANCE:
           - Review quality monitoring methods
           - Reviewer performance tracking
           - Bias detection and mitigation
           - Review validation procedures
        
        6. FEEDBACK INTEGRATION:
           - How to incorporate reviewer feedback
           - Submission improvement recommendations
           - Communication with original submitter
           - Iterative review process if needed
        
        7. OUTCOME DETERMINATION:
           - Final validation status determination
           - Confidence level in the outcome
           - Documentation of review process
           - Lessons learned and process improvements
        
        Design an efficient and fair peer review process.
        """
        
        response = await self.agent.arun(prompt)
        
        return {
            "peer_review_plan": response.content,
            "submission": submission,
            "reviewer_pool": reviewer_pool,
            "review_criteria": review_criteria,
            "orchestration_date": datetime.now().isoformat(),
            "agent_used": "Community Validation Specialist",
        }
    
    async def calculate_reputation_scores(
        self,
        user_contributions: List[Dict[str, Any]],
        validation_history: List[Dict[str, Any]],
        scoring_criteria: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """
        Calculate reputation scores for community contributors.
        
        Args:
            user_contributions: User's contribution history
            validation_history: History of validation outcomes for user's contributions
            scoring_criteria: Criteria for reputation scoring
            
        Returns:
            Reputation score calculation and analysis
        """
        prompt = f"""
        Please calculate reputation scores for community contributors based on their contribution history.
        
        User Contributions: {user_contributions}
        Validation History: {validation_history}
        Scoring Criteria: {scoring_criteria or "Use standard reputation scoring methods"}
        
        Provide comprehensive reputation analysis including:
        
        1. CONTRIBUTION QUALITY SCORE:
           - Average quality of submitted experiences
           - Consistency of high-quality contributions
           - Improvement trends over time
           - Depth and detail of submissions
        
        2. VALIDATION SUCCESS RATE:
           - Percentage of contributions that were verified
           - Ratio of verified to disputed submissions
           - Consistency of validation outcomes
           - Improvement in validation success over time
        
        3. COMMUNITY ENGAGEMENT SCORE:
           - Participation in peer review processes
           - Quality of reviews provided to others
           - Helpfulness to other community members
           - Constructive feedback and suggestions
        
        4. EXPERTISE INDICATORS:
           - Demonstrated knowledge of immigration processes
           - Accuracy of process descriptions
           - Ability to provide helpful context and insights
           - Recognition from other community members
        
        5. TRUST METRICS:
           - Consistency of reported experiences
           - Transparency in sharing information
           - Responsiveness to validation feedback
           - Absence of suspicious or fraudulent activity
        
        6. OVERALL REPUTATION SCORE:
           - Weighted composite score (0-100)
           - Confidence level in the score
           - Score breakdown by category
           - Comparison with community averages
        
        7. REPUTATION TRENDS:
           - Score changes over time
           - Factors driving reputation changes
           - Predictions for future reputation trajectory
           - Recommendations for reputation improvement
        
        8. SCORING TRANSPARENCY:
           - Clear explanation of scoring methodology
           - Factors that positively and negatively impact scores
           - How users can improve their reputation
           - Appeals process for disputed scores
        
        Ensure the scoring system is fair, transparent, and incentivizes quality contributions.
        """
        
        response = await self.agent.arun(prompt)
        
        return {
            "reputation_analysis": response.content,
            "user_contributions": user_contributions,
            "validation_history": validation_history,
            "scoring_criteria": scoring_criteria,
            "calculation_date": datetime.now().isoformat(),
            "agent_used": "Community Validation Specialist",
        }
    
    async def generate_validation_guidelines(
        self,
        community_data_patterns: Dict[str, Any],
        validation_challenges: List[str],
        best_practices: Optional[List[str]] = None,
    ) -> Dict[str, Any]:
        """
        Generate guidelines for community validation processes.
        
        Args:
            community_data_patterns: Patterns observed in community data
            validation_challenges: Common validation challenges encountered
            best_practices: Known best practices for validation
            
        Returns:
            Comprehensive validation guidelines
        """
        prompt = f"""
        Please generate comprehensive guidelines for community validation processes.
        
        Community Data Patterns: {community_data_patterns}
        Validation Challenges: {validation_challenges}
        Best Practices: {best_practices or "Incorporate industry best practices"}
        
        Provide detailed validation guidelines including:
        
        1. SUBMISSION GUIDELINES:
           - What information should be included in submissions
           - How to structure and format submissions
           - Supporting evidence requirements
           - Quality standards and expectations
        
        2. VALIDATION CRITERIA:
           - Specific criteria for evaluating submissions
           - Red flags and warning signs to watch for
           - Quality indicators and positive signals
           - Scoring rubrics and evaluation frameworks
        
        3. REVIEWER GUIDELINES:
           - Qualifications and requirements for reviewers
           - Review process and methodology
           - Objectivity and bias prevention
           - Documentation and reporting standards
        
        4. QUALITY ASSURANCE:
           - Multi-stage validation processes
           - Cross-validation and consensus building
           - Expert review escalation procedures
           - Continuous improvement mechanisms
        
        5. COMMUNITY STANDARDS:
           - Code of conduct for community members
           - Expectations for constructive participation
           - Consequences for violations or poor behavior
           - Recognition and reward systems
        
        6. DISPUTE RESOLUTION:
           - Procedures for handling validation disputes
           - Appeals process for contested decisions
           - Mediation and conflict resolution methods
           - Final arbitration procedures
        
        7. TRANSPARENCY AND TRUST:
           - Open validation process documentation
           - Clear communication of decisions and rationale
           - Regular community updates and feedback
           - Trust-building measures and initiatives
        
        8. CONTINUOUS IMPROVEMENT:
           - Regular review and update of guidelines
           - Community feedback integration
           - Performance monitoring and optimization
           - Adaptation to changing needs and challenges
        
        Create guidelines that promote quality, fairness, and community engagement.
        """
        
        response = await self.agent.arun(prompt)
        
        return {
            "validation_guidelines": response.content,
            "community_data_patterns": community_data_patterns,
            "validation_challenges": validation_challenges,
            "best_practices": best_practices,
            "guidelines_date": datetime.now().isoformat(),
            "agent_used": "Community Validation Specialist",
        }
    
    def get_agent_info(self) -> Dict[str, Any]:
        """
        Get information about this agent.
        
        Returns:
            Agent information and capabilities
        """
        return {
            "name": "Community Validation Specialist",
            "role": "Verify user-submitted immigration experiences and manage community data validation",
            "capabilities": [
                "User experience validation",
                "Outlier detection and analysis",
                "Peer review orchestration",
                "Reputation score calculation",
                "Quality assurance processes",
                "Community guideline development",
                "Trust and credibility assessment",
                "Collaborative validation workflows",
            ],
            "tools": [tool.__class__.__name__ for tool in self.tools],
            "model": self.model_name,
            "specializations": [
                "Community data validation",
                "Peer review processes",
                "Reputation systems",
                "Quality assurance",
                "Trust and credibility assessment",
                "Collaborative workflows",
            ],
        }