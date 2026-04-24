# CR-HOMEPAGE-FEATURED-001 Hardening Packet

## Purpose
Prevent future unauthorized cross-surface content changes caused by shared field mutations.

## Scope
- `portfolioPiece` fields
- `finishCategory` fields
- `mainSiteSettings` fields
- Homepage consumers
- Services page consumers
- Gallery consumers
- Misha Select consumers
- Studio / private consumers

## Known Breach Pattern
A mutation intended for one surface changed another because the same field was consumed by both. Specifically, a batch that set `isMishaSelect = true` on 35 pieces for the `/select?view=gallery` private gallery also populated the public home-page "Selected Works" grid because both surfaces shared that boolean. See `triage.md` for the full incident.

## Shared Field Inventory

**Convention:**
- **Public surface** = any route served on `mishacreations.com` that a client/guest can see.
- **Private surface** = any route served on `studio.mishacreations.com` (trade/designer portal, editor, preview workbenches) OR gated by PIN / access-token.
- **Mutation Risk** = what happens on a public surface when the field is flipped on or off for a piece.
- **Required Gate** = the pre-mutation gate that applies before touching this field.

### High-risk shared fields

| Field | Schema | Intended Meaning | Consumers (live runtime code) | Public Surface? | Private Surface? | Mutation Risk | Required Gate |
|---|---|---|---|---|---|---|---|
| `isMishaSelect` | `portfolioPiece` (boolean) | Marks a piece as part of Misha's curated "select" gallery | `misha-website/src/lib/queries.ts` → `getMishaSelectPieces()` (used by `/areas/[slug]`, `/recent-projects`); `getFeaturedPieces()` (used by `/portfolio`, `/gallery` hero rows); `getRelatedPieces()` (used by `/portfolio/[slug]` related panel). `misha-studio-site/src/lib/studio-queries.ts` → `getMishaSelectPieces()` (used by `/select`, `/select?view=gallery`). Editor UIs: `MishaSelectTab.tsx`, `FeaturedImagesPage.tsx`. | **YES** — 5 public routes | **YES** — Studio `/select`, editor tabs | **HIGH**. Flipping on a single piece can simultaneously add it to the Misha Select private gallery AND the portfolio/gallery/areas/recent-projects featured rows AND a category-peer's "Related" panel. This was the root of CR-HOMEPAGE-FEATURED-001. | Consumer-diff required. No batch mutation without operator authorization of every surface. |
| `isFeatured` | `portfolioPiece` (boolean) | Marks a piece as "featured," used with `featuredOrder` for ordering | `misha-website/src/lib/queries.ts` → `getFeaturedPieces()` (combines with `isMishaSelect`), `getHomepageHero()` (standalone). `misha-studio-site/src/lib/studio-queries.ts` → `getFeaturedPieces()` (no `isMishaSelect` filter). `misha-studio-site/src/components/editor/FeaturedImagesPage.tsx`. | **YES** — homepage hero background, portfolio/gallery hero rows | **YES** — editor tab, studio gallery | **HIGH**. Flipping on a piece can replace the homepage hero background image (via `getHomepageHero`) and rotate the portfolio/gallery featured rows. | Consumer-diff required. |
| `featured` | `portfolioPiece` (boolean) | **Legacy** field, predates `isFeatured`. Used in the Studio list filter at `sanity.config.ts:83`. Not read by any live consumer-site query. | `misha-studio-site/sanity.config.ts:83` (Studio sidebar "Featured" list only) | NO | Studio sidebar only | LOW. Kept for historical reasons; should be deprecated. | Low risk today but migration path should be documented. |
| `published` | `portfolioPiece` (boolean) | Custom flag (separate from Sanity's draft/published workflow). Controls public visibility on the consumer site. | **Near-universal.** Every public-facing GROQ fetch in `misha-website/src/lib/queries.ts` and `misha-studio-site/src/lib/studio-queries.ts` filters `published == true`. | **YES** — everything on mishacreations.com and studio.mishacreations.com | **YES** — every query | **HIGH**. Flipping `published=true` on a draft makes it immediately public on every consumer surface that queries its category. Flipping `published=false` removes it from everywhere. | Consumer-diff required; blast radius by default = every surface that could render this piece. |
| `archived` | `portfolioPiece` (boolean) | Soft-delete flag. Pieces with `archived=true` are hidden from all consumer queries. | **Near-universal.** Every live query filters `coalesce(archived, false) != true`. | **YES** (removes from) | **YES** (removes from) | **HIGH** — same as `published` but inverse. | Archive operations already governed via HB-131 doctrine; confirm before batch archiving. |
| `isProjectAnchor` | `portfolioPiece` (boolean) | The single piece that represents a project in the gallery grid | `misha-studio-site/src/lib/project-gallery.ts:57` — `getProjectGalleryAnchors()` builds the `/galleries/[category]` project-gallery grid. | **YES** — studio-site gallery category pages | NO direct private surface | MEDIUM. Flipping creates/removes gallery-grid tiles on the trade portal's category pages. | Consumer-diff before setting on a new piece (will displace whichever existing piece was the anchor). |
| `showAsCompanion` + `companionOrder` | `portfolioPiece` (boolean + number) | Marks a piece as a companion shot to the project's anchor piece, with ordering | `misha-studio-site/src/lib/project-gallery.ts:80` — `getProjectCompanions()` builds the project-lightbox carousel. | YES (studio-site project galleries) | NO | MEDIUM. Adds/removes a piece from a specific project's lightbox carousel. | Consumer-diff required — determine which project the carousel belongs to. |
| `isDetailCrop` | `portfolioPiece` (boolean) | Indicates a piece is a close-up / crop of another | Referenced in `_ttp/ATLAS-BRIEF-001/tag-image-classification.js` (agent batch), but no live runtime consumer found. | NO currently | NO currently | LOW today; monitor for future adoption. | Noted; not gated. |
| `humanReviewRequired` / `humanReviewStatus` | `portfolioPiece` (boolean + string) | DFA quality gate flags | Used by DFA-agent batch + editor tabs; not on public surface. | NO | YES (editor only) | LOW from public-surface perspective; HIGH from DFA pipeline perspective (separate governance). | Not in this packet; governed by DFA pipeline doctrine. |
| `flags[]` | `portfolioPiece` (array of strings) | Free-form tags (legacy). Currently used in editor UIs for filtering. | `misha-studio-site/src/components/editor/*`. No consumer-site query filters on `flags`. | NO | YES (editor tabs only) | LOW today. | Noted. |
| `heroImage` | `portfolioPiece` (image) | The primary image displayed for this piece | **Every public-facing query in both repos** selects `heroImage`. Pages: home `/`, `/gallery`, `/portfolio`, `/portfolio/[slug]`, `/services/[slug]`, `/projects/[slug]`, `/areas/[slug]`, `/recent-projects`, `/select`. | **YES — every surface** | YES | **HIGH** (public + private). Content mutation rather than routing, but replacing the asset changes the piece's appearance on every surface simultaneously. Single-piece edits in Sanity Studio are operator-authored; batch replacement is the risk. | Operator-authored in Sanity Studio is fine. Batch replacement requires operator per-item approval per HB-131 Rule 1 (authored-set supremacy). |
| `images[]` | `portfolioPiece` (array of images) | Additional detail images | Consumed by `/portfolio/[slug]` piece pages and `/projects/[slug]` project galleries. | YES | YES | LOW. Appending/removing additional images only affects the piece page, not gallery grid placements. | Noted; operator-authored. |
| `displayOrder` | `portfolioPiece` (number) | Ordering within category/gallery grids | **Every `| order(displayOrder asc)` query.** Pages: `/services/[slug]`, `/portfolio` (within categories), `/gallery` (within categories), `/select`, `/recent-projects`, studio-site galleries, preview galleries. | YES | YES | **HIGH**. Setting `displayOrder=1` (or any low number) on a piece promotes it to the first position on *every* gallery grid that includes it, across both public and private surfaces. A batch re-order pushes other pieces down simultaneously. | Consumer-diff required for batch re-orders. Single-piece edits in Studio UI are authored-and-owned by the operator. |
| `featuredOrder` | `portfolioPiece` (number) | Ordering within the `isFeatured=true` subset | `misha-studio-site/src/lib/studio-queries.ts` `getFeaturedPieces()`. | YES (studio trade portal hero) | YES | MEDIUM. Like `displayOrder` but scoped to the featured subset. | Consumer-diff required for batch re-orders. |
| `companionOrder` | `portfolioPiece` (number) | Ordering within the project-companion carousel | `misha-studio-site/src/lib/project-gallery.ts` `getProjectCompanions()`. | YES (project lightbox carousel) | NO | LOW. Single project scope; operator-authored per project. | Noted. |
| `category` | `portfolioPiece` (string, enum) | Primary category assignment (venetian-plaster / wall-murals / etc.) | **Near-universal.** `getPiecesByCategory()` in both repos; `/services/[slug]` pulls `category == $slug`; portfolio page groups by category. | **YES** — every category-driven page | **YES** | **HIGH**. Moving a piece to a different `category` moves it out of one public service page's gallery grid and into another's. | Consumer-diff required; note that `getRelatedPieces` uses this to surface related items on sibling piece pages. |
| `finishCategory` (ref) | `portfolioPiece` → `finishCategory` | Second categorization system (preview-gallery taxonomy, distinct from `category`) | `misha-studio-site/src/lib/preview-client.ts` → `getPreviewPiecesByCategory()`; `/preview/galleries/[category]` consumes this. | Studio preview only | YES | MEDIUM (preview-surface only; no consumer-site consumer today). | Preview is considered a private surface; flag the change to operator during preview-curation sessions. |
| `project` (ref) | `portfolioPiece` → `studioProject` | Relates a piece to its studio project | `misha-website/src/lib/queries.ts` → `getProjectBySlug()` resolves `pieces[]` through this; `/projects/[slug]` renders the project gallery. Studio-site `project-gallery.ts` uses it for anchor/companion logic. | YES — `/projects/[slug]` | YES — studio galleries | **HIGH** (public + private). Moving a piece between projects changes what renders on `/projects/[slug]` AND on studio-site category galleries and lightbox carousels. | Consumer-diff: name source and destination project. |

### High-risk shared fields — `finishCategory` schema

| Field | Intended Meaning | Consumers | Public Surface? | Mutation Risk | Required Gate |
|---|---|---|---|---|---|
| `heroImage` | Service-page hero image | `/services/[slug]` (both repos); **new**: home-page Selected Works grid after PR #65 | **YES** — 9 service pages + home page | HIGH. Changing this image changes the hero on the matching service page AND the home-page Selected Works tile for that category. | Operator authorization; confirm service page + home page impact. |
| `slug.current` | Matches `portfolioPiece.category` value | `getFinishCategory()`, home-page `getHomepageFeaturedServices()`, `/services/[slug]` lookup | YES — every category-page route | HIGH. Changing the slug detaches all pieces with matching `category` from this category. | Do not rename; if rename needed, run a paired migration on every `portfolioPiece.category`. |
| `sortOrder` | Navigation ordering | Studio UI, preview-galleries navigation | Studio only | LOW | Noted. |
| `isVisible` | Toggles display in gallery navigation | `misha-studio-site/src/app/preview/galleries/*` | Studio preview only | MEDIUM on the preview surface. | Noted. |

### High-risk shared fields — `mainSiteSettings` schema

| Field | Intended Meaning | Consumers | Public Surface? | Mutation Risk | Required Gate |
|---|---|---|---|---|---|
| `heroImage` (ref → `portfolioPiece`) | Homepage hero background | `getMainSiteSettings()` → `/` homepage | YES — home-page hero | HIGH. Changing this changes the full-screen hero seen by every visitor to `/`. | Operator authorization. |
| `heroHeadline`, `heroSubheadline` | Homepage headline copy | `getMainSiteSettings()` | YES | MEDIUM — copy change, not layout. | Operator-authored copy. |
| `featuredTestimonial` | Homepage testimonial block | `getMainSiteSettings()` | YES | LOW — text-only. | Operator-authored copy. |
| `neighborhoodStrip[]` | Homepage "Trusted by homeowners in…" list | `getMainSiteSettings()` | YES | LOW. | Operator-authored copy. |
| `seoTitle`, `seoDescription` | Meta tags | `getMainSiteSettings()` | YES | MEDIUM — SEO impact. | Operator-authored copy. |

### Content-only fields (LOW risk — not filter predicates, only displayed)

`title`, `subtitle`, `description`, `alt`, `caption`, `location`, `mishaComment`, all room/color/agent-classification/tech metadata fields. Mutating these changes how a piece is displayed but does not re-route it between surfaces. No diff-and-escalate gate required.

## Required Pre-Mutation Checklist

**Fields explicitly governed by this checklist (MUST run the gate before any batch mutation):**

1. `portfolioPiece.isMishaSelect` — HIGH
2. `portfolioPiece.isFeatured` — HIGH
3. `portfolioPiece.published` — HIGH
4. `portfolioPiece.archived` — HIGH
5. `portfolioPiece.category` — HIGH
6. `portfolioPiece.heroImage` — HIGH
7. `portfolioPiece.displayOrder` — HIGH
8. `portfolioPiece.project` — HIGH
9. `finishCategory.heroImage` — HIGH
10. `finishCategory.slug` — HIGH
11. `mainSiteSettings.heroImage` — HIGH
12. **Any future `featuredPieces[]` / `featuredHomepageServices[]` / equivalent reference array** added to `mainSiteSettings` to drive public-home-page display — treat as HIGH the moment the field is schema-added, regardless of initial state
13. Any `mainSiteSettings` field that changes public presentation (`heroHeadline`, `heroSubheadline`, `featuredTestimonial`, `neighborhoodStrip[]`, `seoTitle`, `seoDescription`) — MEDIUM; operator-authored copy is fine, batch changes require review

**The Gate (before executing any batch mutation on the above):**

- [ ] Identify every query that reads the field (grep both repos for the predicate).
- [ ] Identify every component/page affected (follow each query to its caller).
- [ ] Identify whether each consumer is public or private.
- [ ] Compute before/after diff — list exactly which document IDs will gain/lose the flag.
- [ ] Document the expected visible changes per surface.
- [ ] Escalate if any surface outside the requested scope changes.
- [ ] Do not execute if consumer impact is **UNKNOWN** — mark the field UNKNOWN in the packet and pause.
- [ ] If the proposed fix requires Sanity data mutation, pause and request explicit operator approval; do not proceed on meeting urgency (Rule 4).

## Enforcement Rule

**No batch mutation may proceed unless the consumer-diff is complete and attached to the task packet.**

A "batch mutation" is any script, API call, or manual operation that mutates more than 3 documents in a single action, or touches a HIGH-risk field on any document.

For single-document edits in the Sanity Studio UI, the consumer-diff is implicit in the operator's authoring session (the operator sees the piece, decides to toggle the flag, and is the direct author of both surfaces). Studio-UI single-edits are NOT batch mutations.

## Follow-Up Actions

- [x] Inventory shared fields — this document.
- [ ] Add pre-mutation checklist to governance doctrine — copy/link from `00_Control-Plane/00_Policies/CR-Governance/` or CLAUDE.md so it's enforceable doctrine, not just a packet.
- [ ] **Add code comments near risky shared queries** — concrete locations to annotate:
  - `misha-website/src/lib/queries.ts:62` (`getMishaSelectPieces`)
  - `misha-website/src/lib/queries.ts:99` (`getFeaturedPieces`)
  - `misha-website/src/lib/queries.ts:123` (`getRelatedPieces`)
  - `misha-website/src/lib/queries.ts:156` (`getHomepageHero`)
  - `misha-studio-site/src/lib/studio-queries.ts:99` (studio `getFeaturedPieces`)
  - `misha-studio-site/src/lib/studio-queries.ts:111` (studio `getMishaSelectPieces`)
  - `misha-studio-site/src/lib/project-gallery.ts:57` (anchors)
  - `misha-studio-site/src/lib/project-gallery.ts:80` (companions)
- [ ] **Consider separating `isMishaSelect` further.** Despite PR #65 removing it from the home page, the flag is still shared across 5 public routes: `/areas/[slug]`, `/recent-projects`, `/portfolio`, `/gallery`, `/portfolio/[slug]` (related). If the operator authors the Misha Select set as a private-gallery curation, flipping that flag still affects those 5 public surfaces. Propose: introduce dedicated booleans per surface (e.g., `showOnAreasPage`, `showInGalleryHero`) OR move the cross-cutting surfaces to explicit curated references on `mainSiteSettings`. Long-term fix; not required today but should be planned.
- [ ] **Same treatment for `isFeatured`**, which is read by the homepage hero (`getHomepageHero`) and the portfolio/gallery hero rows (`getFeaturedPieces`) — two distinct public surfaces.

## Recommendations

### Fields that SHOULD remain shared
- **`published`** — single-source visibility gate by design. Every consumer needs the same definition of "is this piece public?". Keeping it shared is architecturally correct; the mitigation is the pre-mutation checklist, not schema surgery.
- **`archived`** — same as `published`; inverse polarity.
- **`category`** — the primary taxonomy. Splitting it would require maintaining duplicate category-memberships per consumer, which is worse than the current shared-field discipline.
- **`heroImage`, `images[]`** — content fields by design; splitting would require per-consumer image uploads, which nobody wants to manage.

### Fields that SHOULD be split (proposed future REMEDIATION)

- **`isMishaSelect`** — currently consumed by 5 public routes (`/areas/[slug]`, `/recent-projects`, `/portfolio` hero, `/gallery` hero, `/portfolio/[slug]` Related) AND the private `/select` gallery. The name implies a single curated set, but the flag is serving as the input to six independent display decisions. Proposed split:
  - Keep `isMishaSelect` as the **private-gallery membership** flag (reads: studio `/select` only).
  - Introduce one of:
    - **Per-surface booleans**: `showOnRecentProjects`, `showInAreasFeatured`, `showOnPortfolioHero`, `showInRelatedPanel` — explicit, operator-authored per surface.
    - **Or a reference-based approach**: new fields on `mainSiteSettings` (e.g. `recentProjectsFeatured[] → portfolioPiece`, `portfolioHeroFeatured[] → portfolioPiece`) so each public surface's featured set is an explicit, ordered operator curation.
  - Migration plan would be: backfill the new flags/refs to match today's `isMishaSelect` set (so no public surface changes on day 1), then the flag's meaning is clean going forward.
- **`isFeatured`** — currently used by homepage hero background (`getHomepageHero`) AND portfolio/gallery hero rows (`getFeaturedPieces`). Two distinct surfaces sharing one flag. Proposed split:
  - Rename / narrow `isFeatured` to a single specific meaning.
  - Move the other consumer to an explicit reference field on `mainSiteSettings`.
- **Legacy `featured`** (distinct from `isFeatured`) — deprecate. Only consumer is the Sanity Studio sidebar list at `sanity.config.ts:83`. Remove from schema after confirming zero external dependencies.

### Surfaces that need explicit source-of-truth separation

- **Home page `/`** — already done in PR #65 (CR-HOMEPAGE-FEATURED-001). Reads `finishCategory.heroImage` (9 service categories) ordered by code-level `FINISH_SURFACES`. Not dependent on any piece-level flag.
- **Portfolio `/portfolio` hero row** — currently reads `isMishaSelect AND isFeatured`. Should read an explicit `mainSiteSettings.portfolioHeroPieces[]` reference list.
- **Gallery `/gallery` hero row** — same as above (shares `getFeaturedPieces`).
- **Recent Projects `/recent-projects` featured grid** — currently calls `getMishaSelectPieces(12)`. Should read an explicit `mainSiteSettings.recentProjectsFeatured[]` or rely on the operator-authored `studioProject.isFeatured` flag (with display logic per project, not per piece).
- **Area pages `/areas/[slug]`** — currently calls `getMishaSelectPieces(4)` as a fallback. Should read per-area curation (e.g., `areaPage.featuredPieces[] → portfolioPiece`) or simply show the top N pieces in that area's neighborhood tag.
- **Portfolio piece page `/portfolio/[slug]` "Related"** — currently filters by `isMishaSelect AND category`. Should read `category` only (broader set) or a dedicated "related pool" query that doesn't reuse the curation flag.

### Automation recommendation
**Build a `scripts/consumer-diff.mjs`** that, given a Sanity field name and (optional) predicate value, greps both repos for every live-runtime consumer and outputs a structured report — the pre-mutation checklist's manual steps but automated. Makes the gate enforceable as a make-target or git pre-push hook.

## Scope Gaps Identified During Inventory

The operator's packet template scoped `portfolioPiece`, `finishCategory`, and `mainSiteSettings`. During the inventory I noticed the `studioProject` schema also has boolean flags that fit the same shared-field pattern:

- `studioProject.isFeatured` (boolean)
- `studioProject.isMishaSelect` (boolean)
- `studioProject.published` (boolean)

**Currently none of these are filter predicates in live consumer-site queries** (the consumer site's project queries only filter on `count(pieces) > 0` and slug). They are LOW RISK today, but the booleans exist and could silently become predicates if new queries are added. Suggest a follow-up hardening mini-packet to either (a) remove the flags from `studioProject` if never used, or (b) add them to this inventory with the same gate discipline.

## Open Questions / Decisions Deferred to Operator

1. **Deprecate the legacy `featured` boolean** (distinct from `isFeatured`)? It's read only by the Studio sidebar list and nothing else. Removing it would eliminate one source of confusion.
2. **Permanent curation-field separation** — the inventory suggests `isMishaSelect` and `isFeatured` should be split per surface to eliminate the shared-flag class of bug. Do you want a formal REMEDIATION packet scoped for this, with a migration plan?
3. **Automate the consumer-diff** — a script that, given a field name, greps both repos and outputs the consumer list. Would turn the pre-mutation checklist from a manual step into a make-target.
