# Cloudflare Authentication

Complete guide to authenticating with Cloudflare services via Wrangler CLI and REST API.

---

## Authentication Methods

| Method | Use Case | Security | Scope |
|--------|----------|----------|-------|
| **OAuth (wrangler login)** | Local development | High | Full account access |
| **API Token (Bearer)** | CI/CD, automation, scripts | High | Scoped permissions |
| **API Key (legacy)** | Legacy integrations | Low | Global read/write |
| **Origin CA Key** | Certificate management | Medium | Certificates only |

---

## Method 1: OAuth (wrangler login)

**Best for**: Local development, interactive CLI usage

### Setup

```bash
# Authenticate via browser
wrangler login
```

This:
1. Opens your browser
2. Logs you into Cloudflare Dashboard
3. Authorizes Wrangler
4. Stores credentials locally (`~/.wrangler/config/default.toml`)

### Verify

```bash
wrangler whoami
# Output:
# Account: My Account (account_id: abc123...)
# User: user@example.com
```

### Logout

```bash
wrangler logout
```

### Pros
- ✅ Secure (OAuth flow)
- ✅ No manual token management
- ✅ Easy for local development

### Cons
- ❌ Not suitable for CI/CD (requires browser)
- ❌ Full account access (no granular permissions)

---

## Method 2: API Token (Recommended)

**Best for**: CI/CD, automation, production scripts, scoped access

### Create API Token

1. **Go to Cloudflare Dashboard**: https://dash.cloudflare.com/profile/api-tokens
2. **Click "Create Token"**
3. **Choose a template** or **Create Custom Token**

#### Recommended Templates

| Template | Permissions | Use Case |
|----------|-------------|----------|
| **Edit Cloudflare Workers** | Workers:Edit, Account Settings:Read | Deploy Workers, Pages, KV, R2, D1 |
| **Read all resources** | All resources:Read | Read-only access for monitoring |
| **Edit zone DNS** | Zone:Read, DNS:Edit | DNS management scripts |

#### Custom Token (Fine-Grained Control)

**Example: Workers deployment token**

**Permissions**:
- Account → Workers Scripts → Edit
- Account → Workers KV Storage → Edit
- Account → Account Settings → Read

**Zone Resources**:
- Include → Specific zone (example.com)

**Client IP Filtering** (optional):
- Include: `203.0.113.0/24` (your CI/CD IP range)

**TTL** (optional):
- Set expiration date for short-lived tokens

4. **Copy the token** (shown only once!)

### Use API Token

#### With Wrangler

**Option A: Environment variables** (recommended for CI/CD)

```bash
export CLOUDFLARE_API_TOKEN="your_token_here"
export CLOUDFLARE_ACCOUNT_ID="your_account_id"

wrangler deploy
```

**Option B: .env file** (recommended for local dev)

```bash
# .env
CLOUDFLARE_API_TOKEN=your_token_here
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_ZONE_ID=your_zone_id  # Optional, for zone-specific operations
```

```bash
# Load .env and run wrangler
source .env && wrangler deploy
```

**Option C: CI/CD secrets**

```yaml
# GitHub Actions
- name: Deploy Worker
  env:
    CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
  run: wrangler deploy
```

#### With REST API

```bash
curl -X GET "https://api.cloudflare.com/client/v4/zones" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json"
```

#### With Scripts

```bash
# cf-api.sh
export CLOUDFLARE_API_TOKEN="your_token_here"
bash scripts/cf-api.sh GET zones
```

### Get Account ID

```bash
# Method 1: wrangler whoami
wrangler whoami

# Method 2: API call
curl -X GET "https://api.cloudflare.com/client/v4/accounts" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  | jq -r '.result[0].id'

# Method 3: Dashboard URL
# https://dash.cloudflare.com/<account_id>/
```

### Get Zone ID

```bash
# Method 1: API call
curl -X GET "https://api.cloudflare.com/client/v4/zones?name=example.com" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  | jq -r '.result[0].id'

# Method 2: Dashboard
# Go to domain overview → Zone ID is shown on right sidebar
```

### Verify Token

```bash
# Test token validity
curl -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
  -H "Authorization: Bearer YOUR_API_TOKEN"

# Response:
# {
#   "success": true,
#   "result": {
#     "id": "token_id",
#     "status": "active"
#   }
# }
```

### Token Quotas

| Token Type | Quota |
|------------|-------|
| User API Token | 50 tokens per user |
| Account API Token | 500 tokens per account |

### Rotate Tokens

**Best practice**: Rotate tokens every 90 days.

```bash
# 1. Create new token with same permissions
# 2. Update CI/CD secrets
# 3. Test new token
# 4. Delete old token from dashboard
```

### Pros
- ✅ Scoped permissions (least privilege)
- ✅ IP filtering support
- ✅ Expiration dates
- ✅ Revocable
- ✅ Multiple tokens per user
- ✅ Suitable for CI/CD

### Cons
- ❌ Manual setup required
- ❌ Need to manage token lifecycle

---

## Method 3: API Key (Legacy - NOT Recommended)

**Best for**: Legacy integrations only. Migrate to API Tokens.

### Get API Key

1. **Go to**: https://dash.cloudflare.com/profile/api-tokens
2. **Scroll to "API Keys"**
3. **View "Global API Key"**

### Use API Key

```bash
curl -X GET "https://api.cloudflare.com/client/v4/zones" \
  -H "X-Auth-Email: user@example.com" \
  -H "X-Auth-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

### Pros
- ✅ Simple to use

### Cons
- ❌ Global read/write permissions (security risk)
- ❌ Cannot be scoped
- ❌ No IP filtering
- ❌ No expiration
- ❌ Single key per user
- ❌ **NOT recommended by Cloudflare**

### Migration

**Replace API Key with API Token**:

```bash
# Old (API Key)
curl -H "X-Auth-Email: user@example.com" -H "X-Auth-Key: key" ...

# New (API Token)
curl -H "Authorization: Bearer token" ...
```

---

## Method 4: Origin CA Key

**Best for**: Managing Origin CA certificates only.

### Get Origin CA Key

1. **Go to**: https://dash.cloudflare.com/profile/api-tokens
2. **Scroll to "Origin CA Key"**
3. **View key**

### Use Origin CA Key

```bash
curl -X POST "https://api.cloudflare.com/client/v4/certificates" \
  -H "X-Auth-User-Service-Key: YOUR_ORIGIN_CA_KEY" \
  -H "Content-Type: application/json" \
  --data '{
    "hostnames": ["example.com"],
    "requested_validity": 5475,
    "request_type": "origin-rsa"
  }'
```

### Pros
- ✅ Dedicated to certificate management

### Cons
- ❌ Limited to Origin CA certificates only

---

## Environment Variable Summary

### Wrangler

```bash
# Authentication
CLOUDFLARE_API_TOKEN="your_token"           # API token (recommended)
CLOUDFLARE_ACCOUNT_ID="your_account_id"     # Required for account-level operations

# Legacy (not recommended)
CLOUDFLARE_API_KEY="your_key"               # Legacy API key
CLOUDFLARE_EMAIL="user@example.com"         # Email for API key auth

# Optional
CLOUDFLARE_API_BASE_URL="https://api.cloudflare.com/client/v4"  # API endpoint
WRANGLER_LOG="debug"                        # Log level (debug, info, warn, error)
WRANGLER_NO_UPDATE_CHECK="true"             # Disable update checks
```

### Scripts (cf-*.sh)

```bash
# Required
CLOUDFLARE_API_TOKEN="your_token"           # API token
CLOUDFLARE_ACCOUNT_ID="your_account_id"     # Account ID (for account-level ops)
CLOUDFLARE_ZONE_ID="your_zone_id"           # Zone ID (for zone-level ops)

# Optional
CLOUDFLARE_API_BASE="https://api.cloudflare.com/client/v4"  # API base URL
```

---

## CI/CD Setup Examples

### GitHub Actions

```yaml
name: Deploy Worker
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Deploy to Cloudflare
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
        run: npm run deploy
```

**Secrets setup**:
1. Go to repo → Settings → Secrets → Actions
2. Add `CLOUDFLARE_API_TOKEN`
3. Add `CLOUDFLARE_ACCOUNT_ID`

### GitLab CI

```yaml
deploy:
  stage: deploy
  image: node:20
  script:
    - npm ci
    - npm run deploy
  variables:
    CLOUDFLARE_API_TOKEN: $CLOUDFLARE_API_TOKEN
    CLOUDFLARE_ACCOUNT_ID: $CLOUDFLARE_ACCOUNT_ID
  only:
    - main
```

**Variables setup**:
1. Go to project → Settings → CI/CD → Variables
2. Add `CLOUDFLARE_API_TOKEN` (masked, protected)
3. Add `CLOUDFLARE_ACCOUNT_ID`

### CircleCI

```yaml
version: 2.1
jobs:
  deploy:
    docker:
      - image: cimg/node:20.0
    steps:
      - checkout
      - run: npm ci
      - run: npm run deploy
    environment:
      - CLOUDFLARE_API_TOKEN: ${CLOUDFLARE_API_TOKEN}
      - CLOUDFLARE_ACCOUNT_ID: ${CLOUDFLARE_ACCOUNT_ID}

workflows:
  deploy-workflow:
    jobs:
      - deploy
```

**Secrets setup**:
1. Go to project → Project Settings → Environment Variables
2. Add `CLOUDFLARE_API_TOKEN`
3. Add `CLOUDFLARE_ACCOUNT_ID`

---

## Security Best Practices

### 1. Use API Tokens (Not API Keys)
✅ API Tokens have scoped permissions  
❌ API Keys have global access

### 2. Principle of Least Privilege
Create tokens with minimal permissions needed:
- **Read-only** for monitoring
- **Edit Workers** for deployment (not full account access)
- **Edit DNS** for DNS scripts (not full zone access)

### 3. IP Filtering
Add your CI/CD IP ranges to token restrictions:
```
203.0.113.0/24  # Example: GitHub Actions IP range
```

### 4. Set Expiration Dates
Use short-lived tokens (30-90 days) for automated systems.

### 5. Rotate Regularly
Rotate tokens every 90 days. Automate if possible.

### 6. Never Commit Tokens
```bash
# .gitignore
.env
.env.*
wrangler.toml  # If it contains secrets (use wrangler secret put instead)
```

### 7. Use CI/CD Secrets
Store tokens in CI/CD secret management (GitHub Secrets, GitLab Variables, etc.), not in code.

### 8. Monitor Token Usage
Check audit logs for unauthorized usage:
```bash
# Enterprise only
curl -X GET "https://api.cloudflare.com/client/v4/accounts/:account_id/audit_logs" \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

### 9. Revoke Compromised Tokens Immediately
If a token is compromised:
1. Revoke token from dashboard
2. Create new token
3. Update CI/CD secrets
4. Review audit logs

### 10. Separate Tokens for Different Environments
- `CLOUDFLARE_API_TOKEN_STAGING` (scoped to staging account)
- `CLOUDFLARE_API_TOKEN_PRODUCTION` (scoped to production account)

---

## Troubleshooting

### Error: "Authentication error" or "Invalid API token"

**Causes**:
- Token expired
- Token revoked
- Incorrect token value
- Missing `Authorization` header

**Fix**:
```bash
# Verify token
curl -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
  -H "Authorization: Bearer YOUR_API_TOKEN"

# Check environment variable
echo $CLOUDFLARE_API_TOKEN

# Re-authenticate with wrangler
wrangler login
```

### Error: "Insufficient permissions"

**Cause**: Token lacks required permissions

**Fix**:
1. Go to Dashboard → API Tokens
2. Edit token
3. Add missing permissions (e.g., Workers:Edit, Zone:Read)
4. Save and retry

### Error: "Account ID mismatch"

**Cause**: `CLOUDFLARE_ACCOUNT_ID` doesn't match token's account

**Fix**:
```bash
# Get correct account ID
curl -X GET "https://api.cloudflare.com/client/v4/accounts" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  | jq -r '.result[0].id'

# Update environment variable
export CLOUDFLARE_ACCOUNT_ID="correct_account_id"
```

### Error: "Token quota exceeded"

**Cause**: Hit token limit (50 user tokens or 500 account tokens)

**Fix**:
1. Go to Dashboard → API Tokens
2. Delete unused tokens
3. Create new token

### Error: "Rate limit exceeded"

**Cause**: Exceeded 1,200 requests per 5 minutes

**Fix**:
- Implement exponential backoff
- Use Wrangler for bulk operations (has built-in rate limit handling)
- Check `Ratelimit` headers in responses

---

## Quick Reference

### Create Token (Dashboard)
https://dash.cloudflare.com/profile/api-tokens → Create Token

### Verify Token (API)
```bash
curl -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Account ID
```bash
wrangler whoami
# or
curl -X GET "https://api.cloudflare.com/client/v4/accounts" \
  -H "Authorization: Bearer YOUR_TOKEN" | jq -r '.result[0].id'
```

### Get Zone ID
```bash
curl -X GET "https://api.cloudflare.com/client/v4/zones?name=example.com" \
  -H "Authorization: Bearer YOUR_TOKEN" | jq -r '.result[0].id'
```

### Environment Variables (Wrangler)
```bash
export CLOUDFLARE_API_TOKEN="your_token"
export CLOUDFLARE_ACCOUNT_ID="your_account_id"
```

### Environment Variables (Scripts)
```bash
export CLOUDFLARE_API_TOKEN="your_token"
export CLOUDFLARE_ACCOUNT_ID="your_account_id"
export CLOUDFLARE_ZONE_ID="your_zone_id"
```

---

## Resources

- **API Tokens Dashboard**: https://dash.cloudflare.com/profile/api-tokens
- **API Token Permissions**: https://developers.cloudflare.com/fundamentals/api/reference/permissions/
- **API Authentication Docs**: https://developers.cloudflare.com/fundamentals/api/get-started/create-token/
- **GitHub Actions Example**: https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/
