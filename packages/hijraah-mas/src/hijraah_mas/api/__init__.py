"""
FastAPI gateway for the Hijraah Multi-Agent System.

This module provides RESTful API endpoints for interacting with the MAS:
- Immigration analysis endpoints
- Policy monitoring endpoints  
- Document processing endpoints
- Health checks and monitoring
"""

from .main import app

__all__ = ["app"]