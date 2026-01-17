# Wrangler CLI Commands Reference

Comprehensive reference for Wrangler v4+ (latest as of Jan 2026).

## Installation & Setup

```bash
# Install globally
npm install -g wrangler@latest

# Install as dev dependency (recommended for projects)
npm install -D wrangler@latest

# Check version
wrangler --version

# Get help
wrangler --help
wrangler <command> --help
```

---

## Authentication

### `wrangler login`
Open browser for OAuth authentication.

```bash
wrangler login
# Opens browser, authenticates with Cloudflare account
```

### `wrangler logout`
Remove stored authentication credentials.

```bash
wrangler logout
```

### `wrangler whoami`
Display current authentication details.

```bash
wrangler whoami
# Shows: Account name, Account ID, User email
```

---

## Project Management

### `wrangler init`
Initialize a new Workers project.

```bash
# Interactive wizard
wrangler init

# Non-interactive with options
wrangler init my-worker --yes

# Initialize with TypeScript
wrangler init my-worker --type=typescript

# Initialize with specific template
wrangler init my-worker --from-dash
```

**Options**:
- `--yes`, `-y` - Answer yes to all prompts
- `--type` - Project type (javascript, typescript, webpack, rust)
- `--from-dash` - Fetch an existing Worker from dashboard

### `wrangler generate`
Generate a new project from a template (legacy, use `init` or `npm create cloudflare`).

```bash
wrangler generate my-worker https://github.com/cloudflare/worker-template
```

---

## Development

### `wrangler dev`
Start local development server with hot reload.

```bash
# Start dev server (default: http://localhost:8787)
wrangler dev

# Specify port
wrangler dev --port 3000

# Use remote resources (KV, R2, D1) instead of local stubs
wrangler dev --remote

# Persist data locally
wrangler dev --persist

# Specify environment
wrangler dev --env production

# Enable live reload
wrangler dev --live-reload

# Test scheduled events
wrangler dev --test-scheduled
```

**Options**:
- `--port <number>` - Port to listen on (default: 8787)
- `--ip <address>` - IP address to listen on (default: localhost)
- `--remote` - Use remote bindings (KV, R2, D1) from production
- `--persist` - Enable persistence for local data
- `--env <name>` - Use specific environment from wrangler.toml
- `--test-scheduled` - Test cron triggers
- `--compatibility-date <date>` - Override compatibility date
- `--compatibility-flags <flags>` - Set compatibility flags
- `--live-reload` - Automatically reload browser on changes

---

## Deployment

### `wrangler deploy`
Deploy Worker to Cloudflare (replaces legacy `publish`).

```bash
# Deploy
wrangler deploy

# Deploy with custom name
wrangler deploy --name my-custom-name

# Deploy to specific environment
wrangler deploy --env production

# Dry run (validate without deploying)
wrangler deploy --dry-run

# Deploy with specific compatibility date
wrangler deploy --compatibility-date 2024-01-01

# Deploy without minification (for debugging)
wrangler deploy --no-bundle

# Deploy with specific triggers
wrangler deploy --triggers "*.example.com/*"
```

**Options**:
- `--name <name>` - Override worker name
- `--env <name>` - Deploy to specific environment
- `--dry-run` - Validate without deploying
- `--compatibility-date <date>` - Set compatibility date
- `--compatibility-flags <flags>` - Set compatibility flags
- `--no-bundle` - Skip bundling
- `--minify` - Minify output
- `--outdir <dir>` - Output directory for bundled code

### `wrangler publish`
Legacy command (use `deploy` instead).

```bash
# Same as wrangler deploy
wrangler publish
```

### `wrangler delete`
Delete a Worker or Pages project.

```bash
# Delete Worker
wrangler delete my-worker

# Delete with confirmation
wrangler delete my-worker --name my-worker
```

---

## Secrets Management

### `wrangler secret put`
Add or update a secret.

```bash
# Interactive (recommended - prompts for value)
wrangler secret put API_KEY

# From file
echo "secret_value" | wrangler secret put API_KEY

# For specific environment
wrangler secret put API_KEY --env production
```

### `wrangler secret list`
List all secrets (names only, values never shown).

```bash
wrangler secret list

# For specific environment
wrangler secret list --env production
```

### `wrangler secret delete`
Delete a secret.

```bash
wrangler secret delete API_KEY

# For specific environment
wrangler secret delete API_KEY --env production
```

---

## KV (Key-Value Storage)

### `wrangler kv namespace create`
Create a new KV namespace.

```bash
# Create namespace
wrangler kv namespace create MY_KV

# For specific environment
wrangler kv namespace create MY_KV --env production

# Output includes namespace ID to add to wrangler.toml
```

### `wrangler kv namespace list`
List all KV namespaces.

```bash
wrangler kv namespace list
```

### `wrangler kv namespace delete`
Delete a KV namespace.

```bash
wrangler kv namespace delete --namespace-id=<id>

# Force delete without confirmation
wrangler kv namespace delete --namespace-id=<id> --force
```

### `wrangler kv key put`
Add or update a key-value pair.

```bash
# Set a key
wrangler kv key put --namespace-id=<id> "mykey" "myvalue"

# Set with expiration (seconds from now)
wrangler kv key put --namespace-id=<id> "mykey" "myvalue" --expiration-ttl=3600

# Set from file
wrangler kv key put --namespace-id=<id> "mykey" --path=./file.txt

# Set with metadata
wrangler kv key put --namespace-id=<id> "mykey" "myvalue" --metadata='{"user":"alice"}'
```

### `wrangler kv key get`
Retrieve a value by key.

```bash
wrangler kv key get --namespace-id=<id> "mykey"

# Preview (doesn't count against rate limits)
wrangler kv key get --namespace-id=<id> "mykey" --preview
```

### `wrangler kv key delete`
Delete a key.

```bash
wrangler kv key delete --namespace-id=<id> "mykey"
```

### `wrangler kv key list`
List all keys in a namespace.

```bash
# List all keys
wrangler kv key list --namespace-id=<id>

# List with prefix filter
wrangler kv key list --namespace-id=<id> --prefix="user:"

# Limit results
wrangler kv key list --namespace-id=<id> --limit=100
```

### `wrangler kv bulk put`
Bulk upload key-value pairs from JSON file.

```bash
# JSON format: [{"key":"k1","value":"v1"},{"key":"k2","value":"v2"}]
wrangler kv bulk put --namespace-id=<id> ./data.json
```

### `wrangler kv bulk delete`
Bulk delete keys from JSON file.

```bash
# JSON format: ["key1", "key2", "key3"]
wrangler kv bulk delete --namespace-id=<id> ./keys.json
```

---

## R2 (Object Storage)

### `wrangler r2 bucket create`
Create a new R2 bucket.

```bash
wrangler r2 bucket create my-bucket

# With location hint (nam, eeur, apac)
wrangler r2 bucket create my-bucket --location=eeur
```

### `wrangler r2 bucket list`
List all R2 buckets.

```bash
wrangler r2 bucket list
```

### `wrangler r2 bucket delete`
Delete an R2 bucket.

```bash
wrangler r2 bucket delete my-bucket
```

### `wrangler r2 object put`
Upload an object to R2.

```bash
# Upload file
wrangler r2 object put my-bucket/path/file.txt --file=./local-file.txt

# Upload from stdin
echo "content" | wrangler r2 object put my-bucket/file.txt

# With content type
wrangler r2 object put my-bucket/image.png --file=./image.png --content-type=image/png

# With metadata
wrangler r2 object put my-bucket/file.txt --file=./file.txt --custom-metadata='{"author":"alice"}'
```

### `wrangler r2 object get`
Download an object from R2.

```bash
# Download to file
wrangler r2 object get my-bucket/path/file.txt --file=./local-file.txt

# Output to stdout
wrangler r2 object get my-bucket/file.txt
```

### `wrangler r2 object delete`
Delete an object from R2.

```bash
wrangler r2 object delete my-bucket/path/file.txt
```

### `wrangler r2 object list`
List objects in an R2 bucket.

```bash
# List all objects
wrangler r2 object list my-bucket

# List with prefix
wrangler r2 object list my-bucket --prefix="images/"

# Limit results
wrangler r2 object list my-bucket --limit=100
```

---

## D1 (SQLite Databases)

### `wrangler d1 create`
Create a new D1 database.

```bash
wrangler d1 create my-database

# Output includes database ID to add to wrangler.toml
```

### `wrangler d1 list`
List all D1 databases.

```bash
wrangler d1 list
```

### `wrangler d1 delete`
Delete a D1 database.

```bash
wrangler d1 delete my-database

# With database ID
wrangler d1 delete --database-id=<id>
```

### `wrangler d1 execute`
Execute SQL against a D1 database.

```bash
# Execute command
wrangler d1 execute my-database --command="SELECT * FROM users"

# Execute from file
wrangler d1 execute my-database --file=./query.sql

# For specific environment
wrangler d1 execute my-database --env production --command="SELECT * FROM users"

# With JSON output
wrangler d1 execute my-database --command="SELECT * FROM users" --json

# Execute with preview (doesn't affect production)
wrangler d1 execute my-database --local --command="SELECT * FROM users"
```

### `wrangler d1 migrations create`
Create a new migration file.

```bash
wrangler d1 migrations create my-database "create_users_table"

# Creates: migrations/YYYYMMDDHHMMSS_create_users_table.sql
```

### `wrangler d1 migrations apply`
Apply pending migrations.

```bash
# Apply to production
wrangler d1 migrations apply my-database

# Apply locally (for development)
wrangler d1 migrations apply my-database --local

# Apply to specific environment
wrangler d1 migrations apply my-database --env production

# Dry run (show what would be applied)
wrangler d1 migrations apply my-database --dry-run
```

### `wrangler d1 migrations list`
List all migrations and their status.

```bash
wrangler d1 migrations list my-database

# For specific environment
wrangler d1 migrations list my-database --env production
```

### `wrangler d1 backup`
Manage database backups (Enterprise only).

```bash
# List backups
wrangler d1 backup list my-database

# Create backup
wrangler d1 backup create my-database

# Restore backup
wrangler d1 backup restore my-database --backup-id=<id>
```

---

## Queues

### `wrangler queues create`
Create a new Queue.

```bash
wrangler queues create my-queue
```

### `wrangler queues list`
List all Queues.

```bash
wrangler queues list
```

### `wrangler queues delete`
Delete a Queue.

```bash
wrangler queues delete my-queue
```

### `wrangler queues consumer`
Manage Queue consumers.

```bash
# Add consumer
wrangler queues consumer add my-queue my-worker

# Remove consumer
wrangler queues consumer remove my-queue my-worker

# List consumers
wrangler queues consumer list my-queue
```

---

## Pages

### `wrangler pages deploy`
Deploy a Pages project.

```bash
# Deploy directory
wrangler pages deploy ./dist

# Deploy with project name
wrangler pages deploy ./dist --project-name=my-site

# Deploy with commit info
wrangler pages deploy ./dist --commit-dirty=true --commit-hash=abc123

# Deploy to specific environment
wrangler pages deploy ./dist --branch=main

# Deploy with specific environment variables
wrangler pages deploy ./dist --env=production
```

**Options**:
- `--project-name <name>` - Project name
- `--branch <name>` - Git branch (determines production vs preview)
- `--commit-hash <hash>` - Git commit hash
- `--commit-dirty` - Allow uncommitted changes
- `--env <name>` - Environment name

### `wrangler pages project create`
Create a new Pages project.

```bash
wrangler pages project create my-site

# With production branch
wrangler pages project create my-site --production-branch=main
```

### `wrangler pages project list`
List all Pages projects.

```bash
wrangler pages project list
```

### `wrangler pages project delete`
Delete a Pages project.

```bash
wrangler pages project delete my-site
```

### `wrangler pages deployment list`
List deployments for a Pages project.

```bash
wrangler pages deployment list --project-name=my-site
```

### `wrangler pages deployment tail`
Stream logs from a Pages deployment.

```bash
wrangler pages deployment tail --project-name=my-site
```

---

## Durable Objects

### `wrangler durable-objects namespace list`
List Durable Objects namespaces.

```bash
wrangler durable-objects namespace list
```

### `wrangler durable-objects namespace create`
Create a Durable Objects namespace.

```bash
wrangler durable-objects namespace create MyDurableObject --script=my-worker
```

---

## AI

### `wrangler ai models list`
List available AI models.

```bash
wrangler ai models list

# Filter by task
wrangler ai models list --task=text-generation
```

### `wrangler ai models run`
Run inference on an AI model.

```bash
wrangler ai models run @cf/meta/llama-2-7b-chat-int8 --input='{"prompt":"Hello"}'
```

---

## Vectorize

### `wrangler vectorize create`
Create a Vectorize index.

```bash
wrangler vectorize create my-index --dimensions=768 --metric=cosine

# With OpenAI preset
wrangler vectorize create my-index --preset=openai-text-embedding-ada-002
```

**Options**:
- `--dimensions <number>` - Vector dimensions
- `--metric` - Distance metric (cosine, euclidean, dot-product)
- `--preset` - Use preset config (openai-text-embedding-ada-002, etc.)

### `wrangler vectorize list`
List Vectorize indexes.

```bash
wrangler vectorize list
```

### `wrangler vectorize delete`
Delete a Vectorize index.

```bash
wrangler vectorize delete my-index
```

### `wrangler vectorize insert`
Insert vectors into an index.

```bash
# From JSON file: [{"id":"1","values":[0.1,0.2,...],"metadata":{...}}]
wrangler vectorize insert my-index --file=vectors.json
```

### `wrangler vectorize query`
Query a Vectorize index.

```bash
wrangler vectorize query my-index --vector="[0.1,0.2,0.3,...]" --top-k=10
```

---

## Logs & Monitoring

### `wrangler tail`
Stream real-time logs from a Worker.

```bash
# Tail logs
wrangler tail

# Tail specific worker
wrangler tail my-worker

# Tail with filters
wrangler tail --status=error
wrangler tail --method=POST
wrangler tail --search="user_id"

# Output format
wrangler tail --format=json
wrangler tail --format=pretty

# Tail for specific environment
wrangler tail --env production
```

**Options**:
- `--status <code>` - Filter by HTTP status (ok, error, canceled)
- `--method <method>` - Filter by HTTP method
- `--header <name:value>` - Filter by header
- `--search <text>` - Filter by text in logs
- `--format` - Output format (json, pretty)
- `--env <name>` - Tail specific environment

---

## Configuration

### `wrangler config`
Validate wrangler.toml configuration.

```bash
wrangler config

# Show computed config for environment
wrangler config --env production
```

---

## Types & TypeScript

### `wrangler types`
Generate TypeScript types for bindings.

```bash
# Generate types from wrangler.toml
wrangler types

# Output to specific file
wrangler types --output=./worker-configuration.d.ts

# For specific environment
wrangler types --env production
```

---

## Diagnostics

### `wrangler docs`
Open Cloudflare Workers documentation.

```bash
wrangler docs

# Open specific topic
wrangler docs kv
wrangler docs r2
```

### `wrangler login --help`
Get help for any command.

```bash
wrangler <command> --help
wrangler deploy --help
wrangler kv --help
```

---

## Global Options

All commands support these options:

- `--config <path>` - Path to wrangler.toml (default: ./wrangler.toml)
- `--env <name>` - Environment name from wrangler.toml
- `--experimental-json-config` - Use JSON config instead of TOML
- `--help`, `-h` - Show help
- `--version`, `-v` - Show version

---

## Environment Variables

Wrangler respects these environment variables:

```bash
# Authentication
CLOUDFLARE_API_TOKEN="your_token"
CLOUDFLARE_ACCOUNT_ID="your_account_id"

# API endpoint (for testing/proxies)
CLOUDFLARE_API_BASE_URL="https://api.cloudflare.com/client/v4"

# Disable update checks
WRANGLER_NO_UPDATE_CHECK=true

# Output format
WRANGLER_LOG=debug  # debug, info, warn, error
```

---

## Troubleshooting Commands

### Check authentication
```bash
wrangler whoami
```

### Validate configuration
```bash
wrangler config
wrangler deploy --dry-run
```

### View logs
```bash
wrangler tail my-worker --format=pretty
```

### Debug with local dev
```bash
wrangler dev --port 8787 --live-reload
```

### Check bindings
```bash
wrangler kv namespace list
wrangler r2 bucket list
wrangler d1 list
```

---

## Migration from Wrangler v1/v2

| Wrangler v1/v2 | Wrangler v4 |
|----------------|-------------|
| `wrangler publish` | `wrangler deploy` |
| `wrangler preview` | `wrangler dev` |
| `wrangler kv:namespace` | `wrangler kv namespace` |
| `wrangler kv:key` | `wrangler kv key` |
| Manual binding setup | Automatic resource provisioning |
| `--legacy-env` flag | Native environment support |

---

## Best Practices

1. **Use environments**: Separate staging/production in wrangler.toml
2. **Version control wrangler.toml**: Include in git
3. **Never commit secrets**: Use `wrangler secret put`
4. **Test locally first**: Use `wrangler dev` before deploying
5. **Use TypeScript**: Generate types with `wrangler types`
6. **Monitor logs**: Use `wrangler tail` for real-time debugging
7. **Use `--dry-run`**: Validate before deploying
8. **Pin compatibility date**: Avoid breaking changes

---

## Resources

- **Official Docs**: https://developers.cloudflare.com/workers/wrangler/
- **GitHub**: https://github.com/cloudflare/workers-sdk
- **npm**: https://www.npmjs.com/package/wrangler
- **Examples**: https://developers.cloudflare.com/workers/examples/
- **Discord**: https://discord.gg/cloudflaredev
