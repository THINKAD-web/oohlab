'use client'

import { useState } from 'react'

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

const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  background: '#111',
  border: '1px solid #222',
  borderRadius: '3px',
  color: '#FFFFFF',
  fontSize: 14,
  fontFamily: "'Pretendard', sans-serif",
  outline: 'none',
  transition: 'border-color 0.2s',
  appearance: 'none',
  WebkitAppearance: 'none',
}

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [values, setValues] = useState({
    name: '',
    company: '',
    tel: '',
    email: '',
    inquiryType: '',
    message: '',
  })

  const set = (key: keyof typeof values) =>
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

  const fieldStyle = (name: string): React.CSSProperties => ({
    ...INPUT_STYLE,
    borderColor: focusedField === name ? '#F37021' : '#222',
  })

  if (formState === 'success') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 400,
          textAlign: 'center',
          animation: 'ooh-fadein 0.6s ease both',
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(255,77,0,0.12)',
            border: '1px solid rgba(255,77,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            marginBottom: 24,
          }}
        >
          ✓
        </div>
        <h2
          style={{
            margin: '0 0 12px',
            fontSize: 24,
            fontWeight: 700,
            color: '#FFFFFF',
            fontFamily: "'Pretendard', sans-serif",
          }}
        >
          문의가 접수되었습니다.
        </h2>
        <p style={{ margin: '0 0 32px', fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
          24시간 내 담당자가 연락드립니다.<br />
          빠른 상담은 카카오톡을 이용해 주세요.
        </p>
        <a
          href={KAKAO_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '14px 28px',
            background: '#FAE100',
            color: '#191600',
            fontWeight: 700,
            fontSize: 14,
            borderRadius: '4px',
            textDecoration: 'none',
          }}
        >
          💬 카카오톡으로 이어 상담하기
        </a>
        <style>{`@keyframes ooh-fadein { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }`}</style>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p
        style={{
          margin: '0 0 32px',
          fontSize: 11,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
        }}
      >
        문의 폼
      </p>

      {/* 이름 + 회사 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <div>
          <label
            htmlFor="cf-name"
            style={{ display: 'block', marginBottom: 6, fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}
          >
            이름 *
          </label>
          <input
            id="cf-name"
            type="text"
            required
            placeholder="홍길동"
            value={values.name}
            onChange={set('name')}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            style={fieldStyle('name')}
          />
        </div>
        <div>
          <label
            htmlFor="cf-company"
            style={{ display: 'block', marginBottom: 6, fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}
          >
            회사/기관
          </label>
          <input
            id="cf-company"
            type="text"
            placeholder="(주)오랩"
            value={values.company}
            onChange={set('company')}
            onFocus={() => setFocusedField('company')}
            onBlur={() => setFocusedField(null)}
            style={fieldStyle('company')}
          />
        </div>
      </div>

      {/* 연락처 + 이메일 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <div>
          <label
            htmlFor="cf-tel"
            style={{ display: 'block', marginBottom: 6, fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}
          >
            연락처 *
          </label>
          <input
            id="cf-tel"
            type="tel"
            required
            placeholder="010-0000-0000"
            value={values.tel}
            onChange={set('tel')}
            onFocus={() => setFocusedField('tel')}
            onBlur={() => setFocusedField(null)}
            style={fieldStyle('tel')}
          />
        </div>
        <div>
          <label
            htmlFor="cf-email"
            style={{ display: 'block', marginBottom: 6, fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}
          >
            이메일
          </label>
          <input
            id="cf-email"
            type="email"
            placeholder="hello@company.com"
            value={values.email}
            onChange={set('email')}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            style={fieldStyle('email')}
          />
        </div>
      </div>

      {/* 문의 유형 */}
      <div style={{ marginBottom: 12 }}>
        <label
          htmlFor="cf-type"
          style={{ display: 'block', marginBottom: 6, fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}
        >
          문의 유형 *
        </label>
        <select
          id="cf-type"
          required
          value={values.inquiryType}
          onChange={set('inquiryType')}
          onFocus={() => setFocusedField('type')}
          onBlur={() => setFocusedField(null)}
          style={{
            ...fieldStyle('type'),
            color: values.inquiryType ? '#FFFFFF' : 'rgba(255,255,255,0.3)',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23666' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 14px center',
            paddingRight: 40,
          }}
        >
          <option value="" disabled style={{ background: '#111' }}>
            문의 유형 선택
          </option>
          {INQUIRY_TYPES.map((t) => (
            <option key={t} value={t} style={{ background: '#111', color: '#fff' }}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* 메시지 */}
      <div style={{ marginBottom: 24 }}>
        <label
          htmlFor="cf-message"
          style={{ display: 'block', marginBottom: 6, fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}
        >
          요청 내용
        </label>
        <textarea
          id="cf-message"
          rows={5}
          placeholder="예산 규모, 집행 기간, 목표 매체 등을 알려주시면 더 빠른 제안이 가능합니다."
          value={values.message}
          onChange={set('message')}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          style={{
            ...fieldStyle('message'),
            resize: 'vertical',
            minHeight: 120,
            lineHeight: 1.65,
          }}
        />
      </div>

      {/* 에러 메시지 */}
      {formState === 'error' && errorMessage && (
        <div
          role="alert"
          style={{
            marginBottom: 16,
            padding: '12px 14px',
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 3,
            fontSize: 13,
            color: '#FCA5A5',
            lineHeight: 1.5,
          }}
        >
          {errorMessage}
        </div>
      )}

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={formState === 'submitting'}
        data-cursor-pointer
        style={{
          width: '100%',
          padding: '18px',
          background: formState === 'submitting' ? '#333' : '#F37021',
          color: '#fff',
          fontWeight: 700,
          fontSize: 15,
          border: 'none',
          borderRadius: '4px',
          cursor: formState === 'submitting' ? 'not-allowed' : 'pointer',
          letterSpacing: '0.05em',
          fontFamily: "'Pretendard', sans-serif",
          transition: 'background 0.2s, transform 0.15s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        {formState === 'submitting' ? (
          <>
            <span
              style={{
                width: 16,
                height: 16,
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: '#fff',
                borderRadius: '50%',
                animation: 'ooh-spin 0.7s linear infinite',
                flexShrink: 0,
              }}
            />
            전송 중...
          </>
        ) : (
          '문의 보내기 →'
        )}
      </button>

      <p style={{ margin: '16px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.25)', textAlign: 'center', lineHeight: 1.5 }}>
        개인정보는 문의 답변 목적으로만 사용됩니다.
      </p>

      <style>{`
        @keyframes ooh-spin { to { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>
    </form>
  )
}
