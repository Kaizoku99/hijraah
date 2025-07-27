# Hijraah Infrastructure as Code (Context7 Compliant)

This directory contains the complete Infrastructure as Code (IaC) setup for the Hijraah immigration platform, designed following Context7 principles for scalability, observability, and maintainability.

## 🏗️ Architecture Overview

Our infrastructure follows Context7 principles:

- **Observability**: Comprehensive monitoring, logging, and alerting
- **Modularity**: Environment-specific configurations and reusable components
- **Resumability**: Stateful infrastructure with proper state management
- **Tracing**: Request tracking across all infrastructure components
- **Data-as-Code**: All configuration managed through version-controlled files
- **Infrastructure as Code**: Complete infrastructure defined in Terraform
- **Provider Isolation**: Multi-cloud architecture with clean abstractions

## 📋 Prerequisites

### Required Tools

- [Terraform](https://terraform.io) >= 1.5.0
- [Git](https://git-scm.com)
- [jq](https://stedolan.jq.io) (for JSON processing)

### Required Accounts & API Keys

1. **Vercel Account**

   - Create account at [vercel.com](https://vercel.com)
   - Generate API token from [vercel.com/account/tokens](https://vercel.com/account/tokens)

2. **Supabase Account**

   - Create account at [supabase.com](https://supabase.com)
   - Generate access token from dashboard
   - Note your organization ID

3. **Upstash Account**

   - Create account at [upstash.com](https://upstash.com)
   - Generate API key from console

4. **AWS Account** (for Terraform state - optional but recommended for production)
   - Create S3 bucket for Terraform state
   - Configure IAM user with S3 access

## 🚀 Quick Start

### 1. Environment Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd hijraah/infrastructure

# Make deploy script executable
chmod +x deploy.sh

# Set required environment variables
export VERCEL_API_TOKEN="your_vercel_token"
export SUPABASE_ACCESS_TOKEN="your_supabase_token"
export UPSTASH_API_KEY="your_upstash_key"
export TF_VAR_supabase_org_id="your_supabase_org_id"
export TF_VAR_db_password="secure_database_password"
```

### 2. Development Deployment

```bash
# Initialize and validate
./deploy.sh dev init
./deploy.sh dev validate

# Plan deployment
./deploy.sh dev plan

# Apply changes
./deploy.sh dev apply
```

### 3. Production Deployment

```bash
# Set additional production variables
export TF_VAR_custom_domain="hijraah.com"
export TF_VAR_github_repo="your-org/hijraah"
export AWS_ACCESS_KEY_ID="your_aws_key"
export AWS_SECRET_ACCESS_KEY="your_aws_secret"

# Deploy to production
./deploy.sh production plan
./deploy.sh production apply
```

## 📁 Directory Structure

```
infrastructure/
├── terraform/
│   ├── main.tf                 # Main Terraform configuration
│   ├── variables.tf            # Input variables and validation
│   └── environments/
│       ├── dev.tfvars         # Development environment config
│       ├── staging.tfvars     # Staging environment config
│       └── production.tfvars  # Production environment config
├── deploy.sh                  # Automated deployment script
└── README.md                  # This file
```

## 🔧 Configuration

### Environment Variables

| Variable                 | Required | Description                      |
| ------------------------ | -------- | -------------------------------- |
| `VERCEL_API_TOKEN`       | ✅       | Vercel API token for deployments |
| `SUPABASE_ACCESS_TOKEN`  | ✅       | Supabase API token               |
| `UPSTASH_API_KEY`        | ✅       | Upstash API key for Redis        |
| `TF_VAR_supabase_org_id` | ✅       | Supabase organization ID         |
| `TF_VAR_db_password`     | ✅       | Database password (12+ chars)    |
| `TF_VAR_github_repo`     | ⚠️       | GitHub repo (format: owner/repo) |
| `TF_VAR_custom_domain`   | ⚠️       | Custom domain for production     |
| `AWS_ACCESS_KEY_ID`      | ⚠️       | AWS access key for state backend |
| `AWS_SECRET_ACCESS_KEY`  | ⚠️       | AWS secret key for state backend |

### Environment-Specific Configuration

Each environment (`dev`, `staging`, `production`) has optimized settings:

#### Development

- **Cost-optimized**: Free/minimal tiers
- **Minimal monitoring**: Basic error tracking
- **Relaxed security**: Allow all origins for testing
- **Single region**: US East only

#### Staging

- **Mid-tier resources**: Balanced performance/cost
- **Enhanced monitoring**: Uptime and performance tracking
- **Production-like security**: Restricted origins
- **Multi-region capable**: Testing geographic distribution

#### Production

- **High-performance**: Premium tiers across services
- **Full monitoring**: Comprehensive alerting and analytics
- **Maximum security**: WAF, DDoS protection, audit logging
- **Global distribution**: Multi-region deployment

## 🎯 Context7 Compliance Features

### 1. Observability

- **Monitoring**: Uptime, performance, and error tracking
- **Alerting**: Email and Slack notifications
- **Logging**: Structured logging with correlation IDs
- **Metrics**: Resource utilization and business metrics

### 2. Modularity

- **Environment separation**: Isolated configurations per environment
- **Component reusability**: Shared modules and templates
- **Service isolation**: Independent scaling and deployment

### 3. Resumability

- **State management**: Remote Terraform state with locking
- **Incremental deployment**: Plan-based change management
- **Rollback capability**: Version-controlled infrastructure

### 4. Tracing

- **Request correlation**: Unique IDs across all services
- **Performance tracking**: End-to-end request timing
- **Error correlation**: Link errors to specific deployments

### 5. Data-as-Code

- **Configuration management**: All settings in version control
- **Validation**: Input validation and constraint checking
- **Documentation**: Self-documenting infrastructure

### 6. Infrastructure as Code

- **Declarative**: Complete infrastructure in Terraform
- **Version controlled**: All changes tracked in Git
- **Automated**: Deployment through CI/CD pipelines

### 7. Provider Isolation

- **Multi-cloud ready**: Clean abstractions over providers
- **Vendor independence**: Easy provider switching
- **Service decoupling**: Independent service lifecycles

## 🚨 Deployment Commands

### Basic Operations

```bash
# Initialize Terraform
./deploy.sh <env> init

# Validate configuration
./deploy.sh <env> validate

# Plan changes
./deploy.sh <env> plan

# Apply changes
./deploy.sh <env> apply

# Show outputs
./deploy.sh <env> output

# Destroy infrastructure (careful!)
./deploy.sh <env> destroy --force
```

### Advanced Options

```bash
# Verbose output
./deploy.sh <env> <action> --verbose

# Auto-approve (CI/CD)
./deploy.sh <env> apply --auto-approve

# Dry run (show what would happen)
./deploy.sh <env> apply --dry-run

# Force destroy without confirmation
./deploy.sh <env> destroy --force
```

## 📊 Monitoring & Observability

### Available Outputs

After deployment, get important URLs and connection strings:

```bash
# Get all outputs
./deploy.sh production output

# Specific outputs
terraform output -raw frontend_url
terraform output -raw database_url
```

### Monitoring Dashboards

- **Vercel Dashboard**: Application performance and deployments
- **Supabase Dashboard**: Database metrics and API usage
- **Upstash Console**: Redis performance and memory usage

### Alerting

Configure alerts in the environment `.tfvars` files:

```hcl
monitoring_config = {
  enable_uptime_monitoring = true
  enable_performance_monitoring = true
  alert_email = "alerts@yourcompany.com"
  slack_webhook_url = "https://hooks.slack.com/..."
}
```

## 🔒 Security Best Practices

### Secret Management

1. **Never commit secrets** to version control
2. **Use environment variables** for sensitive data
3. **Rotate credentials** regularly
4. **Use least-privilege access** for service accounts

### Production Security

- **Enable WAF** for application protection
- **Configure DDoS protection** for availability
- **Restrict origins** to known domains only
- **Enable audit logging** for compliance

## 🐛 Troubleshooting

### Common Issues

1. **Authentication Errors**

   ```bash
   # Check API tokens
   echo $VERCEL_API_TOKEN | head -c 20
   echo $SUPABASE_ACCESS_TOKEN | head -c 20
   ```

2. **State Lock Issues**

   ```bash
   # Force unlock (use carefully)
   cd terraform && terraform force-unlock <lock-id>
   ```

3. **Resource Conflicts**
   ```bash
   # Import existing resources
   terraform import <resource_type>.<name> <resource_id>
   ```

### Getting Help

1. Check the deployment logs: `cat deploy.log`
2. Review Terraform state: `terraform show`
3. Validate configuration: `terraform validate`
4. Check provider documentation:
   - [Vercel Terraform Provider](https://registry.terraform.io/providers/vercel/vercel/latest/docs)
   - [Supabase Terraform Provider](https://registry.terraform.io/providers/supabase/supabase/latest/docs)
   - [Upstash Terraform Provider](https://registry.terraform.io/providers/upstash/upstash/latest/docs)

## 🤝 Contributing

1. **Test changes** in development environment first
2. **Plan before applying** to see what will change
3. **Use descriptive commit messages** for infrastructure changes
4. **Document new resources** and configuration options

## 📝 License

This infrastructure code is part of the Hijraah project and follows the same license terms.

---

**Context7 Compliant** ✅ | **Production Ready** 🚀 | **Multi-Environment** 🌍
