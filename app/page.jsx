'use client';

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState('TikTok');
  const [tone, setTone] = useState('Атрактивен / Вирален');
  const [language, setLanguage] = useState('English');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  // Твоите Stripe Payment Links
  const STRIPE_STARTER_LINK = "https://buy.stripe.com/test_starter_link"; // заменете с твоя Stripe Link за Starter
  const STRIPE_PRO_LINK = "https://buy.stripe.com/test_pro_link"; // заменете с твоя Stripe Link за Pro

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');

    const fullPrompt = `Create a viral script for ${platform} about: "${prompt}".
Tone of voice: ${tone}.
Language of the response/script: ${language}.
Include:
1. A powerful Hook (first 3 seconds)
2. Main Content (Visuals + Audio/Voiceover)
3. Call to Action (CTA) at the end.`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: fullPrompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Възникна грешка при генерацията.');
      }

      setResult(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#0b0f19', color: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      
      {/* Header */}
      <header style={{ maxWidth: '900px', margin: '0 auto 50px auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: '800', background: 'linear-gradient(90deg, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 10px 0' }}>
          ShortsEngine AI
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.2rem', margin: 0 }}>
          Генерирай вирални скриптове, кукички и сценарии за вашите видеа с изкуствен интелект.
        </p>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Generator Section */}
        <section style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '30px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#f1f5f9' }}>⚡ Създай нов скрипт</h2>
          
          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '0.9rem' }}>Платформа:</label>
                <select 
                  value={platform} 
                  onChange={(e) => setPlatform(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#0f172a', border: '1px solid #475569', color: '#fff' }}
                >
                  <option value="TikTok">TikTok Short</option>
                  <option value="Instagram Reels">Instagram Reels</option>
                  <option value="YouTube Shorts">YouTube Shorts</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '0.9rem' }}>Тоналност:</label>
                <select 
                  value={tone} 
                  onChange={(e) => setTone(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#0f172a', border: '1px solid #475569', color: '#fff' }}
                >
                  <option value="Атрактивен / Вирален">Атрактивен / Вирален</option>
                  <option value="Образователен">Образователен</option>
                  <option value="Продажбен / Бизнес">Продажбен / Бизнес</option>
                  <option value="Забавен / Хумористичен">Забавен / Хумористичен</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '0.9rem' }}>Език на скрипта:</label>
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#0f172a', border: '1px solid #475569', color: '#fff' }}
                >
                  <option value="English">English 🇬🇧 / 🇺🇸</option>
                  <option value="Български">Български 🇧🇬</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '0.9rem' }}>За какво се отнася видеото?</label>
              <textarea
                rows="4"
                placeholder="Напр. 3 mistakes to avoid when starting a business..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#0f172a', border: '1px solid #475569', color: '#fff', resize: 'vertical' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '14px 24px',
                background: loading ? '#64748b' : 'linear-gradient(90deg, #6366f1, #a855f7)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Генериране на скрипт...' : 'Генерирай Скрипт 🚀'}
            </button>
          </form>

          {error && (
            <div style={{ marginTop: '20px', padding: '15px', background: '#451a1a', border: '1px solid #f87171', borderRadius: '8px', color: '#fca5a5' }}>
              <strong>Грешка:</strong> {error}
            </div>
          )}

          {result && (
            <div style={{ marginTop: '30px', padding: '20px', background: '#0f172a', border: '1px solid #3b82f6', borderRadius: '12px' }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#60a5fa' }}>✨ Твоят вирален скрипт:</h3>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'inherit', color: '#e2e8f0', lineHeight: '1.6', margin: 0 }}>
                {result}
              </pre>
            </div>
          )}
        </section>

        {/* Pricing / Subscriptions Section */}
        <section style={{ textAlign: 'center', marginTop: '80px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Избери своя план</h2>
          <p style={{ color: '#94a3b8', marginBottom: '40px' }}>Получи неограничен достъп и генерирай стотици видеа месечно.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            
            {/* Starter Plan */}
            <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', margin: '0 0 10px 0' }}>Starter</h3>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '15px' }}>€9 <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>/месец</span></div>
                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', color: '#cbd5e1', lineHeight: '2' }}>
                  <li>✓ 30 AI Скрипта на месец</li>
                  <li>✓ TikTok & Reels шаблони</li>
                  <li>✓ Стандартна бързина</li>
                </ul>
              </div>
              <a 
                href={STRIPE_STARTER_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: '20px', padding: '12px', background: '#334155', color: '#fff', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', fontWeight: 'bold', display: 'block' }}
              >
                Избери Starter 💳
              </a>
            </div>

            {/* Pro Plan */}
            <div style={{ background: '#1e293b', border: '2px solid #818cf8', borderRadius: '12px', padding: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-12px', right: '20px', background: '#818cf8', color: '#fff', fontSize: '0.8rem', padding: '2px 10px', borderRadius: '10px', fontWeight: 'bold' }}>ПОПУЛЯРЕН</div>
              <div>
                <h3 style={{ fontSize: '1.3rem', margin: '0 0 10px 0' }}>Pro</h3>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '15px' }}>€29 <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>/месец</span></div>
                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', color: '#cbd5e1', lineHeight: '2' }}>
                  <li>✓ Неограничени AI Скриптове</li>
                  <li>✓ Генератор на вирални Hooks</li>
                  <li>✓ Избор на език и тоналност</li>
                  <li>✓ Приоритетна бързина</li>
                </ul>
              </div>
              <a 
                href={STRIPE_PRO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: '20px', padding: '12px', background: 'linear-gradient(90deg, #6366f1, #a855f7)', color: '#fff', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', fontWeight: 'bold', display: 'block' }}
              >
                Избери Pro 🚀
              </a>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
