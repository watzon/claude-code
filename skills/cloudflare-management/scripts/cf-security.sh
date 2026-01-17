#!/usr/bin/env bash
#
# cf-security.sh - Cloudflare security management (WAF, Firewall, Rate Limiting)
#
# Usage:
#   bash cf-security.sh <command> <subcommand> <zone> [args...]
#
# Commands:
#   firewall list <zone>                              - List firewall rules
#   firewall get <zone> <rule-id>                    - Get firewall rule
#   firewall create <zone> <expression> <action>     - Create firewall rule
#   firewall delete <zone> <rule-id>                 - Delete firewall rule
#
#   ratelimit list <zone>                            - List rate limit rules
#   ratelimit create <zone> <path> <threshold>      - Create rate limit rule
#   ratelimit delete <zone> <rule-id>                - Delete rate limit rule
#
#   waf list <zone>                                   - List WAF packages
#   waf rules <zone> <package-id>                    - List WAF rules in package
#   waf update <zone> <package-id> <rule-id> <mode> - Update WAF rule mode
#
#   bot get <zone>                                    - Get bot management settings
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
    echo -e "${RED}Usage: $0 <command> <subcommand> <zone> [args...]${NC}" >&2
    echo "" >&2
    echo "Commands:" >&2
    echo "  firewall list <zone>" >&2
    echo "  ratelimit list <zone>" >&2
    echo "  waf list <zone>" >&2
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
    firewall)
        case "$SUBCOMMAND" in
            list)
                ZONE_ID=$(get_zone_id "$ZONE")
                bash "$CF_API" GET "zones/${ZONE_ID}/firewall/rules"
                ;;
            
            get)
                RULE_ID="${4:-}"
                if [[ -z "$RULE_ID" ]]; then
                    echo -e "${RED}Error: rule-id required${NC}" >&2
                    exit 1
                fi
                ZONE_ID=$(get_zone_id "$ZONE")
                bash "$CF_API" GET "zones/${ZONE_ID}/firewall/rules/${RULE_ID}"
                ;;
            
            create)
                EXPRESSION="${4:-}"
                ACTION="${5:-}"
                
                if [[ -z "$EXPRESSION" || -z "$ACTION" ]]; then
                    echo -e "${RED}Error: expression and action required${NC}" >&2
                    exit 1
                fi
                
                if [[ ! "$ACTION" =~ ^(block|challenge|js_challenge|managed_challenge|allow|log|bypass)$ ]]; then
                    echo -e "${RED}Error: action must be block, challenge, js_challenge, managed_challenge, allow, log, or bypass${NC}" >&2
                    exit 1
                fi
                
                ZONE_ID=$(get_zone_id "$ZONE")
                DATA=$(jq -n \
                    --arg expression "$EXPRESSION" \
                    --arg action "$ACTION" \
                    '[{action: $action, expression: $expression}]')
                
                bash "$CF_API" POST "zones/${ZONE_ID}/firewall/rules" "$DATA"
                ;;
            
            delete)
                RULE_ID="${4:-}"
                if [[ -z "$RULE_ID" ]]; then
                    echo -e "${RED}Error: rule-id required${NC}" >&2
                    exit 1
                fi
                ZONE_ID=$(get_zone_id "$ZONE")
                bash "$CF_API" DELETE "zones/${ZONE_ID}/firewall/rules/${RULE_ID}"
                ;;
            
            export)
                ZONE_ID=$(get_zone_id "$ZONE")
                bash "$CF_API" GET "zones/${ZONE_ID}/firewall/rules" | jq '.result'
                ;;
            
            *)
                echo -e "${RED}Error: Unknown firewall subcommand '$SUBCOMMAND'${NC}" >&2
                exit 1
                ;;
        esac
        ;;
    
    ratelimit)
        case "$SUBCOMMAND" in
            list)
                ZONE_ID=$(get_zone_id "$ZONE")
                bash "$CF_API" GET "zones/${ZONE_ID}/rate_limits"
                ;;
            
            create)
                PATH_PATTERN="${4:-}"
                THRESHOLD="${5:-100}"
                
                if [[ -z "$PATH_PATTERN" ]]; then
                    echo -e "${RED}Error: path pattern required${NC}" >&2
                    exit 1
                fi
                
                ZONE_ID=$(get_zone_id "$ZONE")
                DATA=$(jq -n \
                    --arg url "$PATH_PATTERN" \
                    --argjson threshold "$THRESHOLD" \
                    '{
                        match: {
                            request: {
                                url: $url
                            }
                        },
                        threshold: $threshold,
                        period: 60,
                        action: {
                            mode: "ban",
                            timeout: 600
                        }
                    }')
                
                bash "$CF_API" POST "zones/${ZONE_ID}/rate_limits" "$DATA"
                ;;
            
            delete)
                RULE_ID="${4:-}"
                if [[ -z "$RULE_ID" ]]; then
                    echo -e "${RED}Error: rule-id required${NC}" >&2
                    exit 1
                fi
                ZONE_ID=$(get_zone_id "$ZONE")
                bash "$CF_API" DELETE "zones/${ZONE_ID}/rate_limits/${RULE_ID}"
                ;;
            
            *)
                echo -e "${RED}Error: Unknown ratelimit subcommand '$SUBCOMMAND'${NC}" >&2
                exit 1
                ;;
        esac
        ;;
    
    waf)
        case "$SUBCOMMAND" in
            list)
                ZONE_ID=$(get_zone_id "$ZONE")
                bash "$CF_API" GET "zones/${ZONE_ID}/firewall/waf/packages"
                ;;
            
            rules)
                PACKAGE_ID="${4:-}"
                if [[ -z "$PACKAGE_ID" ]]; then
                    echo -e "${RED}Error: package-id required${NC}" >&2
                    exit 1
                fi
                ZONE_ID=$(get_zone_id "$ZONE")
                bash "$CF_API" GET "zones/${ZONE_ID}/firewall/waf/packages/${PACKAGE_ID}/rules"
                ;;
            
            update)
                PACKAGE_ID="${4:-}"
                RULE_ID="${5:-}"
                MODE="${6:-}"
                
                if [[ -z "$PACKAGE_ID" || -z "$RULE_ID" || -z "$MODE" ]]; then
                    echo -e "${RED}Error: package-id, rule-id, and mode required${NC}" >&2
                    exit 1
                fi
                
                if [[ ! "$MODE" =~ ^(on|off|default|disable|simulate|block|challenge)$ ]]; then
                    echo -e "${RED}Error: mode must be on, off, default, disable, simulate, block, or challenge${NC}" >&2
                    exit 1
                fi
                
                ZONE_ID=$(get_zone_id "$ZONE")
                DATA=$(jq -n --arg mode "$MODE" '{mode: $mode}')
                bash "$CF_API" PATCH "zones/${ZONE_ID}/firewall/waf/packages/${PACKAGE_ID}/rules/${RULE_ID}" "$DATA"
                ;;
            
            *)
                echo -e "${RED}Error: Unknown waf subcommand '$SUBCOMMAND'${NC}" >&2
                exit 1
                ;;
        esac
        ;;
    
    bot)
        case "$SUBCOMMAND" in
            get)
                ZONE_ID=$(get_zone_id "$ZONE")
                bash "$CF_API" GET "zones/${ZONE_ID}/bot_management"
                ;;
            
            update)
                FIGHT_MODE="${4:-}"
                if [[ ! "$FIGHT_MODE" =~ ^(true|false)$ ]]; then
                    echo -e "${RED}Error: fight-mode must be true or false${NC}" >&2
                    exit 1
                fi
                ZONE_ID=$(get_zone_id "$ZONE")
                DATA=$(jq -n --argjson fight_mode "$FIGHT_MODE" '{fight_mode: $fight_mode}')
                bash "$CF_API" PUT "zones/${ZONE_ID}/bot_management" "$DATA"
                ;;
            
            *)
                echo -e "${RED}Error: Unknown bot subcommand '$SUBCOMMAND'${NC}" >&2
                exit 1
                ;;
        esac
        ;;
    
    *)
        echo -e "${RED}Error: Unknown command '$COMMAND'${NC}" >&2
        exit 1
        ;;
esac
