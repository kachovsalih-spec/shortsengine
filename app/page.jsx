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
  
  // Управление на лимитите спрямо плана
  const [generationsLeft, setGenerationsLeft] = useState(1);
  const [planType, setPlanType] = useState(null); // 'starter', 'pro' или null
  const [openFaq, setOpenFaq] = useState(null);

  // Твоите Stripe линкове
  const STRIPE_STARTER_LINK = "https://buy.stripe.com/3cI9AU3HvfAs89W6TI67S01";
  const STRIPE_PRO_LINK = "https://buy.stripe.com/5kQaEY6THag875Sa5U67S00";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');
    const selectedPlan = urlParams.get('plan'); // 'starter' или 'pro'

    if (paymentStatus === 'success') {
      if (selectedPlan === 'starter') {
        setPlanType('starter');
        setGenerationsLeft(50); // 50 скрипта за Starter
        localStorage.setItem('shortsEngine_plan', 'starter');
        localStorage.setItem('shortsEngine_generations', '50');
      } else {
        setPlanType('pro');
        setGenerationsLeft(999); // Неограничено за Pro
        localStorage.setItem('shortsEngine_plan', 'pro');
        localStorage.setItem('shortsEngine_generations', '999');
      }
      localStorage.removeItem('shortsEngine_used');
    } else {
      // Проверка в паметта на браузъра
      const savedPlan = localStorage.getItem('shortsEngine_plan');
      const savedGens = localStorage.getItem('shortsEngine_generations');
      
      if (savedPlan) {
        setPlanType(savedPlan);
        setGenerationsLeft(savedGens ? parseInt(savedGens) : (savedPlan === 'starter' ? 50 : 999));
      } else if (localStorage.getItem('shortsEngine_used') === 'true') {
        setGenerationsLeft(0);
      }
    }
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (generationsLeft <= 0) {
      setError('Изчерпахте вашите генерации! Моля, изберете план по-долу, за да продължите.');
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
      
      // Намаляваме брояча само ако потребителят е на Starter или безплатен план
      if (planType !== 'pro') {
        const newLeft = generationsLeft - 1;
        setGenerationsLeft(newLeft);
        if (planType === 'starter') {
          localStorage.setItem('shortsEngine_generations', newLeft.toString());
        } else {
          localStorage.setItem('shortsEngine_used', 'true');
        }
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
      a: "Генерира структурирани вирални сценарии за TikTok, Reels и Shorts с включена кукичка (Hook) и призив към действие (CTA)."
    },
    {
      q: "Каква е разликата между Starter и Pro плана?",
      a: "Starter планът включва 50 AI скрипта на месец (€19.99), докато Pro планът предоставя неограничени генерации и приоритетна бързина (€39.99)."
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
      
      <div style={{ maxWidth: '750px', margin: '0 auto' }}>

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
        </header>

        {planType && (
          <div style={{
            background: 'rgba(34, 197, 94, 0.15)',
            border: '1px solid rgba(34, 197, 94, 0.4)',
            borderRadius: '16px',
            padding: '20px',
            textAlign: 'center',
            marginBottom: '30px',
            color: '#4ade80'
          }}>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '1.2rem' }}>🎉 Успешен абонамент ({planType === 'pro' ? 'Pro' : 'Starter'})!</h3>
            <p style={{ margin: 0, fontSize: '0.95rem', color: '#cbd5e1' }}>
              {planType === 'pro' ? 'Имате неограничен достъп до генератора!' : `Остават ви ${generationsLeft} генерации за този месец.`}
            </p>
          </div>
        )}

        <section style={{
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '28px',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5)',
          marginBottom: '50px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '700', margin: 0, color: '#f8fafc' }}>
              🚀 Генератор на Скриптове
            </h2>
            <span style={{
              background: generationsLeft > 0 ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              border: generationsLeft > 0 ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
              color: generationsLeft > 0 ? '#4ade80' : '#f87171',
              fontSize: '0.8rem',
              fontWeight: '700',
              padding: '4px 12px',
              borderRadius: '20px'
            }}>
              {planType ? (planType === 'pro' ? '✨ Pro (Неограничено)' : `Starter (${generationsLeft} остават)`) : (generationsLeft > 0 ? '1 Безплатен Опит' : 'Заключен')}
            </span>
          </div>
          
          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: '600' }}>Платформа</label>
                <select value={platform} onChange={(e) => setPlatform(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', background: '#020617', border: '1px solid #334155', color: '#fff', outline: 'none' }}>
                  <option value="TikTok">TikTok Short</option>
                  <option value="Instagram Reels">Instagram Reels</option>
                  <option value="YouTube Shorts">YouTube Shorts</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: '600' }}>Тоналност</label>
                <select value={tone} onChange={(e) => setTone(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', background: '#020617', border: '1px solid #334155', color: '#fff', outline: 'none' }}>
                  <option value="Атрактивен / Вирален">Атрактивен / Вирален</option>
                  <option value="Образователен">Образователен</option>
                  <option value="Продажбен / Бизнес">Продажбен / Бизнес</option>
                  <option value="Забавен / Хумористичен">Забавен / Хумористичен</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: '600' }}>Език на скрипта</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', background: '#020617', border: '1px solid #334155', color: '#fff', outline: 'none' }}>
                  <option value="English">English 🇬🇧 / 🇺🇸</option>
                  <option value="Български">Български 🇧🇬</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: '600' }}>За какво се отнася видеото?</label>
              <textarea rows="3" placeholder="Напр. 3 грешки при започване на бизнес..." value={prompt} onChange={(e) => setPrompt(e.target.value)} required style={{ width: '100%', padding: '14px', borderRadius: '10px', background: '#020617', border: '1px solid #334155', color: '#fff', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <button type="submit" disabled={loading} style={{ padding: '14px', background: loading ? '#475569' : (generationsLeft > 0 ? 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)' : '#334155'), color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Генериране...' : (generationsLeft > 0 ? '🔥 Генерирай Скрипт' : '🔒 Изчерпани опита - Абонирай се')}
            </button>
          </form>

          {error && (
            <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '12px', color: '#fca5a5', textAlign: 'center' }}>
              ⚠️ <strong>{error}</strong>
            </div>
          )}

          {result && (
            <div style={{ marginTop: '24px', padding: '20px', background: '#020617', border: '1px solid #6366f1', borderRadius: '14px' }}>
              <h3 style={{ margin: '0 0 12px 0', color: '#818cf8', fontSize: '1.1rem' }}>✨ Твоят генериран скрипт:</h3>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'inherit', color: '#e2e8f0', lineHeight: '1.6', margin: 0, fontSize: '0.95rem' }}>{result}</pre>
            </div>
          )}
        </section>

        {/* Pricing Section */}
        <section id="pricing" style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px' }}>Избери план за пълен достъп</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '24px' }}>
            
            <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '28px 20px', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#f8fafc' }}>Starter</h3>
                <div style={{ fontSize: '2.2rem', fontWeight: '800', margin: '20px 0', color: '#fff' }}>€19.99 <span style={{ fontSize: '0.9rem', color: '#64748b' }}>/месец</span></div>
                <ul style={{ listStyle: 'none', padding: 0, color: '#cbd5e1', lineHeight: '2.1', fontSize: '0.9rem' }}>
                  <li>✓ 50 AI Скрипта на месец</li>
                  <li>✓ TikTok & Reels шаблони</li>
                </ul>
              </div>
              <a href={STRIPE_STARTER_LINK} target="_blank" rel="noopener noreferrer" style={{ marginTop: '28px', padding: '12px', background: '#1e293b', color: '#fff', borderRadius: '10px', textAlign: 'center', textDecoration: 'none', fontWeight: '700', display: 'block' }}>Купи Starter 💳</a>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '2px solid #818cf8', borderRadius: '18px', padding: '28px 20px', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#f8fafc' }}>Pro</h3>
                <div style={{ fontSize: '2.2rem', fontWeight: '800', margin: '20px 0', color: '#fff' }}>€39.99 <span style={{ fontSize: '0.9rem', color: '#64748b' }}>/месец</span></div>
                <ul style={{ listStyle: 'none', padding: 0, color: '#cbd5e1', lineHeight: '2.1', fontSize: '0.9rem' }}>
                  <li>✓ Неограничени скриптове</li>
                  <li>✓ Приоритетна бързина</li>
                </ul>
              </div>
              <a href={STRIPE_PRO_LINK} target="_blank" rel="noopener noreferrer" style={{ marginTop: '28px', padding: '12px', background: 'linear-gradient(90deg, #6366f1, #a855f7)', color: '#fff', borderRadius: '10px', textAlign: 'center', textDecoration: 'none', fontWeight: '800', display: 'block' }}>Купи Pro 🚀</a>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
