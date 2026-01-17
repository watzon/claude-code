# Vercel REST API Reference

Complete reference for Vercel REST API endpoints. Use these when CLI commands don't provide the functionality you need.

## Authentication

All API requests require authentication via Bearer token.

### Create Token

1. Visit: https://vercel.com/account/tokens
2. Create token with appropriate scope
3. Store securely (e.g., in environment variables)

### Request Headers

```bash
curl -H "Authorization: Bearer $VERCEL_TOKEN" \
     -H "Content-Type: application/json" \
     https://api.vercel.com/...
```

### Team Context

For team resources, add team ID to URL or header:

```bash
# Option 1: Query parameter
curl "https://api.vercel.com/v6/deployments?teamId=$TEAM_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN"

# Option 2: Header (deprecated but still works)
curl https://api.vercel.com/v6/deployments \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "X-Vercel-Team-Id: $TEAM_ID"
```

## Core Endpoints

### Deployments

#### List Deployments

```bash
GET /v6/deployments

# Examples
curl "https://api.vercel.com/v6/deployments" \
  -H "Authorization: Bearer $VERCEL_TOKEN"

# With filters
curl "https://api.vercel.com/v6/deployments?projectId=$PROJECT_ID&limit=10" \
  -H "Authorization: Bearer $VERCEL_TOKEN"

# Query parameters:
# - projectId: Filter by project
# - limit: Number of results (default: 20, max: 100)
# - since: Unix timestamp
# - until: Unix timestamp
# - state: BUILDING, ERROR, INITIALIZING, QUEUED, READY, CANCELED
# - target: production, staging
```

#### Get Deployment

```bash
GET /v13/deployments/:id

curl "https://api.vercel.com/v13/deployments/$DEPLOYMENT_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

#### Create Deployment

```bash
POST /v13/deployments

# Simple deployment
curl -X POST "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my-project",
    "files": [
      {
        "file": "index.html",
        "data": "SGVsbG8gV29ybGQh"
      }
    ],
    "projectSettings": {
      "framework": "nextjs"
    },
    "target": "production"
  }'

# With Git integration
curl -X POST "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my-project",
    "gitSource": {
      "type": "github",
      "ref": "main",
      "repoId": 123456789
    },
    "target": "production"
  }'
```

#### Cancel Deployment

```bash
PATCH /v12/deployments/:id/cancel

curl -X PATCH "https://api.vercel.com/v12/deployments/$DEPLOYMENT_ID/cancel" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

#### Delete Deployment

```bash
DELETE /v13/deployments/:id

curl -X DELETE "https://api.vercel.com/v13/deployments/$DEPLOYMENT_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

### Projects

#### List Projects

```bash
GET /v9/projects

curl "https://api.vercel.com/v9/projects" \
  -H "Authorization: Bearer $VERCEL_TOKEN"

# With pagination
curl "https://api.vercel.com/v9/projects?limit=20&since=1609459200000" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

#### Get Project

```bash
GET /v9/projects/:id

curl "https://api.vercel.com/v9/projects/$PROJECT_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

#### Create Project

```bash
POST /v10/projects

curl -X POST "https://api.vercel.com/v10/projects" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my-new-project",
    "framework": "nextjs",
    "gitRepository": {
      "type": "github",
      "repo": "username/repo"
    },
    "environmentVariables": [
      {
        "key": "API_URL",
        "value": "https://api.example.com",
        "target": ["production", "preview"]
      }
    ]
  }'
```

#### Update Project

```bash
PATCH /v9/projects/:id

curl -X PATCH "https://api.vercel.com/v9/projects/$PROJECT_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "renamed-project",
    "framework": "nextjs",
    "buildCommand": "npm run build",
    "installCommand": "npm install",
    "devCommand": "npm run dev"
  }'
```

#### Delete Project

```bash
DELETE /v9/projects/:id

curl -X DELETE "https://api.vercel.com/v9/projects/$PROJECT_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

### Environment Variables

#### List Environment Variables

```bash
GET /v9/projects/:id/env

curl "https://api.vercel.com/v9/projects/$PROJECT_ID/env" \
  -H "Authorization: Bearer $VERCEL_TOKEN"

# Filter by Git branch
curl "https://api.vercel.com/v9/projects/$PROJECT_ID/env?gitBranch=main" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

#### Create Environment Variable

```bash
POST /v10/projects/:id/env

curl -X POST "https://api.vercel.com/v10/projects/$PROJECT_ID/env" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "key": "API_KEY",
    "value": "secret-value",
    "type": "encrypted",
    "target": ["production", "preview", "development"]
  }'

# With Git branch
curl -X POST "https://api.vercel.com/v10/projects/$PROJECT_ID/env" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "key": "FEATURE_FLAG",
    "value": "true",
    "type": "plain",
    "target": ["preview"],
    "gitBranch": "feature-branch"
  }'
```

**Types**:
- `plain` - Visible in dashboard
- `encrypted` - Encrypted, redacted in dashboard
- `secret` - Legacy, same as encrypted
- `sensitive` - CLI flag, maps to encrypted

#### Update Environment Variable

```bash
PATCH /v9/projects/:id/env/:envId

curl -X PATCH "https://api.vercel.com/v9/projects/$PROJECT_ID/env/$ENV_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "value": "new-value",
    "target": ["production", "preview"]
  }'
```

#### Delete Environment Variable

```bash
DELETE /v9/projects/:id/env/:envId

curl -X DELETE "https://api.vercel.com/v9/projects/$PROJECT_ID/env/$ENV_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

### Domains

#### List Domains

```bash
GET /v5/domains

curl "https://api.vercel.com/v5/domains" \
  -H "Authorization: Bearer $VERCEL_TOKEN"

# With pagination
curl "https://api.vercel.com/v5/domains?limit=20" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

#### Get Domain

```bash
GET /v5/domains/:domain

curl "https://api.vercel.com/v5/domains/example.com" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

#### Add Domain

```bash
POST /v5/domains

curl -X POST "https://api.vercel.com/v5/domains" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "example.com"
  }'
```

#### Remove Domain

```bash
DELETE /v5/domains/:domain

curl -X DELETE "https://api.vercel.com/v5/domains/example.com" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

#### Verify Domain

```bash
POST /v5/domains/:domain/verify

curl -X POST "https://api.vercel.com/v5/domains/example.com/verify" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

### DNS Records

#### List DNS Records

```bash
GET /v2/domains/:domain/records

curl "https://api.vercel.com/v2/domains/example.com/records" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

#### Create DNS Record

```bash
POST /v2/domains/:domain/records

# A record
curl -X POST "https://api.vercel.com/v2/domains/example.com/records" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "A",
    "name": "www",
    "value": "76.76.21.21",
    "ttl": 60
  }'

# CNAME record
curl -X POST "https://api.vercel.com/v2/domains/example.com/records" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "CNAME",
    "name": "blog",
    "value": "myblog.vercel.app",
    "ttl": 60
  }'

# TXT record
curl -X POST "https://api.vercel.com/v2/domains/example.com/records" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "TXT",
    "name": "@",
    "value": "verification-code",
    "ttl": 60
  }'
```

#### Delete DNS Record

```bash
DELETE /v2/domains/:domain/records/:recordId

curl -X DELETE "https://api.vercel.com/v2/domains/example.com/records/$RECORD_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

### Certificates

#### List Certificates

```bash
GET /v6/certs

curl "https://api.vercel.com/v6/certs" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

#### Issue Certificate

```bash
POST /v6/certs

curl -X POST "https://api.vercel.com/v6/certs" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "domains": ["example.com", "www.example.com"]
  }'
```

#### Delete Certificate

```bash
DELETE /v6/certs/:id

curl -X DELETE "https://api.vercel.com/v6/certs/$CERT_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

### Teams

#### List Teams

```bash
GET /v2/teams

curl "https://api.vercel.com/v2/teams" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

#### Get Team

```bash
GET /v2/teams/:id

curl "https://api.vercel.com/v2/teams/$TEAM_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

### Logs

#### Get Deployment Logs

```bash
GET /v2/deployments/:id/events

curl "https://api.vercel.com/v2/deployments/$DEPLOYMENT_ID/events" \
  -H "Authorization: Bearer $VERCEL_TOKEN"

# With filters
curl "https://api.vercel.com/v2/deployments/$DEPLOYMENT_ID/events?follow=1&types=stdout,stderr" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

### Aliases

#### List Aliases

```bash
GET /v4/aliases

curl "https://api.vercel.com/v4/aliases" \
  -H "Authorization: Bearer $VERCEL_TOKEN"

# For specific deployment
curl "https://api.vercel.com/v4/aliases?deploymentId=$DEPLOYMENT_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

#### Create Alias

```bash
POST /v2/deployments/:id/aliases

curl -X POST "https://api.vercel.com/v2/deployments/$DEPLOYMENT_ID/aliases" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "alias": "custom.example.com"
  }'
```

#### Delete Alias

```bash
DELETE /v2/aliases/:id

curl -X DELETE "https://api.vercel.com/v2/aliases/$ALIAS_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

## Advanced Endpoints

### Edge Config

#### List Edge Config Stores

```bash
GET /v1/edge-config

curl "https://api.vercel.com/v1/edge-config" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

#### Create Edge Config

```bash
POST /v1/edge-config

curl -X POST "https://api.vercel.com/v1/edge-config" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "my-config"
  }'
```

#### Update Edge Config Items

```bash
PATCH /v1/edge-config/:id/items

curl -X PATCH "https://api.vercel.com/v1/edge-config/$CONFIG_ID/items" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "operation": "upsert",
        "key": "feature-flag",
        "value": true
      }
    ]
  }'
```

### Webhooks

#### List Webhooks

```bash
GET /v1/webhooks

curl "https://api.vercel.com/v1/webhooks" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

#### Create Webhook

```bash
POST /v1/webhooks

curl -X POST "https://api.vercel.com/v1/webhooks" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/webhook",
    "events": ["deployment.created", "deployment.succeeded"]
  }'
```

**Available Events**:
- `deployment.created`
- `deployment.succeeded`
- `deployment.error`
- `deployment.ready`
- `deployment.canceled`
- `project.created`
- `project.removed`

#### Delete Webhook

```bash
DELETE /v1/webhooks/:id

curl -X DELETE "https://api.vercel.com/v1/webhooks/$WEBHOOK_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

## Response Formats

### Successful Response

```json
{
  "id": "dpl_abc123",
  "name": "my-deployment",
  "url": "my-deployment-abc123.vercel.app",
  "state": "READY",
  "created": 1609459200000
}
```

### Error Response

```json
{
  "error": {
    "code": "forbidden",
    "message": "You don't have access to this resource"
  }
}
```

### Pagination

Many endpoints support pagination:

```json
{
  "deployments": [...],
  "pagination": {
    "count": 20,
    "next": 1609459200000,
    "prev": 1609372800000
  }
}
```

Use `since` and `until` query parameters:

```bash
curl "https://api.vercel.com/v6/deployments?since=1609459200000&limit=20" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

## Common HTTP Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | Continue |
| 201 | Created | Resource created successfully |
| 204 | No Content | Delete successful |
| 400 | Bad Request | Check request body/parameters |
| 401 | Unauthorized | Check token validity |
| 403 | Forbidden | Check permissions/scope |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource already exists |
| 429 | Rate Limited | Wait and retry |
| 500 | Server Error | Retry with backoff |

## Rate Limiting

Vercel API has rate limits:

- **Free/Hobby**: 100 requests per minute
- **Pro**: 500 requests per minute
- **Enterprise**: Higher limits (contact support)

**Response Headers**:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1609459260
```

**Handling Rate Limits**:

```bash
#!/bin/bash

response=$(curl -s -w "\n%{http_code}" \
  "https://api.vercel.com/v6/deployments" \
  -H "Authorization: Bearer $VERCEL_TOKEN")

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$http_code" = "429" ]; then
  echo "Rate limited, waiting 60 seconds..."
  sleep 60
  # Retry request
fi
```

## CLI to API Mapping

| CLI Command | API Endpoint |
|-------------|--------------|
| `vercel deploy` | `POST /v13/deployments` |
| `vercel list` | `GET /v6/deployments` |
| `vercel inspect <id>` | `GET /v13/deployments/:id` |
| `vercel remove <id>` | `DELETE /v13/deployments/:id` |
| `vercel env ls` | `GET /v9/projects/:id/env` |
| `vercel env add` | `POST /v10/projects/:id/env` |
| `vercel env rm` | `DELETE /v9/projects/:id/env/:envId` |
| `vercel domains ls` | `GET /v5/domains` |
| `vercel domains add` | `POST /v5/domains` |
| `vercel dns ls` | `GET /v2/domains/:domain/records` |
| `vercel dns add` | `POST /v2/domains/:domain/records` |
| `vercel certs ls` | `GET /v6/certs` |
| `vercel alias set` | `POST /v2/deployments/:id/aliases` |

## Examples in Different Languages

### Bash

```bash
#!/bin/bash
VERCEL_TOKEN="your-token"
PROJECT_ID="your-project-id"

# List deployments
curl -s "https://api.vercel.com/v6/deployments?projectId=$PROJECT_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | jq '.deployments[] | {url, state, created}'
```

### Python

```python
import requests

VERCEL_TOKEN = "your-token"
PROJECT_ID = "your-project-id"

headers = {
    "Authorization": f"Bearer {VERCEL_TOKEN}",
    "Content-Type": "application/json"
}

# List deployments
response = requests.get(
    f"https://api.vercel.com/v6/deployments?projectId={PROJECT_ID}",
    headers=headers
)

deployments = response.json()["deployments"]
for dep in deployments:
    print(f"{dep['url']} - {dep['state']}")

# Add environment variable
data = {
    "key": "API_KEY",
    "value": "secret-value",
    "type": "encrypted",
    "target": ["production"]
}

response = requests.post(
    f"https://api.vercel.com/v10/projects/{PROJECT_ID}/env",
    headers=headers,
    json=data
)

print(response.json())
```

### TypeScript/Node.js

```typescript
import fetch from 'node-fetch';

const VERCEL_TOKEN = process.env.VERCEL_TOKEN!;
const PROJECT_ID = process.env.PROJECT_ID!;

const headers = {
  'Authorization': `Bearer ${VERCEL_TOKEN}`,
  'Content-Type': 'application/json'
};

// List deployments
async function listDeployments() {
  const response = await fetch(
    `https://api.vercel.com/v6/deployments?projectId=${PROJECT_ID}`,
    { headers }
  );
  const data = await response.json();
  return data.deployments;
}

// Create deployment
async function createDeployment() {
  const response = await fetch(
    'https://api.vercel.com/v13/deployments',
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: 'my-project',
        gitSource: {
          type: 'github',
          ref: 'main',
          repoId: 123456789
        },
        target: 'production'
      })
    }
  );
  return response.json();
}

// Usage
(async () => {
  const deployments = await listDeployments();
  console.log(deployments);
})();
```

## Error Handling Best Practices

```bash
#!/bin/bash

deploy() {
  response=$(curl -s -w "\n%{http_code}" \
    -X POST "https://api.vercel.com/v13/deployments" \
    -H "Authorization: Bearer $VERCEL_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"name\": \"$1\", \"target\": \"production\"}")
  
  http_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | head -n-1)
  
  case $http_code in
    200|201)
      echo "Success: $body"
      return 0
      ;;
    401)
      echo "Error: Invalid token"
      return 1
      ;;
    403)
      echo "Error: Insufficient permissions"
      return 1
      ;;
    429)
      echo "Error: Rate limited"
      return 1
      ;;
    *)
      echo "Error: HTTP $http_code - $body"
      return 1
      ;;
  esac
}
```

## Further Reading

- **Official API Docs**: https://vercel.com/docs/rest-api
- **OpenAPI Spec**: https://vercel.com/docs/rest-api/openapi
- **Rate Limits**: https://vercel.com/docs/rest-api/rate-limits
- **Webhooks**: https://vercel.com/docs/observability/webhooks
