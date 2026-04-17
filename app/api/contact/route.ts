import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

interface ContactPayload {
  name?: string
  company?: string
  tel?: string
  email?: string
  inquiryType?: string
  message?: string
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

async function sendResendEmail(body: Required<Omit<ContactPayload, 'company' | 'email' | 'message'>> & ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { skipped: true as const }

  const from = process.env.CONTACT_FROM_EMAIL || 'OOH-LAB <noreply@oohlab.co.kr>'
  const to = process.env.CONTACT_TO_EMAIL || 'contact@oohlab.co.kr'

  const rows: Array<[string, string]> = [
    ['이름', body.name],
    ['회사/기관', body.company || '-'],
    ['연락처', body.tel],
    ['이메일', body.email || '-'],
    ['문의 유형', body.inquiryType],
    ['내용', (body.message || '-').replace(/\n/g, '<br>')],
  ]

  const html = `
    <div style="font-family:'Pretendard',sans-serif;max-width:600px;padding:24px;background:#fafafa;">
      <h2 style="color:#F37021;margin:0 0 16px;font-size:18px;">오랩 웹사이트 문의 접수</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px;">
        ${rows
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding:10px 14px;background:#fff;border:1px solid #eee;width:110px;color:#666;font-weight:600;">${escapeHtml(k)}</td>
            <td style="padding:10px 14px;background:#fff;border:1px solid #eee;color:#222;">${escapeHtml(v)}</td>
          </tr>`
          )
          .join('')}
      </table>
      <p style="margin:16px 0 0;font-size:12px;color:#999;">OOH-LAB • 자동 발송 메일</p>
    </div>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: body.email || undefined,
      subject: `[오랩 문의] ${body.inquiryType} - ${body.name}`,
      html,
    }),
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    throw new Error(`Resend API error: ${res.status} ${errText}`)
  }

  return { skipped: false as const }
}

async function sendSlackNotification(body: ContactPayload) {
  const webhook = process.env.SLACK_WEBHOOK_URL
  if (!webhook) return { skipped: true as const }

  const text = [
    `*[오랩 웹사이트 문의]* ${body.inquiryType}`,
    `• 이름: ${body.name}`,
    `• 회사/기관: ${body.company || '-'}`,
    `• 연락처: ${body.tel}`,
    `• 이메일: ${body.email || '-'}`,
    body.message ? `• 내용: ${body.message}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  const res = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })

  if (!res.ok) throw new Error(`Slack webhook error: ${res.status}`)
  return { skipped: false as const }
}

export async function POST(req: NextRequest) {
  let body: ContactPayload
  try {
    body = (await req.json()) as ContactPayload
  } catch {
    return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
  }

  const { name, tel, inquiryType } = body

  if (!name?.trim() || !tel?.trim() || !inquiryType?.trim()) {
    return NextResponse.json(
      { error: '이름, 연락처, 문의 유형은 필수 입력 항목입니다.' },
      { status: 400 }
    )
  }

  if (!/^[\d\s\-+()]{7,20}$/.test(tel)) {
    return NextResponse.json({ error: '연락처 형식을 확인해 주세요.' }, { status: 400 })
  }

  if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json({ error: '이메일 형식을 확인해 주세요.' }, { status: 400 })
  }

  try {
    const [emailResult, slackResult] = await Promise.allSettled([
      sendResendEmail(body as never),
      sendSlackNotification(body),
    ])

    const bothSkipped =
      emailResult.status === 'fulfilled' &&
      emailResult.value.skipped &&
      slackResult.status === 'fulfilled' &&
      slackResult.value.skipped

    if (bothSkipped) {
      console.warn(
        '[contact] RESEND_API_KEY 및 SLACK_WEBHOOK_URL 미설정 — 문의 내용이 저장되지 않았습니다.',
        { name, tel, inquiryType }
      )
    }

    const emailFailed = emailResult.status === 'rejected'
    const slackFailed = slackResult.status === 'rejected'

    if (emailFailed && slackFailed) {
      console.error('[contact] 이메일·슬랙 모두 실패', {
        email: emailResult.status === 'rejected' ? emailResult.reason : null,
        slack: slackResult.status === 'rejected' ? slackResult.reason : null,
      })
      return NextResponse.json(
        { error: '전송에 실패했습니다. 카카오톡으로 문의해 주세요.' },
        { status: 500 }
      )
    }

    if (emailFailed) console.error('[contact] Resend 실패', emailResult.reason)
    if (slackFailed) console.error('[contact] Slack 실패', slackResult.reason)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact] 처리 중 예외 발생', err)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다. 카카오톡으로 문의해 주세요.' },
      { status: 500 }
    )
  }
}
