# Context7 - Data-as-Code: Infrastructure Variables
# Provider Isolation: Environment-agnostic configuration

# General Configuration
variable "environment" {
  description = "Environment name (dev, staging, production)"
  type        = string
  
  validation {
    condition     = contains(["dev", "staging", "production"], var.environment)
    error_message = "Environment must be one of: dev, staging, production."
  }
}

variable "owner" {
  description = "Resource owner/team"
  type        = string
  default     = "hijraah-team"
}

variable "cost_center" {
  description = "Cost center for billing"
  type        = string
  default     = "engineering"
}

variable "app_version" {
  description = "Application version for deployment"
  type        = string
  default     = "1.0.0"
}

# Repository Configuration
variable "github_repo" {
  description = "GitHub repository in format owner/repo"
  type        = string
  validation {
    condition     = can(regex("^[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+$", var.github_repo))
    error_message = "GitHub repo must be in format: owner/repo"
  }
}

# AWS Configuration (for Terraform state)
variable "aws_region" {
  description = "AWS region for Terraform state backend"
  type        = string
  default     = "us-east-1"
}

variable "terraform_state_bucket" {
  description = "S3 bucket for Terraform state"
  type        = string
}

# Vercel Configuration
variable "vercel_region" {
  description = "Vercel deployment region"
  type        = string
  default     = "iad1"
  
  validation {
    condition = contains([
      "iad1", "bom1", "cdg1", "cle1", "cpt1", "dub1", "fra1", "gru1", 
      "hkg1", "hnd1", "icn1", "kix1", "lhr1", "pdx1", "sfo1", "sin1", "syd1"
    ], var.vercel_region)
    error_message = "Must be a valid Vercel region."
  }
}

variable "custom_domain" {
  description = "Custom domain for the application"
  type        = string
  default     = ""
}

# Supabase Configuration
variable "supabase_org_id" {
  description = "Supabase organization ID"
  type        = string
  sensitive   = true
}

variable "supabase_region" {
  description = "Supabase database region"
  type        = string
  default     = "us-east-1"
  
  validation {
    condition = contains([
      "us-east-1", "us-west-1", "eu-west-1", "eu-central-1", 
      "ap-southeast-1", "ap-northeast-1", "ap-south-1"
    ], var.supabase_region)
    error_message = "Must be a valid Supabase region."
  }
}

variable "supabase_plan" {
  description = "Supabase plan tier"
  type        = string
  default     = "free"
  
  validation {
    condition     = contains(["free", "pro", "team", "enterprise"], var.supabase_plan)
    error_message = "Supabase plan must be one of: free, pro, team, enterprise."
  }
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
  
  validation {
    condition     = length(var.db_password) >= 12
    error_message = "Database password must be at least 12 characters long."
  }
}

variable "db_tier" {
  description = "Database tier configuration"
  type        = string
  default     = "micro"
  
  validation {
    condition     = contains(["micro", "small", "medium", "large", "xlarge"], var.db_tier)
    error_message = "Database tier must be one of: micro, small, medium, large, xlarge."
  }
}

# Upstash Configuration
variable "upstash_region" {
  description = "Upstash Redis region"
  type        = string
  default     = "us-east-1"
  
  validation {
    condition = contains([
      "us-east-1", "us-west-1", "us-central1", "eu-west-1", "eu-central-1",
      "ap-southeast-1", "ap-northeast-1", "ap-south-1"
    ], var.upstash_region)
    error_message = "Must be a valid Upstash region."
  }
}

variable "cache_tier" {
  description = "Cache tier configuration"
  type        = string
  default     = "basic"
  
  validation {
    condition     = contains(["basic", "standard", "premium"], var.cache_tier)
    error_message = "Cache tier must be one of: basic, standard, premium."
  }
}

variable "cache_memory_mb" {
  description = "Redis cache memory in MB"
  type        = number
  default     = 256
  
  validation {
    condition     = var.cache_memory_mb >= 256 && var.cache_memory_mb <= 10240
    error_message = "Cache memory must be between 256 MB and 10 GB."
  }
}

# Feature Flags
variable "enable_custom_domain" {
  description = "Enable custom domain configuration"
  type        = bool
  default     = false
}

variable "enable_monitoring" {
  description = "Enable monitoring and alerting"
  type        = bool
  default     = true
}

variable "enable_backup" {
  description = "Enable automated backups"
  type        = bool
  default     = true
}

# Context7 - Observability: Monitoring Configuration
variable "monitoring_config" {
  description = "Monitoring and alerting configuration"
  type = object({
    enable_uptime_monitoring = bool
    enable_performance_monitoring = bool
    alert_email = string
    slack_webhook_url = string
  })
  default = {
    enable_uptime_monitoring = true
    enable_performance_monitoring = true
    alert_email = ""
    slack_webhook_url = ""
  }
}

# Context7 - Provider Isolation: API Keys (should be set via environment or secrets)
variable "api_keys" {
  description = "External API keys configuration"
  type = object({
    openai_api_key = string
    anthropic_api_key = string
    mistral_api_key = string
  })
  sensitive = true
  default = {
    openai_api_key = ""
    anthropic_api_key = ""
    mistral_api_key = ""
  }
}

# Context7 - Data-as-Code: Performance Configuration
variable "performance_config" {
  description = "Performance and scaling configuration"
  type = object({
    max_function_duration = number
    function_memory_mb = number
    auto_scaling_enabled = bool
    max_concurrent_requests = number
  })
  default = {
    max_function_duration = 60
    function_memory_mb = 1024
    auto_scaling_enabled = true
    max_concurrent_requests = 100
  }
  
  validation {
    condition = (
      var.performance_config.max_function_duration >= 10 &&
      var.performance_config.max_function_duration <= 300 &&
      var.performance_config.function_memory_mb >= 128 &&
      var.performance_config.function_memory_mb <= 3008
    )
    error_message = "Performance config values must be within valid ranges."
  }
}

# Context7 - Modularity: Security Configuration
variable "security_config" {
  description = "Security and compliance configuration"
  type = object({
    enable_waf = bool
    enable_ddos_protection = bool
    allowed_origins = list(string)
    rate_limit_requests_per_minute = number
    enable_audit_logging = bool
  })
  default = {
    enable_waf = true
    enable_ddos_protection = true
    allowed_origins = ["*"]
    rate_limit_requests_per_minute = 100
    enable_audit_logging = true
  }
}

# Local Values for computed configurations
locals {
  # Context7 - Data-as-Code: Environment-specific configurations
  environment_configs = {
    dev = {
      instance_count = 1
      enable_monitoring = false
      cache_memory_mb = 256
      db_tier = "micro"
      supabase_plan = "free"
    }
    staging = {
      instance_count = 2
      enable_monitoring = true
      cache_memory_mb = 512
      db_tier = "small"
      supabase_plan = "pro"
    }
    production = {
      instance_count = 3
      enable_monitoring = true
      cache_memory_mb = 1024
      db_tier = "medium"
      supabase_plan = "pro"
    }
  }
  
  # Merge user config with environment defaults
  merged_config = merge(
    local.environment_configs[var.environment],
    {
      cache_memory_mb = var.cache_memory_mb
      db_tier = var.db_tier
      supabase_plan = var.supabase_plan
    }
  )
} 