'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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
    if (urlParams.get('payment') === 'success' && savedEmail) {
      updateUserSubscription(savedEmail, urlParams.get('plan') || 'pro');
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
      let { data } = await supabase.from('users').select('*').eq('email', email).single();

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

  const handleLogout = () => {
    localStorage.removeItem('shortsEngine_email');
    setIsLoggedIn(false);
    setEmail('');
    setResult('');
    setError('');
  };

  const checkUserInDatabase = async (userEmail) => {
    try {
      let { data } = await supabase.from('users').select('*').eq('email', userEmail).single();
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
      setError('Изчерпахте вашия безплатен опит! Изберете абонаментен план по-долу.');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    const fullPrompt = `Create a viral short video script for ${platform} about: "${prompt}".
Tone: ${tone}.
Language: ${language}.
Structure: 1. HOOK, 2. VISUAL & AUDIO, 3. CALL TO ACTION.`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: fullPrompt }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Грешка при генериране.');

      setResult(data.data);
      
      if (!isSubscribed) {
        const newLeft = generationsLeft - 1;
        setGenerationsLeft(newLeft);
        await supabase.from('users').update({ generations_left: newLeft }).eq('email', email);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    { q: "Как работи ShortsEngine AI?", a: "Генерира вирални скриптове за TikTok, Reels и Shorts с вградени кукички (hooks), кадрови съвети и призиви за действие." },
    { q: "Защо се изисква имейл?", a: "За да защити профила ви и да проследява вашите безплатни и платени опити." },
    { q: "Мога ли да се откажа по всяко време?", a: "Да, абсолютно! Абонаментите през Stripe нямат обвързващи договори." },
    { q: "Каква е разликата между Starter и Pro?", a: "Starter е идеален за 1 акаунт с 50 скрипта/месец, докато Pro дава пълна неограниченост и комерсиален лиценз." }
  ];

  return (
    <div style={{
      backgroundColor: '#0b0f19',
      backgroundImage: 'radial-gradient(ellipse at 50% -20%, #2a0815 0%, #0b0f19 75%)',
      color: '#f3f4f6',
      minHeight: '100vh',
      padding: '50px 20px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>

        {/* HEADER */}
        <header style={{ textAlign: 'center', marginBottom: '45px' }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 18px',
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '50px',
            color: '#f87171',
            fontSize: '0.82rem',
            fontWeight: '800',
            marginBottom: '18px',
            letterSpacing: '0.5px',
            boxShadow: '0 0 25px rgba(239, 68, 68, 0.15)'
          }}>
            ⚡ SHORTSENGINE AI
          </div>
          <h1 style={{
            fontSize: '2.7rem',
            fontWeight: '900',
            letterSpacing: '-0.03em',
            margin: '0 0 12px 0',
            background: 'linear-gradient(180deg, #ffffff 30%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Генерирай вирални скриптове
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', margin: 0, fontWeight: '400' }}>
            Автоматизирай съдържанието си за TikTok, Reels & Shorts с изкуствен интелект.
          </p>
        </header>

        {!isLoggedIn ? (
          /* LOGIN CARD */
          <section style={{
            background: 'rgba(20, 27, 45, 0.7)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '24px',
            padding: '38px 28px',
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: '800', marginBottom: '8px', color: '#fff' }}>Въведете имейл за достъп</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', marginBottom: '26px' }}>Получете 1 безплатен опит или влезте в профила си.</p>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: '12px',
                  background: '#0f172a',
                  border: '1px solid #334155',
                  color: '#fff',
                  textAlign: 'center',
                  outline: 'none',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box'
                }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '15px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '800',
                  fontSize: '0.98rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 25px rgba(239, 68, 68, 0.35)'
                }}
              >
                {loading ? 'Зареждане...' : 'Продължи към Генератора 🚀'}
              </button>
            </form>
            {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '14px' }}>{error}</p>}
          </section>
        ) : (
          <>
            {isSubscribed && (
              <div style={{
                background: 'rgba(34, 197, 94, 0.12)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '16px',
                padding: '16px',
                textAlign: 'center',
                marginBottom: '28px',
                color: '#4ade80'
              }}>
                <strong>🎉 Активен PRO Абонамент!</strong> ({email})
              </div>
            )}

            {/* GENERATOR CARD */}
            <section style={{
              background: 'rgba(20, 27, 45, 0.8)',
              backdropFilter: 'blur(12px)',
              border: '1px solid #1e293b',
              borderRadius: '24px',
              padding: '30px',
              marginBottom: '45px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
            }}>
              {/* TOP BAR */}
              <div style={{
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                borderBottom: '1px solid #1e293b',
                paddingBottom: '18px'
              }}>
                <span style={{ fontSize: '0.92rem', color: '#cbd5e1', fontWeight: '500' }}>{email}</span>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    padding: '6px 14px',
                    borderRadius: '50px',
                    fontSize: '0.8rem',
                    color: '#f87171',
                    fontWeight: '800'
                  }}>
                    {isSubscribed ? '✨ Неограничен' : `📊 Опити: ${generationsLeft}`}
                  </span>
                  <button
                    onClick={handleLogout}
                    style={{
                      background: '#0f172a',
                      border: '1px solid #334155',
                      color: '#94a3b8',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}
                  >
                    Изход 🚪
                  </button>
                </div>
              </div>

              {/* FORM */}
              <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: '700' }}>Платформа</label>
                    <select value={platform} onChange={(e) => setPlatform(e.target.value)} style={{ width: '100%', padding: '12px', background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '10px', outline: 'none' }}>
                      <option value="TikTok">TikTok</option>
                      <option value="Instagram Reels">Reels</option>
                      <option value="YouTube Shorts">Shorts</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: '700' }}>Тоналност</label>
                    <select value={tone} onChange={(e) => setTone(e.target.value)} style={{ width: '100%', padding: '12px', background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '10px', outline: 'none' }}>
                      <option value="Атрактивен / Вирален">Вирален</option>
                      <option value="Образователен">Образователен</option>
                      <option value="Продажбен">Продажбен</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: '700' }}>Език</label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ width: '100%', padding: '12px', background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '10px', outline: 'none' }}>
                      <option value="English">English</option>
                      <option value="Български">Български</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: '700' }}>Тема на видеото</label>
                  <textarea
                    rows="3"
                    placeholder="Напр. 3 бързи съвета за фитнес възстановяване..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    required
                    style={{ width: '100%', padding: '14px', background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '10px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '16px',
                    background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(239, 68, 68, 0.35)'
                  }}
                >
                  {loading ? 'Генериране на скрипт...' : '🔥 Генерирай Скрипт'}
                </button>
              </form>

              {error && <p style={{ color: '#f87171', fontSize: '0.88rem', marginTop: '16px', textAlign: 'center' }}>{error}</p>}

              {result && (
                <div style={{ marginTop: '26px', padding: '22px', background: '#0a0e17', border: '1px solid #ef4444', borderRadius: '16px', boxShadow: '0 0 30px rgba(239, 68, 68, 0.15)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <strong style={{ color: '#f87171', fontSize: '1rem' }}>✨ Вашият AI Скрипт:</strong>
                    <button
                      onClick={() => navigator.clipboard.writeText(result)}
                      style={{ background: '#1e293b', color: '#f3f4f6', border: '1px solid #334155', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' }}
                    >
                      Копирай 📋
                    </button>
                  </div>
                  <pre style={{ whiteSpace: 'pre-wrap', color: '#e2e8f0', fontSize: '0.92rem', margin: 0, lineHeight: '1.65', fontFamily: 'inherit' }}>{result}</pre>
                </div>
              )}
            </section>

            {/* PRICING SECTION */}
            {!isSubscribed && (
              <section style={{ textAlign: 'center', marginBottom: '55px' }}>
                <h2 style={{ fontSize: '1.7rem', fontWeight: '900', marginBottom: '8px' }}>Избери абонаментен план</h2>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '32px' }}>Отключи пълния потенциал на твоя профил или агенция.</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '22px' }}>
                  
                  {/* STARTER */}
                  <div style={{
                    background: 'rgba(20, 27, 45, 0.7)',
                    border: '1px solid #1e293b',
                    borderRadius: '20px',
                    padding: '30px 24px',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                  }}>
                    <div>
                      <span style={{ color: '#94a3b8', fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>За самостоятелни създатели</span>
                      <h3 style={{ fontSize: '1.35rem', margin: '6px 0 0 0', color: '#fff', fontWeight: '800' }}>Starter</h3>
                      
                      <div style={{ fontSize: '2.2rem', fontWeight: '900', margin: '16px 0', color: '#fff' }}>
                        €19.99 <span style={{ fontSize: '0.88rem', color: '#94a3b8', fontWeight: '400' }}>/месец</span>
                      </div>

                      <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0', color: '#cbd5e1', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#ef4444' }}>✓</span> <strong>50 AI скрипта</strong> всеки месец</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#ef4444' }}>✓</span> TikTok, Reels & Shorts формати</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#ef4444' }}>✓</span> Грабващи кукички (Viral Hooks)</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#ef4444' }}>✓</span> Визуални и звукови директиви</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#ef4444' }}>✓</span> Български и Английски език</li>
                      </ul>
                    </div>

                    <a
                      href={STRIPE_STARTER_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'block',
                        marginTop: '20px',
                        padding: '14px',
                        background: '#0f172a',
                        border: '1px solid #334155',
                        color: '#fff',
                        textAlign: 'center',
                        textDecoration: 'none',
                        borderRadius: '12px',
                        fontWeight: '800',
                        fontSize: '0.92rem'
                      }}
                    >
                      Купи Starter 💳
                    </a>
                  </div>

                  {/* PRO */}
                  <div style={{
                    background: 'rgba(20, 27, 45, 0.95)',
                    border: '2px solid #ef4444',
                    borderRadius: '20px',
                    padding: '30px 24px',
                    textAlign: 'left',
                    display: 'flex',
                 
