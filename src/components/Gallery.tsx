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
  const [activeCategory, setActiveCategory] = useState('all')
  const [layout, setLayout] = useState('masonry')
  const [lightbox, setLightbox] = useState<Illustration | null>(null)

  const filtered = activeCategory === 'all'
    ? illustrations
    : illustrations.filter(i => i.category === activeCategory)

  const usedCategories = ['all', ...new Set(illustrations.map(i => i.category).filter(Boolean))]

  const imgUrl = (item: Illustration, w = 800) => urlFor(item.image).width(w).url()

  const Card = ({ item, ratio = '1/1' }: { item: Illustration; ratio?: string }) => (
    <div
      onClick={() => setLightbox(item)}
      style={{ position: 'relative', aspectRatio: ratio, borderRadius: '1rem', overflow: 'hidden', cursor: 'zoom-in', background: 'var(--cream-dark)' }}
    >
      <Image
        src={imgUrl(item)}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: 'cover', transition: 'transform 0.4s' }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      />
      <div
        style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(44,32,24,0.6) 0%, transparent 55%)', opacity: 0, transition: 'opacity 0.3s', display: 'flex', alignItems: 'flex-end', padding: '1rem' }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
      >
        <p style={{ color: 'white', fontSize: '0.9rem', fontFamily: "'Fraunces', serif" }}>{item.title}</p>
      </div>
    </div>
  )

  const MasonryCard = ({ item }: { item: Illustration }) => (
    <div
      onClick={() => setLightbox(item)}
      style={{ breakInside: 'avoid', marginBottom: '1.25rem', borderRadius: '1rem', overflow: 'hidden', cursor: 'zoom-in', background: 'var(--cream-dark)', position: 'relative' }}
    >
      <Image
        src={imgUrl(item)}
        alt={item.title}
        width={800}
        height={800}
        style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.4s' }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      />
      <div
        style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(44,32,24,0.6) 0%, transparent 55%)', opacity: 0, transition: 'opacity 0.3s', display: 'flex', alignItems: 'flex-end', padding: '1rem' }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
      >
        <p style={{ color: 'white', fontSize: '0.9rem', fontFamily: "'Fraunces', serif" }}>{item.title}</p>
      </div>
    </div>
  )

  return (
    <section id="works" style={{ padding: '6rem 2rem', maxWidth: 1280, margin: '0 auto' }}>
      {/* header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '0.8rem' }}>portfolio</p>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--brown)', marginBottom: '2rem' }}>Works</h2>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {/* categories */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {CATEGORIES.filter(c => usedCategories.includes(c.value)).map(cat => (
              <button key={cat.value} onClick={() => setActiveCategory(cat.value)} style={{ padding: '0.45rem 1.25rem', borderRadius: '100px', border: '1.5px solid', borderColor: activeCategory === cat.value ? 'var(--rose)' : 'var(--cream-dark)', background: activeCategory === cat.value ? 'var(--rose)' : 'transparent', color: activeCategory === cat.value ? 'white' : 'var(--brown-light)', fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                {cat.label}
              </button>
            ))}
          </div>

          {/* layout switcher */}
          <div style={{ display: 'flex', gap: '0.3rem', background: 'var(--cream-dark)', borderRadius: '0.75rem', padding: '0.3rem' }}>
            {[
              { value: 'masonry', label: '⊞', title: 'Masonry' },
              { value: 'grid', label: '⊟', title: 'Grid' },
              { value: 'rows', label: '☰', title: 'Rows' },
            ].map(l => (
              <button key={l.value} onClick={() => setLayout(l.value)} title={l.title} style={{ width: 34, height: 34, borderRadius: '0.5rem', border: 'none', background: layout === l.value ? 'white' : 'transparent', color: layout === l.value ? 'var(--rose)' : 'var(--brown-light)', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', boxShadow: layout === l.value ? '0 2px 8px rgba(44,32,24,0.1)' : 'none' }}>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--brown-light)', padding: '4rem 0' }}>
          <p style={{ fontSize: '1.1rem' }}>Ілюстрації скоро з&apos;являться ✨</p>
        </div>
      )}

      {/* MASONRY — різна висота, органічно */}
      {layout === 'masonry' && (
        <div style={{ columns: 'clamp(220px, 28vw, 360px)', columnGap: '1.25rem' }}>
          {filtered.map(item => <MasonryCard key={item._id} item={item} />)}
        </div>
      )}

      {/* GRID — рівні квадрати, фіксовані колонки */}
      {layout === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
          {filtered.map(item => <Card key={item._id} item={item} ratio="1/1" />)}
        </div>
      )}

      {/* ROWS — горизонтальний masonry: фіксована висота, ширина за пропорціями */}
      {layout === 'rows' && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
          {filtered.map(item => (
            <div
              key={item._id}
              onClick={() => setLightbox(item)}
              style={{ position: 'relative', height: 280, flexGrow: 1, minWidth: 180, borderRadius: '1rem', overflow: 'hidden', cursor: 'zoom-in', background: 'var(--cream-dark)' }}
            >
              <Image
                src={imgUrl(item, 800)}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                style={{ objectFit: 'cover', transition: 'transform 0.4s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div
                style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(44,32,24,0.6) 0%, transparent 55%)', opacity: 0, transition: 'opacity 0.3s', display: 'flex', alignItems: 'flex-end', padding: '1rem' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
              >
                <p style={{ color: 'white', fontSize: '0.9rem', fontFamily: "'Fraunces', serif" }}>{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIGHTBOX */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(44,32,24,0.88)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', cursor: 'zoom-out' }}>
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
            <Image src={imgUrl(lightbox, 1400)} alt={lightbox.title} width={1400} height={1400} style={{ maxWidth: '90vw', maxHeight: '85vh', width: 'auto', height: 'auto', borderRadius: '0.75rem', display: 'block' }} />
            <div style={{ textAlign: 'center', marginTop: '1rem', color: 'white' }}>
              <p style={{ fontFamily: "'Fraunces', serif", fontSize: '1.25rem' }}>{lightbox.title}</p>
              {lightbox.description && <p style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '0.3rem' }}>{lightbox.description}</p>}
            </div>
            <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '-1rem', right: '-1rem', width: 36, height: 36, borderRadius: '50%', background: 'var(--rose)', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          </div>
        </div>
      )}
    </section>
  )
}
