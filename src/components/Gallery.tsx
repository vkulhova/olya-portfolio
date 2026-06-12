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

const LAYOUTS = [
  {
    value: 'masonry',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <rect x="0" y="0" width="7" height="9" rx="1"/>
        <rect x="9" y="0" width="7" height="6" rx="1"/>
        <rect x="0" y="11" width="7" height="5" rx="1"/>
        <rect x="9" y="8" width="7" height="8" rx="1"/>
      </svg>
    ),
  },
  {
    value: 'grid',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <rect x="0" y="0" width="7" height="7" rx="1"/>
        <rect x="9" y="0" width="7" height="7" rx="1"/>
        <rect x="0" y="9" width="7" height="7" rx="1"/>
        <rect x="9" y="9" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    value: 'featured',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <rect x="0" y="0" width="10" height="16" rx="1"/>
        <rect x="12" y="0" width="4" height="7" rx="1"/>
        <rect x="12" y="9" width="4" height="7" rx="1"/>
      </svg>
    ),
  },
]

function GalleryItem({ item, onClick, aspectRatio }: {
  item: Illustration
  onClick: () => void
  aspectRatio?: string
}) {
  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: '1rem',
        overflow: 'hidden',
        cursor: 'zoom-in',
        position: 'relative',
        background: 'var(--cream-dark)',
        aspectRatio: aspectRatio,
      }}
    >
      <Image
        src={urlFor(item.image).width(800).url()}
        alt={item.title}
        fill={!!aspectRatio}
        width={aspectRatio ? undefined : 800}
        height={aspectRatio ? undefined : 800}
        style={{
          width: aspectRatio ? undefined : '100%',
          height: aspectRatio ? undefined : 'auto',
          objectFit: 'cover',
          display: 'block',
          transition: 'transform 0.4s',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      />
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(44,32,24,0.6) 0%, transparent 50%)',
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
  )
}

export default function Gallery({ illustrations }: { illustrations: Illustration[] }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [layout, setLayout] = useState('masonry')
  const [lightbox, setLightbox] = useState<Illustration | null>(null)

  const filtered = activeCategory === 'all'
    ? illustrations
    : illustrations.filter(i => i.category === activeCategory)

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

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {/* category filters */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {CATEGORIES.filter(c => usedCategories.includes(c.value)).map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                style={{
                  padding: '0.45rem 1.25rem',
                  borderRadius: '100px',
                  border: '1.5px solid',
                  borderColor: activeCategory === cat.value ? 'var(--rose)' : 'var(--cream-dark)',
                  background: activeCategory === cat.value ? 'var(--rose)' : 'transparent',
                  color: activeCategory === cat.value ? 'white' : 'var(--brown-light)',
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

          {/* layout switcher */}
          <div style={{ display: 'flex', gap: '0.3rem', background: 'var(--cream-dark)', borderRadius: '0.75rem', padding: '0.3rem' }}>
            {LAYOUTS.map(l => (
              <button
                key={l.value}
                onClick={() => setLayout(l.value)}
                title={l.value}
                style={{
                  width: 34, height: 34,
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: layout === l.value ? 'white' : 'transparent',
                  color: layout === l.value ? 'var(--rose)' : 'var(--brown-light)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                  boxShadow: layout === l.value ? '0 2px 8px rgba(44,32,24,0.1)' : 'none',
                }}
              >
                {l.icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {illustrations.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--brown-light)', padding: '4rem 0' }}>
          <p style={{ fontSize: '1.1rem' }}>Ілюстрації скоро з&apos;являться ✨</p>
        </div>
      )}

      {/* MASONRY */}
      {layout === 'masonry' && (
        <div style={{ columns: 'clamp(200px, 30vw, 340px)', columnGap: '1.25rem' }}>
          {filtered.map(item => (
            <div key={item._id} style={{ breakInside: 'avoid', marginBottom: '1.25rem' }}>
              <GalleryItem item={item} onClick={() => setLightbox(item)} />
            </div>
          ))}
        </div>
      )}

      {/* GRID */}
      {layout === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {filtered.map(item => (
            <GalleryItem key={item._id} item={item} onClick={() => setLightbox(item)} aspectRatio="1/1" />
          ))}
        </div>
      )}

      {/* FEATURED */}
      {layout === 'featured' && filtered.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto', gap: '1.25rem' }}>
          {filtered.map((item, i) => (
            <div
              key={item._id}
              style={{
                gridColumn: i === 0 ? 'span 2' : 'span 1',
                gridRow: i === 0 ? 'span 2' : 'span 1',
              }}
            >
              <GalleryItem item={item} onClick={() => setLightbox(item)} aspectRatio={i === 0 ? '4/3' : '1/1'} />
            </div>
          ))}
        </div>
      )}

      {/* LIGHTBOX */}
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
            >×</button>
          </div>
        </div>
      )}
    </section>
  )
}
