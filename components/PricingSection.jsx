'use client';

import React from 'react';

export default function PricingSection({ STRIPE_STARTER_LINK, STRIPE_PRO_LINK }) {
  return (
    <section style={{ padding: '80px 20px', maxWidth: '1100px', margin: '0 auto', color: '#ffffff' }} id="pricing-section">
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '16px', letterSpacing: '-0.02em', background: 'linear-gradient(to right, #ffffff, #9ca3af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Изберете вашия план за растеж
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto', lineHeight: '1.6' }}>
          Генерирайте вирусни сценарии за секунди и изградете мащабна, ангажирана публика в TikTok, Instagram Reels и YouTube Shorts.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', alignItems: 'stretch' }}>
        
        {/* Starter Plan */}
        <div style={{
          backgroundColor: 'rgba(17, 24, 39, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.3s ease'
        }}>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', fontSize: '0.8rem', fontWeight: '800', padding: '6px 14px', borderRadius: '99px', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              ⚡ Стартов пакет
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '10px', color: '#ffffff' }}>Starter Plan</h3>
            <p style={{ color: '#9ca3af', fontSize: '0.95rem', marginBottom: '28px', lineHeight: '1.6' }}>
              Перфектното решение за креативни творци и малки брандове, които започват своето пътуване в късото видео.
            </p>
            <div style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '32px', color: '#ffffff', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              €19.99 <span style={{ fontSize: '1rem', fontWeight: '500', color: '#9ca3af' }}>/ месец</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}><span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '1.1rem' }}>✓</span> <strong>100 AI Вирусни Генерации</strong> на месец</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: '#d1d5db' }}><span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '1.1rem' }}>✓</span> Оптимизирани за TikTok, Reels и Shorts</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: '#d1d5db' }}><span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '1.1rem' }}>✓</span> Готови описания & ангажиращи хаштагове</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: '#d1d5db' }}><span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '1.1rem' }}>✓</span> Бърз експорт и копиране с едно кликване</li>
            </ul>
          </div>
          <button 
            onClick={() => STRIPE_STARTER_LINK && window.open(STRIPE_STARTER_LINK, '_blank')}
            style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: '14px',
              fontWeight: '800',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.2s ease'
            }}>
            Започни със Starter
          </button>
        </div>

        {/* Pro Plan with striking highlight border */}
        <div style={{
          backgroundColor: 'rgba(17, 24, 39, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '2px solid #ef4444',
          borderRadius: '24px',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 0 40px rgba(239, 68, 68, 0.25)',
          position: 'relative',
          transform: 'scale(1.02)'
        }}>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', fontSize: '0.8rem', fontWeight: '800', padding: '6px 14px', borderRadius: '99px', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              🔥 Най-популярен избор
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '10px', color: '#ffffff' }}>Pro План</h3>
            <p style={{ color: '#9ca3af', fontSize: '0.95rem', marginBottom: '28px', lineHeight: '1.6' }}>
              Създаден за професионалисти, агенции и брандове, които търсят неограничен растеж и максимални резултати.
            </p>
            <div style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '32px', color: '#ffffff', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              €39.99 <span style={{ fontSize: '1rem', fontWeight: '500', color: '#9ca3af' }}>/ месец</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}><span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1.1rem' }}>✓</span> <strong style={{ color: '#ffffff' }}>Неограничени AI Генерации</strong> (Без лимити!)</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: '#d1d5db' }}><span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1.1rem' }}>✓</span> Приоритетна генерация с най-нов модел</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: '#d1d5db' }}><span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1.1rem' }}>✓</span> Достъп до затворена VIP Discord общност</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: '#d1d5db' }}><span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1.1rem' }}>✓</span> Ранен достъп до всички нови функции</li>
            </ul>
          </div>
          <button 
            onClick={() => STRIPE_PRO_LINK && window.open(STRIPE_PRO_LINK, '_blank')}
            style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: '14px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              boxShadow: '0 10px 25px rgba(239, 68, 68, 0.4)',
              transition: 'all 0.2s ease'
            }}>
            Надгради до Pro
          </button>
        </div>

      </div>
    </section>
  );
}
