# Vercel Management Scripts

Helper scripts for common Vercel operations.

## Prerequisites

```bash
export VERCEL_TOKEN="your-token"
export VERCEL_PROJECT_ID="your-project-id"  # For env-sync.sh
```

Get your project ID from `.vercel/project.json` after running `vercel link`.  
Create a token at: https://vercel.com/account/tokens

## deploy.sh

Smart deployment script with health checks and automatic rollback.

### Usage

```bash
./deploy.sh [environment] [options]
```

**Environments**: `production`, `preview`, `development`

**Options**:
- `--skip-health-check` - Skip health check validation (production only)
- `--skip-tests` - Skip running tests before deployment

### Examples

```bash
# Deploy to production with health checks
./deploy.sh production

# Deploy to preview
./deploy.sh preview

# Deploy without tests
./deploy.sh production --skip-tests

# Deploy without health check (not recommended)
./deploy.sh production --skip-health-check
```

### Workflow

1. **Run Tests** - Executes `npm test` if script exists
2. **Pull Config** - Downloads Vercel environment configuration
3. **Build** - Builds project with `vercel build`
4. **Deploy** - Deploys to Vercel
5. **Health Check** (production only) - Validates `/api/health` endpoint
6. **Promote** (production only) - Promotes to production if healthy
7. **Rollback** - Removes deployment if health check fails

### Health Check Requirements

For production deployments, create a health endpoint:

```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({ status: 'healthy' });
}
```

### Output

Deployment URL is saved to `deployment-url.txt` and printed to console.

---

## env-sync.sh

Environment variable management with backup and sync capabilities.

### Usage

```bash
./env-sync.sh <command> [arguments]
```

### Commands

#### Pull Environment Variables

```bash
./env-sync.sh pull <environment>
```

Downloads environment variables to `.env.<environment>` file and creates automatic backup.

**Examples**:
```bash
./env-sync.sh pull production
./env-sync.sh pull preview
./env-sync.sh pull development
```

#### Push Environment Variables

**Bulk push from file**:
```bash
./env-sync.sh push <file> <target>
```

**Single variable**:
```bash
./env-sync.sh push <key> <value> <target>
```

**Examples**:
```bash
# Bulk push
./env-sync.sh push .env.production production

# Single variable
./env-sync.sh push API_KEY "secret-value" production
./env-sync.sh push DATABASE_URL "postgresql://..." production
```

⚠️ **Warning**: Push operations replace existing values. Always backup first!

#### Backup Environment Variables

```bash
./env-sync.sh backup <environment>
```

Creates JSON backup in `backups/` directory with timestamp.

**Example**:
```bash
./env-sync.sh backup production
# Creates: backups/env-production-20260117-221545.json
```

#### Compare Environments

```bash
./env-sync.sh diff <env1> <env2>
```

Shows differences between two environments using unified diff format.

**Examples**:
```bash
./env-sync.sh diff production preview
./env-sync.sh diff production development
```

### Workflow: Safe Environment Updates

```bash
# 1. Pull current production environment
./env-sync.sh pull production

# 2. Backup before changes
./env-sync.sh backup production

# 3. Edit locally
vim .env.production

# 4. Compare with preview
./env-sync.sh diff production preview

# 5. Push changes
./env-sync.sh push .env.production production
```

### Backup Location

Backups are stored in `backups/` directory with naming format:
```
env-<environment>-<YYYYMMDD>-<HHMMSS>.json
```

Example:
```
backups/
  env-production-20260117-143022.json
  env-production-20260117-150845.json
  env-preview-20260117-151200.json
```

### Recovery from Backup

To restore from backup, use the Vercel API or CLI with the JSON file:

```bash
# View backup
cat backups/env-production-20260117-143022.json | jq

# Restore manually (requires custom script or API calls)
```

---

## Common Workflows

### Initial Setup

```bash
# Link project (creates .vercel/project.json)
vercel link

# Get project ID
export VERCEL_PROJECT_ID=$(cat .vercel/project.json | jq -r '.projectId')

# Pull environment variables
./env-sync.sh pull production
./env-sync.sh pull preview
./env-sync.sh pull development
```

### Deploy to Production

```bash
# Deploy with all safety checks
./deploy.sh production

# Or skip tests if already run in CI
./deploy.sh production --skip-tests
```

### Environment Sync Workflow

```bash
# Sync production to preview
./env-sync.sh pull production
./env-sync.sh backup preview
./env-sync.sh push .env.production preview

# Verify changes
./env-sync.sh diff production preview
```

### Emergency Rollback

If a deployment fails health checks, it's automatically removed. Manual rollback:

```bash
# List recent deployments
vercel list --prod

# Rollback to previous
vercel rollback <deployment-url>
```

---

## Troubleshooting

### "VERCEL_TOKEN not set"

```bash
export VERCEL_TOKEN="your-token-here"
```

Create token at: https://vercel.com/account/tokens

### "VERCEL_PROJECT_ID not set"

```bash
# Link project first
vercel link

# Extract project ID
cat .vercel/project.json | jq -r '.projectId'

# Set environment variable
export VERCEL_PROJECT_ID="prj_xxxxx"
```

### Health Check Fails

1. Verify `/api/health` endpoint exists and returns HTTP 200
2. Check deployment logs: `vercel logs <deployment-url>`
3. Inspect deployment: `vercel inspect <deployment-id>`
4. Skip health check (not recommended): `./deploy.sh production --skip-health-check`

### Environment Variable Conflicts

```bash
# Compare environments to identify conflicts
./env-sync.sh diff production preview

# Pull specific environment
./env-sync.sh pull production

# Check current values in Vercel
vercel env ls production
```

---

## CI/CD Integration

### GitHub Actions

Use scripts in GitHub Actions workflows:

```yaml
- name: Deploy to Production
  env:
    VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
  run: ./scripts/deploy.sh production --skip-tests

- name: Sync Environment Variables
  env:
    VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
    VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
  run: |
    ./scripts/env-sync.sh pull production
    ./scripts/env-sync.sh diff production preview
```

---

## Security Notes

1. **Never commit `.env.*` files** - Add to `.gitignore`
2. **Store VERCEL_TOKEN securely** - Use GitHub Secrets or environment variables
3. **Review backups** before deletion - They may contain sensitive data
4. **Use `--sensitive` flag** for API keys when using `vercel env add` directly

---

## Version Information

**Scripts Version**: 1.0.0  
**Compatible with**: Vercel CLI 50.4.5+  
**Last Updated**: 2026-01-17
