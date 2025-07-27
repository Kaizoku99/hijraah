# Hijraah Multi-Agent System (MAS)

A sophisticated multi-agent system built with [Agno](https://docs.agno.com) for providing comprehensive immigration analysis and advisory services.

## Overview

The Hijraah MAS leverages specialized AI agents working collaboratively to analyze complex immigration scenarios from multiple perspectives. Each agent brings domain expertise in areas such as policy research, document analysis, success prediction, and community validation.

## Features

- **Specialized Agents**: Immigration specialists, policy researchers, document analysts, prediction experts, and community validators
- **Team Coordination**: Agents work together using Agno's Team framework for comprehensive analysis
- **Real-time Monitoring**: AgentOps integration for performance tracking and analytics
- **Multi-modal Processing**: Support for text, image, and document analysis
- **Context Sharing**: Shared access to Hijraah's knowledge base and vector storage
- **Scalable Architecture**: Each agent can be scaled independently

## Architecture

The MAS integrates seamlessly with Hijraah's existing TypeScript Turborepo through a hybrid approach:

```
Hijraah Turborepo (TypeScript) ←→ Python MAS Package ←→ Shared Resources
```

### Agent Types

1. **Immigration Agent**: Expert immigration advice and policy analysis
2. **Policy Research Agent**: Real-time policy monitoring and change detection
3. **Document Analysis Agent**: OCR and structured document extraction
4. **Prediction Agent**: Success probability and timeline modeling
5. **Community Validation Agent**: User experience verification and validation

## Quick Start

### Installation

```bash
# Install in development mode
pip install -e .

# Install with development dependencies
pip install -e ".[dev]"
```

### Environment Setup

Create a `.env` file in the package root:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Anthropic Configuration (for Claude)
ANTHROPIC_API_KEY=your_anthropic_api_key

# AgentOps Configuration
AGENTOPS_API_KEY=your_agentops_api_key

# FastAPI Configuration
MAS_HOST=0.0.0.0
MAS_PORT=8000
MAS_DEBUG=false

# Redis Configuration (for caching)
REDIS_URL=redis://localhost:6379

# Logging Configuration
LOG_LEVEL=INFO
```

### Running the MAS API

```bash
# Start the FastAPI server
uvicorn hijraah_mas.api.main:app --reload --host 0.0.0.0 --port 8000

# Or use the CLI
hijraah-mas serve --host 0.0.0.0 --port 8000
```

### Basic Usage

```python
from hijraah_mas.teams.immigration_team import ImmigrationTeam

# Initialize the team
team = ImmigrationTeam(
    supabase_url="your_supabase_url",
    supabase_key="your_supabase_key"
)

# Process an immigration query
result = await team.process_immigration_query(
    user_data={"country": "India", "education": "Masters"},
    query="What are the requirements for a US work visa?"
)

print(result["analysis"])
```

## API Endpoints

### Health Check

```
GET /health
```

### Immigration Analysis

```
POST /analyze
Content-Type: application/json

{
  "user_id": "string",
  "query": "string",
  "user_profile": {},
  "context": {}
}
```

### Agent Status

```
GET /agents/status
```

### Metrics

```
GET /metrics
```

## Development

### Setup Development Environment

```bash
# Clone and install dependencies
git clone <repository>
cd packages/hijraah-mas
pip install -e ".[dev]"

# Install pre-commit hooks
pre-commit install
```

### Running Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=hijraah_mas --cov-report=html

# Run specific test types
pytest -m unit
pytest -m integration
```

### Code Quality

```bash
# Format code
black src/ tests/
ruff check src/ tests/ --fix

# Type checking
mypy src/
```

### Docker Development

```bash
# Build the Docker image
docker build -t hijraah-mas .

# Run the container
docker run -p 8000:8000 --env-file .env hijraah-mas
```

## Integration with Hijraah Turborepo

The MAS integrates with the main Hijraah application through:

1. **TypeScript Client**: `packages/hijraah-ai/src/mas-client.ts`
2. **API Routes**: `apps/web/src/app/api/mas/route.ts`
3. **Trigger.dev Tasks**: Scheduled operations and event-driven workflows
4. **Shared Database**: Supabase for data storage and retrieval

## Monitoring and Observability

- **AgentOps**: Comprehensive agent monitoring and analytics
- **Prometheus Metrics**: Performance and usage metrics
- **Structured Logging**: JSON-formatted logs with correlation IDs
- **Health Checks**: Readiness and liveness probes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run the test suite
6. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support and questions:

- Documentation: [https://docs.hijraah.com](https://docs.hijraah.com)
- Issues: [GitHub Issues](https://github.com/hijraah/hijraah/issues)
- Community: [Discord](https://discord.gg/hijraah)
