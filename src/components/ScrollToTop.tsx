'use client'

import { useEffect, useState } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 40,
        width: 44,
        height: 44,
        borderRadius: '50%',
        border: '1.5px solid var(--cream-dark)',
        background: 'rgba(250,248,244,0.9)',
        backdropFilter: 'blur(8px)',
        color: 'var(--brown)',
        fontSize: '1.2rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(44,32,24,0.10)',
        transition: 'opacity 0.3s, transform 0.3s',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--rose)'
        e.currentTarget.style.borderColor = 'var(--rose)'
        e.currentTarget.style.color = 'white'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(250,248,244,0.9)'
        e.currentTarget.style.borderColor = 'var(--cream-dark)'
        e.currentTarget.style.color = 'var(--brown)'
      }}
    >
      ↑
    </button>
  )
}
