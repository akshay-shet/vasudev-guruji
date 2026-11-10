# Deployment & Release Readiness Checklist

**Application**: Vasudev Guruji Official Vedic Astrology Platform  
**Target Environments**: Vercel (`https://vg-five-self.vercel.app`), Netlify  
**Date**: November 7, 2026  
**Auditor**: DevSecOps Engineer  

---

## 1. Pre-Deployment Automated Gates

Before promoting any release to production, execute the following commands in sequence:

```bash
# 1. Dependency vulnerability scan
npm audit

# 2. TypeScript static type verification
npx tsc -b

# 3. Automated test suite execution
npm test

# 4. Production build & SSG prerender verification
npm run build
```

**Pass Criteria**:
- `npm audit`: 0 critical vulnerabilities.
- `npx tsc -b`: 0 type errors.
- `npm test`: 12/12 tests passing.
- `npm run build`: Exit code 0, 28 static pages generated in `dist/`.

---

## 2. Environment Configuration

| Variable | Required In Production | Purpose | Default |
|---|---|---|---|
| `VITE_SITE_URL` | Optional (Recommended for custom domains) | Sets canonical URL and sitemap domain | `https://vg-five-self.vercel.app` |
| `VITE_ROUTER` | No | Client router mode (`browser` / `memory`) | `browser` |

---

## 3. Post-Deployment Verification

After deployment to Vercel/Netlify, run:

```bash
# 1. Verify HTTP 200 OK on production alias
curl -I https://vg-five-self.vercel.app/

# 2. Verify Security Headers (CSP, HSTS, X-Content-Type-Options)
curl -I https://vg-five-self.vercel.app/ | grep -E "content-security-policy|strict-transport-security|x-content-type-options"

# 3. Verify Cache-Control on static assets
curl -I https://vg-five-self.vercel.app/assets/index-*.js | grep "cache-control"

# 4. Verify sitemap and robots
curl -s https://vg-five-self.vercel.app/robots.txt
curl -s https://vg-five-self.vercel.app/sitemap.xml | head -n 10
```

---

## 4. Rollback & Recovery Procedures

1. **Instant Rollback via Vercel CLI**:
   ```bash
   # List recent production deployments
   vercel list
   # Promote previous healthy deployment ID
   vercel rollback <deployment-id-or-url>
   ```
2. **Instant Rollback via Vercel Dashboard**:
   - Navigate to `Vercel Dashboard` → `vg` → `Deployments`.
   - Locate the last verified healthy deployment.
   - Click `...` → `Assign to Domain` / `Promote to Production`.
