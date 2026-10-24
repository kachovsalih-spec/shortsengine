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
    { q: "Как работи ShortsEngine AI?", a: "Генерира вирални скриптове за TikTok, Reels и Shorts с вградени кукички (hooks) и призиви за действие." },
    { q: "Защо се изисква имейл?", a: "За да защити профила ви и да проследява безплатния ви опит." },
    { q: "Мога ли да се откажа по всяко време?", a: "Да, абонаментите нямат обвързващи договори." },
    { q: "Каква е разликата между Starter и Pro?", a: "Starter дава 50 скрипта на месец, а Pro предлага неограничени генерации." }
  ];

  return (
    <div style={{ backgroundColor: '#09090b', color: '#f4f4f5', minHeight: '100vh', padding: '50px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: '30px', color: '#f87171', fontSize: '0.8rem', fontWeight: '700', marginBottom: '16px' }}>
            ⚡ SHORTSENGINE AI
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', margin: '0 0 10px 0' }}>Генерирай вирални скриптове</h1>
          <p style={{ color: '#71717a', margin: 0 }}>Автоматизирай съдържанието си с изкуствен интелект.</p>
        </header>

        {!isLoggedIn ? (
          <section style={{ background: '#121215', border: '1px solid rgba(220,38,38,0.25)', borderRadius: '20px', padding: '36px 28px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '8px', color: '#fff' }}>Въведете имейл за достъп</h2>
            <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '24px' }}>Получете 1 безплатен опит или влезете в профила си.</p>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '14px', borderRadius: '12px', background: '#18181b', border: '1px solid #27272a', color: '#fff', textAlign: 'center', outline: 'none', boxSizing: 'border-box' }} />
              <button type="submit" disabled={loading} style={{ padding: '14px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer' }}>
                {loading ? 'Зареждане...' : 'Продължи 🚀'}
              </button>
            </form>
            {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '14px' }}>{error}</p>}
          </section>
        ) : (
          <>
            {isSubscribed && (
              <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '14px', padding: '16px', textAlign: 'center', marginBottom: '24px', color: '#4ade80' }}>
                <strong>🎉 Активен PRO Абонамент!</strong> ({email})
              </div>
            )}

            <section style={{ background: '#121215', border: '1px solid #27272a', borderRadius: '20px', padding: '28px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #18181b', paddingBottom: '16px' }}>
                <span style={{ fontSize: '0.9rem', color: '#a1a1aa' }}>{email}</span>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ background: 'rgba(220,38,38,0.15)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', color: '#ef4444', fontWeight: '800' }}>
                    {isSubscribed ? '✨ Неограничен' : `📊 Опити: ${generationsLeft}`}
                  </span>
                  <button onClick={handleLogout} style={{ background: '#18181b', border: '1px solid #27272a', color: '#a1a1aa', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem' }}>Изход</button>
                </div>
              </div>

              <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <select value={platform} onChange={(e) => setPlatform(e.target.value)} style={{ padding: '12px', background: '#18181b', color: '#fff', border: '1px solid #27272a', borderRadius: '10px' }}>
                    <option value="TikTok">TikTok</option>
                    <option value="Instagram Reels">Reels</option>
                    <option value="YouTube Shorts">Shorts</option>
                  </select>
                  <select value={tone} onChange={(e) => setTone(e.target.value)} style={{ padding: '12px', background: '#18181b', color: '#fff', border: '1px solid #27272a', borderRadius: '10px' }}>
                    <option value="Атрактивен / Вирален">Вирален</option>
                    <option value="Образователен">Образователен</option>
                    <option value="Продажбен">Продажбен</option>
                  </select>
                  <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ padding: '12px', background: '#18181b', color: '#fff', border: '1px solid #27272a', borderRadius: '10px' }}>
                    <option value="English">English</option>
                    <option value="Български">Български</option>
                  </select>
                </div>

                <textarea rows="3" placeholder="Тема на видеото..." value={prompt} onChange={(e) => setPrompt(e.target.value)} required style={{ width: '100%', padding: '14px', background: '#18181b', color: '#fff', border: '1px solid #27272a', borderRadius: '10px', boxSizing: 'border-box' }} />

                <button type="submit" disabled={loading} style={{ padding: '16px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', fontSize: '1rem' }}>
                  {loading ? 'Генериране...' : '🔥 Генерирай Скрипт'}
                </button>
              </form>

              {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '16px', textAlign: 'center' }}>{error}</p>}

              {result && (
                <div style={{ marginTop: '24px', padding: '20px', background: '#09090b', border: '1px solid #dc2626', borderRadius: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <strong style={{ color: '#f87171' }}>Резултат:</strong>
                    <button onClick={() => navigator.clipboard.writeText(result)} style={{ background: '#18181b', color: '#fff', border: '1px solid #27272a', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>Копирай</button>
                  </div>
                  <pre style={{ whiteSpace: 'pre-wrap', color: '#e4e4e7', fontSize: '0.9rem', margin: 0, lineHeight: '1.6' }}>{result}</pre>
                </div>
              )}
            </section>

            {!isSubscribed && (
              <section style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '8px' }}>Избери абонамент</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  
                  <div style={{ background: '#121215', border: '1px solid #27272a', borderRadius: '18px', padding: '28px 24px', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ margin: 0, color: '#fff' }}>Starter</h3>
                      <div style={{ fontSize: '2rem', fontWeight: '900', margin: '14px 0', color: '#fff' }}>€19.99<span style={{ fontSize: '0.85rem', color: '#71717a' }}>/мес</span></div>
                      <p style={{ color: '#a1a1aa', fontSize: '0.88rem', margin: 0 }}>50 скрипта на месец</p>
                    </div>
                    <a href={STRIPE_STARTER_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '28px', padding: '12px', background: '#18181b', color: '#fff', textAlign: 'center', textDecoration: 'none', borderRadius: '10px', fontWeight: '700' }}>Купи Starter</a>
                  </div>

                  <div style={{ background: '#121215', border: '2px solid #dc2626', borderRadius: '18px', padding: '28px 24px', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ background: '#dc2626', fontSize: '0.7rem', padding: '3px 10px', borderRadius: '10px', fontWeight: '800' }}>ХИТ</span>
                      <h3 style={{ margin: '8px 0 0 0', color: '#fff' }}>Pro</h3>
                      <div style={{ fontSize: '2rem', fontWeight: '900', margin: '14px 0', color: '#fff' }}>€39.99<span style={{ fontSize: '0.85rem', color: '#71717a' }}>/мес</span></div>
                      <p style={{ color: '#a1a1aa', fontSize: '0.88rem', margin: 0 }}>Неограничени скриптове</p>
                    </div>
                    <a href={STRIPE_PRO_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '28px', padding: '12px', background: '#dc2626', color: '#fff', textAlign: 'center', textDecoration: 'none', borderRadius: '10px', fontWeight: '800' }}>Купи Pro</a>
                  </div>

                </div>
              </section>
            )}

            <section style={{ marginBottom: '40px' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#fff' }}>Често задавани въпроси</h3>
              {faqs.map((f, i) => (
                <div key={i} style={{ background: '#121215', border: '1px solid #18181b', borderRadius: '10px', marginBottom: '10px', overflow: 'hidden' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '14px 18px', background: 'none', border: 'none', color: '#fff', textAlign: 'left', fontWeight: '600', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{f.q}</span>
                    <span style={{ color: '#ef4444' }}>{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && <div style={{ padding: '0 18px 14px', color: '#a1a1aa', fontSize: '0.88rem' }}>{f.a}</div>}
                </div>
              ))}
            </section>
          </>
        )}

        <footer style={{ textAlign: 'center', color: '#52525b', fontSize: '0.8rem', marginTop: '40px' }}>
          © {new Date().getFullYear()} ShortsEngine AI. Всички права са запазени.
        </footer>
      </div>
    </div>
  );
}
