import { COPY } from '@/lib/constants'

export function NeighborhoodStrip() {
  return (
    <section className="bg-sand py-6">
      <div className="max-w-7xl mx-auto px-5">
        <p className="text-center font-body text-sm text-bronze tracking-wide">
          Trusted by homeowners in{' '}
          {COPY.socialProof.map((name, i) => (
            <span key={name}>
              <span className="font-medium text-charcoal">{name}</span>
              {i < COPY.socialProof.length - 1 && <span className="text-bronze"> &middot; </span>}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
