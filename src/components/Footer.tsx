export default function Footer() {
  return (
    <footer style={{
      padding: '2rem',
      textAlign: 'center',
      borderTop: '1px solid var(--cream-dark)',
      color: 'var(--brown-light)',
      fontSize: '0.8rem',
      letterSpacing: '0.05em',
    }}>
      <p>© {new Date().getFullYear()} lolikar — all rights reserved</p>
    </footer>
  )
}
