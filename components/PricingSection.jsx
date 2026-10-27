'use client';

import React from 'react';

export default function PricingSection() {
  return (
    <section style={{ padding: '80px 20px', maxWidth: '1100px', margin: '0 auto', color: '#ffffff' }} id="pricing">
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Изберете вашия план за растеж
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
          Генерирайте вирусни сценарии за секунди и изградете устойчива публика в TikTok, Instagram и YouTube.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', maxWidth: '950px', margin: '0 auto', alignItems: 'stretch' }}>
        
        {/* Starter Plan */}
        <div style={{ 
          backgroundColor: '#111827', 
          border: '1px solid #374151', 
          borderRadius: '20px', 
          padding: '36px 28px', 
          display: 'flex', 
          flexDirection: 'column', 
          justify: 'space-between',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.2s ease-in-out'
        }}>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: '#1f2937', color: '#60a5fa', fontSize: '0.75rem', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              За стартиращи
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px', color: '#ffffff' }}>⚡ Starter План</h3>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '24px', lineHeight: '1.5' }}>
              Идеален за начинаещи творци, които искат бързо и лесно видео съдържание.
            </p>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '28px', color: '#ffffff' }}>
              €19.99 <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#9ca3af' }}>/ месец</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.9rem', color: '#d1d5db' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span> <strong>100 AI Генерации</strong> на месец
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span> Поддръжка за <strong>TikTok, Reels & Shorts</strong>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span> Формат <strong>Hook-Story-Offer</strong>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span> Готови descriptions & hashtags
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#4b5563', textDecoration: 'line-through' }}>
                <span>✕</span> B-Roll & Визуални бележки
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#4b5563', textDecoration: 'line-through' }}>
                <span>✕</span> VIP Discord общност
              </li>
            </ul>
          </div>
          <button style={{ 
            width: '100%', 
            padding: '14px 24px', 
            borderRadius: '12px', 
            fontWeight: 'bold', 
            backgroundColor: '#1f2937', 
            color: '#ffffff', 
            border: '1px solid #4b5563', 
            cursor: 'pointer',
            fontSize: '0.95rem'
          }}>
            Започни със Starter
          </button>
        </div>

        {/* Pro Plan */}
        <div style={{ 
          backgroundColor: '#180a0a', 
          border: '2px solid #ef4444', 
          borderRadius: '20px', 
          padding: '36px 28px', 
          display: 'flex', 
          flexDirection: 'column', 
          justify: 'space-between', 
          position: 'relative', 
          boxShadow: '0 12px 35px rgba(239, 68, 68, 0.25)' 
        }}>
          <div style={{ position: 'absolute', top: '-14px', right: '24px', backgroundColor: '#ef4444', color: '#ffffff', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', padding: '4px 14px', borderRadius: '9999px', letterSpacing: '0.05em' }}>
            Най-популярен
          </div>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#f87171', fontSize: '0.75rem', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              За пълна гледаемост
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px', color: '#f87171' }}>🔥 Pro План</h3>
            <p style={{ color: '#e5e7eb', fontSize: '0.875rem', marginBottom: '24px', lineHeight: '1.5' }}>
              За сериозни творци и бизнеси, които искат максимални резултати.
            </p>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '28px' }}>
              €39.99 <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#9ca3af' }}>/ месец</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.9rem', color: '#f3f4f6' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f87171', fontWeight: 'bold', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '8px 12px', borderRadius: '8px' }}>
                ✨ Включва ВСИЧКИ функции от Starter
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> 👑 <strong>Неограничени</strong> AI генерации
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f87171', fontWeight: '600' }}>
                <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> 💬 <strong>VIP Discord Общност</strong> (Private Access)
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> 🎬 <strong>B-Roll & Visual Notes</strong> (режисьорски бележки)
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> 📌 <strong>3 Thumbnail Hooks</strong> (заглавия за корици)
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> 🚀 Приоритетна бързина & поддръжка
              </li>
            </ul>
          </div>
          <button style={{ 
            width: '100%', 
            padding: '14px 24px', 
            borderRadius: '12px', 
            fontWeight: 'bold', 
            backgroundColor: '#dc2626', 
            color: '#ffffff', 
            border: 'none', 
            cursor: 'pointer', 
            fontSize: '0.95rem',
            boxShadow: '0 4px 15px rgba(220, 38, 38, 0.4)' 
          }}>
            Вземи Pro + VIP Discord
          </button>
        </div>

      </div>
    </section>
  );
}
