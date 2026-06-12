import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'lolikar portfolio <onboarding@resend.dev>',
      to: 'vladyslava.kulhova@gmail.com',
      replyTo: email,
      subject: `Commission from ${name}`,
      text: `Hi Olya!\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
