'use client';

export default function PricingSection({ STRIPE_STARTER_LINK, STRIPE_PRO_LINK }) {
  return (
    <section style={{ textAlign: 'center', marginBottom: '60px' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '8px', color: '#fff' }}>Избери план за пълен достъп</h2>
      <p style={{ color: '#94a3b8', marginBottom: '32px', fontSize: '0.95rem' }}>Отключете потенциала на вашите социални мрежи.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        
        {/* STARTER PLAN */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '32px',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between'
        }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0 }}>Starter</h3>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, margin: '16px 0', color: '#fff' }}>
              €19.99 <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: '400' }}>/мес</span>
            </div>
            <ul style={{ listStyle: 'none', margin: '24px 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <li><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> <strong>50 AI скрипта</strong> на месец</li>
              <li><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> TikTok, Reels & Shorts формати</li>
              <li><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> Грабващи кукички (Viral Hooks)</li>
              <li><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> Визуални и звукови директиви</li>
              <li><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> Български & Английски език</li>
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
              borderRadius: '12px',
              fontWeight: '800',
              fontSize: '0.92rem',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            Купи Starter 💳
          </a>
        </div>

        {/* PRO PLAN */}
        <div style={{
          background: 'rgba(220, 38, 38, 0.05)',
          border: '2px solid #ef4444',
          borderRadius: '24px',
          padding: '32px',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          position: 'relative',
          boxShadow: '0 0 40px rgba(220, 38, 38, 0.15)'
        }}>
          <div style={{
            position: 'absolute',
            top: '-14px',
            right: '24px',
            background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 900,
            padding: '4px 14px',
            borderRadius: '50px',
            letterSpacing: '0.5px'
          }}>
            ПРЕПОРЪЧАН 🔥
          </div>

          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0 }}>Pro</h3>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, margin: '16px 0', color: '#fff' }}>
              €39.99 <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: '400' }}>/мес</span>
            </div>
            <ul style={{ listStyle: 'none', margin: '24px 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: '#f1f5f9' }}>
              <li><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> <strong>Неограничени AI скриптове</strong></li>
              <li><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> Достъп до всички бъдещи ъпдейти</li>
              <li><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> Приоритетна супер-бърза генерация</li>
              <li><span style={{ color: '#ef4444', fontWeight: 'bold' }}>✓</span> Пълен Търговски Лиценз (за клиенти)</li>
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
              borderRadius: '12px',
              fontWeight: '800',
              fontSize: '0.92rem',
              boxShadow: '0 10px 25px -5px rgba(220, 38, 38, 0.4)'
            }}
          >
            Вземи Pro Неограничен 🚀
          </a>
        </div>

      </div>
    </section>
  );
}
