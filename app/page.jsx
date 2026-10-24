'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState('TikTok');
  const [tone, setTone] = useState('🔥 100% Вирален & Шокиращ (Силни кукички и драма)');
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
        body: JSON.stringify({ prompt: `Create a viral short script for ${platform}: ${prompt}. Tone style: ${tone}. Language: ${language}. Structure: 1. HOOK, 2. VISUAL & AUDIO, 3. CALL TO ACTION.` }),
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
    { q: "Как работи ShortsEngine AI?", a: "Използва AI за генериране на вирални скриптове с hooks, кадрови инструкции и апел за действие." },
    { q: "Мога ли да се откажа по всяко време?", a: "Да! Абонаментите в Stripe нямат обвързващи договори и се прекратяват с един клик." },
    { q: "Каква е разликата между Starter и Pro?", a: "Starter включва 50 скрипта/месец, а Pro ви осигурява неограничени генерации и пълен комерсиален лиценз." }
  ];

  return (
    <div className="container">
      
      <header style={{ textAlign: 'center' }}>
        <div className="badge">⚡ SHORTSENGINE AI</div>
        <h1 className="main-title">Генерирай вирални скриптове</h1>
        <p className="sub-title">Автоматизирай съдържанието си за TikTok, Reels & Shorts с AI.</p>
      </header>

      {!isLoggedIn ? (
        <div className="glass-card" style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>Въведете имейл за достъп</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '24px' }}>Вземете 1 безплатен опит или влезете в профила си.</p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input type="email" placeholder="your@email.com" className="custom-input" style={{ textAlign: 'center' }} value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit" disabled={loading} className="primary-btn">{loading ? 'Зареждане...' : 'Продължи 🚀'}</button>
          </form>
          {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '14px' }}>{error}</p>}
        </div>
      ) : (
        <>
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px' }}>
              <span style={{ color: '#cbd5e1', fontWeight: 600 }}>{email}</span>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span className="badge" style={{ margin: 0 }}>
                  {isSubscribed ? '✨ Неограничен' : `📊 Опити: ${generationsLeft}`}
                </span>
                <button onClick={handleLogout} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer' }}>Изход</button>
              </div>
            </div>

            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 700 }}>Платформа</label>
                  <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="custom-select">
                    <option value="TikTok">TikTok</option>
                    <option value="Instagram Reels">Reels</option>
                    <option value="YouTube Shorts">Shorts</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 700 }}>Тоналност & Стил</label>
                  <select value={tone} onChange={(e) => setTone(e.target.value)} className="custom-select">
                    <option value="🔥 100% Вирален & Шокиращ (Силни кукички и драма)">🔥 100% Вирален & Шокиращ</option>
                    <option value="🧠 Умен & Образователен (Ценни съвети и експертност)">🧠 Умен & Образователен</option>
                    <option value="💰 Продажбен & Професионален (Висока конверсия и продажби)">💰 Продажбен & Професионален</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 700 }}>Език</label>
                  <select value={language} onChange={(e) => setLanguage(e.target.value)} className="custom-select">
                    <option value="Български">Български</option>
                    <option value="English">English</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 700 }}>Тема на видеото</label>
                <textarea rows="3" placeholder="Напр. 3 грешки, които убиват тренировката ти..." value={prompt} onChange={(e) => setPrompt(e.target.value)} required className="custom-textarea" />
              </div>

              <button type="submit" disabled={loading} className="primary-btn">{loading ? 'Генериране...' : '🔥 Генерирай Скрипт'}</button>
            </form>

            {error && <p style={{ color: '#f87171', marginTop: '16px', textAlign: 'center' }}>{error}</p>}

            {result && (
              <div style={{ marginTop: '24px', padding: '24px', background: '#07090e', border: '1px solid #ef4444', borderRadius: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <strong style={{ color: '#f87171' }}>✨ Вашият AI Скрипт:</strong>
                  <button onClick={() => navigator.clipboard.writeText(result)} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>Копирай 📋</button>
                </div>
                <pre style={{ whiteSpace: 'pre-wrap', color: '#e2e8f0', lineHeight: 1.6, fontFamily: 'inherit' }}>{result}</pre>
              </div>
            )}
          </div>

          {!isSubscribed && (
            <section style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '8px' }}>Избери план за пълен достъп</h2>
              <p style={{ color: '#94a3b8', marginBottom: '32px' }}>Отключете потенциала на вашите социални мрежи.</p>

              <div className="pricing-grid">
                <div className="price-card">
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Starter</h3>
                    <div style={{ fontSize: '2.2rem', fontWeight: 900, margin: '16px 0' }}>€19.99 <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>/мес</span></div>
                    <ul className="feature-list">
                      <li><span className="check-icon">✓</span> <strong>50 AI скрипта</strong> на месец</li>
                      <li><span className="check-icon">✓</span> TikTok, Reels & Shorts</li>
                      <li><span className="check-icon">✓</span> Грабващи кукички (Hooks)</li>
                      <li><span className="check-icon">✓</span> Български & Английски</li>
                    </ul>
                  </div>
                  <a href={STRIPE_STARTER_LINK} target="_blank" rel="noopener noreferrer" className="primary-btn" style={{ textDecoration: 'none', textAlign: 'center', background: '#1e293b' }}>Купи Starter</a>
                </div>

                <div className="price-card featured">
                  <div className="featured-badge">ПРЕПОРЪЧАН 🔥</div>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Pro</h3>
                    <div style={{ fontSize: '2.2rem', fontWeight: 900, margin: '16px 0' }}>€39.99 <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>/мес</span></div>
                    <ul className="feature-list">
                      <li><span className="check-icon">✓</span> <strong>Неограничени AI скриптове</strong></li>
                      <li><span className="check-icon">✓</span> Приоритетна генерация</li>
                      <li><span className="check-icon">✓</span> Пълен търговски лиценз</li>
                      <li><span className="check-icon">✓</span> VIP Поддръжка 24/7</li>
                    </ul>
                  </div>
                  <a href={STRIPE_PRO_LINK} target="_blank" rel="noopener noreferrer" className="primary-btn" style={{ textDecoration: 'none', textAlign: 'center' }}>Вземи Pro 🚀</a>
                </div>
              </div>
            </section>
          )}

          <section style={{ maxWidth: '640px', margin: '0 auto' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '1.4rem', fontWeight: 800 }}>Често задавани въпроси ❓</h3>
            {faqs.map((f, i) => (
              <div key={i} className="glass-card" style={{ padding: '20px', marginBottom: '12px', cursor: 'pointer' }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span>{f.q}</span>
                  <span style={{ color: '#ef4444' }}>{openFaq === i ? '−' : '+'}</span>
                </div>
                {openFaq === i && <p style={{ color: '#94a3b8', marginTop: '12px', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.a}</p>}
              </div>
            ))}
          </section>
        </>
      )}

      <footer style={{ textAlign: 'center', color: '#64748b', fontSize: '0.8rem', marginTop: '60px' }}>
        © {new Date().getFullYear()} ShortsEngine AI. Всички права са запазени.
      </footer>
    </div>
  );
}
