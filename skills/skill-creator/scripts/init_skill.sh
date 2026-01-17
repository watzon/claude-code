#!/bin/bash
#
# Initialize a new skill with proper directory structure.
#
# Usage:
#   init_skill.sh <skill-name> [output-directory]
#
# Examples:
#   init_skill.sh my-skill                     # Creates in current directory
#   init_skill.sh my-skill ~/.claude/skills    # Creates in specified directory
#   init_skill.sh pdf-processing ./skills      # Creates ./skills/pdf-processing/
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Validation functions
validate_name() {
    local name="$1"
    
    # Check for empty name
    if [[ -z "$name" ]]; then
        echo -e "${RED}Error: Skill name cannot be empty${NC}"
        return 1
    fi
    
    # Check length (max 64 chars)
    if [[ ${#name} -gt 64 ]]; then
        echo -e "${RED}Error: Skill name must be 64 characters or less${NC}"
        return 1
    fi
    
    # Check format (lowercase, numbers, hyphens only)
    if [[ ! "$name" =~ ^[a-z0-9-]+$ ]]; then
        echo -e "${RED}Error: Skill name must contain only lowercase letters, numbers, and hyphens${NC}"
        echo -e "${YELLOW}Invalid: $name${NC}"
        echo -e "${GREEN}Valid examples: my-skill, pdf-processor, test-helper-2${NC}"
        return 1
    fi
    
    # Check doesn't start or end with hyphen
    if [[ "$name" =~ ^- ]] || [[ "$name" =~ -$ ]]; then
        echo -e "${RED}Error: Skill name cannot start or end with a hyphen${NC}"
        return 1
    fi
    
    return 0
}

# Show usage
usage() {
    echo "Usage: $0 <skill-name> [output-directory]"
    echo ""
    echo "Arguments:"
    echo "  skill-name        Name of the skill (lowercase, hyphens, numbers only)"
    echo "  output-directory  Where to create the skill (default: current directory)"
    echo ""
    echo "Examples:"
    echo "  $0 my-skill"
    echo "  $0 my-skill ~/.claude/skills"
    echo "  $0 pdf-processing ./skills"
}

# Main
main() {
    local skill_name="$1"
    local output_dir="${2:-.}"
    
    # Check arguments
    if [[ -z "$skill_name" ]]; then
        usage
        exit 1
    fi
    
    # Validate skill name
    if ! validate_name "$skill_name"; then
        exit 1
    fi
    
    # Resolve output directory
    output_dir=$(realpath "$output_dir" 2>/dev/null || echo "$output_dir")
    local skill_dir="$output_dir/$skill_name"
    
    # Check if skill already exists
    if [[ -d "$skill_dir" ]]; then
        echo -e "${RED}Error: Skill directory already exists: $skill_dir${NC}"
        exit 1
    fi
    
    # Create directory structure
    echo -e "${GREEN}Creating skill: $skill_name${NC}"
    mkdir -p "$skill_dir"/{scripts,references,assets}
    
    # Create SKILL.md
    cat > "$skill_dir/SKILL.md" << EOF
---
name: $skill_name
description: |
  Use when [specific triggers and symptoms].
  Provides [what it does] for [use case].
---

# ${skill_name//-/ }

One-line description of what this skill does.

## Overview

Core principle in 1-2 sentences. What problem does this solve?

## Quick Start

Minimal steps to use the skill immediately.

## [Main Content Sections]

Add your workflow, patterns, or reference material here.

## Resources

- [references/](references/) - Detailed documentation
- [scripts/](scripts/) - Executable tools
- [assets/](assets/) - Templates and static files

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Example mistake | How to fix it |
EOF

    # Create placeholder files
    cat > "$skill_dir/references/.gitkeep" << EOF
# References Directory

Place detailed documentation here that would bloat SKILL.md.

Examples:
- API documentation
- Schema definitions  
- Extended guides

Remember to link these from SKILL.md:
  See [references/api.md](references/api.md) for details.
EOF

    cat > "$skill_dir/scripts/.gitkeep" << EOF
# Scripts Directory

Place executable scripts here for deterministic operations.

Scripts should:
- Be self-contained
- Include usage documentation
- Handle errors gracefully

Reference from SKILL.md:
  Run \`python3 scripts/process.py input.pdf\`
EOF

    cat > "$skill_dir/assets/.gitkeep" << EOF
# Assets Directory

Place static resources here:
- Templates (HTML, DOCX, PPTX)
- Images and icons
- Sample files for testing

These are NOT loaded into context, but copied/used in output.
EOF

    # Success message
    echo -e "${GREEN}Created skill at: $skill_dir${NC}"
    echo ""
    echo "Directory structure:"
    echo "  $skill_dir/"
    echo "  ├── SKILL.md"
    echo "  ├── scripts/"
    echo "  ├── references/"
    echo "  └── assets/"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "  1. Edit SKILL.md - fill in frontmatter and instructions"
    echo "  2. Add scripts/ if you need executable tools"
    echo "  3. Add references/ for detailed documentation"
    echo "  4. Test the skill in a real scenario"
}

main "$@"
