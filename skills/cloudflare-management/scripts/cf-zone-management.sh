#!/usr/bin/env bash
#
# cf-zone-management.sh - Cloudflare DNS, SSL, and Zone management
#
# Usage:
#   bash cf-zone-management.sh <command> <subcommand> [args...]
#
# Commands:
#   zones list                                         - List all zones
#   zones create <domain>                              - Create a new zone
#   zones delete <zone>                                - Delete a zone
#
#   dns list <zone>                                    - List DNS records
#   dns get <zone> <record-id>                        - Get DNS record
#   dns create <zone> <type> <name> <content> [ttl] [proxied]  - Create DNS record
#   dns update <zone> <record-id> <type> <name> <content> [ttl] [proxied]  - Update DNS record
#   dns delete <zone> <record-id>                     - Delete DNS record
#   dns export <zone>                                  - Export all DNS records as JSON
#
#   ssl list <zone>                                    - List SSL certificates
#   ssl settings <zone>                                - Get SSL/TLS settings
#   ssl update <zone> <mode>                          - Update SSL mode (off, flexible, full, strict)
#
#   zone get <zone>                                    - Get zone details
#   zone settings <zone>                               - Get all zone settings
#   zone purge-cache <zone>                           - Purge entire cache
#
# Environment variables:
#   CLOUDFLARE_API_TOKEN (required) - API token
#   CLOUDFLARE_ZONE_ID (optional)   - Zone ID (can be auto-resolved from zone name)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CF_API="${SCRIPT_DIR}/cf-api.sh"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

if [[ ! -f "$CF_API" ]]; then
    echo -e "${RED}Error: cf-api.sh not found at $CF_API${NC}" >&2
    exit 1
fi

if [[ $# -lt 2 ]]; then
    echo -e "${RED}Usage: $0 <command> <subcommand> [args...]${NC}" >&2
    echo "" >&2
    echo "Commands:" >&2
    echo "  zones list" >&2
    echo "  zones create <domain>" >&2
    echo "  zones delete <zone>" >&2
    echo "  dns list <zone>" >&2
    echo "  dns create <zone> <type> <name> <content> [ttl] [proxied]" >&2
    echo "  ssl list <zone>" >&2
    echo "  ssl update <zone> <mode>" >&2
    echo "  zone get <zone>" >&2
    exit 1
fi

COMMAND="$1"
SUBCOMMAND="$2"
ZONE="${3:-}"

get_zone_id() {
    local zone_name="$1"
    
    if [[ -n "${CLOUDFLARE_ZONE_ID:-}" ]]; then
        echo "$CLOUDFLARE_ZONE_ID"
        return 0
    fi
    
    local response
    response=$(bash "$CF_API" GET "zones?name=${zone_name}" 2>/dev/null)
    
    local zone_id
    zone_id=$(echo "$response" | jq -r '.result[0].id // empty')
    
    if [[ -z "$zone_id" ]]; then
        echo -e "${RED}Error: Zone '$zone_name' not found${NC}" >&2
        return 1
    fi
    
    echo "$zone_id"
}

case "$COMMAND" in
    zones)
        case "$SUBCOMMAND" in
            list)
                bash "$CF_API" GET "zones"
                ;;
            
            create)
                DOMAIN="${3:-}"
                if [[ -z "$DOMAIN" ]]; then
                    echo -e "${RED}Error: domain required${NC}" >&2
                    exit 1
                fi
                DATA=$(jq -n --arg name "$DOMAIN" '{name: $name, jump_start: true}')
                bash "$CF_API" POST "zones" "$DATA"
                ;;
            
            delete)
                if [[ -z "$ZONE" ]]; then
                    echo -e "${RED}Error: zone name or ID required${NC}" >&2
                    exit 1
                fi
                if [[ "$ZONE" =~ ^[0-9a-f]{32}$ ]]; then
                    ZONE_ID="$ZONE"
                else
                    ZONE_ID=$(get_zone_id "$ZONE")
                fi
                echo -e "${YELLOW}Warning: This will permanently delete zone ${ZONE}${NC}" >&2
                bash "$CF_API" DELETE "zones/${ZONE_ID}"
                ;;
            
            *)
                echo -e "${RED}Error: Unknown zones subcommand '$SUBCOMMAND'${NC}" >&2
                exit 1
                ;;
        esac
        ;;
    
    dns)
        case "$SUBCOMMAND" in
            list)
                ZONE_ID=$(get_zone_id "$ZONE")
                bash "$CF_API" GET "zones/${ZONE_ID}/dns_records"
                ;;
            
            get)
                RECORD_ID="${4:-}"
                if [[ -z "$RECORD_ID" ]]; then
                    echo -e "${RED}Error: record-id required${NC}" >&2
                    exit 1
                fi
                ZONE_ID=$(get_zone_id "$ZONE")
                bash "$CF_API" GET "zones/${ZONE_ID}/dns_records/${RECORD_ID}"
                ;;
            
            create)
                TYPE="${4:-}"
                NAME="${5:-}"
                CONTENT="${6:-}"
                TTL="${7:-1}"
                PROXIED="${8:-false}"
                
                if [[ -z "$TYPE" || -z "$NAME" || -z "$CONTENT" ]]; then
                    echo -e "${RED}Error: type, name, and content required${NC}" >&2
                    exit 1
                fi
                
                ZONE_ID=$(get_zone_id "$ZONE")
                DATA=$(jq -n \
                    --arg type "$TYPE" \
                    --arg name "$NAME" \
                    --arg content "$CONTENT" \
                    --argjson ttl "$TTL" \
                    --argjson proxied "$PROXIED" \
                    '{type: $type, name: $name, content: $content, ttl: $ttl, proxied: $proxied}')
                
                bash "$CF_API" POST "zones/${ZONE_ID}/dns_records" "$DATA"
                ;;
            
            update)
                RECORD_ID="${4:-}"
                TYPE="${5:-}"
                NAME="${6:-}"
                CONTENT="${7:-}"
                TTL="${8:-1}"
                PROXIED="${9:-false}"
                
                if [[ -z "$RECORD_ID" || -z "$TYPE" || -z "$NAME" || -z "$CONTENT" ]]; then
                    echo -e "${RED}Error: record-id, type, name, and content required${NC}" >&2
                    exit 1
                fi
                
                ZONE_ID=$(get_zone_id "$ZONE")
                DATA=$(jq -n \
                    --arg type "$TYPE" \
                    --arg name "$NAME" \
                    --arg content "$CONTENT" \
                    --argjson ttl "$TTL" \
                    --argjson proxied "$PROXIED" \
                    '{type: $type, name: $name, content: $content, ttl: $ttl, proxied: $proxied}')
                
                bash "$CF_API" PATCH "zones/${ZONE_ID}/dns_records/${RECORD_ID}" "$DATA"
                ;;
            
            delete)
                RECORD_ID="${4:-}"
                if [[ -z "$RECORD_ID" ]]; then
                    echo -e "${RED}Error: record-id required${NC}" >&2
                    exit 1
                fi
                ZONE_ID=$(get_zone_id "$ZONE")
                bash "$CF_API" DELETE "zones/${ZONE_ID}/dns_records/${RECORD_ID}"
                ;;
            
            export)
                ZONE_ID=$(get_zone_id "$ZONE")
                bash "$CF_API" GET "zones/${ZONE_ID}/dns_records" | jq '.result'
                ;;
            
            *)
                echo -e "${RED}Error: Unknown dns subcommand '$SUBCOMMAND'${NC}" >&2
                exit 1
                ;;
        esac
        ;;
    
    ssl)
        case "$SUBCOMMAND" in
            list)
                ZONE_ID=$(get_zone_id "$ZONE")
                bash "$CF_API" GET "zones/${ZONE_ID}/ssl/certificate_packs"
                ;;
            
            settings)
                ZONE_ID=$(get_zone_id "$ZONE")
                bash "$CF_API" GET "zones/${ZONE_ID}/settings/ssl"
                ;;
            
            update)
                MODE="${4:-}"
                if [[ ! "$MODE" =~ ^(off|flexible|full|strict)$ ]]; then
                    echo -e "${RED}Error: mode must be off, flexible, full, or strict${NC}" >&2
                    exit 1
                fi
                ZONE_ID=$(get_zone_id "$ZONE")
                DATA=$(jq -n --arg value "$MODE" '{value: $value}')
                bash "$CF_API" PATCH "zones/${ZONE_ID}/settings/ssl" "$DATA"
                ;;
            
            *)
                echo -e "${RED}Error: Unknown ssl subcommand '$SUBCOMMAND'${NC}" >&2
                exit 1
                ;;
        esac
        ;;
    
    zone)
        case "$SUBCOMMAND" in
            get)
                ZONE_ID=$(get_zone_id "$ZONE")
                bash "$CF_API" GET "zones/${ZONE_ID}"
                ;;
            
            settings)
                ZONE_ID=$(get_zone_id "$ZONE")
                bash "$CF_API" GET "zones/${ZONE_ID}/settings"
                ;;
            
            purge-cache)
                ZONE_ID=$(get_zone_id "$ZONE")
                DATA='{"purge_everything":true}'
                bash "$CF_API" POST "zones/${ZONE_ID}/purge_cache" "$DATA"
                ;;
            
            *)
                echo -e "${RED}Error: Unknown zone subcommand '$SUBCOMMAND'${NC}" >&2
                exit 1
                ;;
        esac
        ;;
    
    *)
        echo -e "${RED}Error: Unknown command '$COMMAND'${NC}" >&2
        exit 1
        ;;
esac
