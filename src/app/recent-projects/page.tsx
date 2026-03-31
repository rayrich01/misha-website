import type { Metadata } from 'next'
import Link from 'next/link'
import { getMishaSelectPieces, getAllProjects } from '@/lib/queries'
import { COPY } from '@/lib/constants'
import { PortfolioCard } from '@/components/PortfolioCard'
import { SanityImage } from '@/components/SanityImage'
import { CtaSection } from '@/components/CtaSection'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Recent Projects | Misha Creations Houston',
  description:
    'Latest luxury murals & decorative finishes for River Oaks, Memorial & Tanglewood homes. Custom nurseries, Venetian plaster & specialty work.',
  alternates: {
    canonical: 'https://mishacreations.com/recent-projects',
  },
  openGraph: {
    title: 'Recent Luxury Decorative Painting Projects | Houston | Misha Creations',
    description:
      "Discover our latest luxury decorative painting projects in Houston's most prestigious neighborhoods.",
    url: 'https://mishacreations.com/recent-projects',
  },
}

export default async function RecentProjectsPage() {
  const [pieces, projects] = await Promise.all([
    getMishaSelectPieces(12),
    getAllProjects().catch(() => []),
  ])

  return (
    <>
      <section className="bg-ink pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h1 className="font-display text-[48px] md:text-[64px] text-cream mb-4">
            Recent Projects
          </h1>
          <p className="font-body text-lg text-mist max-w-2xl mx-auto mb-6">
            Latest luxury murals and decorative finishes for Houston&apos;s most prestigious homes
          </p>
          <p className="font-body text-sm text-muted">
            Trusted by homeowners in {COPY.socialProof.join(', ')}
          </p>
        </div>
      </section>

      {/* Project Galleries */}
      {projects.length > 0 && (
        <section className="py-12 md:py-16 bg-ink border-b border-warm">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="font-editorial text-2xl text-cream mb-8 text-center">
              Project Galleries
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link
                  key={project._id}
                  href={`/projects/${project.slug.current}`}
                  className="group relative block overflow-hidden rounded-lg bg-warm"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {project.heroImage?.asset ? (
                      <SanityImage
                        image={project.heroImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : project.pieces?.[0]?.heroImage?.asset ? (
                      <SanityImage
                        image={project.pieces[0].heroImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-ink/50 flex items-center justify-center">
                        <span className="text-muted text-sm">No preview</span>
                      </div>
                    )}
                    {/* Image count badge */}
                    <div className="absolute top-3 right-3 bg-ink/80 backdrop-blur-sm text-cream text-xs font-body px-2.5 py-1 rounded-full">
                      {project.pieceCount} {project.pieceCount === 1 ? 'image' : 'images'}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-editorial text-lg text-cream group-hover:text-gold transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="font-body text-sm text-mist mt-1 line-clamp-2">
                        {project.description}
                      </p>
                    )}
                    <span className="font-body text-xs text-gold mt-2 inline-block">
                      View Project &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Individual Pieces */}
      {pieces.length > 0 && (
        <section className="py-16 md:py-24 bg-warm">
          <div className="max-w-7xl mx-auto px-5">
            {projects.length > 0 && (
              <h2 className="font-editorial text-2xl text-cream mb-8 text-center">
                Featured Works
              </h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pieces.map((piece, i) => (
                <PortfolioCard
                  key={piece._id}
                  piece={piece}
                  showCategory
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={i < 3}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection
        headline="Inspired by What You See?"
        body="Every finish is one-of-a-kind. Call today for a complimentary consultation to begin your commission."
      />
    </>
  )
}
