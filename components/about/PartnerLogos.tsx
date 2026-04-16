'use client'

import { useState } from 'react'
import type { PartnerLogo } from '@/lib/types'

export function PartnerLogos({ partners }: { partners: PartnerLogo[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {partners.map((p, i) => (
        <div
          key={p.name}
          onMouseEnter={() => setHoveredIdx(i)}
          onMouseLeave={() => setHoveredIdx(null)}
          style={{
            padding: '16px 24px',
            background: '#111',
            border: `1px solid ${hoveredIdx === i ? '#333' : '#1E1E1E'}`,
            borderRadius: '2px',
            fontSize: 13,
            color: hoveredIdx === i ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)',
            letterSpacing: '0.05em',
            transition: 'color 0.2s, border-color 0.2s',
            cursor: 'default',
          }}
        >
          {p.name}
        </div>
      ))}
    </div>
  )
}
