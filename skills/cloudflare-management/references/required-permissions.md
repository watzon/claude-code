# Required API Token Permissions

Complete list of permissions needed for **ALL** functionality in this skill.

## Comprehensive Permissions (Recommended)

For **complete coverage** of Wrangler CLI + all scripts + all advanced features:

### Account-Level Permissions
- ✅ Workers Scripts → **Edit**
- ✅ Workers KV Storage → **Edit**
- ✅ Workers R2 Storage → **Edit**
- ✅ D1 → **Edit**
- ✅ Cloudflare Pages → **Edit**
- ✅ Durable Objects → **Edit**
- ✅ Workers Tail → **Read** (for log streaming)
- ✅ Account Analytics → **Read**
- ✅ Account Settings → **Read**
- ✅ Load Balancers → **Edit**
- ✅ Access: Apps and Policies → **Edit** (Zero Trust)
- ✅ Cloudflare Tunnel → **Edit**
- ✅ Account Firewall Access Rules → **Edit**

### Zone-Level Permissions
- ✅ Zone → **Edit** (not just Read - for zone settings)
- ✅ DNS → **Edit**
- ✅ SSL and Certificates → **Edit**
- ✅ Zone Settings → **Edit**
- ✅ Firewall Services → **Edit**
- ✅ Zone WAF → **Edit**
- ✅ Page Rules → **Edit**
- ✅ Cache Purge → **Purge**
- ✅ Workers Routes → **Edit**
- ✅ Analytics → **Read**
- ✅ Logs → **Edit** (Logpush)
- ✅ Bot Management → **Edit**

---

## Create Token (Step-by-Step)

1. **Go to**: https://dash.cloudflare.com/profile/api-tokens
2. **Click**: "Create Token"
3. **Click**: "Create Custom Token"
4. **Add Permissions**:

   **Account permissions**:
   ```
   Account | Workers Scripts                    | Edit
   Account | Workers KV Storage                 | Edit
   Account | Workers R2 Storage                 | Edit
   Account | D1                                 | Edit
   Account | Cloudflare Pages                   | Edit
   Account | Durable Objects                    | Edit
   Account | Workers Tail                       | Read
   Account | Account Analytics                  | Read
   Account | Account Settings                   | Read
   Account | Load Balancers                     | Edit
   Account | Access: Apps and Policies          | Edit
   Account | Cloudflare Tunnel                  | Edit
   Account | Account Firewall Access Rules      | Edit
   ```

   **Zone permissions**:
   ```
   Zone | Zone                               | Edit
   Zone | DNS                                | Edit
   Zone | SSL and Certificates               | Edit
   Zone | Zone Settings                      | Edit
   Zone | Firewall Services                  | Edit
   Zone | Zone WAF                           | Edit
   Zone | Page Rules                         | Edit
   Zone | Cache Purge                        | Purge
   Zone | Workers Routes                     | Edit
   Zone | Analytics                          | Read
   Zone | Logs                               | Edit
   Zone | Bot Management                     | Edit
   ```

5. **Zone Resources**:
   - **Option A**: Include → All zones (easiest)
   - **Option B**: Include → Specific zone (e.g., example.com)

6. **Client IP Address Filtering** (optional but recommended):
   - Add your CI/CD IP ranges for security

7. **TTL** (optional):
   - Leave blank for no expiration
   - Or set expiration date (e.g., 90 days)

8. **Click**: "Continue to summary"
9. **Click**: "Create Token"
10. **Copy token** (shown only once!)

---

## Template: Custom Token for This Skill

Use this exact configuration when creating your token:

**Token Name**: `cloudflare-management-skill`

**Permissions**:
| Resource | Scope | Permission |
|----------|-------|------------|
| Account | Workers Scripts | Edit |
| Account | Workers KV Storage | Edit |
| Account | Workers R2 Storage | Edit |
| Account | D1 | Edit |
| Account | Cloudflare Pages | Edit |
| Account | Durable Objects | Edit |
| Account | Workers Tail | Read |
| Account | Account Analytics | Read |
| Account | Account Settings | Read |
| Account | Load Balancers | Edit |
| Account | Access: Apps and Policies | Edit |
| Account | Cloudflare Tunnel | Edit |
| Account | Account Firewall Access Rules | Edit |
| Zone | Zone | Edit |
| Zone | DNS | Edit |
| Zone | SSL and Certificates | Edit |
| Zone | Zone Settings | Edit |
| Zone | Firewall Services | Edit |
| Zone | Zone WAF | Edit |
| Zone | Page Rules | Edit |
| Zone | Cache Purge | Purge |
| Zone | Workers Routes | Edit |
| Zone | Analytics | Read |
| Zone | Logs | Edit |
| Zone | Bot Management | Edit |

**Zone Resources**: All zones (or specific zones you manage)

**Client IP Address Filtering**: Your IP / CI/CD IPs (recommended)

**TTL**: 90 days (recommended for rotation)

---

## Verify Token Permissions

After creating your token, verify it has the correct permissions:

```bash
# Set token
export CLOUDFLARE_API_TOKEN="your_token_here"

# Verify token is valid
curl -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" | jq

# Test account access
wrangler whoami

# Test zone access
bash scripts/cf-api.sh GET zones
```

**Expected output**:
- `"status": "active"` from verify endpoint
- Account details from `wrangler whoami`
- List of zones from API call

---

## Troubleshooting

### Error: "Insufficient permissions"

**Cause**: Token lacks required permission for the operation.

**Fix**: 
1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Edit your token
3. Add the missing permission (check error message for which one)
4. Update `CLOUDFLARE_API_TOKEN` environment variable

### Error: "Authentication error"

**Cause**: Token is invalid, expired, or revoked.

**Fix**:
1. Verify token: `curl -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"`
2. If invalid, create a new token with the permissions above
3. Update environment variable

### Error: "Zone not found"

**Cause**: Token doesn't have access to the specified zone.

**Fix**:
1. Edit token
2. Under "Zone Resources", add the specific zone or select "All zones"

---

## Security Best Practices

1. **Principle of Least Privilege**: Only grant permissions you need
2. **Use Separate Tokens**: Different tokens for dev/staging/production
3. **Rotate Regularly**: Create new tokens every 90 days
4. **IP Filtering**: Restrict to known IPs/CI/CD ranges
5. **Never Commit**: Store in environment variables or CI/CD secrets
6. **Monitor Usage**: Check audit logs for suspicious activity

---

## CI/CD Token Example

For GitHub Actions, GitLab CI, etc.:

**Permissions** (same as above)

**Additional Settings**:
- **Client IP Address Filtering**: Add your CI/CD provider's IP ranges
- **TTL**: 90 days (with calendar reminder to rotate)

**Store as secret**:
- GitHub: Repository Settings → Secrets → Actions → `CLOUDFLARE_API_TOKEN`
- GitLab: Project Settings → CI/CD → Variables → `CLOUDFLARE_API_TOKEN` (masked, protected)
- CircleCI: Project Settings → Environment Variables → `CLOUDFLARE_API_TOKEN`

---

## Quick Copy-Paste for Token Creation

When creating the token, use this exact permission list for **comprehensive coverage**:

```
Account Permissions:
- Workers Scripts: Edit
- Workers KV Storage: Edit
- Workers R2 Storage: Edit
- D1: Edit
- Cloudflare Pages: Edit
- Durable Objects: Edit
- Workers Tail: Read
- Account Analytics: Read
- Account Settings: Read
- Load Balancers: Edit
- Access: Apps and Policies: Edit
- Cloudflare Tunnel: Edit
- Account Firewall Access Rules: Edit

Zone Permissions:
- Zone: Edit
- DNS: Edit
- SSL and Certificates: Edit
- Zone Settings: Edit
- Firewall Services: Edit
- Zone WAF: Edit
- Page Rules: Edit
- Cache Purge: Purge
- Workers Routes: Edit
- Analytics: Read
- Logs: Edit
- Bot Management: Edit

Zone Resources: All zones
```
