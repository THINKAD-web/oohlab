'use client'

import { useState } from 'react'
import masthead from '@/data/masthead.json'
import { COMPANY } from '@/lib/company'
import { useInView } from '@/lib/hooks'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const INQUIRY_TYPES = [
  '매체 제안 요청',
  '지자체·공공기관 상담',
  'DOOH 집행',
  '미디어믹스 플랜',
  '기타 문의',
]

const KAKAO_URL =
  process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL ||
  'https://pf.kakao.com/_OOHLABchannel'

// Optional fields on lib/company.ts are typed as `''` literals via `as const`.
const EMAIL = (COMPANY.email as string) || 'contact@oohlab.co.kr'
const GOV_EMAIL = 'gov@oohlab.co.kr'

// ─── § 01 · Cover ───────────────────────────────────────────────────────────

function CoverSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.05)
  return (
    <section
      data-page="01"
      data-page-label="Cover"
      style={{ paddingBlock: 'clamp(64px, 10vw, 120px) var(--gap-y-sm)' }}
    >
      <div
        ref={ref}
        className={`container stagger${inView ? ' is-visible' : ''}`}
      >
        <p className="t-caption" style={{ margin: 0 }}>
          ⏤ Issue {String(Number(masthead.issueNumber) + 1).padStart(2, '0')} · Submission
        </p>

        <h1 className="t-display" style={{ margin: '16px 0 0', maxWidth: '78%' }}>
          Next <span className="t-italic">Issue.</span>
        </h1>

        <p
          style={{
            margin: '32px 0 0',
            maxWidth: 540,
            fontSize: 'var(--type-body)',
            color: 'var(--muted)',
            lineHeight: 1.7,
          }}
        >
          프로젝트 문의 · 24시간 내 회신.
          매체 선정부터 집행·정산까지 한 번에 처리합니다.
        </p>
      </div>
    </section>
  )
}

// ─── § 02 · Direct (kakao / email) ──────────────────────────────────────────

function DirectSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15)
  const items: { label: string; value: string; href: string; external?: boolean }[] = [
    { label: 'KakaoTalk', value: 'pf.kakao.com/_OOHLABchannel', href: KAKAO_URL, external: true },
    { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  ]
  return (
    <section
      data-page="02"
      data-page-label="Direct"
      style={{ paddingBlock: 'var(--gap-y-sm)', borderTop: 'var(--rule)' }}
    >
      <div
        ref={ref}
        className={`container stagger${inView ? ' is-visible' : ''}`}
      >
        <p className="t-caption" style={{ margin: 0 }}>
          § Direct
        </p>

        <hr className="divider divider-draw" style={{ marginTop: 16 }} />

        <dl style={{ margin: 0 }}>
          {items.map((it) => (
            <div
              key={it.label}
              style={{
                display: 'grid',
                gridTemplateColumns: '160px 1fr',
                gap: 'var(--gap-x)',
                paddingBlock: 18,
                borderBottom: 'var(--rule)',
              }}
            >
              <dt
                className="t-mono"
                style={{
                  margin: 0,
                  fontSize: 11,
                  letterSpacing: 'var(--tracking-tight)',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                }}
              >
                {it.label}
              </dt>
              <dd style={{ margin: 0 }}>
                <a
                  href={it.href}
                  target={it.external ? '_blank' : undefined}
                  rel={it.external ? 'noopener noreferrer' : undefined}
                  className="link-rule"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 14,
                    color: 'var(--fg)',
                  }}
                >
                  {it.value}
                  {it.external ? ' ↗' : ' →'}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

// ─── § 03 · Submission form (underline-only) ────────────────────────────────

function SubmissionSection() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [values, setValues] = useState({
    name: '',
    company: '',
    tel: '',
    email: '',
    inquiryType: '',
    message: '',
  })

  const set =
    (key: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setFormState('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || '전송에 실패했습니다.')
      }
      setFormState('success')
    } catch (err) {
      setFormState('error')
      setErrorMessage(
        err instanceof Error
          ? err.message
          : '네트워크 오류가 발생했습니다. 카카오톡으로 문의해 주세요.'
      )
    }
  }

  if (formState === 'success') return <SuccessState />

  return (
    <section
      data-page="03"
      data-page-label="Submission"
      style={{
        paddingBlock: 'var(--gap-y)',
        background: 'var(--surface)',
        borderTop: 'var(--rule)',
        borderBottom: 'var(--rule)',
      }}
    >
      <div className="container-text">
        <p className="t-caption" style={{ margin: 0 }}>
          ⏤ Submission
        </p>

        <h2 className="t-h2" style={{ margin: '16px 0 0' }}>
          Submit a <span className="t-italic">brief.</span>
        </h2>

        <p
          style={{
            margin: '20px 0 0',
            color: 'var(--muted)',
            fontSize: 'var(--type-small)',
            lineHeight: 1.7,
          }}
        >
          예산 규모, 집행 기간, 목표 매체 등을 알려주시면 더 빠른 제안이 가능합니다.
          <br />
          <span style={{ color: 'var(--accent)' }}>*</span> 표시된 항목은 필수.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          style={{
            marginTop: 'var(--gap-y-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
          }}
        >
          <Field id="cf-name" label="Name" required value={values.name} onChange={set('name')} />
          <Field id="cf-company" label="Company / Institution" value={values.company} onChange={set('company')} />
          <Field
            id="cf-tel"
            label="Phone"
            required
            type="tel"
            placeholder="010 0000 0000"
            value={values.tel}
            onChange={set('tel')}
          />
          <Field
            id="cf-email"
            label="Email"
            type="email"
            placeholder="hello@company.com"
            value={values.email}
            onChange={set('email')}
          />

          <SelectField
            id="cf-type"
            label="Inquiry"
            required
            value={values.inquiryType}
            onChange={set('inquiryType')}
            options={INQUIRY_TYPES}
            placeholder="유형 선택"
          />

          <TextAreaField
            id="cf-message"
            label="Brief"
            value={values.message}
            onChange={set('message')}
            rows={5}
          />

          {formState === 'error' && errorMessage && (
            <p
              role="alert"
              style={{
                margin: 0,
                paddingBlock: 12,
                borderTop: '1px solid var(--accent)',
                borderBottom: '1px solid var(--accent)',
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                letterSpacing: 'var(--tracking-tight)',
                textTransform: 'uppercase',
                color: 'var(--accent)',
              }}
            >
              ✕ {errorMessage}
            </p>
          )}

          <SubmitButton state={formState} />

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
            ⏤ 개인정보는 문의 답변 목적으로만 사용됩니다.
          </p>
        </form>
      </div>
    </section>
  )
}

function SuccessState() {
  return (
    <section
      data-page="03"
      data-page-label="Submitted"
      style={{
        paddingBlock: 'var(--gap-y)',
        background: 'var(--surface)',
        borderTop: 'var(--rule)',
        borderBottom: 'var(--rule)',
      }}
    >
      <div className="container-text">
        <p className="t-caption" style={{ margin: 0, color: 'var(--accent)' }}>
          ✦ Submitted
        </p>
        <h2 className="t-h2" style={{ margin: '16px 0 0' }}>
          Brief <span className="t-italic">received.</span>
        </h2>
        <p
          style={{
            margin: '20px 0 0',
            fontSize: 'var(--type-body)',
            color: 'var(--fg)',
            lineHeight: 1.8,
          }}
        >
          24시간 내 담당 에디터가 회신합니다. 더 빠른 답변은 카카오톡 채널로.
        </p>
        <div style={{ marginTop: 'var(--gap-y-sm)' }}>
          <a
            href={KAKAO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="link-rule"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              letterSpacing: 'var(--tracking-tight)',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              fontWeight: 500,
            }}
          >
            ✦ KakaoTalk channel ↗
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── § 04 · Public sector ───────────────────────────────────────────────────

function PublicSectorSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15)
  return (
    <section
      data-page="04"
      data-page-label="Public sector"
      style={{ paddingBlock: 'var(--gap-y)' }}
    >
      <div
        ref={ref}
        className={`container stagger${inView ? ' is-visible' : ''}`}
      >
        <p className="t-caption" style={{ margin: 0 }}>
          § Public sector / Government
        </p>

        <h2 className="t-h2" style={{ margin: '16px 0 0', maxWidth: 720 }}>
          Direct line for{' '}
          <span className="t-italic">municipalities &amp; agencies.</span>
        </h2>

        <p
          style={{
            margin: '20px 0 0',
            maxWidth: 600,
            color: 'var(--muted)',
            fontSize: 'var(--type-body)',
            lineHeight: 1.7,
          }}
        >
          여성기업인증 보유 — 일정 금액 이하 수의계약 가능, 공공입찰 가산점.
          예산·목적·일정을 알려주시면 맞춤 제안서를 보내드립니다.
        </p>

        <div style={{ marginTop: 'var(--gap-y-sm)' }}>
          <a
            href={`mailto:${GOV_EMAIL}`}
            className="link-rule"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              letterSpacing: 'var(--tracking-tight)',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              fontWeight: 500,
            }}
          >
            → {GOV_EMAIL}
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Form primitives (underline-only) ───────────────────────────────────────

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: 8,
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  letterSpacing: 'var(--tracking-tight)',
  textTransform: 'uppercase',
  color: 'var(--muted)',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 0,
  borderBottom: '1px solid var(--border)',
  padding: '10px 0',
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--type-body)',
  color: 'var(--fg)',
  outline: 'none',
  borderRadius: 0,
  transition: 'border-color var(--dur-fast) var(--ease-edit)',
}

function focusStyle(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderBottomColor = 'var(--fg)'
}
function blurStyle(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderBottomColor = 'var(--border)'
}

function FieldLabel({ id, label, required }: { id: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={id} style={labelStyle}>
      {label} {required && <span style={{ color: 'var(--accent)' }}>*</span>}
    </label>
  )
}

function Field({
  id,
  label,
  required,
  type = 'text',
  placeholder,
  value,
  onChange,
}: {
  id: string
  label: string
  required?: boolean
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <FieldLabel id={id} label={label} required={required} />
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={focusStyle}
        onBlur={blurStyle}
        style={inputStyle}
      />
    </div>
  )
}

function TextAreaField({
  id,
  label,
  value,
  onChange,
  rows = 4,
}: {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
}) {
  return (
    <div>
      <FieldLabel id={id} label={label} />
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        onFocus={focusStyle}
        onBlur={blurStyle}
        rows={rows}
        style={{
          ...inputStyle,
          resize: 'vertical',
          minHeight: 120,
          lineHeight: 1.7,
          padding: '10px 0',
        }}
      />
    </div>
  )
}

function SelectField({
  id,
  label,
  required,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string
  label: string
  required?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: string[]
  placeholder: string
}) {
  return (
    <div>
      <FieldLabel id={id} label={label} required={required} />
      <div style={{ position: 'relative' }}>
        <select
          id={id}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={focusStyle}
          onBlur={blurStyle}
          style={{
            ...inputStyle,
            appearance: 'none',
            WebkitAppearance: 'none',
            paddingRight: 24,
            color: value ? 'var(--fg)' : 'var(--muted)',
            cursor: 'pointer',
          }}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o} style={{ color: 'var(--fg)' }}>
              {o}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          style={{
            position: 'absolute',
            right: 4,
            bottom: 12,
            pointerEvents: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--muted)',
          }}
        >
          ▾
        </span>
      </div>
    </div>
  )
}

function SubmitButton({ state }: { state: FormState }) {
  const submitting = state === 'submitting'
  return (
    <button
      type="submit"
      disabled={submitting}
      data-cursor="button"
      style={{
        alignSelf: 'flex-start',
        padding: '14px 28px',
        background: submitting ? 'transparent' : 'var(--accent)',
        color: submitting ? 'var(--muted)' : 'var(--bg)',
        border: '1px solid var(--accent)',
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        letterSpacing: 'var(--tracking-tight)',
        textTransform: 'uppercase',
        fontWeight: 500,
        cursor: submitting ? 'not-allowed' : 'pointer',
        transition:
          'background var(--dur-fast) var(--ease-edit), color var(--dur-fast) var(--ease-edit)',
      }}
      onMouseEnter={(e) => {
        if (submitting) return
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.color = 'var(--accent)'
      }}
      onMouseLeave={(e) => {
        if (submitting) return
        e.currentTarget.style.background = 'var(--accent)'
        e.currentTarget.style.color = 'var(--bg)'
      }}
    >
      {submitting ? '⏤ Sending…' : '✦ Submit brief →'}
    </button>
  )
}

// ─── Composition ────────────────────────────────────────────────────────────

export function EditorialContact() {
  return (
    <>
      <CoverSection />
      <DirectSection />
      <SubmissionSection />
      <PublicSectorSection />
    </>
  )
}
