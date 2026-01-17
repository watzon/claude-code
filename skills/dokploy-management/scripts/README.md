# Dokploy Management Scripts

Helper scripts for managing Dokploy deployments.

## Available Scripts

### quick-auth.sh

Authentication helper for Dokploy CLI.

**Usage**:
```bash
# Check current authentication status
./quick-auth.sh check

# Interactive setup
./quick-auth.sh setup

# Show environment variable setup instructions
./quick-auth.sh env

# Verify specific credentials
./quick-auth.sh verify https://panel.dokploy.com YOUR_TOKEN
```

**Features**:
- Checks environment variables and config file
- Interactive credential setup
- Verification against Dokploy API
- Shell profile setup instructions

### deploy.sh

Simple deployment script using Dokploy API.

**Usage**:
```bash
export DOKPLOY_URL="https://panel.dokploy.com"
export DOKPLOY_AUTH_TOKEN="your-token"

./deploy.sh <application_id>
```

**Features**:
- Direct API deployment
- Error handling with HTTP status codes
- JSON response formatting (if `jq` available)

## Requirements

- `bash` >= 4.0
- `curl`
- `jq` (optional, for JSON formatting)
- Dokploy CLI (for quick-auth.sh)

## Environment Variables

All scripts require:

```bash
export DOKPLOY_URL="https://your-dokploy-instance.com"
export DOKPLOY_AUTH_TOKEN="your-api-token"
```

## Examples

### Quick Authentication Check

```bash
./quick-auth.sh check
# ✓ Using environment variables:
#   DOKPLOY_URL: https://panel.dokploy.com
#   DOKPLOY_AUTH_TOKEN: MRTHGZDGMRZWM43E...
# ✅ Authentication valid
```

### Deploy Application

```bash
export DOKPLOY_URL="https://panel.dokploy.com"
export DOKPLOY_AUTH_TOKEN="MRTHGZDGMRZWM43E..."

./deploy.sh hdoihUG0FmYC8GdoFEc
# 🚀 Deploying application: hdoihUG0FmYC8GdoFEc
# ✅ Deployment triggered successfully
```

## Integration with CI/CD

### GitHub Actions

```yaml
- name: Deploy
  env:
    DOKPLOY_URL: ${{ secrets.DOKPLOY_URL }}
    DOKPLOY_AUTH_TOKEN: ${{ secrets.DOKPLOY_AUTH_TOKEN }}
  run: |
    bash scripts/deploy.sh ${{ secrets.APP_ID }}
```

### GitLab CI

```yaml
deploy:
  script:
    - bash scripts/deploy.sh $APP_ID
  variables:
    DOKPLOY_URL: $DOKPLOY_URL
    DOKPLOY_AUTH_TOKEN: $DOKPLOY_AUTH_TOKEN
```
