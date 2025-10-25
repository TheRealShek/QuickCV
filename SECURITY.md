# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security bugs seriously. We appreciate your efforts to responsibly disclose your findings.

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to:
- Email: [Your contact email - update this before publishing]

You should receive a response within 48 hours. If for some reason you do not, please follow up to ensure we received your original message.

Please include the following information:
- Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

## Preferred Languages

We prefer all communications to be in English.

## Disclosure Policy

When we receive a security bug report, we will:
1. Confirm the problem and determine affected versions
2. Audit code to find any similar problems
3. Prepare fixes for all supported versions
4. Release patches as soon as possible

## Comments on this Policy

If you have suggestions on how this process could be improved, please submit a pull request.

## Security Best Practices

For users of QuickCV:
- Always keep your dependencies up to date
- Run `npm audit` regularly to check for vulnerabilities
- Be cautious when loading resume JSON files from untrusted sources
- Review the code before deploying to production

Thank you for helping keep QuickCV and its users safe!
