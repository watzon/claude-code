# Dokploy API Reference

Complete API documentation for Dokploy CLI and direct API usage.

## Base Information

- **Base URL**: Your Dokploy instance URL (e.g., `https://panel.dokploy.com`)
- **Authentication**: `x-api-key` header with API token
- **Content-Type**: `application/json`
- **API Framework**: tRPC (most endpoints) + direct REST (deployment endpoints)

## Authentication

### Generate API Token

1. Login to Dokploy dashboard
2. Navigate to Profile → API Keys
3. Click "Generate API Key"
4. Copy token immediately (not shown again)

### Token Location

Find your application ID in the URL:
```
https://dokploy.example.com/dashboard/project/{PROJECT_ID}/services/application/{APP_ID}
```

## API Endpoints

### Authentication Endpoints

#### Verify Token
```http
GET /api/trpc/user.get
Headers:
  x-api-key: YOUR_TOKEN
  Content-Type: application/json
```

**Response** (success):
```json
{
  "result": {
    "data": {
      "json": {
        "userId": "abc123",
        "email": "user@example.com",
        "username": "user"
      }
    }
  }
}
```

**Response** (failure):
```json
{
  "error": {
    "message": "Invalid API token",
    "code": "UNAUTHORIZED"
  }
}
```

### Project Endpoints

#### List All Projects
```http
GET /api/trpc/project.all
Headers:
  x-api-key: YOUR_TOKEN
  Content-Type: application/json
```

**Response**:
```json
{
  "result": {
    "data": {
      "json": [
        {
          "projectId": "klZKsyw5g-QT_jrWJ5T-w",
          "name": "Production",
          "description": "Production applications",
          "createdAt": "2024-01-15T10:30:00Z"
        }
      ]
    }
  }
}
```

#### Get Project Details
```http
POST /api/trpc/project.one
Headers:
  x-api-key: YOUR_TOKEN
  Content-Type: application/json
Body:
{
  "json": {
    "projectId": "klZKsyw5g-QT_jrWJ5T-w"
  }
}
```

#### Create Project
```http
POST /api/trpc/project.create
Headers:
  x-api-key: YOUR_TOKEN
  Content-Type: application/json
Body:
{
  "json": {
    "name": "My Project",
    "description": "Project description"
  }
}
```

### Application Endpoints

#### Deploy Application (Simplified API)
```http
POST /api/application.deploy
Headers:
  x-api-key: YOUR_TOKEN
  Content-Type: application/json
Body:
{
  "applicationId": "hdoihUG0FmYC8GdoFEc"
}
```

**Response** (success):
```json
{
  "message": "Deployment triggered successfully",
  "deploymentId": "deploy_xyz789"
}
```

**Response** (failure):
```json
{
  "error": "Application not found"
}
```

#### Create Application (tRPC)
```http
POST /api/trpc/application.create
Headers:
  x-api-key: YOUR_TOKEN
  Content-Type: application/json
Body:
{
  "json": {
    "projectId": "klZKsyw5g-QT_jrWJ5T-w",
    "environmentId": "env_abc123",
    "name": "Frontend App",
    "appName": "myapp-frontend",
    "description": "React frontend application"
  }
}
```

#### Get Application Details
```http
POST /api/trpc/application.one
Headers:
  x-api-key: YOUR_TOKEN
  Content-Type: application/json
Body:
{
  "json": {
    "applicationId": "hdoihUG0FmYC8GdoFEc"
  }
}
```

#### Stop Application
```http
POST /api/trpc/application.stop
Headers:
  x-api-key: YOUR_TOKEN
  Content-Type: application/json
Body:
{
  "json": {
    "applicationId": "hdoihUG0FmYC8GdoFEc"
  }
}
```

#### Delete Application
```http
POST /api/trpc/application.delete
Headers:
  x-api-key: YOUR_TOKEN
  Content-Type: application/json
Body:
{
  "json": {
    "applicationId": "hdoihUG0FmYC8GdoFEc"
  }
}
```

### Environment Variable Endpoints

#### Get Environment Variables
```http
POST /api/trpc/application.getEnvironmentVariables
Headers:
  x-api-key: YOUR_TOKEN
  Content-Type: application/json
Body:
{
  "json": {
    "applicationId": "hdoihUG0FmYC8GdoFEc"
  }
}
```

**Response**:
```json
{
  "result": {
    "data": {
      "json": {
        "variables": [
          {
            "key": "DATABASE_URL",
            "value": "postgresql://..."
          },
          {
            "key": "API_KEY",
            "value": "secret123"
          }
        ]
      }
    }
  }
}
```

#### Update Environment Variables
```http
POST /api/trpc/application.updateEnvironmentVariables
Headers:
  x-api-key: YOUR_TOKEN
  Content-Type: application/json
Body:
{
  "json": {
    "applicationId": "hdoihUG0FmYC8GdoFEc",
    "variables": [
      {
        "key": "DATABASE_URL",
        "value": "postgresql://new-url"
      }
    ]
  }
}
```

⚠️ **WARNING**: This **replaces** all environment variables, not merges.

### Database Endpoints

#### Create PostgreSQL Database
```http
POST /api/trpc/postgres.create
Headers:
  x-api-key: YOUR_TOKEN
  Content-Type: application/json
Body:
{
  "json": {
    "projectId": "klZKsyw5g-QT_jrWJ5T-w",
    "environmentId": "env_abc123",
    "name": "Production DB",
    "databaseName": "myapp",
    "databaseUser": "postgres",
    "databasePassword": "secret123",
    "dockerImage": "postgres:15"
  }
}
```

#### Deploy Database
```http
POST /api/trpc/postgres.deploy
Headers:
  x-api-key: YOUR_TOKEN
  Content-Type: application/json
Body:
{
  "json": {
    "postgresId": "db_xyz789"
  }
}
```

**Same pattern for other databases**:
- MariaDB: `/api/trpc/mariadb.*`
- MySQL: `/api/trpc/mysql.*`
- MongoDB: `/api/trpc/mongo.*`
- Redis: `/api/trpc/redis.*`

### Environment Endpoints

#### Create Environment
```http
POST /api/trpc/environment.create
Headers:
  x-api-key: YOUR_TOKEN
  Content-Type: application/json
Body:
{
  "json": {
    "projectId": "klZKsyw5g-QT_jrWJ5T-w",
    "name": "Production",
    "description": "Production environment"
  }
}
```

#### Delete Environment
```http
POST /api/trpc/environment.delete
Headers:
  x-api-key: YOUR_TOKEN
  Content-Type: application/json
Body:
{
  "json": {
    "environmentId": "env_abc123"
  }
}
```

## CLI to API Mapping

| CLI Command | API Endpoint |
|-------------|--------------|
| `dokploy authenticate` | `GET /api/trpc/user.get` |
| `dokploy project:list` | `GET /api/trpc/project.all` |
| `dokploy project:create` | `POST /api/trpc/project.create` |
| `dokploy app:deploy` | `POST /api/application.deploy` |
| `dokploy app:create` | `POST /api/trpc/application.create` |
| `dokploy app:stop` | `POST /api/trpc/application.stop` |
| `dokploy app:delete` | `POST /api/trpc/application.delete` |
| `dokploy env pull` | `POST /api/trpc/application.getEnvironmentVariables` |
| `dokploy env push` | `POST /api/trpc/application.updateEnvironmentVariables` |
| `dokploy database:postgres:create` | `POST /api/trpc/postgres.create` |
| `dokploy database:postgres:deploy` | `POST /api/trpc/postgres.deploy` |

## Error Handling

### Common Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| `UNAUTHORIZED` | Invalid or missing API token | Re-authenticate |
| `NOT_FOUND` | Resource (project/app/env) not found | Verify IDs |
| `BAD_REQUEST` | Invalid request body | Check required fields |
| `INTERNAL_SERVER_ERROR` | Server error | Check Dokploy logs |

### Error Response Format

```json
{
  "error": {
    "message": "Application not found",
    "code": "NOT_FOUND",
    "data": {
      "applicationId": "invalid_id"
    }
  }
}
```

## Rate Limiting

- **No documented rate limits** at the time of writing
- Best practice: Don't exceed 10 requests/second
- For bulk operations, add delays between requests

## Bash Script Example

```bash
#!/usr/bin/env bash
set -e

DOKPLOY_URL="${DOKPLOY_URL:?DOKPLOY_URL required}"
DOKPLOY_AUTH_TOKEN="${DOKPLOY_AUTH_TOKEN:?DOKPLOY_AUTH_TOKEN required}"
APP_ID="$1"

if [ -z "$APP_ID" ]; then
  echo "Usage: $0 <application_id>"
  exit 1
fi

echo "Deploying application: $APP_ID"

response=$(curl -fsS -X POST \
  "$DOKPLOY_URL/api/application.deploy" \
  -H "x-api-key: $DOKPLOY_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"applicationId\": \"$APP_ID\"}" \
  2>&1)

if echo "$response" | jq -e 'has("error")' >/dev/null 2>&1; then
  error=$(echo "$response" | jq -r '.error')
  echo "❌ Deployment failed: $error"
  exit 1
fi

echo "✅ Deployment triggered successfully"
```

## Python Script Example

```python
import requests
import os
import sys

DOKPLOY_URL = os.getenv('DOKPLOY_URL')
DOKPLOY_AUTH_TOKEN = os.getenv('DOKPLOY_AUTH_TOKEN')

if not DOKPLOY_URL or not DOKPLOY_AUTH_TOKEN:
    print("Error: DOKPLOY_URL and DOKPLOY_AUTH_TOKEN required")
    sys.exit(1)

def deploy_application(app_id):
    """Deploy an application via Dokploy API"""
    url = f"{DOKPLOY_URL}/api/application.deploy"
    headers = {
        "x-api-key": DOKPLOY_AUTH_TOKEN,
        "Content-Type": "application/json"
    }
    payload = {
        "applicationId": app_id
    }
    
    response = requests.post(url, headers=headers, json=payload)
    
    if response.status_code == 200:
        print(f"✅ Deployment triggered: {app_id}")
        return response.json()
    else:
        print(f"❌ Deployment failed: {response.text}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python deploy.py <application_id>")
        sys.exit(1)
    
    app_id = sys.argv[1]
    deploy_application(app_id)
```

## TypeScript/JavaScript Example

```typescript
import axios from 'axios';

const DOKPLOY_URL = process.env.DOKPLOY_URL!;
const DOKPLOY_AUTH_TOKEN = process.env.DOKPLOY_AUTH_TOKEN!;

interface DeployResponse {
  message: string;
  deploymentId: string;
}

async function deployApplication(appId: string): Promise<DeployResponse> {
  const response = await axios.post<DeployResponse>(
    `${DOKPLOY_URL}/api/application.deploy`,
    { applicationId: appId },
    {
      headers: {
        'x-api-key': DOKPLOY_AUTH_TOKEN,
        'Content-Type': 'application/json',
      },
    }
  );
  
  return response.data;
}

// Usage
deployApplication('hdoihUG0FmYC8GdoFEc')
  .then(result => console.log('✅ Deployed:', result))
  .catch(error => console.error('❌ Error:', error.message));
```

## Testing API Endpoints

### Using curl

```bash
# Test authentication
curl -X GET "$DOKPLOY_URL/api/trpc/user.get" \
  -H "x-api-key: $DOKPLOY_AUTH_TOKEN" \
  -H "Content-Type: application/json"

# Deploy application
curl -X POST "$DOKPLOY_URL/api/application.deploy" \
  -H "x-api-key: $DOKPLOY_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"applicationId": "your-app-id"}'

# List projects
curl -X GET "$DOKPLOY_URL/api/trpc/project.all" \
  -H "x-api-key: $DOKPLOY_AUTH_TOKEN" \
  -H "Content-Type: application/json" | jq '.'
```

### Using httpie

```bash
# Test authentication
http GET "$DOKPLOY_URL/api/trpc/user.get" \
  x-api-key:$DOKPLOY_AUTH_TOKEN

# Deploy application
http POST "$DOKPLOY_URL/api/application.deploy" \
  x-api-key:$DOKPLOY_AUTH_TOKEN \
  applicationId=your-app-id
```

## Webhooks (Future Feature)

As of v0.2.8, webhooks are **not yet implemented** in the CLI but may be available in the Dokploy platform. Check official documentation for updates.
