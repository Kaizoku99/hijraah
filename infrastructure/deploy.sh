#!/bin/bash

# Context7 - Infrastructure as Code: Automated Deployment Script
# Observability: Comprehensive logging and error handling
# Modularity: Environment-specific deployment automation

set -euo pipefail  # Exit on error, undefined vars, pipe failures

# Context7 - Data-as-Code: Script configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TERRAFORM_DIR="${SCRIPT_DIR}/terraform"
LOG_FILE="${SCRIPT_DIR}/deploy.log"

# Context7 - Observability: Logging functions
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $*" | tee -a "${LOG_FILE}"
}

error() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $*" | tee -a "${LOG_FILE}" >&2
}

success() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] SUCCESS: $*" | tee -a "${LOG_FILE}"
}

# Context7 - Modularity: Help function
show_help() {
    cat << EOF
Context7-Compliant Hijraah Infrastructure Deployment

Usage: $0 [OPTIONS] ENVIRONMENT ACTION

ENVIRONMENTS:
    dev         Development environment
    staging     Staging environment  
    production  Production environment

ACTIONS:
    plan        Generate and show execution plan
    apply       Apply infrastructure changes
    destroy     Destroy infrastructure
    validate    Validate configuration
    init        Initialize Terraform
    output      Show output values

OPTIONS:
    -h, --help          Show this help message
    -v, --verbose       Enable verbose output
    -f, --force         Skip confirmation prompts
    --auto-approve      Auto-approve Terraform apply
    --dry-run          Show what would be done without executing

EXAMPLES:
    $0 dev plan                    # Plan development environment
    $0 production apply            # Apply production infrastructure
    $0 staging destroy --force     # Destroy staging with force
    
REQUIRED ENVIRONMENT VARIABLES:
    VERCEL_API_TOKEN              # Vercel API token
    SUPABASE_ACCESS_TOKEN         # Supabase access token
    UPSTASH_API_KEY              # Upstash API key
    TF_VAR_supabase_org_id       # Supabase organization ID
    TF_VAR_db_password           # Database password

OPTIONAL ENVIRONMENT VARIABLES:
    TF_VAR_github_repo           # GitHub repository (default: current repo)
    TF_VAR_custom_domain         # Custom domain for production
    SLACK_WEBHOOK_URL            # Slack alerts webhook
    AWS_ACCESS_KEY_ID            # AWS access key for state backend
    AWS_SECRET_ACCESS_KEY        # AWS secret key for state backend

EOF
}

# Context7 - Data-as-Code: Environment validation
validate_environment() {
    local env="$1"
    
    case "$env" in
        dev|staging|production)
            log "Validated environment: $env"
            return 0
            ;;
        *)
            error "Invalid environment: $env. Must be one of: dev, staging, production"
            return 1
            ;;
    esac
}

# Context7 - Provider Isolation: Check required tools
check_prerequisites() {
    log "Checking prerequisites..."
    
    local missing_tools=()
    
    # Check for required tools
    for tool in terraform git; do
        if ! command -v "$tool" &> /dev/null; then
            missing_tools+=("$tool")
        fi
    done
    
    if [[ ${#missing_tools[@]} -gt 0 ]]; then
        error "Missing required tools: ${missing_tools[*]}"
        log "Please install the missing tools and try again"
        return 1
    fi
    
    # Check Terraform version
    local tf_version
    tf_version=$(terraform version -json | jq -r '.terraform_version')
    log "Using Terraform version: $tf_version"
    
    success "All prerequisites satisfied"
}

# Context7 - Observability: Environment variable validation
validate_env_vars() {
    local env="$1"
    log "Validating environment variables for $env..."
    
    local required_vars=(
        "VERCEL_API_TOKEN"
        "SUPABASE_ACCESS_TOKEN" 
        "UPSTASH_API_KEY"
        "TF_VAR_supabase_org_id"
        "TF_VAR_db_password"
    )
    
    local missing_vars=()
    
    for var in "${required_vars[@]}"; do
        if [[ -z "${!var:-}" ]]; then
            missing_vars+=("$var")
        fi
    done
    
    if [[ ${#missing_vars[@]} -gt 0 ]]; then
        error "Missing required environment variables: ${missing_vars[*]}"
        log "Please set the missing variables and try again"
        return 1
    fi
    
    # Environment-specific validation
    if [[ "$env" == "production" ]]; then
        if [[ -z "${TF_VAR_custom_domain:-}" ]]; then
            log "WARNING: TF_VAR_custom_domain not set for production"
        fi
        
        if [[ -z "${AWS_ACCESS_KEY_ID:-}" || -z "${AWS_SECRET_ACCESS_KEY:-}" ]]; then
            log "WARNING: AWS credentials not set. Using local state (not recommended for production)"
        fi
    fi
    
    success "Environment variables validated"
}

# Context7 - Modularity: Terraform operations
terraform_init() {
    local env="$1"
    log "Initializing Terraform for $env environment..."
    
    cd "$TERRAFORM_DIR"
    
    terraform init \
        -backend-config="key=hijraah/${env}/terraform.tfstate" \
        -reconfigure
        
    success "Terraform initialized"
}

terraform_validate() {
    log "Validating Terraform configuration..."
    
    cd "$TERRAFORM_DIR"
    terraform validate
    
    success "Terraform configuration is valid"
}

terraform_plan() {
    local env="$1"
    local var_file="${TERRAFORM_DIR}/environments/${env}.tfvars"
    
    log "Planning Terraform deployment for $env..."
    
    if [[ ! -f "$var_file" ]]; then
        error "Variable file not found: $var_file"
        return 1
    fi
    
    cd "$TERRAFORM_DIR"
    terraform plan \
        -var-file="$var_file" \
        -out="tfplan-${env}" \
        -detailed-exitcode
        
    local exit_code=$?
    
    case $exit_code in
        0)
            success "No changes needed for $env"
            ;;
        1)
            error "Terraform plan failed"
            return 1
            ;;
        2)
            success "Changes planned for $env - see tfplan-${env}"
            ;;
    esac
    
    return $exit_code
}

terraform_apply() {
    local env="$1"
    local auto_approve="${2:-false}"
    
    log "Applying Terraform configuration for $env..."
    
    cd "$TERRAFORM_DIR"
    
    local apply_args=("tfplan-${env}")
    
    if [[ "$auto_approve" == "true" ]]; then
        log "Auto-approve enabled"
    else
        log "Manual approval required"
        apply_args=(-var-file="environments/${env}.tfvars")
    fi
    
    terraform apply "${apply_args[@]}"
    
    success "Terraform apply completed for $env"
}

terraform_destroy() {
    local env="$1"
    local force="${2:-false}"
    local var_file="${TERRAFORM_DIR}/environments/${env}.tfvars"
    
    log "Destroying Terraform infrastructure for $env..."
    
    if [[ "$force" != "true" ]]; then
        echo "WARNING: This will destroy ALL infrastructure for $env environment!"
        read -p "Are you sure? Type 'yes' to continue: " -r
        if [[ ! $REPLY =~ ^yes$ ]]; then
            log "Destroy cancelled by user"
            return 0
        fi
    fi
    
    cd "$TERRAFORM_DIR"
    terraform destroy \
        -var-file="$var_file" \
        -auto-approve
        
    success "Infrastructure destroyed for $env"
}

terraform_output() {
    local env="$1"
    
    log "Getting Terraform outputs for $env..."
    
    cd "$TERRAFORM_DIR"
    terraform output -json
}

# Context7 - Observability: Main execution function
main() {
    local environment=""
    local action=""
    local verbose=false
    local force=false
    local auto_approve=false
    local dry_run=false
    
    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -v|--verbose)
                verbose=true
                set -x
                shift
                ;;
            -f|--force)
                force=true
                shift
                ;;
            --auto-approve)
                auto_approve=true
                shift
                ;;
            --dry-run)
                dry_run=true
                shift
                ;;
            -*)
                error "Unknown option: $1"
                show_help
                exit 1
                ;;
            *)
                if [[ -z "$environment" ]]; then
                    environment="$1"
                elif [[ -z "$action" ]]; then
                    action="$1"
                else
                    error "Too many arguments"
                    show_help
                    exit 1
                fi
                shift
                ;;
        esac
    done
    
    # Validate required arguments
    if [[ -z "$environment" || -z "$action" ]]; then
        error "Environment and action are required"
        show_help
        exit 1
    fi
    
    # Start deployment
    log "Starting Hijraah infrastructure deployment"
    log "Environment: $environment"
    log "Action: $action"
    log "Options: verbose=$verbose, force=$force, auto_approve=$auto_approve, dry_run=$dry_run"
    
    if [[ "$dry_run" == "true" ]]; then
        log "DRY RUN MODE: No changes will be applied"
        return 0
    fi
    
    # Validate and execute
    validate_environment "$environment"
    check_prerequisites
    validate_env_vars "$environment"
    
    case "$action" in
        init)
            terraform_init "$environment"
            ;;
        validate)
            terraform_init "$environment"
            terraform_validate
            ;;
        plan)
            terraform_init "$environment"
            terraform_validate
            terraform_plan "$environment"
            ;;
        apply)
            terraform_init "$environment"
            terraform_validate
            terraform_plan "$environment"
            terraform_apply "$environment" "$auto_approve"
            ;;
        destroy)
            terraform_init "$environment"
            terraform_destroy "$environment" "$force"
            ;;
        output)
            terraform_output "$environment"
            ;;
        *)
            error "Unknown action: $action"
            show_help
            exit 1
            ;;
    esac
    
    success "Deployment completed successfully"
}

# Context7 - Error handling: Trap errors and cleanup
cleanup() {
    local exit_code=$?
    if [[ $exit_code -ne 0 ]]; then
        error "Script failed with exit code $exit_code"
        log "Check $LOG_FILE for details"
    fi
    exit $exit_code
}

trap cleanup EXIT

# Execute main function
main "$@" 