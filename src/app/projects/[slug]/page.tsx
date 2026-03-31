import type { Metadata } from 'next'
import Link from 'next/link'
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/queries'
import { PortfolioCard } from '@/components/PortfolioCard'
import { SanityImage } from '@/components/SanityImage'
import { CtaSection } from '@/components/CtaSection'
import { JsonLd } from '@/components/JsonLd'
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs().catch(() => [])
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug).catch(() => null)
  if (!project) return { title: 'Project | Misha Creations' }

  const title = `${project.title} | Project Gallery | Misha Creations Houston`
  const description = project.description
    || `Explore the ${project.title} project by Misha Creations — ${project.pieceCount} hand-painted images from this custom decorative painting project in Houston.`

  return {
    title,
    description: description.slice(0, 160),
    alternates: { canonical: `https://mishacreations.com/projects/${slug}` },
    openGraph: { title, description: description.slice(0, 160), url: `https://mishacreations.com/projects/${slug}` },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) notFound()

  // Filter out null refs (unresolved), unpublished, and archived pieces
  const pieces = (project.pieces || []).filter(
    (p: any) => p && p._id && p.heroImage?.asset
  )

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: project.title,
    description: project.description || `A ${pieces.length}-image project by Misha Creations`,
    numberOfItems: pieces.length,
    author: {
      '@type': 'LocalBusiness',
      name: 'Misha Creations',
      url: 'https://mishacreations.com',
    },
  }

  return (
    <>
      <JsonLd data={projectSchema} />

      {/* Hero */}
      <section className="bg-ink pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-gold mb-4">
            Project Gallery
          </p>
          <h1 className="font-display text-[36px] md:text-[52px] text-cream mb-4 leading-tight">
            {project.title}
          </h1>
          {project.description && (
            <p className="font-editorial text-lg md:text-xl text-mist max-w-2xl mx-auto mb-4">
              {project.description}
            </p>
          )}
          <p className="font-body text-sm text-muted">
            {pieces.length} {project.pieceCount === 1 ? 'image' : 'images'} in this project
          </p>
          <div className="w-8 h-px bg-gold mx-auto mt-6" />
        </div>
      </section>

      {/* Hero Image */}
      {project.heroImage?.asset && (
        <section className="bg-ink pb-8">
          <div className="max-w-5xl mx-auto px-5">
            <div className="relative aspect-[3/2] overflow-hidden rounded-xl">
              <SanityImage
                image={project.heroImage}
                alt={project.heroImage.alt || project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Image Grid */}
      <section className="bg-ink py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pieces.map((piece) => (
              <PortfolioCard key={piece._id} piece={piece} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            ))}
          </div>
        </div>
      </section>

      {/* Back nav */}
      <section className="bg-warm py-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-wrap gap-4 justify-center">
          <Link
            href="/recent-projects"
            className="font-body text-sm text-mist hover:text-gold transition-colors"
          >
            &larr; All Projects
          </Link>
          <Link
            href="/portfolio"
            className="font-body text-sm text-mist hover:text-gold transition-colors"
          >
            View Full Portfolio
          </Link>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
