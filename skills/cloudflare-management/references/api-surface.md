# Cloudflare API Surface

Complete reference of Cloudflare's API services organized by category. All APIs use the base URL `https://api.cloudflare.com/client/v4/`.

## Authentication

All API requests require authentication via one of these methods:

```bash
# Bearer token (recommended)
curl -H "Authorization: Bearer <token>" https://api.cloudflare.com/client/v4/zones

# Legacy API key (not recommended)
curl -H "X-Auth-Email: user@example.com" -H "X-Auth-Key: <key>" https://api.cloudflare.com/client/v4/zones
```

---

## 1. Account & User Management

### Accounts
- `GET /accounts` - List accounts
- `GET /accounts/:id` - Get account details
- `PATCH /accounts/:id` - Update account

### User
- `GET /user` - Get current user
- `PATCH /user` - Update user
- `GET /user/tokens` - List API tokens
- `POST /user/tokens` - Create API token
- `DELETE /user/tokens/:id` - Delete API token

### Memberships
- `GET /memberships` - List account memberships
- `GET /memberships/:id` - Get membership
- `DELETE /memberships/:id` - Remove membership

### Audit Logs
- `GET /accounts/:account_id/audit_logs` - List audit logs (Enterprise only)

### Billing
- `GET /accounts/:account_id/billing/profile` - Get billing profile
- `GET /accounts/:account_id/billing/history` - Get billing history

### IAM (Identity & Access Management)
- `GET /accounts/:account_id/iam/permissions` - List permissions
- `GET /accounts/:account_id/iam/roles` - List roles
- `POST /accounts/:account_id/iam/policies` - Create access policy

---

## 2. AI Services

### AI Gateway
- `GET /accounts/:account_id/ai-gateway/gateways` - List AI gateways
- `POST /accounts/:account_id/ai-gateway/gateways` - Create AI gateway
- `GET /accounts/:account_id/ai-gateway/gateways/:id/logs` - Get gateway logs

### Vectorize (Vector Database)
- `GET /accounts/:account_id/vectorize/indexes` - List indexes
- `POST /accounts/:account_id/vectorize/indexes` - Create index
- `POST /accounts/:account_id/vectorize/indexes/:name/query` - Query vectors
- `POST /accounts/:account_id/vectorize/indexes/:name/upsert` - Insert/update vectors
- `DELETE /accounts/:account_id/vectorize/indexes/:name` - Delete index

### Workers AI
- Accessed via Workers runtime bindings, not direct API
- Models: LLMs, image classification, text embeddings, translation, etc.

---

## 3. Certificate Management

### SSL/TLS Certificates
- `GET /zones/:zone_id/ssl/certificate_packs` - List certificate packs
- `POST /zones/:zone_id/ssl/certificate_packs` - Order certificate
- `GET /zones/:zone_id/ssl/verification` - Get verification status

### Custom Certificates
- `GET /zones/:zone_id/custom_certificates` - List custom certificates
- `POST /zones/:zone_id/custom_certificates` - Upload custom certificate
- `PATCH /zones/:zone_id/custom_certificates/:id` - Update certificate
- `DELETE /zones/:zone_id/custom_certificates/:id` - Delete certificate

### Origin CA Certificates
- `GET /certificates` - List Origin CA certificates
- `POST /certificates` - Create Origin CA certificate
- `DELETE /certificates/:id` - Revoke certificate

### mTLS Certificates
- `GET /zones/:zone_id/mtls_certificates` - List mTLS certificates
- `POST /zones/:zone_id/mtls_certificates` - Upload mTLS certificate

### Custom Hostnames
- `GET /zones/:zone_id/custom_hostnames` - List custom hostnames
- `POST /zones/:zone_id/custom_hostnames` - Create custom hostname
- `PATCH /zones/:zone_id/custom_hostnames/:id` - Update custom hostname
- `DELETE /zones/:zone_id/custom_hostnames/:id` - Delete custom hostname

---

## 4. DNS

### DNS Records
- `GET /zones/:zone_id/dns_records` - List DNS records
- `POST /zones/:zone_id/dns_records` - Create DNS record
- `GET /zones/:zone_id/dns_records/:id` - Get DNS record
- `PATCH /zones/:zone_id/dns_records/:id` - Update DNS record
- `DELETE /zones/:zone_id/dns_records/:id` - Delete DNS record

**Supported record types**: A, AAAA, CNAME, MX, TXT, SRV, CAA, NS, PTR, CERT, DNSKEY, DS, NAPTR, SMIMEA, SSHFP, TLSA, URI

### DNS Firewall
- `GET /accounts/:account_id/dns_firewall` - List DNS Firewall clusters
- `POST /accounts/:account_id/dns_firewall` - Create DNS Firewall cluster

### DNSSEC
- `GET /zones/:zone_id/dnssec` - Get DNSSEC details
- `PATCH /zones/:zone_id/dnssec` - Update DNSSEC settings
- `DELETE /zones/:zone_id/dnssec` - Disable DNSSEC

---

## 5. Domain & Zone Management

### Zones
- `GET /zones` - List zones
- `POST /zones` - Create zone
- `GET /zones/:id` - Get zone
- `PATCH /zones/:id` - Update zone
- `DELETE /zones/:id` - Delete zone

### Zone Settings
- `GET /zones/:zone_id/settings` - Get all settings
- `GET /zones/:zone_id/settings/:setting` - Get specific setting
- `PATCH /zones/:zone_id/settings/:setting` - Update setting

**Common settings**: ssl, security_level, cache_level, browser_cache_ttl, development_mode, minify, http2, http3, websockets, ipv6

### Registrar (Domain Registration)
- `GET /accounts/:account_id/registrar/domains` - List domains
- `POST /accounts/:account_id/registrar/domains` - Register domain
- `GET /accounts/:account_id/registrar/domains/:domain` - Get domain
- `PUT /accounts/:account_id/registrar/domains/:domain` - Update domain

---

## 6. IP Addresses

### IP Lists
- `GET /accounts/:account_id/rules/lists` - List IP lists
- `POST /accounts/:account_id/rules/lists` - Create IP list
- `GET /accounts/:account_id/rules/lists/:id` - Get IP list
- `PUT /accounts/:account_id/rules/lists/:id` - Update IP list
- `DELETE /accounts/:account_id/rules/lists/:id` - Delete IP list

### IP Access Rules
- `GET /zones/:zone_id/firewall/access_rules/rules` - List rules
- `POST /zones/:zone_id/firewall/access_rules/rules` - Create rule
- `DELETE /zones/:zone_id/firewall/access_rules/rules/:id` - Delete rule

---

## 7. Load Balancers

### Load Balancers
- `GET /zones/:zone_id/load_balancers` - List load balancers
- `POST /zones/:zone_id/load_balancers` - Create load balancer
- `GET /zones/:zone_id/load_balancers/:id` - Get load balancer
- `PATCH /zones/:zone_id/load_balancers/:id` - Update load balancer
- `DELETE /zones/:zone_id/load_balancers/:id` - Delete load balancer

### Pools
- `GET /accounts/:account_id/load_balancers/pools` - List pools
- `POST /accounts/:account_id/load_balancers/pools` - Create pool
- `PATCH /accounts/:account_id/load_balancers/pools/:id` - Update pool
- `DELETE /accounts/:account_id/load_balancers/pools/:id` - Delete pool

### Monitors
- `GET /accounts/:account_id/load_balancers/monitors` - List monitors
- `POST /accounts/:account_id/load_balancers/monitors` - Create monitor
- `PATCH /accounts/:account_id/load_balancers/monitors/:id` - Update monitor
- `DELETE /accounts/:account_id/load_balancers/monitors/:id` - Delete monitor

---

## 8. Media Services

### Stream (Video)
- `GET /accounts/:account_id/stream` - List videos
- `POST /accounts/:account_id/stream/copy` - Upload video via URL
- `POST /accounts/:account_id/stream/direct_upload` - Create direct upload URL
- `GET /accounts/:account_id/stream/:id` - Get video
- `DELETE /accounts/:account_id/stream/:id` - Delete video

### Images
- `GET /accounts/:account_id/images/v1` - List images
- `POST /accounts/:account_id/images/v1` - Upload image
- `GET /accounts/:account_id/images/v1/:id` - Get image
- `DELETE /accounts/:account_id/images/v1/:id` - Delete image
- `POST /accounts/:account_id/images/v1/variants` - Create variant

### Calls (WebRTC)
- `POST /accounts/:account_id/calls/apps` - Create Calls app
- `GET /accounts/:account_id/calls/apps` - List Calls apps

---

## 9. Observability

### Logpush
- `GET /zones/:zone_id/logpush/jobs` - List Logpush jobs
- `POST /zones/:zone_id/logpush/jobs` - Create Logpush job
- `GET /zones/:zone_id/logpush/jobs/:id` - Get job
- `PUT /zones/:zone_id/logpush/jobs/:id` - Update job
- `DELETE /zones/:zone_id/logpush/jobs/:id` - Delete job

**Destinations**: S3, Google Cloud Storage, Azure Blob, Sumo Logic, Datadog, Splunk, HTTP

### Logs (Instant Logs)
- `GET /zones/:zone_id/logs/received` - Get HTTP request logs (Enterprise)
- `GET /zones/:zone_id/logs/rayids/:ray_id` - Get logs by Ray ID

### Health Checks
- `GET /zones/:zone_id/healthchecks` - List health checks
- `POST /zones/:zone_id/healthchecks` - Create health check
- `PATCH /zones/:zone_id/healthchecks/:id` - Update health check
- `DELETE /zones/:zone_id/healthchecks/:id` - Delete health check

### Security Center
- `GET /accounts/:account_id/security_center/insights` - Get security insights
- `GET /accounts/:account_id/security_center/issues` - Get security issues

---

## 10. Radar (Internet Intelligence)

### Radar API
- `GET /radar/attacks/layer3/top/attacks` - Top DDoS attacks
- `GET /radar/attacks/layer7/top/attacks` - Top HTTP DDoS attacks
- `GET /radar/bgp/routes` - BGP route statistics
- `GET /radar/http/top/locations` - Top HTTP locations
- `GET /radar/dns/top/locations` - Top DNS locations
- `GET /radar/traffic/anomalies` - Traffic anomalies

**Note**: Radar API requires separate API key from Radar dashboard.

---

## 11. Rules & Rulesets

### Rulesets (new unified rules engine)
- `GET /zones/:zone_id/rulesets` - List rulesets
- `POST /zones/:zone_id/rulesets` - Create ruleset
- `GET /zones/:zone_id/rulesets/:id` - Get ruleset
- `PUT /zones/:zone_id/rulesets/:id` - Update ruleset
- `DELETE /zones/:zone_id/rulesets/:id` - Delete ruleset

**Ruleset types**: http_request_firewall_custom, http_request_firewall_managed, http_request_transform, http_response_headers_transform, http_request_origin, http_request_redirect

### Page Rules (legacy, use Rulesets for new implementations)
- `GET /zones/:zone_id/pagerules` - List page rules
- `POST /zones/:zone_id/pagerules` - Create page rule
- `PATCH /zones/:zone_id/pagerules/:id` - Update page rule
- `DELETE /zones/:zone_id/pagerules/:id` - Delete page rule

### Transform Rules
- `GET /zones/:zone_id/rulesets/phases/http_request_transform/entrypoint` - Get transform rules
- `PUT /zones/:zone_id/rulesets/phases/http_request_transform/entrypoint` - Update transform rules

### URL Normalization
- `GET /zones/:zone_id/url_normalization` - Get URL normalization settings
- `PUT /zones/:zone_id/url_normalization` - Update settings

---

## 12. Security

### Firewall Rules (legacy, use Rulesets for new implementations)
- `GET /zones/:zone_id/firewall/rules` - List firewall rules
- `POST /zones/:zone_id/firewall/rules` - Create firewall rule
- `PATCH /zones/:zone_id/firewall/rules/:id` - Update firewall rule
- `DELETE /zones/:zone_id/firewall/rules/:id` - Delete firewall rule

### Rate Limiting
- `GET /zones/:zone_id/rate_limits` - List rate limits
- `POST /zones/:zone_id/rate_limits` - Create rate limit
- `PUT /zones/:zone_id/rate_limits/:id` - Update rate limit
- `DELETE /zones/:zone_id/rate_limits/:id` - Delete rate limit

### WAF (Web Application Firewall)
- `GET /zones/:zone_id/firewall/waf/packages` - List WAF packages
- `GET /zones/:zone_id/firewall/waf/packages/:id/rules` - List WAF rules
- `PATCH /zones/:zone_id/firewall/waf/packages/:package_id/rules/:id` - Update WAF rule

### Bot Management
- `GET /zones/:zone_id/bot_management` - Get bot management config
- `PUT /zones/:zone_id/bot_management` - Update bot management

### API Shield (API Gateway)
- `GET /zones/:zone_id/api_gateway/operations` - List API operations
- `POST /zones/:zone_id/api_gateway/discovery` - Upload OpenAPI schema
- `GET /zones/:zone_id/api_gateway/user_schemas` - List schemas

### Page Shield (client-side security)
- `GET /zones/:zone_id/page_shield` - Get Page Shield settings
- `PUT /zones/:zone_id/page_shield` - Update settings
- `GET /zones/:zone_id/page_shield/scripts` - List detected scripts

---

## 13. Workers & Pages

### Workers
**Primary tool: Wrangler CLI** (see [wrangler-commands.md](wrangler-commands.md))

REST API (for automation):
- `GET /accounts/:account_id/workers/scripts` - List scripts
- `PUT /accounts/:account_id/workers/scripts/:name` - Upload script
- `GET /accounts/:account_id/workers/scripts/:name` - Get script
- `DELETE /accounts/:account_id/workers/scripts/:name` - Delete script

### Workers KV
- `GET /accounts/:account_id/storage/kv/namespaces` - List namespaces
- `POST /accounts/:account_id/storage/kv/namespaces` - Create namespace
- `GET /accounts/:account_id/storage/kv/namespaces/:id/keys` - List keys
- `GET /accounts/:account_id/storage/kv/namespaces/:id/values/:key` - Get value
- `PUT /accounts/:account_id/storage/kv/namespaces/:id/values/:key` - Set value
- `DELETE /accounts/:account_id/storage/kv/namespaces/:id/values/:key` - Delete value

### Workers R2 (S3-compatible object storage)
**Primary tool: Wrangler CLI** or S3-compatible SDKs

REST API (for bucket management):
- `GET /accounts/:account_id/r2/buckets` - List buckets
- `POST /accounts/:account_id/r2/buckets` - Create bucket
- `DELETE /accounts/:account_id/r2/buckets/:name` - Delete bucket

### Workers D1 (SQLite databases)
**Primary tool: Wrangler CLI**

REST API:
- `GET /accounts/:account_id/d1/database` - List databases
- `POST /accounts/:account_id/d1/database` - Create database
- `DELETE /accounts/:account_id/d1/database/:id` - Delete database
- `POST /accounts/:account_id/d1/database/:id/query` - Execute SQL

### Workers Queues
- `GET /accounts/:account_id/workers/queues` - List queues
- `POST /accounts/:account_id/workers/queues` - Create queue
- `DELETE /accounts/:account_id/workers/queues/:name` - Delete queue

### Durable Objects
- `GET /accounts/:account_id/workers/durable_objects/namespaces` - List namespaces
- `GET /accounts/:account_id/workers/durable_objects/namespaces/:id/objects` - List objects

### Pages
**Primary tool: Wrangler CLI**

REST API:
- `GET /accounts/:account_id/pages/projects` - List projects
- `POST /accounts/:account_id/pages/projects` - Create project
- `GET /accounts/:account_id/pages/projects/:name` - Get project
- `POST /accounts/:account_id/pages/projects/:name/deployments` - Create deployment

---

## 14. Zero Trust & Cloudflare One

### Zero Trust Access
- `GET /accounts/:account_id/access/apps` - List Access applications
- `POST /accounts/:account_id/access/apps` - Create application
- `GET /accounts/:account_id/access/apps/:id` - Get application
- `PUT /accounts/:account_id/access/apps/:id` - Update application
- `DELETE /accounts/:account_id/access/apps/:id` - Delete application

### Access Policies
- `GET /accounts/:account_id/access/apps/:app_id/policies` - List policies
- `POST /accounts/:account_id/access/apps/:app_id/policies` - Create policy
- `PUT /accounts/:account_id/access/apps/:app_id/policies/:id` - Update policy
- `DELETE /accounts/:account_id/access/apps/:app_id/policies/:id` - Delete policy

### Identity Providers
- `GET /accounts/:account_id/access/identity_providers` - List identity providers
- `POST /accounts/:account_id/access/identity_providers` - Add identity provider

### Tunnels (cloudflared)
**Primary tool: cloudflared CLI**

REST API:
- `GET /accounts/:account_id/cfd_tunnel` - List tunnels
- `POST /accounts/:account_id/cfd_tunnel` - Create tunnel
- `GET /accounts/:account_id/cfd_tunnel/:id` - Get tunnel
- `DELETE /accounts/:account_id/cfd_tunnel/:id` - Delete tunnel

### Gateway (DNS/HTTP filtering)
- `GET /accounts/:account_id/gateway/rules` - List Gateway rules
- `POST /accounts/:account_id/gateway/rules` - Create rule
- `PUT /accounts/:account_id/gateway/rules/:id` - Update rule
- `DELETE /accounts/:account_id/gateway/rules/:id` - Delete rule

---

## GraphQL Analytics API

Endpoint: `https://api.cloudflare.com/client/v4/graphql`

**Authentication**: Same as REST API (Bearer token)

**Example query**:
```graphql
query {
  viewer {
    zones(filter: {zoneTag: $zoneId}) {
      httpRequests1dGroups(limit: 10, filter: {date_gt: "2024-01-01"}) {
        sum {
          requests
          bytes
        }
        dimensions {
          date
        }
      }
    }
  }
}
```

**Common datasets**:
- `httpRequests1dGroups` - HTTP request analytics (1-day aggregation)
- `httpRequests1hGroups` - HTTP request analytics (1-hour aggregation)
- `firewallEventsAdaptiveGroups` - Firewall events
- `loadBalancingRequestsAdaptiveGroups` - Load balancer analytics

---

## Rate Limits Summary

| Scope | Limit | Window |
|-------|-------|--------|
| Client API per user/account token | 1,200 requests | 5 minutes |
| Client API per IP | 200 requests | 1 second |
| GraphQL API | 320 requests | 5 minutes |

**Headers**:
- `Ratelimit: limit=1200, remaining=1199, reset=1640000000`
- `Ratelimit-Policy: 1200;w=300`

**On rate limit exceeded**: HTTP 429 response, retry after 5 minutes.

---

## Additional Resources

- **API Documentation**: https://developers.cloudflare.com/api/
- **OpenAPI Schema**: https://github.com/cloudflare/api-schemas
- **GraphQL Explorer**: https://developers.cloudflare.com/analytics/graphql-api/
- **Postman Collection**: Available in Cloudflare Dashboard → API Tokens

---

## Quick Reference: Most Common APIs

| Task | Endpoint | Method |
|------|----------|--------|
| List zones | `/zones` | GET |
| List DNS records | `/zones/:zone_id/dns_records` | GET |
| Create DNS record | `/zones/:zone_id/dns_records` | POST |
| Update DNS record | `/zones/:zone_id/dns_records/:id` | PATCH |
| Get zone settings | `/zones/:zone_id/settings` | GET |
| Update SSL mode | `/zones/:zone_id/settings/ssl` | PATCH |
| List firewall rules | `/zones/:zone_id/firewall/rules` | GET |
| List Workers scripts | `/accounts/:account_id/workers/scripts` | GET |
| List KV namespaces | `/accounts/:account_id/storage/kv/namespaces` | GET |
| Purge cache | `/zones/:zone_id/purge_cache` | POST |
