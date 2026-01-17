# Advanced Vercel Workflows

Production-ready patterns for CI/CD, multi-environment deployments, and automation.

## Table of Contents

1. [Multi-Environment Deployment Strategies](#multi-environment-deployment-strategies)
2. [GitHub Actions CI/CD](#github-actions-cicd)
3. [Environment Variable Management](#environment-variable-management)
4. [Zero-Downtime Deployments](#zero-downtime-deployments)
5. [Monorepo Deployments](#monorepo-deployments)
6. [Preview Deployments](#preview-deployments)
7. [Deployment Protection](#deployment-protection)
8. [Monitoring & Alerts](#monitoring--alerts)
9. [Rollback Strategies](#rollback-strategies)
10. [Custom Domain Automation](#custom-domain-automation)

---

## Multi-Environment Deployment Strategies

### Strategy 1: Branch-Based Environments

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main, staging, development]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Vercel CLI
        run: npm install --global vercel@latest

      - name: Pull Vercel Environment Information
        run: |
          if [ "${{ github.ref }}" == "refs/heads/main" ]; then
            vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
          elif [ "${{ github.ref }}" == "refs/heads/staging" ]; then
            vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
          else
            vercel pull --yes --environment=development --token=${{ secrets.VERCEL_TOKEN }}
          fi

      - name: Build Project
        run: |
          if [ "${{ github.ref }}" == "refs/heads/main" ]; then
            vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
          else
            vercel build --token=${{ secrets.VERCEL_TOKEN }}
          fi

      - name: Deploy
        id: deploy
        run: |
          if [ "${{ github.ref }}" == "refs/heads/main" ]; then
            url=$(vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }})
          else
            url=$(vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }})
          fi
          echo "url=$url" >> $GITHUB_OUTPUT

      - name: Comment PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `🚀 Deployed to: ${{ steps.deploy.outputs.url }}`
            })
```

### Strategy 2: Manual Environment Selection

```bash
#!/bin/bash
# deploy.sh

set -e

ENVIRONMENT=${1:-preview}
TOKEN=${VERCEL_TOKEN:-}

if [ -z "$TOKEN" ]; then
  echo "Error: VERCEL_TOKEN not set"
  exit 1
fi

echo "Deploying to $ENVIRONMENT..."

# Pull environment configuration
vercel pull --yes --environment=$ENVIRONMENT --token=$TOKEN

# Build
if [ "$ENVIRONMENT" == "production" ]; then
  vercel build --prod --token=$TOKEN
else
  vercel build --token=$TOKEN
fi

# Deploy
if [ "$ENVIRONMENT" == "production" ]; then
  url=$(vercel deploy --prebuilt --prod --token=$TOKEN)
else
  url=$(vercel deploy --prebuilt --token=$TOKEN)
fi

echo "Deployed to: $url"
echo "$url" > deployment-url.txt
```

Usage:
```bash
./deploy.sh production
./deploy.sh preview
./deploy.sh development
```

---

## GitHub Actions CI/CD

### Complete Production Workflow

```yaml
# .github/workflows/production.yml
name: Production Deployment

on:
  push:
    branches: [main]
  workflow_dispatch:

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run linter
        run: npm run lint
      
      - name: Type check
        run: npm run type-check

  deploy:
    needs: test
    runs-on: ubuntu-latest
    outputs:
      url: ${{ steps.deploy.outputs.url }}
    steps:
      - uses: actions/checkout@v4

      - name: Install Vercel CLI
        run: npm install --global vercel@latest

      - name: Pull Vercel Environment
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build Project
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy to Vercel (Staged)
        id: deploy
        run: |
          url=$(vercel deploy --prebuilt --prod --skip-domain --token=${{ secrets.VERCEL_TOKEN }})
          echo "url=$url" >> $GITHUB_OUTPUT
          echo "Deployed to staging: $url"

      - name: Run E2E Tests
        run: |
          export TEST_URL="${{ steps.deploy.outputs.url }}"
          npm run test:e2e

      - name: Promote to Production
        if: success()
        run: vercel promote ${{ steps.deploy.outputs.url }} --token=${{ secrets.VERCEL_TOKEN }}

      - name: Rollback on Failure
        if: failure()
        run: |
          echo "Deployment failed, not promoting to production"
          vercel remove ${{ steps.deploy.outputs.url }} --yes --token=${{ secrets.VERCEL_TOKEN }}

  notify:
    needs: deploy
    runs-on: ubuntu-latest
    if: always()
    steps:
      - name: Notify Slack
        if: success()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "✅ Production deployment succeeded: ${{ needs.deploy.outputs.url }}"
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}

      - name: Notify on Failure
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "❌ Production deployment failed"
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

### Preview Deployment Workflow

```yaml
# .github/workflows/preview.yml
name: Preview Deployment

on:
  pull_request:
    types: [opened, synchronize, reopened]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Vercel CLI
        run: npm install --global vercel@latest

      - name: Pull Vercel Environment
        run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build Project
        run: vercel build --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy Preview
        id: deploy
        run: |
          url=$(vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }})
          echo "url=$url" >> $GITHUB_OUTPUT

      - name: Assign Custom Preview Alias
        run: |
          alias="pr-${{ github.event.pull_request.number }}-${{ github.event.repository.name }}.vercel.app"
          vercel alias set ${{ steps.deploy.outputs.url }} $alias --token=${{ secrets.VERCEL_TOKEN }}
          echo "preview_alias=$alias" >> $GITHUB_OUTPUT
        id: alias

      - name: Comment on PR
        uses: actions/github-script@v7
        with:
          script: |
            const comment = `🚀 **Preview Deployment Ready**

            📱 **Preview URL:** ${{ steps.deploy.outputs.url }}
            🔗 **Custom Alias:** https://${{ steps.alias.outputs.preview_alias }}

            Deployed commit: ${context.sha.substring(0, 7)}

            <details>
            <summary>Deployment Details</summary>

            - **Environment:** Preview
            - **Branch:** ${{ github.head_ref }}
            - **Workflow:** [View Run](${context.serverUrl}/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId})
            </details>`;

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
```

---

## Environment Variable Management

### Sync Script with Backup

```bash
#!/bin/bash
# scripts/env-sync.sh

set -e

PROJECT_ID=${VERCEL_PROJECT_ID:-}
TOKEN=${VERCEL_TOKEN:-}

if [ -z "$PROJECT_ID" ] || [ -z "$TOKEN" ]; then
  echo "Error: VERCEL_PROJECT_ID and VERCEL_TOKEN must be set"
  exit 1
fi

# Backup current environment variables
backup_env() {
  local env=$1
  local backup_file="backups/env-$env-$(date +%Y%m%d-%H%M%S).json"
  
  mkdir -p backups
  
  curl -s "https://api.vercel.com/v9/projects/$PROJECT_ID/env" \
    -H "Authorization: Bearer $TOKEN" \
    | jq ".envs | map(select(.target[] == \"$env\"))" \
    > "$backup_file"
  
  echo "Backed up $env environment to $backup_file"
}

# Pull environment variables
pull_env() {
  local env=$1
  local output_file=".env.$env"
  
  backup_env "$env"
  vercel env pull --environment=$env --yes "$output_file" --token=$TOKEN
  echo "Pulled $env environment to $output_file"
}

# Push environment variable
push_env() {
  local key=$1
  local value=$2
  local target=$3
  
  echo "$value" | vercel env add "$key" "$target" --force --token=$TOKEN
  echo "Added/updated $key for $target"
}

# Bulk push from file
bulk_push() {
  local env_file=$1
  local target=$2
  
  backup_env "$target"
  
  while IFS='=' read -r key value; do
    # Skip comments and empty lines
    [[ $key =~ ^#.*$ ]] && continue
    [[ -z $key ]] && continue
    
    echo "$value" | vercel env add "$key" "$target" --force --token=$TOKEN
    echo "Synced: $key"
  done < "$env_file"
  
  echo "Bulk push completed for $target"
}

# Command dispatcher
case "$1" in
  pull)
    pull_env "$2"
    ;;
  push)
    if [ -f "$2" ]; then
      bulk_push "$2" "$3"
    else
      push_env "$2" "$3" "$4"
    fi
    ;;
  backup)
    backup_env "$2"
    ;;
  *)
    echo "Usage:"
    echo "  $0 pull <environment>                    # Pull env vars"
    echo "  $0 push <file> <target>                  # Bulk push from file"
    echo "  $0 push <key> <value> <target>           # Push single var"
    echo "  $0 backup <environment>                  # Backup only"
    exit 1
    ;;
esac
```

Usage:
```bash
# Pull production environment
./env-sync.sh pull production

# Edit locally
vim .env.production

# Backup before push
./env-sync.sh backup production

# Push changes
./env-sync.sh push .env.production production

# Push single variable
./env-sync.sh push API_KEY "secret-value" production
```

### Environment Variable Diff

```bash
#!/bin/bash
# scripts/env-diff.sh

PROJECT_ID=${VERCEL_PROJECT_ID:-}
TOKEN=${VERCEL_TOKEN:-}

diff_environments() {
  local env1=$1
  local env2=$2
  
  # Pull both environments
  vercel env pull --environment=$env1 --yes ".env.$env1.tmp" --token=$TOKEN
  vercel env pull --environment=$env2 --yes ".env.$env2.tmp" --token=$TOKEN
  
  # Sort and diff
  sort ".env.$env1.tmp" > ".env.$env1.sorted"
  sort ".env.$env2.tmp" > ".env.$env2.sorted"
  
  echo "Differences between $env1 and $env2:"
  echo "======================================"
  diff -u ".env.$env1.sorted" ".env.$env2.sorted" || true
  
  # Cleanup
  rm ".env.$env1.tmp" ".env.$env2.tmp" ".env.$env1.sorted" ".env.$env2.sorted"
}

diff_environments "$1" "$2"
```

Usage:
```bash
./env-diff.sh production preview
```

---

## Zero-Downtime Deployments

### Health Check Pattern

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check database connection
    await db.ping();
    
    // Check external services
    const apiHealth = await fetch('https://api.example.com/health');
    if (!apiHealth.ok) throw new Error('API unhealthy');
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7)
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error.message
      },
      { status: 503 }
    );
  }
}
```

### Deployment with Health Checks

```bash
#!/bin/bash
# scripts/deploy-with-health-check.sh

set -e

TOKEN=${VERCEL_TOKEN:-}
MAX_RETRIES=30
RETRY_DELAY=10

health_check() {
  local url=$1
  local retries=0
  
  echo "Waiting for deployment to be healthy..."
  
  while [ $retries -lt $MAX_RETRIES ]; do
    status=$(curl -s -o /dev/null -w "%{http_code}" "$url/api/health" || echo "000")
    
    if [ "$status" == "200" ]; then
      echo "✅ Deployment is healthy!"
      return 0
    fi
    
    retries=$((retries + 1))
    echo "Attempt $retries/$MAX_RETRIES: Health check returned $status, retrying in ${RETRY_DELAY}s..."
    sleep $RETRY_DELAY
  done
  
  echo "❌ Deployment failed health checks after $MAX_RETRIES attempts"
  return 1
}

# Deploy to staging
echo "Deploying to staging..."
staging_url=$(vercel deploy --prebuilt --prod --skip-domain --token=$TOKEN)
echo "Deployed to: $staging_url"

# Health check
if health_check "$staging_url"; then
  echo "Promoting to production..."
  vercel promote "$staging_url" --token=$TOKEN
  echo "✅ Production deployment complete!"
else
  echo "❌ Rolling back failed deployment..."
  vercel remove "$staging_url" --yes --token=$TOKEN
  exit 1
fi
```

### Gradual Rollout with Custom Domains

```bash
#!/bin/bash
# scripts/gradual-rollout.sh

set -e

NEW_DEPLOYMENT=$1
CANARY_DOMAIN="canary.example.com"
PRODUCTION_DOMAIN="example.com"
TOKEN=${VERCEL_TOKEN:-}

# Step 1: Deploy to canary
echo "Assigning canary domain..."
vercel alias set "$NEW_DEPLOYMENT" "$CANARY_DOMAIN" --token=$TOKEN

# Step 2: Monitor metrics (placeholder)
echo "Monitoring canary deployment for 10 minutes..."
sleep 600

# Step 3: Check error rate
# (Integrate with your monitoring solution)
ERROR_RATE=$(curl -s "https://api.example.com/metrics/error-rate?domain=$CANARY_DOMAIN")

if [ "$ERROR_RATE" -lt 5 ]; then
  echo "Error rate acceptable, promoting to production..."
  vercel alias set "$NEW_DEPLOYMENT" "$PRODUCTION_DOMAIN" --token=$TOKEN
  echo "✅ Gradual rollout complete!"
else
  echo "❌ Error rate too high ($ERROR_RATE%), aborting rollout"
  exit 1
fi
```

---

## Monorepo Deployments

### Multiple Projects from Single Repo

```yaml
# .github/workflows/monorepo.yml
name: Monorepo Deployment

on:
  push:
    branches: [main]

jobs:
  detect-changes:
    runs-on: ubuntu-latest
    outputs:
      web: ${{ steps.filter.outputs.web }}
      api: ${{ steps.filter.outputs.api }}
      admin: ${{ steps.filter.outputs.admin }}
    steps:
      - uses: actions/checkout@v4
      
      - uses: dorny/paths-filter@v2
        id: filter
        with:
          filters: |
            web:
              - 'apps/web/**'
            api:
              - 'apps/api/**'
            admin:
              - 'apps/admin/**'

  deploy-web:
    needs: detect-changes
    if: needs.detect-changes.outputs.web == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy Web
        run: |
          cd apps/web
          vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
          vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
          vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}

  deploy-api:
    needs: detect-changes
    if: needs.detect-changes.outputs.api == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy API
        run: |
          cd apps/api
          vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
          vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
          vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}

  deploy-admin:
    needs: detect-changes
    if: needs.detect-changes.outputs.admin == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy Admin
        run: |
          cd apps/admin
          vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
          vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
          vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

### Turborepo Integration

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", ".vercel/output/**"]
    },
    "deploy": {
      "dependsOn": ["build"],
      "cache": false
    }
  }
}
```

```yaml
# .github/workflows/turborepo.yml
- name: Build with Turborepo
  run: npx turbo run build --filter=web

- name: Deploy
  run: |
    cd apps/web
    vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## Preview Deployments

### Branch-Based Preview Aliases

```yaml
# .github/workflows/preview-alias.yml
name: Preview with Custom Alias

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy Preview
        run: |
          url=$(vercel deploy --token=${{ secrets.VERCEL_TOKEN }})
          echo "DEPLOYMENT_URL=$url" >> $GITHUB_ENV

      - name: Create Branch-Based Alias
        run: |
          # Sanitize branch name for DNS
          branch="${{ github.head_ref }}"
          safe_branch=$(echo "$branch" | tr '/' '-' | tr '_' '-' | tr '[:upper:]' '[:lower:]')
          alias="$safe_branch-preview.vercel.app"
          
          vercel alias set $DEPLOYMENT_URL $alias --token=${{ secrets.VERCEL_TOKEN }}
          echo "PREVIEW_ALIAS=$alias" >> $GITHUB_ENV

      - name: Comment PR
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `Preview: https://${process.env.PREVIEW_ALIAS}`
            });
```

### Automatic Preview Cleanup

```yaml
# .github/workflows/cleanup-preview.yml
name: Cleanup Preview

on:
  pull_request:
    types: [closed]

jobs:
  cleanup:
    runs-on: ubuntu-latest
    steps:
      - name: Remove Preview Deployments
        run: |
          # Get all preview deployments for this PR
          deployments=$(vercel list --meta pr=${{ github.event.pull_request.number }} --token=${{ secrets.VERCEL_TOKEN }} | jq -r '.deployments[].url')
          
          for deployment in $deployments; do
            echo "Removing $deployment"
            vercel remove $deployment --yes --token=${{ secrets.VERCEL_TOKEN }}
          done
```

---

## Deployment Protection

### Password Protection

```json
// vercel.json
{
  "security": {
    "authentication": {
      "type": "password",
      "password": {
        "passwordHash": "$2a$10$..."
      }
    }
  }
}
```

Generate password hash:
```bash
npm install -g bcrypt-cli
bcrypt-cli hash "my-password" 10
```

### IP Allowlist (Enterprise)

```json
// vercel.json
{
  "security": {
    "allowlist": {
      "ips": [
        "192.168.1.0/24",
        "10.0.0.0/8"
      ]
    }
  }
}
```

---

## Monitoring & Alerts

### Webhook Integration

```typescript
// api/webhooks/deployment.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  const signature = request.headers.get('x-vercel-signature');
  const body = await request.text();
  
  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac('sha1', process.env.WEBHOOK_SECRET!)
    .update(body)
    .digest('hex');
  
  if (signature !== expectedSignature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }
  
  const event = JSON.parse(body);
  
  // Handle deployment events
  switch (event.type) {
    case 'deployment.succeeded':
      await notifySlack(`✅ Deployment succeeded: ${event.payload.url}`);
      break;
    case 'deployment.error':
      await notifySlack(`❌ Deployment failed: ${event.payload.name}`);
      await createIncident(event.payload);
      break;
  }
  
  return NextResponse.json({ received: true });
}
```

### Custom Monitoring Script

```bash
#!/bin/bash
# scripts/monitor-deployments.sh

TOKEN=${VERCEL_TOKEN:-}
PROJECT_ID=${VERCEL_PROJECT_ID:-}
SLACK_WEBHOOK=${SLACK_WEBHOOK_URL:-}

while true; do
  # Get latest production deployment
  latest=$(curl -s "https://api.vercel.com/v6/deployments?projectId=$PROJECT_ID&target=production&limit=1" \
    -H "Authorization: Bearer $TOKEN" \
    | jq -r '.deployments[0]')
  
  state=$(echo "$latest" | jq -r '.state')
  url=$(echo "$latest" | jq -r '.url')
  
  if [ "$state" == "ERROR" ]; then
    # Send alert
    curl -X POST "$SLACK_WEBHOOK" \
      -H 'Content-Type: application/json' \
      -d "{\"text\": \"❌ Production deployment failed: $url\"}"
  fi
  
  sleep 300  # Check every 5 minutes
done
```

---

## Rollback Strategies

### Automated Rollback on Error

```bash
#!/bin/bash
# scripts/deploy-with-rollback.sh

set -e

TOKEN=${VERCEL_TOKEN:-}
HEALTH_ENDPOINT="/api/health"

# Get current production deployment
current_prod=$(vercel list --prod --meta production=true --token=$TOKEN | jq -r '.deployments[0].url')

echo "Current production: $current_prod"

# Deploy new version
new_deployment=$(vercel deploy --prebuilt --prod --skip-domain --token=$TOKEN)
echo "New deployment: $new_deployment"

# Health check
if curl -f "https://$new_deployment$HEALTH_ENDPOINT" > /dev/null 2>&1; then
  echo "✅ Health check passed, promoting..."
  vercel promote "$new_deployment" --token=$TOKEN
else
  echo "❌ Health check failed, rolling back..."
  vercel remove "$new_deployment" --yes --token=$TOKEN
  
  # Ensure old version is still promoted
  vercel promote "$current_prod" --token=$TOKEN
  exit 1
fi
```

### Version Tagging

```bash
#!/bin/bash
# Tag deployments with version metadata

VERSION=$(git describe --tags --always)
COMMIT_SHA=$(git rev-parse HEAD)

vercel deploy \
  --prod \
  --meta version="$VERSION" \
  --meta commit="$COMMIT_SHA" \
  --meta deployed-by="$USER" \
  --meta deployed-at="$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  --token=$VERCEL_TOKEN
```

---

## Custom Domain Automation

### Automated Domain Setup

```bash
#!/bin/bash
# scripts/setup-domain.sh

set -e

DOMAIN=$1
TOKEN=${VERCEL_TOKEN:-}

# Add domain
echo "Adding domain $DOMAIN..."
curl -X POST "https://api.vercel.com/v5/domains" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"$DOMAIN\"}"

# Wait for DNS propagation
echo "Waiting for DNS propagation..."
sleep 60

# Verify domain
echo "Verifying domain..."
curl -X POST "https://api.vercel.com/v5/domains/$DOMAIN/verify" \
  -H "Authorization: Bearer $TOKEN"

# Issue SSL certificate
echo "Issuing SSL certificate..."
vercel certs add "$DOMAIN" --token=$TOKEN

echo "✅ Domain setup complete!"
```

### Multi-Region DNS Setup

```bash
#!/bin/bash
# scripts/setup-geo-dns.sh

DOMAIN=$1
TOKEN=${VERCEL_TOKEN:-}

# Add regional A records
vercel dns add "$DOMAIN" us A 76.76.21.21 --token=$TOKEN
vercel dns add "$DOMAIN" eu A 76.76.21.98 --token=$TOKEN
vercel dns add "$DOMAIN" asia A 76.76.21.164 --token=$TOKEN

# Add CNAME for www
vercel dns add "$DOMAIN" www CNAME cname.vercel-dns.com --token=$TOKEN

echo "✅ Multi-region DNS configured!"
```

---

## Complete Production Pipeline

Putting it all together:

```yaml
# .github/workflows/production-complete.yml
name: Complete Production Pipeline

on:
  push:
    branches: [main]
  workflow_dispatch:

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  quality-checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm test
      - run: npm run test:e2e

  build-and-deploy-staging:
    needs: quality-checks
    runs-on: ubuntu-latest
    outputs:
      staging-url: ${{ steps.deploy.outputs.url }}
    steps:
      - uses: actions/checkout@v4
      - run: npm install --global vercel@latest
      
      - name: Pull Environment
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Build
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Deploy to Staging
        id: deploy
        run: |
          url=$(vercel deploy --prebuilt --prod --skip-domain --token=${{ secrets.VERCEL_TOKEN }})
          echo "url=$url" >> $GITHUB_OUTPUT

  health-checks:
    needs: build-and-deploy-staging
    runs-on: ubuntu-latest
    steps:
      - name: Wait for Deployment
        run: sleep 30
      
      - name: Health Check
        run: |
          for i in {1..30}; do
            status=$(curl -s -o /dev/null -w "%{http_code}" "${{ needs.build-and-deploy-staging.outputs.staging-url }}/api/health")
            if [ "$status" == "200" ]; then
              echo "✅ Health check passed"
              exit 0
            fi
            echo "Attempt $i: Status $status, retrying..."
            sleep 10
          done
          echo "❌ Health check failed"
          exit 1

  smoke-tests:
    needs: [build-and-deploy-staging, health-checks]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      
      - name: Run Smoke Tests
        env:
          TEST_URL: ${{ needs.build-and-deploy-staging.outputs.staging-url }}
        run: npm run test:smoke

  promote-to-production:
    needs: [build-and-deploy-staging, smoke-tests]
    runs-on: ubuntu-latest
    steps:
      - name: Promote
        run: |
          vercel promote ${{ needs.build-and-deploy-staging.outputs.staging-url }} --token=${{ secrets.VERCEL_TOKEN }}
          echo "✅ Promoted to production"

  notify:
    needs: promote-to-production
    runs-on: ubuntu-latest
    if: always()
    steps:
      - name: Notify Success
        if: success()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "✅ Production deployment succeeded",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Production Deployment Complete* ✅\n\nCommit: ${{ github.sha }}\nActor: ${{ github.actor }}"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
      
      - name: Notify Failure
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "❌ Production deployment failed",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Production Deployment Failed* ❌\n\nCommit: ${{ github.sha }}\nActor: ${{ github.actor }}\n\n<${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}|View Logs>"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

---

## Best Practices Summary

1. **Always use staged deployments** for production (`--skip-domain` + `promote`)
2. **Implement health checks** before promoting
3. **Backup environment variables** before modifications
4. **Use metadata tags** for deployment tracking
5. **Set up webhooks** for deployment notifications
6. **Implement gradual rollouts** for high-traffic applications
7. **Use branch-based aliases** for preview deployments
8. **Clean up old preview deployments** to save resources
9. **Monitor error rates** in canary deployments
10. **Automate rollbacks** on failed health checks
