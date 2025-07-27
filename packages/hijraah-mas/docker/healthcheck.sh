#!/bin/bash

# Hijraah MAS Health Check Script
# This script performs health checks for the MAS application

set -e

# Configuration
HEALTH_URL="${HEALTH_URL:-http://localhost:8000/health}"
TIMEOUT="${HEALTH_TIMEOUT:-10}"
MAX_RETRIES="${HEALTH_MAX_RETRIES:-3}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "[INFO] $1" >&2
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" >&2
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" >&2
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

# Function to check HTTP endpoint
check_http_endpoint() {
    local url=$1
    local timeout=$2
    
    if command -v curl >/dev/null 2>&1; then
        # Use curl if available
        if curl -f -s --max-time "$timeout" "$url" >/dev/null 2>&1; then
            return 0
        else
            return 1
        fi
    elif command -v wget >/dev/null 2>&1; then
        # Use wget as fallback
        if wget -q --timeout="$timeout" --tries=1 -O /dev/null "$url" >/dev/null 2>&1; then
            return 0
        else
            return 1
        fi
    else
        log_error "Neither curl nor wget is available for health check"
        return 1
    fi
}

# Function to check application health
check_application_health() {
    local retries=0
    
    while [[ $retries -lt $MAX_RETRIES ]]; do
        log_info "Health check attempt $((retries + 1))/$MAX_RETRIES"
        
        if check_http_endpoint "$HEALTH_URL" "$TIMEOUT"; then
            log_success "Application health check passed"
            return 0
        else
            log_warning "Health check failed, retrying..."
            retries=$((retries + 1))
            
            if [[ $retries -lt $MAX_RETRIES ]]; then
                sleep 2
            fi
        fi
    done
    
    log_error "Application health check failed after $MAX_RETRIES attempts"
    return 1
}

# Function to check system resources
check_system_resources() {
    # Check memory usage
    if command -v free >/dev/null 2>&1; then
        local mem_usage
        mem_usage=$(free | awk 'NR==2{printf "%.1f", $3*100/$2}')
        
        if (( $(echo "$mem_usage > 90" | bc -l) )); then
            log_warning "High memory usage: ${mem_usage}%"
        else
            log_info "Memory usage: ${mem_usage}%"
        fi
    fi
    
    # Check disk usage
    if command -v df >/dev/null 2>&1; then
        local disk_usage
        disk_usage=$(df /app | awk 'NR==2{print $5}' | sed 's/%//')
        
        if [[ $disk_usage -gt 90 ]]; then
            log_warning "High disk usage: ${disk_usage}%"
        else
            log_info "Disk usage: ${disk_usage}%"
        fi
    fi
}

# Function to check process status
check_process_status() {
    # Check if the main process is running
    if pgrep -f "uvicorn.*hijraah_mas" >/dev/null 2>&1; then
        log_success "Main application process is running"
        return 0
    else
        log_error "Main application process is not running"
        return 1
    fi
}

# Function to check external dependencies
check_external_dependencies() {
    local all_ok=true
    
    # Check Supabase connectivity (if configured)
    if [[ -n "${SUPABASE_URL}" && -n "${SUPABASE_KEY}" ]]; then
        log_info "Checking Supabase connectivity..."
        
        if python3 -c "
import os
import sys
from supabase import create_client
try:
    client = create_client(os.getenv('SUPABASE_URL'), os.getenv('SUPABASE_KEY'))
    # Simple connectivity test
    result = client.table('_health').select('*').limit(1).execute()
    sys.exit(0)
except Exception:
    sys.exit(1)
" 2>/dev/null; then
            log_success "Supabase connectivity OK"
        else
            log_warning "Supabase connectivity failed"
            all_ok=false
        fi
    fi
    
    # Check Redis connectivity (if configured)
    if [[ -n "${REDIS_URL}" ]]; then
        log_info "Checking Redis connectivity..."
        
        # Extract host and port from Redis URL
        local redis_host
        local redis_port
        redis_host=$(echo "${REDIS_URL}" | sed -n 's/.*:\/\/\([^:]*\).*/\1/p')
        redis_port=$(echo "${REDIS_URL}" | sed -n 's/.*:\([0-9]*\).*/\1/p')
        
        if command -v nc >/dev/null 2>&1; then
            if nc -z "${redis_host:-localhost}" "${redis_port:-6379}" 2>/dev/null; then
                log_success "Redis connectivity OK"
            else
                log_warning "Redis connectivity failed"
                all_ok=false
            fi
        else
            log_warning "Cannot check Redis connectivity (nc not available)"
        fi
    fi
    
    return $([[ $all_ok == true ]] && echo 0 || echo 1)
}

# Main health check function
main() {
    log_info "Starting Hijraah MAS health check..."
    
    local exit_code=0
    
    # Check application health (primary check)
    if ! check_application_health; then
        exit_code=1
    fi
    
    # Check process status
    if ! check_process_status; then
        exit_code=1
    fi
    
    # Check system resources (informational)
    check_system_resources
    
    # Check external dependencies (informational)
    if ! check_external_dependencies; then
        log_warning "Some external dependencies are not available"
        # Don't fail the health check for external dependencies
        # exit_code=1
    fi
    
    if [[ $exit_code -eq 0 ]]; then
        log_success "Overall health check passed"
    else
        log_error "Overall health check failed"
    fi
    
    exit $exit_code
}

# Run main function
main "$@"