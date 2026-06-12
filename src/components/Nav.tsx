'use client'

import { useState, useEffect } from 'react'

const LINKS = [
  { label: 'works', href: '#works' },
  { label: 'about', href: '#about' },
  { label: 'contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: '1.25rem 2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'background 0.4s, backdrop-filter 0.4s, box-shadow 0.4s',
          background: scrolled || menuOpen ? 'rgba(250,248,244,0.88)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
          boxShadow: scrolled && !menuOpen ? '0 1px 0 rgba(44,32,24,0.08)' : 'none',
        }}
      >
        <a
          href="#top"
          onClick={close}
          style={{
            fontFamily: "'Rozha One', serif",
            fontSize: '1.5rem',
            fontWeight: 500,
            color: 'var(--brown)',
            textDecoration: 'none',
            letterSpacing: '0.04em',
            position: 'relative',
            zIndex: 60,
          }}
        >
          lolikar
        </a>

        {/* desktop */}
        <nav className="nav-links">
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontSize: '0.85rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--brown-light)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--rose)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--brown-light)')}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* hamburger */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* mobile overlay */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <button
          onClick={close}
          aria-label="Close menu"
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '2rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '2rem',
            color: 'var(--brown)',
            lineHeight: 1,
            padding: '4px',
          }}
        >
          ×
        </button>
        {LINKS.map(({ label, href }) => (
          <a key={label} href={href} onClick={close}>
            {label}
          </a>
        ))}
      </div>
    </>
  )
}
