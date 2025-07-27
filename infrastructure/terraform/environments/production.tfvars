# Context7 - Infrastructure as Code: Production Environment Configuration
# Data-as-Code: Environment-specific production settings

# General Configuration
environment = "production"
owner = "hijraah-team"
cost_center = "engineering"
app_version = "1.0.0"

# Repository Configuration
github_repo = "hijraah/hijraah"  # Update with actual repo

# AWS Configuration
aws_region = "us-east-1"
terraform_state_bucket = "hijraah-terraform-state-prod"

# Vercel Configuration
vercel_region = "iad1"  # US East (N. Virginia)
custom_domain = "hijraah.com"  # Update with actual domain

# Supabase Configuration
supabase_region = "us-east-1"
supabase_plan = "pro"
db_tier = "medium"
# Note: supabase_org_id and db_password should be set via environment variables or secrets

# Upstash Configuration
upstash_region = "us-east-1"
cache_tier = "premium"
cache_memory_mb = 2048

# Feature Flags
enable_custom_domain = true
enable_monitoring = true
enable_backup = true

# Context7 - Observability: Production Monitoring
monitoring_config = {
  enable_uptime_monitoring = true
  enable_performance_monitoring = true
  alert_email = "alerts@hijraah.com"
  slack_webhook_url = ""  # Set via environment variable
}

# Context7 - Data-as-Code: Production Performance Configuration
performance_config = {
  max_function_duration = 60
  function_memory_mb = 2048
  auto_scaling_enabled = true
  max_concurrent_requests = 1000
}

# Context7 - Modularity: Production Security Configuration
security_config = {
  enable_waf = true
  enable_ddos_protection = true
  allowed_origins = [
    "https://hijraah.com",
    "https://www.hijraah.com",
    "https://app.hijraah.com"
  ]
  rate_limit_requests_per_minute = 1000
  enable_audit_logging = true
} 