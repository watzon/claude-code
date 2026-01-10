#!/bin/bash
set -e

WIKI_PATH="$1"

if [[ -z "$WIKI_PATH" ]]; then
    echo "Usage: $0 <wiki-path>" >&2
    exit 1
fi

if [[ ! -d "$WIKI_PATH" ]]; then
    echo "Error: Wiki path does not exist: $WIKI_PATH" >&2
    exit 1
fi

ERRORS=0
WARNINGS=0

check_file() {
    local file="$1"
    local level="${2:-error}"
    
    if [[ ! -f "$WIKI_PATH/$file" ]]; then
        if [[ "$level" == "error" ]]; then
            echo "❌ ERROR: Missing required file: $file"
            ((ERRORS++))
        else
            echo "⚠️  WARNING: Missing recommended file: $file"
            ((WARNINGS++))
        fi
        return 1
    fi
    return 0
}

check_dir() {
    local dir="$1"
    local level="${2:-warning}"
    
    if [[ ! -d "$WIKI_PATH/$dir" ]]; then
        if [[ "$level" == "error" ]]; then
            echo "❌ ERROR: Missing required directory: $dir"
            ((ERRORS++))
        else
            echo "⚠️  WARNING: Missing recommended directory: $dir"
            ((WARNINGS++))
        fi
        return 1
    fi
    return 0
}

check_yaml_field() {
    local field="$1"
    
    if ! grep -q "^${field}:" "$WIKI_PATH/metadata.yaml" 2>/dev/null; then
        echo "❌ ERROR: Missing metadata field: $field"
        ((ERRORS++))
        return 1
    fi
    return 0
}

echo "Validating wiki: $WIKI_PATH"
echo ""

check_file "metadata.yaml" "error"
check_file "overview.md" "error"

check_dir "systems" "warning"
check_dir "components" "warning"
check_dir "traces" "warning"

if [[ -f "$WIKI_PATH/metadata.yaml" ]]; then
    check_yaml_field "repository"
    check_yaml_field "analyzed_at"
    check_yaml_field "commit_sha"
    check_yaml_field "scope"
fi

if [[ -f "$WIKI_PATH/overview.md" ]]; then
    word_count=$(wc -w < "$WIKI_PATH/overview.md")
    if [[ $word_count -lt 50 ]]; then
        echo "⚠️  WARNING: overview.md seems very short ($word_count words)"
        ((WARNINGS++))
    fi
fi

echo ""
if [[ $ERRORS -eq 0 && $WARNINGS -eq 0 ]]; then
    echo "✓ Wiki validation passed!"
    exit 0
elif [[ $ERRORS -eq 0 ]]; then
    echo "✓ Wiki validation passed with $WARNINGS warning(s)"
    exit 0
else
    echo "✗ Wiki validation failed with $ERRORS error(s) and $WARNINGS warning(s)"
    exit 1
fi
