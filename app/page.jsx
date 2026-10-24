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

  // Твоите реални Stripe Payment Links
  const STRIPE_STARTER_LINK = "https://buy.stripe.com/3cI9AU3HvfAs89W6TI67S01";
  const STRIPE_PRO_LINK = "https://buy.stripe.com/5kQaEY6THag875Sa5U67S00";

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
    <div style={{
      background: 'radial-gradient(circle at top, #0f172a 0%, #020617 100%)',
      color: '#f8fafc',
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      padding: '60px 20px',
      boxSizing: 'border-box'
    }}>
      
      {/* Hero Header Section - Големите атрактивни букви */}
      <header style={{ maxWidth: '950px', margin: '0 auto 60px auto', textAlign: 'center' }}>
        <div style={{
          display: 'inline-block',
          padding: '8px 20px',
          background: 'rgba(99, 102, 241, 0.15)',
          border: '1px solid rgba(99, 102, 241, 0.4)',
          borderRadius: '50px',
          color: '#818cf8',
          fontSize: '0.9rem',
          fontWeight: '700',
          marginBottom: '24px',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          ⚡ SHORTSENGINE AI v2.0 PLATFORM
        </div>

        <h1 style={{
          fontSize: 'clamp(2.8rem, 7vw, 4.8rem)',
          fontWeight: '900',
          lineHeight: '1.05',
          background: 'linear-gradient(135deg, #ffffff 0%, #a5f3fc 40%, #c084fc 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 24px 0',
          letterSpacing: '-1.5px'
        }}>
          ГЕНЕРИРАЙ ВИРАЛНИ СКРИПТОВЕ ЗА СЕКУНДИ
        </h1>

        <p style={{
          color: '#94a3b8',
          fontSize: '1.3rem',
          maxWidth: '720px',
          margin: '0 auto',
          lineHeight: '1.6',
          fontWeight: '400'
        }}>
          Превърни идеите си в силни сценарии с грабващи кукички (Hooks) за TikTok, Instagram Reels и YouTube Shorts с помощта на изкуствен интелект.
        </p>
      </header>

      <main style={{ maxWidth: '850px', margin: '0 auto' }}>
        
        {/* Generator Card */}
        <section style={{
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.6)',
          marginBottom: '80px'
        }}>
          <h2 style={{
            fontSize: '1.6rem',
            fontWeight: '800',
            marginBottom: '28px',
            color: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span>🚀</span> Генератор на Скриптове
          </h2>
          
          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '18px'
            }}>
              {/* Platform */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '0.95rem', fontWeight: '600' }}>
                  Платформа
                </label>
                <select 
                  value={platform} 
                  onChange={(e) => setPlatform(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    background: '#020617',
                    border: '1px solid #334155',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '1rem'
                  }}
                >
                  <option value="TikTok">TikTok Short</option>
                  <option value="Instagram Reels">Instagram Reels</option>
                  <option value="YouTube Shorts">YouTube Shorts</option>
                </select>
              </div>

              {/* Tone */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '0.95rem', fontWeight: '600' }}>
                  Тоналност
                </label>
                <select 
                  value={tone} 
                  onChange={(e) => setTone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    background: '#020617',
                    border: '1px solid #334155',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '1rem'
                  }}
                >
                  <option value="Атрактивен / Вирален">Атрактивен / Вирален</option>
                  <option value="Образователен">Образователен</option>
                  <option value="Продажбен / Бизнес">Продажбен / Бизнес</option>
                  <option value="Забавен / Хумористичен">Забавен / Хумористичен</option>
                </select>
              </div>

              {/* Language */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '0.95rem', fontWeight: '600' }}>
                  Език на скрипта
                </label>
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    background: '#020617',
                    border: '1px solid #334155',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '1rem'
                  }}
                >
                  <option value="English">English 🇬🇧 / 🇺🇸</option>
                  <option value="Български">Български 🇧🇬</option>
                </select>
              </div>
            </div>

            {/* Prompt Input */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '0.95rem', fontWeight: '600' }}>
                За какво се отнася видеото?
              </label>
              <textarea
                rows="4"
                placeholder="Напр. 3 грешки при започване на бизнес или Как да подобрим фокуса си сутрин..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '12px',
                  background: '#020617',
                  border: '1px solid #334155',
                  color: '#fff',
                  resize: 'vertical',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '18px',
                background: loading ? '#475569' : 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.15rem',
                fontWeight: '800',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 12px 28px -6px rgba(99, 102, 241, 0.5)',
                transition: 'all 0.2s ease',
                letterSpacing: '0.5px'
              }}
            >
              {loading ? 'Генериране на вирален скрипт...' : '🔥 Генерирай Скрипт Сега'}
            </button>
          </form>

          {/* Error Display */}
          {error && (
            <div style={{
              marginTop: '24px',
              padding: '16px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px',
              color: '#fca5a5'
            }}>
              ⚠️ <strong>Грешка:</strong> {error}
            </div>
          )}

          {/* Result Output */}
          {result && (
            <div style={{
              marginTop: '32px',
              padding: '24px',
              background: '#020617',
              border: '1px solid #6366f1',
              borderRadius: '16px'
            }}>
              <h3 style={{ margin: '0 0 16px 0', color: '#818cf8', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                ✨ Твоят готов скрипт:
              </h3>
              <pre style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontFamily: 'inherit',
                color: '#e2e8f0',
                lineHeight: '1.7',
                margin: 0,
                fontSize: '1rem'
              }}>
                {result}
              </pre>
            </div>
          )}
        </section>

        {/* Pricing Cards - С цените €19.99 и €39.99 */}
        <section style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.4rem', fontWeight: '800', marginBottom: '12px' }}>
            Избери своя абонаментен план
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.15rem', marginBottom: '44px' }}>
            Получи пълен достъп и генерирай неограничено съдържание за твоите социални мрежи.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px',
            alignItems: 'stretch'
          }}>
            
            {/* Starter Plan Card */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              padding: '36px 28px',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              textAlign: 'left'
            }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 8px 0', color: '#f8fafc' }}>Starter</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: '0 0 24px 0' }}>Идеален за индивидуални създатели</p>
                <div style={{ fontSize: '2.8rem', fontWeight: '900', marginBottom: '28px', color: '#fff' }}>
                  €19.99 <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 'normal' }}>/месец</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#cbd5e1', lineHeight: '2.3', fontSize: '0.98rem' }}>
                  <li>✓ 50 AI Скрипта на месец</li>
                  <li>✓ Шаблони за TikTok, Reels & Shorts</li>
                  <li>✓ Поддръжка на Български & English</li>
                  <li>✓ Основни структури с Hooks</li>
                </ul>
              </div>
              
              <a 
                href={STRIPE_STARTER_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: '36px',
                  padding: '16px',
                  background: '#1e293b',
                  color: '#fff',
                  borderRadius: '14px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontWeight: '700',
                  display: 'block',
                  border: '1px solid #334155',
                  fontSize: '1rem'
                }}
              >
                Вземи Starter План 💳
              </a>
            </div>

            {/* Pro Plan Card */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.95)',
              border: '2px solid #818cf8',
              borderRadius: '24px',
              padding: '36px 28px',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              textAlign: 'left',
              position: 'relative',
              boxShadow: '0 25px 50px -15px rgba(99, 102, 241, 0.35)'
            }}>
              <div style={{
                position: 'absolute',
                top: '-14px',
                right: '28px',
                background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                color: '#fff',
                fontSize: '0.8rem',
                padding: '4px 16px',
                borderRadius: '20px',
                fontWeight: '800',
                letterSpacing: '0.5px'
              }}>
                НАЙ-ПОПУЛЯРЕН
              </div>

              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 8px 0', color: '#f8fafc' }}>Pro</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: '0 0 24px 0' }}>За брандове, агенции и фрийлансъри</p>
                <div style={{ fontSize: '2.8rem', fontWeight: '900', marginBottom: '28px', color: '#fff' }}>
                  €39.99 <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 'normal' }}>/месец</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#cbd5e1', lineHeight: '2.3', fontSize: '0.98rem' }}>
                  <li>✓ Неограничени AI Скриптове</li>
                  <li>✓ Генератор на вирални Hooks & CTA</li>
                  <li>✓ Приоритетна бързина на AI</li>
                  <li>✓ Всички езици и тоналности</li>
                  <li>✓ VIP Поддръжка</li>
                </ul>
              </div>

              <a 
                href={STRIPE_PRO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: '36px',
                  padding: '16px',
                  background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)',
                  color: '#fff',
                  borderRadius: '14px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontWeight: '800',
                  display: 'block',
                  fontSize: '1rem',
                  boxShadow: '0 10px 20px -5px rgba(99, 102, 241, 0.4)'
                }}
              >
                Вземи Pro План 🚀
              </a>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
