#!/usr/bin/env bash
#
# cf-api.sh - Generic Cloudflare REST API wrapper
#
# Usage:
#   bash cf-api.sh <METHOD> <endpoint> [data]
#
# Examples:
#   bash cf-api.sh GET zones
#   bash cf-api.sh GET zones/<zone-id>/dns_records
#   bash cf-api.sh POST zones/<zone-id>/dns_records '{"type":"A","name":"test","content":"192.0.2.1"}'
#   bash cf-api.sh PATCH zones/<zone-id>/settings/ssl '{"value":"strict"}'
#   bash cf-api.sh DELETE zones/<zone-id>/dns_records/<record-id>
#
# Environment variables:
#   CLOUDFLARE_API_TOKEN (required) - API token
#   CLOUDFLARE_API_BASE (optional)  - API base URL (default: https://api.cloudflare.com/client/v4)

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
API_BASE="${CLOUDFLARE_API_BASE:-https://api.cloudflare.com/client/v4}"

# Check dependencies
command -v curl >/dev/null 2>&1 || { echo -e "${RED}Error: curl is required but not installed.${NC}" >&2; exit 1; }
command -v jq >/dev/null 2>&1 || { echo -e "${RED}Error: jq is required but not installed.${NC}" >&2; exit 1; }

# Check API token
if [[ -z "${CLOUDFLARE_API_TOKEN:-}" ]]; then
    echo -e "${RED}Error: CLOUDFLARE_API_TOKEN environment variable is required.${NC}" >&2
    echo "Set it with: export CLOUDFLARE_API_TOKEN='your_token_here'" >&2
    exit 1
fi

# Parse arguments
if [[ $# -lt 2 ]]; then
    echo -e "${RED}Usage: $0 <METHOD> <endpoint> [data]${NC}" >&2
    echo "" >&2
    echo "Examples:" >&2
    echo "  $0 GET zones" >&2
    echo "  $0 GET zones/<zone-id>/dns_records" >&2
    echo "  $0 POST zones/<zone-id>/dns_records '{\"type\":\"A\",\"name\":\"test\",\"content\":\"192.0.2.1\"}'" >&2
    echo "  $0 PATCH zones/<zone-id>/settings/ssl '{\"value\":\"strict\"}'" >&2
    echo "  $0 DELETE zones/<zone-id>/dns_records/<record-id>" >&2
    exit 1
fi

METHOD="$1"
ENDPOINT="$2"
DATA="${3:-}"

# Validate HTTP method
case "$METHOD" in
    GET|POST|PUT|PATCH|DELETE) ;;
    *)
        echo -e "${RED}Error: Invalid HTTP method '$METHOD'. Use GET, POST, PUT, PATCH, or DELETE.${NC}" >&2
        exit 1
        ;;
esac

# Build URL
URL="${API_BASE}/${ENDPOINT#/}"  # Remove leading slash if present

# Build curl command
CURL_ARGS=(
    -X "$METHOD"
    -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}"
    -H "Content-Type: application/json"
    -s  # Silent mode
    -w "\n%{http_code}"  # Append HTTP status code
)

# Add data for POST/PUT/PATCH
if [[ -n "$DATA" ]]; then
    if [[ "$METHOD" == "POST" || "$METHOD" == "PUT" || "$METHOD" == "PATCH" ]]; then
        CURL_ARGS+=(-d "$DATA")
    else
        echo -e "${YELLOW}Warning: Data provided for $METHOD request will be ignored.${NC}" >&2
    fi
fi

# Execute request
RESPONSE=$(curl "${CURL_ARGS[@]}" "$URL")

# Extract HTTP status code (last line)
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)

# Extract response body (all except last line)
BODY=$(echo "$RESPONSE" | sed '$d')

# Parse response
if command -v jq >/dev/null 2>&1; then
    # Pretty print with jq
    SUCCESS=$(echo "$BODY" | jq -r '.success // false')
    
    if [[ "$SUCCESS" == "true" ]]; then
        echo -e "${GREEN}✓ Success (HTTP $HTTP_CODE)${NC}" >&2
        echo "$BODY" | jq '.'
    else
        echo -e "${RED}✗ Failed (HTTP $HTTP_CODE)${NC}" >&2
        echo "$BODY" | jq '.' >&2
        
        # Extract error details
        ERRORS=$(echo "$BODY" | jq -r '.errors[]? | "  - [\(.code)] \(.message)"' 2>/dev/null || echo "")
        if [[ -n "$ERRORS" ]]; then
            echo -e "${RED}Errors:${NC}" >&2
            echo "$ERRORS" >&2
        fi
        
        exit 1
    fi
else
    if [[ $HTTP_CODE -ge 200 && $HTTP_CODE -lt 300 ]]; then
        echo -e "${GREEN}✓ Success (HTTP $HTTP_CODE)${NC}" >&2
        echo "$BODY"
    else
        echo -e "${RED}✗ Failed (HTTP $HTTP_CODE)${NC}" >&2
        echo "$BODY" >&2
        exit 1
    fi
fi

# Check for rate limiting
if [[ $HTTP_CODE -eq 429 ]]; then
    echo -e "${YELLOW}Warning: Rate limit exceeded. Retry after 5 minutes.${NC}" >&2
    exit 1
fi
