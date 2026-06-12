'use client'

import { useState } from 'react'
import { useLang } from '@/lib/i18n'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const { t } = useLang()
  const c = t.contact

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    const subject = encodeURIComponent(`Commission from ${form.name}`)
    const body = encodeURIComponent(`Hi Olya!\n\n${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`)
    window.location.href = `mailto:vladyslava.kulhova@gmail.com?subject=${subject}&body=${body}`
    setTimeout(() => setStatus('sent'), 500)
  }

  const inputStyle = {
    width: '100%', padding: '0.85rem 1.25rem', borderRadius: '0.75rem',
    border: '1.5px solid var(--cream-dark)', background: 'white',
    fontSize: '0.95rem', color: 'var(--brown)', outline: 'none',
    transition: 'border-color 0.2s', fontFamily: 'inherit',
  }

  return (
    <section id="contact" style={{ padding: '6rem 2rem', maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--rose)', marginBottom: '0.8rem' }}>
        {c.tag}
      </p>
      <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: 'var(--brown)', marginBottom: '1rem' }}>
        {c.heading}
      </h2>
      <p style={{ color: 'var(--brown-light)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '3rem', whiteSpace: 'pre-line' }}>
        {c.subheading}
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
        {([
          { key: 'name', label: c.labelName, type: 'text', placeholder: c.placeholderName },
          { key: 'email', label: c.labelEmail, type: 'email', placeholder: c.placeholderEmail },
        ] as const).map(field => (
          <div key={field.key}>
            <label style={{ fontSize: '0.8rem', letterSpacing: '0.08em', color: 'var(--brown-light)', display: 'block', marginBottom: '0.4rem' }}>
              {field.label}
            </label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              required
              value={form[field.key]}
              onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'var(--sage)')}
              onBlur={e => (e.target.style.borderColor = 'var(--cream-dark)')}
            />
          </div>
        ))}

        <div>
          <label style={{ fontSize: '0.8rem', letterSpacing: '0.08em', color: 'var(--brown-light)', display: 'block', marginBottom: '0.4rem' }}>
            {c.labelMessage}
          </label>
          <textarea
            placeholder={c.placeholderMessage}
            rows={5}
            required
            value={form.message}
            onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
            style={{ ...inputStyle, resize: 'vertical' }}
            onFocus={e => (e.target.style.borderColor = 'var(--sage)')}
            onBlur={e => (e.target.style.borderColor = 'var(--cream-dark)')}
          />
        </div>

        <button
          type="submit"
          disabled={status !== 'idle'}
          style={{
            padding: '1rem', borderRadius: '100px', border: 'none',
            background: status === 'sent' ? 'var(--sage)' : 'var(--rose)',
            color: 'white', fontSize: '0.9rem', letterSpacing: '0.08em',
            cursor: status === 'idle' ? 'pointer' : 'default',
            transition: 'all 0.3s', boxShadow: '0 4px 20px rgba(201,75,122,0.25)',
          }}
        >
          {status === 'idle' ? c.send : status === 'sending' ? c.sending : c.sent}
        </button>
      </form>
    </section>
  )
}
