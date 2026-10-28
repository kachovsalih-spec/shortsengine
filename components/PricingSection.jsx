'use client';

import React from 'react';

export default function PricingSection({ STRIPE_STARTER_LINK, STRIPE_PRO_LINK }) {
  return (
    <section style={{ padding: '60px 16px', maxWidth: '1200px', margin: '0 auto', color: '#ffffff' }} id="pricing-section">
      
      {/* Вградени CSS стилове за перфектна мобилна версия */}
      <style jsx>{`
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          align-items: center;
        }

        .pro-card {
          transform: scale(1.05);
          z-index: 2;
        }

        @media (max-width: 768px) {
          .pricing-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .pro-card {
            transform: scale(1) !important; /* Премахва прекомерното увеличение на телефон */
            margin-top: 10px;
          }
          .card-padding {
            padding: 28px 20px !important; /* По-компактни разстояния за мобилен екран */
          }
          .plan-title {
            font-size: 1.5rem !important;
          }
          .plan-price {
            font-size: 2.25rem !important;
          }
        }
      `}</style>

      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: '900', marginBottom: '14px', letterSpacing: '-0.02em', background: 'linear-gradient(to right, #ffffff, #9ca3af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Изберете вашия план за растеж
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '1rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.5' }}>
          Инструментите, от които се нуждаете, за да превърнете идеята си във вирусни видеа за TikTok, Instagram Reels и YouTube Shorts.
        </p>
      </div>

      <div className="pricing-grid">
        
        {/* Starter Plan */}
        <div className="card-padding" style={{
          backgroundColor: '#0f172a',
          border: '1px solid #1e293b',
          borderRadius: '24px',
          padding: '36px 28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
          height: '100%'
        }}>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: '#1e293b', color: '#38bdf8', fontSize: '0.75rem', fontWeight: 'bold', padding: '5px 12px', borderRadius: '99px', marginBottom: '16px' }}>
              ⚡ ЗА СТАРТИРАЩИ
            </div>
            <h3 className="plan-title" style={{ fontSize: '1.65rem', fontWeight: 'bold', marginBottom: '8px', color: '#ffffff' }}>Starter План</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '20px', lineHeight: '1.5' }}>
              За независими творци, които искат бърз и лесен тласък на своето съдържание.
            </p>
            <div className="plan-price" style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '24px', color: '#ffffff' }}>
              €19.99 <span style={{ fontSize: '0.95rem', fontWeight: 'normal', color: '#94a3b8' }}>/ месец</span>
            </div>
            
            <div style={{ borderTop: '1px solid #1e293b', paddingTop: '20px', marginBottom: '28px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>✓</span> <strong>100 AI Вирусни Генерации</strong> /месец
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: '#cbd5e1' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>✓</span> Оптимизирани AI Сценарии (Hook, Body, CTA)
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: '#cbd5e1' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>✓</span> Поддръжка за TikTok, Reels & Shorts
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: '#cbd5e1' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>✓</span> Автоматични Описания & Вирусни Хаштагове
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: '#cbd5e1' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>✓</span> Бързо генериране с 1 клик
                </li>
              </ul>
            </div>
          </div>

          <button 
            onClick={() => STRIPE_STARTER_LINK && window.open(STRIPE_STARTER_LINK, '_blank')}
            style={{
              width: '100%',
              padding: '14px 20px',
              borderRadius: '12px',
              fontWeight: 'bold',
              backgroundColor: '#1e293b',
              color: '#ffffff',
              border: '1px solid #334155',
              cursor: 'pointer',
              fontSize: '0.95rem'
            }}>
            Започни със Starter
          </button>
        </div>

        {/* Pro Plan - Large on Desktop, Perfectly Scaled on Mobile */}
        <div className="pro-card card-padding" style={{
          backgroundColor: '#0f172a',
          border: '2px solid #ef4444',
          borderRadius: '24px',
          padding: '40px 30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 0 50px rgba(239, 68, 68, 0.3), inset 0 0 15px rgba(239, 68, 68, 0.1)',
          position: 'relative'
        }}>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: '#ef4444', color: '#ffffff', fontSize: '0.75rem', fontWeight: '900', padding: '5px 14px', borderRadius: '99px', marginBottom: '16px', letterSpacing: '0.05em' }}>
              🔥 НАЙ-ПОПУЛЯРЕН ИЗБОР
            </div>
            <h3 className="plan-title" style={{ fontSize: '1.85rem', fontWeight: '900', marginBottom: '8px', color: '#ffffff' }}>Pro План</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '20px', lineHeight: '1.5' }}>
              За професионалисти, агенции и брандове, търсещи пълно преимущество и вирален мащаб.
            </p>
            <div className="plan-price" style={{ fontSize: '2.85rem', fontWeight: '900', marginBottom: '24px', color: '#ffffff' }}>
              €39.99 <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#94a3b8' }}>/ месец</span>
            </div>

            <div style={{ borderTop: '1px solid rgba(239, 68, 68, 0.3)', paddingTop: '20px', marginBottom: '28px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#f87171', textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '0.05em' }}>
                Включва всичко от Starter плана, плюс:
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1.1rem' }}>✓</span> <strong style={{ color: '#ffffff' }}>НЕОГРАНИЧЕНИ AI Генерации</strong>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: '#ffffff' }}>
                  <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> <strong>Приоритетна скорост</strong> на обработка
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: '#ffffff' }}>
                  <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> <strong>B-Roll & Визуални режисьорски бележки</strong>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: '#ffffff' }}>
                  <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> <strong>Кликаеми кукички (Thumbnail Hooks)</strong>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: '#ffffff' }}>
                  <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> <strong>Достъп до VIP Discord общност</strong>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: '#ffffff' }}>
                  <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> Ранен достъп до нови модели & функции
                </li>
              </ul>
            </div>
          </div>

          <button 
            onClick={() => STRIPE_PRO_LINK && window.open(STRIPE_PRO_LINK, '_blank')}
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: '12px',
              fontWeight: '900',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              boxShadow: '0 10px 25px rgba(239, 68, 68, 0.4)'
            }}>
            Надгради до Pro
          </button>
        </div>

      </div>
    </section>
  );
}
