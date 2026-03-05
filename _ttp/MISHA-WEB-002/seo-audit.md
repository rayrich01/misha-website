# SEO Audit — MISHA-WEB-002 (Phase 0 Retroactive)

Extracted from Readdy source: `readdy_react_site/project-5316871 (1)/`

## Business Identity (Readdy Source of Truth)

| Field | Readdy Value |
|---|---|
| Business Name | Misha Creations |
| Phone | (281) 650-0500 |
| Email | info@mishacreations.com |
| Address | Houston, TX, US |
| PostalCode | (not present in Readdy) |
| Geo Lat | 29.7604 |
| Geo Lng | -95.3698 |
| Price Range | $$$ |
| Opening Hours | Mo-Fr 09:00-18:00 |

> NOTE: index.html contains a conflicting phone "+1-281-734-0140" — this is
> stale. The page.tsx LocalBusiness uses (281) 650-0500 which is correct.

## Social / sameAs URLs

- https://www.google.com/maps/place/Misha+Creations
- https://www.instagram.com/mishacreations
- https://www.facebook.com/mishacreations
- https://www.pinterest.com/mishacreations

## Service Types (serviceType array)

- Custom Wall Murals
- Decorative Painting
- Faux Finishing
- Venetian Plaster
- Ceiling Murals
- Cabinet Glazing
- Limewash
- Trompe L'oeil

## Area Served

**Cities:** Houston, The Woodlands, Cypress, Spring, Tomball, Klein, Bellaire,
Katy, Sugar Land, Magnolia, Conroe, Pearland, Missouri City

**Neighborhoods:** River Oaks, Memorial, West University, Tanglewood,
Piney Point Village, Bunker Hill Village, Hunters Creek Village

## Page-by-Page Title/Description Comparison

### Homepage `/`
| | Readdy | misha-website |
|---|---|---|
| Title | Misha Creations \| Luxury Finishes & Murals Houston | Misha Creations \| Luxury Finishes & Murals Houston |
| Description | Custom luxury finishes, luxury faux finishes, wall murals... | Custom luxury finishes, luxury faux finishes, wall murals... |
| OG Title | Misha Creations \| Luxury Finishes, Wall Murals & Venetian Plaster in Houston | Misha Creations \| Luxury Finishes, Wall Murals & Venetian Plaster in Houston |
| Canonical | https://mishacreations.com/ | via metadataBase |
| JSON-LD | LocalBusiness (full) | LocalBusiness (full) |
| **Status** | **MATCH** | |

### About `/about`
| | Readdy | misha-website |
|---|---|---|
| Title | About Misha Creations \| Houston Artist | (check page metadata) |
| Description | Meet Misha, Houston's premier decorative artist... | (check page metadata) |
| **Status** | **VERIFY** | |

### Services `/services`
| | Readdy | misha-website |
|---|---|---|
| Title | Decorative Painting Houston \| Custom Wall Murals \| Venetian Plaster \| Misha Creations | (check page metadata) |
| Description | Master faux artist specializing in custom wall murals Houston... | (check page metadata) |
| **Status** | **VERIFY** | |

### Service Detail Pages `/services/[slug]`
Titles and descriptions are defined in `constants.ts FINISH_SURFACES[]` — verified matching Readdy slugs:
- luxury-wall-murals
- venetian-lime-plaster
- trompe-loeil-architectural-illusions
- childrens-themed-rooms
- themed-rooms-skyscapes
- decorative-ceilings
- faux-specialty-finishes
- modello-stencils

### Area Pages `/areas/[slug]`
- river-oaks-luxury-murals
- memorial
- tanglewood
- west-university
- the-woodlands
- bellaire

### Gallery `/gallery`
| | Readdy | misha-website |
|---|---|---|
| Title | Gallery \| Misha Creations Houston | (check page metadata) |
| Description | View our portfolio of luxury murals... | (check page metadata) |
| **Status** | **VERIFY** | |

### Blog `/blog`
| | Readdy | misha-website |
|---|---|---|
| Title | Decorative Painting Blog Houston... | (check page metadata) |
| **Status** | **VERIFY** | |

### FAQ `/faq`
| | Readdy | misha-website |
|---|---|---|
| Title | FAQ \| Misha Creations Houston | (check page metadata) |
| **Status** | **VERIFY** | |

### Recent Projects `/recent-projects`
| | Readdy | misha-website |
|---|---|---|
| Title | Recent Projects \| Misha Creations Houston | (check page metadata) |
| **Status** | **VERIFY** | |

## Redirect Parity

All Readdy client-side Navigate redirects are replicated as 301 redirects in
`next.config.ts`. See redirect table in that file.

## Gaps Identified

1. No postalCode in either Readdy or misha-website (acceptable — home-based business)
2. Readdy index.html has stale phone number (+1-281-734-0140) — irrelevant to new site
3. Readdy uses Readdy AI-generated og:image URLs — new site uses /og-image.jpg (correct)
4. Readdy has FAQPage schema on about, recent-projects, and service pages — new site does not (enhancement opportunity, not parity blocker)
