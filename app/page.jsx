'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    const savedEmail = localStorage.getItem('shortsEngine_email');
    if (savedEmail) {
      setEmail(savedEmail);
      checkUserInDatabase(savedEmail);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');
    const selectedPlan = urlParams.get('plan');

    if (paymentStatus === 'success' && savedEmail) {
      updateUserSubscription(savedEmail, selectedPlan || 'pro');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Моля, въведете валиден имейл адрес.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let { data, error: dbError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (!data) {
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert([{ email, generations_left: 1, is_subscribed: false }])
          .select()
          .single();

        if (insertError) throw insertError;
        data = newUser;
      }

      localStorage.setItem('shortsEngine_email', email);
      setIsLoggedIn(true);
      setIsSubscribed(data.is_subscribed);
      setGenerationsLeft(data.generations_left);
    } catch (err) {
      setError('Възникна грешка при входа. Моля, опитайте отново.');
    } finally {
      setLoading(false);
    }
  };

  const checkUserInDatabase = async (userEmail) => {
    try {
      let { data } = await supabase
        .from('users')
        .select('*')
        .eq('email', userEmail)
        .single();

      if (data) {
        setIsLoggedIn(true);
        setIsSubscribed(data.is_subscribed);
        setGenerationsLeft(data.generations_left);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateUserSubscription = async (userEmail, plan) => {
    try {
      await supabase
        .from('users')
        .update({ is_subscribed: true, plan_type: plan, generations_left: plan === 'starter' ? 50 : 999 })
        .eq('email', userEmail);

      setIsSubscribed(true);
      setGenerationsLeft(plan === 'starter' ? 50 : 999);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (generationsLeft <= 0 && !isSubscribed) {
      setError('Вие изчерпахте вашия безплатен опит! Изберете абонаментен план по-долу.');
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
        const newLeft = generationsLeft - 1;
        setGenerationsLeft(newLeft);
        await supabase
          .from('users')
          .update({ generations_left: newLeft })
          .eq('email', email);
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
      a: "Генерира професионални вирални сценарии за TikTok, Instagram Reels и YouTube Shorts с включена кукичка (Hook) и призив към действие (CTA)."
    },
    {
      q: "Защо се изисква имейл?",
      a: "Имейлът гарантира сигурността на вашия акаунт и защитата на безплатния опит срещу повторни опити."
    }
  ];

  return (
    <div style={{
      background: 'radial-gradient(circle at top, #0f172a 0%, #020617 100%)',
      color: '#f8fafc',
      minHeight: '100vh',
      fontFamily: "'Inter', sans-serif",
      padding: '30px 15px',
      boxSizing: 'border-box'
    }}>
      
      <div style={{ maxWidth: '650px', margin: '0 auto' }}>

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
            margin: '0 0 10px 0'
          }}>
            Генерирай вирални скриптове за секунди
          </h1>
        </header>

        {!isLoggedIn ? (
          <section style={{
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '28px',
            textAlign: 'center',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5)',
            marginBottom: '35px'
          }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#f8fafc' }}>🔑 Въведете имейл за достъп</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '20px' }}>
              Въведете своя имейл адрес, за да получите 1 безплатен опит или да влезете в профила си.
            </p>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#020617', border: '1px solid #334155', color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', textAlign: 'center' }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{ padding: '12px', background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer' }}
              >
                {loading ? 'Зареждане...' : 'Продължи към Генератора 🚀'}
              </button>
            </form>
            {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '12px' }}>{error}</p>}
          </section>
        ) : (
          <>
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
                <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>🎉 Активен Абонамент!</h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#cbd5e1' }}>
                  Влезли сте като: <strong>{email}</strong>
                </p>
              </div>
            )}

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
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>👤 {email}</span>
                <span style={{
                  background: isSubscribed || generationsLeft > 0 ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  border: isSubscribed || generationsLeft > 0 ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                  color: isSubscribed || generationsLeft > 0 ? '#4ade80' : '#f87171',
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
                    <label style={{ display: 'block', marginBottom: '4px', color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '600' }}>Платформа</label>
                    <select value={platform} onChange={(e) => setPlatform(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#020617', border: '1px solid #334155', color: '#fff', fontSize: '0.88rem' }}>
                      <option value="TikTok">TikTok Short</option>
                      <option value="Instagram Reels">Instagram Reels</option>
                      <option value="YouTube Shorts">YouTube Shorts</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '600' }}>Тоналност</label>
                    <select value={tone} onChange={(e) => setTone(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#020617', border: '1px solid #334155', color: '#fff', fontSize: '0.88rem' }}>
                      <option value="Атрактивен / Вирален">Атрактивен / Вирален</option>
                      <option value="Образователен">Образователен</option>
                      <option value="Продажбен / Бизнес">Продажбен / Бизнес</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '600' }}>Език</label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#020617', border: '1px solid #334155', color: '#fff', fontSize: '0.88rem' }}>
                      <option value="English">English 🇬🇧 / 🇺🇸</option>
                      <option value="Български">Български 🇧🇬</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '4px', color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '600' }}>За какво се отнася видеото?</label>
                  <textarea rows="3" placeholder="Напр. 3 грешки при започване на бизнес..." value={prompt} onChange={(e) => setPrompt(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#020617', border: '1px solid #334155', color: '#fff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
                </div>

                <button type="submit" disabled={loading} style={{ padding: '12px', background: loading ? '#475569' : (generationsLeft > 0 || isSubscribed ? 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)' : '#334155'), color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer' }}>
                  {loading ? 'Генериране...' : (generationsLeft > 0 || isSubscribed ? '🔥 Генерирай Скрипт' : '🔒 Изчерпан опит - Абонирай се')}
                </button>
              </form>

              {error && <p style={{ color: '#fca5a5', fontSize: '0.85rem', marginTop: '12px', textAlign: 'center' }}>⚠️ {error}</p>}

              {result && (
                <div style={{ marginTop: '20px', padding: '16px', background: '#020617', border: '1px solid #6366f1', borderRadius: '12px' }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#818cf8', fontSize: '1rem' }}>✨ Твоят генериран скрипт:</h3>
                  <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'inherit', color: '#e2e8f0', fontSize: '0.88rem', margin: 0 }}>{result}</pre>
                </div>
              )}
            </section>

            {!isSubscribed && (
              <section id="pricing" style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '20px' }}>Избери план за пълен достъп</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  
                  <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid #334155', borderRadius: '14px', padding: '20px', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', color: '#fff' }}>Starter</h3>
                      <div style={{ fontSize: '1.8rem', fontWeight: '800', margin: '10px 0', color: '#fff' }}>€19.99 <span style={{ fontSize: '0.8rem', color: '#64748b' }}>/мес</span></div>
                      <p style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>✓ 50 AI Скрипта на месец</p>
                    </div>
                    <a href={STRIPE_STARTER_LINK} target="_blank" rel="noopener noreferrer" style={{ marginTop: '20px', padding: '10px', background: '#1e293b', color: '#fff', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', fontWeight: '700', fontSize: '0.88rem' }}>Купи Starter 💳</a>
                  </div>

                  <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '2px solid #818cf8', borderRadius: '14px', padding: '20px', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', color: '#fff' }}>Pro</h3>
                      <div style={{ fontSize: '1.8rem', fontWeight: '800', margin: '10px 0', color: '#fff' }}>€39.99 <span style={{ fontSize: '0.8rem', color: '#64748b' }}>/мес</span></div>
                      <p style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>✓ Неограничени скриптове</p>
                    </div>
                    <a href={STRIPE_PRO_LINK} target="_blank" rel="noopener noreferrer" style={{ marginTop: '20px', padding: '10px', background: 'linear-gradient(90deg, #6366f1, #a855f7)', color: '#fff', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', fontWeight: '800', fontSize: '0.88rem' }}>Купи Pro 🚀</a>
                  </div>

                </div>
              </section>
            )}
          </>
        )}

      </div>
    </div>
  );
}
