# Git Hooks and Automation

This document describes the Git hooks and automation setup for the Hijraah project, ensuring code quality, security, and consistency across all contributions.

## Overview

The project uses a comprehensive automation system that includes:

- **Pre-commit hooks** for code quality and security checks
- **Commit message validation** using conventional commit format
- **Pre-push hooks** for comprehensive testing and validation
- **Automated CI/CD workflows** for continuous integration
- **Security auditing** with automated vulnerability scanning
- **Dependency management** with automated updates

## Git Hooks

### Pre-commit Hook (`.husky/pre-commit`)

Runs automatically before each commit and performs:

1. **ESLint checks** - Code quality and style validation
2. **Prettier formatting** - Code formatting consistency
3. **TypeScript type checking** - Type safety validation
4. **Security audit** - Dependency vulnerability scanning
5. **Sensitive information detection** - Prevents accidental secret commits
6. **Related tests** - Runs tests for changed files

**To bypass (use sparingly):**
```bash
git commit --no-verify -m "your message"
```

### Commit Message Hook (`.husky/commit-msg`)

Validates commit messages against conventional commit format:

**Allowed types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes
- `perf`: Performance improvements
- `ci`: CI/CD changes
- `build`: Build system changes
- `revert`: Revert previous commit

**Format:**
```
type(scope): description

Optional body

Optional footer
```

**Examples:**
```bash
feat(auth): add OAuth2 integration
fix(api): resolve user profile update issue
docs: update installation instructions
chore(deps): update dependencies
```

### Pre-push Hook (`.husky/pre-push`)

Runs before pushing commits and performs:

1. **Comprehensive test suite** - All tests must pass
2. **Security audit** - No critical/high vulnerabilities allowed
3. **Large file detection** - Warns about files >1MB
4. **Branch naming validation** - Enforces naming conventions
5. **Protected branch checks** - Extra validation for main/master

**Branch naming conventions:**
- `feature/description` - New features
- `fix/description` - Bug fixes
- `hotfix/description` - Critical fixes
- `chore/description` - Maintenance tasks
- `docs/description` - Documentation updates

## Automation Scripts

### Security Audit Script (`scripts/security-audit.js`)

Comprehensive security scanning that:

- Runs `pnpm audit` for dependency vulnerabilities
- Checks for outdated packages
- Generates detailed JSON and markdown reports
- Provides actionable recommendations
- Integrates with CI/CD for automated checks

**Usage:**
```bash
# Run security audit
pnpm run security:audit

# Run with CI mode (fails on critical/high vulnerabilities)
pnpm run security:audit-ci
```

**Generated files:**
- `security-audit-report.json` - Detailed vulnerability data
- `security-audit-summary.md` - Human-readable summary

## CI/CD Workflows

### Main CI Workflow (`.github/workflows/ci.yml`)

Triggers on:
- Push to `master`, `main`, `develop`, `release/*` branches
- Pull requests to `master`, `main`, `develop` branches

**Steps:**
1. Checkout code and setup environment
2. Install dependencies with pnpm
3. Run security audit (fails on critical/high vulnerabilities)
4. Type checking with TypeScript
5. Code linting with ESLint
6. Format checking with Prettier
7. Build the application
8. Run test suite
9. Upload security audit reports as artifacts

### Security Audit Workflow (`.github/workflows/security-audit.yml`)

Triggers on:
- Daily schedule (2 AM UTC)
- Manual dispatch
- Changes to package files

**Features:**
- Comprehensive security scanning
- Automatic issue creation for critical vulnerabilities
- PR comments with security results
- Long-term artifact retention (90 days)

### Dependency Update Workflow (`.github/workflows/dependency-update.yml`)

Triggers on:
- Weekly schedule (Monday 9 AM UTC)
- Manual dispatch

**Process:**
1. Updates all dependencies to latest compatible versions
2. Applies security fixes
3. Runs tests to verify compatibility
4. Creates automated PR with changes
5. Includes security audit results

## Configuration Files

### Commitlint Configuration (`commitlint.config.js`)

Defines commit message rules:
- Enforces conventional commit format
- Sets maximum header length (100 characters)
- Validates type, scope, and subject format
- Ensures proper capitalization and punctuation

### Package.json Scripts

New scripts added for automation:
```json
{
  "security:audit": "node scripts/security-audit.js",
  "security:audit-ci": "node scripts/security-audit.js --fail-on-vulnerabilities"
}
```

## Best Practices

### For Developers

1. **Write meaningful commit messages** following conventional format
2. **Run tests locally** before pushing
3. **Address security vulnerabilities** promptly
4. **Keep dependencies updated** regularly
5. **Review automated PRs** carefully before merging

### For Code Reviews

1. **Check CI status** - All checks must pass
2. **Review security audit results** in PR artifacts
3. **Validate commit message format** and content
4. **Ensure tests cover new functionality**
5. **Verify no sensitive information** is committed

### For Releases

1. **Run comprehensive security audit** before release
2. **Update dependencies** to latest secure versions
3. **Verify all automation passes** on release branch
4. **Document security fixes** in release notes

## Troubleshooting

### Common Issues

**Pre-commit hook fails:**
```bash
# Fix linting issues
pnpm run lint:fix

# Fix formatting issues
pnpm run format

# Fix type errors
pnpm run type-check
```

**Security audit fails:**
```bash
# Auto-fix vulnerabilities
pnpm audit fix

# Update vulnerable packages
pnpm update

# Check audit results
pnpm run security:audit
```

**Commit message rejected:**
```bash
# Use correct format
git commit -m "feat(component): add new feature"

# Check commitlint rules
npx commitlint --help
```

### Bypassing Hooks (Emergency Only)

```bash
# Skip pre-commit (not recommended)
git commit --no-verify

# Skip pre-push (not recommended)
git push --no-verify
```

**Note:** Bypassing hooks should only be done in emergencies and requires additional review.

## Monitoring and Maintenance

### Regular Tasks

1. **Review security audit reports** weekly
2. **Update automation scripts** as needed
3. **Monitor CI/CD performance** and optimize
4. **Update hook configurations** for new requirements
5. **Train team members** on new automation features

### Metrics to Track

- Commit message compliance rate
- Security vulnerability resolution time
- CI/CD success rate
- Dependency update frequency
- Code quality trends

## Support

For issues with Git hooks or automation:

1. Check this documentation first
2. Review CI/CD workflow logs
3. Examine security audit reports
4. Contact the development team
5. Create an issue with detailed error information

---

*This automation system is designed to maintain high code quality and security standards while minimizing developer friction. Regular updates and improvements are made based on team feedback and industry best practices.*