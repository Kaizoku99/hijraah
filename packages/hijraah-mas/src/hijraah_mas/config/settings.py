"""
Configuration settings for Hijraah MAS.

This module handles all configuration management using Pydantic settings
with support for environment variables and .env files.
"""

import os
from typing import Optional, List, Dict, Any
from pydantic import BaseSettings, Field, validator
from pydantic.env_settings import SettingsSourceCallable
from functools import lru_cache


class Settings(BaseSettings):
    """
    Application settings with environment variable support.
    
    All settings can be overridden via environment variables.
    """
    
    # Application Settings
    app_name: str = Field(default="Hijraah MAS", description="Application name")
    app_version: str = Field(default="0.1.0", description="Application version")
    debug: bool = Field(default=False, description="Debug mode")
    environment: str = Field(default="development", description="Environment (development, staging, production)")
    
    # API Settings
    host: str = Field(default="0.0.0.0", description="API host")
    port: int = Field(default=8000, description="API port")
    reload: bool = Field(default=False, description="Auto-reload on code changes")
    workers: int = Field(default=1, description="Number of worker processes")
    
    # Supabase Configuration
    supabase_url: str = Field(..., description="Supabase project URL")
    supabase_key: str = Field(..., description="Supabase service role key")
    supabase_jwt_secret: Optional[str] = Field(default=None, description="Supabase JWT secret")
    
    # Database Configuration
    database_url: Optional[str] = Field(default=None, description="Database URL (if different from Supabase)")
    database_pool_size: int = Field(default=10, description="Database connection pool size")
    database_max_overflow: int = Field(default=20, description="Database max overflow connections")
    
    # Redis Configuration
    redis_url: str = Field(default="redis://localhost:6379", description="Redis URL for caching")
    redis_db: int = Field(default=0, description="Redis database number")
    redis_password: Optional[str] = Field(default=None, description="Redis password")
    
    # AI Model Configuration
    openai_api_key: str = Field(..., description="OpenAI API key")
    anthropic_api_key: Optional[str] = Field(default=None, description="Anthropic API key for Claude")
    default_model: str = Field(default="gpt-4o", description="Default AI model")
    max_tokens: int = Field(default=4000, description="Maximum tokens per request")
    temperature: float = Field(default=0.1, description="AI model temperature")
    
    # AgentOps Configuration
    agentops_api_key: Optional[str] = Field(default=None, description="AgentOps API key for monitoring")
    agentops_enabled: bool = Field(default=True, description="Enable AgentOps monitoring")
    
    # Logging Configuration
    log_level: str = Field(default="INFO", description="Logging level")
    log_format: str = Field(default="json", description="Log format (json, text)")
    log_file: Optional[str] = Field(default=None, description="Log file path")
    
    # Security Configuration
    secret_key: str = Field(default="your-secret-key-change-in-production", description="Secret key for JWT")
    access_token_expire_minutes: int = Field(default=30, description="Access token expiration in minutes")
    cors_origins: List[str] = Field(
        default=["http://localhost:3000", "https://hijraah.com"],
        description="CORS allowed origins"
    )
    
    # Agent Configuration
    agent_timeout: int = Field(default=300, description="Agent timeout in seconds")
    max_concurrent_agents: int = Field(default=10, description="Maximum concurrent agents")
    agent_retry_attempts: int = Field(default=3, description="Number of retry attempts for failed agent calls")
    agent_retry_delay: float = Field(default=1.0, description="Delay between retry attempts in seconds")
    
    # Tool Configuration
    tool_timeout: int = Field(default=60, description="Tool timeout in seconds")
    enable_web_search: bool = Field(default=True, description="Enable web search tools")
    enable_document_processing: bool = Field(default=True, description="Enable document processing tools")
    
    # Vector Database Configuration
    vector_db_url: Optional[str] = Field(default=None, description="Vector database URL")
    vector_dimension: int = Field(default=1536, description="Vector embedding dimension")
    vector_similarity_threshold: float = Field(default=0.8, description="Vector similarity threshold")
    
    # Monitoring Configuration
    enable_metrics: bool = Field(default=True, description="Enable Prometheus metrics")
    metrics_port: int = Field(default=9090, description="Metrics server port")
    health_check_interval: int = Field(default=30, description="Health check interval in seconds")
    
    # Rate Limiting Configuration
    rate_limit_requests: int = Field(default=100, description="Rate limit requests per minute")
    rate_limit_window: int = Field(default=60, description="Rate limit window in seconds")
    
    # File Storage Configuration
    upload_max_size: int = Field(default=10 * 1024 * 1024, description="Maximum upload size in bytes (10MB)")
    allowed_file_types: List[str] = Field(
        default=["pdf", "doc", "docx", "txt", "jpg", "jpeg", "png"],
        description="Allowed file types for upload"
    )
    storage_path: str = Field(default="./storage", description="Local storage path")
    
    @validator("log_level")
    def validate_log_level(cls, v):
        """Validate log level."""
        valid_levels = ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]
        if v.upper() not in valid_levels:
            raise ValueError(f"Log level must be one of: {valid_levels}")
        return v.upper()
    
    @validator("environment")
    def validate_environment(cls, v):
        """Validate environment."""
        valid_envs = ["development", "staging", "production"]
        if v.lower() not in valid_envs:
            raise ValueError(f"Environment must be one of: {valid_envs}")
        return v.lower()
    
    @validator("temperature")
    def validate_temperature(cls, v):
        """Validate AI model temperature."""
        if not 0.0 <= v <= 2.0:
            raise ValueError("Temperature must be between 0.0 and 2.0")
        return v
    
    @validator("cors_origins", pre=True)
    def parse_cors_origins(cls, v):
        """Parse CORS origins from string or list."""
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",")]
        return v
    
    @property
    def is_production(self) -> bool:
        """Check if running in production environment."""
        return self.environment == "production"
    
    @property
    def is_development(self) -> bool:
        """Check if running in development environment."""
        return self.environment == "development"
    
    @property
    def database_config(self) -> Dict[str, Any]:
        """Get database configuration."""
        return {
            "url": self.database_url or self.supabase_url,
            "pool_size": self.database_pool_size,
            "max_overflow": self.database_max_overflow,
        }
    
    @property
    def redis_config(self) -> Dict[str, Any]:
        """Get Redis configuration."""
        return {
            "url": self.redis_url,
            "db": self.redis_db,
            "password": self.redis_password,
        }
    
    @property
    def ai_model_config(self) -> Dict[str, Any]:
        """Get AI model configuration."""
        return {
            "openai_api_key": self.openai_api_key,
            "anthropic_api_key": self.anthropic_api_key,
            "default_model": self.default_model,
            "max_tokens": self.max_tokens,
            "temperature": self.temperature,
        }
    
    class Config:
        """Pydantic configuration."""
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False
        
        # Environment variable prefixes
        env_prefix = "HIJRAAH_MAS_"
        
        # Allow extra fields for flexibility
        extra = "allow"
        
        # Custom environment variable names
        fields = {
            "supabase_url": {"env": ["SUPABASE_URL", "HIJRAAH_MAS_SUPABASE_URL"]},
            "supabase_key": {"env": ["SUPABASE_KEY", "HIJRAAH_MAS_SUPABASE_KEY"]},
            "openai_api_key": {"env": ["OPENAI_API_KEY", "HIJRAAH_MAS_OPENAI_API_KEY"]},
            "anthropic_api_key": {"env": ["ANTHROPIC_API_KEY", "HIJRAAH_MAS_ANTHROPIC_API_KEY"]},
            "agentops_api_key": {"env": ["AGENTOPS_API_KEY", "HIJRAAH_MAS_AGENTOPS_API_KEY"]},
            "redis_url": {"env": ["REDIS_URL", "HIJRAAH_MAS_REDIS_URL"]},
        }


@lru_cache()
def get_settings() -> Settings:
    """
    Get cached settings instance.
    
    Returns:
        Settings: Application settings
    """
    return Settings()


# Global settings instance
settings = get_settings()


def reload_settings() -> Settings:
    """
    Reload settings (useful for testing).
    
    Returns:
        Settings: Fresh settings instance
    """
    get_settings.cache_clear()
    return get_settings()


# Environment-specific configurations
class DevelopmentSettings(Settings):
    """Development environment settings."""
    debug: bool = True
    log_level: str = "DEBUG"
    reload: bool = True


class ProductionSettings(Settings):
    """Production environment settings."""
    debug: bool = False
    log_level: str = "INFO"
    reload: bool = False
    workers: int = 4


class TestingSettings(Settings):
    """Testing environment settings."""
    debug: bool = True
    log_level: str = "DEBUG"
    environment: str = "testing"
    
    # Use in-memory databases for testing
    redis_url: str = "redis://localhost:6379/1"
    
    # Disable external services in tests
    agentops_enabled: bool = False
    enable_metrics: bool = False


def get_environment_settings() -> Settings:
    """
    Get environment-specific settings.
    
    Returns:
        Settings: Environment-specific settings instance
    """
    env = os.getenv("ENVIRONMENT", "development").lower()
    
    if env == "production":
        return ProductionSettings()
    elif env == "testing":
        return TestingSettings()
    else:
        return DevelopmentSettings()