'use client';

import React from 'react';

export default function PricingSection() {
  return (
    <section style={{ padding: '64px 16px', maxWidth: '1100px', margin: '0 auto', color: '#ffffff' }} id="pricing">
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '16px' }}>
          Изберете вашия план за растеж
        </h2>
        <p style={{ color: '#9ca3af', maxWidth: '600px', margin: '0 auto' }}>
          Генерирайте вирусни сценарии за секунди и изградете устойчива публика в TikTok, Instagram и YouTube.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Starter Plan */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px' }}>⚡ Starter План</h3>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '24px' }}>Перфектен за начинаещи творци и самостоятелни бизнеси.</p>
            <div style={{ fontSize: '2.25rem', fontWeight: '900', marginBottom: '24px' }}>
              €19.99 <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#9ca3af' }}>/ месец</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.875rem', color: '#d1d5db' }}>
              <li>✓ <strong>100 AI Генерации</strong> на месец</li>
              <li>✓ Поддръжка на <strong>TikTok, Reels & Shorts</strong></li>
              <li>✓ Формат <strong>Hook-Story-Offer</strong></li>
              <li>✓ Готови descriptions & hashtags</li>
              <li style={{ color: '#4b5563', textDecoration: 'line-through' }}>✕ B-Roll & Визуални бележки</li>
              <li style={{ color: '#4b5563', textDecoration: 'line-through' }}>✕ VIP Discord общност</li>
            </ul>
          </div>
          <button style={{ width: '100%', padding: '12px 24px', borderRadius: '12px', fontWeight: 'bold', backgroundColor: '#1f2937', color: '#ffffff', border: 'none', cursor: 'pointer' }}>
            Започни със Starter
          </button>
        </div>

        {/* Pro Plan */}
        <div style={{ backgroundColor: '#180a0a', border: '2px solid #ef4444', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', boxShadow: '0 10px 25px rgba(239, 68, 68, 0.2)' }}>
          <div style={{ position: 'absolute', top: '-14px', right: '24px', backgroundColor: '#ef4444', color: '#ffffff', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '9999px', letterSpacing: '0.05em' }}>
            Най-популярен
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px', color: '#f87171' }}>🔥 Pro План</h3>
            <p style={{ color: '#e5e7eb', fontSize: '0.875rem', marginBottom: '24px' }}>За сериозни творци, които искат максимална гледаемост.</p>
            <div style={{ fontSize: '2.25rem', fontWeight: '900', marginBottom: '24px' }}>
              €39.99 <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#9ca3af' }}>/ месец</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.875rem', color: '#f3f4f6' }}>
              <li>👑 <strong>Неограничени</strong> AI генерации</li>
              <li style={{ color: '#f87171', fontWeight: '600' }}>
                💬 <strong>VIP Discord Общност</strong> (Private Access)
              </li>
              <li>🎬 <strong>B-Roll & Visual Notes</strong> (режисьорски бележки)</li>
              <li>📌 <strong>3 Thumbnail Hooks</strong> (заглавия за корици)</li>
              <li>✓ Приоритетна бързина на AI модела</li>
              <li>✓ Достъп до нови функции преди всички</li>
            </ul>
          </div>
          <button style={{ width: '100%', padding: '12px 24px', borderRadius: '12px', fontWeight: 'bold', backgroundColor: '#dc2626', color: '#ffffff', border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(220, 38, 38, 0.4)' }}>
            Вземи Pro + VIP Discord
          </button>
        </div>

      </div>
    </section>
  );
}
