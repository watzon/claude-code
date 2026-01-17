#!/usr/bin/env bash
# Quick authentication helper for Dokploy CLI

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_usage() {
  cat <<EOF
Dokploy Authentication Helper

Usage:
  $0 check                    # Check current authentication
  $0 setup                    # Interactive setup
  $0 env                      # Show environment variable setup
  $0 verify <url> <token>     # Verify credentials

Examples:
  $0 check
  $0 setup
  $0 verify https://panel.dokploy.com MRTHGZDGMRZWM43E...
EOF
}

check_auth() {
  echo -e "${YELLOW}Checking authentication...${NC}"
  
  # Check environment variables first
  if [ -n "${DOKPLOY_URL:-}" ] && [ -n "${DOKPLOY_AUTH_TOKEN:-}" ]; then
    echo -e "${GREEN}✓${NC} Using environment variables:"
    echo "  DOKPLOY_URL: $DOKPLOY_URL"
    echo "  DOKPLOY_AUTH_TOKEN: ${DOKPLOY_AUTH_TOKEN:0:20}..."
    
    if dokploy verify 2>/dev/null; then
      echo -e "${GREEN}✅ Authentication valid${NC}"
      return 0
    else
      echo -e "${RED}❌ Authentication failed${NC}"
      return 1
    fi
  fi
  
  # Check config file
  if dokploy verify 2>/dev/null; then
    echo -e "${GREEN}✅ Using config file (valid)${NC}"
    return 0
  fi
  
  echo -e "${RED}❌ Not authenticated${NC}"
  echo ""
  echo "Run: $0 setup"
  return 1
}

setup_auth() {
  echo -e "${YELLOW}Dokploy Authentication Setup${NC}"
  echo ""
  
  read -p "Dokploy URL: " url
  read -sp "API Token: " token
  echo ""
  
  export DOKPLOY_URL="$url"
  export DOKPLOY_AUTH_TOKEN="$token"
  
  echo -e "\n${YELLOW}Verifying credentials...${NC}"
  
  if dokploy verify; then
    echo -e "${GREEN}✅ Credentials valid!${NC}"
    echo ""
    echo "To persist authentication, add to your shell profile:"
    echo ""
    echo "  export DOKPLOY_URL=\"$url\""
    echo "  export DOKPLOY_AUTH_TOKEN=\"$token\""
    echo ""
    echo "Or run: dokploy authenticate --url=\"$url\" --token=\"$token\""
  else
    echo -e "${RED}❌ Invalid credentials${NC}"
    return 1
  fi
}

show_env_setup() {
  cat <<EOF
${YELLOW}Environment Variable Setup${NC}

${GREEN}For Bash/Zsh:${NC}
Add to ~/.bashrc or ~/.zshrc:

  export DOKPLOY_URL="https://panel.dokploy.com"
  export DOKPLOY_AUTH_TOKEN="your-token-here"

${GREEN}For CI/CD (GitHub Actions):${NC}
Add to repository secrets:

  DOKPLOY_URL: https://panel.dokploy.com
  DOKPLOY_AUTH_TOKEN: your-token-here

Then use in workflow:

  env:
    DOKPLOY_URL: \${{ secrets.DOKPLOY_URL }}
    DOKPLOY_AUTH_TOKEN: \${{ secrets.DOKPLOY_AUTH_TOKEN }}

${GREEN}For Docker Compose:${NC}
Add to .env file:

  DOKPLOY_URL=https://panel.dokploy.com
  DOKPLOY_AUTH_TOKEN=your-token-here

${YELLOW}Priority:${NC} Environment variables > Config file
EOF
}

verify_credentials() {
  local url="$1"
  local token="$2"
  
  echo -e "${YELLOW}Verifying credentials for $url...${NC}"
  
  response=$(curl -fsS \
    -H "x-api-key: $token" \
    -H "Content-Type: application/json" \
    "$url/api/trpc/user.get" 2>&1)
  
  if echo "$response" | grep -q '"userId"'; then
    echo -e "${GREEN}✅ Credentials valid${NC}"
    
    if command -v jq &>/dev/null; then
      echo ""
      echo "User info:"
      echo "$response" | jq '.result.data.json'
    fi
    return 0
  else
    echo -e "${RED}❌ Invalid credentials${NC}"
    echo "$response"
    return 1
  fi
}

# Main
case "${1:-}" in
  check)
    check_auth
    ;;
  setup)
    setup_auth
    ;;
  env)
    show_env_setup
    ;;
  verify)
    if [ $# -ne 3 ]; then
      echo "Usage: $0 verify <url> <token>"
      exit 1
    fi
    verify_credentials "$2" "$3"
    ;;
  *)
    print_usage
    exit 1
    ;;
esac
