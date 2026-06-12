'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/client'
import { useLang } from '@/lib/i18n'

interface Illustration {
  _id: string
  title: string
  title_ua?: string
  image: { asset: { _ref: string } }
  category?: string
  description?: string
}

export default function Gallery({ illustrations }: { illustrations: Illustration[] }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [layout, setLayout] = useState('masonry')
  const [lightbox, setLightbox] = useState<Illustration | null>(null)
  const { lang, t } = useLang()
  const g = t.gallery
  const getTitle = (item: Illustration) =>
    lang === 'ua' && item.title_ua ? item.title_ua : item.title

  const filtered = activeCategory === 'all'
    ? illustrations
    : illustrations.filter(i => i.category === activeCategory)

  const lbIndex = lightbox ? filtered.findIndex(i => i._id === lightbox._id) : -1
  const [slideDir, setSlideDir] = useState<'left' | 'right' | null>(null)

  const navigate = (dir: 'left' | 'right') => {
    const nextIdx = dir === 'right' ? lbIndex + 1 : lbIndex - 1
    if (nextIdx < 0 || nextIdx >= filtered.length) return
    setSlideDir(dir)
    setTimeout(() => { setLightbox(filtered[nextIdx]); setSlideDir(null) }, 320)
  }
  const goPrev = (e: React.MouseEvent) => { e.stopPropagation(); navigate('left') }
  const goNext = (e: React.MouseEvent) => { e.stopPropagation(); navigate('right') }

  // keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightbox) return
      if (e.key === 'ArrowLeft') navigate('left')
      if (e.key === 'ArrowRight') navigate('right')
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, lbIndex, filtered])

  // touch swipe
  const touchStartX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) navigate(dx < 0 ? 'right' : 'left')
    touchStartX.current = null
  }

  const CATEGORIES = [
    { value: 'all', label: g.cats.all },
    { value: 'characters', label: g.cats.characters },
    { value: 'landscapes', label: g.cats.landscapes },
    { value: 'covers', label: g.cats.covers },
    { value: 'other', label: g.cats.other },
  ]

  const usedCategories = ['all', ...new Set(illustrations.map(i => i.category).filter(Boolean))]

  const imgUrl = (item: Illustration, w = 800) => urlFor(item.image).width(w).url()

  const Card = ({ item, ratio = '1/1' }: { item: Illustration; ratio?: string }) => (
    <div
      onClick={() => setLightbox(item)}
      style={{ position: 'relative', aspectRatio: ratio, borderRadius: '1rem', overflow: 'hidden', cursor: 'zoom-in', background: 'var(--cream-dark)' }}
    >
      <Image
        src={imgUrl(item)}
        alt={getTitle(item)}
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
        <p style={{ color: 'white', fontSize: '0.9rem', fontFamily: "'Rozha One', serif" }}>{getTitle(item)}</p>
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
        alt={getTitle(item)}
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
        <p style={{ color: 'white', fontSize: '0.9rem', fontFamily: "'Rozha One', serif" }}>{getTitle(item)}</p>
      </div>
    </div>
  )

  return (
    <section id="works" style={{ padding: '6rem 2rem', maxWidth: 1280, margin: '0 auto' }}>
      {/* header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '0.8rem' }}>{g.tag}</p>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--brown)', marginBottom: '2rem' }}>{g.heading}</h2>

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
          <p style={{ fontSize: '1.1rem' }}>{g.empty}</p>
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
        <div className="gallery-grid-3">
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
              className="gallery-rows-item"
              style={{ position: 'relative', flexGrow: 1, minWidth: 180, borderRadius: '1rem', overflow: 'hidden', cursor: 'zoom-in', background: 'var(--cream-dark)' }}
            >
              <Image
                src={imgUrl(item, 800)}
                alt={getTitle(item)}
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
                <p style={{ color: 'white', fontSize: '0.9rem', fontFamily: "'Rozha One', serif" }}>{getTitle(item)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(44,32,24,0.92)', backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
        >
          {/* close */}
          <button
            onClick={e => { e.stopPropagation(); setLightbox(null) }}
            style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', zIndex: 102 }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--rose)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
          >✕</button>

          {/* prev arrow */}
          <button
            onClick={goPrev}
            disabled={lbIndex === 0}
            style={{ position: 'fixed', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', zIndex: 101, background: 'rgba(30,20,14,0.55)', border: 'none', borderRadius: '50%', width: 44, height: 44, cursor: lbIndex === 0 ? 'default' : 'pointer', opacity: lbIndex === 0 ? 0.2 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)', transition: 'opacity 0.2s, transform 0.2s, background 0.2s' }}
            onMouseEnter={e => { if (lbIndex > 0) { e.currentTarget.style.transform = 'translateY(-50%) translateX(-2px)'; e.currentTarget.style.background = 'rgba(201,75,122,0.85)' } }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(-50%)'; e.currentTarget.style.background = 'rgba(30,20,14,0.55)' }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4L6 9l5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* image + slide animation */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              transition: 'transform 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.32s',
              transform: slideDir === 'right' ? 'translateX(-60px)' : slideDir === 'left' ? 'translateX(60px)' : 'translateX(0)',
              opacity: slideDir ? 0 : 1,
            }}
          >
            <Image
              src={imgUrl(lightbox, 1400)}
              alt={getTitle(lightbox)}
              width={1400} height={1400}
              style={{ maxWidth: '82vw', maxHeight: '78vh', width: 'auto', height: 'auto', borderRadius: '1rem', display: 'block', boxShadow: '0 24px 80px rgba(0,0,0,0.4)' }}
            />
            <div style={{ textAlign: 'center', marginTop: '1.25rem', color: 'white' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.35rem', letterSpacing: '0.01em' }}>{getTitle(lightbox)}</p>
              <p style={{ fontSize: '0.75rem', opacity: 0.4, marginTop: '0.4rem', letterSpacing: '0.1em' }}>{lbIndex + 1} / {filtered.length}</p>
            </div>
          </div>

          {/* next arrow */}
          <button
            onClick={goNext}
            disabled={lbIndex === filtered.length - 1}
            style={{ position: 'fixed', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', zIndex: 101, background: 'rgba(30,20,14,0.55)', border: 'none', borderRadius: '50%', width: 44, height: 44, cursor: lbIndex === filtered.length - 1 ? 'default' : 'pointer', opacity: lbIndex === filtered.length - 1 ? 0.2 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)', transition: 'opacity 0.2s, transform 0.2s, background 0.2s' }}
            onMouseEnter={e => { if (lbIndex < filtered.length - 1) { e.currentTarget.style.transform = 'translateY(-50%) translateX(2px)'; e.currentTarget.style.background = 'rgba(201,75,122,0.85)' } }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(-50%)'; e.currentTarget.style.background = 'rgba(30,20,14,0.55)' }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 4l5 5-5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}
