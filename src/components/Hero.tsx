export default function Hero() {
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
      {/* decorative dots background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, var(--sage-light) 1.5px, transparent 1.5px)',
        backgroundSize: '32px 32px',
        opacity: 0.4,
      }} />

      {/* decorative blobs */}
      <div style={{
        position: 'absolute', top: '10%', left: '5%', width: 320, height: 320,
        borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
        background: 'var(--rose-light)', opacity: 0.35, filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '5%', width: 280, height: 280,
        borderRadius: '40% 60% 30% 70% / 60% 40% 50% 50%',
        background: 'var(--sage-light)', opacity: 0.4, filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '40%', right: '15%', width: 180, height: 180,
        borderRadius: '50%',
        background: 'var(--gold-light)', opacity: 0.35, filter: 'blur(50px)',
        pointerEvents: 'none',
      }} />

      <div className="fade-up" style={{ position: 'relative', zIndex: 1 }}>
        <p style={{
          fontSize: '0.8rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--sage)',
          marginBottom: '1.2rem',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          illustration portfolio
        </p>

        <h1 style={{
          fontSize: 'clamp(5rem, 14vw, 11rem)',
          lineHeight: 0.9,
          letterSpacing: '-0.02em',
          color: 'var(--brown)',
          marginBottom: '2rem',
        }}>
          lolikar
        </h1>

        <p style={{
          fontSize: '1.1rem',
          color: 'var(--brown-light)',
          maxWidth: 440,
          lineHeight: 1.7,
          margin: '0 auto 3rem',
        }}>
          Cozy worlds, gentle characters,<br />
          and a little bit of magic — in every illustration.
        </p>

        <a
          href="#works"
          style={{
            display: 'inline-block',
            padding: '0.85rem 2.5rem',
            background: 'var(--rose)',
            color: 'white',
            borderRadius: '100px',
            textDecoration: 'none',
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 20px rgba(201,75,122,0.3)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 28px rgba(201,75,122,0.4)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,75,122,0.3)'
          }}
        >
          View works
        </a>
      </div>

      {/* scroll hint */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        color: 'var(--brown-light)', fontSize: '0.75rem', letterSpacing: '0.1em',
        opacity: 0.6, animation: 'float 2.5s ease-in-out infinite',
      }}>
        <span>scroll</span>
        <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
          <rect x="1" y="1" width="12" height="18" rx="6" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="7" cy="6" r="2" fill="currentColor"/>
        </svg>
      </div>
    </section>
  )
}
