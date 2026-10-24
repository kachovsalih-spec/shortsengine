'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState('TikTok');
  const [tone, setTone] = useState('Атрактивен / Вирален');
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
    if (generationsLeft <= 0 && !isSubscribed) { setError('Изчерпахте безплатните опити! Изберете план по-долу.'); return; }
    setLoading(true); setError(''); setResult('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `Create a viral short script for ${platform}: ${prompt}. Tone: ${tone}. Language: ${language}. Structure: 1. HOOK, 2. VISUAL & AUDIO, 3. CALL TO ACTION.` }),
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
    { q: "Как работи ShortsEngine AI?", a: "Генерира готови вирални скриптове с кукички (hooks), визуални директиви и призиви за действие за TikTok, Reels и Shorts." },
    { q: "Защо се изисква имейл?", a: "За да защити профила ви и да проследява вашите генерации в реално време." },
    { q: "Мога ли да се откажа по всяко време?", a: "Да, абонаментите през Stripe нямат обвързващи договори и се прекратяват с един клик." },
    { q: "Каква е разликата между Starter и Pro?", a: "Starter дава 50 скрипта на месец за един акаунт, докато Pro предоставя неограничени генерации и пълен комерсиален лиценз." }
  ];

  return (
    <div style={{ backgroundColor: '#0b0f19', backgroundImage: 'radial-gradient(ellipse at 50% -20%, #2a0815 0%, #0b0f19 75%)', color: '#f3f4f6', minHeight: '100vh', padding: '50px 20px', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '45px' }}>
          <div style={{ display: 'inline-block', padding: '6px 18px', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '50px', color: '#f87171', fontSize: '0.82rem', fontWeight: '800', marginBottom: '18px' }}>
            ⚡ SHORTSENGINE AI
          </div>
          <h1 style={{ fontSize: '2.7rem', fontWeight: '900', letterSpacing: '-0.03em', margin: '0 0 12px 0', background: 'linear-gradient(180deg, #ffffff 30%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Генерирай вирални скриптове
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', margin: 0 }}>
            Автоматизирай съдържанието си за TikTok, Reels & Shorts с изкуствен интелект.
          </p>
        </header>

        {!isLoggedIn ? (
          <div style={{ background: 'rgba(20, 27, 45, 0.7)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '24px', padding: '38px 28px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: '800', marginBottom: '8px', color: '#fff' }}>Въведете имейл за достъп</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', marginBottom: '26px' }}>Получете 1 безплатен опит или влезте в профила си.</p>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '15px', borderRadius: '12px', background: '#0f172a', border: '1px solid #334155', color: '#fff', textAlign: 'center', outline: 'none', fontSize: '0.95rem', boxSizing: 'border-box' }} />
              <button type="submit" style={{ padding: '15px', background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '800', fontSize: '0.98rem', cursor: 'pointer' }}>Продължи към Генератора 🚀</button>
            </form>
            {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '14px' }}>{error}</p>}
          </div>
        ) : (
          <>
            <div style={{ background: 'rgba(20, 27, 45, 0.8)', border: '1px solid #1e293b', borderRadius: '24px', padding: '30px', marginBottom: '45px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #1e293b', paddingBottom: '18px' }}>
                <span style={{ fontSize: '0.92rem', color: '#cbd5e1', fontWeight: '500' }}>{email}</span>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '6px 14px', borderRadius: '50px', fontSize: '0.8rem', color: '#f87171', fontWeight: '800' }}>
                    {isSubscribed ? '✨ Неограничен' : `📊 Опити: ${generationsLeft}`}
                  </span>
                  <button onClick={handleLogout} style={{ background: '#0f172a', border: '1px solid #334155', color: '#94a3b8', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem' }}>Изход 🚪</button>
                </div>
              </div>

              <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <select value={platform} onChange={(e) => setPlatform(e.target.value)} style={{ padding: '12px', background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '10px' }}>
                    <option value="TikTok">TikTok</option>
                    <option value="Instagram Reels">Reels</option>
                    <option value="YouTube Shorts">Shorts</option>
                  </select>
                  <select value={tone} onChange={(e) => setTone(e.target.value)} style={{ padding: '12px', background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '10px' }}>
                    <option value="Атрактивен / Вирален">Вирален</option>
                    <option value="Образователен">Образователен</option>
                    <option value="Продажбен">Продажбен</option>
                  </select>
                  <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ padding: '12px', background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '10px' }}>
                    <option value="Български">Български</option>
                    <option value="English">English</option>
                  </select>
                </div>
                <textarea rows="3" placeholder="Тема на видеото..." value={prompt} onChange={(e) => setPrompt(e.target.value)} required style={{ width: '100%', padding: '14px', background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '10px', boxSizing: 'border-box' }} />
                <button type="submit" disabled={loading} style={{ padding: '16px', background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '800', fontSize: '1rem', cursor: 'pointer' }}>
                  {loading ? 'Генериране...' : '🔥 Генерирай Скрипт'}
                </button>
              </form>

              {result && (
                <div style={{ marginTop: '26px', padding: '22px', background: '#0a0e17', border: '1px solid #ef4444', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <strong style={{ color: '#f87171' }}>Резултат:</strong>
                    <button onClick={() => navigator.clipboard.writeText(result)} style={{ background: '#1e293b', color: '#fff', border: '1px solid #334155', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>Копирай</button>
                  </div>
                  <pre style={{ whiteSpace: 'pre-wrap', color: '#e2e8f0', fontSize: '0.92rem', margin: 0, lineHeight: '1.65' }}>{result}</pre>
                </div>
              )}
            </div>

            {!isSubscribed && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px', marginBottom: '55px' }}>
                <div style={{ background: 'rgba(20, 27, 45, 0.7)', border: '1px solid #1e293b', borderRadius: '20px', padding: '30px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ margin: '0 0 10px 0', color: '#fff', fontWeight: '800' }}>Starter</h3>
                    <p style={{ fontSize: '2.2rem', fontWeight: '900', margin: '16px 0', color: '#fff' }}>€19.99<span style={{ fontSize: '0.88rem', color: '#94a3b8' }}>/мес</span></p>
                    <p style={{ color: '#cbd5e1', fontSize: '0.88rem' }}>✓ 50 AI скрипта на месец<br />✓ TikTok, Reels & Shorts<br />✓ Включени кукички (Hooks)<br />✓ Български и Английски език</p>
                  </div>
                  <a href={STRIPE_STARTER_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '20px', padding: '14px', background: '#0f172a', color: '#fff', textAlign: 'center', borderRadius: '12px', textDecoration: 'none', fontWeight: '800', border: '1px solid #334155' }}>Купи Starter</a>
                </div>

                <div style={{ background: 'rgba(20, 27, 45, 0.95)', border: '2px solid #ef4444', borderRadius: '20px', padding: '30px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', boxShadow: '0 0 35px rgba(239, 68, 68, 0.2)' }}>
                  <div style={{ position: 'absolute', top: '-12px', right: '20px', background: '#ef4444', color: '#fff', fontSize: '0.72rem', padding: '4px 12px', borderRadius: '50px', fontWeight: '900' }}>ХИТ 🔥</div>
                  <div>
                    <h3 style={{ margin: '0 0 10px 0', color: '#fff', fontWeight: '800' }}>Pro</h3>
                    <p style={{ fontSize: '2.2rem', fontWeight: '900', margin: '16px 0', color: '#fff' }}>€39.99<span style={{ fontSize: '0.88rem', color: '#94a3b8' }}>/мес</span></p>
                    <p style={{ color: '#f1f5f9', fontSize: '0.88rem' }}>✓ Неограничени скриптове<br />✓ Приоритетна генерация<br />✓ Пълен комерсиален лиценз<br />✓ VIP поддръжка 24/7</p>
                  </div>
                  <a href={STRIPE_PRO_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '20px', padding: '14px', background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', color: '#fff', textAlign: 'center', borderRadius: '12px', textDecoration: 'none', fontWeight: '800' }}>Купи Pro Неограничен</a>
                </div>
              </div>
            )}

            <div style={{ marginBottom: '45px' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '22px', fontSize: '1.35rem', color: '#fff', fontWeight: '800' }}>Често задавани въпроси ❓</h3>
              {faqs.map((f, i) => (
                <div key={i} style={{ background: 'rgba(20, 27, 45, 0.7)', border: '1px solid #1e293b', borderRadius: '12px', marginBottom: '12px', overflow: 'hidden' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '16px 20px', background: 'none', border: 'none', color: '#fff', textAlign: 'left', fontWeight: '700', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                    <span>{f.q}</span>
                    <span style={{ color: '#ef4444' }}>{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && <div style={{ padding: '0 20px 16px', color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.6' }}>{f.a}</div>}
                </div>
              ))}
            </div>
          </>
        )}

        <footer style={{ textAlign: 'center', color: '#64748b', fontSize: '0.8rem', marginTop: '45px' }}>
          © {new Date().getFullYear()} ShortsEngine AI. Всички права са запазени.
        </footer>
      </div>
    </div>
  );
}
