'use client'

import { useLang } from '@/lib/i18n'

export default function Hero() {
  const { t } = useLang()

  return (
    <section
      id="top"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '6rem 2rem 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, var(--sage-light) 1.5px, transparent 1.5px)',
        backgroundSize: '32px 32px',
        opacity: 0.4,
      }} />
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: 320, height: 320, borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', background: 'var(--rose-light)', opacity: 0.35, filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 280, height: 280, borderRadius: '40% 60% 30% 70% / 60% 40% 50% 50%', background: 'var(--sage-light)', opacity: 0.4, filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', right: '15%', width: 180, height: 180, borderRadius: '50%', background: 'var(--gold-light)', opacity: 0.35, filter: 'blur(50px)', pointerEvents: 'none' }} />

      <div className="fade-up" style={{ position: 'relative', zIndex: 1 }}>
        <p style={{
          fontSize: '0.8rem', letterSpacing: '0.25em', textTransform: 'uppercase',
          color: 'var(--sage)', marginBottom: '1.2rem', fontFamily: 'inherit',
        }}>
          {t.hero.tag}
        </p>

        <h1 style={{
          fontSize: 'clamp(5rem, 14vw, 11rem)', lineHeight: 0.85,
          letterSpacing: '-0.02em', color: 'var(--brown)', marginBottom: '2rem',
          background: 'none',
        }}>
          lolikar
        </h1>

        <p style={{
          fontSize: '1.1rem', color: 'var(--brown-light)', maxWidth: 440,
          lineHeight: 1.7, margin: '0 auto 6rem', whiteSpace: 'pre-line',
        }}>
          {t.hero.subtitle}
        </p>

        <a
          href="#works"
          style={{
            display: 'inline-block', padding: '0.85rem 2.5rem',
            background: 'var(--rose)', color: 'white', borderRadius: '100px',
            textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.1em',
            textTransform: 'uppercase', transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 20px rgba(201,75,122,0.3)', marginBottom: '2.5rem',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(201,75,122,0.4)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,75,122,0.3)' }}
        >
          {t.hero.cta}
        </a>

        <br />
        <span className="scroll-hint" style={{
          display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          color: 'var(--brown-light)', fontSize: '0.7rem', letterSpacing: '0.15em',
          textTransform: 'uppercase', opacity: 0.5, animation: 'float 2.5s ease-in-out infinite',
          verticalAlign: 'top',
        }}>
          <svg width="18" height="28" viewBox="0 0 24 38" fill="none">
            <rect x="1" y="1" width="22" height="36" rx="11" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span>{t.hero.scroll}</span>
        </span>
      </div>
    </section>
  )
}
