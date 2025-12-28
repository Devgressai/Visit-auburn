'use client'

const proofPoints = [
  { value: '35', label: 'Miles from Sacramento' },
  { value: '300+', label: 'Days of Sunshine' },
  { value: '100+', label: 'Miles of Trails' },
  { value: '50+', label: 'Local Restaurants' },
  { value: '1848', label: 'Year Founded' },
]

export function ProofChips() {
  return (
    <section className="py-6 md:hidden bg-cream-50">
      <div className="container mx-auto">
        {/* Mobile: horizontal scroll */}
        <div className="proof-chips px-4">
          {proofPoints.map((point) => (
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

