# Security Hardening & Implementation Report

**Application**: Vasudev Guruji Official Vedic Astrology Platform  
**Target Environments**: Vercel Serverless / Edge Platform, Netlify  
**Date**: November 7, 2026  
**Auditor**: Senior Security Engineer, DevSecOps Engineer  

---

## 1. Threat Model & Security Posture

The application serves public seekers looking for Vedic astrology consultations, birth chart readings, homa bookings, and spiritual guidance. The primary threat model focuses on:

1. **Client-Side Attacks (XSS, Clickjacking, MIME-Confusion)**: Malicious actors attempting script injection, framing the site to hijack leads, or abusing protocol-relative redirect vulnerabilities.
2. **Lead Poisoning / Parameter Overflow**: Attacker crafting oversized or control-character-laden input strings into the consultation form to cause URL parsing failures or corrupt WhatsApp intent URLs.
3. **Supply Chain Compromise**: Insecure build or development tool dependencies allowing remote code execution or file traversal during CI/CD.
4. **Secret Leakage**: Accidental exposure of API tokens or credentials in client bundles or public repositories.

---

## 2. Implemented Security Controls

### 2.1 HTTP Security Headers
Configured across all edge endpoints in `vercel.json` and `netlify.toml`:

```json
{
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: blob: https:; media-src 'self' blob: https:; connect-src 'self' https:; frame-src 'self' https://www.google.com https://maps.google.com https://www.youtube.com https://www.youtube-nocookie.com; frame-ancestors 'self'; form-action 'self' https://wa.me; base-uri 'self';"
}
```

#### Directive Explanations:
- **`default-src 'self'`**: Restricts all resource loads to the origin by default.
- **`frame-ancestors 'self'`**: Precludes unauthorized third-party embedding, preventing clickjacking attacks.
- **`form-action 'self' https://wa.me`**: Guarantees form submissions can only navigate within the application or to the official WhatsApp messaging domain.
- **`object-src 'none'`**: Disables outdated browser plugins (Flash, Java Applets).
- **`Permissions-Policy`**: Restricts browser hardware access (camera, microphone, geolocation, payment APIs) that the platform does not require.
- **`HSTS`**: Enforces strict HTTPS communication for 2 years (`63072000` seconds) including all subdomains and HSTS preload readiness.

### 2.2 Input Sanitization & URI Protection
In `src/components/Common.tsx` and `src/data/site.ts`:
- All client-submitted strings in the consultation form (`name`, `phone`, `dob`, `tob`, `pob`, `message`) are validated, stripped of ASCII control characters (`\u0000-\u001F\u007F-\u009F`), and truncated to safe max lengths (e.g. name ≤ 80 characters, message ≤ 1000 characters).
- Recipient phone numbers in `whatsappLink()` are strictly sanitized to strip all non-digit characters (`/\D/g`), ensuring phone routing cannot be tampered with.
- External links opened via JavaScript explicitly supply `rel="noopener,noreferrer"` to prevent window manipulation via `window.opener`.

### 2.3 Dependency & Supply Chain Security
1. **Patched High-Severity Vulnerabilities**:
   - `postcss` updated to safe `>=8.4.49`, addressing arbitrary file read (GHSA-6g55-p6wh-862q) and CSS injection (GHSA-qx2v-qp2m-jg93).
   - `react-router-dom` updated to `^6.30.2` (`6.30.6`), mitigating open redirect advisories (GHSA-2w69-qvjg-hvjx, GHSA-2j2x-hqr9-3h42).
   - `esbuild` upgraded to `>=0.25.0` via npm overrides, mitigating dev server unauthorized access (GHSA-67mh-4wv8-2f99).
2. **Native Zero-Dependency Test Suite**:
   - Replaced bloated test dependencies (`tinypool` with prototype pollution vulnerabilities) with Node's native test runner (`node:test` and `node:assert/strict`), achieving a zero-footprint test environment.

### 2.4 Error Handling & Information Leakage Prevention
- Centralized `ErrorBoundary` (`src/components/ErrorBoundary.tsx`) intercepts unhandled React runtime errors, displays a graceful spiritual message with navigation recovery, and logs structured error diagnostics to console without leaking user state or stack traces to end users.
- Prerendering scripts (`scripts/prerender-seo.mjs`) sanitize HTML output using `replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')` and encode `<` in JSON-LD payloads as `\u003c` to eliminate script tag breakout attacks.

---

## 3. Verification & Automated Test Status

| Control | Test File | Result |
|---|---|---|
| HTTP Headers in `vercel.json` | `tests/security.test.mjs` | **PASSED** (100%) |
| HTTP Headers in `netlify.toml` | `tests/security.test.mjs` | **PASSED** (100%) |
| Input & Phone Sanitization | `tests/security.test.mjs` | **PASSED** (100%) |
| `.gitignore` Secret Protection | `tests/security.test.mjs` | **PASSED** (100%) |
| JSON-LD XSS Escaping | `tests/seo.test.mjs` | **PASSED** (100%) |
