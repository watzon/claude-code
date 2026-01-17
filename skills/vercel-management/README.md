# Vercel Management Skill

Comprehensive skill for managing Vercel projects entirely via CLI and API, eliminating the need for dashboard access.

## Overview

This skill provides complete workflows and tools for:
- **Deployment**: Production, preview, and development deployments
- **Domain Management**: Adding domains, SSL certificates, DNS configuration
- **Environment Variables**: Safe sync, backup, and restore workflows
- **CI/CD**: GitHub Actions integration with health checks
- **Team Collaboration**: Team context switching and project management
- **Monitoring**: Logs, webhooks, and deployment tracking

## Quick Start

### 1. Install Vercel CLI

```bash
npm install -g vercel@latest
```

### 2. Authenticate

```bash
vercel login
# Or for CI/CD:
export VERCEL_TOKEN="your-token"
```

### 3. Deploy

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod

# Or use helper script
./scripts/deploy.sh production
```

## Contents

### SKILL.md
Main skill documentation with:
- Quick reference table for common commands
- Complete CLI command reference
- Project management workflows
- Deployment strategies
- Environment variable management
- Domain and DNS configuration
- Local development setup
- Team management
- Troubleshooting guide

### references/

#### api-reference.md
Complete REST API documentation:
- Authentication and headers
- All API endpoints (deployments, projects, domains, DNS, etc.)
- Request/response examples
- Error handling
- Rate limiting
- CLI to API mapping
- Code examples in Bash, Python, TypeScript

#### advanced-workflows.md
Production-ready patterns:
- Multi-environment deployment strategies
- GitHub Actions CI/CD pipelines
- Environment variable sync with backup
- Zero-downtime deployments with health checks
- Monorepo deployment patterns
- Preview deployment automation
- Deployment protection
- Monitoring and alerts
- Rollback strategies
- Custom domain automation

### scripts/

#### deploy.sh
Smart deployment script with:
- Environment selection (production/preview/development)
- Automatic test execution
- Health checks before promotion
- Staged production deployments
- Error handling and rollback
- Colored output for clarity

Usage:
```bash
./scripts/deploy.sh production
./scripts/deploy.sh preview --skip-tests
./scripts/deploy.sh production --skip-health-check
```

#### env-sync.sh
Environment variable management:
- Pull environment variables to file
- Push single or bulk variables
- Automatic backups before changes
- Diff between environments
- Safe sync workflows

Usage:
```bash
./scripts/env-sync.sh pull production
./scripts/env-sync.sh push .env.production production
./scripts/env-sync.sh diff production preview
./scripts/env-sync.sh backup production
```

### assets/

#### vercel.json.template
Production-ready configuration:
- Security headers (CSP, X-Frame-Options, etc.)
- Cache control for static assets
- Redirects and rewrites
- Cron jobs
- Function configuration
- Image optimization
- GitHub integration

#### github-actions.template.yml
Complete CI/CD workflow:
- Quality checks (lint, type-check, tests)
- Preview deployments on PRs with comments
- Staged production deployments
- Health checks before promotion
- E2E tests
- Automatic rollback on failure
- Slack notifications
- Preview cleanup on PR close

## Skill Triggers

This skill is automatically invoked when you mention:
- "vercel deploy"
- "manage vercel"
- "vercel project"
- "vercel domain"
- "vercel environment"
- "vercel ci/cd"
- "vercel promotion"
- "vercel rollback"
- "vercel functions"
- "vercel edge"
- "vercel analytics"
- "vercel dns"
- "vercel ssl"
- "vercel team"

## Usage Examples

### Deploy to Production with Health Checks

```bash
# Using helper script
./scripts/deploy.sh production

# Manual workflow
vercel pull --yes --environment=production --token=$VERCEL_TOKEN
vercel build --prod --token=$VERCEL_TOKEN
staging_url=$(vercel deploy --prebuilt --prod --skip-domain --token=$VERCEL_TOKEN)
curl -f "$staging_url/api/health" && vercel promote "$staging_url" --token=$VERCEL_TOKEN
```

### Environment Variable Management

```bash
# Pull production variables
./scripts/env-sync.sh pull production

# Edit locally
vim .env.production

# Backup before push
./scripts/env-sync.sh backup production

# Push changes
./scripts/env-sync.sh push .env.production production

# Compare environments
./scripts/env-sync.sh diff production preview
```

### Custom Domain Setup

```bash
# Add domain
vercel domains add example.com

# Configure DNS
vercel dns add example.com @ A 76.76.21.21
vercel dns add example.com www CNAME cname.vercel-dns.com

# Issue SSL certificate
vercel certs add example.com www.example.com
```

### GitHub Actions Deployment

```yaml
# Copy assets/github-actions.template.yml to .github/workflows/deploy.yml
# Set secrets in GitHub:
# - VERCEL_TOKEN
# - VERCEL_ORG_ID
# - VERCEL_PROJECT_ID

# Push to main branch triggers production deployment
git push origin main
```

## Key Features

### ✅ Dashboard-Free Management
Complete Vercel management via CLI and API without touching the dashboard.

### ✅ Zero-Downtime Deployments
Staged production deployments with health checks before promotion.

### ✅ Safe Environment Variable Management
Automatic backups, diff visualization, and bulk sync workflows.

### ✅ Production-Ready CI/CD
GitHub Actions templates with quality checks, E2E tests, and notifications.

### ✅ Comprehensive Domain Management
DNS configuration, SSL certificates, and custom domain automation.

### ✅ Multi-Environment Support
Separate configurations for production, preview, and development.

## Best Practices

1. **Always use staged deployments** for production (`--skip-domain` + `promote`)
2. **Implement health checks** before promoting to production
3. **Backup environment variables** before any modifications
4. **Use environment-specific .env files** (.env.production, .env.preview)
5. **Tag deployments with metadata** for tracking (commit SHA, version, etc.)
6. **Set up webhooks** for deployment notifications
7. **Clean up preview deployments** when PRs are closed
8. **Use tokens for CI/CD** instead of interactive login
9. **Implement gradual rollouts** for high-traffic applications
10. **Monitor error rates** before full production promotion

## Troubleshooting

### Authentication Issues
```bash
vercel whoami
vercel logout && vercel login
```

### Deployment Failures
```bash
vercel --logs --prod
vercel inspect <deployment-id>
```

### Environment Variables Not Loading
```bash
vercel env pull --environment=production --yes
vercel env ls production
```

### Domain Not Working
```bash
vercel domains inspect example.com
vercel dns ls example.com
vercel certs ls
```

## Resources

- **CLI Version**: 50.4.5
- **Official Docs**: https://vercel.com/docs/cli
- **API Reference**: See `references/api-reference.md`
- **Advanced Workflows**: See `references/advanced-workflows.md`
- **Create Token**: https://vercel.com/account/tokens
- **GitHub Actions**: https://github.com/vercel/actions

## Version

**Skill Version**: 1.0.0  
**CLI Version**: 50.4.5  
**Last Updated**: 2026-01-17

## Contributing

This skill is designed to be comprehensive and production-ready. If you find any issues or have suggestions:

1. Check existing documentation in SKILL.md and references/
2. Review examples in assets/ and scripts/
3. Test workflows in a non-production environment first
4. Document any new patterns or workflows discovered

## License

This skill documentation is provided as-is for use with the Vercel CLI and API.
