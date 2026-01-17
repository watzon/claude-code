# Skill Best Practices

Guidelines from Anthropic and proven patterns for effective skills.

## Table of Contents

- [Core Principles](#core-principles)
- [Context Window Management](#context-window-management)
- [Description Optimization](#description-optimization)
- [Progressive Disclosure](#progressive-disclosure)
- [Writing Style](#writing-style)
- [Testing Skills](#testing-skills)
- [Anti-Patterns](#anti-patterns)

## Core Principles

### Concise is Key

The context window is shared by everything: system prompt, conversation history, other skills, user request. Every token has a cost.

**Default assumption**: Claude is already smart. Only add context Claude doesn't have.

**Challenge each piece**: "Does Claude need this?" and "Does this justify its token cost?"

### Set Appropriate Freedom

Match specificity to task fragility:

| Freedom Level | When to Use | Example |
|--------------|-------------|---------|
| **High** (text instructions) | Multiple approaches valid | Design decisions, heuristics |
| **Medium** (pseudocode) | Preferred pattern exists | Configuration-dependent behavior |
| **Low** (specific scripts) | Fragile operations | Critical sequences, error-prone ops |

Think of Claude exploring a path: narrow bridge needs guardrails (low freedom), open field allows many routes (high freedom).

## Context Window Management

### What Loads When

1. **Always loaded**: Skill metadata (name + description) ~100 words
2. **On trigger**: SKILL.md body (target <5k words)
3. **On demand**: references/, scripts/, assets/

### Token Budget Guidelines

| Content Type | Target Size |
|-------------|-------------|
| Frontmatter description | <500 characters |
| SKILL.md body | <500 lines, ~1500-2000 words |
| Individual reference file | <3000 words |
| Total skill (all files) | Context-dependent |

### Compression Techniques

**Move details to tool help**:
```markdown
# Bad - documents all flags
The search command supports --text, --both, --after DATE, --before DATE...

# Good - references built-in help
The search command supports multiple modes. Run --help for details.
```

**Use cross-references**:
```markdown
# Bad - repeats instructions
[20 lines of repeated workflow details]

# Good - references other skill
Use the testing-skills-with-subagents workflow for verification.
```

**Compress examples**:
```markdown
# Bad - verbose (42 words)
User: "How did we handle authentication errors in React Router?"
You: I'll search past conversations for patterns.
[Dispatch subagent with query: "React Router auth error handling"]

# Good - minimal (20 words)
User: "How did we handle auth errors in React Router?"
[Dispatch subagent → synthesis]
```

## Description Optimization

The description field is CRITICAL. Claude reads descriptions from ALL skills to decide which one to load.

### Required Elements

1. **Trigger phrase**: Start with "Use when..."
2. **Specific symptoms**: Error messages, scenarios, contexts
3. **Value proposition**: What the skill provides

### Writing Pattern

```
Use when [specific scenarios/symptoms] - [what skill provides]
```

### Examples

```yaml
# Bad - too abstract
description: For async testing

# Bad - implementation not triggers
description: Uses Jest and React Testing Library for component tests

# Bad - first person (skills are injected as third person)
description: I help you with testing async code

# Good - specific triggers + value
description: |
  Use when tests fail intermittently, have race conditions, or 
  timing dependencies - provides condition-based polling that 
  replaces arbitrary timeouts for reliable async tests.

# Good - technology-specific with clear trigger
description: |
  Use when working with PDF files for form filling, text extraction,
  or document merging - provides patterns for pdfplumber and PyMuPDF
  with common gotchas documented.
```

### Keyword Coverage

Include words Claude might search for:

- **Error messages**: "Hook timed out", "ENOTEMPTY", "race condition"
- **Symptoms**: "flaky", "hanging", "zombie", "pollution"
- **Synonyms**: timeout/hang/freeze, cleanup/teardown/afterEach
- **Tools**: Actual commands, library names, file types

## Progressive Disclosure

### Pattern 1: High-level guide with references

```markdown
# PDF Processing

## Quick start
[Basic example]

## Advanced features
- **Form filling**: See [references/forms.md](references/forms.md)
- **API reference**: See [references/api.md](references/api.md)
```

### Pattern 2: Domain-specific organization

```
bigquery-skill/
├── SKILL.md (overview and navigation)
└── references/
    ├── finance.md (revenue, billing)
    ├── sales.md (opportunities, pipeline)
    └── product.md (API usage, features)
```

When user asks about sales, Claude only reads sales.md.

### Pattern 3: Variant-specific organization

```
cloud-deploy/
├── SKILL.md (workflow + provider selection)
└── references/
    ├── aws.md
    ├── gcp.md
    └── azure.md
```

When user chooses AWS, Claude only reads aws.md.

### Important Guidelines

- **Keep references one level deep** from SKILL.md
- **Link all references explicitly** from SKILL.md
- **Add table of contents** to files >100 lines
- **Avoid information duplication** between SKILL.md and references

## Writing Style

### Use Imperative Form

```markdown
# Good
Run the validation script.
Extract text with pdfplumber.
Create the configuration file.

# Bad
You should run the validation script.
The text can be extracted with pdfplumber.
```

### Structure for Scanning

- Use tables for quick reference
- Use bullets for lists
- Use code blocks for commands
- Keep paragraphs short (2-3 sentences)

### Code Examples

**One excellent example beats many mediocre ones.**

- Choose the most relevant language for the domain
- Make examples complete and runnable
- Comment the WHY, not the WHAT
- From real scenarios, not contrived

```python
# Good - explains why, complete
def wait_for_element(selector, timeout=5000):
    """
    Poll for element instead of arbitrary sleep.
    Avoids race conditions when element may load at variable times.
    """
    start = time.time()
    while time.time() - start < timeout / 1000:
        element = find(selector)
        if element:
            return element
        time.sleep(0.1)
    raise TimeoutError(f"Element {selector} not found")

# Bad - no context, incomplete
def wait(sel):
    # wait for element
    while True:
        if find(sel):
            return
```

## Testing Skills

### Before Deployment

1. **Use skill in real scenario** - not hypothetical
2. **Note unclear sections** - what required re-reading?
3. **Check trigger accuracy** - does it activate appropriately?
4. **Verify progressive disclosure** - does Claude load only needed references?

### Iteration Workflow

1. Write initial skill
2. Test with real task
3. Note failures and confusions
4. Update skill addressing issues
5. Re-test until bulletproof

### What to Look For

- Claude loads wrong skill (description issue)
- Claude loads right skill but fails (body issue)
- Claude succeeds but loads unnecessary references (structure issue)
- Same code/pattern keeps getting rewritten (missing script)

## Anti-Patterns

### Everything in SKILL.md

**Problem**: 8000-word SKILL.md burns context on every trigger.

**Solution**: Move detailed content to references/, keep SKILL.md lean.

### Vague Description

**Problem**: "Helps with testing" - Claude can't determine when to use it.

**Solution**: Start with "Use when..." + specific triggers and symptoms.

### Deeply Nested References

**Problem**: references/api/v2/auth/tokens.md - hard to discover and reference.

**Solution**: Keep references one level deep, link from SKILL.md.

### Multi-Language Dilution

**Problem**: example-js.js, example-py.py, example-go.go - mediocre quality everywhere.

**Solution**: One excellent example in the most relevant language.

### Narrative Storytelling

**Problem**: "In session 2025-10-03, we found that empty projectDir caused..."

**Solution**: Extract the reusable pattern, remove the narrative.

### Missing Cross-References

**Problem**: Claude doesn't know references/ files exist.

**Solution**: Explicitly link all reference files from SKILL.md with clear descriptions.

### Force-Loading with @ Links

**Problem**: `@references/api.md` loads immediately, wasting context.

**Solution**: Use markdown links `[references/api.md](references/api.md)` - loads on demand.
