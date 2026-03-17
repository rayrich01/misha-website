# Manual Sanity Entry Required -- SEO-CATEGORY-001

SANITY_API_TOKEN not available for automated update.
Enter these `tradeDescription` values manually in studio.mishacreations.com
under the **finishCategory** documents.

These descriptions are keyword-optimized and match the `FINISH_DESCRIPTIONS`
values now in constants.ts. Updating Sanity ensures the descriptions are
also available via the CMS (currently falling back to constants).

---

## venetian-plaster (Venetian Lime Plaster)

**tradeDescription:**
Authentic lime-based Venetian plaster -- grassello, marmorino, and stucco veneziano -- applied by a master craftsman trained in the Italian tradition. Misha Creations has transformed walls in River Oaks estates, Memorial homes, and Tanglewood renovations for over 25 years. Each application is site-specific: color developed to your lighting, burnish level calibrated to your architecture. No shortcuts, no acrylic substitutes when lime is specified.

---

## wall-murals (Luxury Wall Murals)

**tradeDescription:**
Every mural begins with your architecture. Misha Creations designs and executes hand-painted wall murals scaled precisely to your elevations -- no digital prints, no wallpaper. Sketch approval before a single brush touches your wall. From intimate dining room panoramas to grand two-story entry installations, each piece is a commission built around your home's proportions, light, and design intent. The studio has completed residential murals throughout Houston's luxury neighborhoods and large-scale commercial installations including the Houston Zoo and Rainforest Cafe.

---

## trompe-loeil (Trompe L'Oeil & Architectural Illusions)

**tradeDescription:**
Trompe l'oeil -- the art of deceiving the eye -- is among the most technically demanding of all decorative arts. Misha Creations executes architectural illusions that transform flat walls into colonnaded galleries, painted bookcases into apparent libraries, ceilings into open skies, and plain surfaces into marble relief. The technique requires mastery of perspective, light behavior, and architectural proportion. Every composition is designed to read correctly from the specific viewing angles of your space. Misha's trompe l'oeil training under master decorative artist Nicola Vigini gives this work a pedigree few Houston artists can match.

---

## childrens-rooms (Children's Themed Rooms)

**tradeDescription:**
A child's room is the first environment that shapes their imagination. Misha Creations designs and executes hand-painted themed rooms, nursery murals, and full-envelope playroom environments -- from enchanted forests and underwater worlds to storybook characters and outer space adventures. All materials used in children's spaces are non-toxic and child-safe. Finishes are durable and cleanable. The studio has executed children's room environments for Houston families in River Oaks, Memorial, and Tanglewood with the same artistry applied to grand estate work.

---

## themed-rooms (Themed Rooms & Skyscapes)

**tradeDescription:**
The most ambitious of all decorative arts -- a room that becomes a complete world. Misha Creations designs and executes full-envelope themed environments where walls, ceiling, and architectural transitions disappear into a single continuous painted scene. Skyscape rooms dissolve the ceiling into open sky with rolling clouds that continue seamlessly onto the walls. Garden rooms open the space to painted terraces and distant landscapes. These immersive environments are the defining work of a master decorative artist -- the kind of spaces that stop visitors mid-step. Misha has executed themed environments for residential and commercial clients including the Houston Zoo and Rainforest Cafe.

---

## decorative-ceilings (Decorative Ceilings)

**tradeDescription:**
The fifth wall deserves the same attention as any other surface in a distinguished interior. Misha Creations specializes in decorative ceiling treatments for Houston homes -- from classic blue sky and cloud scenes for entries and breakfast rooms to trompe l'oeil architectural domes, gilded coffered panels, aged fresco treatments, and modello ornamental work. All ceiling projects are scaffold-coordinated and site-measured. Compositions are designed to read correctly from the primary viewing positions in your room.

---

## faux-finishes (Faux & Specialty Finishes)

**tradeDescription:**
Specialty faux finishes for Houston's most discerning interiors. Faux Carrara marble for powder rooms and entry halls. Faux travertine for kitchen niches and fireplace surrounds. Aged fresco effects for dining rooms. Metallic treatments for contemporary great rooms. Each finish is developed on-site with sample board approval before application -- you see exactly what you are commissioning before it goes on the wall.

---

## modello-stencils (Modello Stencils)

**tradeDescription:**
Modello stencils are professional-grade, adhesive-backed masking stencils used to create precise ornamental work with plaster, metallic compounds, and specialty coatings. Unlike craft stencils, modello systems allow master finishers to execute architectural ornament -- ceiling medallions, frieze borders, entry hall details, fireplace surrounds -- with the crispness of carved plasterwork at a fraction of the cost and time. Misha Creations uses the Modello system for custom residential and commercial ornamental projects throughout Houston.

---

## Future Sanity Schema Enhancement (optional)

The `finishCategory` schema in `misha-studio-site/sanity/schemas/finishCategory.ts`
does NOT currently have a `faqs` field. To move FAQ content into Sanity (instead of
keeping it in constants.ts), add:

```typescript
defineField({
  name: 'faqs',
  title: 'FAQs',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        defineField({ name: 'question', type: 'string', title: 'Question' }),
        defineField({ name: 'answer', type: 'text', title: 'Answer' }),
      ],
    },
  ],
}),
```

Then update the GROQ query in `queries.ts` to fetch `faqs[]{ question, answer }`
from finishCategory, and update the service page template to prefer Sanity FAQs
over the constants fallback.
