import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'portfolioPiece',
  title: 'Portfolio Piece',
  type: 'document',
  groups: [
    { name: 'display',  title: 'Display',       default: true },
    { name: 'project',  title: 'Project' },
    { name: 'trade',    title: 'Trade Details' },
    { name: 'room',     title: 'Room & Space' },
    { name: 'color',    title: 'Color & Light' },
    { name: 'agent',    title: 'DFA-Agent' },
    { name: 'tech',     title: 'Technical' },
  ],
  fields: [
    /* ── Display ───────────────────────────────────────────── */
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'display' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, group: 'display' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string', group: 'display' }),
    defineField({
      name: 'category', title: 'Category', type: 'string', group: 'display',
      options: {
        list: [
          { title: 'Venetian Plaster',    value: 'venetian-plaster' },
          { title: 'Wall Murals',         value: 'wall-murals' },
          { title: 'Faux Finishes',       value: 'faux-finishes' },
          { title: "Trompe l'Oeil",       value: 'trompe-loeil' },
          { title: 'Decorative Ceilings', value: 'decorative-ceilings' },
          { title: 'Modello & Stencils',  value: 'modello-stencils' },
          { title: 'Themed Rooms',            value: 'themed-rooms' },
          { title: "Children's Rooms",      value: 'childrens-rooms' },
          { title: 'Skyscapes & Celestial', value: 'skyscapes' },
          { title: 'Commercial & Public Art', value: 'commercial' },
        ],
      },
    }),
    defineField({
      name: 'finishCategory',
      title: 'Finish Category (Reference)',
      type: 'reference',
      to: [{ type: 'finishCategory' }],
      description: 'Links to the finishCategory document — will replace string category after migration',
      group: 'display',
    }),
    defineField({ name: 'location', title: 'Location', type: 'string', group: 'display' }),
    defineField({
      name: 'heroImage', title: 'Hero Image', type: 'image', group: 'display',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
        defineField({ name: 'caption', title: 'Caption', type: 'string' }),
      ],
    }),
    defineField({
      name: 'images', title: 'Additional Images', type: 'array', group: 'display',
      of: [{
        type: 'image', options: { hotspot: true },
        fields: [
          defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
          defineField({ name: 'caption', type: 'string', title: 'Caption' }),
        ],
      }],
    }),
    defineField({
      name: 'orientation', title: 'Orientation', type: 'string', group: 'display',
      options: { list: ['portrait', 'landscape', 'square'], layout: 'radio' },
      initialValue: 'portrait',
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4, group: 'display' }),
    defineField({ name: 'featuredProject', title: 'Featured Project (legacy)', type: 'string', group: 'display',
      description: 'Deprecated — use project reference below',
      hidden: true,
    }),
    defineField({
      name: 'project', title: 'Project', type: 'reference', group: 'display',
      to: [{ type: 'studioProject' }],
      description: 'The studio project this piece belongs to',
    }),
    defineField({
      name: 'isProjectAnchor',
      title: 'Gallery Anchor',
      type: 'boolean',
      description: 'This piece represents the project in the gallery grid.',
      initialValue: false,
      group: 'project',
    }),
    defineField({
      name: 'showAsCompanion',
      title: 'Show in Lightbox Strip',
      type: 'boolean',
      description: 'Include in the companion thumbnail strip when anchor is opened.',
      initialValue: true,
      group: 'project',
    }),
    defineField({
      name: 'companionOrder',
      title: 'Companion Strip Order',
      type: 'number',
      description: 'Position in lightbox strip. Auto-managed by editor.',
      readOnly: true,
      group: 'project',
    }),
    defineField({
      name: 'flags', title: 'Flags', type: 'array', of: [{ type: 'string' }], group: 'display',
      options: {
        list: [
          { title: 'Retouch needed', value: 'retouch-needed' },
          { title: 'Lens flare',     value: 'lens-flare' },
          { title: 'Working title',  value: 'working-title' },
        ],
      },
    }),
    defineField({
      name: 'featured', title: 'Featured', type: 'boolean', group: 'display',
      initialValue: false,
    }),
    defineField({
      name: 'isFeatured', title: 'Featured Piece', type: 'boolean', group: 'display',
      description: 'Appears in featured slots on homepage and category hero',
      initialValue: false,
    }),
    defineField({
      name: 'featuredOrder', title: 'Featured Order', type: 'number', group: 'display',
      description: 'Display position in featured section (auto-managed)',
      readOnly: true,
    }),
    defineField({
      name: 'isMishaSelect', title: 'Misha Select', type: 'boolean', group: 'display',
      description: 'Hand-picked for the curated Misha Select gallery',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder', title: 'Display Order', type: 'number', group: 'display',
      description: 'Lower numbers appear first in gallery grids',
    }),
    defineField({
      name: 'imageClassification', title: 'Image Classification', type: 'array', group: 'display',
      of: [{ type: 'string' }],
      description: 'Tag this image for curation workflow',
      options: {
        list: [
          { title: '✅ Portfolio Ready',   value: 'portfolio-ready' },
          { title: '⭐ Hero Candidate',    value: 'hero-candidate' },
          { title: '👷 Crew at Work',      value: 'crew-at-work' },
          { title: '🔴 Before / Demo',     value: 'before' },
          { title: '🔧 In Progress / WIP', value: 'in-progress' },
          { title: '🔍 Crop Needed',       value: 'crop-needed' },
          { title: '📐 Upres Needed',      value: 'upres-needed' },
          { title: '🎨 PS Edit Needed',    value: 'ps-edit-needed' },
          { title: '📁 Misc / Reference',  value: 'misc' },
        ],
      },
    }),
    defineField({
      name: 'published', title: 'Published', type: 'boolean', group: 'display',
      initialValue: false,
    }),

    /* ── Trade Details ─────────────────────────────────────── */
    defineField({
      name: 'secondaryCategory', title: 'Secondary Category', type: 'string', group: 'trade',
      description: 'For images that span multiple finish types',
      options: {
        list: [
          { title: 'Venetian Plaster',      value: 'venetian-plaster' },
          { title: 'Wall Murals',           value: 'wall-murals' },
          { title: 'Faux Finishes',         value: 'faux-finishes' },
          { title: "Trompe l'Oeil",         value: 'trompe-loeil' },
          { title: 'Decorative Ceilings',   value: 'decorative-ceilings' },
          { title: 'Modello & Stencils',    value: 'modello-stencils' },
          { title: 'Themed Rooms',          value: 'themed-rooms' },
          { title: "Children's Rooms",      value: 'childrens-rooms' },
          { title: 'Skyscapes & Celestial', value: 'skyscapes' },
          { title: 'Commercial & Public Art', value: 'commercial' },
        ],
      },
    }),
    defineField({
      name: 'tertiaryCategory', title: 'Tertiary Category', type: 'string', group: 'trade',
      description: 'For images that span multiple finish types',
      options: {
        list: [
          { title: 'Venetian Plaster',      value: 'venetian-plaster' },
          { title: 'Wall Murals',           value: 'wall-murals' },
          { title: 'Faux Finishes',         value: 'faux-finishes' },
          { title: "Trompe l'Oeil",         value: 'trompe-loeil' },
          { title: 'Decorative Ceilings',   value: 'decorative-ceilings' },
          { title: 'Modello & Stencils',    value: 'modello-stencils' },
          { title: 'Themed Rooms',          value: 'themed-rooms' },
          { title: "Children's Rooms",      value: 'childrens-rooms' },
          { title: 'Skyscapes & Celestial', value: 'skyscapes' },
          { title: 'Commercial & Public Art', value: 'commercial' },
        ],
      },
    }),
    defineField({
      name: 'projectType', title: 'Project Type', type: 'string', group: 'trade',
      initialValue: 'residential',
      options: {
        list: [
          { title: 'Residential',          value: 'residential' },
          { title: 'Commercial / Public',  value: 'commercial' },
        ],
      },
    }),
    defineField({
      name: 'finishSubcategory', title: 'Finish Subcategory', type: 'string', group: 'trade',
      description: 'Subcategory within the finish type',
      options: {
        list: [
          // Venetian & Lime Plaster
          { title: 'Polished Venetian',    value: 'polished-venetian' },
          { title: 'Marmorino',            value: 'marmorino' },
          { title: 'Tadelakt',             value: 'tadelakt' },
          { title: 'Limewash',             value: 'limewash' },
          { title: 'Textured Plaster',     value: 'textured-plaster' },
          // Faux Finishes
          { title: 'Faux Wood',            value: 'faux-wood' },
          { title: 'Faux Cabinets',        value: 'faux-cabinets' },
          { title: 'Marbleizing',          value: 'marbleizing' },
          { title: 'Decorative Wall',      value: 'decorative-wall' },
          { title: 'Epoxy Floors',         value: 'epoxy-floors' },
          { title: 'Faux Brick',           value: 'faux-brick' },
          { title: 'Gilding & Metallic',   value: 'gilding-metallic' },
          { title: 'Crackle & Distressed', value: 'crackle-distressed' },
          { title: 'Faux Stone',           value: 'faux-stone' },
          { title: 'High-Gloss Lacquer',   value: 'high-gloss-lacquer' },
          // Wall Murals
          { title: 'Landscape',            value: 'landscape' },
          { title: 'Botanical',            value: 'botanical' },
          { title: 'Chinoiserie',          value: 'chinoiserie' },
          { title: 'Figurative',           value: 'figurative' },
          { title: 'Asian-Inspired',       value: 'asian-inspired' },
          { title: 'Tropical',             value: 'tropical' },
          { title: 'Powder Room',          value: 'powder-room' },
          { title: 'Abstract Mural',       value: 'abstract-mural' },
          { title: 'Classical & Historical', value: 'classical-historical' },
          // Trompe l'Oeil
          { title: 'Architectural Illusion', value: 'architectural-illusion' },
          { title: 'Scenic Illusion',      value: 'scenic-illusion' },
          { title: 'Grisaille Trompe-l\'Oeil', value: 'grisaille-trompe-loeil' },
          { title: 'Quadratura',           value: 'quadratura' },
          { title: 'Still Life in Niche',  value: 'still-life-niche' },
          // Skyscapes
          { title: 'Day Sky & Clouds',     value: 'day-sky-clouds' },
          { title: 'Night Stars & Galaxies', value: 'night-stars-galaxies' },
          { title: 'Airbrushed Sky',       value: 'airbrushed-sky' },
          { title: 'Celestial / Cosmic',   value: 'celestial-cosmic' },
          { title: 'Sunset / Sunrise',     value: 'sunset-sunrise' },
          // Decorative Ceilings
          { title: 'Sky Ceiling',          value: 'sky-ceiling' },
          { title: 'Medallion',            value: 'medallion' },
          { title: 'Coffered',             value: 'coffered' },
          { title: 'Gilded / Metallic',    value: 'gilded-metallic' },
          { title: "Trompe l'Oeil Dome",   value: 'trompe-oeil-dome' },
          { title: 'Ornamental Relief',    value: 'ornamental-relief' },
          { title: 'Scrollwork & Ornament', value: 'scrollwork-ornament' },
          // Modello & Stencils
          { title: 'Allover Pattern',      value: 'allover-pattern' },
          { title: 'Medallion Stencil',    value: 'medallion-stencil' },
          { title: 'Border Stencil',       value: 'border-stencil' },
          { title: 'Floor Stencil',        value: 'floor-stencil' },
          // Themed Rooms
          { title: 'Residential Theme',    value: 'residential-theme' },
          { title: 'Commercial Theme',     value: 'commercial-theme' },
          { title: 'Jerusalem',            value: 'jerusalem' },
          { title: 'Tropical Pool',        value: 'tropical-pool' },
          { title: 'Law Firm',             value: 'law-firm' },
          { title: 'Sealife',              value: 'sealife' },
          { title: 'Wine Cellar / Vineyard', value: 'wine-cellar' },
          { title: 'Home Theater',         value: 'home-theater' },
          // Children's Rooms
          { title: 'Whimsical',            value: 'whimsical' },
          { title: 'Nursery',              value: 'nursery' },
          { title: 'Adventure',            value: 'adventure' },
          { title: 'Fantasy',              value: 'fantasy' },
          { title: 'Educational',          value: 'educational' },
          // Commercial & Public Art
          { title: 'Lobby & Reception',    value: 'lobby-reception' },
          { title: 'Restaurant & Hospitality', value: 'restaurant-hospitality' },
          { title: 'Religious & Institutional', value: 'religious-institutional' },
          { title: 'Retail & Corporate',   value: 'retail-corporate' },
        ],
      },
    }),
    defineField({
      name: 'finishTechnique', title: 'Finish Technique', type: 'string', group: 'trade',
      description: 'Specific technique within category (e.g., Grassello, Burnished, Marmorino, Fresco)',
    }),
    defineField({
      name: 'finishVariant', title: 'Finish Variant', type: 'string', group: 'trade',
      description: 'Specific sub-type e.g. polished-venetian, chinoiserie, aged-fresco',
    }),
    defineField({
      name: 'tradeTags', title: 'Trade Search Tags', type: 'array', group: 'trade',
      of: [{ type: 'string' }],
      description: 'Keywords a designer or builder would search',
    }),
    defineField({
      name: 'isDetailCrop', title: 'Detail Crop', type: 'boolean', group: 'trade',
      description: 'True if this is a close-up texture/technique shot',
      initialValue: false,
    }),
    defineField({
      name: 'mishaComment', title: "Misha's Note", type: 'text', rows: 2, group: 'trade',
      description: "Voice note captured during Misha's image review",
    }),

    /* ── Room & Space ──────────────────────────────────────── */
    defineField({
      name: 'roomType', title: 'Room Type', type: 'string', group: 'room',
      options: {
        list: [
          'living-room', 'dining-room', 'bedroom', 'primary-bedroom',
          'bathroom', 'powder-room', 'kitchen', 'library', 'study',
          'office', 'entryway', 'foyer', 'hallway', 'staircase',
          'great-room', 'family-room', 'media-room', 'wine-cellar',
          'sunroom', 'conservatory', 'loggia', 'outdoor',
          'commercial', 'hospitality', 'ceiling-only',
          'architectural-detail', 'unknown'
        ],
      },
    }),
    defineField({
      name: 'surfaceOrientation', title: 'Surface Orientation', type: 'string', group: 'room',
      options: {
        list: ['wall', 'ceiling', 'floor', 'architectural-element', 'full-room', 'detail'],
      },
    }),
    defineField({
      name: 'roomScale', title: 'Room Scale', type: 'string', group: 'room',
      options: { list: ['intimate', 'medium', 'grand', 'unknown'] },
    }),

    /* ── Color & Light ─────────────────────────────────────── */
    defineField({
      name: 'colorTemperature', title: 'Color Temperature', type: 'string', group: 'color',
      options: {
        list: ['warm', 'cool', 'neutral', 'dramatic', 'ethereal'],
      },
    }),
    defineField({
      name: 'colorPalette', title: 'Color Palette', type: 'array', group: 'color',
      of: [{ type: 'string' }],
      description: '2-4 dominant colors in plain english',
    }),

    /* ── DFA-Agent Classification ─────────────────────────── */
    defineField({
      name: 'agentClassificationVersion', title: 'Taxonomy Version', type: 'string', group: 'agent',
      description: 'Taxonomy version used for classification (e.g., v1.0)',
      readOnly: true,
    }),
    defineField({
      name: 'agentClassificationConfidence', title: 'Classification Confidence', type: 'string', group: 'agent',
      options: {
        list: [
          { title: 'HIGH — auto-accept',    value: 'HIGH' },
          { title: 'MEDIUM — spot-check',   value: 'MEDIUM' },
          { title: 'REVIEW — human required', value: 'REVIEW' },
        ],
      },
      readOnly: true,
    }),
    defineField({
      name: 'agentClassificationModels', title: 'Models Used', type: 'array', group: 'agent',
      of: [{ type: 'string' }],
      description: 'Vision models used and their agreement status',
      readOnly: true,
    }),
    defineField({
      name: 'qualityScore', title: 'Quality Score', type: 'number', group: 'agent',
      description: 'Composite image quality score 0-100',
      readOnly: true,
    }),
    defineField({
      name: 'qualityFlags', title: 'Quality Flags', type: 'array', group: 'agent',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Needs Upscaling',  value: 'NEEDS_UPSCALING' },
          { title: 'Needs Sharpening', value: 'NEEDS_SHARPENING' },
          { title: 'Needs Lighting',   value: 'NEEDS_LIGHTING' },
          { title: 'Human Content',    value: 'HUMAN_CONTENT' },
          { title: 'Hero Candidate',   value: 'HERO_CANDIDATE' },
          { title: 'Reject',           value: 'REJECT' },
        ],
      },
      readOnly: true,
    }),
    defineField({
      name: 'referenceAnchors', title: 'Reference Anchors', type: 'array', group: 'agent',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'taxonomyNodeId', title: 'Taxonomy Node', type: 'string' }),
          defineField({ name: 'referenceImageId', title: 'Reference Image', type: 'string' }),
          defineField({ name: 'confidence', title: 'Confidence', type: 'number' }),
        ],
      }],
      description: 'Taxonomy nodes and reference images supporting classification',
      readOnly: true,
    }),
    defineField({
      name: 'humanReviewRequired', title: 'Human Review Required', type: 'boolean', group: 'agent',
      description: 'True if model disagreement or quality flag triggered review',
      initialValue: false,
      readOnly: true,
    }),
    defineField({
      name: 'humanReviewStatus', title: 'Human Review Status', type: 'string', group: 'agent',
      options: {
        list: [
          { title: 'Pending',   value: 'PENDING' },
          { title: 'Approved',  value: 'APPROVED' },
          { title: 'Rejected',  value: 'REJECTED' },
          { title: 'Corrected', value: 'CORRECTED' },
        ],
      },
    }),
    defineField({
      name: 'humanReviewNotes', title: 'Human Review Notes', type: 'text', rows: 3, group: 'agent',
      description: 'Reviewer observations and corrections',
    }),

    /* ── Technical ─────────────────────────────────────────── */
    defineField({
      name: 'assetId', title: 'Asset ID', type: 'string', group: 'tech',
    }),
    defineField({
      name: 'sourceFile', title: 'Source Filename', type: 'string', group: 'tech',
      description: 'Original filename from classification — used for deduplication',
      readOnly: true,
    }),
    defineField({
      name: 'importBatch', title: 'Import Batch', type: 'string', group: 'tech',
      description: 'Migration batch identifier — used for deduplication',
      readOnly: true,
    }),
    defineField({
      name: 'enrichmentConfidence', title: 'Enrichment Confidence', type: 'number', group: 'tech',
      description: 'AI confidence score from enrichment pass (0-1)',
      readOnly: true,
    }),
    defineField({
      name: 'archived', title: 'Archived', type: 'boolean', group: 'tech',
      description: 'Hide from site without deleting. Archived pieces remain recoverable.',
      initialValue: false,
    }),
    defineField({
      name: 'archivedAt', title: 'Archived At', type: 'datetime', group: 'tech',
      hidden: ({ document }) => !document?.archived,
      readOnly: true,
    }),
    defineField({
      name: 'archivedReason', title: 'Archive Reason', type: 'string', group: 'tech',
      hidden: ({ document }) => !document?.archived,
      description: 'Why this piece was archived — e.g. "duplicate", "low quality", "similar to IMG_3749"',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'assetId', media: 'heroImage', published: 'published' },
    prepare({ title, subtitle, media, published }) {
      return { title: `${published ? '' : '⬜ '}${title}`, subtitle, media }
    },
  },
})
