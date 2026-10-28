'use client';

import React from 'react';

export default function PricingSection({ STRIPE_STARTER_LINK, STRIPE_PRO_LINK }) {
  return (
    <section style={{ padding: '80px 20px', maxWidth: '1100px', margin: '0 auto', color: '#ffffff' }} id="pricing-section">
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Изберете вашия план за растеж
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
          Генерирайте вирусни сценарии за секунди и изградете устойчива публика в TikTok, Instagram и YouTube.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        
        {/* Starter Plan */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #374151',
          borderRadius: '20px',
          padding: '36px 28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.2s ease-in-out'
        }}>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: '#1f2937', color: '#60a5fa', fontSize: '0.75rem', fontWeight: 'bold', padding: '4px 12px', borderRadius: '99px', marginBottom: '16px' }}>
              За стартиращи
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px', color: '#ffffff' }}>⚡ Starter</h3>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '24px', lineHeight: '1.5' }}>
              Идеален за начинаещи творци, които искат бързо и лесно видео съдържание.
            </p>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '28px', color: '#ffffff' }}>
              €19.99 <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#9ca3af' }}>/ месец</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span> <strong>100 AI Генерации</strong></li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span> Поддръжка за TikTok, Reels, Shorts</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span> Готови descriptions & hashtags</li>
            </ul>
          </div>
          <button 
            onClick={() => STRIPE_STARTER_LINK && window.open(STRIPE_STARTER_LINK, '_blank')}
            style={{
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

        {/* Pro Plan with red border highlight */}
        <div style={{
          backgroundColor: '#111827',
          border: '2px solid #ef4444',
          borderRadius: '20px',
          padding: '36px 28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 10px 30px rgba(239, 68, 68, 0.25)',
          position: 'relative'
        }}>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#f87171', fontSize: '0.75rem', fontWeight: 'bold', padding: '4px 12px', borderRadius: '99px', marginBottom: '16px' }}>
              Най-популярен
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px', color: '#ffffff' }}>🔥 Pro План</h3>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '24px', lineHeight: '1.5' }}>
              За професионалисти и брандове, търсещи максимално вирален ефект.
            </p>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '28px', color: '#ffffff' }}>
              €39.99 <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#9ca3af' }}>/ месец</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> <strong>Неограничени AI Генерации</strong></li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> Приоритетна генерация</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> B-Roll & Визуални бележки</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> Достъп до VIP Discord общност</li>
            </ul>
          </div>
          <button 
            onClick={() => STRIPE_PRO_LINK && window.open(STRIPE_PRO_LINK, '_blank')}
            style={{
              width: '100%',
... padding: '14px 24px',
              borderRadius: '12px',
              fontWeight: 'bold',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.95rem'
            }}>
            Надгради до Pro
          </button>
        </div>

      </div>
    </section>
  );
}
