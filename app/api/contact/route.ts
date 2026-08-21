import { NextResponse } from "next/server";

/** Where the letters land. An env var can point them elsewhere without a
 *  deploy, but the address is here so the form works out of the box. */
const TO = process.env.CONTACT_TO || "hi.lolikar@gmail.com";

/** The site's own address. lolikar.com is verified in Resend — DKIM at
 *  resend._domainkey, SPF and the return path on send.lolikar.com — so mail
 *  leaves as Lolikar rather than as Resend's shared onboarding@resend.dev.
 *
 *  The domain publishes DMARC p=reject with adkim=s, so an unsigned or
 *  misaligned letter is refused outright rather than filed as spam. That holds
 *  because Resend signs as lolikar.com itself. Point this at another address
 *  only under a domain Resend has verified. */
const FROM = process.env.CONTACT_FROM || "Lolikar <hi@lolikar.com>";

const MAX = { name: 100, email: 200, message: 5000 };

/** Header injection guard: a newline in a header line is how a crafted name
 *  smuggles extra headers into the message. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

const looksLikeEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const firstName = oneLine(str(body.firstName)).slice(0, MAX.name);
  const lastName = oneLine(str(body.lastName)).slice(0, MAX.name);
  const email = oneLine(str(body.email)).slice(0, MAX.email);
  const message = str(body.message).slice(0, MAX.message);

  /* The honeypot is invisible to people and irresistible to the bots that fill
     every field they find. Answer 200 so they have nothing to learn from. */
  if (str(body.website)) {
    return NextResponse.json({ ok: true });
  }

  if (!firstName || !lastName || !message || !looksLikeEmail(email)) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    /* No key means no letter. Say so rather than letting the form claim it
       sent something. */
    console.error("contact: RESEND_API_KEY is not set");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const who = `${firstName} ${lastName}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      /* So hitting reply in Gmail writes to the visitor, not to Resend. */
      reply_to: email,
      subject: `Лист із сайту — ${who}`,
      text: `${who}\n${email}\n\n${message}\n`,
      html:
        `<p><strong>${escapeHtml(who)}</strong><br>` +
        `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>` +
        `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("contact: resend refused", res.status, detail);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
