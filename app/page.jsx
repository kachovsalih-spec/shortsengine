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
    if (generationsLeft <= 0 && !isSubscribed) {
      setError('⚠️ Изчерпахте безплатните опити! Моля, изберете план по-долу.');
      const pricingElement = document.getElementById('pricing-section');
      if (pricingElement) {
        pricingElement.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
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
    { q: "Защо се изисква имейл?", a: "За да защити профила ви и да проследява вашите генерации в реално време." },
    { q: "Мога ли да се откажа по всяко време?", a: "Да, абонаментите през Stripe нямат обвързващи договори и се прекратяват с един клик." }
  ];

  return (
    <div style={{ backgroundColor: '#07090e', color: '#f1f5f9', minHeight: '100vh', padding: '50px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '45px' }}>
          <div style={{ display: 'inline-block', padding: '6px 18px', background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.35)', borderRadius: '50px', color: '#f87171', fontSize: '0.82rem', fontWeight: '800', marginBottom: '16px' }}>
            ⚡ SHORTSENGINE AI
          </div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#fff', marginBottom: '10px', letterSpacing: '-0.03em' }}>
            Генерирай вирални скриптове с AI
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', fontWeight: '500' }}>
            Превърни всяка идея в хит за TikTok, Instagram Reels и YouTube Shorts за секунди.
          </p>
        </header>

        {!isLoggedIn ? (
          <div style={{ background: 'rgba(15,23,42,0.8)', padding: '40px 30px', borderRadius: '24px', border: '1px solid rgba(220,38,38,0.3)', textAlign: 'center', maxWidth: '480px', margin: '0 auto', boxShadow: '0 25px 50px rgba(0,0,0,0.6)' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '8px', color: '#fff', fontWeight: 800 }}>Влез с твоя имейл</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '24px' }}>Вземи 1 безплатен опит и започни веднага.</p>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '15px', background: '#07090e', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '12px', textAlign: 'center', outline: 'none', fontSize: '0.95rem' }} />
              <button type="submit" style={{ padding: '16px', background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 10px 25px rgba(220,38,38,0.4)' }}>Продължи към генератора 🚀</button>
            </form>
            {error && <p style={{ color: '#f87171', marginTop: '14px', fontSize: '0.88rem' }}>{error}</p>}
          </div>
        ) : (
          <>
            <div style={{ background: 'rgba(15,23,42,0.8)', padding: '32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '50px', boxShadow: '0 25px 50px rgba(0,0,0,0.6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px' }}>
                <span style={{ color: '#cbd5e1', fontSize: '0.92rem', fontWeight: 600 }}>👤 {email}</span>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ background: 'rgba(239,68,68,0.15)', padding: '6px 14px', borderRadius: '20px', color: '#f87171', fontSize: '0.8rem', fontWeight: '800', border: '1px solid rgba(239,68,68,0.3)' }}>
                    {isSubscribed ? '✨ Неограничен' : `📊 Опити: ${generationsLeft}`}
                  </span>
                  <button onClick={handleLogout} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: '#94a3b8', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem' }}>Изход</button>
                </div>
              </div>

              <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 700 }}>ПЛАТФОРМА</label>
                    <select value={platform} onChange={(e) => setPlatform(e.target.value)} style={{ width: '100%', padding: '12px', background: '#07090e', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '0.9rem' }}>
                      <option value="TikTok">TikTok</option>
                      <option value="Instagram Reels">Instagram Reels</option>
                      <option value="YouTube Shorts">YouTube Shorts</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 700 }}>СТИЛ</label>
                    <select value={tone} onChange={(e) => setTone(e.target.value)} style={{ width: '100%', padding: '12px', background: '#07090e', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '0.9rem' }}>
                      <option value="Забавен & Интересен">Забавен & Интересен</option>
                      <option value="Полезен & Образователен">Полезен & Образователен</option>
                      <option value="Продажбен & Директен">Продажбен & Директен</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 700 }}>ЕЗИК</label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ width: '100%', padding: '12px', background: '#07090e', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '0.9rem' }}>
                      <option value="Български">Български</option>
                      <option value="English">English</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 700 }}>ТЕМА НА ВИДЕОТО</label>
                  <textarea rows="3" placeholder="Напр. 3 неща, които никой не ти казва за крипто..." value={prompt} onChange={(e) => setPrompt(e.target.value)} required style={{ padding: '14px', background: '#07090e', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', width: '100%', boxSizing: 'border-box', fontSize: '0.95rem', outline: 'none' }} />
                </div>

                <button type="submit" disabled={loading} style={{ padding: '16px', background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 10px 25px rgba(220,38,38,0.4)' }}>
                  {loading ? 'Генериране на вирален скрипт...' : '🔥 Генерирай Вирален Скрипт'}
                </button>
              </form>

              {error && (
                <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '10px', color: '#f87171', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600 }}>
                  {error}
                </div>
              )}

              {result && (
                <div style={{ marginTop: '24px', padding: '24px', background: '#07090e', borderRadius: '16px', border: '1px solid #ef4444', boxShadow: '0 0 30px rgba(239,68,68,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', alignItems: 'center' }}>
                    <strong style={{ color: '#f87171', fontSize: '1.05rem' }}>✨ Вашият готов скрипт:</strong>
                    <button onClick={() => navigator.clipboard.writeText(result)} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>Копирай 📋</button>
                  </div>
                  <pre style={{ whiteSpace: 'pre-wrap', color: '#e2e8f0', margin: 0, fontFamily: 'inherit', lineHeight: '1.7', fontSize: '0.92rem' }}>{result}</pre>
                </div>
              )}
            </div>

            {!isSubscribed && (
              <PricingSection STRIPE_STARTER_LINK={STRIPE_STARTER_LINK} STRIPE_PRO_LINK={STRIPE_PRO_LINK} />
            )}

            <section style={{ maxWidth: '700px', margin: '0 auto 40px auto' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>Често задавани въпроси ❓</h3>
              {faqs.map((f, i) => (
                <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '18px 22px', marginBottom: '12px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>
                    <span>{f.q}</span>
                    <span style={{ color: '#ef4444', fontSize: '1.2rem' }}>{openFaq === i ? '−' : '+'}</span>
                  </div>
                  {openFaq === i && <p style={{ color: '#94a3b8', marginTop: '12px', fontSize: '0.9rem', lineHeight: 1.6, margin: '12px 0 0 0' }}>{f.a}</p>}
                </div>
              ))}
            </section>
          </>
        )}

      </div>
    </div>
  );
}
