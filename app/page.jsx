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

  const handleLogout = () => {
    localStorage.removeItem('shortsEngine_email');
    setIsLoggedIn(false);
    setEmail('');
    setResult('');
    setError('');
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
      setError('Изчерпахте вашия безплатен опит! Изберете абонаментен план по-долу, за да продължите.');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    const fullPrompt = `Create a viral short video script for ${platform} about: "${prompt}".
Tone of voice: ${tone}.
Language of the response/script: ${language}.
Structure:
1. HOOK (First 3 seconds - high converting engagement)
2. VISUAL & AUDIO DIRECTIVES (Exact scene descriptions and voiceover script)
3. CALL TO ACTION (CTA at the end for max retention & followers)`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: fullPrompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Възникна грешка при генерирането.');
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
      a: "ShortsEngine AI използва специално обучен изкуствен интелект за генериране на силно ангажиращи сценарии за TikTok, Instagram Reels и YouTube Shorts. Всеки скрипт съдържа грабваща кукичка (Hook), визуални инструкции и точен апел за действие (CTA)."
    },
    {
      q: "Защо се изисква имейл адрес?",
      a: "Имейлът гарантира сигурността на вашия профил, следи броя на вашите генерации в реално време и защитава платформата от злоупотреби с безплатния опит."
    },
    {
      q: "Мога ли да се откажа от абонамента си по всяко време?",
      a: "Да, абсолютно! Абонаментите през Stripe нямат обвързващи договори и можете да ги прекратите с един клик по всяко време."
    },
    {
      q: "Каква е разликата между Starter и Pro плана?",
      a: "Starter планът ви осигурява 50 AI скрипта на месец, идеално за един акаунт. Pro планът предлага неограничени генерации, приоритетна обработка и е перфектен за създатели с множество профили или агенции."
    }
  ];

  return (
    <div style={{
      backgroundColor: '#050505',
      backgroundImage: 'radial-gradient(circle at top, #200505 0%, #050505 80%)',
      color: '#ffffff',
      minHeight: '100vh',
      fontFamily: "'Inter', system-ui, sans-serif",
      padding: '40px 15px',
      boxSizing: 'border-box'
    }}>
      
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* HEADER */}
        <header style={{ textAlign: 'center', marginBottom: '35px' }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 16px',
            background: 'rgba(220, 38, 38, 0.12)',
            border: '1px solid rgba(220, 38, 38, 0.4)',
            borderRadius: '50px',
            color: '#ef4444',
            fontSize: '0.78rem',
            fontWeight: '800',
            marginBottom: '14px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            boxShadow: '0 0 15px rgba(220, 38, 38, 0.2)'
          }}>
            ⚡ SHORTSENGINE AI
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 2.8rem)',
            fontWeight: '900',
            lineHeight: '1.15',
            background: 'linear-gradient(135deg, #ffffff 30%, #fca5a5 70%, #dc2626 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 12px 0',
            letterSpacing: '-0.5px'
          }}>
            Генерирай вирални скриптове за секунди
          </h1>
          <p style={{ color: '#a1a1aa', fontSize: '0.95rem', margin: 0 }}>
            Автоматизирай съдържанието си за TikTok, Reels & Shorts с изкуствен интелект.
          </p>
        </header>

        {/* ФОРМА ЗА ВХОД ЧРЕЗ ИМЕЙЛ */}
        {!isLoggedIn ? (
          <section style={{
            background: '#0a0a0a',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '18px',
            padding: '32px 24px',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(220, 38, 38, 0.05)',
            marginBottom: '40px'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🔑</div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '8px', color: '#fff' }}>Въведете имейл за достъп</h2>
            <p style={{ color: '#71717a', fontSize: '0.88rem', marginBottom: '24px', lineHeight: '1.5' }}>
              Въведете вашия имейл, за да отключите <strong style={{ color: '#ef4444' }}>1 безплатен опит</strong> или да влезете в активния си профил.
            </p>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '10px',
                  background: '#121212',
                  border: '1px solid #27272a',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  textAlign: 'center'
                }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '14px',
                  background: 'linear-gradient(90deg, #dc2626 0%, #991b1b 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.98rem',
                  fontWeight: '800',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(220, 38, 38, 0.4)'
                }}
              >
                {loading ? 'Зареждане...' : 'Продължи към Генератора 🚀'}
              </button>
            </form>
            {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '14px' }}>⚠️ {error}</p>}
          </section>
        ) : (
          <>
            {/* БАНЕР ЗА АКТИВЕН АБОНАМЕНТ */}
            {isSubscribed && (
              <div style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '14px',
                padding: '16px',
                textAlign: 'center',
                marginBottom: '24px',
                color: '#4ade80'
              }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: '800' }}>🎉 Активен PRO Абонамент!</h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#a1a1aa' }}>
                  Влезли сте като: <strong style={{ color: '#fff' }}>{email}</strong>
                </p>
              </div>
            )}

            {/* ГЕНЕРАТОР КАРТА */}
            <section style={{
              background: '#0a0a0a',
              border: '1px solid #27272a',
              borderRadius: '18px',
              padding: '24px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
              marginBottom: '35px'
            }}>
              
              {/* ХЕДЪР НА ПРОФИЛА И БРОЯЧ */}
              <div style={{
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '14px',
                borderBottom: '1px solid #18181b'
              }}>
                <div>
                  <span style={{ fontSize: '0.82rem', color: '#71717a', display: 'block' }}>Профил:</span>
                  <span style={{ fontSize: '0.9rem', color: '#f4f4f5', fontWeight: '600' }}>{email}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    background: isSubscribed || generationsLeft > 0 ? 'rgba(220, 38, 38, 0.15)' : 'rgba(39, 39, 42, 0.8)',
                    border: isSubscribed || generationsLeft > 0 ? '1px solid rgba(220, 38, 38, 0.4)' : '1px solid #3f3f46',
                    padding: '6px 12px',
                    borderRadius: '30px',
                    fontSize: '0.78rem',
                    fontWeight: '800',
                    color: isSubscribed ? '#4ade80' : (generationsLeft > 0 ? '#ef4444' : '#a1a1aa')
                  }}>
                    {isSubscribed ? '✨ Неограничен' : `📊 Остават: ${generationsLeft} ${generationsLeft === 1 ? 'опит' : 'опита'}`}
                  </div>

                  <button
                    onClick={handleLogout}
                    title="Изход от акаунта"
                    style={{
                      background: '#18181b',
                      border: '1px solid #27272a',
                      color: '#a1a1aa',
                      padding: '6px 10px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    Изход 🚪
                  </button>
                </div>
              </div>
              
              {/* ФОРМА ЗА ГЕНЕРИРАНЕ */}
              <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', color: '#a1a1aa', fontSize: '0.8rem', fontWeight: '700' }}>Платформа</label>
                    <select value={platform} onChange={(e) => setPlatform(e.target.value)} style={{ width: '100%', padding: '11px', borderRadius: '8px', background: '#121212', border: '1px solid #27272a', color: '#fff', fontSize: '0.88rem', outline: 'none' }}>
                      <option value="TikTok">TikTok Short</option>
                      <option value="Instagram Reels">Instagram Reels</option>
                      <option value="YouTube Shorts">YouTube Shorts</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', color: '#a1a1aa', fontSize: '0.8rem', fontWeight: '700' }}>Тоналност</label>
                    <select value={tone} onChange={(e) => setTone(e.target.value)} style={{ width: '100%', padding: '11px', borderRadius: '8px', background: '#121212', border: '1px solid #27272a', color: '#fff', fontSize: '0.88rem', outline: 'none' }}>
                      <option value="Атрактивен / Вирален">Атрактивен / Вирален</option>
                      <option value="Образователен">Образователен</option>
                      <option value="Продажбен / Бизнес">Продажбен / Бизнес</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', color: '#a1a1aa', fontSize: '0.8rem', fontWeight: '700' }}>Език</label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ width: '100%', padding: '11px', borderRadius: '8px', background: '#121212', border: '1px solid #27272a', color: '#fff', fontSize: '0.88rem', outline: 'none' }}>
                      <option value="English">English 🇬🇧 / 🇺🇸</option>
                      <option value="Български">Български 🇧🇬</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', color: '#a1a1aa', fontSize: '0.8rem', fontWeight: '700' }}>Тема на видеото</label>
                  <textarea
                    rows="3"
                    placeholder="Напр. 3 бързи съвета за фитнес възстановяване..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    required
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#121212', border: '1px solid #27272a', color: '#fff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '14px',
                    background: loading ? '#27272a' : (generationsLeft > 0 || isSubscribed ? 'linear-gradient(90deg, #dc2626 0%, #991b1b 100%)' : '#18181b'),
                    color: loading ? '#71717a' : (generationsLeft > 0 || isSubscribed ? '#fff' : '#71717a'),
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.98rem',
                    fontWeight: '800',
                    cursor: (generationsLeft > 0 || isSubscribed) ? 'pointer' : 'not-allowed',
                    boxShadow: (generationsLeft > 0 || isSubscribed) ? '0 4px 15px rgba(220, 38, 38, 0.3)' : 'none'
                  }}
                >
                  {loading ? 'Генериране на AI Скрипт...' : (generationsLeft > 0 || isSubscribed ? '🔥 Генерирай Скрипт' : '🔒 Изчерпан опит - Изберете План')}
                </button>
              </form>

              {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '14px', textAlign: 'center' }}>⚠️ {error}</p>}

              {/* РЕЗУЛТАТ */}
              {result && (
                <div style={{ marginTop: '24px', padding: '18px', background: '#000', border: '1px solid #dc2626', borderRadius: '12px', boxShadow: '0 0 20px rgba(220, 38, 38, 0.15)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ margin: 0, color: '#ef4444', fontSize: '1rem', fontWeight: '800' }}>✨ Твоят генериран скрипт:</h3>
                    <button
                      onClick={() => navigator.clipboard.writeText(result)}
                      style={{ background: '#18181b', border: '1px solid #27272a', color: '#a1a1aa', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}
                    >
                      Копирай 📋
                    </button>
                  </div>
                  <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'inherit', color: '#e4e4e7', fontSize: '0.88rem', margin: 0, lineHeight: '1.6' }}>{result}</pre>
                </div>
              )}
            </section>

            {/* СЕКЦИЯ С ЦЕНИТЕ (ПЛАНОВЕ С ПЪЛНО ОПИСАНИЕ И STRIPE ЛИНКОВЕ) */}
            {!isSubscribed && (
              <section id="pricing" style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: '900', marginBottom: '8px' }}>Избери план за пълен достъп</h2>
                <p style={{ color: '#71717a', fontSize: '0.88rem', marginBottom: '28px' }}>Получете незабавен достъп и отключете потенциала на вашите видеа.</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                  
                  {/* STARTER PLAN */}
                  <div style={{
                    background: '#0a0a0a',
                    border: '1px solid #27272a',
                    borderRadius: '16px',
                    padding: '24px',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#a1a1aa', textTransform: 'uppercase' }}>За създатели</div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#fff', margin: '4px 0 12px 0' }}>Starter</h3>
                      <div style={{
