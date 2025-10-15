# Git Guide

This is just a small guide on Git and how we will ideally use it for our semester project

---

## Branching Model

* `main`: always deployable. Protected. Merge via PR only.
* `feature/<area>-<short-desc>`: contributor feature branches.
* `bug/<issue>`: issues for bugs that pops up.

**Examples**

```
feature/auth-oauth-google
feature/db-supabase-migrations
bug/google-auth-invalid
```

---

## Environment Files and Secrets

* Copy `.env.example` to a local env file (`.env`) and fill values
* Never commit secrets. `.env*` is ignored by `.gitignore`
* Typically we will store sensitive info like API keys and passwords in here
---

## Developer Workflow

### Starting a task
```bash
# 1) Start from fresh main
git checkout main
git pull --ff-only

# 2) Branch for your work
git checkout -b feature/auth-google

# 3) Do work, commit as you go
git add .
git commit -m "feat(auth): add Google OAuth callback"

# ... more work ...
git add .
git commit -m "feat(auth): finalize user session flow"

# 4) Sync with latest remote main
git fetch origin
git rebase origin/main

# 5) Push your branch (first push sets upstream)
git push -u origin feature/auth-google

# 6) Open a PR targeting main
```
### After PR is merged
```bash
# Update local main to your merged work
git checkout main
git pull --ff-only

# cleanup
git branch -d feature/auth-google
git push origin --delete feature/auth-google
```
---

## Conventional Commits (Commit Message Format)

```
feat(auth): add Google OAuth callback
fix(db): correct RLS for profiles table
docs(readme): add onboarding steps
```

---

## Common Issues and How to Resolve Them

### 1) Cannot push to main

```bash
git push -u origin feature/<area>-<desc>
```

### 2) Merge conflict

```bash
git fetch origin
git rebase origin/main
# Fix conflicts manually
git add <file>
git rebase --continue
```

### 3) Wrong branch commit

```bash
git branch temp
git reset --hard origin/main
git checkout correct-branch
git cherry-pick temp
```

### 4) Accidental secret committed

* Delte the file, rotate the secret, and remove from history:

```bash
git filter-repo --path .env --invert-paths
git push --force-with-lease
```

### 5) Undo last commit
```bash
git reset --soft HEAD~1
# or 
git reset -hard HEAD~1
```

---
