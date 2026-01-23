'use client'

import { PROOF_POINTS } from '@/lib/constants/stats'

export function ProofChips() {
  return (
    <section className="py-6 md:hidden bg-cream-50">
      <div className="container mx-auto">
        {/* Mobile: horizontal scroll */}
        <div className="proof-chips px-4">
          {PROOF_POINTS.map((point) => (
            <div key={point.label} className="proof-chip">
              <span className="proof-chip-value">{point.value}</span>
              <span className="proof-chip-label">{point.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

