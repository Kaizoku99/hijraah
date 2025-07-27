# Context7 - Infrastructure as Code: Hijraah Platform Infrastructure
# Provider Isolation: Multi-cloud capable configuration

terraform {
  required_version = ">= 1.5.0"
  
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 1.0"
    }
    supabase = {
      source  = "supabase/supabase"
      version = "~> 1.0"
    }
    upstash = {
      source  = "upstash/upstash"
      version = "~> 1.0"
    }
  }

  # Context7 - Data-as-Code: Remote state management
  backend "s3" {
    bucket = var.terraform_state_bucket
    key    = "hijraah/terraform.tfstate"
    region = var.aws_region
  }
}

# Context7 - Data-as-Code: Environment configuration
locals {
  environment = var.environment
  project_name = "hijraah"
  
  # Context7 - Observability: Resource tagging
  common_tags = {
    Project     = local.project_name
    Environment = local.environment
    ManagedBy   = "terraform"
    Owner       = var.owner
    CostCenter  = var.cost_center
    Context7    = "compliant"
  }

  # Context7 - Provider Isolation: Service configuration
  services = {
    frontend = {
      name = "${local.project_name}-frontend-${local.environment}"
      framework = "nextjs"
    }
    api = {
      name = "${local.project_name}-api-${local.environment}"
      runtime = "nodejs20.x"
    }
    database = {
      name = "${local.project_name}-db-${local.environment}"
      tier = var.db_tier
    }
    cache = {
      name = "${local.project_name}-cache-${local.environment}"
      tier = var.cache_tier
    }
  }
}

# Context7 - Provider Isolation: Vercel Frontend Deployment
resource "vercel_project" "hijraah_frontend" {
  name      = local.services.frontend.name
  framework = local.services.frontend.framework
  
  git_repository = {
    type = "github"
    repo = var.github_repo
  }

  build_command    = "pnpm build"
  output_directory = "apps/web/.next"
  install_command  = "pnpm install"
  
  # Context7 - Observability: Environment variables
  environment = [
    {
      key    = "NODE_ENV"
      value  = var.environment
      target = ["production", "preview"]
    },
    {
      key    = "NEXT_PUBLIC_SUPABASE_URL"
      value  = supabase_project.hijraah_db.api_url
      target = ["production", "preview"]
    },
    {
      key    = "NEXT_PUBLIC_SUPABASE_ANON_KEY"
      value  = supabase_project.hijraah_db.anon_key
      target = ["production", "preview"]
    },
    {
      key    = "SUPABASE_SERVICE_ROLE_KEY"
      value  = supabase_project.hijraah_db.service_role_key
      target = ["production"]
      type   = "secret"
    },
    {
      key    = "DATABASE_URL"
      value  = supabase_project.hijraah_db.database_url
      target = ["production", "preview"]
      type   = "secret"
    },
    {
      key    = "REDIS_URL"
      value  = upstash_redis_database.hijraah_cache.endpoint
      target = ["production", "preview"]
      type   = "secret"
    },
    {
      key    = "UPSTASH_REDIS_REST_TOKEN"
      value  = upstash_redis_database.hijraah_cache.rest_token
      target = ["production"]
      type   = "secret"
    },
    {
      key    = "NEXT_PUBLIC_GUEST_AUTH_ENABLED"
      value  = "true"
      target = ["production", "preview"]
    },
    {
      key    = "OTEL_SERVICE_NAME"
      value  = local.services.frontend.name
      target = ["production", "preview"]
    },
    {
      key    = "OTEL_SERVICE_VERSION"
      value  = var.app_version
      target = ["production", "preview"]
    }
  ]

  # Context7 - Modularity: Function configuration
  serverless_function_region = var.vercel_region
}

# Context7 - Provider Isolation: Supabase Database
resource "supabase_project" "hijraah_db" {
  organization_id = var.supabase_org_id
  name           = local.services.database.name
  database_password = var.db_password
  region         = var.supabase_region
  
  # Context7 - Data-as-Code: Database configuration
  plan = var.supabase_plan
  
  # Context7 - Observability: Enable logging
  enable_logs = true
}

# Context7 - Provider Isolation: Upstash Redis Cache
resource "upstash_redis_database" "hijraah_cache" {
  database_name = local.services.cache.name
  region        = var.upstash_region
  tls           = true
  
  # Context7 - Data-as-Code: Cache configuration
  multizone      = var.environment == "production" ? true : false
  eviction       = true
  max_memory_mb  = var.cache_memory_mb
}

# Context7 - Observability: Monitoring and Alerting
resource "vercel_project_domain" "hijraah_domain" {
  count = var.custom_domain != "" ? 1 : 0
  
  project_id = vercel_project.hijraah_frontend.id
  domain     = var.custom_domain
}

# Context7 - Provider Isolation: Edge Functions Configuration
resource "vercel_deployment" "hijraah_deployment" {
  project_id = vercel_project.hijraah_frontend.id
  
  # Context7 - Modularity: Function regions
  functions = {
    "apps/web/src/app/(ai-unified)/api/chat/route.ts" = {
      runtime = "nodejs20.x"
      regions = [var.vercel_region]
      memory  = 1024
      maxDuration = 60
    }
    "apps/web/src/app/api/auth/guest/route.ts" = {
      runtime = "nodejs20.x" 
      regions = [var.vercel_region]
      memory  = 512
      maxDuration = 30
    }
  }

  # Context7 - Data-as-Code: Build configuration
  path_prefix = "apps/web"
  
  lifecycle {
    ignore_changes = [
      # Ignore changes to deployment as they're managed by git pushes
      files
    ]
  }
}

# Context7 - Observability: Output important values
output "frontend_url" {
  description = "Frontend application URL"
  value       = vercel_project.hijraah_frontend.name
}

output "database_url" {
  description = "Supabase database URL"
  value       = supabase_project.hijraah_db.api_url
  sensitive   = false
}

output "redis_endpoint" {
  description = "Redis cache endpoint"
  value       = upstash_redis_database.hijraah_cache.endpoint
  sensitive   = true
}

output "deployment_id" {
  description = "Current deployment ID"
  value       = vercel_deployment.hijraah_deployment.id
}

# Context7 - Modularity: Resource dependencies
output "project_resources" {
  description = "Project resource summary"
  value = {
    frontend_project_id = vercel_project.hijraah_frontend.id
    database_project_id = supabase_project.hijraah_db.id
    cache_database_id   = upstash_redis_database.hijraah_cache.database_id
    environment        = local.environment
    tags              = local.common_tags
  }
} 