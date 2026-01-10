#!/bin/bash
set -e

WIKIS_DIR="${HOME}/.claude/wikis"
INDEX_FILE="${WIKIS_DIR}/index.json"

init_index() {
    mkdir -p "$WIKIS_DIR"
    if [[ ! -f "$INDEX_FILE" ]]; then
        echo '{"wikis":[]}' > "$INDEX_FILE"
    fi
}

list_wikis() {
    init_index
    jq -r '.wikis[] | "\(.name) - \(.repository) (analyzed: \(.analyzed_at))"' "$INDEX_FILE"
}

search_by_repo() {
    local repo="$1"
    init_index
    jq -r --arg repo "$repo" '.wikis[] | select(.repository == $repo or .name == $repo) | .path' "$INDEX_FILE"
}

search_by_query() {
    local query="$1"
    init_index
    jq -r --arg q "$query" '.wikis[] | select(.repository | contains($q)) | "\(.name) - \(.repository) - \(.path)"' "$INDEX_FILE"
}

add_wiki() {
    local name="$1"
    local repo="$2"
    local path="$3"
    local commit_sha="$4"
    local analyzed_at="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
    
    init_index
    
    local entry=$(jq -n \
        --arg name "$name" \
        --arg repo "$repo" \
        --arg path "$path" \
        --arg sha "$commit_sha" \
        --arg date "$analyzed_at" \
        '{name: $name, repository: $repo, path: $path, commit_sha: $sha, analyzed_at: $date}')
    
    jq --argjson entry "$entry" '.wikis += [$entry]' "$INDEX_FILE" > "${INDEX_FILE}.tmp"
    mv "${INDEX_FILE}.tmp" "$INDEX_FILE"
    
    echo "Added wiki: $name ($repo)"
}

case "${1:-}" in
    --list)
        list_wikis
        ;;
    --repo)
        search_by_repo "$2"
        ;;
    --query)
        search_by_query "$2"
        ;;
    --add)
        add_wiki "$2" "$3" "$4" "$5"
        ;;
    *)
        echo "Usage:"
        echo "  $0 --list                           List all wikis"
        echo "  $0 --repo <owner/repo>              Find wiki by repository"
        echo "  $0 --query <search>                 Search wikis by keyword"
        echo "  $0 --add <name> <repo> <path> <sha> Add wiki to index"
        exit 1
        ;;
esac
