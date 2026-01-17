#!/bin/bash
# Vercel Deployment Helper Script
# Usage: ./deploy.sh [environment] [options]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default values
ENVIRONMENT="${1:-preview}"
SKIP_HEALTH_CHECK=false
SKIP_TESTS=false
DEPLOYMENT_URL=""

# Parse additional options
shift || true
while [[ $# -gt 0 ]]; do
  case $1 in
    --skip-health-check)
      SKIP_HEALTH_CHECK=true
      shift
      ;;
    --skip-tests)
      SKIP_TESTS=true
      shift
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}"
      exit 1
      ;;
  esac
done

# Verify environment variables
if [ -z "$VERCEL_TOKEN" ]; then
  echo -e "${RED}Error: VERCEL_TOKEN environment variable not set${NC}"
  echo "Create a token at: https://vercel.com/account/tokens"
  exit 1
fi

# Helper functions
log_info() {
  echo -e "${GREEN}[INFO]${NC} $1"
}

log_warning() {
  echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

health_check() {
  local url=$1
  local max_retries=30
  local retry_delay=10
  local retries=0
  
  log_info "Running health check on $url..."
  
  while [ $retries -lt $max_retries ]; do
    http_code=$(curl -s -o /dev/null -w "%{http_code}" "$url/api/health" || echo "000")
    
    if [ "$http_code" == "200" ]; then
      log_info "✅ Health check passed!"
      return 0
    fi
    
    retries=$((retries + 1))
    log_warning "Attempt $retries/$max_retries: HTTP $http_code, retrying in ${retry_delay}s..."
    sleep $retry_delay
  done
  
  log_error "❌ Health check failed after $max_retries attempts"
  return 1
}

run_tests() {
  if [ "$SKIP_TESTS" = true ]; then
    log_warning "Skipping tests (--skip-tests flag set)"
    return 0
  fi
  
  if [ -f "package.json" ] && grep -q '"test"' package.json; then
    log_info "Running tests..."
    npm test || {
      log_error "Tests failed"
      return 1
    }
    log_info "✅ Tests passed!"
  else
    log_warning "No test script found in package.json, skipping"
  fi
}

deploy() {
  local env=$1
  
  log_info "Starting deployment to $env environment..."
  
  # Step 1: Run tests
  if ! run_tests; then
    log_error "Aborting deployment due to test failures"
    exit 1
  fi
  
  # Step 2: Pull Vercel configuration
  log_info "Pulling Vercel environment configuration..."
  vercel pull --yes --environment="$env" --token="$VERCEL_TOKEN"
  
  # Step 3: Build
  log_info "Building project..."
  if [ "$env" == "production" ]; then
    vercel build --prod --token="$VERCEL_TOKEN"
  else
    vercel build --token="$VERCEL_TOKEN"
  fi
  
  # Step 4: Deploy
  log_info "Deploying to Vercel..."
  if [ "$env" == "production" ]; then
    # Production: deploy to staging first for health checks
    DEPLOYMENT_URL=$(vercel deploy --prebuilt --prod --skip-domain --token="$VERCEL_TOKEN")
  else
    # Preview: deploy directly
    DEPLOYMENT_URL=$(vercel deploy --prebuilt --token="$VERCEL_TOKEN")
  fi
  
  log_info "Deployed to: $DEPLOYMENT_URL"
  echo "$DEPLOYMENT_URL" > deployment-url.txt
  
  # Step 5: Health check (production only)
  if [ "$env" == "production" ] && [ "$SKIP_HEALTH_CHECK" = false ]; then
    if health_check "$DEPLOYMENT_URL"; then
      # Step 6: Promote to production
      log_info "Promoting to production..."
      vercel promote "$DEPLOYMENT_URL" --token="$VERCEL_TOKEN"
      log_info "✅ Production deployment complete!"
    else
      log_error "Health check failed, removing deployment..."
      vercel remove "$DEPLOYMENT_URL" --yes --token="$VERCEL_TOKEN"
      exit 1
    fi
  elif [ "$env" == "production" ]; then
    log_warning "Skipping health check (--skip-health-check flag set)"
    log_warning "Promoting directly to production..."
    vercel promote "$DEPLOYMENT_URL" --token="$VERCEL_TOKEN"
    log_info "✅ Production deployment complete!"
  else
    log_info "✅ Preview deployment complete!"
  fi
}

# Main execution
case $ENVIRONMENT in
  production|prod)
    log_info "Deploying to PRODUCTION environment"
    deploy "production"
    ;;
  preview|prev)
    log_info "Deploying to PREVIEW environment"
    deploy "preview"
    ;;
  development|dev)
    log_info "Deploying to DEVELOPMENT environment"
    deploy "development"
    ;;
  *)
    log_error "Invalid environment: $ENVIRONMENT"
    echo "Usage: $0 [production|preview|development] [--skip-health-check] [--skip-tests]"
    exit 1
    ;;
esac

# Output deployment URL
echo ""
log_info "Deployment URL saved to: deployment-url.txt"
log_info "Access your deployment at: $DEPLOYMENT_URL"
