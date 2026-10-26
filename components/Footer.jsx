export default function Footer() {
  return (
    <footer style={{ marginTop: '40px', textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '8px' }}>
        <a href="/terms" style={{ color: '#f87171', textDecoration: 'none' }}>Общи условия</a>
        <span>•</span>
        <a href="/privacy" style={{ color: '#f87171', textDecoration: 'none' }}>Политика за поверителност</a>
      </div>
      <p style={{ margin: 0, color: '#64748b' }}>&copy; 2026 ShortsEngine AI. Всички права са запазени.</p>
    </footer>
  );
}
