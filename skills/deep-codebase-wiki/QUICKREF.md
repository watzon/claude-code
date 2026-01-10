# Deep Codebase Wiki - Quick Reference

## 🚀 ONE-LINE CHECK (Run this FIRST)

```bash
bash scripts/search_wikis.sh --repo "owner/repo"
```

## 📋 Common Commands

```bash
# List all wikis
bash scripts/search_wikis.sh --list

# Search by repository
bash scripts/search_wikis.sh --repo "facebook/react"

# Search by keyword
bash scripts/search_wikis.sh --query "authentication"

# Clone repository for analysis
bash scripts/clone_repo.sh "owner/repo" --depth 1

# Validate wiki structure
bash scripts/validate_wiki.sh ~/.claude/wikis/org-repo

# Check if wiki needs update
bash scripts/update_check.sh ~/.claude/wikis/org-repo

# Add wiki to index
bash scripts/search_wikis.sh --add "org-repo" "owner/repo" "/path/to/wiki" "commit-sha"
```

## 🎯 When to Use Each Mode

| Scenario | Mode | Command |
|----------|------|---------|
| User asks about repo | **Read** | `search_wikis.sh --repo` |
| Wiki not found | **Analyze** | Clone → Analyze → Save |
| Wiki is 90+ days old | **Update** | `update_check.sh` → Re-analyze |
| Multiple repos mentioned | **Read** | `search_wikis.sh --list` |

## ⚡ Integration Priority

1. ✅ Check **deep-codebase-wiki** FIRST
2. ⏭️ If not found → Check **use-codemap**
3. 🔍 If not found → Launch background agents
4. 🛠️ Last resort → Manual exploration

## 📁 File Locations

- **Wikis**: `~/.claude/wikis/<org>-<repo>/`
- **Index**: `~/.claude/wikis/index.json`
- **Skill**: `~/.claude/skills/deep-codebase-wiki/`
- **Temp clones**: `/tmp/wiki-analysis/<org>-<repo>/`

## 🎓 Analysis Depth Guide

| Depth | Duration | When to Use |
|-------|----------|-------------|
| **Quick** | 1-2 hrs | Small repos, time-constrained |
| **Standard** | 3-5 hrs | Default, medium repos |
| **Comprehensive** | 5-8 hrs | Critical understanding, large repos |

## 🔧 Dependencies

- `bash` - Shell execution
- `jq` - JSON processing (install: `brew install jq`)
- `git` - Repository cloning

## 💡 Pro Tips

- **Always check first**: Save hours of redundant exploration
- **Reuse wikis**: One comprehensive analysis serves many future questions
- **Update strategically**: Only re-analyze when >30% changed or >90 days old
- **Focus depth**: Scope analysis to user's specific needs, not entire repo
- **Annotate wikis**: Add user notes to `metadata.yaml` for context
