'use client'

import Image from 'next/image'

export default function About() {
  return (
    <section
      id="about"
      style={{ padding: '6rem 2rem', background: 'var(--cream-dark)' }}
    >
      <div style={{
        maxWidth: 900,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1.5fr',
        gap: '5rem',
        alignItems: 'center',
      }}>

        {/* avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: 260, height: 260,
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '4px 8px 32px rgba(44,32,24,0.12)',
          }}>
            <Image
              src="/avatar.png"
              alt="Olya — lolikar"
              width={400}
              height={400}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          <p style={{
            fontFamily: "'Caveat', cursive",
            fontSize: '1.2rem',
            color: 'var(--brown-light)',
            letterSpacing: '0.02em',
          }}>
            this is me ✨
          </p>
        </div>

        {/* text */}
        <div>
          <h2 style={{
            fontFamily: "'Caveat', cursive",
            fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
            fontWeight: 600,
            color: 'var(--brown)',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
          }}>
            Hello, I&apos;m Olya!
          </h2>

          <div style={{
            fontSize: '1rem',
            color: 'var(--brown-light)',
            lineHeight: 1.9,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            fontFamily: "'Quicksand', sans-serif",
          }}>
            <p>
              I&apos;m an illustrator who loves creating cozy, whimsical worlds full of warm colors, folk-inspired details, and gentle storytelling.
            </p>
            <p>
              My illustrations live somewhere between a fairytale and your grandmother&apos;s kitchen — a place where cats nap on houseplants and magic sparks fly from everyday moments.
            </p>
            <p>
              I work with digital tools and love collaborating on books, prints, branding, and anything with a soul.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href="https://www.instagram.com/by.lolikar"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.6rem 1.4rem', borderRadius: '100px',
                border: '1.5px solid var(--sage)', color: 'var(--brown)',
                textDecoration: 'none', fontSize: '0.85rem', transition: 'all 0.2s',
                fontFamily: "'Quicksand', sans-serif",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--sage)'; e.currentTarget.style.color = 'white' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--brown)' }}
            >
              📷 Instagram
            </a>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: '1rem', color: 'var(--rose)', letterSpacing: '0.02em' }}>
              ✨ open for commissions
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
