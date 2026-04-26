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

const Z_SCALE = [
  { token: '--z-base', val: 1, role: 'page content default' },
  { token: '--z-marquee', val: 10, role: 'horizontal marquee strips' },
  { token: '--z-nav', val: 20, role: 'global navbar' },
  { token: '--z-cursor', val: 50, role: 'custom cursor (trails everything)' },
  { token: '--z-page-transition', val: 100, role: 'page-change overlay' },
]

export default function DesignTestPage() {
  return (
    <div style={{ paddingBlock: 'var(--gap-y)' }}>
      {/* ── Header ─────────────────────────────────────── */}
      <section className="container" style={{ marginBottom: 'var(--gap-y)' }}>
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

      <hr className="divider" style={{ marginBottom: 'var(--gap-y)' }} />

      {/* ── 1. Color swatches ──────────────────────────── */}
      <section className="container" style={{ marginBottom: 'var(--gap-y)' }}>
        <p className="t-caption" style={{ marginBottom: 12 }}>§ 01 · Color</p>
        <h2 className="t-h2" style={{ marginBottom: 'var(--gap-y-sm)' }}>Swatches</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 'var(--gap-x)',
          }}
        >
          {SWATCHES.map((s) => (
            <div key={s.name}>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  background: s.hex,
                  border: 'var(--rule)',
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

      <hr className="divider" style={{ marginBottom: 'var(--gap-y)' }} />

      {/* ── 2. Type scale ──────────────────────────────── */}
      <section className="container" style={{ marginBottom: 'var(--gap-y)' }}>
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

          <Sample label=".t-h3 · clamp(20–28) · Fraunces 400 · opsz 36 · for sub-section heads">
            <p className="t-h3" style={{ margin: 0 }}>
              Certifications &amp; Standing
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

      <hr className="divider" style={{ marginBottom: 'var(--gap-y)' }} />

      {/* ── 3. Font comparison ─────────────────────────── */}
      <section className="container" style={{ marginBottom: 'var(--gap-y)' }}>
        <p className="t-caption" style={{ marginBottom: 12 }}>§ 03 · Font families</p>
        <h2 className="t-h2" style={{ marginBottom: 40 }}>3 families, same line</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-y-sm)' }}>
          <FontRow family="Fraunces (serif · headline)" stack="var(--font-serif)" />
          <FontRow family="Pretendard Variable (sans · body)" stack="var(--font-sans)" />
          <FontRow family="JetBrains Mono (mono · meta)" stack="var(--font-mono)" />
        </div>
      </section>

      <hr className="divider" style={{ marginBottom: 'var(--gap-y)' }} />

      {/* ── 4. Dividers ────────────────────────────────── */}
      <section className="container" style={{ marginBottom: 'var(--gap-y)' }}>
        <p className="t-caption" style={{ marginBottom: 12 }}>§ 04 · Dividers</p>
        <h2 className="t-h2" style={{ marginBottom: 32 }}>Hairlines</h2>

        <p className="t-caption" style={{ marginBottom: 8 }}>.divider · --rule (1px · --border)</p>
        <hr className="divider" style={{ marginBottom: 32 }} />

        <p className="t-caption" style={{ marginBottom: 8 }}>.divider-strong · --rule-strong (1px · --fg)</p>
        <hr className="divider-strong" style={{ marginBottom: 32 }} />

        <p className="t-caption" style={{ marginBottom: 8 }}>Inline em-dash divider · ⏤</p>
        <p style={{ margin: 0, color: 'var(--muted)' }}>
          캡션 앞 글리프로 사용 — <span style={{ color: 'var(--fg)' }}>⏤ Section A</span>
        </p>
      </section>

      <hr className="divider" style={{ marginBottom: 'var(--gap-y)' }} />

      {/* ── 5. Tracking scale (mono labels) ────────────── */}
      <section className="container" style={{ marginBottom: 'var(--gap-y)' }}>
        <p className="t-caption" style={{ marginBottom: 12 }}>§ 05 · Tracking</p>
        <h2 className="t-h2" style={{ marginBottom: 32 }}>Mono label spacings</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <TrackingRow
            tokenName="--tracking-tight"
            value="0.15em"
            usage="매체 표기 (SUBWAY · BUS)"
            sample="SUBWAY · BUS · LED"
            track="0.15em"
          />
          <TrackingRow
            tokenName="--tracking-caption"
            value="0.25em"
            usage="일반 캡션 (.t-caption)"
            sample="⏤ EDITOR'S NOTE"
            track="0.25em"
          />
          <TrackingRow
            tokenName="--tracking-label"
            value="0.3em"
            usage="강조 라벨, 마키"
            sample="✦ ISSUE 01 ─ SPRING 2026 ─ ✦"
            track="0.3em"
          />
        </div>
      </section>

      <hr className="divider" style={{ marginBottom: 'var(--gap-y)' }} />

      {/* ── 6. Container vs Container-text ─────────────── */}
      <section style={{ marginBottom: 'var(--gap-y)' }}>
        <div className="container" style={{ marginBottom: 'var(--gap-y-sm)' }}>
          <p className="t-caption" style={{ marginBottom: 12 }}>§ 06 · Layout</p>
          <h2 className="t-h2" style={{ marginBottom: 24 }}>Container widths</h2>
          <p style={{ color: 'var(--muted)', maxWidth: 640 }}>
            <code className="t-mono">.container</code>: 1320px (그리드).&nbsp;
            <code className="t-mono">.container-text</code>: 720px (긴 텍스트).
            아래 회색 띠 안에 두 폭 비교.
          </p>
        </div>

        <div style={{ background: 'var(--surface)', paddingBlock: 'var(--gap-y-sm)' }}>
          <div
            className="container"
            style={{
              background: 'var(--bg)',
              border: 'var(--rule)',
              padding: '20px 24px',
              marginBottom: 16,
            }}
          >
            <p className="t-mono" style={{ margin: 0, fontSize: 13 }}>
              .container · max 1320px · gutter clamp(20–56px)
            </p>
          </div>

          <div
            className="container-text"
            style={{
              background: 'var(--bg)',
              border: 'var(--rule)',
              padding: '20px 24px',
            }}
          >
            <p className="t-mono" style={{ margin: 0, fontSize: 13 }}>
              .container-text · max 720px · 본문 가독 폭
            </p>
          </div>
        </div>
      </section>

      <hr className="divider" style={{ marginBottom: 'var(--gap-y)' }} />

      {/* ── 7. Gap tokens ──────────────────────────────── */}
      <section className="container" style={{ marginBottom: 'var(--gap-y)' }}>
        <p className="t-caption" style={{ marginBottom: 12 }}>§ 07 · Gap</p>
        <h2 className="t-h2" style={{ marginBottom: 'var(--gap-y-sm)' }}>Spacing scale</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <GapRow token="--gap-x" value="24px" role="컬럼 간 가로 갭" />
          <GapRow token="--gap-y-sm" value="32px" role="같은 섹션 내 요소 간 세로 갭" />
          <GapRow token="--gap-y" value="80px" role="섹션 간 세로 갭" />
        </div>
      </section>

      <hr className="divider" style={{ marginBottom: 'var(--gap-y)' }} />

      {/* ── 8. Motion tokens ───────────────────────────── */}
      <section className="container" style={{ marginBottom: 'var(--gap-y)' }}>
        <p className="t-caption" style={{ marginBottom: 12 }}>§ 08 · Motion</p>
        <h2 className="t-h2" style={{ marginBottom: 32 }}>Easing &amp; durations</h2>

        <table style={{ width: '100%', borderCollapse: 'collapse', maxWidth: 720 }}>
          <thead>
            <tr style={{ borderBottom: 'var(--rule-strong)' }}>
              <Th>Token</Th>
              <Th>Value</Th>
              <Th>Use</Th>
            </tr>
          </thead>
          <tbody>
            <Tr token="--ease-edit" value="cubic-bezier(0.22, 1, 0.36, 1)" role="모든 트랜지션 기본 easing" />
            <Tr token="--dur-fast" value="0.2s" role="호버, 마이크로 인터랙션" />
            <Tr token="--dur" value="0.4s" role="기본 트랜지션" />
            <Tr token="--dur-slow" value="0.8s" role="디바이더 라인 드로잉, 페이지 전환" />
          </tbody>
        </table>
      </section>

      <hr className="divider" style={{ marginBottom: 'var(--gap-y)' }} />

      {/* ── 9. Z-index reference ───────────────────────── */}
      <section className="container" style={{ marginBottom: 'var(--gap-y)' }}>
        <p className="t-caption" style={{ marginBottom: 12 }}>§ 09 · Z-index</p>
        <h2 className="t-h2" style={{ marginBottom: 32 }}>Layer scale</h2>

        <table style={{ width: '100%', borderCollapse: 'collapse', maxWidth: 720 }}>
          <thead>
            <tr style={{ borderBottom: 'var(--rule-strong)' }}>
              <Th>Token</Th>
              <Th>Value</Th>
              <Th>Layer</Th>
            </tr>
          </thead>
          <tbody>
            {Z_SCALE.map((z) => (
              <Tr key={z.token} token={z.token} value={String(z.val)} role={z.role} />
            ))}
          </tbody>
        </table>
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

function TrackingRow({
  tokenName,
  value,
  usage,
  sample,
  track,
}: {
  tokenName: string
  value: string
  usage: string
  sample: string
  track: string
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--gap-x)', alignItems: 'baseline' }}>
      <div>
        <p className="t-mono" style={{ margin: 0, fontSize: 13, fontWeight: 500 }}>
          {tokenName}
        </p>
        <p className="t-mono" style={{ margin: '2px 0', fontSize: 12, color: 'var(--muted)' }}>
          {value}
        </p>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--muted)' }}>{usage}</p>
      </div>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          letterSpacing: track,
          textTransform: 'uppercase',
        }}
      >
        {sample}
      </p>
    </div>
  )
}

function GapRow({ token, value, role }: { token: string; value: string; role: string }) {
  const px = parseInt(value, 10)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--gap-x)', alignItems: 'center' }}>
      <div>
        <p className="t-mono" style={{ margin: 0, fontSize: 13, fontWeight: 500 }}>
          {token}
        </p>
        <p className="t-mono" style={{ margin: '2px 0', fontSize: 12, color: 'var(--muted)' }}>
          {value}
        </p>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--muted)' }}>{role}</p>
      </div>
      <div style={{ background: 'var(--accent)', height: 8, width: px }} aria-hidden />
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      className="t-caption"
      style={{ textAlign: 'left', padding: '12px 8px', color: 'var(--fg)' }}
    >
      {children}
    </th>
  )
}

function Tr({ token, value, role }: { token: string; value: string; role: string }) {
  return (
    <tr style={{ borderBottom: 'var(--rule)' }}>
      <td className="t-mono" style={{ padding: '12px 8px', fontSize: 13, fontWeight: 500 }}>
        {token}
      </td>
      <td className="t-mono" style={{ padding: '12px 8px', fontSize: 13, color: 'var(--muted)' }}>
        {value}
      </td>
      <td style={{ padding: '12px 8px', fontSize: 14, color: 'var(--muted)' }}>{role}</td>
    </tr>
  )
}
