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
  
  // Състояние за разгъване на FAQ
  const [openFaq, setOpenFaq] = useState(null);

  // Твоите работещи Stripe Payment Links
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

  const faqs = [
    {
      q: "Как работи ShortsEngine AI?",
      a: "Нашият изкуствен интелект е обучен върху стотици хиляди вирални видеа в TikTok, Reels и Shorts. Просто въвеждаш темата си, избираш платформа и език, и получаваш готов структуриран скрипт с кукичка (Hook) и призив към действие (CTA)."
    },
    {
      q: "Мога ли да генерирам скриптове на Български език?",
      a: "Да! Поддържаме както Английски за международна аудитория, така и Български език с естествено звучащ и атрактивен изказ."
    },
    {
      q: "Мога ли да прекратя абонамента си по всяко време?",
      a: "Абсолютно. Няма обвързващи договорености. Можеш да анулираш или промениш плана си с един клик през твоя профил в Stripe."
    },
    {
      q: "Какво съдържа всеки генериран скрипт?",
      a: "Всеки скрипт включва: 1) Грабващо вниманието заглавие/кукичка за първите 3 секунди, 2) Визуални инструкции за заснемане, 3) Готов дублаж/текст за казващия, и 4) Силен Call to Action в края."
    }
  ];

  return (
    <div style={{
      background: 'radial-gradient(circle at top, #0f172a 0%, #020617 100%)',
      color: '#f8fafc',
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      padding: '40px 15px',
      boxSizing: 'border-box'
    }}>
      
      {/* Прибран и компактен централен контейнер */}
      <div style={{ maxWidth: '750px', margin: '0 auto' }}>

        {/* Hero Header Section */}
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 16px',
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '50px',
            color: '#818cf8',
            fontSize: '0.8rem',
            fontWeight: '700',
            marginBottom: '16px',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            ⚡ SHORTSENGINE AI
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
            fontWeight: '900',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, #ffffff 0%, #a5f3fc 40%, #c084fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 16px 0',
            letterSpacing: '-1px'
          }}>
            Генерирай вирални скриптове за секунди
          </h1>

          <p style={{
            color: '#94a3b8',
            fontSize: '1.1rem',
            lineHeight: '1.5',
            margin: '0 auto'
          }}>
            Създавай завладяващи сценарии с грабващи кукички за TikTok, Instagram Reels и YouTube Shorts.
          </p>
        </header>

        {/* Generator Card */}
        <section style={{
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '28px',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5)',
          marginBottom: '50px'
        }}>
          <h2 style={{
            fontSize: '1.3rem',
            fontWeight: '700',
            marginBottom: '20px',
            color: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span>🚀</span> Генератор на Скриптове
          </h2>
          
          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px'
            }}>
              {/* Platform */}
              <div>
                <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: '600' }}>
                  Платформа
                </label>
                <select 
                  value={platform} 
                  onChange={(e) => setPlatform(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    background: '#020617',
                    border: '1px solid #334155',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="TikTok">TikTok Short</option>
                  <option value="Instagram Reels">Instagram Reels</option>
                  <option value="YouTube Shorts">YouTube Shorts</option>
                </select>
              </div>

              {/* Tone */}
              <div>
                <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: '600' }}>
                  Тоналност
                </label>
                <select 
                  value={tone} 
                  onChange={(e) => setTone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    background: '#020617',
                    border: '1px solid #334155',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.9rem'
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
                <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: '600' }}>
                  Език на скрипта
                </label>
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    background: '#020617',
                    border: '1px solid #334155',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="English">English 🇬🇧 / 🇺🇸</option>
                  <option value="Български">Български 🇧🇬</option>
                </select>
              </div>
            </div>

            {/* Prompt Input */}
            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: '600' }}>
                За какво се отнася видеото?
              </label>
              <textarea
                rows="3"
                placeholder="Напр. 3 грешки при започване на бизнес..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '10px',
                  background: '#020617',
                  border: '1px solid #334155',
                  color: '#fff',
                  resize: 'vertical',
                  fontSize: '0.95rem',
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
                padding: '14px',
                background: loading ? '#475569' : 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 8px 20px -4px rgba(99, 102, 241, 0.4)',
                transition: 'all 0.2s ease'
              }}
            >
              {loading ? 'Генериране на скрипт...' : '🔥 Генерирай Скрипт'}
            </button>
          </form>

          {/* Error Display */}
          {error && (
            <div style={{
              marginTop: '20px',
              padding: '14px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '10px',
              color: '#fca5a5',
              fontSize: '0.9rem'
            }}>
              ⚠️ <strong>Грешка:</strong> {error}
            </div>
          )}

          {/* Result Output */}
          {result && (
            <div style={{
              marginTop: '24px',
              padding: '20px',
              background: '#020617',
              border: '1px solid #6366f1',
              borderRadius: '14px'
            }}>
              <h3 style={{ margin: '0 0 12px 0', color: '#818cf8', fontSize: '1.1rem' }}>
                ✨ Твоят готов скрипт:
              </h3>
              <pre style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontFamily: 'inherit',
                color: '#e2e8f0',
                lineHeight: '1.6',
                margin: 0,
                fontSize: '0.95rem'
              }}>
                {result}
              </pre>
            </div>
          )}
        </section>

        {/* Pricing Cards */}
        <section style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px' }}>
            Избери абонаментен план
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '32px' }}>
            Получи неограничен достъп и създавай вирално съдържание всеки ден.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            alignItems: 'stretch'
          }}>
            
            {/* Starter Plan */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '18px',
              padding: '28px 20px',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              textAlign: 'left'
            }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '700', margin: '0 0 6px 0', color: '#f8fafc' }}>Starter</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 18px 0' }}>За начинаещи създатели</p>
                <div style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '20px', color: '#fff' }}>
                  €19.99 <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 'normal' }}>/месец</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#cbd5e1', lineHeight: '2.1', fontSize: '0.9rem' }}>
                  <li>✓ 50 AI Скрипта на месец</li>
                  <li>✓ Шаблони за TikTok & Reels</li>
                  <li>✓ Български & English</li>
                  <li>✓ Основни Hooks</li>
                </ul>
              </div>
              
              <a 
                href={STRIPE_STARTER_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: '28px',
                  padding: '12px',
                  background: '#1e293b',
                  color: '#fff',
                  borderRadius: '10px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontWeight: '700',
                  display: 'block',
                  border: '1px solid #334155',
                  fontSize: '0.95rem'
                }}
              >
                Вземи Starter 💳
              </a>
            </div>

            {/* Pro Plan */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.95)',
              border: '2px solid #818cf8',
              borderRadius: '18px',
              padding: '28px 20px',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              textAlign: 'left',
              position: 'relative',
              boxShadow: '0 15px 35px -10px rgba(99, 102, 241, 0.3)'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                right: '20px',
                background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                color: '#fff',
                fontSize: '0.75rem',
                padding: '3px 12px',
                borderRadius: '20px',
                fontWeight: '800'
              }}>
                ПОПУЛЯРЕН
              </div>

              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '700', margin: '0 0 6px 0', color: '#f8fafc' }}>Pro</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 18px 0' }}>За брандове и агенции</p>
                <div style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '20px', color: '#fff' }}>
                  €39.99 <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 'normal' }}>/месец</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#cbd5e1', lineHeight: '2.1', fontSize: '0.9rem' }}>
                  <li>✓ Неограничени AI Скриптове</li>
                  <li>✓ Генератор на Hooks & CTA</li>
                  <li>✓ Приоритетна бързина</li>
                  <li>✓ Всички езици</li>
                </ul>
              </div>

              <a 
                href={STRIPE_PRO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: '28px',
                  padding: '12px',
                  background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)',
                  color: '#fff',
                  borderRadius: '10px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontWeight: '800',
                  display: 'block',
                  fontSize: '0.95rem'
                }}
              >
                Вземи Pro 🚀
              </a>
            </div>

          </div>
        </section>

        {/* FAQ Section - Често Задавани Въпроси */}
        <section style={{ marginTop: '60px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', textAlign: 'center', marginBottom: '24px', color: '#f8fafc' }}>
            Често задавани въпроси
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, index) => (
              <div 
                key={index}
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    background: 'transparent',
                    border: 'none',
                    color: '#f8fafc',
                    fontSize: '1rem',
                    fontWeight: '600',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '1.2rem', color: '#818cf8', marginLeft: '10px' }}>
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                
                {openFaq === index && (
                  <div style={{
                    padding: '0 20px 18px 20px',
                    color: '#94a3b8',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    paddingTop: '12px'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
