'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import PricingSection from '../components/PricingSection';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState('TikTok');
  const [tone, setTone] = useState('Забавен & Интересен');
  const [language, setLanguage] = useState('Български');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  
  const [generationsLeft, setGenerationsLeft] = useState(1);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const STRIPE_STARTER_LINK = "https://buy.stripe.com/3cI9AU3HvfAs89W6TI67S01";
  const STRIPE_PRO_LINK = "https://buy.stripe.com/5kQaEY6THag875Sa5U67S00";

  useEffect(() => {
    const saved = localStorage.getItem('shortsEngine_email');
    if (saved) {
      setEmail(saved);
      loadUser(saved);
    }

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success' && saved) {
      updateUserSubscription(saved, urlParams.get('plan') || 'pro');
    }
  }, []);

  const loadUser = async (uEmail) => {
    try {
      let { data } = await supabase.from('users').select('*').eq('email', uEmail).single();
      if (data) {
        setIsLoggedIn(true);
        setIsSubscribed(data.is_subscribed);
        setGenerationsLeft(data.generations_left);
      }
    } catch (e) { console.error(e); }
  };

  const updateUserSubscription = async (userEmail, plan) => {
    try {
      await supabase
        .from('users')
        .update({ is_subscribed: true, plan_type: plan, generations_left: plan === 'starter' ? 50 : 999 })
        .eq('email', userEmail);
      setIsSubscribed(true);
      setGenerationsLeft(plan === 'starter' ? 50 : 999);
    } catch (err) { console.error(err); }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) { setError('Моля, въведете валиден имейл адрес.'); return; }
    setLoading(true); setError('');
    try {
      let { data } = await supabase.from('users').select('*').eq('email', email).single();
      if (!data) {
        const { data: nUser } = await supabase.from('users').insert([{ email, generations_left: 1, is_subscribed: false }]).select().single();
        data = nUser;
      }
      localStorage.setItem('shortsEngine_email', email);
      setIsLoggedIn(true); setIsSubscribed(data.is_subscribed); setGenerationsLeft(data.generations_left);
    } catch (err) { setError('Грешка при вход. Опитайте отново.'); }
    finally { setLoading(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem('shortsEngine_email');
    setIsLoggedIn(false); setEmail(''); setResult('');
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (generationsLeft <= 0 && !isSubscribed) { setError('Изчерпахте вашите безплатни опити! Изберете план по-долу.'); return; }
    setLoading(true); setError(''); setResult('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `Create a viral short script for ${platform}: ${prompt}. Style: ${tone}. Language: ${language}. Structure: 1. HOOK, 2. VISUAL & AUDIO, 3. CALL TO ACTION.` }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Грешка при генериране.');
      setResult(data.data);
      if (!isSubscribed) {
        const left = generationsLeft - 1;
        setGenerationsLeft(left);
        await supabase.from('users').update({ generations_left: left }).eq('email', email);
      }
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const faqs = [
    { q: "Как работи ShortsEngine AI?", a: "Използва изкуствен интелект за генериране на вирални скриптове с грабващи кукички (hooks), кадрови инструкции и точен апел за действие." },
    { q: "Защо се изисква имейл адрес?", a: "Имейлът гарантира сигурността на вашия профил и следи оставащите ви опити в реално време." },
    { q: "Мога ли да се откажа по всяко време?", a: "Да! Абонаментите в Stripe нямат обвързващи договори и се прекратяват с един клик." },
    { q: "Каква е разликата между Starter и Pro?", a: "Starter включва 50 скрипта/месец за един профил, а Pro ви осигурява неограничени генерации, приоритет и пълен търговски лиценз." }
  ];

  return (
    <div style={{
      backgroundColor: '#07090e',
      backgroundImage: 'radial-gradient(at 50% 0%, rgba(220, 38, 38, 0.18) 0px, transparent 60%), radial-gradient(at 0% 100%, rgba(15, 23, 42, 0.9) 0px, transparent 50%)',
      color: '#f1f5f9',
      minHeight: '100vh',
      padding: '50px 20px',
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            background: 'rgba(220, 38, 38, 0.12)',
            border: '1px solid rgba(220, 38, 38, 0.35)',
            borderRadius: '99px',
            color: '#f87171',
            fontSize: '0.82rem',
            fontWeight: '800',
            letterSpacing: '0.5px',
            boxShadow: '0 0 20px rgba(220, 38, 38, 0.2)',
            marginBottom: '16px'
          }}>
            ⚡ SHORTSENGINE AI
          </div>
          <h1 style={{
            fontSize: '2.8rem',
            fontWeight: '900',
            letterSpacing: '-0.03em',
            margin: '0 0 10px 0',
            background: 'linear-gradient(180deg, #ffffff 40%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Генерирай вирални скриптове
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', margin: 0, fontWeight: '500' }}>
            Автоматизирай съдържанието си за TikTok, Reels & Shorts с AI.
          </p>
        </header>

        {!isLoggedIn ? (
          /* LOGIN CARD */
          <div style={{
            background: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '24px',
            padding: '36px 28px',
            textAlign: 'center',
            maxWidth: '480px',
            margin: '0 auto',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
          }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px', color: '#fff' }}>Въведете имейл за достъп</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '24px' }}>Вземете 1 безплатен опит или влезете в профила си.</p>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(7, 9, 14, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '0.95rem',
                  textAlign: 'center',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '800',
                  cursor: 'pointer',
                  boxShadow: '0 10px 25px -5px rgba(220, 38, 38, 0.4)'
                }}
              >
                {loading ? 'Зареждане...' : 'Продължи 🚀'}
              </button>
            </form>
            {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '14px' }}>{error}</p>}
          </div>
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

            {/* MAIN GENERATOR CARD */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.7)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
              marginBottom: '40px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px' }}>
                <span style={{ color: '#cbd5e1', fontWeight: 600, fontSize: '0.92rem' }}>{email}</span>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{
                    display: 'inline-flex',
                    padding: '6px 14px',
                    background: 'rgba(220, 38, 38, 0.15)',
                    border: '1px solid rgba(220, 38, 38, 0.3)',
                    borderRadius: '99px',
                    color: '#f87171',
                    fontSize: '0.8rem',
                    fontWeight: '800'
                  }}>
                    {isSubscribed ? '✨ Неограничен' : `📊 Опити: ${generationsLeft}`}
                  </span>
                  <button
                    onClick={handleLogout}
                    style={{
                      background: 'none',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#94a3b8',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}
                  >
                    Изход
                  </button>
                </div>
              </div>

              <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 700 }}>Платформа</label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: '#0f172a',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    >
                      <option value="TikTok">TikTok</option>
                      <option value="Instagram Reels">Reels</option>
                      <option value="YouTube Shorts">Shorts</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 700 }}>Стил на видеото</label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: '#0f172a',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    >
                      <option value="Забавен & Интересен">Забавен & Интересен</option>
                      <option value="Полезен & Образователен">Полезен & Образователен</option>
                      <option value="Продажбен & Директен">Продажбен & Директен</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 700 }}>Език</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: '#0f172a',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    >
                      <option value="Български">Български</option>
                      <option value="English">English</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 700 }}>Тема на видеото</label>
                  <textarea
                    rows="3"
                    placeholder="Напр. 3 грешки, които убиват тренировката ти..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: '#0f172a',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    boxShadow: '0 10px 25px -5px rgba(220, 38, 38, 0.4)'
                  }}
                >
                  {loading ? 'Генериране...' : '🔥 Генерирай Скрипт'}
                </button>
              </form>

              {error && <p style={{ color: '#f87171', marginTop: '16px', textAlign: 'center', fontSize: '0.88rem' }}>{error}</p>}

              {result && (
                <div style={{ marginTop: '24px', padding: '24px', background: '#07090e', border: '1px solid #ef4444', borderRadius: '16px', boxShadow: '0 0 30px rgba(239,68,68,0.15)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                    <strong style={{ color: '#f87171', fontSize: '1rem' }}>✨ Вашият AI Скрипт:</strong>
                    <button
                      onClick={() => navigator.clipboard.writeText(result)}
                      style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                      Копирай 📋
                    </button>
                  </div>
                  <pre style={{ whiteSpace: 'pre-wrap', color: '#e2e8f0', lineHeight: '1.65', fontFamily: 'inherit', fontSize: '0.92rem', margin: 0 }}>{result}</pre>
                </div>
              )}
            </div>

            {/* PRICING SECTION IMPORTED FROM COMPONENT */}
            {!isSubscribed && (
              <PricingSection STRIPE_STARTER_LINK={STRIPE_STARTER_LINK} STRIPE_PRO_LINK={STRIPE_PRO_LINK} />
            )}

            {/* FAQ SECTION */}
            <section style={{ maxWidth: '680px', margin: '0 auto 40px auto' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>Често задавани въпроси ❓</h3>
              {faqs.map((f, i) => (
                <div
                  key={i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '20px',
                    marginBottom: '12px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#fff' }}>
                    <span>{f.q}</span>
                    <span style={{ color: '#ef4444', fontSize: '1.2rem' }}>{openFaq === i ? '−' : '+'}</span>
                  </div>
                  {openFaq === i && <p style={{ color: '#94a3b8', marginTop: '12px', fontSize: '0.9rem', lineHeight: 1.6, margin: '12px 0 0 0' }}>{f.a}</p>}
                </div>
              ))}
            </section>
          </>
        )}

        <footer style={{ textAlign: 'center', color: '#64748b', fontSize: '0.8rem', marginTop: '60px' }}>
          © {new Date().getFullYear()} ShortsEngine AI. Всички права са запазени.
        </footer>
      </div>
    </div>
  );
}
