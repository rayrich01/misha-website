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

## Validation Pass

Per operator's instruction: run a validation pass after generating hardening.md. Results:

### V1 — Every listed field is backed by code evidence

| Field | Predicate found? | Evidence (live runtime code) |
|---|---|---|
| `isMishaSelect` | ✅ | `misha-website/src/lib/queries.ts:64` (`getMishaSelectPieces`), `:102` (`getFeaturedPieces`), `:126` (`getRelatedPieces`); `misha-studio-site/src/lib/studio-queries.ts:113` (studio `getMishaSelectPieces`); `misha-studio-site/src/components/editor/MishaSelectTab.tsx:164`; `src/components/editor/FeaturedImagesPage.tsx:154`; `src/app/api/title-review/inventory/route.ts:63, 68` |
| `isFeatured` | ✅ | `misha-website/src/lib/queries.ts:102, 158`; `misha-studio-site/src/lib/studio-queries.ts:99`; `src/components/editor/FeaturedImagesPage.tsx:139`; `sanity.config.ts:83` (Studio list filter for legacy `featured`) |
| `featured` (legacy) | ✅ | `misha-studio-site/sanity.config.ts:83` — only live consumer |
| `published == true` | ✅ | Live runtime: `misha-website/src/lib/queries.ts`, `misha-studio-site/src/lib/studio-queries.ts`, `src/lib/project-gallery.ts`, `src/app/api/title-review/inventory/route.ts`, `src/app/api/gallery-move/route.ts`, `src/app/api/preview/delete-category/route.ts`, editor tabs. Near-universal as claimed. |
| `archived` (`coalesce(archived, false) != true` / `!archived`) | ✅ | Same broad surface as `published`; 10+ live consumers across both repos. Confirmed near-universal. |
| `isProjectAnchor` | ✅ | `misha-studio-site/src/lib/project-gallery.ts:57` — only live consumer |
| `showAsCompanion` + `companionOrder` | ✅ | `misha-studio-site/src/lib/project-gallery.ts:80` — only live consumer |
| `isDetailCrop` | ⚠ (inactive) | Searched — only match is `_ttp/ATLAS-BRIEF-001/tag-image-classification.js` (non-runtime agent script). No live consumer-site or studio-site query filters on this. Marked LOW correctly. |
| `humanReviewRequired` / `humanReviewStatus` | ⚠ (editor-only) | DFA-agent pipeline + editor tabs; not on any public surface. Marked LOW for public-surface perspective. |
| `flags[]` | ⚠ (editor-only) | Editor component usages only; no consumer-site query filters. Marked LOW. |
| `category == $category` | ✅ | `misha-website/src/lib/queries.ts` (`getPiecesByCategory` via `PIECE_FIELDS`); `misha-studio-site/src/lib/studio-queries.ts:106`; `src/app/api/title-review/inventory/route.ts:63`; `src/lib/project-gallery.ts` (interpolated). |
| `finishCategory` (`finishCategory->`) | ✅ | `misha-studio-site/src/lib/preview-client.ts`; `src/app/preview/galleries/[category]/page.tsx`; `src/app/api/gallery-move/route.ts`; `src/app/api/title-review/crs/route.ts` |
| `project._ref` / `project->` | ✅ | `misha-website/src/lib/queries.ts` (`getProjectBySlug`, `getProjectForPiece`); `misha-studio-site/src/lib/project-gallery.ts:55, 77`. |
| `heroImage` (on `portfolioPiece`) | ✅ | Selected by every live `sanityClient.fetch` that returns piece data — universal as claimed. |
| `heroImage` (on `finishCategory`) | ✅ | `misha-website/src/lib/queries.ts:136` (`getFinishCategory`); `misha-website/src/app/services/[slug]/page.tsx:61` (direct consumption); `src/lib/queries.ts:478` (`getHomepageFeaturedServices` from PR #65). |
| `heroImage` (on `mainSiteSettings`) | ✅ | `misha-website/src/lib/queries.ts:147` (`getMainSiteSettings` via `heroImage->`). |
| `displayOrder` (as order) | ✅ | 15+ live `| order(displayOrder asc)` sites across both repos: `misha-website/src/lib/queries.ts:70, 78, 88, 99, 110, 137, 171, 421, 481`; `misha-studio-site/src/lib/studio-queries.ts:110, 122, 151`; editor tabs; title-review API. |
| `featuredOrder` (as order) | ✅ | `misha-studio-site/src/lib/studio-queries.ts:100`; `src/components/editor/FeaturedImagesPage.tsx` implicit. |
| `companionOrder` (as order) | ✅ | `misha-studio-site/src/lib/project-gallery.ts:81`. |

**No field in the inventory is UNKNOWN.** Every row's consumer set was enumerated by grep of live runtime code (excluded `_ttp/*` evidence files, `*.py` scripts, `*.mjs` one-off scripts, `node_modules`).

### V2 — Every public-facing consumer explicitly identified

Walking each public route on mishacreations.com and confirming its data sources are in the inventory:

| Public route | Data sources | In inventory? |
|---|---|---|
| `/` (home) | `getMainSiteSettings`, `getHomepageFeaturedServices` (post-PR #65), `getHomepageHero` | ✅ — `mainSiteSettings.*` + `finishCategory.heroImage` + `isFeatured` |
| `/about` | No shared-flag reads (static content) | N/A |
| `/gallery` | `getFeaturedPieces`, `getPiecesByCategory` | ✅ — `isMishaSelect + isFeatured` + `category` |
| `/portfolio` | 308 redirect to `/gallery` | same as `/gallery` |
| `/portfolio/[slug]` | `getPieceBySlug`, `getRelatedPieces` | ✅ — `slug`, `category + isMishaSelect` |
| `/services/[slug]` | `getServicePage`, `getFinishCategory`, `getPiecesByCategory` | ✅ — `finishCategory.heroImage`, `category` |
| `/projects/[slug]` | `getProjectBySlug` | ✅ — `project` reference + `pieces[]` resolution |
| `/recent-projects` | `getMishaSelectPieces(12)`, `getAllProjects` | ✅ — `isMishaSelect` |
| `/areas/[slug]` | `getAreaPage`, `getPiecesByCategories`, `getMishaSelectPieces(4)` | ✅ — `isMishaSelect`, `category` |
| `/faq`, `/consult`, `/inquire`, `/blog/*` | No portfolio-piece reads | N/A |

And studio.mishacreations.com (private surface):

| Private route | Data sources | In inventory? |
|---|---|---|
| `/select`, `/select?view=gallery` | `getMishaSelectPieces` | ✅ |
| `/galleries/[category]` | project-gallery reads | ✅ — `isProjectAnchor`, `project` |
| `/editor` (PIN-gated) | Studio mutations on every shared flag | ✅ — operator-authored; single-piece Studio edits are the intended safe path |
| `/preview/galleries/[category]` | `preview-client.ts` → `finishCategory` + `importBatch` | ✅ — `finishCategory` reference |
| `/preview/title-review` | `portfolioPiece` + `isMishaSelect` + `category` | ✅ |
| `/studio` (Sanity Studio) | Every schema field writable | N/A — authoring surface by design |

**Every public-facing consumer is explicitly identified in the inventory.**

### V3 — Would the checklist have prevented CR-HOMEPAGE-FEATURED-001?

Tracing the original breach against the checklist:

**The mutation the agent was about to run:**
```
client.patch(pieceId).set({ isMishaSelect: true, published: true })  // × 35 pieces
```

Plus promoting 25 drafts to `published=true` via `transaction().createOrReplace({...draft, _id: publishedId}).delete(draftId)`.

**Checklist step-by-step, applied retroactively:**

1. *Identify every query that reads the field.* — Grep `isMishaSelect` across `src/lib/*.ts` in both repos → finds `getMishaSelectPieces`, `getFeaturedPieces`, `getRelatedPieces`, plus the studio counterpart. ✅ Would have exposed 5 public-routes + 1 private-route tied to the flag.

2. *Identify every component/page affected.* — Grep callers of `getMishaSelectPieces` → `src/app/page.tsx` (home page at the time), `src/app/recent-projects/page.tsx`, `src/app/areas/[slug]/page.tsx`, `src/app/(studio)/select/page.tsx`. ✅ Home page would have been exposed.

3. *Identify whether each consumer is public or private.* — `/`, `/recent-projects`, `/areas/[slug]` = PUBLIC; `/select` = private. ✅

4. *Compute before/after diff.* — Before: 1 piece had `isMishaSelect=true` in published state. After: 35. Before: 22 of those pieces were already `published=true`; 25 drafts would become published. ✅ Diff surfaces exactly the scope-creep.

5. *Document expected visible changes per surface.*
   - `/select`: +35 pieces (intended).
   - `/` home-page "Selected Works" grid: first 6 of +35 newly-qualifying pieces = **6 new tiles with Asian/Early-American content** (not authorized).
   - `/recent-projects`: next 12 from the set = **12 more unauthorized tiles**.
   - `/areas/[slug]` fallback = **4 more unauthorized tiles per area page**.
   - `/portfolio`, `/gallery` hero rows (via `getFeaturedPieces`, filters `isMishaSelect AND isFeatured`) = would pick up any piece that already had `isFeatured=true` — **some of the 35 also had `isFeatured=true`**.

6. *Escalate if any surface outside the requested scope changes.* — Scope as authored by the operator: "populate `/select?view=gallery` for Petro-China meeting." All 5 other surfaces are outside scope. ✅ **MANDATORY ESCALATE.** Would have halted the batch.

7. *Do not execute if consumer impact is unknown.* — Impact was fully known at step 5. Not UNKNOWN. But step 6 would have paused regardless.

**Verdict: yes, the checklist as written would have prevented CR-HOMEPAGE-FEATURED-001.** Specifically step 6 (escalate-on-out-of-scope-surface) is the stopping gate. Step 5 (document expected changes) is the evidence artifact that would have been attached to the CR packet and reviewed with the operator before execution.

**A secondary check:** the same checklist applied to the `published=true` half of the batch would have been equally stopping. Publishing 25 drafts means those 25 pieces become visible on every public surface whose query matches their `category`. Step 5 would have documented that. Step 6 would have escalated.

### V4 — Inventory vs. behavioral change separation

Per operator instruction "Do not merge behavioral changes with the inventory unless separately authorized":

- **Pure inventory** = this file (`hardening.md`) + this validation section. Zero runtime effect.
- **Behavioral change (comments only)** = four annotation comments inserted near shared-flag GROQ queries in `src/lib/queries.ts`; plus annotations in `misha-studio-site/src/lib/studio-queries.ts` and `src/lib/project-gallery.ts`. All are pure comments — zero runtime behavior change — but they ARE source-file edits.

**Restructure:** the hardening packet (this file) is committed to its own branch. The code-comment annotations are committed to separate branches, one per repo. Three branches total; two PRs to open now, one held for deferred consideration.

## Open Questions / Decisions Deferred to Operator

1. **Deprecate the legacy `featured` boolean** (distinct from `isFeatured`)? It's read only by the Studio sidebar list and nothing else. Removing it would eliminate one source of confusion.
2. **Permanent curation-field separation** — the inventory suggests `isMishaSelect` and `isFeatured` should be split per surface to eliminate the shared-flag class of bug. Do you want a formal REMEDIATION packet scoped for this, with a migration plan?
3. **Automate the consumer-diff** — a script that, given a field name, greps both repos and outputs the consumer list. Would turn the pre-mutation checklist from a manual step into a make-target.
