# Dokploy Management Skill

Comprehensive skill for managing Dokploy instances via CLI, API, and production CI/CD patterns.

## Overview

This skill provides complete workflows and tools for:
- **Authentication**: Interactive setup and environment variable management
- **Deployment**: Application, database, and multi-service deployments
- **CI/CD**: GitHub Actions integration with health checks
- **Environment Management**: Safe environment variable sync with backup
- **Zero-Downtime**: Production-ready health check configurations
- **Monitoring**: Health check scripts and alerting patterns

## Quick Start

### 1. Install Dokploy CLI

```bash
npm install -g @dokploy/cli
```

### 2. Authenticate

```bash
# Interactive (saves to config file)
dokploy authenticate

# OR using environment variables (recommended for CI/CD)
export DOKPLOY_URL="https://panel.dokploy.com"
export DOKPLOY_AUTH_TOKEN="your-token"
```

### 3. Deploy Application

```bash
dokploy app:deploy --skipConfirm
```

## Contents

### SKILL.md
Main skill documentation with:
- Quick reference table
- Installation and setup
- Command patterns and structures
- Core workflows (setup, deployment, database, CI/CD)
- Complete command reference
- Best practices
- Common gotchas and troubleshooting

### references/
Detailed documentation for advanced use:

#### api-reference.md
- Complete API endpoint documentation
- Authentication headers and formats
- Request/response examples
- CLI to API mapping
- Error handling
- Language-specific examples (Bash, Python, TypeScript)

#### advanced-workflows.md
- Multi-environment deployment strategies
- Zero-downtime deployment patterns
- Complete docker-compose.yml examples
- GitHub Actions CI/CD pipelines
- Environment variable management with backups
- Database backup and restore scripts
- Monitoring and alerting
- Blue-green deployment patterns

### scripts/
Executable helper scripts:

#### quick-auth.sh
Authentication helper with:
- Authentication status checking
- Interactive credential setup
- Environment variable instructions
- Direct credential verification

#### deploy.sh
Simple deployment script:
- Direct API deployment
- Error handling
- JSON response formatting

### assets/
Template files:

#### docker-compose.template.yml
Production-ready compose file with:
- External dokploy-network
- Health checks for zero-downtime
- PostgreSQL and Redis services
- Resource limits

#### github-actions.template.yml
Complete CI/CD workflow with:
- Docker image building
- GitHub Container Registry push
- Dokploy deployment
- Health check validation

## Skill Triggers

This skill is automatically invoked when you mention:
- "dokploy deploy"
- "manage dokploy"
- "dokploy app"
- "dokploy database"
- "push to dokploy"
- "dokploy CI/CD"
- "dokploy authentication"
- "zero-downtime deployment"
- "dokploy docker-compose"
- "dokploy environment variables"
- "dokploy health checks"

## Usage Examples

### Deploy to Production

```bash
# Using CLI
dokploy app:deploy \
  --applicationId abc123 \
  --skipConfirm

# Using helper script
./scripts/deploy.sh abc123

# Using API directly
curl -X POST "$DOKPLOY_URL/api/application.deploy" \
  -H "x-api-key: $DOKPLOY_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"applicationId": "abc123"}'
```

### Environment Variable Sync

```bash
# Pull (with backup)
dokploy env pull .env.production

# Edit locally
vim .env.production

# Push (replaces remote - be careful!)
dokploy env push .env.production
```

### Create PostgreSQL Database

```bash
dokploy database:postgres:create \
  --name "Production DB" \
  --databaseName myapp \
  --databasePassword $DB_PASSWORD \
  --skipConfirm
```

### GitHub Actions Deployment

```yaml
- uses: benbristow/dokploy-deploy-action@0.2.2
  with:
    dokploy_url: ${{ secrets.DOKPLOY_URL }}
    api_token: ${{ secrets.DOKPLOY_AUTH_TOKEN }}
    application_id: ${{ secrets.DOKPLOY_APP_ID }}
```

## Key Features

### ✅ Zero-Downtime Deployments
- Health check configuration
- External network setup
- Proper service dependencies

### ✅ Production-Ready CI/CD
- GitHub Actions templates
- Multi-environment support
- Health check validation
- Automated rollback patterns

### ✅ Safe Environment Management
- Backup before push
- Diff visualization
- Merge workflows

### ✅ Comprehensive Database Support
- PostgreSQL, MySQL, MariaDB, MongoDB, Redis
- Automated backup scripts
- Restore procedures

### ✅ API and CLI Flexibility
- Use CLI for development
- Use API for automation
- Complete endpoint documentation

## Best Practices

1. **Always use `--skipConfirm` for automation**
2. **Environment variables > config file for CI/CD**
3. **NEVER push env vars without pulling first**
4. **Configure health checks for zero-downtime**
5. **Use external `dokploy-network`**
6. **Test deployments in staging first**

## Troubleshooting

### Authentication Issues
```bash
# Check status
dokploy verify

# Re-authenticate
dokploy authenticate --url=... --token=...
```

### Deployment Failures
1. Check health endpoint responds with HTTP 200
2. Verify `start_period` is sufficient for startup
3. Ensure `dokploy-network` exists
4. Check Dokploy web UI logs

### Environment Variables Lost
- Recovery: Pull from Dokploy UI manually
- Prevention: **ALWAYS** pull before push

## Resources

- **CLI Repository**: https://github.com/Dokploy/cli
- **Official Docs**: https://docs.dokploy.com
- **GitHub Actions**: 
  - [benbristow/dokploy-deploy-action](https://github.com/benbristow/dokploy-deploy-action)
  - [SSanjeevi/dokployaction](https://github.com/SSanjeevi/dokployaction)

## Version

**CLI Version**: v0.2.8  
**Skill Version**: 1.0.0  
**Last Updated**: 2026-01-16
