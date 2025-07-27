# Context7 - Infrastructure as Code: Development Environment Configuration
# Data-as-Code: Environment-specific development settings

# General Configuration
environment = "dev"
owner = "hijraah-dev-team"
cost_center = "engineering"
app_version = "dev"

# Repository Configuration
github_repo = "hijraah/hijraah"  # Update with actual repo

# AWS Configuration
aws_region = "us-east-1"
terraform_state_bucket = "hijraah-terraform-state-dev"

# Vercel Configuration
vercel_region = "iad1"  # US East (N. Virginia)
custom_domain = ""  # No custom domain for dev

# Supabase Configuration
supabase_region = "us-east-1"
supabase_plan = "free"
db_tier = "micro"
# Note: supabase_org_id and db_password should be set via environment variables or secrets

# Upstash Configuration
upstash_region = "us-east-1"
cache_tier = "basic"
cache_memory_mb = 256

# Feature Flags
enable_custom_domain = false
enable_monitoring = false
enable_backup = false

# Context7 - Observability: Development Monitoring (minimal)
monitoring_config = {
  enable_uptime_monitoring = false
  enable_performance_monitoring = false
  alert_email = "dev@hijraah.com"
  slack_webhook_url = ""
}

# Context7 - Data-as-Code: Development Performance Configuration (minimal)
performance_config = {
  max_function_duration = 30
  function_memory_mb = 512
  auto_scaling_enabled = false
  max_concurrent_requests = 10
}

# Context7 - Modularity: Development Security Configuration (relaxed)
security_config = {
  enable_waf = false
  enable_ddos_protection = false
  allowed_origins = ["*"]  # Allow all origins for development
  rate_limit_requests_per_minute = 100
  enable_audit_logging = false
} 