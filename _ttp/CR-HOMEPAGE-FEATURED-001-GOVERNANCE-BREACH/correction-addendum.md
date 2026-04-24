# CR-HOMEPAGE-FEATURED-001A — Correction Addendum: isMishaSelect Consumer Scope

## Status
Documentation-only correction addendum.

Authored: 2026-04-24.
No PR merge until operator review.

## Parent Incident
CR-HOMEPAGE-FEATURED-001 — Homepage Featured Image Governance Breach.

Cross-references within this packet directory:
- `triage.md` — original incident triage
- `hardening.md` — shared-field consumer inventory and pre-mutation checklist

## Purpose
This addendum corrects an overbroad remediation statement made after PR #65 merged.

PR #65 successfully decoupled the `mishacreations.com` home-page "Selected Works" grid from `isMishaSelect`. The subsequent hardening review (see `hardening.md`) found that `isMishaSelect` remains consumed by additional public routes. Therefore, the field is **not** exclusively scoped to the private `/select` gallery. The incident record must reflect that reality so future governance decisions are made against accurate scope.

## Original Overbroad Statement

The overbroad claim appeared in two places:

1. **`triage.md` → Outputs → REMEDIATION bullet:**
   > "Result: Home page is fully decoupled from `isMishaSelect`. That flag is now exclusively the `/select?view=gallery` private-gallery flag."

2. **PR #65 commit message body:**
   > "`isMishaSelect` is now exclusively the `/select?view=gallery` flag. Home page cannot be affected by future mutations to that boolean."

Both statements imply the field was fully isolated to the private gallery. That implication is incorrect.

## Corrected Statement

> PR #65 decoupled the MishaCreations.com home page Selected Works grid from `isMishaSelect`. It did not fully isolate `isMishaSelect` to the private `/select` gallery. Subsequent hardening review found that `isMishaSelect` remains a high-risk shared field consumed by additional public routes. Therefore, `isMishaSelect` must remain governed as a shared public/private curation and routing field until a separate remediation packet splits or replaces its consumers.

## Evidence From Hardening Review

The CR-HOMEPAGE-FEATURED-001 hardening review (`hardening.md` → "Shared Field Inventory — High-risk shared fields" and "Validation Pass V1") identified the additional public consumers of `isMishaSelect` after the home-page decoupling.

### Known remaining public consumers of `isMishaSelect`

| Public route | Consuming query | File / line |
|---|---|---|
| `/areas/[slug]` | `getMishaSelectPieces(4)` (fallback) | `misha-website/src/app/areas/[slug]/page.tsx:69` |
| `/recent-projects` | `getMishaSelectPieces(12)` | `misha-website/src/app/recent-projects/page.tsx:28` |
| `/portfolio` hero row | `getFeaturedPieces()` (predicate: `isMishaSelect && isFeatured`) | `misha-website/src/lib/queries.ts:99-105` |
| `/gallery` hero row | same `getFeaturedPieces()` | same |
| `/portfolio/[slug]` Related panel | `getRelatedPieces()` (predicate: `isMishaSelect && category`) | `misha-website/src/lib/queries.ts:123-129` |

Additional private consumer (unchanged, by design):
- `studio.mishacreations.com/select` and `/select?view=gallery` — `misha-studio-site/src/lib/studio-queries.ts:111-116`

## Governance Significance

This correction matters because the CR-HOMEPAGE-FEATURED-001 incident was **not** fully resolved at the field-governance level. The public home-page symptom was remediated; the underlying shared-field risk remains.

Any future mutation of `isMishaSelect` — batch or otherwise — must trigger the pre-mutation checklist from `hardening.md`:
- Consumer-diff review
- Public/private surface classification
- Scope-creep assessment per surface
- Operator escalation if any public surface outside the authored scope is affected

Treat `isMishaSelect` as a **HIGH-risk shared public/private curation-and-routing field**, not a private-gallery-only flag, until the field is architecturally split.

## Remediation Boundary

This addendum does **not** authorize remediation code.

- No schema split.
- No query change.
- No Sanity data mutation.
- No runtime behavior change.
- No file outside this `_ttp` directory is modified.

## Required Future Packet

**CR-HOMEPAGE-FEATURED-002 — isMishaSelect Consumer Remediation Design.**

That packet should determine whether `isMishaSelect` should be:
- Renamed (to reflect its true public-curation role, if kept shared),
- Split into per-surface booleans (e.g., `showOnRecentProjects`, `showInAreasFallback`, `showInPortfolioHero`),
- Deprecated and replaced with explicit reference arrays on `mainSiteSettings` (e.g., `recentProjectsFeatured[]`, `portfolioHeroPieces[]`),
- Or some combination.

The remediation packet must:
- Include a migration plan that preserves current visible content during the cut-over,
- Pass the pre-mutation checklist in `hardening.md` before any Sanity writes,
- Be authored and authorized before any implementation begins.

## Verification

- [x] **Documentation-only packet.** This file is the only output.
- [x] **No runtime behavior changed.** No source file outside `_ttp/` is touched.
- [x] **No Sanity data mutated.** No mutation script or patch operation is proposed or executed.
- [x] **No schema changed.** No schema file in either repo is modified.
- [x] **Correction cross-references the original triage and hardening records.** `triage.md` and `hardening.md` are both cited by filename.
- [x] **Does not claim the issue is fully remediated.** The corrected statement explicitly scopes the remaining risk.
- [x] **No PR merge without operator review.** Addendum is proposed as a separate PR; merge authorization is deferred to the operator.
