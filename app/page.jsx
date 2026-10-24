'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState('TikTok');
  const [tone, setTone] = useState('Атрактивен / Вирален');
  const [language, setLanguage] = useState('English');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  
  const [generationsLeft, setGenerationsLeft] = useState(1);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const STRIPE_STARTER_LINK = "https://buy.stripe.com/3cI9AU3HvfAs89W6TI67S01";
  const STRIPE_PRO_LINK = "https://buy.stripe.com/5kQaEY6THag875Sa5U67S00";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');

    if (paymentStatus === 'success') {
      setIsSubscribed(true);
      setGenerationsLeft(999);
      localStorage.setItem('shortsEngine_subscribed', 'true');
      localStorage.removeItem('shortsEngine_used');
    } else if (localStorage.getItem('shortsEngine_subscribed') === 'true') {
      setIsSubscribed(true);
      setGenerationsLeft(999);
    } else if (localStorage.getItem('shortsEngine_used') === 'true') {
      setGenerationsLeft(0);
    }
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (generationsLeft <= 0 && !isSubscribed) {
      setError('Вие използвахте вашия безплатен опит! Изберете абонаментен план по-долу, за да отключите неограничен достъп.');
      return;
    }

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
      
      if (!isSubscribed) {
        setGenerationsLeft(0);
        localStorage.setItem('shortsEngine_used', 'true');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: "Как работи ShortsEngine AI?",
      a: "Нашият изкуствен интелект генерира професионални вирални сценарии за TikTok, Instagram Reels и YouTube Shorts с включени грабваща кукичка (Hook), визуален план и призив към действие (CTA)."
    },
    {
      q: "Мога ли да генерирам съдържание на Български език?",
      a: "Да! Поддържаме както Английски за международна аудитория, така и Български език с перфектна граматика и подходящ тоналност."
    },
    {
      q: "Как се активира достъпът след плащане?",
      a: "Веднага след плащането в Stripe ще бъдете върнати на сайта и вашият акаунт получава незабавен достъп до платформата."
    },
    {
      q: "Мога ли да прекратя абонамента си по всяко време?",
      a: "Да, няма никакви обвързващи договори. Можете да се откажете по всяко време с един клик."
    }
  ];

  return (
    <div style={{
      background: 'radial-gradient(circle at top, #0f172a 0%, #020617 100%)',
      color: '#f8fafc',
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      padding: '30px 15px',
      boxSizing: 'border-box'
    }}>
      
      {/* Компактен контейнер (max-width: 650px) */}
      <div style={{ maxWidth: '650px', margin: '0 auto' }}>

        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            display: 'inline-block',
            padding: '5px 14px',
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '50px',
            color: '#818cf8',
            fontSize: '0.75rem',
            fontWeight: '700',
            marginBottom: '12px',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            ⚡ SHORTSENGINE AI
          </div>

          <h1 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: '900',
            lineHeight: '1.15',
            background: 'linear-gradient(135deg, #ffffff 0%, #a5f3fc 40%, #c084fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 10px 0',
            letterSpacing: '-0.5px'
          }}>
            Генерирай вирални скриптове за секунди
          </h1>

          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.4', margin: '0 auto' }}>
            Превърни идеите си във вирални сценарии за TikTok, Instagram Reels и Shorts.
          </p>
        </header>

        {/* Банер за успешен абонамент */}
        {isSubscribed && (
          <div style={{
            background: 'rgba(34, 197, 94, 0.15)',
            border: '1px solid rgba(34, 197, 94, 0.4)',
            borderRadius: '14px',
            padding: '16px',
            textAlign: 'center',
            marginBottom: '24px',
            color: '#4ade80'
          }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>🎉 Плащането е успешно!</h3>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#cbd5e1' }}>
              Вашият PRO абонамент е активен. Насладете се на неограничени AI генерации!
            </p>
          </div>
        )}

        {/* Generator Card */}
        <section style={{
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '22px',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5)',
          marginBottom: '35px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: '700', margin: 0, color: '#f8fafc' }}>
              🚀 Генератор на Скриптове
            </h2>
            <span style={{
              background: isSubscribed ? 'rgba(34, 197, 94, 0.15)' : (generationsLeft > 0 ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)'),
              border: isSubscribed ? '1px solid rgba(34, 197, 94, 0.3)' : (generationsLeft > 0 ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'),
              color: isSubscribed ? '#4ade80' : (generationsLeft > 0 ? '#4ade80' : '#f87171'),
              fontSize: '0.75rem',
              fontWeight: '700',
              padding: '3px 10px',
              borderRadius: '20px'
            }}>
              {isSubscribed ? '✨ PRO Неограничен' : (generationsLeft > 0 ? '1 Безплатен Опит' : 'Заключен')}
            </span>
          </div>
          
          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '600' }}>
                  Платформа
                </label>
                <select value={platform} onChange={(e) => setPlatform(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#020617', border: '1px solid #334155', color: '#fff', fontSize: '0.88rem', outline: 'none' }}>
                  <option value="TikTok">TikTok Short</option>
                  <option value="Instagram Reels">Instagram Reels</option>
                  <option value="YouTube Shorts">YouTube Shorts</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '4px', color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '600' }}>
                  Тоналност
                </label>
                <select value={tone} onChange={(e) => setTone(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#020617', border: '1px solid #334155', color: '#fff', fontSize: '0.88rem', outline: 'none' }}>
                  <option value="Атрактивен / Вирален">Атрактивен / Вирален</option>
                  <option value="Образователен">Образователен</option>
                  <option value="Продажбен / Бизнес">Продажбен / Бизнес</option>
                  <option value="Забавен / Хумористичен">Забавен / Хумористичен</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '4px', color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '600' }}>
                  Език
                </label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#020617', border: '1px solid #334155', color: '#fff', fontSize: '0.88rem', outline: 'none' }}>
                  <option value="English">English 🇬🇧 / 🇺🇸</option>
                  <option value="Български">Български 🇧🇬</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '4px', color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '600' }}>
                За какво се отнася видеото?
              </label>
              <textarea
                rows="3"
                placeholder="Напр. 3 грешки при започване на онлайн бизнес..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#020617', border: '1px solid #334155', color: '#fff', fontSize: '0.9rem', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '12px',
                background: loading ? '#475569' : (generationsLeft > 0 || isSubscribed ? 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)' : '#334155'),
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Генериране...' : (generationsLeft > 0 || isSubscribed ? '🔥 Генерирай Скрипт' : '🔒 Абонирай се за отключване')}
            </button>
          </form>

          {error && (
            <div style={{ marginTop: '16px', padding: '14px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '10px', color: '#fca5a5', textAlign: 'center', fontSize: '0.88rem' }}>
              ⚠️ <strong>{error}</strong>
              {!isSubscribed && (
                <div style={{ marginTop: '8px' }}>
                  <a href="#pricing" style={{ color: '#c084fc', textDecoration: 'underline', fontWeight: 'bold' }}>Виж плановете за плащане ↓</a>
                </div>
              )}
            </div>
          )}

          {result && (
            <div style={{ marginTop: '20px', padding: '16px', background: '#020617', border: '1px solid #6366f1', borderRadius: '12px' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#818cf8', fontSize: '1rem' }}>
                ✨ Твоят генериран скрипт:
              </h3>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'inherit', color: '#e2e8f0', lineHeight: '1.5', margin: 0, fontSize: '0.88rem' }}>
                {result}
              </pre>
            </div>
          )}
        </section>

        {/* Секция с цените (Скрива се напълно след плащане!) */}
        {!isSubscribed && (
          <section id="pricing" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '6px' }}>
              Избери план за пълен достъп
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '24px' }}>
              Отключи неограничен AI потенциал за вашите социални мрежи.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', alignItems: 'stretch' }}>
              
              {/* Starter Plan */}
              <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '20px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0 0 4px 0', color: '#f8fafc' }}>Starter</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: '0 0 14px 0' }}>За започващи творци</p>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '16px', color: '#fff' }}>
                    €19.99 <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'normal' }}>/месец</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#cbd5e1', lineHeight: '1.8', fontSize: '0.82rem' }}>
                    <li>✓ 50 AI Скрипта на месец</li>
                    <li>✓ Шаблони за TikTok & Reels</li>
                    <li>✓ Български & English език</li>
                    <li>✓ Включени вирални Hooks</li>
                    <li>✓ Стандартна бързина</li>
                  </ul>
                </div>
                
                <a href={STRIPE_STARTER_LINK} target="_blank" rel="noopener noreferrer" style={{ marginTop: '20px', padding: '10px', background: '#1e293b', color: '#fff', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', fontWeight: '700', fontSize: '0.88rem', display: 'block', border: '1px solid #334155' }}>
                  Купи Starter 💳
                </a>
              </div>

              {/* Pro Plan */}
              <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '2px solid #818cf8', borderRadius: '14px', padding: '20px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left', position: 'relative', boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.3)' }}>
                <div style={{ position: 'absolute', top: '-10px', right: '14px', background: 'linear-gradient(90deg, #6366f1, #a855f7)', color: '#fff', fontSize: '0.68rem', padding: '2px 10px', borderRadius: '20px', fontWeight: '800' }}>
                  ПОПУЛЯРЕН
                </div>

                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0 0 4px 0', color: '#f8fafc' }}>Pro</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: '0 0 14px 0' }}>За брандове & агенции</p>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '16px', color: '#fff' }}>
                    €39.99 <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'normal' }}>/месец</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#cbd5e1', lineHeight: '1.8', fontSize: '0.82rem' }}>
                    <li>✓ <strong>Неограничени</strong> AI Скриптове</li>
                    <li>✓ Приоритетна супер-бързина</li>
                    <li>✓ Вирални Hooks & CTA бутони</li>
                    <li>✓ Неограничени езици и тоналности</li>
                    <li>✓ VIP Поддръжка 24/7</li>
                  </ul>
                </div>

                <a href={STRIPE_PRO_LINK} target="_blank" rel="noopener noreferrer" style={{ marginTop: '20px', padding: '10px', background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)', color: '#fff', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', fontWeight: '800', fontSize: '0.88rem', display: 'block' }}>
                  Купи Pro 🚀
                </a>
              </div>

            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', textAlign: 'center', marginBottom: '18px', color: '#f8fafc' }}>
            Често Задавани Въпроси (FAQ)
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  style={{ width: '100%', padding: '14px 16px', background: 'transparent', border: 'none', color: '#f8fafc', fontSize: '0.9rem', fontWeight: '600', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '1.1rem', color: '#818cf8', marginLeft: '8px' }}>
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                
                {openFaq === index && (
                  <div style={{ padding: '0 16px 14px 16px', color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '10px' }}>
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
