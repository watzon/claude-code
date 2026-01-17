# Advanced Dokploy Workflows

Production-ready patterns, automation strategies, and advanced deployment scenarios.

## Multi-Environment Deployment Strategy

### Environment Structure

```
Company Project
├── Production
│   ├── Frontend (app-frontend-prod)
│   ├── Backend API (app-api-prod)
│   ├── Worker (app-worker-prod)
│   ├── PostgreSQL (db-postgres-prod)
│   └── Redis (cache-redis-prod)
├── Staging
│   ├── Frontend (app-frontend-staging)
│   ├── Backend API (app-api-staging)
│   ├── PostgreSQL (db-postgres-staging)
│   └── Redis (cache-redis-staging)
└── Development
    ├── Frontend (app-frontend-dev)
    └── Backend API (app-api-dev)
```

### Deployment Script

```bash
#!/usr/bin/env bash
set -euo pipefail

ENVIRONMENT="${1:-staging}"
DOKPLOY_URL="${DOKPLOY_URL:?DOKPLOY_URL required}"
DOKPLOY_AUTH_TOKEN="${DOKPLOY_AUTH_TOKEN:?DOKPLOY_AUTH_TOKEN required}"

# Environment-specific app IDs
declare -A APP_IDS=(
  [production-frontend]="prod_fe_abc123"
  [production-backend]="prod_be_def456"
  [staging-frontend]="stag_fe_xyz789"
  [staging-backend]="stag_be_uvw012"
)

deploy_app() {
  local app_key="$1"
  local app_id="${APP_IDS[$app_key]}"
  
  echo "Deploying $app_key (ID: $app_id)..."
  
  response=$(curl -fsS -X POST \
    "$DOKPLOY_URL/api/application.deploy" \
    -H "x-api-key: $DOKPLOY_AUTH_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"applicationId\": \"$app_id\"}")
  
  if echo "$response" | jq -e 'has("error")' >/dev/null 2>&1; then
    echo "❌ Failed: $(echo "$response" | jq -r '.error')"
    return 1
  fi
  
  echo "✅ Deployed $app_key"
}

# Deploy based on environment
case "$ENVIRONMENT" in
  production)
    deploy_app "production-backend"
    deploy_app "production-frontend"
    ;;
  staging)
    deploy_app "staging-backend"
    deploy_app "staging-frontend"
    ;;
  *)
    echo "Unknown environment: $ENVIRONMENT"
    exit 1
    ;;
esac

echo "✅ All deployments completed for $ENVIRONMENT"
```

## Zero-Downtime Deployment with Health Checks

### Complete docker-compose.yml Example

```yaml
version: '3.8'

services:
  app:
    image: ghcr.io/myorg/myapp:${IMAGE_TAG:-latest}
    container_name: myapp-${ENVIRONMENT:-prod}
    
    networks:
      - dokploy-network
    
    ports:
      - "${APP_PORT:-3000}:3000"
    
    environment:
      NODE_ENV: production
      DATABASE_URL: ${DATABASE_URL}
      REDIS_URL: ${REDIS_URL}
      PORT: 3000
    
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000/health"]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 60s  # Increase if app has slow startup
    
    restart: unless-stopped
    
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '0.5'
          memory: 512M
  
  postgres:
    image: postgres:15-alpine
    container_name: postgres-${ENVIRONMENT:-prod}
    
    networks:
      - dokploy-network
    
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB:-myapp}
    
    volumes:
      - postgres_data:/var/lib/postgresql/data
    
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-postgres}"]
      interval: 10s
      timeout: 5s
      retries: 5
    
    restart: unless-stopped
  
  redis:
    image: redis:7-alpine
    container_name: redis-${ENVIRONMENT:-prod}
    
    networks:
      - dokploy-network
    
    command: redis-server --appendonly yes
    
    volumes:
      - redis_data:/data
    
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    
    restart: unless-stopped

networks:
  dokploy-network:
    external: true

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local
```

### Health Check Endpoint Implementation

**Express.js**:
```javascript
const express = require('express');
const app = express();

let isReady = false;

// Simulate startup tasks
setTimeout(() => {
  isReady = true;
  console.log('Application ready');
}, 5000);

app.get('/health', (req, res) => {
  if (!isReady) {
    return res.status(503).json({ status: 'starting' });
  }
  
  // Check database connection
  const dbHealthy = checkDatabase();
  const redisHealthy = checkRedis();
  
  if (dbHealthy && redisHealthy) {
    return res.status(200).json({ 
      status: 'healthy',
      database: 'connected',
      redis: 'connected'
    });
  }
  
  res.status(503).json({ 
    status: 'unhealthy',
    database: dbHealthy ? 'connected' : 'disconnected',
    redis: redisHealthy ? 'connected' : 'disconnected'
  });
});
```

**Fastify**:
```javascript
fastify.get('/health', async (request, reply) => {
  const checks = await Promise.all([
    checkDatabase(),
    checkRedis(),
  ]);
  
  if (checks.every(check => check.healthy)) {
    return { status: 'healthy', checks };
  }
  
  reply.code(503).send({ status: 'unhealthy', checks });
});
```

## GitHub Actions CI/CD Pipelines

### Complete Production Pipeline

```yaml
name: Production Deployment

on:
  push:
    branches: [main]
  workflow_dispatch:

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    
    outputs:
      image_tag: ${{ steps.meta.outputs.tags }}
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=sha,prefix={{branch}}-
            type=ref,event=branch
            type=semver,pattern={{version}}
      
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: production
    
    steps:
      - name: Deploy to Dokploy
        uses: benbristow/dokploy-deploy-action@0.2.2
        with:
          dokploy_url: ${{ secrets.DOKPLOY_URL }}
          api_token: ${{ secrets.DOKPLOY_AUTH_TOKEN }}
          application_id: ${{ secrets.DOKPLOY_APP_ID }}
          service_type: application
      
      - name: Wait for deployment
        run: sleep 30
      
      - name: Health check
        run: |
          for i in {1..10}; do
            if curl -f "${{ secrets.APP_URL }}/health"; then
              echo "✅ Application healthy"
              exit 0
            fi
            echo "Waiting for app... ($i/10)"
            sleep 10
          done
          echo "❌ Health check failed"
          exit 1
      
      - name: Notify on failure
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK }}
          payload: |
            {
              "text": "❌ Production deployment failed",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Production Deployment Failed*\nCommit: ${{ github.sha }}\nActor: ${{ github.actor }}"
                  }
                }
              ]
            }
```

### Multi-Environment Pipeline

```yaml
name: Deploy to Multiple Environments

on:
  push:
    branches:
      - main        # Production
      - staging     # Staging
      - develop     # Development

jobs:
  determine-environment:
    runs-on: ubuntu-latest
    outputs:
      environment: ${{ steps.env.outputs.environment }}
      app_id: ${{ steps.env.outputs.app_id }}
    
    steps:
      - id: env
        run: |
          if [[ "${{ github.ref }}" == "refs/heads/main" ]]; then
            echo "environment=production" >> $GITHUB_OUTPUT
            echo "app_id=${{ secrets.PROD_APP_ID }}" >> $GITHUB_OUTPUT
          elif [[ "${{ github.ref }}" == "refs/heads/staging" ]]; then
            echo "environment=staging" >> $GITHUB_OUTPUT
            echo "app_id=${{ secrets.STAGING_APP_ID }}" >> $GITHUB_OUTPUT
          else
            echo "environment=development" >> $GITHUB_OUTPUT
            echo "app_id=${{ secrets.DEV_APP_ID }}" >> $GITHUB_OUTPUT
          fi

  deploy:
    needs: determine-environment
    runs-on: ubuntu-latest
    environment: ${{ needs.determine-environment.outputs.environment }}
    
    steps:
      - name: Deploy
        uses: benbristow/dokploy-deploy-action@0.2.2
        with:
          dokploy_url: ${{ secrets.DOKPLOY_URL }}
          api_token: ${{ secrets.DOKPLOY_AUTH_TOKEN }}
          application_id: ${{ needs.determine-environment.outputs.app_id }}
```

## Advanced Environment Variable Management

### Sync Script with Backup

```bash
#!/usr/bin/env bash
set -euo pipefail

ACTION="${1:-pull}"
ENV_FILE="${2:-.env}"
BACKUP_DIR="${3:-.env-backups}"

timestamp=$(date +%Y%m%d_%H%M%S)

case "$ACTION" in
  pull)
    # Backup existing file
    if [ -f "$ENV_FILE" ]; then
      mkdir -p "$BACKUP_DIR"
      cp "$ENV_FILE" "$BACKUP_DIR/$ENV_FILE.$timestamp"
      echo "📦 Backed up to: $BACKUP_DIR/$ENV_FILE.$timestamp"
    fi
    
    # Pull from Dokploy
    dokploy env pull "$ENV_FILE"
    echo "✅ Pulled environment variables to $ENV_FILE"
    ;;
  
  push)
    # Backup remote before pushing
    remote_backup="$BACKUP_DIR/remote.$ENV_FILE.$timestamp"
    mkdir -p "$BACKUP_DIR"
    dokploy env pull "$remote_backup"
    echo "📦 Backed up remote to: $remote_backup"
    
    # Show diff
    if [ -f "$remote_backup" ]; then
      echo ""
      echo "📋 Changes:"
      diff -u "$remote_backup" "$ENV_FILE" || true
      echo ""
    fi
    
    # Confirm
    read -p "Push these changes? [y/N] " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      dokploy env push "$ENV_FILE"
      echo "✅ Pushed $ENV_FILE to Dokploy"
    else
      echo "❌ Cancelled"
      exit 1
    fi
    ;;
  
  *)
    echo "Usage: $0 {pull|push} [env-file] [backup-dir]"
    exit 1
    ;;
esac
```

### Environment Variable Encryption

```bash
#!/usr/bin/env bash
# Encrypt .env file before committing to git

ENV_FILE=".env.production"
ENCRYPTED_FILE=".env.production.gpg"
GPG_KEY="your@email.com"

# Encrypt
gpg --encrypt --recipient "$GPG_KEY" --output "$ENCRYPTED_FILE" "$ENV_FILE"

# Decrypt (when needed)
# gpg --decrypt --output "$ENV_FILE" "$ENCRYPTED_FILE"

# .gitignore should include:
# .env*
# !.env*.gpg
```

## Database Backup and Restore

### Automated PostgreSQL Backup

```bash
#!/usr/bin/env bash
set -euo pipefail

# Configuration
DOKPLOY_URL="${DOKPLOY_URL}"
DB_CONTAINER="postgres-prod"
BACKUP_DIR="./db-backups"
RETENTION_DAYS=30

timestamp=$(date +%Y%m%d_%H%M%S)
backup_file="$BACKUP_DIR/backup_$timestamp.sql.gz"

mkdir -p "$BACKUP_DIR"

# Create backup
echo "📦 Creating database backup..."
docker exec "$DB_CONTAINER" pg_dumpall -U postgres | gzip > "$backup_file"

echo "✅ Backup created: $backup_file"

# Upload to S3 (optional)
if [ -n "${AWS_S3_BUCKET:-}" ]; then
  aws s3 cp "$backup_file" "s3://$AWS_S3_BUCKET/dokploy-backups/"
  echo "☁️  Uploaded to S3"
fi

# Clean old backups
find "$BACKUP_DIR" -name "backup_*.sql.gz" -mtime +$RETENTION_DAYS -delete
echo "🧹 Cleaned backups older than $RETENTION_DAYS days"
```

### Database Restore

```bash
#!/usr/bin/env bash
set -euo pipefail

BACKUP_FILE="$1"
DB_CONTAINER="postgres-prod"

if [ -z "$BACKUP_FILE" ]; then
  echo "Usage: $0 <backup-file.sql.gz>"
  exit 1
fi

read -p "⚠️  This will REPLACE the database. Continue? [y/N] " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ Cancelled"
  exit 1
fi

echo "📥 Restoring database from $BACKUP_FILE..."
gunzip -c "$BACKUP_FILE" | docker exec -i "$DB_CONTAINER" psql -U postgres

echo "✅ Database restored"
```

## Monitoring and Alerting

### Health Check Monitoring Script

```bash
#!/usr/bin/env bash

SERVICES=(
  "https://app.example.com/health|Frontend"
  "https://api.example.com/health|Backend API"
  "https://worker.example.com/health|Worker"
)

SLACK_WEBHOOK="${SLACK_WEBHOOK_URL}"

for service in "${SERVICES[@]}"; do
  IFS='|' read -r url name <<< "$service"
  
  if ! response=$(curl -fsS --max-time 10 "$url" 2>&1); then
    # Send alert
    curl -X POST "$SLACK_WEBHOOK" \
      -H 'Content-Type: application/json' \
      -d "{\"text\": \"❌ $name health check failed: $url\"}"
    
    echo "❌ $name failed"
  else
    echo "✅ $name healthy"
  fi
done
```

### Prometheus Metrics Export

```javascript
// Express middleware for Prometheus metrics
const promClient = require('prom-client');

const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register]
});

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .observe(duration);
  });
  next();
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

## Blue-Green Deployment Pattern

```bash
#!/usr/bin/env bash
set -euo pipefail

# Deploy to "green" environment first
GREEN_APP_ID="app_green_xyz"
BLUE_APP_ID="app_blue_abc"

echo "🟢 Deploying to GREEN environment..."
dokploy app:deploy --applicationId "$GREEN_APP_ID" --skipConfirm

echo "⏳ Waiting for GREEN to be healthy..."
for i in {1..30}; do
  if curl -fsS "https://green.example.com/health"; then
    echo "✅ GREEN is healthy"
    break
  fi
  sleep 10
done

echo "🔄 Switching traffic to GREEN..."
# Update load balancer or DNS here

echo "🔵 Stopping BLUE environment..."
dokploy app:stop --applicationId "$BLUE_APP_ID" --skipConfirm

echo "✅ Blue-green deployment complete"
```

## Resources

- [Docker Compose Health Checks](https://docs.docker.com/compose/compose-file/compose-file-v3/#healthcheck)
- [GitHub Actions Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
- [Prometheus Best Practices](https://prometheus.io/docs/practices/)
