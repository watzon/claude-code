#!/bin/bash
set -e

WIKI_PATH="$1"
BRANCH="${2:-main}"

if [[ -z "$WIKI_PATH" ]]; then
    echo "Usage: $0 <wiki-path> [branch]" >&2
    exit 1
fi

if [[ ! -f "$WIKI_PATH/metadata.yaml" ]]; then
    echo "Error: No metadata.yaml found in $WIKI_PATH" >&2
    exit 1
fi

REPO=$(grep "^repository:" "$WIKI_PATH/metadata.yaml" | cut -d' ' -f2)
OLD_SHA=$(grep "^commit_sha:" "$WIKI_PATH/metadata.yaml" | cut -d' ' -f2)
ANALYZED_AT=$(grep "^analyzed_at:" "$WIKI_PATH/metadata.yaml" | cut -d' ' -f2-)

TEMP_DIR="/tmp/wiki-update-check"
REPO_NAME="${REPO//\//-}"
REPO_DIR="$TEMP_DIR/$REPO_NAME"

mkdir -p "$TEMP_DIR"

if [[ -d "$REPO_DIR" ]]; then
    cd "$REPO_DIR"
    git fetch origin "$BRANCH" --quiet
    git reset --hard "origin/$BRANCH" --quiet
else
    git clone --depth 50 --branch "$BRANCH" "https://github.com/${REPO}.git" "$REPO_DIR" --quiet
    cd "$REPO_DIR"
fi

NEW_SHA=$(git rev-parse HEAD)

if [[ "$OLD_SHA" == "$NEW_SHA" ]]; then
    echo "Wiki: $(basename "$WIKI_PATH")"
    echo "Repository: $REPO"
    echo "Status: UP TO DATE"
    echo "Commit: $OLD_SHA"
    exit 0
fi

STATS=$(git diff --shortstat "$OLD_SHA" "$NEW_SHA" 2>/dev/null || echo "0 files changed")
FILES_CHANGED=$(echo "$STATS" | grep -o "[0-9]* file" | cut -d' ' -f1)
FILES_CHANGED=${FILES_CHANGED:-0}

TOTAL_FILES=$(git ls-files | wc -l)
CHANGE_PCT=$(awk "BEGIN {printf \"%.1f\", ($FILES_CHANGED / $TOTAL_FILES) * 100}")

NOW=$(date -u +%s)
ANALYZED_TS=$(date -u -j -f "%Y-%m-%dT%H:%M:%SZ" "$ANALYZED_AT" +%s 2>/dev/null || echo "$NOW")
AGE_DAYS=$(( (NOW - ANALYZED_TS) / 86400 ))

echo "Wiki: $(basename "$WIKI_PATH")"
echo "Repository: $REPO"
echo "Analyzed: $ANALYZED_AT ($AGE_DAYS days ago)"
echo "Commit: ${OLD_SHA:0:8} → ${NEW_SHA:0:8}"
echo ""
echo "Changes:"
echo "  Files changed: $FILES_CHANGED / $TOTAL_FILES ($CHANGE_PCT%)"
echo "  $STATS"
echo ""

RECOMMENDATION="up_to_date"
REASONS=()

if [[ $AGE_DAYS -gt 90 ]]; then
    REASONS+=("Wiki is $AGE_DAYS days old (>90 days)")
fi

if (( $(echo "$CHANGE_PCT > 30" | bc -l) )); then
    REASONS+=("$CHANGE_PCT% of files changed (>30%)")
fi

if [[ $FILES_CHANGED -gt 100 ]]; then
    REASONS+=("$FILES_CHANGED files changed (>100)")
fi

if [[ ${#REASONS[@]} -ge 2 ]] || (( $(echo "$CHANGE_PCT > 50" | bc -l) )); then
    RECOMMENDATION="full_reanalysis"
elif [[ ${#REASONS[@]} -ge 1 ]] || [[ $FILES_CHANGED -gt 10 ]]; then
    RECOMMENDATION="partial_update"
fi

echo "Recommendation: ${RECOMMENDATION^^}"
if [[ ${#REASONS[@]} -gt 0 ]]; then
    echo "Reasons:"
    for reason in "${REASONS[@]}"; do
        echo "  • $reason"
    done
fi
