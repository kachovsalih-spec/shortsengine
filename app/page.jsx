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
    { q: "Каква е разликата между Starter и Pro?", a: "Starter дава 50 скрипта/месец, а Pro предлага неограничени генерации." }
  ];

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', padding: '40px 15px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        <header style={{ textAlign: 'center', marginBottom: '35px' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.4)', borderRadius: '50px', color: '#ef4444', fontSize: '0.78rem', fontWeight: '800', marginBottom: '14px' }}>
            ⚡ SHORTSENGINE AI
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', margin: '0 0 12px 0' }}>Генерирай вирални скриптове</h1>
          <p style={{ color: '#a1a1aa', margin: 0 }}>Автоматизирай съдържанието си с изкуствен интелект.</p>
        </header>

        {!isLoggedIn ? (
          <section style={{ background: '#0a0a0a', border: '1px solid rgba(220,38,38,0.3)', borderRadius: '18px', padding: '32px 24px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Въведете имейл за достъп</h2>
            <p style={{ color: '#71717a', fontSize: '0.88rem', marginBottom: '24px' }}>Получете 1 безплатен опит или влезте в профила си.</p>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '14px', borderRadius: '10px', background: '#121212', border: '1px solid #27272a', color: '#fff', textAlign: 'center', outline: 'none' }} />
              <button type="submit" disabled={loading} style={{ padding: '14px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '800', cursor: 'pointer' }}>
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

            <section style={{ background: '#0a0a0a', border: '1px solid #27272a', borderRadius: '18px', padding: '24px', marginBottom: '35px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #18181b', paddingBottom: '14px' }}>
                <span style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>{email}</span>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ background: 'rgba(220,38,38,0.15)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.78rem', color: '#ef4444', fontWeight: '800' }}>
                    {isSubscribed ? '✨ Неограничен' : `📊 Опити: ${generationsLeft}`}
                  </span>
                  <button onClick={handleLogout} style={{ background: '#18181b', border: '1px solid #27272a', color: '#a1a1aa', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer' }}>Изход</button>
                </div>
              </div>

              <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  <select value={platform} onChange={(e) => setPlatform(e.target.value)} style={{ padding: '10px', background: '#121212', color: '#fff', border: '1px solid #27272a', borderRadius: '8px' }}>
                    <option value="TikTok">TikTok</option>
                    <option value="Instagram Reels">Reels</option>
                    <option value="YouTube Shorts">Shorts</option>
                  </select>
                  <select value={tone} onChange={(e) => setTone(e.target.value)} style={{ padding: '10px', background: '#121212', color: '#fff', border: '1px solid #27272a', borderRadius: '8px' }}>
                    <option value="Атрактивен / Вирален">Вирален</option>
                    <option value="Образователен">Образователен</option>
                    <option value="Продажбен">Продажбен</option>
                  </select>
                  <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ padding: '10px', background: '#121212', color: '#fff', border: '1px solid #27272a', borderRadius: '8px' }}>
                    <option value="English">English</option>
                    <option value="Български">Български</option>
                  </select>
                </div>

                <textarea rows="3" placeholder="Тема на видеото..." value={prompt} onChange={(e) => setPrompt(e.target.value)} required style={{ width: '100%', padding: '12px', background: '#121212', color: '#fff', border: '1px solid #27272a', borderRadius: '8px', boxSizing: 'border-box' }} />

                <button type="submit" disabled={loading} style={{ padding: '14px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
                  {loading ? 'Генериране...' : '🔥 Генерирай Скрипт'}
                </button>
              </form>

              {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '14px', textAlign: 'center' }}>{error}</p>}

              {result && (
                <div style={{ marginTop: '20px', padding: '15px', background: '#000', border: '1px solid #dc2626', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <strong style={{ color: '#ef4444' }}>Резултат:</strong>
                    <button onClick={() => navigator.clipboard.writeText(result)} style={{ background: '#18181b', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>Копирай</button>
                  </div>
                  <pre style={{ whiteSpace: 'pre-wrap', color: '#e4e4e7', fontSize: '0.88rem', margin: 0 }}>{result}</pre>
                </div>
              )}
            </section>

            {!isSubscribed && (
              <section style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Избери абонамент</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  
                  <div style={{ background: '#0a0a0a', border: '1px solid #27272a', borderRadius: '14px', padding: '20px', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3>Starter</h3>
                      <div style={{ fontSize: '1.8rem', fontWeight: '900', margin: '10px 0' }}>€19.99<span style={{ fontSize: '0.8rem', color: '#71717a' }}>/мес</span></div>
                      <p style={{ color: '#a1a1aa', fontSize: '0.85rem' }}>50 скрипта на месец</p>
                    </div>
                    <a href={STRIPE_STARTER_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '20px', padding: '10px', background: '#18181b', color: '#fff', textAlign: 'center', textDecoration: 'none', borderRadius: '8px', fontWeight: '800' }}>Купи Starter</a>
                  </div>

                  <div style={{ background: '#0a0a0a', border: '2px solid #dc2626', borderRadius: '14px', padding: '20px', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ background: '#dc2626', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '10px', fontWeight: '900' }}>ХИТ</span>
                      <h3>Pro</h3>
                      <div style={{ fontSize: '1.8rem', fontWeight: '900', margin: '10px 0' }}>€39.99<span style={{ fontSize: '0.8rem', color: '#71717a' }}>/мес</span></div>
                      <p style={{ color: '#a1a1aa', fontSize: '0.85rem' }}>Неограничени скриптове</p>
                    </div>
                    <a href={STRIPE_PRO_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '20px', padding: '10px', background: '#dc2626', color: '#fff', textAlign: 'center', textDecoration: 'none', borderRadius: '8px', fontWeight: '800' }}>Купи Pro</a>
                  </div>

                </div>
              </section>
            )}

            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Често задавани въпроси</h3>
              {faqs.map((f, i) => (
                <div key={i} style={{ background: '#0a0a0a', border: '1px solid #18181b', borderRadius: '8px', marginBottom: '8px' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '12px 16px', background: 'none', border: 'none', color: '#fff', textAlign: 'left', fontWeight: '700', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{f.q}</span>
                    <span style={{ color: '#ef4444' }}>{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && <div style={{ padding: '0 16px 12px', color: '#a1a1aa', fontSize: '0.85rem' }}>{f.a}</div>}
                </div>
              ))}
            </section>
          </>
        )}

        <footer style={{ textAlign: 'center', color: '#52525b', fontSize: '0.75rem', marginTop: '30px' }}>
          © {new Date().getFullYear()} ShortsEngine AI.
        </footer>
      </div>
    </div>
  );
}
