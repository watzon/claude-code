# Dokploy CLI

A portable, zero-dependency CLI for [Dokploy](https://dokploy.com) built with Deno. Unlike the official CLI which requires Node.js and has limited functionality, this CLI covers the full Dokploy API and compiles to a single binary.

## Features

- **Portable**: Single binary, no runtime dependencies
- **Comprehensive**: Covers 90%+ of the Dokploy API (vs ~8% for official CLI)
- **Type-safe**: Built with TypeScript, fully typed API client
- **Automation-friendly**: All commands support `--json` output, no interactive prompts required

## Installation

### Option 1: Download Binary (Recommended)

Download the pre-compiled binary for your platform:

```bash
# macOS (Apple Silicon)
curl -fsSL https://example.com/dokploy-macos-arm -o dokploy
chmod +x dokploy
sudo mv dokploy /usr/local/bin/

# macOS (Intel)
curl -fsSL https://example.com/dokploy-macos -o dokploy
chmod +x dokploy
sudo mv dokploy /usr/local/bin/

# Linux (x64)
curl -fsSL https://example.com/dokploy-linux -o dokploy
chmod +x dokploy
sudo mv dokploy /usr/local/bin/
```

### Option 2: Run with Deno

```bash
deno run --allow-net --allow-read --allow-write --allow-env \
  https://raw.githubusercontent.com/.../mod.ts [command]
```

### Option 3: Compile from Source

```bash
git clone https://github.com/.../dokploy-cli
cd dokploy-cli
deno task compile
./dist/dokploy --help
```

## Quick Start

```bash
# 1. Authenticate
dokploy auth login --url https://panel.example.com --token YOUR_API_TOKEN

# 2. List projects
dokploy project list

# 3. Deploy an application
dokploy app deploy <applicationId>
```

## Commands

### Authentication

```bash
dokploy auth login --url <url> --token <token>  # Save credentials
dokploy auth logout                              # Remove credentials
dokploy auth status                              # Check connection
dokploy auth set-default --project <id>          # Set defaults
```

### Projects

```bash
dokploy project list                             # List all projects
dokploy project get <projectId>                  # Get project details
dokploy project create --name "My Project"       # Create project
dokploy project delete <projectId> --force       # Delete project
```

### Applications

```bash
dokploy app get <appId>                          # Get app details
dokploy app create --name "My App" --environment <envId>
dokploy app deploy <appId>                       # Deploy
dokploy app redeploy <appId>                     # Rebuild + deploy
dokploy app start <appId>                        # Start
dokploy app stop <appId>                         # Stop
dokploy app delete <appId> --force               # Delete
dokploy app env <appId>                          # Get env vars
dokploy app env <appId> --set KEY=value          # Set env vars
dokploy app env <appId> --file .env              # Set from file
```

### Docker Compose

```bash
dokploy compose get <composeId>
dokploy compose create --name "Stack" --environment <envId> --file docker-compose.yml
dokploy compose deploy <composeId>
dokploy compose start <composeId>
dokploy compose stop <composeId>
dokploy compose delete <composeId> --force
dokploy compose file <composeId>                 # Get compose file
dokploy compose file <composeId> --set file.yml  # Update compose file
```

### Domains

```bash
dokploy domain list --app <appId>
dokploy domain create --host app.example.com --app <appId> --https
dokploy domain delete <domainId> --force
dokploy domain generate --app-name myapp         # Generate traefik.me domain
```

### Databases

Supported: `postgres`, `mysql`, `mariadb`, `mongo`, `redis`

```bash
dokploy db create postgres --name "My DB" --environment <envId> \
  --db-name myapp --db-user admin --db-password secret

dokploy db deploy postgres <dbId>
dokploy db start postgres <dbId>
dokploy db stop postgres <dbId>
dokploy db delete postgres <dbId> --force
```

### Servers

```bash
dokploy server list
dokploy server get <serverId>
dokploy server create --name "Build Server" --ip 1.2.3.4 --port 22 \
  --user root --ssh-key <keyId> --type build
dokploy server validate <serverId>
dokploy server delete <serverId> --force
```

### Docker

```bash
dokploy docker containers                        # List containers
dokploy docker containers --server <serverId>    # On specific server
dokploy docker restart <containerId>             # Restart container
```

## Configuration

### Environment Variables

```bash
export DOKPLOY_URL="https://panel.example.com"
export DOKPLOY_TOKEN="your-api-token"
export DOKPLOY_PROJECT_ID="default-project-id"     # Optional
export DOKPLOY_ENVIRONMENT_ID="default-env-id"     # Optional
```

### Config File

Credentials are stored in `~/.config/dokploy/config.json`:

```json
{
  "url": "https://panel.example.com",
  "token": "your-api-token",
  "defaultProjectId": "optional",
  "defaultEnvironmentId": "optional"
}
```

**Priority**: Environment variables override config file.

## JSON Output

All commands support `--json` for machine-readable output:

```bash
dokploy project list --json | jq '.[].name'
dokploy app get abc123 --json > app.json
```

## CI/CD Examples

### GitHub Actions

```yaml
- name: Deploy to Dokploy
  env:
    DOKPLOY_URL: ${{ secrets.DOKPLOY_URL }}
    DOKPLOY_TOKEN: ${{ secrets.DOKPLOY_TOKEN }}
  run: |
    ./dokploy app deploy ${{ secrets.APP_ID }}
```

### Shell Script

```bash
#!/bin/bash
set -e

export DOKPLOY_URL="https://panel.example.com"
export DOKPLOY_TOKEN="$DOKPLOY_TOKEN"

# Deploy and verify
./dokploy app deploy abc123
sleep 30
curl -f https://myapp.example.com/health || exit 1
```

## Comparison with Official CLI

| Feature | Official CLI | This CLI |
|---------|--------------|----------|
| API Coverage | ~8% (33 commands) | ~90% (100+ operations) |
| Runtime | Node.js 18+ | None (single binary) |
| Compose Support | None | Full lifecycle |
| Domain Management | None | Full CRUD |
| Server Management | None | Full CRUD |
| Interactive Mode | Required for most ops | Optional |
| JSON Output | No | Yes |
| Docker Operations | No | Yes |

## Development

```bash
# Run in development
deno task dev --help

# Compile for all platforms
deno task compile:all

# Type check
deno check mod.ts
```

## License

MIT
