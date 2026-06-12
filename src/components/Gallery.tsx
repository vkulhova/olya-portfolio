'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/client'

interface Illustration {
  _id: string
  title: string
  image: { asset: { _ref: string } }
  category?: string
  description?: string
}

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'characters', label: 'Characters' },
  { value: 'landscapes', label: 'Landscapes' },
  { value: 'covers', label: 'Covers' },
  { value: 'other', label: 'Other' },
]

export default function Gallery({ illustrations }: { illustrations: Illustration[] }) {
  const [active, setActive] = useState('all')
  const [lightbox, setLightbox] = useState<Illustration | null>(null)

  const filtered = active === 'all'
    ? illustrations
    : illustrations.filter(i => i.category === active)

  const usedCategories = ['all', ...new Set(illustrations.map(i => i.category).filter(Boolean))]

  return (
    <section id="works" style={{ padding: '6rem 2rem', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '0.8rem' }}>
          portfolio
        </p>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--brown)', marginBottom: '2rem' }}>
          Works
        </h2>

        {/* filter tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {CATEGORIES.filter(c => usedCategories.includes(c.value)).map(cat => (
            <button
              key={cat.value}
              onClick={() => setActive(cat.value)}
              style={{
                padding: '0.45rem 1.25rem',
                borderRadius: '100px',
                border: '1.5px solid',
                borderColor: active === cat.value ? 'var(--rose)' : 'var(--cream-dark)',
                background: active === cat.value ? 'var(--rose)' : 'transparent',
                color: active === cat.value ? 'white' : 'var(--brown-light)',
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {illustrations.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--brown-light)', padding: '4rem 0' }}>
          <p style={{ fontSize: '1.1rem' }}>Ілюстрації скоро з&apos;являться ✨</p>
        </div>
      )}

      {/* masonry grid */}
      <div style={{
        columns: 'clamp(200px, 30vw, 340px)',
        columnGap: '1.25rem',
        columnFill: 'balance',
      }}>
        {filtered.map((item, i) => (
          <div
            key={item._id}
            onClick={() => setLightbox(item)}
            style={{
              breakInside: 'avoid',
              marginBottom: '1.25rem',
              borderRadius: '1rem',
              overflow: 'hidden',
              cursor: 'zoom-in',
              position: 'relative',
              background: 'var(--cream-dark)',
              animation: `fadeUp 0.5s ${i * 0.05}s ease both`,
            }}
          >
            <Image
              src={urlFor(item.image).width(800).url()}
              alt={item.title}
              width={800}
              height={800}
              style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.4s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(44,32,24,0.55) 0%, transparent 50%)',
              opacity: 0, transition: 'opacity 0.3s',
              display: 'flex', alignItems: 'flex-end', padding: '1.25rem',
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
            >
              <p style={{ color: 'white', fontSize: '0.95rem', fontFamily: "'Fraunces', serif" }}>
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(44,32,24,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem', cursor: 'zoom-out',
          }}
        >
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
            <Image
              src={urlFor(lightbox.image).width(1400).url()}
              alt={lightbox.title}
              width={1400}
              height={1400}
              style={{ maxWidth: '90vw', maxHeight: '85vh', width: 'auto', height: 'auto', borderRadius: '0.75rem', display: 'block' }}
            />
            <div style={{ textAlign: 'center', marginTop: '1rem', color: 'white' }}>
              <p style={{ fontFamily: "'Fraunces', serif", fontSize: '1.25rem' }}>{lightbox.title}</p>
              {lightbox.description && (
                <p style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '0.3rem' }}>{lightbox.description}</p>
              )}
            </div>
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: 'absolute', top: '-1rem', right: '-1rem',
                width: 36, height: 36, borderRadius: '50%',
                background: 'var(--rose)', border: 'none', color: 'white',
                fontSize: '1.1rem', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
