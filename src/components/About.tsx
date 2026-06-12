export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: '6rem 2rem',
        background: 'var(--cream-dark)',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'center' }}>
        {/* decorative avatar placeholder */}
        <div style={{ position: 'relative' }}>
          <div style={{
            width: '100%',
            aspectRatio: '1',
            borderRadius: '40% 60% 50% 50% / 50% 40% 60% 50%',
            background: 'linear-gradient(135deg, var(--rose-light) 0%, var(--sage-light) 60%, var(--gold-light) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: '5rem' }}>🎨</span>
          </div>
          {/* floating badge */}
          <div style={{
            position: 'absolute', bottom: '-1rem', right: '-1rem',
            background: 'white',
            borderRadius: '1rem',
            padding: '0.75rem 1.25rem',
            boxShadow: '0 8px 32px rgba(44,32,24,0.1)',
            fontSize: '0.8rem',
            color: 'var(--brown-light)',
            whiteSpace: 'nowrap',
          }}>
            ✨ open for commissions
          </div>
        </div>

        {/* text */}
        <div>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '0.8rem' }}>
            about
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--brown)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
            Hi, I&apos;m Olya
          </h2>
          <div style={{ fontSize: '1rem', color: 'var(--brown-light)', lineHeight: 1.85, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Instagram', href: 'https://www.instagram.com/by.lolikar', icon: '📷' },
            ].map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.4rem',
                  borderRadius: '100px',
                  border: '1.5px solid var(--sage)',
                  color: 'var(--brown)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--sage)'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--brown)'
                }}
              >
                {icon} {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
