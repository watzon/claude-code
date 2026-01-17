# Skill Anatomy

Complete reference for skill file structure and format.

## Directory Structure

```
skill-name/
├── SKILL.md              # Required - entry point
├── scripts/              # Optional - executable code
│   ├── helper.py
│   └── setup.sh
├── references/           # Optional - documentation
│   ├── api.md
│   └── schema.md
└── assets/               # Optional - static resources
    ├── template.html
    └── logo.png
```

## SKILL.md Format

### Frontmatter (Required)

YAML frontmatter with exactly two fields:

```yaml
---
name: skill-name
description: |
  Use when [triggers]. Provides [functionality] for [use case].
---
```

#### name

- **Required**: Yes
- **Format**: Lowercase letters, numbers, hyphens only
- **Max length**: 64 characters
- **Must match**: Directory name containing SKILL.md

```yaml
# Valid
name: pdf-processing
name: condition-based-waiting
name: my-skill-2

# Invalid
name: PDF Processing     # No spaces/caps
name: skill_name         # No underscores
name: my.skill           # No dots
```

#### description

- **Required**: Yes
- **Max length**: 1024 characters
- **Purpose**: PRIMARY trigger mechanism for skill discovery

**Description must include**:
1. **Triggers**: Start with "Use when..." + specific scenarios
2. **Keywords**: Error messages, symptoms, tool names
3. **Value**: What the skill provides

```yaml
description: |
  Use when working with PDF files, filling forms, extracting text,
  or merging documents. Provides reliable patterns for pdfplumber
  and PyMuPDF with common gotchas documented.
```

### Optional Frontmatter Fields

Some systems support additional fields:

```yaml
---
name: my-skill
description: Use when...
allowed-tools: Read, Grep, Bash    # Tools Claude can use without asking
model: claude-sonnet-4-20250514        # Specific model to use
context: fork                      # Isolated sub-agent context
user-invocable: true               # Show in slash menu (default: true)
---
```

### Body (Required)

Markdown instructions following frontmatter.

**Target size**: <500 lines, ~1500-2000 words

**Structure pattern**:

```markdown
# Skill Name

One-line description of what this skill does.

## Overview

Core principle in 1-2 sentences. What problem does this solve?

## Quick Start

Minimal steps to use the skill immediately.

## [Main Content Sections]

Workflow, patterns, or reference material.

## Resources

Links to references/, scripts/, assets/ files.

## Common Mistakes

What goes wrong and how to fix it.
```

## scripts/ Directory

Executable code for deterministic, repeatable operations.

**When to use**:
- Same code gets rewritten repeatedly
- Operation needs deterministic reliability
- Complex multi-step process

**Execution**: Claude runs scripts with Bash tool without loading into context.

```python
# scripts/validate_form.py
#!/usr/bin/env python3
"""Validate PDF form fields against schema."""
import sys
import json

def validate(pdf_path, schema_path):
    # Implementation
    pass

if __name__ == "__main__":
    validate(sys.argv[1], sys.argv[2])
```

**Reference from SKILL.md**:

```markdown
## Validation

Run the validation script:
```bash
python3 scripts/validate_form.py input.pdf schema.json
```
```

## references/ Directory

Documentation loaded into context on-demand.

**When to use**:
- Detailed API documentation
- Database schemas
- Domain-specific knowledge
- Content >100 lines

**Key principles**:
- Keep one level deep from SKILL.md
- Include table of contents for long files (>100 lines)
- Reference explicitly from SKILL.md

```markdown
# references/api.md

## Table of Contents

- [Authentication](#authentication)
- [Endpoints](#endpoints)
- [Error Codes](#error-codes)

## Authentication
...
```

**Reference from SKILL.md**:

```markdown
For complete API documentation, see [references/api.md](references/api.md).
```

## assets/ Directory

Static files used in skill output, NOT loaded into context.

**When to use**:
- Templates (HTML, PPTX, DOCX)
- Images and icons
- Fonts
- Boilerplate code to copy

**Example usage**:

```markdown
## Creating Documents

Copy the template to start:
```bash
cp assets/template.docx output.docx
```
```

## Progressive Disclosure

Skills load in three levels to conserve context:

| Level | Content | Size Target | When Loaded |
|-------|---------|-------------|-------------|
| 1 | Frontmatter (name + description) | ~100 words | Always |
| 2 | SKILL.md body | <5k words | When triggered |
| 3 | references/, scripts/, assets/ | Unlimited | When explicitly needed |

**Design principle**: Most requests should be satisfied with Level 2. Level 3 only for deep dives.

## File Organization Patterns

### Pattern 1: Self-Contained Skill

```
simple-skill/
└── SKILL.md    # Everything inline
```

**When**: All content fits in <500 lines.

### Pattern 2: Skill with Tool

```
processing-skill/
├── SKILL.md           # Overview + usage
└── scripts/
    └── process.py     # Reusable tool
```

**When**: Script is deterministic and reusable.

### Pattern 3: Skill with Reference

```
api-skill/
├── SKILL.md           # Overview + common patterns
└── references/
    └── api-spec.md    # Complete API documentation
```

**When**: Reference material too large for inline.

### Pattern 4: Multi-Variant Skill

```
cloud-deploy/
├── SKILL.md           # Workflow + provider selection
└── references/
    ├── aws.md         # AWS-specific patterns
    ├── gcp.md         # GCP-specific patterns
    └── azure.md       # Azure-specific patterns
```

**When**: Multiple variants with shared workflow.

### Pattern 5: Complete Skill

```
document-processing/
├── SKILL.md
├── scripts/
│   ├── extract.py
│   └── validate.py
├── references/
│   ├── format-spec.md
│   └── best-practices.md
└── assets/
    └── template.docx
```

**When**: Complex domain requiring all resource types.

## Validation Checklist

- [ ] SKILL.md exists at skill root
- [ ] Frontmatter has `name` and `description`
- [ ] `name` matches directory name
- [ ] `name` uses only lowercase, numbers, hyphens
- [ ] `description` starts with "Use when..."
- [ ] `description` < 1024 characters
- [ ] Body < 500 lines
- [ ] references/ files linked from SKILL.md
- [ ] No deeply nested references (keep one level)
- [ ] Scripts are executable and tested
