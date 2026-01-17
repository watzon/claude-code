#!/usr/bin/env bash
set -euo pipefail

DOKPLOY_URL="${DOKPLOY_URL:?DOKPLOY_URL environment variable required}"
DOKPLOY_AUTH_TOKEN="${DOKPLOY_AUTH_TOKEN:?DOKPLOY_AUTH_TOKEN environment variable required}"
APP_ID="${1:?Usage: $0 <application_id>}"

deploy_application() {
  local app_id="$1"
  
  echo "🚀 Deploying application: $app_id"
  
  response=$(curl -fsS -w "\n%{http_code}" -X POST \
    "$DOKPLOY_URL/api/application.deploy" \
    -H "x-api-key: $DOKPLOY_AUTH_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"applicationId\": \"$app_id\"}")
  
  http_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | head -n-1)
  
  if [ "$http_code" -eq 200 ]; then
    echo "✅ Deployment triggered successfully"
    
    if command -v jq &>/dev/null && echo "$body" | jq . &>/dev/null; then
      echo "$body" | jq '.'
    else
      echo "$body"
    fi
    
    return 0
  else
    echo "❌ Deployment failed (HTTP $http_code)"
    echo "$body"
    return 1
  fi
}

deploy_application "$APP_ID"
