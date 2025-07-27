"""
FastAPI main application for Hijraah MAS using latest Agno patterns.

This module provides the main FastAPI application with comprehensive
immigration advisory endpoints powered by Agno multi-agent teams.
"""

from fastapi import FastAPI, HTTPException, BackgroundTasks, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from typing import Dict, Any, Optional, List
import agentops
import asyncio
from datetime import datetime
import json
import logging

from ..teams.immigration_team import ImmigrationTeam
from ..teams.policy_monitoring_team import PolicyMonitoringTeam
from ..teams.document_processing_team import DocumentProcessingTeam
from ..config.settings import settings

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize AgentOps for monitoring
agentops.init()

# Create FastAPI app with comprehensive configuration
app = FastAPI(
    title="Hijraah Multi-Agent System API",
    description="AI-powered immigration advisory system using Agno multi-agent teams",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

# CORS middleware for Turborepo integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001", 
        "https://hijraah.com",
        "https://*.hijraah.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize agent teams
immigration_team = ImmigrationTeam(
    supabase_url=settings.supabase_url,
    supabase_key=settings.supabase_key,
    enable_agentops=True,
)

policy_team = PolicyMonitoringTeam(
    supabase_url=settings.supabase_url,
    supabase_key=settings.supabase_key,
    enable_agentops=True,
)

document_team = DocumentProcessingTeam(
    supabase_url=settings.supabase_url,
    supabase_key=settings.supabase_key,
    enable_agentops=True,
)


# Pydantic models for API requests/responses
class ImmigrationQuery(BaseModel):
    user_id: str = Field(..., description="Unique user identifier")
    query: str = Field(..., description="Immigration question or scenario")
    user_profile: Dict[str, Any] = Field(..., description="User profile information")
    context: Optional[Dict[str, Any]] = Field(None, description="Additional context")
    analysis_type: str = Field("comprehensive", description="Type of analysis requested")


class ImmigrationResponse(BaseModel):
    analysis: str = Field(..., description="Comprehensive immigration analysis")
    team_members_used: List[str] = Field(..., description="Agents that contributed")
    confidence_score: float = Field(..., description="Confidence in the analysis")
    generated_at: str = Field(..., description="Timestamp of generation")
    query_processed: str = Field(..., description="Original query")
    recommendations: Optional[List[str]] = Field(None, description="Key recommendations")


class PolicyMonitoringRequest(BaseModel):
    countries: List[str] = Field(..., description="Countries to monitor")
    monitoring_period: str = Field("24 hours", description="Time period for monitoring")
    priority_areas: Optional[List[str]] = Field(None, description="Priority policy areas")
    alert_threshold: str = Field("moderate", description="Alert threshold level")


class DocumentProcessingRequest(BaseModel):
    documents: List[Dict[str, Any]] = Field(..., description="Documents to process")
    immigration_context: Dict[str, Any] = Field(..., description="Immigration context")
    processing_level: str = Field("comprehensive", description="Processing depth")
    validation_required: bool = Field(True, description="Whether validation is required")


class HealthResponse(BaseModel):
    status: str = Field(..., description="System health status")
    timestamp: str = Field(..., description="Health check timestamp")
    teams_status: Dict[str, Any] = Field(..., description="Individual team health")
    version: str = Field(..., description="API version")


# Health check endpoint
@app.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Comprehensive health check for the MAS system.
    """
    try:
        # Check individual team health
        immigration_health = await immigration_team.health_check()
        policy_health = await policy_team.health_check()
        document_health = await document_team.health_check()
        
        overall_status = "healthy" if all([
            immigration_health.get("status") == "healthy",
            policy_health.get("status") == "healthy", 
            document_health.get("status") == "healthy",
        ]) else "degraded"
        
        return HealthResponse(
            status=overall_status,
            timestamp=datetime.now().isoformat(),
            teams_status={
                "immigration_team": immigration_health,
                "policy_team": policy_health,
                "document_team": document_health,
            },
            version="2.0.0",
        )
        
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Health check failed: {str(e)}")


# Immigration analysis endpoint
@app.post("/api/v2/immigration/analyze", response_model=ImmigrationResponse)
async def analyze_immigration_query(request: ImmigrationQuery):
    """
    Comprehensive immigration analysis using the full agent team.
    """
    try:
        logger.info(f"Processing immigration query for user {request.user_id}")
        
        # Process query with immigration team
        result = await immigration_team.process_immigration_query(
            user_data=request.user_profile,
            query=request.query,
            context=request.context,
        )
        
        if not result.get("success", True):
            raise HTTPException(status_code=500, detail="Analysis failed")
        
        # Extract recommendations from analysis
        recommendations = _extract_recommendations(result.get("analysis", ""))
        
        return ImmigrationResponse(
            analysis=result.get("analysis", ""),
            team_members_used=result.get("team_members_used", []),
            confidence_score=result.get("confidence_score", 0.0),
            generated_at=result.get("generated_at", datetime.now().isoformat()),
            query_processed=request.query,
            recommendations=recommendations,
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing immigration query: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


# Policy monitoring endpoint
@app.post("/api/v2/policy/monitor")
async def monitor_policy_changes(request: PolicyMonitoringRequest):
    """
    Monitor immigration policy changes across specified countries.
    """
    try:
        logger.info(f"Monitoring policy changes for countries: {request.countries}")
        
        result = await policy_team.monitor_policy_changes(
            countries=request.countries,
            monitoring_period=request.monitoring_period,
            priority_areas=request.priority_areas,
        )
        
        return {
            "success": True,
            "monitoring_report": result,
            "processed_at": datetime.now().isoformat(),
        }
        
    except Exception as e:
        logger.error(f"Error monitoring policy changes: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Policy monitoring failed: {str(e)}")


# Document processing endpoint
@app.post("/api/v2/documents/process")
async def process_documents(request: DocumentProcessingRequest):
    """
    Process immigration documents with comprehensive analysis.
    """
    try:
        logger.info(f"Processing {len(request.documents)} documents")
        
        result = await document_team.process_document_set(
            documents=request.documents,
            immigration_context=request.immigration_context,
            processing_level=request.processing_level,
        )
        
        return {
            "success": True,
            "processing_results": result,
            "processed_at": datetime.now().isoformat(),
        }
        
    except Exception as e:
        logger.error(f"Error processing documents: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Document processing failed: {str(e)}")


# Streaming analysis endpoint
@app.post("/api/v2/immigration/analyze/stream")
async def stream_immigration_analysis(request: ImmigrationQuery):
    """
    Stream immigration analysis results in real-time.
    """
    async def generate_stream():
        try:
            # This would integrate with Agno's streaming capabilities
            yield f"data: {json.dumps({'status': 'starting', 'message': 'Initializing analysis...'})}\n\n"
            
            # Process with team (placeholder for streaming integration)
            result = await immigration_team.process_immigration_query(
                user_data=request.user_profile,
                query=request.query,
                context=request.context,
            )
            
            yield f"data: {json.dumps({'status': 'complete', 'result': result})}\n\n"
            
        except Exception as e:
            yield f"data: {json.dumps({'status': 'error', 'error': str(e)})}\n\n"
    
    return StreamingResponse(
        generate_stream(),
        media_type="text/plain",
        headers={"Cache-Control": "no-cache", "Connection": "keep-alive"},
    )


# Team information endpoints
@app.get("/api/v2/teams/info")
async def get_teams_info():
    """
    Get information about all available agent teams.
    """
    return {
        "teams": {
            "immigration_team": immigration_team.get_team_info(),
            "policy_team": policy_team.get_team_info(),
            "document_team": document_team.get_team_info(),
        },
        "total_teams": 3,
        "retrieved_at": datetime.now().isoformat(),
    }


# Background task for policy monitoring
@app.post("/api/v2/policy/monitor/background")
async def start_background_policy_monitoring(
    request: PolicyMonitoringRequest,
    background_tasks: BackgroundTasks
):
    """
    Start background policy monitoring task.
    """
    background_tasks.add_task(
        _background_policy_monitoring,
        request.countries,
        request.monitoring_period,
        request.priority_areas,
    )
    
    return {
        "success": True,
        "message": "Background policy monitoring started",
        "countries": request.countries,
        "started_at": datetime.now().isoformat(),
    }


# Prediction endpoints
@app.post("/api/v2/predictions/success")
async def predict_success_probability(
    user_profile: Dict[str, Any],
    immigration_pathway: Dict[str, Any],
    context: Optional[Dict[str, Any]] = None
):
    """
    Predict immigration success probability using ML models.
    """
    try:
        # This would integrate with the ML prediction tools
        from ..tools.ml_prediction_tools import predict_immigration_success
        
        result = predict_immigration_success(
            user_profile=user_profile,
            immigration_pathway=immigration_pathway,
            historical_data_context=context,
        )
        
        return {
            "success": True,
            "prediction": result,
            "predicted_at": datetime.now().isoformat(),
        }
        
    except Exception as e:
        logger.error(f"Error predicting success: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@app.post("/api/v2/predictions/timeline")
async def predict_processing_timeline(
    user_profile: Dict[str, Any],
    immigration_pathway: Dict[str, Any],
    processing_data: Optional[Dict[str, Any]] = None
):
    """
    Predict immigration processing timeline.
    """
    try:
        from ..tools.ml_prediction_tools import estimate_processing_timeline
        
        result = estimate_processing_timeline(
            user_profile=user_profile,
            immigration_pathway=immigration_pathway,
            current_processing_data=processing_data,
        )
        
        return {
            "success": True,
            "timeline_estimate": result,
            "estimated_at": datetime.now().isoformat(),
        }
        
    except Exception as e:
        logger.error(f"Error estimating timeline: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Timeline estimation failed: {str(e)}")


# Error handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return {
        "error": exc.detail,
        "status_code": exc.status_code,
        "timestamp": datetime.now().isoformat(),
    }


@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    logger.error(f"Unhandled exception: {str(exc)}")
    return {
        "error": "Internal server error",
        "status_code": 500,
        "timestamp": datetime.now().isoformat(),
    }


# Helper functions
def _extract_recommendations(analysis: str) -> List[str]:
    """Extract key recommendations from analysis text."""
    # Placeholder implementation - would use NLP to extract recommendations
    return [
        "Review document requirements carefully",
        "Consider premium processing if available",
        "Prepare for potential additional evidence requests",
    ]


async def _background_policy_monitoring(
    countries: List[str],
    period: str,
    priority_areas: Optional[List[str]]
):
    """Background task for continuous policy monitoring."""
    try:
        logger.info(f"Starting background monitoring for {countries}")
        
        result = await policy_team.monitor_policy_changes(
            countries=countries,
            monitoring_period=period,
            priority_areas=priority_areas,
        )
        
        # Process results and send notifications if needed
        logger.info(f"Background monitoring completed: {result.get('total_changes', 0)} changes detected")
        
    except Exception as e:
        logger.error(f"Background monitoring failed: {str(e)}")


# Startup event
@app.on_event("startup")
async def startup_event():
    """Initialize the application on startup."""
    logger.info("Starting Hijraah MAS API v2.0.0")
    logger.info("Agno multi-agent teams initialized successfully")


# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    """Clean up resources on shutdown."""
    logger.info("Shutting down Hijraah MAS API")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
    )