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
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 500, color: 'var(--brown)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            {a.heading}
          </h2>

          <div style={{ fontSize: '1rem', color: 'var(--brown-light)', lineHeight: 1.9, display: 'flex', flexDirection: 'column', gap: '1rem', fontFamily: 'inherit' }}>
            <p>{a.p1}</p>
            <p>{a.p2}</p>
            <p>{a.p3}</p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {[
              { href: 'https://www.instagram.com/by.lolikar', label: a.instagram, color: 'var(--rose)' },
              { href: 'https://www.behance.net/nikolska', label: a.behance, color: 'var(--brown)' },
              { href: 'https://www.linkedin.com/in/olha-nikolska-5222b23b0/', label: a.linkedin, color: '#0A66C2' },
            ].map(({ href, label, color }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 1.2rem', borderRadius: '100px', border: `1.5px solid ${color}`, color, textDecoration: 'none', fontSize: '0.82rem', transition: 'all 0.2s', fontFamily: 'inherit' }}
                onMouseEnter={e => { e.currentTarget.style.background = color; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = color }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = color; e.currentTarget.style.borderColor = color }}
              >
                {label}
              </a>
            ))}
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: '1rem', color: 'var(--rose)', letterSpacing: '0.02em' }}>
              {a.commissions}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
