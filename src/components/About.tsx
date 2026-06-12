'use client'

import Image from 'next/image'
import { useLang } from '@/lib/i18n'

export default function About() {
  const { t } = useLang()
  const a = t.about

  return (
    <section id="about" style={{ padding: '6rem 2rem', background: 'var(--cream-dark)' }}>
      <div className="about-grid" style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 260, height: 260, borderRadius: '50%', overflow: 'hidden', boxShadow: '4px 8px 32px rgba(44,32,24,0.12)' }}>
            <Image
              src="/avatar.png"
              alt="Olya — lolikar"
              width={400}
              height={400}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          <p style={{ fontFamily: "'Caveat', cursive", fontSize: '1.2rem', color: 'var(--brown-light)', letterSpacing: '0.02em' }}>
            {a.caption}
          </p>
        </div>

        {/* text */}
        <div>
          <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 600, color: 'var(--brown)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            {a.heading}
          </h2>

          <div style={{ fontSize: '1rem', color: 'var(--brown-light)', lineHeight: 1.9, display: 'flex', flexDirection: 'column', gap: '1rem', fontFamily: "'Quicksand', sans-serif" }}>
            <p>{a.p1}</p>
            <p>{a.p2}</p>
            <p>{a.p3}</p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href="https://www.instagram.com/by.lolikar"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.4rem', borderRadius: '100px', border: '1.5px solid var(--sage)', color: 'var(--brown)', textDecoration: 'none', fontSize: '0.85rem', transition: 'all 0.2s', fontFamily: "'Quicksand', sans-serif" }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--sage)'; e.currentTarget.style.color = 'white' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--brown)' }}
            >
              {a.instagram}
            </a>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: '1rem', color: 'var(--rose)', letterSpacing: '0.02em' }}>
              {a.commissions}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
