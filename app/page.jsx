'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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
    if (!email.includes('@')) { setError('Въведете валиден имейл.'); return; }
    setLoading(true); setError('');
    try {
      let { data } = await supabase.from('users').select('*').eq('email', email).single();
      if (!data) {
        const { data: nUser } = await supabase.from('users').insert([{ email, generations_left: 1, is_subscribed: false }]).select().single();
        data = nUser;
      }
      localStorage.setItem('shortsEngine_email', email);
      setIsLoggedIn(true); setIsSubscribed(data.is_subscribed); setGenerationsLeft(data.generations_left);
    } catch (err) { setError('Грешка при вход.'); }
    finally { setLoading(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem('shortsEngine_email');
    setIsLoggedIn(false); setEmail(''); setResult('');
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (generationsLeft <= 0 && !isSubscribed) { setError('Изчерпахте безплатните опити!'); return; }
    setLoading(true); setError(''); setResult('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `Create a viral short script for ${platform}: ${prompt}. Style: ${tone}. Language: ${language}.` }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Грешка.');
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
    { q: "Как работи ShortsEngine AI?", a: "Генерира готови вирални скриптове с кукички (hooks) за социалните мрежи с изкуствен интелект." },
    { q: "Какво включва Pro планът?", a: "Неограничени скриптове, приоритетна генерация и пълен комерсиален лиценз." }
  ];

  return (
    <div style={{ backgroundColor: '#07090e', color: '#f1f5f9', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '750px', margin: '0 auto' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '35px' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: '50px', color: '#f87171', fontSize: '0.8rem', fontWeight: '800', marginBottom: '15px' }}>
            ⚡ SHORTSENGINE AI
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fff', marginBottom: '10px' }}>Генерирай вирални скриптове</h1>
          <p style={{ color: '#94a3b8' }}>Автоматизирай съдържанието си за TikTok, Reels & Shorts с AI.</p>
        </header>

        {!isLoggedIn ? (
          <div style={{ background: 'rgba(15,23,42,0.7)', padding: '35px', borderRadius: '20px', border: '1px solid rgba(220,38,38,0.3)', textAlign: 'center', maxWidth: '450px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '10px', color: '#fff' }}>Въведете имейл за достъп</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '14px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '10px', textAlign: 'center', outline: 'none' }} />
              <button type="submit" style={{ padding: '14px', background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Продължи 🚀</button>
            </form>
            {error && <p style={{ color: '#f87171', marginTop: '12px' }}>{error}</p>}
          </div>
        ) : (
          <>
            <div style={{ background: 'rgba(15,23,42,0.7)', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '35px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '14px' }}>
                <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{email}</span>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ background: 'rgba(239,68,68,0.15)', padding: '6px 12px', borderRadius: '20px', color: '#f87171', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {isSubscribed ? '✨ Неограничен' : `📊 Опити: ${generationsLeft}`}
                  </span>
                  <button onClick={handleLogout} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem' }}>Изход</button>
                </div>
              </div>

              <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  <select value={platform} onChange={(e) => setPlatform(e.target.value)} style={{ padding: '12px', background: '#0f172a', color: '#fff', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px' }}>
                    <option value="TikTok">TikTok</option>
                    <option value="Instagram Reels">Reels</option>
                    <option value="YouTube Shorts">Shorts</option>
                  </select>
                  <select value={tone} onChange={(e) => setTone(e.target.value)} style={{ padding: '12px', background: '#0f172a', color: '#fff', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px' }}>
                    <option value="Забавен & Интересен">Забавен & Интересен</option>
                    <option value="Полезен & Образователен">Полезен & Образователен</option>
                    <option value="Продажбен & Директен">Продажбен & Директен</option>
                  </select>
                  <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ padding: '12px', background: '#0f172a', color: '#fff', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px' }}>
                    <option value="Български">Български</option>
                    <option value="English">English</option>
                  </select>
                </div>
                <textarea rows="3" placeholder="Тема на видеото..." value={prompt} onChange={(e) => setPrompt(e.target.value)} required style={{ padding: '14px', background: '#0f172a', color: '#fff', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', width: '100%', boxSizing: 'border-box' }} />
                <button type="submit" disabled={loading} style={{ padding: '16px', background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                  {loading ? 'Генериране...' : '🔥 Генерирай Скрипт'}
                </button>
              </form>

              {result && (
                <div style={{ marginTop: '20px', padding: '18px', background: '#07090e', borderRadius: '12px', border: '1px solid #ef4444' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <strong style={{ color: '#f87171' }}>Резултат:</strong>
                    <button onClick={() => navigator.clipboard.writeText(result)} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer' }}>Копирай</button>
                  </div>
                  <pre style={{ whiteSpace: 'pre-wrap', color: '#e2e8f0', margin: 0, fontFamily: 'inherit' }}>{result}</pre>
                </div>
              )}
            </div>

            {!isSubscribed && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                <div style={{ background: 'rgba(15,23,42,0.6)', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ color: '#fff', margin: 0 }}>Starter</h3>
                    <p style={{ fontSize: '1.8rem', fontWeight: '900', margin: '12px 0', color: '#fff' }}>€19.99<span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>/мес</span></p>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>✓ 50 AI скрипта на месец<br />✓ TikTok, Reels & Shorts<br />✓ Включени кукички (Hooks)</p>
                  </div>
                  <a href={STRIPE_STARTER_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '20px', padding: '12px', background: '#1e293b', color: '#fff', textAlign: 'center', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.1)' }}>Купи Starter</a>
                </div>

                <div style={{ background: 'rgba(15,23,42,0.6)', padding: '24px', borderRadius: '20px', border: '2px solid #ef4444', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-10px', right: '15px', background: '#ef4444', color: '#fff', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>ХИТ 🔥</div>
                  <div>
                    <h3 style={{ color: '#fff', margin: 0 }}>Pro</h3>
                    <p style={{ fontSize: '1.8rem', fontWeight: '900', margin: '12px 0', color: '#fff' }}>€39.99<span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>/мес</span></p>
                    <p style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>✓ Неограничени скриптове<br />✓ Приоритетна генерация<br />✓ Пълен комерсиален лиценз</p>
                  </div>
                  <a href={STRIPE_PRO_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '20px', padding: '12px', background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', color: '#fff', textAlign: 'center', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>Купи Pro</a>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
