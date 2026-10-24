'use client';

export default function PricingSection({ STRIPE_STARTER_LINK, STRIPE_PRO_LINK }) {
  return (
    <section id="pricing-section" style={{ textAlign: 'center', marginBottom: '50px', padding: '20px 0' }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15), rgba(15, 23, 42, 0.8))',
        border: '1px solid rgba(220, 38, 38, 0.4)',
        borderRadius: '18px',
        padding: '20px 16px',
        marginBottom: '30px',
        maxWidth: '600px',
        margin: '0 auto 30px auto',
        boxShadow: '0 0 25px rgba(220, 38, 38, 0.2)'
      }}>
        <h3 style={{ color: '#f87171', fontSize: '1.2rem', fontWeight: 900, marginBottom: '6px' }}>⚡ Безплатните опити свършиха!</h3>
        <p style={{ color: '#f1f5f9', fontSize: '0.9rem', margin: 0, fontWeight: '500' }}>Отключи неограничена мощ и създавай съдържание, което завладява аудиторията.</p>
      </div>

      <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '10px', color: '#fff', letterSpacing: '-0.02em' }}>
        Готов ли си за следващото ниво? 🚀
      </h2>
      <p style={{ color: '#94a3b8', marginBottom: '30px', fontSize: '0.98rem' }}>
        Избери план за създатели, които търсят максимални резултати.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        
        {/* STARTER */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '20px',
          padding: '24px 20px',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between'
        }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0 }}>Starter</h3>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, margin: '14px 0', color: '#fff' }}>
              €19.99 <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '400' }}>/мес</span>
            </div>
            <ul style={{ listStyle: 'none', margin: '20px 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: '#cbd5e1' }}>
              <li><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> <strong>50 AI скрипта</strong> на месец</li>
              <li><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> TikTok, Reels & Shorts</li>
              <li><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> Ангажиращи кукички (Hooks)</li>
              <li><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> Български и Английски език</li>
            </ul>
          </div>
          <a
            href={STRIPE_STARTER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              padding: '14px',
              background: '#1e293b',
              color: '#fff',
              textDecoration: 'none',
              textAlign: 'center',
              borderRadius: '10px',
              fontWeight: '800',
              fontSize: '0.9rem',
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
          borderRadius: '20px',
          padding: '24px 20px',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          position: 'relative',
          boxShadow: '0 0 40px rgba(220, 38, 38, 0.2)'
        }}>
          <div style={{
            position: 'absolute',
            top: '-12px',
            right: '20px',
            background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
            color: '#fff',
            fontSize: '0.7rem',
            fontWeight: 900,
            padding: '4px 12px',
            borderRadius: '50px',
            letterSpacing: '0.5px',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
          }}>
            ТОП ИЗБОР 🔥
          </div>

          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0 }}>Pro Неограничен</h3>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, margin: '14px 0', color: '#fff' }}>
              €39.99 <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '400' }}>/мес</span>
            </div>
            <ul style={{ listStyle: 'none', margin: '20px 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: '#f1f5f9' }}>
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
              padding: '14px',
              background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
              color: '#fff',
              textDecoration: 'none',
              textAlign: 'center',
              borderRadius: '10px',
              fontWeight: '800',
              fontSize: '0.9rem',
              boxShadow: '0 8px 20px rgba(220, 38, 38, 0.4)'
            }}
          >
            Вземи Pro Неограничен 🚀
          </a>
        </div>

      </div>
    </section>
  );
}
