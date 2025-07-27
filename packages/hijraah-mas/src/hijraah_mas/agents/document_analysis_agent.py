"""
Document Analysis Agent for Hijraah MAS.

This agent specializes in analyzing and extracting information from immigration documents.
It can process various document types, perform OCR, extract structured data,
and provide recommendations for document preparation and compliance.
"""

from typing import Dict, Any, Optional, List, Union
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.models.anthropic import Claude

from ..tools.supabase_tools import SupabaseTools
from ..tools.document_processing_tools import DocumentProcessingTools
from ..tools.ocr_tools import OCRTools
from ..config.settings import settings


class DocumentAnalysisAgent:
    """
    Document analysis specialist agent for immigration document processing.
    
    This agent provides comprehensive document analysis by:
    - Analyzing immigration documents and forms
    - Extracting structured information from unstructured documents
    - Identifying missing or incomplete documentation
    - Providing recommendations for document preparation
    - Ensuring compliance with official document requirements
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
        Initialize the Document Analysis Agent.
        
        Args:
            supabase_url: Supabase project URL (defaults to settings)
            supabase_key: Supabase service key (defaults to settings)
            model_name: AI model to use (defaults to gpt-4o for multimodal capabilities)
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
            DocumentProcessingTools(),
            OCRTools(),
        ]
        
        # Initialize the agent
        self.agent = Agent(
            name="Document Analysis Specialist",
            role="Analyze and extract information from immigration documents",
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
        """Get detailed instructions for the document analysis agent."""
        return [
            "You are a specialized document analysis expert with deep knowledge of immigration documents, forms, and requirements.",
            "Your expertise covers document types from multiple countries and jurisdictions, with focus on accuracy and compliance.",
            "",
            "CORE RESPONSIBILITIES:",
            "- Analyze immigration documents and forms with high accuracy",
            "- Extract structured information from unstructured documents",
            "- Identify missing or incomplete documentation",
            "- Provide recommendations for document preparation",
            "- Ensure compliance with official document requirements",
            "- Validate document authenticity and completeness",
            "",
            "DOCUMENT TYPES EXPERTISE:",
            "- Passports and travel documents",
            "- Birth certificates and civil documents",
            "- Educational credentials and transcripts",
            "- Employment letters and contracts",
            "- Financial statements and bank records",
            "- Medical examination reports",
            "- Police clearance certificates",
            "- Immigration forms and applications",
            "- Supporting evidence documents",
            "",
            "ANALYSIS METHODOLOGY:",
            "1. Document Identification: Determine document type and purpose",
            "2. Content Extraction: Extract all relevant information accurately",
            "3. Structure Analysis: Organize information into logical categories",
            "4. Completeness Check: Identify missing or incomplete sections",
            "5. Compliance Verification: Check against official requirements",
            "6. Quality Assessment: Evaluate document quality and acceptability",
            "7. Recommendation Generation: Provide specific improvement suggestions",
            "",
            "EXTRACTION STANDARDS:",
            "- Maintain 95%+ accuracy in text extraction",
            "- Preserve original formatting and structure where relevant",
            "- Handle multiple languages and character sets",
            "- Identify and flag unclear or ambiguous content",
            "- Extract dates, numbers, and names with high precision",
            "- Maintain data privacy and security standards",
            "",
            "QUALITY INDICATORS:",
            "- Document clarity and readability",
            "- Completeness of required information",
            "- Consistency with official formats",
            "- Presence of required signatures and seals",
            "- Currency and validity of information",
            "- Translation quality (if applicable)",
            "",
            "COMPLIANCE FRAMEWORK:",
            "- Official document format requirements",
            "- Jurisdiction-specific standards",
            "- Translation and certification requirements",
            "- Notarization and authentication needs",
            "- Expiry dates and validity periods",
            "- Supporting evidence requirements",
        ]
    
    async def analyze_document(
        self,
        document_data: Union[str, bytes, Dict[str, Any]],
        document_type: Optional[str] = None,
        target_country: Optional[str] = None,
        purpose: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Analyze a single immigration document.
        
        Args:
            document_data: Document content (text, image bytes, or structured data)
            document_type: Type of document (passport, certificate, etc.)
            target_country: Target country for immigration
            purpose: Purpose of document analysis
            
        Returns:
            Comprehensive document analysis results
        """
        prompt_parts = [
            "Please analyze this immigration document and provide a comprehensive analysis.",
        ]
        
        if document_type:
            prompt_parts.append(f"Document Type: {document_type}")
        
        if target_country:
            prompt_parts.append(f"Target Country: {target_country}")
        
        if purpose:
            prompt_parts.append(f"Analysis Purpose: {purpose}")
        
        prompt_parts.extend([
            "",
            "Provide analysis including:",
            "1. Document Identification:",
            "   - Document type and category",
            "   - Issuing authority and jurisdiction",
            "   - Document format and version",
            "",
            "2. Content Extraction:",
            "   - Personal information (names, dates, places)",
            "   - Document numbers and identifiers",
            "   - Validity periods and expiry dates",
            "   - Relevant details and specifications",
            "",
            "3. Quality Assessment:",
            "   - Document clarity and readability (1-10 scale)",
            "   - Completeness score (percentage)",
            "   - Compliance with official formats",
            "   - Potential issues or concerns",
            "",
            "4. Compliance Check:",
            "   - Required elements present/missing",
            "   - Format compliance status",
            "   - Translation requirements",
            "   - Certification needs",
            "",
            "5. Recommendations:",
            "   - Actions needed for compliance",
            "   - Document improvements required",
            "   - Additional documents needed",
            "   - Next steps for processing",
        ])
        
        full_prompt = "\n".join(prompt_parts)
        
        # Add document data to the prompt
        if isinstance(document_data, str):
            full_prompt += f"\n\nDocument Content:\n{document_data}"
        elif isinstance(document_data, dict):
            full_prompt += f"\n\nDocument Data:\n{document_data}"
        
        response = await self.agent.arun(full_prompt)
        
        return {
            "analysis": response.content,
            "document_type": document_type,
            "target_country": target_country,
            "purpose": purpose,
            "analysis_date": response.created_at if hasattr(response, 'created_at') else None,
            "agent_used": "Document Analysis Specialist",
        }
    
    async def extract_structured_data(
        self,
        document_data: Union[str, bytes],
        extraction_schema: Dict[str, Any],
    ) -> Dict[str, Any]:
        """
        Extract structured data from a document based on a provided schema.
        
        Args:
            document_data: Document content
            extraction_schema: Schema defining what data to extract
            
        Returns:
            Extracted structured data
        """
        prompt = f"""
        Please extract structured data from this document according to the provided schema.
        
        Extraction Schema: {extraction_schema}
        
        Instructions:
        1. Extract only the data fields specified in the schema
        2. Maintain data types as specified (string, date, number, etc.)
        3. Use null/empty values for missing information
        4. Provide confidence scores (0-1) for each extracted field
        5. Flag any ambiguous or unclear information
        6. Include source location within document (if applicable)
        
        Return the extracted data in JSON format matching the schema structure.
        """
        
        if isinstance(document_data, str):
            prompt += f"\n\nDocument Content:\n{document_data}"
        
        response = await self.agent.arun(prompt)
        
        return {
            "extracted_data": response.content,
            "extraction_schema": extraction_schema,
            "extraction_date": response.created_at if hasattr(response, 'created_at') else None,
            "agent_used": "Document Analysis Specialist",
        }
    
    async def validate_document_set(
        self,
        documents: List[Dict[str, Any]],
        requirements: Dict[str, Any],
        target_country: str,
        immigration_category: str,
    ) -> Dict[str, Any]:
        """
        Validate a complete set of documents against immigration requirements.
        
        Args:
            documents: List of documents to validate
            requirements: Official requirements to validate against
            target_country: Target country for immigration
            immigration_category: Specific immigration category or visa type
            
        Returns:
            Comprehensive validation report
        """
        prompt = f"""
        Please validate this complete document set against the official requirements.
        
        Target Country: {target_country}
        Immigration Category: {immigration_category}
        
        Documents Provided: {documents}
        
        Official Requirements: {requirements}
        
        Provide a comprehensive validation report including:
        
        1. Document Checklist:
           - Required documents present ✓
           - Required documents missing ✗
           - Optional documents provided
           - Unnecessary documents included
        
        2. Individual Document Status:
           - Document name and type
           - Compliance status (Compliant/Non-compliant/Needs Review)
           - Specific issues identified
           - Recommendations for improvement
        
        3. Overall Assessment:
           - Completeness score (percentage)
           - Compliance score (percentage)
           - Readiness for submission (Yes/No/With Conditions)
           - Critical issues that must be resolved
        
        4. Action Plan:
           - Priority 1: Critical actions required
           - Priority 2: Important improvements
           - Priority 3: Optional enhancements
           - Estimated timeline for completion
        
        5. Risk Assessment:
           - Potential rejection risks
           - Delay risks
           - Mitigation strategies
        """
        
        response = await self.agent.arun(prompt)
        
        return {
            "validation_report": response.content,
            "documents_count": len(documents),
            "target_country": target_country,
            "immigration_category": immigration_category,
            "validation_date": response.created_at if hasattr(response, 'created_at') else None,
            "agent_used": "Document Analysis Specialist",
        }
    
    async def recommend_document_improvements(
        self,
        document_analysis: Dict[str, Any],
        target_standards: Dict[str, Any],
    ) -> Dict[str, Any]:
        """
        Recommend specific improvements for documents to meet target standards.
        
        Args:
            document_analysis: Previous document analysis results
            target_standards: Target standards to meet
            
        Returns:
            Detailed improvement recommendations
        """
        prompt = f"""
        Based on the document analysis results, please provide specific recommendations
        for improving the documents to meet the target standards.
        
        Document Analysis: {document_analysis}
        Target Standards: {target_standards}
        
        Provide detailed recommendations including:
        
        1. Quality Improvements:
           - Image/scan quality enhancements needed
           - Formatting corrections required
           - Clarity improvements
        
        2. Content Completeness:
           - Missing information to add
           - Incomplete sections to complete
           - Additional details needed
        
        3. Compliance Enhancements:
           - Format adjustments required
           - Official requirements to address
           - Certification needs
        
        4. Translation Requirements:
           - Documents needing translation
           - Certified translation requirements
           - Language-specific considerations
        
        5. Implementation Guide:
           - Step-by-step improvement process
           - Resources and tools needed
           - Estimated time and cost
           - Professional services recommended
        
        6. Quality Assurance:
           - Verification steps
           - Review checkpoints
           - Final validation process
        """
        
        response = await self.agent.arun(prompt)
        
        return {
            "improvement_recommendations": response.content,
            "document_analysis": document_analysis,
            "target_standards": target_standards,
            "recommendation_date": response.created_at if hasattr(response, 'created_at') else None,
            "agent_used": "Document Analysis Specialist",
        }
    
    async def detect_document_issues(
        self,
        document_data: Union[str, bytes],
        issue_types: Optional[List[str]] = None,
    ) -> Dict[str, Any]:
        """
        Detect potential issues in immigration documents.
        
        Args:
            document_data: Document content to analyze
            issue_types: Specific types of issues to look for
            
        Returns:
            Detected issues and recommendations
        """
        if not issue_types:
            issue_types = [
                "quality_issues",
                "completeness_issues", 
                "format_issues",
                "authenticity_concerns",
                "compliance_issues",
            ]
        
        prompt = f"""
        Please analyze this document for potential issues that could affect immigration processing.
        
        Focus on these issue types: {', '.join(issue_types)}
        
        For each issue found, provide:
        1. Issue Type and Category
        2. Severity Level (Critical, High, Medium, Low)
        3. Detailed Description
        4. Potential Impact on Application
        5. Recommended Resolution
        6. Prevention Strategies
        
        Common issues to check for:
        - Poor image quality or unclear text
        - Missing required information
        - Inconsistent information across documents
        - Expired or invalid documents
        - Incorrect format or structure
        - Missing signatures or seals
        - Translation issues
        - Certification problems
        """
        
        if isinstance(document_data, str):
            prompt += f"\n\nDocument Content:\n{document_data}"
        
        response = await self.agent.arun(prompt)
        
        return {
            "issue_detection": response.content,
            "issue_types_checked": issue_types,
            "detection_date": response.created_at if hasattr(response, 'created_at') else None,
            "agent_used": "Document Analysis Specialist",
        }
    
    def get_agent_info(self) -> Dict[str, Any]:
        """
        Get information about this agent.
        
        Returns:
            Agent information and capabilities
        """
        return {
            "name": "Document Analysis Specialist",
            "role": "Analyze and extract information from immigration documents",
            "capabilities": [
                "Document analysis and extraction",
                "OCR and text recognition",
                "Structured data extraction",
                "Document validation",
                "Compliance checking",
                "Quality assessment",
                "Issue detection",
                "Improvement recommendations",
            ],
            "tools": [tool.__class__.__name__ for tool in self.tools],
            "model": self.model_name,
            "specializations": [
                "Immigration document types",
                "Multi-language document processing",
                "Official format compliance",
                "Document quality assessment",
                "Structured data extraction",
                "Validation and verification",
            ],
        }