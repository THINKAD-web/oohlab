import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design Tokens — Editorial System',
  robots: { index: false, follow: false },
}

const SWATCHES = [
  { name: '--bg', hex: '#FAFAF7', note: 'Paper / page background' },
  { name: '--fg', hex: '#0A0A0A', note: 'Ink / body text' },
  { name: '--accent', hex: '#C8102E', note: 'Editorial red · max 4 / page' },
  { name: '--muted', hex: '#6B6B6B', note: 'Captions, meta' },
  { name: '--border', hex: '#E5E2DB', note: 'Hairline dividers' },
  { name: '--surface', hex: '#F0EDE6', note: 'Section bg variant' },
]

export default function DesignTestPage() {
  return (
    <div style={{ paddingBlock: 80 }}>
      {/* ── Header ─────────────────────────────────────── */}
      <section className="container" style={{ marginBottom: 64 }}>
        <p className="t-caption" style={{ marginBottom: 16 }}>
          ⏤ Internal · Phase 1 verification
        </p>
        <h1 className="t-h1">
          Design Tokens<span className="t-italic"> &amp; Type</span>
        </h1>
        <p style={{ maxWidth: 640, marginTop: 16, color: 'var(--muted)' }}>
          이 페이지는 토큰 검증용 임시 라우트입니다. Phase 2~ 작업 끝나면 삭제됩니다.
          접근 경로는 <code className="t-mono">/design-test</code> 입니다.
        </p>
      </section>

      <hr className="divider" style={{ marginBottom: 64 }} />

      {/* ── 1. Color swatches ──────────────────────────── */}
      <section className="container" style={{ marginBottom: 80 }}>
        <p className="t-caption" style={{ marginBottom: 12 }}>§ 01 · Color</p>
        <h2 className="t-h2" style={{ marginBottom: 32 }}>Swatches</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 24,
          }}
        >
          {SWATCHES.map((s) => (
            <div key={s.name}>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  background: s.hex,
                  border: '1px solid var(--border)',
                  marginBottom: 12,
                }}
                aria-hidden
              />
              <p className="t-mono" style={{ margin: 0, fontSize: 13, fontWeight: 500 }}>
                {s.name}
              </p>
              <p className="t-mono" style={{ margin: '2px 0', fontSize: 12, color: 'var(--muted)' }}>
                {s.hex}
              </p>
              <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
                {s.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" style={{ marginBottom: 80 }} />

      {/* ── 2. Type scale ──────────────────────────────── */}
      <section className="container" style={{ marginBottom: 80 }}>
        <p className="t-caption" style={{ marginBottom: 12 }}>§ 02 · Typography scale</p>
        <h2 className="t-h2" style={{ marginBottom: 40 }}>Headlines &amp; meta</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
          <Sample label=".t-display · clamp(56–128) · Fraunces 300 · opsz 144">
            <p className="t-display" style={{ margin: 0 }}>
              Out of Home,<span className="t-italic"> Out of Ordinary.</span>
            </p>
          </Sample>

          <Sample label=".t-h1 · clamp(40–80) · Fraunces 300 · opsz 96">
            <p className="t-h1" style={{ margin: 0 }}>
              도시는 매체다.<br />
              <span className="t-italic">A city is a medium.</span>
            </p>
          </Sample>

          <Sample label=".t-h2 · clamp(32–56) · Fraunces 400 · opsz 72">
            <p className="t-h2" style={{ margin: 0 }}>
              15 Years · 800 Cases · 47 Cities
            </p>
          </Sample>

          <Sample label=".t-italic (within headlines) · WONK 1">
            <p className="t-h1" style={{ margin: 0 }}>
              <span className="t-italic">Works.</span> Editorial. <span className="t-italic">Bold.</span>
            </p>
          </Sample>

          <Sample label=".t-caption · 11px · JetBrains Mono · 0.25em · uppercase · muted">
            <p className="t-caption" style={{ margin: 0 }}>
              ⏤ Editor&rsquo;s Note · Issue 01 · Spring 2026
            </p>
          </Sample>

          <Sample label="Body · Pretendard Variable · 16/1.7">
            <p style={{ margin: 0, maxWidth: 640 }}>
              본문 텍스트입니다. Pretendard Variable이 한글 가독성을 책임집니다. 영문이 섞여도
              <em> Lorem ipsum dolor sit amet,</em> 자연스럽게 흐릅니다. 행간 1.7로 잡아 매거진의
              호흡을 유지합니다.
            </p>
          </Sample>
        </div>
      </section>

      <hr className="divider" style={{ marginBottom: 80 }} />

      {/* ── 3. Font comparison ─────────────────────────── */}
      <section className="container" style={{ marginBottom: 80 }}>
        <p className="t-caption" style={{ marginBottom: 12 }}>§ 03 · Font families</p>
        <h2 className="t-h2" style={{ marginBottom: 40 }}>3 families, same line</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <FontRow family="Fraunces (serif · headline)" stack="var(--font-serif)" />
          <FontRow family="Pretendard Variable (sans · body)" stack="var(--font-sans)" />
          <FontRow family="JetBrains Mono (mono · meta)" stack="var(--font-mono)" />
        </div>
      </section>

      <hr className="divider" style={{ marginBottom: 80 }} />

      {/* ── 4. Divider showcase ────────────────────────── */}
      <section className="container" style={{ marginBottom: 80 }}>
        <p className="t-caption" style={{ marginBottom: 12 }}>§ 04 · Dividers</p>
        <h2 className="t-h2" style={{ marginBottom: 32 }}>Hairlines only</h2>

        <p className="t-caption" style={{ marginBottom: 8 }}>.divider (1px · --border)</p>
        <hr className="divider" style={{ marginBottom: 40 }} />

        <p className="t-caption" style={{ marginBottom: 8 }}>Inline em-dash divider · ⏤</p>
        <p style={{ margin: 0, color: 'var(--muted)' }}>
          캡션 앞 글리프로 사용 — <span style={{ color: 'var(--fg)' }}>⏤ Section A</span>
        </p>
      </section>

      <hr className="divider" style={{ marginBottom: 80 }} />

      {/* ── 5. Container width ─────────────────────────── */}
      <section style={{ marginBottom: 80 }}>
        <div className="container" style={{ marginBottom: 24 }}>
          <p className="t-caption" style={{ marginBottom: 12 }}>§ 05 · Layout</p>
          <h2 className="t-h2" style={{ marginBottom: 24 }}>Container vs full-bleed</h2>
          <p style={{ color: 'var(--muted)', maxWidth: 640 }}>
            <code className="t-mono">.container</code>: max-width <code className="t-mono">var(--max-w)</code> = 1320px,
            gutters <code className="t-mono">clamp(20px, 4vw, 56px)</code>.
            아래 회색 띠가 .container 폭, 그 바깥은 full-bleed.
          </p>
        </div>

        {/* Full-bleed band */}
        <div style={{ background: 'var(--surface)', paddingBlock: 24, position: 'relative' }}>
          <div className="container">
            <div
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                padding: '20px 24px',
              }}
            >
              <p className="t-mono" style={{ margin: 0, fontSize: 13 }}>
                .container · max 1320px · gutter clamp(20–56px)
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" style={{ marginBottom: 32 }} />

      {/* ── Footer note ────────────────────────────────── */}
      <section className="container">
        <p className="t-caption" style={{ color: 'var(--accent)' }}>
          ✦ Phase 1 · Tokens shipped · Awaiting sign-off
        </p>
      </section>
    </div>
  )
}

function Sample({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="t-caption" style={{ marginBottom: 12 }}>
        {label}
      </p>
      {children}
    </div>
  )
}

function FontRow({ family, stack }: { family: string; stack: string }) {
  return (
    <div>
      <p className="t-caption" style={{ marginBottom: 8 }}>
        {family}
      </p>
      <p style={{ fontFamily: stack, fontSize: 24, margin: 0, lineHeight: 1.4 }}>
        도시는 매체다 — A city is a medium. №01 / 2026
      </p>
    </div>
  )
}
