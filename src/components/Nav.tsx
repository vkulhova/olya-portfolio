'use client'

import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
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
        background: scrolled ? 'rgba(250,248,244,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(44,32,24,0.08)' : 'none',
      }}
    >
      <a
        href="#top"
        style={{
          fontFamily: "'Rozha One', serif",
          fontSize: '1.5rem',
          fontWeight: 500,
          color: 'var(--brown)',
          textDecoration: 'none',
          letterSpacing: '0.04em',
        }}
      >
        lolikar
      </a>
      <nav style={{ display: 'flex', gap: '2rem' }}>
        {[
          { label: 'works', href: '#works' },
          { label: 'about', href: '#about' },
          { label: 'contact', href: '#contact' },
        ].map(({ label, href }) => (
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
    </header>
  )
}
