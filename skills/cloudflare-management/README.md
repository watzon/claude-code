# Cloudflare Management Skill

Comprehensive Cloudflare service management via Wrangler CLI and REST API.

## Structure

```
cloudflare-management/
├── SKILL.md                          # Main skill documentation
├── README.md                         # This file
├── scripts/
│   ├── cf-api.sh                    # Generic REST API wrapper
│   ├── cf-zone-management.sh        # DNS, SSL, zone management
│   └── cf-security.sh               # WAF, firewall, rate limiting
├── references/
│   ├── api-surface.md               # Complete API reference (14 categories)
│   ├── wrangler-commands.md         # Comprehensive CLI reference
│   ├── authentication.md            # Token setup and environment config
│   └── service-guides.md            # Quick-start patterns for Workers, Pages, R2, D1, KV
└── assets/
    └── wrangler.toml.template       # Configuration template with all options

```

## Quick Start

### 1. Install Wrangler

```bash
npm install -g wrangler@latest
wrangler login
```

### 2. Authenticate

```bash
export CLOUDFLARE_API_TOKEN="your_token"
export CLOUDFLARE_ACCOUNT_ID="your_account_id"
```

### 3. Use Scripts

```bash
bash scripts/cf-zone-management.sh dns list example.com

bash scripts/cf-security.sh firewall list example.com

bash scripts/cf-api.sh GET zones
```

## Coverage

**Wrangler CLI**: Workers, Pages, KV, R2, D1, Queues, AI, Vectorize, Hyperdrive, Durable Objects

**REST API Scripts**: DNS, SSL/TLS, Zones, Load Balancers, WAF, Firewall, Rate Limiting, Bot Management

**Full API Surface**: 14 major categories with 100+ endpoints documented

## Documentation

- **SKILL.md**: Main entry point with core workflows
- **references/**: Detailed documentation for specific topics
- **assets/**: Templates and configuration examples

## Resources

- **Wrangler Docs**: https://developers.cloudflare.com/workers/wrangler/
- **API Docs**: https://developers.cloudflare.com/api/
- **Workers Examples**: https://developers.cloudflare.com/workers/examples/
