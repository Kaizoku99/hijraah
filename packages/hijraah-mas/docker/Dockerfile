# Multi-stage Docker build for Hijraah MAS
# Based on Python 3.11 slim image for optimal size and security

# Build stage
FROM python:3.11-slim as builder

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Install system dependencies for building
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create and set working directory
WORKDIR /app

# Copy dependency files
COPY pyproject.toml README.md ./
COPY src/ ./src/

# Install Python dependencies
RUN pip install --upgrade pip setuptools wheel && \
    pip install -e .

# Production stage
FROM python:3.11-slim as production

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PATH="/app/.venv/bin:$PATH" \
    PYTHONPATH="/app/src:$PYTHONPATH"

# Install runtime system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Create non-root user for security
RUN groupadd -r hijraah && useradd -r -g hijraah hijraah

# Create application directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin
COPY --from=builder /app/src /app/src

# Create directories for logs and storage
RUN mkdir -p /app/logs /app/storage /app/tmp && \
    chown -R hijraah:hijraah /app

# Copy startup scripts
COPY docker/entrypoint.sh /app/entrypoint.sh
COPY docker/healthcheck.sh /app/healthcheck.sh

# Make scripts executable
RUN chmod +x /app/entrypoint.sh /app/healthcheck.sh

# Switch to non-root user
USER hijraah

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD /app/healthcheck.sh

# Set entrypoint
ENTRYPOINT ["/app/entrypoint.sh"]

# Default command
CMD ["uvicorn", "hijraah_mas.api.main:app", "--host", "0.0.0.0", "--port", "8000"]

# Development stage
FROM builder as development

# Install development dependencies
RUN pip install -e ".[dev]"

# Install additional development tools
RUN apt-get update && apt-get install -y \
    vim \
    htop \
    && rm -rf /var/lib/apt/lists/*

# Set development environment
ENV ENVIRONMENT=development \
    DEBUG=true \
    LOG_LEVEL=DEBUG

# Expose additional ports for development
EXPOSE 8000 9090

# Override entrypoint for development
ENTRYPOINT ["python", "-m", "hijraah_mas.api.main"]

# Testing stage
FROM development as testing

# Install test dependencies
RUN pip install -e ".[test]"

# Set testing environment
ENV ENVIRONMENT=testing \
    PYTHONPATH="/app/src:/app/tests:$PYTHONPATH"

# Copy test files
COPY tests/ ./tests/

# Run tests by default
CMD ["pytest", "-v", "--cov=hijraah_mas", "--cov-report=html", "--cov-report=term"]

# Labels for metadata
LABEL maintainer="Hijraah Team <team@hijraah.com>" \
      version="0.1.0" \
      description="Hijraah Multi-Agent System for Immigration Analysis" \
      org.opencontainers.image.title="Hijraah MAS" \
      org.opencontainers.image.description="Multi-Agent System for Immigration Analysis" \
      org.opencontainers.image.version="0.1.0" \
      org.opencontainers.image.vendor="Hijraah" \
      org.opencontainers.image.licenses="MIT" \
      org.opencontainers.image.source="https://github.com/hijraah/hijraah" \
      org.opencontainers.image.documentation="https://docs.hijraah.com"