'use client'

import { useLang } from '@/lib/i18n'

export default function Footer() {
  const { t } = useLang()
  const text = t.footer.replace('{year}', String(new Date().getFullYear()))

  return (
    <footer style={{
      padding: '2rem', textAlign: 'center',
      borderTop: '1px solid var(--cream-dark)',
      color: 'var(--brown-light)', fontSize: '0.8rem', letterSpacing: '0.05em',
    }}>
      <p>{text}</p>
    </footer>
  )
}
