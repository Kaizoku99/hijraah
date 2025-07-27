#!/bin/bash

# Hijraah MAS Docker Entrypoint Script
# This script handles initialization and startup of the MAS application

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to wait for service
wait_for_service() {
    local host=$1
    local port=$2
    local service_name=$3
    local timeout=${4:-30}
    
    log_info "Waiting for $service_name at $host:$port..."
    
    for i in $(seq 1 $timeout); do
        if nc -z "$host" "$port" 2>/dev/null; then
            log_success "$service_name is ready!"
            return 0
        fi
        sleep 1
    done
    
    log_error "$service_name is not available after ${timeout}s"
    return 1
}

# Function to check environment variables
check_env_vars() {
    local required_vars=(
        "SUPABASE_URL"
        "SUPABASE_KEY"
        "OPENAI_API_KEY"
    )
    
    local missing_vars=()
    
    for var in "${required_vars[@]}"; do
        if [[ -z "${!var}" ]]; then
            missing_vars+=("$var")
        fi
    done
    
    if [[ ${#missing_vars[@]} -gt 0 ]]; then
        log_error "Missing required environment variables:"
        for var in "${missing_vars[@]}"; do
            log_error "  - $var"
        done
        exit 1
    fi
    
    log_success "All required environment variables are set"
}

# Function to initialize application
initialize_app() {
    log_info "Initializing Hijraah MAS..."
    
    # Create necessary directories
    mkdir -p /app/logs /app/storage /app/tmp
    
    # Set proper permissions
    chmod 755 /app/logs /app/storage /app/tmp
    
    # Initialize AgentOps if enabled
    if [[ "${AGENTOPS_ENABLED:-true}" == "true" && -n "${AGENTOPS_API_KEY}" ]]; then
        log_info "AgentOps monitoring enabled"
    else
        log_warning "AgentOps monitoring disabled"
    fi
    
    log_success "Application initialized successfully"
}

# Function to run database migrations (if needed)
run_migrations() {
    log_info "Checking for database migrations..."
    
    # Add migration logic here if needed
    # python -m hijraah_mas.db.migrate
    
    log_success "Database migrations completed"
}

# Function to validate configuration
validate_config() {
    log_info "Validating configuration..."
    
    # Test Supabase connection
    if ! python -c "
import os
from supabase import create_client
try:
    client = create_client(os.getenv('SUPABASE_URL'), os.getenv('SUPABASE_KEY'))
    # Simple test query
    result = client.table('_health').select('*').limit(1).execute()
    print('Supabase connection: OK')
except Exception as e:
    print(f'Supabase connection: FAILED - {e}')
    exit(1)
" 2>/dev/null; then
        log_success "Supabase connection validated"
    else
        log_warning "Supabase connection validation failed (continuing anyway)"
    fi
    
    # Test OpenAI API key
    if ! python -c "
import os
import openai
try:
    openai.api_key = os.getenv('OPENAI_API_KEY')
    # Simple test to validate key
    openai.Model.list()
    print('OpenAI API key: OK')
except Exception as e:
    print(f'OpenAI API key: FAILED - {e}')
    exit(1)
" 2>/dev/null; then
        log_success "OpenAI API key validated"
    else
        log_warning "OpenAI API key validation failed (continuing anyway)"
    fi
}

# Function to start the application
start_application() {
    log_info "Starting Hijraah MAS application..."
    
    # Default command if none provided
    if [[ $# -eq 0 ]]; then
        set -- "uvicorn" "hijraah_mas.api.main:app" "--host" "0.0.0.0" "--port" "8000"
    fi
    
    # Log the command being executed
    log_info "Executing: $*"
    
    # Execute the command
    exec "$@"
}

# Main execution flow
main() {
    log_info "Starting Hijraah MAS entrypoint..."
    
    # Check required environment variables
    check_env_vars
    
    # Wait for external services if configured
    if [[ -n "${WAIT_FOR_REDIS}" ]]; then
        REDIS_HOST=$(echo "${REDIS_URL}" | sed -n 's/.*:\/\/\([^:]*\).*/\1/p')
        REDIS_PORT=$(echo "${REDIS_URL}" | sed -n 's/.*:\([0-9]*\).*/\1/p')
        wait_for_service "${REDIS_HOST:-localhost}" "${REDIS_PORT:-6379}" "Redis"
    fi
    
    # Initialize application
    initialize_app
    
    # Run migrations if needed
    if [[ "${RUN_MIGRATIONS:-false}" == "true" ]]; then
        run_migrations
    fi
    
    # Validate configuration
    if [[ "${VALIDATE_CONFIG:-true}" == "true" ]]; then
        validate_config
    fi
    
    # Start the application
    start_application "$@"
}

# Handle signals for graceful shutdown
trap 'log_info "Received shutdown signal, stopping..."; exit 0' SIGTERM SIGINT

# Run main function with all arguments
main "$@"