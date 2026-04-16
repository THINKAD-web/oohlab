import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, tel, inquiryType } = body

    // 필수값 검증
    if (!name || !tel || !inquiryType) {
      return NextResponse.json(
        { error: '필수 항목을 입력해 주세요.' },
        { status: 400 }
      )
    }

    // ── 이메일 발송 (nodemailer 또는 Resend API 사용 권장) ──
    // 실제 배포 시 아래 주석 해제 후 환경변수 설정
    //
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'noreply@oohlab.co.kr',
    //   to: 'contact@oohlab.co.kr',
    //   subject: `[오랩 문의] ${inquiryType} - ${name}`,
    //   html: `
    //     <h2>오랩 웹사이트 문의</h2>
    //     <p><strong>이름:</strong> ${name}</p>
    //     <p><strong>회사/기관:</strong> ${company || '-'}</p>
    //     <p><strong>연락처:</strong> ${tel}</p>
    //     <p><strong>이메일:</strong> ${email || '-'}</p>
    //     <p><strong>문의 유형:</strong> ${inquiryType}</p>
    //     <p><strong>내용:</strong><br>${message || '-'}</p>
    //   `,
    // })

    // ── 카카오워크/Slack 웹훅 발송 (선택) ──
    // if (process.env.SLACK_WEBHOOK_URL) {
    //   await fetch(process.env.SLACK_WEBHOOK_URL, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       text: `*[오랩 문의]* ${inquiryType}\n이름: ${name} | 연락처: ${tel}`,
    //     }),
    //   })
    // }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다. 카카오톡으로 문의해 주세요.' },
      { status: 500 }
    )
  }
}
