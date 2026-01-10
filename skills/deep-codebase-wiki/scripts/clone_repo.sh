#!/bin/bash
# Clone a GitHub repository for wiki analysis
# Usage: clone_repo.sh <owner/repo> [--depth N] [--branch NAME]

set -e

REPO_PATH=""
DEPTH=1
BRANCH="main"
WORKDIR="/tmp/wiki-analysis"

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --depth)
            DEPTH="$2"
            shift 2
            ;;
        --branch)
            BRANCH="$2"
            shift 2
            ;;
        *)
            if [[ -z "$REPO_PATH" ]]; then
                REPO_PATH="$1"
            fi
            shift
            ;;
    esac
done

if [[ -z "$REPO_PATH" ]]; then
    echo "Error: Repository path required (format: owner/repo)" >&2
    exit 1
fi

# Extract owner and repo
OWNER=$(echo "$REPO_PATH" | cut -d'/' -f1)
REPO=$(echo "$REPO_PATH" | cut -d'/' -f2)
DEST_DIR="$WORKDIR/${OWNER}-${REPO}"

# Create work directory
mkdir -p "$WORKDIR"

# Remove existing clone if present
if [[ -d "$DEST_DIR" ]]; then
    echo "Removing existing clone at $DEST_DIR"
    rm -rf "$DEST_DIR"
fi

# Clone repository
echo "Cloning https://github.com/${REPO_PATH}.git"
echo "Destination: $DEST_DIR"
echo "Depth: $DEPTH, Branch: $BRANCH"

if [[ "$DEPTH" -eq 1 ]]; then
    git clone --depth "$DEPTH" --branch "$BRANCH" --single-branch \
        "https://github.com/${REPO_PATH}.git" "$DEST_DIR"
else
    git clone --depth "$DEPTH" --branch "$BRANCH" \
        "https://github.com/${REPO_PATH}.git" "$DEST_DIR"
fi

# Get commit SHA
cd "$DEST_DIR"
COMMIT_SHA=$(git rev-parse HEAD)
COMMIT_DATE=$(git log -1 --format=%cd --date=iso)

echo ""
echo "✓ Clone successful"
echo "Location: $DEST_DIR"
echo "Commit: $COMMIT_SHA"
echo "Date: $COMMIT_DATE"
echo ""
echo "Export for use:"
echo "export WIKI_REPO_DIR=\"$DEST_DIR\""
echo "export WIKI_COMMIT_SHA=\"$COMMIT_SHA\""
