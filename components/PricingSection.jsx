'use client';

import React from 'react';

export default function PricingSection({ STRIPE_STARTER_LINK, STRIPE_PRO_LINK }) {
  return (
    <section style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto', color: '#ffffff' }} id="pricing-section">
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h2 style={{ fontSize: '2.75rem', fontWeight: '900', marginBottom: '16px', letterSpacing: '-0.02em', background: 'linear-gradient(to right, #ffffff, #9ca3af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Изберете вашия план за растеж
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '1.15rem', maxWidth: '650px', margin: '0 auto', lineHeight: '1.6' }}>
          Инструментите, от които се нуждаете, за да превърнете идеята си във вирусни видеа за TikTok, Instagram Reels и YouTube Shorts.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px', alignItems: 'center' }}>
        
        {/* Starter Plan */}
        <div style={{
          backgroundColor: '#0f172a',
          border: '1px solid #1e293b',
          borderRadius: '24px',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
          height: '100%'
        }}>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: '#1e293b', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 'bold', padding: '6px 14px', borderRadius: '99px', marginBottom: '20px' }}>
              ⚡ ЗА СТАРТИРАЩИ
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '8px', color: '#ffffff' }}>Starter План</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '24px', lineHeight: '1.5' }}>
              За независими творци, които искат бърз и лесен тласък на своето съдържание.
            </p>
            <div style={{ fontSize: '2.75rem', fontWeight: '900', marginBottom: '28px', color: '#ffffff' }}>
              €19.99 <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#94a3b8' }}>/ месец</span>
            </div>
            
            <div style={{ borderTop: '1px solid #1e293b', paddingTop: '24px', marginBottom: '32px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>✓</span> <strong>100 AI Вирусни Генерации</strong> /месец
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: '#cbd5e1' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>✓</span> Оптимизирани AI Сценарии (Hook, Body, CTA)
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: '#cbd5e1' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>✓</span> Поддръжка за TikTok, Reels & Shorts
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: '#cbd5e1' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>✓</span> Автоматични Описания & Вирусни Хаштагове
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: '#cbd5e1' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>✓</span> Бързо генериране с 1 клик
                </li>
              </ul>
            </div>
          </div>

          <button 
            onClick={() => STRIPE_STARTER_LINK && window.open(STRIPE_STARTER_LINK, '_blank')}
            style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: '14px',
              fontWeight: 'bold',
              backgroundColor: '#1e293b',
              color: '#ffffff',
              border: '1px solid #334155',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.2s ease'
            }}>
            Започни със Starter
          </button>
        </div>

        {/* Pro Plan - Large, Dominant with Strong Red Glow */}
        <div style={{
          backgroundColor: '#0f172a',
          border: '2px solid #ef4444',
          borderRadius: '28px',
          padding: '48px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 0 60px rgba(239, 68, 68, 0.35), inset 0 0 20px rgba(239, 68, 68, 0.1)',
          position: 'relative',
          transform: 'scale(1.05)',
          zIndex: 2
        }}>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: '#ef4444', color: '#ffffff', fontSize: '0.8rem', fontWeight: '900', padding: '6px 16px', borderRadius: '99px', marginBottom: '20px', letterSpacing: '0.05em' }}>
              🔥 НАЙ-ПОПУЛЯРЕН ИЗБОР
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '8px', color: '#ffffff' }}>Pro План</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '24px', lineHeight: '1.5' }}>
              За професионалисти, агенции и брандове, търсещи пълно преимущество и вирален мащаб.
            </p>
            <div style={{ fontSize: '3.25rem', fontWeight: '900', marginBottom: '28px', color: '#ffffff' }}>
              €39.99 <span style={{ fontSize: '1.1rem', fontWeight: 'normal', color: '#94a3b8' }}>/ месец</span>
            </div>

            <div style={{ borderTop: '1px solid rgba(239, 68, 68, 0.3)', paddingTop: '24px', marginBottom: '32px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#f87171', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.05em' }}>
                Включва всичко от Starter плана, плюс:
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1rem' }}>
                  <span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1.2rem' }}>✓</span> <strong style={{ color: '#ffffff' }}>НЕОГРАНИЧЕНИ AI Генерации</strong>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: '#ffffff' }}>
                  <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> <strong>Приоритетна скорост</strong> на обработка
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: '#ffffff' }}>
                  <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> <strong>B-Roll & Визуални режисьорски бележки</strong>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: '#ffffff' }}>
                  <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> <strong>Кликаеми кукички (Thumbnail Hooks)</strong>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: '#ffffff' }}>
                  <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> <strong>Достъп до VIP Discord общност</strong> за творци
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: '#ffffff' }}>
                  <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> Ранен достъп до нови модели & функции
                </li>
              </ul>
            </div>
          </div>

          <button 
            onClick={() => STRIPE_PRO_LINK && window.open(STRIPE_PRO_LINK, '_blank')}
            style={{
              width: '100%',
              padding: '18px 24px',
              borderRadius: '14px',
              fontWeight: '900',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.05rem',
              boxShadow: '0 10px 25px rgba(239, 68, 68, 0.5)',
              transition: 'all 0.2s ease'
            }}>
            Надгради до Pro
          </button>
        </div>

      </div>
    </section>
  );
}
