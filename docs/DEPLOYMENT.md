# Deployment Guide

This document describes the deployment workflow for the iRAM Experience project.

---

# Development Environment

Local Workspace

```
D:\.gemini\antigravity\scratch\iram-experience
```

Repository

```
https://github.com/SolarXtr/iram-experience
```

Production

```
https://iram-experience.pages.dev
```

---

# Deployment Workflow

```
Local Development

↓

Git Commit

↓

Push Feature Branch

↓

Merge into master

↓

Push master

↓

Cloudflare Build

↓

Production Deployment
```

---

# Git Commands

Create Feature Branch

```bash
git checkout -b feature/new-feature
```

Commit

```bash
git add .
git commit -m "feat: description"
```

Push

```bash
git push origin feature/new-feature
```

Merge

```bash
git checkout master
git pull origin master
git merge feature/new-feature
git push origin master
```

---

# Release Process

Create Tag

```bash
git tag v0.x.x
git push origin v0.x.x
```

Create GitHub Release

* Select Tag
* Add Release Notes
* Publish Release

---

# Cloudflare Pages

Production Branch

```
master
```

Build Command

```
None
```

Build Output Directory

```
public
```

---

# Verification Checklist

After deployment verify:

* Home page loads
* CSS is loaded
* JavaScript executes
* Navigation works
* Mobile layout works
* No console errors
* Lighthouse score acceptable

---

# Rollback

Return to a previous version using Git:

```bash
git checkout <tag>
```

or restore a previous commit:

```bash
git revert <commit>
```

Then redeploy by pushing the updated branch.

---

# Future Improvements

* Automated CI/CD
* GitHub Actions
* Automated Lighthouse testing
* Automated release generation
* Deployment notifications
