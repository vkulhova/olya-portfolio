'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/i18n'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, t, toggle } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  const links = [
    { label: t.nav.works, href: '#works' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.contact, href: '#contact' },
  ]

  const LangBtn = ({ small }: { small?: boolean }) => (
    <button
      onClick={toggle}
      style={{
        background: 'none',
        border: '1.5px solid var(--cream-dark)',
        borderRadius: '100px',
        padding: small ? '0.2rem 0.55rem' : '0.25rem 0.75rem',
        fontSize: small ? '0.7rem' : '0.75rem',
        letterSpacing: '0.1em',
        color: 'var(--brown-light)',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontFamily: "'Quicksand', sans-serif",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--rose)'
        e.currentTarget.style.color = 'var(--rose)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--cream-dark)'
        e.currentTarget.style.color = 'var(--brown-light)'
      }}
    >
      {lang === 'en' ? 'UA' : 'EN'}
    </button>
  )

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 60,
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
            color: 'var(--brown)',
            textDecoration: 'none',
            letterSpacing: '0.04em',
          }}
        >
          lolikar
        </a>

        {/* desktop nav + lang toggle */}
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {links.map(({ label, href }) => (
            <a
              key={href}
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
          <LangBtn />
        </div>

        {/* mobile: lang toggle + hamburger */}
        <div className="nav-mobile-right" style={{ alignItems: 'center', gap: '0.75rem' }}>
          <LangBtn small />
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* mobile overlay */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {links.map(({ label, href }) => (
          <a key={href} href={href} onClick={close}>
            {label}
          </a>
        ))}
      </div>
    </>
  )
}
