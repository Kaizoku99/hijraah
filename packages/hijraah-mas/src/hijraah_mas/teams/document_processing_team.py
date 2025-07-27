"""
Document Processing Team for Hijraah MAS.

This module implements a specialized team focused on comprehensive document
analysis, processing, and validation for immigration applications. The team
coordinates multiple agents to provide end-to-end document services.
"""

from typing import Dict, Any, Optional, List, Union
from datetime import datetime
import agentops
from agno.team.team import Team
from agno.models.openai import OpenAIChat
from agno.models.anthropic import Claude
from agno.tools.reasoning import ReasoningTools

from ..agents.document_analysis_agent import DocumentAnalysisAgent
from ..agents.community_validation_agent import CommunityValidationAgent
from ..agents.prediction_agent import PredictionAgent
from ..config.settings import settings


class DocumentProcessingTeam:
    """
    Specialized team for comprehensive document processing and validation.
    
    This team orchestrates agents to provide:
    - Multi-modal document analysis and extraction
    - Document quality assessment and validation
    - Community-based document verification
    - Compliance checking and recommendations
    - Predictive analysis for document success rates
    """
    
    def __init__(
        self,
        supabase_url: Optional[str] = None,
        supabase_key: Optional[str] = None,
        team_model: str = "gpt-4o",  # Use GPT-4o for multimodal capabilities
        enable_agentops: bool = True,
    ):
        """
        Initialize the Document Processing Team.
        
        Args:
            supabase_url: Supabase project URL (defaults to settings)
            supabase_key: Supabase service key (defaults to settings)
            team_model: AI model for team coordination (GPT-4o for multimodal)
            enable_agentops: Whether to enable AgentOps monitoring
        """
        self.supabase_url = supabase_url or settings.supabase_url
        self.supabase_key = supabase_key or settings.supabase_key
        self.team_model = team_model
        
        # Initialize AgentOps monitoring if enabled
        if enable_agentops:
            agentops.init()
        
        # Initialize specialized agents for document processing
        self.document_analyzer = DocumentAnalysisAgent(
            supabase_url=self.supabase_url,
            supabase_key=self.supabase_key,
            model_name="gpt-4o",  # Use multimodal model for document analysis
        ).agent
        
        self.community_validator = CommunityValidationAgent(
            supabase_url=self.supabase_url,
            supabase_key=self.supabase_key,
        ).agent
        
        self.prediction_agent = PredictionAgent(
            supabase_url=self.supabase_url,
            supabase_key=self.supabase_key,
        ).agent
        
        # Create the specialized document processing team
        self.team = Team(
            name="Document Processing Team",
            mode="coordinate",
            model=self._get_team_model(),
            members=[
                self.document_analyzer,
                self.community_validator,
                self.prediction_agent,
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
        """Get comprehensive instructions for document processing team coordination."""
        return [
            "You are the coordinator of a specialized document processing team consisting of:",
            "- Document Analysis Specialist: Analyzes and extracts information from documents",
            "- Community Validation Specialist: Validates documents against community standards",
            "- Prediction Specialist: Predicts document success rates and processing outcomes",
            "",
            "TEAM MISSION:",
            "Provide comprehensive document processing, analysis, and validation services",
            "to ensure immigration documents meet all requirements and maximize success rates.",
            "",
            "COORDINATION PRINCIPLES:",
            "1. Ensure 95%+ accuracy in document analysis and extraction",
            "2. Validate all documents against official requirements and community standards",
            "3. Provide predictive analysis for document success rates",
            "4. Generate actionable recommendations for document improvement",
            "5. Maintain strict quality control and compliance standards",
            "6. Support multiple document formats and languages",
            "",
            "WORKFLOW ORCHESTRATION:",
            "1. Document Analysis Specialist processes and analyzes documents",
            "2. Community Validation Specialist validates against standards and experiences",
            "3. Prediction Specialist assesses success probability and outcomes",
            "4. Synthesize findings into comprehensive document assessment",
            "5. Generate improvement recommendations and action plans",
            "",
            "PROCESSING FRAMEWORK:",
            "- Document Ingestion: Accept and process multiple document formats",
            "- Content Extraction: Extract structured information with high accuracy",
            "- Quality Assessment: Evaluate document quality and completeness",
            "- Compliance Checking: Verify against official requirements",
            "- Community Validation: Cross-reference with community experiences",
            "- Predictive Analysis: Assess success probability and processing outcomes",
            "",
            "QUALITY STANDARDS:",
            "- Maintain 95%+ accuracy in text extraction and analysis",
            "- Provide confidence scores for all extracted information",
            "- Flag uncertain or ambiguous content for manual review",
            "- Ensure compliance with official document format requirements",
            "- Validate against community-verified document standards",
            "",
            "RESPONSE PRIORITIES:",
            "1. Critical compliance issues requiring immediate attention",
            "2. Quality issues affecting document acceptability",
            "3. Missing information or incomplete documentation",
            "4. Optimization opportunities for improved success rates",
            "5. Process improvements and efficiency recommendations",
        ]
    
    def _get_success_criteria(self) -> str:
        """Define success criteria for document processing operations."""
        return (
            "The team has successfully processed, analyzed, and validated documents "
            "with 95%+ accuracy, provided comprehensive compliance assessment, "
            "generated actionable improvement recommendations, and predicted success outcomes."
        )
    
    async def process_document_set(
        self,
        documents: List[Dict[str, Any]],
        immigration_context: Dict[str, Any],
        processing_level: str = "comprehensive",
    ) -> Dict[str, Any]:
        """
        Process a complete set of immigration documents.
        
        Args:
            documents: List of documents to process
            immigration_context: Context about the immigration application
            processing_level: Level of processing (quick, standard, comprehensive)
            
        Returns:
            Comprehensive document processing results
        """
        prompt_parts = [
            "DOCUMENT PROCESSING REQUEST",
            "=" * 30,
            f"Documents to Process: {len(documents)} documents",
            f"Immigration Context: {immigration_context}",
            f"Processing Level: {processing_level}",
            "",
            f"Document Details: {documents}",
        ]
        
        prompt_parts.extend([
            "",
            "Please provide comprehensive document processing including:",
            "",
            "1. DOCUMENT ANALYSIS:",
            "   - Extract structured information from all documents",
            "   - Identify document types and classifications",
            "   - Assess document quality and readability",
            "   - Flag any issues or concerns",
            "",
            "2. COMPLIANCE VALIDATION:",
            "   - Verify against official requirements",
            "   - Check document formats and standards",
            "   - Identify missing or incomplete information",
            "   - Assess certification and authentication needs",
            "",
            "3. COMMUNITY VALIDATION:",
            "   - Cross-reference with community experiences",
            "   - Validate document interpretations",
            "   - Assess document quality against community standards",
            "   - Identify potential issues based on community feedback",
            "",
            "4. SUCCESS PREDICTION:",
            "   - Predict document acceptance probability",
            "   - Assess impact on overall application success",
            "   - Identify optimization opportunities",
            "   - Provide confidence intervals for predictions",
            "",
            "5. IMPROVEMENT RECOMMENDATIONS:",
            "   - Specific actions to improve document quality",
            "   - Missing documents or information to obtain",
            "   - Format or presentation improvements",
            "   - Timeline for implementing improvements",
            "",
            "Coordinate all team members to provide comprehensive analysis.",
        ])
        
        full_prompt = "\n".join(prompt_parts)
        
        response = await self.team.arun(full_prompt)
        
        return {
            "processing_results": response.content,
            "documents_processed": len(documents),
            "immigration_context": immigration_context,
            "processing_level": processing_level,
            "processing_date": datetime.now().isoformat(),
            "team_coordinator": "Document Processing Team",
        }
    
    async def validate_document_compliance(
        self,
        documents: List[Dict[str, Any]],
        requirements: Dict[str, Any],
        target_country: str,
        immigration_category: str,
    ) -> Dict[str, Any]:
        """
        Validate document compliance against official requirements.
        
        Args:
            documents: Documents to validate
            requirements: Official requirements to validate against
            target_country: Target country for immigration
            immigration_category: Specific immigration category
            
        Returns:
            Comprehensive compliance validation results
        """
        prompt = f"""
        DOCUMENT COMPLIANCE VALIDATION REQUEST
        =====================================
        
        Documents: {documents}
        Requirements: {requirements}
        Target Country: {target_country}
        Immigration Category: {immigration_category}
        
        Please provide comprehensive compliance validation including:
        
        1. DOCUMENT ANALYSIS:
           - Complete analysis of all provided documents
           - Extraction of key information and data points
           - Assessment of document quality and authenticity
           - Identification of potential issues or concerns
        
        2. COMPLIANCE ASSESSMENT:
           - Verification against official requirements
           - Identification of compliant and non-compliant elements
           - Assessment of document format and presentation standards
           - Evaluation of certification and authentication status
        
        3. COMMUNITY VALIDATION:
           - Cross-reference with community experiences and standards
           - Validation of document interpretations and requirements
           - Assessment against community-verified best practices
           - Identification of common issues and solutions
        
        4. SUCCESS PREDICTION:
           - Probability assessment for document acceptance
           - Impact analysis on overall application success
           - Risk assessment for potential rejections or delays
           - Confidence intervals for all predictions
        
        5. GAP ANALYSIS:
           - Identification of missing documents or information
           - Assessment of incomplete or inadequate documentation
           - Prioritization of gaps by importance and urgency
           - Timeline estimates for addressing gaps
        
        6. IMPROVEMENT ROADMAP:
           - Specific actions to achieve full compliance
           - Priority ranking of improvement activities
           - Resource requirements and cost estimates
           - Timeline for implementing improvements
        
        Ensure all team members contribute their specialized expertise.
        """
        
        response = await self.team.arun(prompt)
        
        return {
            "compliance_validation": response.content,
            "documents": documents,
            "requirements": requirements,
            "target_country": target_country,
            "immigration_category": immigration_category,
            "validation_date": datetime.now().isoformat(),
            "team_coordinator": "Document Processing Team",
        }
    
    async def optimize_document_quality(
        self,
        current_documents: List[Dict[str, Any]],
        quality_targets: Dict[str, Any],
        optimization_goals: List[str],
    ) -> Dict[str, Any]:
        """
        Optimize document quality to meet specific targets and goals.
        
        Args:
            current_documents: Current document set to optimize
            quality_targets: Target quality metrics to achieve
            optimization_goals: Specific optimization objectives
            
        Returns:
            Document quality optimization plan and recommendations
        """
        prompt = f"""
        DOCUMENT QUALITY OPTIMIZATION REQUEST
        ====================================
        
        Current Documents: {current_documents}
        Quality Targets: {quality_targets}
        Optimization Goals: {optimization_goals}
        
        Please provide comprehensive quality optimization including:
        
        1. CURRENT STATE ANALYSIS:
           - Assessment of current document quality levels
           - Identification of quality gaps and deficiencies
           - Benchmarking against quality targets
           - Analysis of improvement potential
        
        2. COMMUNITY BENCHMARKING:
           - Comparison with community-validated quality standards
           - Assessment against successful document examples
           - Identification of best practices and common patterns
           - Analysis of quality factors that correlate with success
        
        3. PREDICTIVE OPTIMIZATION:
           - Modeling of quality improvements on success probability
           - Cost-benefit analysis of different optimization strategies
           - Timeline predictions for achieving quality targets
           - Risk assessment for optimization approaches
        
        4. OPTIMIZATION STRATEGY:
           - Prioritized list of quality improvement actions
           - Resource requirements for each improvement
           - Timeline and sequencing of optimization activities
           - Expected impact of each optimization step
        
        5. IMPLEMENTATION PLAN:
           - Detailed action plan for quality improvements
           - Milestone tracking and progress monitoring
           - Quality assurance and validation checkpoints
           - Contingency plans for optimization challenges
        
        6. SUCCESS METRICS:
           - Key performance indicators for optimization success
           - Measurement methods and validation criteria
           - Progress tracking and reporting mechanisms
           - Continuous improvement recommendations
        
        Leverage all team expertise for comprehensive optimization planning.
        """
        
        response = await self.team.arun(prompt)
        
        return {
            "optimization_plan": response.content,
            "current_documents": current_documents,
            "quality_targets": quality_targets,
            "optimization_goals": optimization_goals,
            "plan_date": datetime.now().isoformat(),
            "team_coordinator": "Document Processing Team",
        }
    
    async def extract_structured_data(
        self,
        documents: List[Dict[str, Any]],
        extraction_schema: Dict[str, Any],
        validation_requirements: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """
        Extract structured data from documents using specified schema.
        
        Args:
            documents: Documents to extract data from
            extraction_schema: Schema defining data structure to extract
            validation_requirements: Requirements for validating extracted data
            
        Returns:
            Structured data extraction results with validation
        """
        prompt = f"""
        STRUCTURED DATA EXTRACTION REQUEST
        =================================
        
        Documents: {documents}
        Extraction Schema: {extraction_schema}
        Validation Requirements: {validation_requirements or "Standard validation"}
        
        Please provide comprehensive structured data extraction including:
        
        1. DATA EXTRACTION:
           - Extract structured data according to the provided schema
           - Maintain data types and format requirements
           - Handle missing or incomplete information appropriately
           - Provide confidence scores for extracted data points
        
        2. COMMUNITY VALIDATION:
           - Validate extracted data against community standards
           - Cross-reference with similar document extractions
           - Identify potential extraction errors or inconsistencies
           - Assess data quality and reliability
        
        3. PREDICTIVE VALIDATION:
           - Assess probability of data accuracy and completeness
           - Predict impact of data quality on application success
           - Identify high-risk data points requiring verification
           - Provide confidence intervals for critical data
        
        4. QUALITY ASSURANCE:
           - Verify data consistency across multiple documents
           - Check for logical inconsistencies or contradictions
           - Validate data against known patterns and standards
           - Flag uncertain or ambiguous extractions
        
        5. IMPROVEMENT RECOMMENDATIONS:
           - Suggestions for improving data extraction accuracy
           - Recommendations for additional data sources
           - Strategies for handling missing or incomplete data
           - Process improvements for future extractions
        
        Ensure high accuracy and reliability in all extracted data.
        """
        
        response = await self.team.arun(prompt)
        
        return {
            "extraction_results": response.content,
            "documents": documents,
            "extraction_schema": extraction_schema,
            "validation_requirements": validation_requirements,
            "extraction_date": datetime.now().isoformat(),
            "team_coordinator": "Document Processing Team",
        }
    
    def get_team_info(self) -> Dict[str, Any]:
        """
        Get information about the document processing team.
        
        Returns:
            Team information and capabilities
        """
        return {
            "name": "Document Processing Team",
            "description": "Specialized team for comprehensive document processing and validation",
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
                "Multi-modal document analysis",
                "Structured data extraction",
                "Document quality assessment",
                "Compliance validation",
                "Community-based verification",
                "Success probability prediction",
                "Quality optimization planning",
                "OCR and text extraction",
            ],
            "tools": [
                "Reasoning Tools",
                "Document Processing Tools",
                "OCR Tools",
                "Supabase Integration",
                "Vector Search",
                "Community Validation",
            ],
            "success_criteria": self._get_success_criteria(),
        }
    
    async def health_check(self) -> Dict[str, Any]:
        """
        Perform a health check on the document processing team.
        
        Returns:
            Health status of the team
        """
        try:
            # Test basic team functionality
            test_response = await self.team.arun("Perform a quick document processing system check and confirm all agents are operational.")
            
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