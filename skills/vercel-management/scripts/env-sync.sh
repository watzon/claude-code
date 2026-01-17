#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

PROJECT_ID=${VERCEL_PROJECT_ID:-}
TOKEN=${VERCEL_TOKEN:-}

log_info() {
  echo -e "${GREEN}[INFO]${NC} $1"
}

log_warning() {
  echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

verify_credentials() {
  if [ -z "$PROJECT_ID" ] || [ -z "$TOKEN" ]; then
    log_error "VERCEL_PROJECT_ID and VERCEL_TOKEN must be set"
    echo "Get your project ID from .vercel/project.json after running 'vercel link'"
    echo "Create a token at: https://vercel.com/account/tokens"
    exit 1
  fi
}

backup_env() {
  local env=$1
  local backup_file="backups/env-$env-$(date +%Y%m%d-%H%M%S).json"
  
  mkdir -p backups
  
  log_info "Backing up $env environment..."
  curl -s "https://api.vercel.com/v9/projects/$PROJECT_ID/env" \
    -H "Authorization: Bearer $TOKEN" \
    | jq ".envs | map(select(.target[] == \"$env\"))" \
    > "$backup_file"
  
  log_info "Backed up to $backup_file"
}

pull_env() {
  local env=$1
  local output_file=".env.$env"
  
  verify_credentials
  backup_env "$env"
  
  log_info "Pulling $env environment variables..."
  vercel env pull --environment=$env --yes "$output_file" --token=$TOKEN
  log_info "✅ Pulled to $output_file"
}

push_single() {
  local key=$1
  local value=$2
  local target=$3
  
  verify_credentials
  
  log_info "Adding/updating $key for $target..."
  echo "$value" | vercel env add "$key" "$target" --force --token=$TOKEN
  log_info "✅ Updated $key"
}

bulk_push() {
  local env_file=$1
  local target=$2
  
  verify_credentials
  
  if [ ! -f "$env_file" ]; then
    log_error "File not found: $env_file"
    exit 1
  fi
  
  backup_env "$target"
  
  log_info "Pushing environment variables from $env_file to $target..."
  
  while IFS='=' read -r key value; do
    [[ $key =~ ^#.*$ ]] && continue
    [[ -z $key ]] && continue
    
    echo "$value" | vercel env add "$key" "$target" --force --token=$TOKEN
    log_info "Synced: $key"
  done < "$env_file"
  
  log_info "✅ Bulk push completed"
}

diff_environments() {
  local env1=$1
  local env2=$2
  
  verify_credentials
  
  log_info "Comparing $env1 vs $env2..."
  
  vercel env pull --environment=$env1 --yes ".env.$env1.tmp" --token=$TOKEN
  vercel env pull --environment=$env2 --yes ".env.$env2.tmp" --token=$TOKEN
  
  sort ".env.$env1.tmp" > ".env.$env1.sorted"
  sort ".env.$env2.tmp" > ".env.$env2.sorted"
  
  echo ""
  echo "Differences between $env1 and $env2:"
  echo "======================================"
  diff -u ".env.$env1.sorted" ".env.$env2.sorted" || true
  
  rm ".env.$env1.tmp" ".env.$env2.tmp" ".env.$env1.sorted" ".env.$env2.sorted"
}

show_usage() {
  cat << EOF
Vercel Environment Variable Sync Tool

Usage:
  $0 pull <environment>                Pull environment variables
  $0 push <file> <target>              Bulk push from file
  $0 push <key> <value> <target>       Push single variable
  $0 backup <environment>              Backup only
  $0 diff <env1> <env2>                Compare two environments

Examples:
  $0 pull production
  $0 push .env.production production
  $0 push API_KEY "secret-value" production
  $0 backup production
  $0 diff production preview

Required Environment Variables:
  VERCEL_PROJECT_ID - Get from .vercel/project.json
  VERCEL_TOKEN      - Create at https://vercel.com/account/tokens
EOF
}

case "$1" in
  pull)
    pull_env "$2"
    ;;
  push)
    if [ -f "$2" ]; then
      bulk_push "$2" "$3"
    else
      push_single "$2" "$3" "$4"
    fi
    ;;
  backup)
    verify_credentials
    backup_env "$2"
    ;;
  diff)
    diff_environments "$2" "$3"
    ;;
  *)
    show_usage
    exit 1
    ;;
esac
