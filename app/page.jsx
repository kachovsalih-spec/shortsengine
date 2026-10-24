'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState('TikTok');
  const [tone, setTone] = useState('Вирален');
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
    const savedEmail = localStorage.getItem('shortsEngine_email');
    if (savedEmail) {
      setEmail(savedEmail);
      checkUser(savedEmail);
    }
  }, []);

  const checkUser = async (userEmail) => {
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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Въведете валиден имейл.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      let { data } = await supabase.from('users').select('*').eq('email', email).single();
      if (!data) {
        const { data: newUser } = await supabase.from('users').insert([{ email, generations_left: 1, is_subscribed: false }]).select().single();
        data = newUser;
      }
      localStorage.setItem('shortsEngine_email', email);
      setIsLoggedIn(true);
      setIsSubscribed(data.is_subscribed);
      setGenerationsLeft(data.generations_left);
    } catch (err) {
      setError('Грешка при входа.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('shortsEngine_email');
    setIsLoggedIn(false);
    setEmail('');
    setResult('');
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (generationsLeft <= 0 && !isSubscribed) {
      setError('Изчерпахте безплатните опити! Изберете план по-долу.');
      return;
    }
    setLoading(true);
    setError('');
    setResult('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `Create a viral short script for ${platform}: ${prompt}. Tone: ${tone}. Language: ${language}.` }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Грешка.');

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
    { q: "Как работи платформата?", a: "Генерира готови вирални скриптове с кукички за социалните мрежи с изкуствен интелект." },
    { q: "Какво включва Pro планът?", a: "Неограничени скриптове, приоритетна генерация и пълен комерсиален лиценз." }
  ];

  return (
    <div style={{ backgroundColor: '#0b0f19', color: '#f3f4f6', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.3rem', fontWeight: '900', color: '#fff', marginBottom: '10px' }}>ShortsEngine AI ⚡</h1>
          <p style={{ color: '#94a3b8' }}>Генерирайте вирално съдържание за секунди.</p>
        </header>

        {!isLoggedIn ? (
          <div style={{ background: '#141b2d', padding: '30px', borderRadius: '16px', border: '1px solid #1e293b', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Въведете имейл за достъп</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '12px', background: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '8px', textAlign: 'center' }} />
              <button type="submit" style={{ padding: '12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Вход / Безплатен опит</button>
            </form>
            {error && <p style={{ color: '#f87171', marginTop: '10px' }}>{error}</p>}
          </div>
        ) : (
          <>
            <div style={{ background: '#141b2d', padding: '20px', borderRadius: '16px', border: '1px solid #1e293b', marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '0.9rem', color: '#94a3b8' }}>
                <span>{email}</span>
                <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer' }}>Изход</button>
              </div>

              <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <select value={platform} onChange={(e) => setPlatform(e.target.value)} style={{ flex: 1, padding: '10px', background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '8px' }}>
                    <option value="TikTok">TikTok</option>
                    <option value="Instagram Reels">Reels</option>
                    <option value="YouTube Shorts">Shorts</option>
                  </select>
                  <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ flex: 1, padding: '10px', background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '8px' }}>
                    <option value="Български">Български</option>
                    <option value="English">English</option>
                  </select>
                </div>
                <textarea rows="3" placeholder="Тема на видеото..." value={prompt} onChange={(e) => setPrompt(e.target.value)} required style={{ padding: '12px', background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '8px', width: '100%', boxSizing: 'border-box' }} />
                <button type="submit" disabled={loading} style={{ padding: '14px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                  {loading ? 'Генериране...' : 'Генерирай скрипт 🚀'}
                </button>
              </form>

              {result && (
                <div style={{ marginTop: '20px', padding: '15px', background: '#0a0e17', borderRadius: '8px', border: '1px solid #ef4444' }}>
                  <pre style={{ whiteSpace: 'pre-wrap', color: '#e2e8f0', margin: 0, fontFamily: 'inherit' }}>{result}</pre>
                </div>
              )}
            </div>

            {!isSubscribed && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                <div style={{ background: '#141b2d', padding: '20px', borderRadius: '16px', border: '1px solid #1e293b' }}>
                  <h3>Starter</h3>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '10px 0' }}>€19.99</p>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>50 скрипта на месец</p>
                  <a href={STRIPE_STARTER_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '15px', padding: '10px', background: '#334155', color: '#fff', textAlign: 'center', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Купи Starter</a>
                </div>

                <div style={{ background: '#141b2d', padding: '20px', borderRadius: '16px', border: '2px solid #ef4444' }}>
                  <h3>Pro (Хит 🔥)</h3>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '10px 0' }}>€39.99</p>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Неограничени скриптове и лиценз</p>
                  <a href={STRIPE_PRO_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '15px', padding: '10px', background: '#ef4444', color: '#fff', textAlign: 'center', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Купи Pro</a>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
