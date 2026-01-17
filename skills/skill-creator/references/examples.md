# Skill Examples

Annotated examples of well-structured skills.

## Table of Contents

- [Minimal Skill](#minimal-skill)
- [Skill with Scripts](#skill-with-scripts)
- [Skill with References](#skill-with-references)
- [Multi-Variant Skill](#multi-variant-skill)
- [Complete Skill](#complete-skill)

## Minimal Skill

Self-contained skill with everything inline.

### Structure

```
explaining-code/
└── SKILL.md
```

### SKILL.md

```yaml
---
name: explaining-code
description: |
  Use when explaining how code works, teaching about a codebase, or answering
  "how does this work?" questions - provides structured explanation with
  analogies, diagrams, and common gotchas.
---

# Explaining Code

Explain code with visual diagrams and real-world analogies.

## Pattern

When explaining code, always include:

1. **Start with an analogy** - Compare to everyday life
2. **Draw a diagram** - ASCII art for flow/relationships  
3. **Walk through the code** - Step-by-step explanation
4. **Highlight a gotcha** - Common mistakes or surprises

## Example

```
User: "How does this authentication middleware work?"

Response structure:
1. Analogy: "Think of it like a bouncer at a club..."
2. Diagram:
   Request → [Auth Middleware] → Valid? → Route Handler
                    ↓
                 Invalid → 401 Response
3. Walk-through: "First, the token is extracted from..."
4. Gotcha: "Note that expired tokens return 401, not 403..."
```

## When NOT to Use

- Simple one-line explanations
- When user asks for code, not explanation
- Documentation-style references (use actual docs)
```

### Why This Works

- **Frontmatter**: Clear triggers ("explaining", "how does this work")
- **Body**: Concise pattern + concrete example
- **No references needed**: Everything fits in ~150 lines

---

## Skill with Scripts

Skill with reusable executable code.

### Structure

```
pdf-rotate/
├── SKILL.md
└── scripts/
    └── rotate.py
```

### SKILL.md

```yaml
---
name: pdf-rotate
description: |
  Use when rotating PDF pages, fixing orientation, or batch-processing
  PDFs with rotation needs - provides reliable rotation script using
  PyMuPDF with proper error handling.
---

# PDF Rotation

Rotate PDF pages reliably.

## Quick Start

```bash
# Rotate all pages 90 degrees clockwise
python3 scripts/rotate.py input.pdf output.pdf 90

# Rotate specific pages
python3 scripts/rotate.py input.pdf output.pdf 180 --pages 1,3,5
```

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--pages` | Comma-separated page numbers | All pages |
| `--overwrite` | Overwrite input file | False |

## Common Issues

| Error | Solution |
|-------|----------|
| "File not found" | Check path, use absolute path if needed |
| "Invalid rotation" | Must be 0, 90, 180, or 270 |
| "Permission denied" | Check file isn't open in another app |
```

### scripts/rotate.py

```python
#!/usr/bin/env python3
"""
Rotate PDF pages.

Usage:
    python rotate.py input.pdf output.pdf 90
    python rotate.py input.pdf output.pdf 180 --pages 1,3,5
"""
import sys
import argparse
import fitz  # PyMuPDF

def rotate_pdf(input_path, output_path, degrees, pages=None):
    """Rotate specified pages in a PDF."""
    doc = fitz.open(input_path)
    
    if pages is None:
        pages = range(len(doc))
    else:
        pages = [p - 1 for p in pages]  # Convert to 0-indexed
    
    for page_num in pages:
        if 0 <= page_num < len(doc):
            page = doc[page_num]
            page.set_rotation(page.rotation + degrees)
    
    doc.save(output_path)
    doc.close()
    print(f"Rotated {len(pages)} pages by {degrees} degrees")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Rotate PDF pages")
    parser.add_argument("input", help="Input PDF path")
    parser.add_argument("output", help="Output PDF path")
    parser.add_argument("degrees", type=int, choices=[0, 90, 180, 270])
    parser.add_argument("--pages", help="Comma-separated page numbers")
    
    args = parser.parse_args()
    pages = [int(p) for p in args.pages.split(",")] if args.pages else None
    rotate_pdf(args.input, args.output, args.degrees, pages)
```

### Why This Works

- **Script is deterministic**: Same input always produces same output
- **SKILL.md stays lean**: Usage examples only, not implementation
- **Error table**: Common issues addressed directly

---

## Skill with References

Skill with detailed documentation in separate files.

### Structure

```
bigquery-analytics/
├── SKILL.md
└── references/
    ├── schema.md
    └── common-queries.md
```

### SKILL.md

```yaml
---
name: bigquery-analytics
description: |
  Use when querying BigQuery for analytics, building reports, or exploring
  data warehouse - provides schema documentation and common query patterns
  for company analytics tables.
---

# BigQuery Analytics

Query the analytics data warehouse.

## Quick Reference

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `events` | User activity | user_id, event_name, timestamp |
| `users` | User profiles | user_id, created_at, plan_type |
| `revenue` | Billing data | user_id, amount, currency |

## Common Patterns

### Daily Active Users

```sql
SELECT DATE(timestamp) as date, COUNT(DISTINCT user_id) as dau
FROM `project.dataset.events`
WHERE timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
GROUP BY date
ORDER BY date
```

### Revenue by Plan

```sql
SELECT u.plan_type, SUM(r.amount) as total_revenue
FROM `project.dataset.revenue` r
JOIN `project.dataset.users` u USING (user_id)
WHERE r.timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
GROUP BY u.plan_type
```

## Detailed Documentation

- **Full schema**: See [references/schema.md](references/schema.md)
- **Query patterns**: See [references/common-queries.md](references/common-queries.md)
```

### references/schema.md

```markdown
# BigQuery Schema Reference

Complete schema documentation for analytics tables.

## events

User activity events.

| Column | Type | Description |
|--------|------|-------------|
| event_id | STRING | Unique event identifier |
| user_id | STRING | User who triggered event |
| event_name | STRING | Event type (page_view, click, etc.) |
| timestamp | TIMESTAMP | When event occurred |
| properties | JSON | Event-specific data |
| session_id | STRING | Browser session |
| device_type | STRING | mobile, desktop, tablet |

### Partitioning

- Partitioned by `timestamp` (daily)
- Clustered by `user_id`, `event_name`

### Common Event Names

- `page_view` - Page load
- `button_click` - UI interaction
- `form_submit` - Form submission
- `purchase` - Completed purchase
- `signup` - New registration

## users

[... continued schema documentation ...]
```

### Why This Works

- **SKILL.md has quick reference**: Immediate value without loading references
- **Detailed docs separated**: Only loaded when deep dive needed
- **Clear links**: "See [references/schema.md]" tells Claude where to look

---

## Multi-Variant Skill

Skill supporting multiple frameworks/providers.

### Structure

```
cloud-deploy/
├── SKILL.md
└── references/
    ├── aws.md
    ├── gcp.md
    └── azure.md
```

### SKILL.md

```yaml
---
name: cloud-deploy
description: |
  Use when deploying applications to cloud providers (AWS, GCP, Azure),
  setting up CI/CD pipelines, or configuring cloud infrastructure -
  provides deployment patterns for major cloud platforms.
---

# Cloud Deployment

Deploy applications to AWS, GCP, or Azure.

## Workflow

1. **Choose provider** based on existing infrastructure
2. **Configure authentication** (credentials, service accounts)
3. **Define resources** (compute, storage, networking)
4. **Deploy** with appropriate CLI/SDK
5. **Verify** deployment succeeded

## Provider Selection

| Provider | Best For | CLI |
|----------|----------|-----|
| AWS | Enterprise, comprehensive services | `aws` |
| GCP | Data/ML workloads, Kubernetes | `gcloud` |
| Azure | Microsoft ecosystem, hybrid | `az` |

## Provider-Specific Guides

- **AWS**: See [references/aws.md](references/aws.md)
- **GCP**: See [references/gcp.md](references/gcp.md)
- **Azure**: See [references/azure.md](references/azure.md)

## Common Patterns

### Container Deployment

All providers support Docker containers:

```bash
# Build and tag
docker build -t myapp:v1 .

# Push to registry (provider-specific)
# AWS:   docker push $AWS_ACCOUNT.dkr.ecr.$REGION.amazonaws.com/myapp:v1
# GCP:   docker push gcr.io/$PROJECT/myapp:v1
# Azure: docker push $REGISTRY.azurecr.io/myapp:v1
```

### Environment Variables

All providers support environment configuration:
- AWS: Parameter Store, Secrets Manager
- GCP: Secret Manager, Config Connector
- Azure: Key Vault, App Configuration
```

### Why This Works

- **SKILL.md has shared workflow**: Universal patterns inline
- **Provider-specific separated**: Only loads relevant provider
- **Selection table**: Helps choose right reference

---

## Complete Skill

Full-featured skill with all resource types.

### Structure

```
document-processing/
├── SKILL.md
├── scripts/
│   ├── extract_text.py
│   ├── fill_form.py
│   └── merge_pdfs.py
├── references/
│   ├── pdfplumber-api.md
│   ├── form-fields.md
│   └── troubleshooting.md
└── assets/
    └── sample-form.pdf
```

### SKILL.md

```yaml
---
name: document-processing
description: |
  Use when working with PDF documents - extracting text, filling forms,
  merging files, or analyzing structure. Handles common PDF operations
  with pdfplumber and PyMuPDF libraries.
---

# Document Processing

Process PDF documents: extract text, fill forms, merge files.

## Quick Start

| Task | Command |
|------|---------|
| Extract text | `python3 scripts/extract_text.py input.pdf` |
| Fill form | `python3 scripts/fill_form.py template.pdf data.json output.pdf` |
| Merge PDFs | `python3 scripts/merge_pdfs.py file1.pdf file2.pdf output.pdf` |

## Text Extraction

```python
import pdfplumber

with pdfplumber.open("document.pdf") as pdf:
    for page in pdf.pages:
        text = page.extract_text()
        print(text)
```

For table extraction and advanced features, see [references/pdfplumber-api.md](references/pdfplumber-api.md).

## Form Filling

1. Analyze form: `python3 scripts/extract_text.py form.pdf --fields`
2. Create data JSON matching field names
3. Fill: `python3 scripts/fill_form.py form.pdf data.json output.pdf`

For field mapping details, see [references/form-fields.md](references/form-fields.md).

## Common Issues

| Problem | Solution |
|---------|----------|
| Garbled text | PDF may be scanned image - use OCR |
| Missing form fields | Form may not be fillable - check with `--fields` |
| Merge fails | Check all inputs are valid PDFs |

For detailed troubleshooting, see [references/troubleshooting.md](references/troubleshooting.md).

## Testing

Use the sample form to test form filling:

```bash
python3 scripts/fill_form.py assets/sample-form.pdf test-data.json output.pdf
```
```

### Why This Works

- **Scripts for operations**: Deterministic, reusable
- **References for deep dives**: API docs, troubleshooting
- **Assets for testing**: Sample files to verify setup
- **SKILL.md is lean**: Points to resources, doesn't duplicate
