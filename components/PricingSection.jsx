'use client';

export default function PricingSection({ STRIPE_STARTER_LINK, STRIPE_PRO_LINK }) {
  return (
    <section id="pricing-section" style={{ textAlign: 'center', marginBottom: '60px', padding: '30px 0' }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15), rgba(15, 23, 42, 0.8))',
        border: '1px solid rgba(220, 38, 38, 0.4)',
        borderRadius: '20px',
        padding: '24px',
        marginBottom: '35px',
        maxWidth: '650px',
        margin: '0 auto 35px auto',
        boxShadow: '0 0 30px rgba(220, 38, 38, 0.2)'
      }}>
        <h3 style={{ color: '#f87171', fontSize: '1.3rem', fontWeight: 900, marginBottom: '8px' }}>⚡ Безплатните опити свършиха!</h3>
        <p style={{ color: '#f1f5f9', fontSize: '0.95rem', margin: 0, fontWeight: '500' }}>Отключи неограничена мощ и започни да трупаш милиони гледания още днес.</p>
      </div>

      <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '12px', color: '#fff', letterSpacing: '-0.02em' }}>
        Готов ли си да станеш следващият вирален хит? 🚀
      </h2>
      <p style={{ color: '#94a3b8', marginBottom: '40px', fontSize: '1.05rem' }}>
        Избери план, създаден за създатели, които не правят компромиси с успеха.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        
        {/* STARTER */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          padding: '32px',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          transition: 'transform 0.3s ease'
        }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: 0 }}>Starter</h3>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, margin: '16px 0', color: '#fff' }}>
              €19.99 <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: '400' }}>/мес</span>
            </div>
            <ul style={{ listStyle: 'none', margin: '24px 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.92rem', color: '#cbd5e1' }}>
              <li><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> <strong>50 AI скрипта</strong> на месец</li>
              <li><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> TikTok, Reels & Shorts</li>
              <li><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> Вирусни кукички (Viral Hooks)</li>
              <li><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> Български и Английски език</li>
            </ul>
          </div>
          <a
            href={STRIPE_STARTER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              padding: '16px',
              background: '#1e293b',
              color: '#fff',
              textDecoration: 'none',
              textAlign: 'center',
              borderRadius: '12px',
              fontWeight: '800',
              fontSize: '0.95rem',
              border: '1px solid rgba(255,255,255,0.15)'
            }}
          >
            Купи Starter 💳
          </a>
        </div>

        {/* PRO */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(220, 38, 38, 0.08), rgba(15, 23, 42, 0.85))',
          backdropFilter: 'blur(12px)',
          border: '2px solid #ef4444',
          borderRadius: '24px',
          padding: '32px',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          position: 'relative',
          boxShadow: '0 0 50px rgba(220, 38, 38, 0.25)'
        }}>
          <div style={{
            position: 'absolute',
            top: '-14px',
            right: '24px',
            background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 900,
            padding: '5px 14px',
            borderRadius: '50px',
            letterSpacing: '0.5px',
            boxShadow: '0 5px 15px rgba(239, 68, 68, 0.4)'
          }}>
            ХИТ 🔥 ИЗБОР
          </div>

          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: 0 }}>Pro Неограничен</h3>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, margin: '16px 0', color: '#fff' }}>
              €39.99 <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: '400' }}>/мес</span>
            </div>
            <ul style={{ listStyle: 'none', margin: '24px 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.92rem', color: '#f1f5f9' }}>
              <li><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> <strong>Неограничени AI скриптове</strong></li>
              <li><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> Приоритетна супер-бърза генерация</li>
              <li><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> Пълен Търговски Лиценз</li>
              <li><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> VIP Поддръжка 24/7</li>
            </ul>
          </div>
          <a
            href={STRIPE_PRO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              padding: '16px',
              background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
              color: '#fff',
              textDecoration: 'none',
              textAlign: 'center',
              borderRadius: '12px',
              fontWeight: '800',
              fontSize: '0.95rem',
              boxShadow: '0 10px 25px rgba(220, 38, 38, 0.5)'
            }}
          >
            Вземи Pro Неограничен 🚀
          </a>
        </div>

      </div>
    </section>
  );
}
