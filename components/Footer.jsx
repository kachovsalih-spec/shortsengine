export default function Footer() {
  return (
    <footer className="py-6 text-center text-xs text-gray-500 space-y-2" style={{ marginTop: '40px' }}>
      <div className="flex justify-center gap-4 text-gray-400 mb-2">
        <a href="/terms" className="hover:underline">Общи условия</a>
        <span>•</span>
        <a href="/privacy" className="hover:underline">Политика за поверителност</a>
      </div>
      <p>&copy; 2026 ShortsEngine AI. Всички права са запазени.</p>
    </footer>
  );
}
