import Link from 'next/link'
import { COMPANY } from '@/lib/company'
import masthead from '@/data/masthead.json'

interface ColItem {
  label: string
  href?: string
  external?: boolean
}

function Column({ heading, items }: { heading: string; items: ColItem[] }) {
  if (!items.length) return null
  return (
    <div>
      <p className="t-caption" style={{ margin: '0 0 16px' }}>
        {heading}
      </p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((item) => (
          <li key={item.label}>
            {item.href ? (
              <Link
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="link-rule"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  color: 'var(--fg)',
                  lineHeight: 1.5,
                }}
              >
                {item.label}
                {item.external && <span aria-hidden> ↗</span>}
              </Link>
            ) : (
              <span style={{ fontSize: 14, color: 'var(--fg)', lineHeight: 1.5 }}>{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  // COMPANY uses `as const`; widen empty strings so optional fields can be filled later.
  const email = COMPANY.email as string
  const phone = COMPANY.phone as string
  const address = COMPANY.address as string
  const businessNumber = COMPANY.businessNumber as string
  const ceo = COMPANY.ceo as string

  const contact: ColItem[] = []
  if (email) contact.push({ label: email, href: `mailto:${email}` })
  if (phone) contact.push({ label: phone, href: `tel:${phone.replace(/[^0-9+]/g, '')}` })

  const office: ColItem[] = []
  if (address) office.push({ label: address })
  if (businessNumber) office.push({ label: `사업자 ${businessNumber}` })
  if (ceo) office.push({ label: `대표 ${ceo}` })

  const social: ColItem[] = []
  if (COMPANY.kakaoChannel) social.push({ label: 'KakaoTalk Channel', href: COMPANY.kakaoChannel, external: true })

  const legal: ColItem[] = [{ label: 'Privacy', href: '/privacy' }, { label: 'Sitemap', href: '/sitemap.xml' }]

  return (
    <footer
      role="contentinfo"
      style={{
        background: 'var(--bg)',
        borderTop: 'var(--rule)',
      }}
    >
      {/* ── Marquee strip placeholder (Phase 3 will animate) ───────────── */}
      <div
        aria-hidden
        style={{
          borderBottom: 'var(--rule)',
          overflow: 'hidden',
          paddingBlock: 12,
        }}
      >
        <div
          className="t-mono"
          style={{
            fontSize: 11,
            letterSpacing: 'var(--tracking-label)',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            whiteSpace: 'nowrap',
            paddingInline: 'var(--gutter)',
          }}
        >
          {masthead.marqueeText}
        </div>
      </div>

      {/* ── Colophon body ──────────────────────────────────────────────── */}
      <div className="container" style={{ paddingBlock: 'var(--gap-y)' }}>
        {/* Top row: COLOPHON label */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
          <p className="t-caption" style={{ margin: 0 }}>
            ⏤ Colophon
          </p>
        </div>

        {/* Huge wordmark */}
        <Link
          href="/"
          aria-label="OOH-LAB · Home"
          style={{
            display: 'block',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'var(--type-display)',
            letterSpacing: 'var(--track-display)',
            lineHeight: 0.96,
            fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'WONK' 1",
            color: 'var(--fg)',
            marginBottom: 'var(--gap-y)',
          }}
        >
          OOH-LAB
        </Link>

        {/* 4 columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--gap-x)',
            rowGap: 'var(--gap-y-sm)',
            marginBottom: 'var(--gap-y)',
          }}
        >
          <Column heading="Contact" items={contact} />
          <Column heading="Office" items={office} />
          <Column heading="Social" items={social} />
          <Column heading="Legal" items={legal} />
        </div>

        <hr className="divider" style={{ marginBottom: 24 }} />

        {/* Bottom meta row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <p
            className="t-mono"
            style={{
              margin: 0,
              fontSize: 11,
              letterSpacing: 'var(--tracking-tight)',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            № {masthead.issueNumber} · Vol. {masthead.volume} · {masthead.season}
          </p>
          <p
            className="t-mono"
            style={{
              margin: 0,
              fontSize: 11,
              letterSpacing: 'var(--tracking-tight)',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            © {year} {COMPANY.legalName} · Est. 2010
          </p>
        </div>
      </div>
    </footer>
  )
}
