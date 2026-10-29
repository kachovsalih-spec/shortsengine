'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import PricingSection from '../components/PricingSection';
import Footer from '../components/Footer';

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
  const [planType, setPlanType] = useState('starter');

  // Интерактивен рейтинг с начална стойност 4.9 и 235 гласа
  const [userRating, setUserRating] = useState(0);
  const [rated, setRated] = useState(false);
  const [totalReviews, setTotalReviews] = useState(235);
  const [averageRating, setAverageRating] = useState(4.9);

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
      const userPlan = data.plan_type || 'starter';
      setPlanType(userPlan);

      if (userPlan === 'admin' || userPlan === 'pro') {
        setGenerationsLeft(999);
      } else {
        setGenerationsLeft(data.generations_left);
      }
    }
  } catch (e) { console.error(e); }
};

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) { setError('Моля, въведете валиден имейл адрес.'); return; }
    setLoading(true); setError('');
    try {
      // 1. Регистрира/Записва имейла автоматично в Supabase Auth Users
      await supabase.auth.signInWithOtp({ email });

      // 2. Проверява/създава профила в таблица users
      let { data } = await supabase.from('users').select('*').eq('email', email).single();
      if (!data) {
        const { data: nUser } = await supabase.from('users').insert([{ email, generations_left: 1, is_subscribed: false }]).select().single();
        data = nUser;
      }

      localStorage.setItem('shortsEngine_email', email);
      setIsLoggedIn(true);
      if (data) {
        setIsSubscribed(data.is_subscribed);
        setGenerationsLeft(data.generations_left);
        setPlanType(data.plan_type || 'starter');

      }
    } catch (err) { setError('Грешка при вход. Опитайте отново.'); }
    finally { setLoading(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem('shortsEngine_email');
    setIsLoggedIn(false); setEmail(''); setResult('');
  };

  const handleRate = (stars) => {
    if (rated) return;
    setUserRating(stars);
    setRated(true);
    // Пресмятаме нов среден рейтинг динамично
    const newTotal = totalReviews + 1;
    const newAvg = ((averageRating * totalReviews + stars) / newTotal).toFixed(1);
    setTotalReviews(newTotal);
    setAverageRating(newAvg);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (generationsLeft <= 0 && !isSubscribed) {
      setError('⚠️ Безплатните опити изчезнаха! Разгледайте плановете по-долу за неограничен достъп.');
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
        body: JSON.stringify({ prompt: `Create a professional and high-performing short script for ${platform}: ${prompt}. Style: ${tone}. Language: ${language}.` }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Грешка при генерация.');
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
  {
    question: "Как точно работи ShortsEngine AI?",
    answer: "ShortsEngine AI използва усъвършенствани алгоритми за анализиране на вирусни трендове. Просто въвеждате вашата ниша или тема, а платформата автоматично генерира структуриран сценарий с грабваща кукичка (Hook), основно съдържание, призив към действие (CTA) и вирусни хаштагове."
  },
  {
    question: "Мога ли да се откажа от абонамента си по всяко време?",
    answer: "Да, абсолютно! Няма обвързващи дългосрочни договорености. Можете да прекратите абонамента си с един клик по всяко време от вашия профил и няма да бъдете таксувани повече."
  },
  {
    question: "Поддържа ли се български език?",
    answer: "Да, ShortsEngine AI поддържа генериране на съдържание на български, английски и над 20 други езика. Можете да създавате видеа за местния пазар или да таргетирате международна публика."
  }
];

  return (
    <div style={{
      backgroundColor: '#04060b',
      backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(220, 38, 38, 0.22) 0%, transparent 55%), radial-gradient(circle at 10% 90%, rgba(30, 41, 59, 0.6) 0%, transparent 40%)',
      color: '#f1f5f9',
      minHeight: '100vh',
      padding: '30px 14px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
       
        {/* HEADER */}
        <header style={{ textAlign: 'center', marginBottom: '35px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 14px',
            background: 'rgba(220, 38, 38, 0.15)',
            border: '1px solid rgba(220, 38, 38, 0.4)',
            borderRadius: '50px',
            color: '#f87171',
            fontSize: '0.78rem',
            fontWeight: '800',
            letterSpacing: '0.8px',
            boxShadow: '0 0 20px rgba(220, 38, 38, 0.2)',
            marginBottom: '14px'
          }}>
            ⚡ AI ENGINE FOR CONTENT CREATORS
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 2.6rem)',
            fontWeight: '900',
            letterSpacing: '-0.03em',
            margin: '0 0 10px 0',
            background: 'linear-gradient(180deg, #ffffff 30%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Създавай хитови видеа за секунди
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.98rem', margin: '0 0 16px 0', fontWeight: '500', lineHeight: '1.4' }}>
            Превърни всяка идея в пристрастяващ скрипт за TikTok, Reels и YouTube Shorts с помощта на AI.
          </p>

          {/* REVIEWS SECTION */}
      <section style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '10px' }}>
          Оценки и Отзиви
        </h2>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '30px', color: '#ffb400' }}>
          ★ {avgRating} / 5.0 ({reviews.length} {reviews.length === 1 ? 'отзив' : 'отзива'})
        </p>

        {/* Форма за изпращане */}
        <form onSubmit={handleSubmitReview} style={{ background: '#111', padding: '20px', borderRadius: '12px', marginBottom: '40px', border: '1px solid #222' }}>
          <h3 style={{ marginBottom: '15px', fontSize: '1.1rem' }}>Оставете вашия отзив</h3>
          
          {message && <p style={{ color: message.includes('Грешка') ? 'red' : 'green', marginBottom: '15px' }}>{message}</p>}

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Имейл:</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vashiyat@email.com"
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #333', background: '#222', color: '#fff' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Оценка:</label>
            <select 
              value={rating} 
              onChange={(e) => setRating(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #333', background: '#222', color: '#fff' }}
            >
              <option value="5">5 ★★★★★ (Отлично)</option>
              <option value="4">4 ★★★★☆ (Много добро)</option>
              <option value="3">3 ★★★☆☆ (Добро)</option>
              <option value="2">2 ★★☆☆☆ (Средно)</option>
              <option value="1">1 ★☆☆☆☆ (Слабо)</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Коментар:</label>
            <textarea 
              required 
              rows="3" 
              value={comment} 
              onChange={(e) => setComment(e.target.value)}
              placeholder="Напишете вашето мнение..."
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #333', background: '#222', color: '#fff' }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: 'none', background: '#0070f3', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {loading ? 'Изпращане...' : 'Публикувай отзив'}
          </button>
        </form>

        {/* Списък с последни ревюта */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {reviews.map((rev) => (
            <div key={rev.id} style={{ padding: '15px', background: '#161616', borderRadius: '8px', border: '1px solid #222' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold', color: '#aaa' }}>{rev.user_email}</span>
                <span style={{ color: '#ffb400' }}>{'★'.repeat(rev.rating)}</span>
              </div>
              <p style={{ margin: 0, color: '#ddd' }}>{rev.comment}</p>
            </div>
          ))}
        </div>
      </section>

        {!isLoggedIn ? (
          /* LOGIN CARD */
          <div style={{
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(220, 38, 38, 0.35)',
            borderRadius: '22px',
            padding: '28px 20px',
            textAlign: 'center',
            maxWidth: '440px',
            margin: '0 auto',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
          }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '6px', color: '#fff' }}>Започни напълно безплатно</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '22px' }}>Въведи своя имейл, за да отключиш първия си скрипт.</p>
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
                  background: 'rgba(4, 6, 11, 0.9)',
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
                  padding: '14px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  fontWeight: '800',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(220, 38, 38, 0.4)'
                }}
              >
                {loading ? 'Зареждане...' : 'Влез в системата 🚀'}
              </button>
            </form>
            {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '14px', fontWeight: 600 }}>{error}</p>}
          </div>
        ) : (
          <>
            {generationsLeft <= 0 && !isSubscribed && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '14px',
                padding: '16px',
                textAlign: 'center',
                marginBottom: '24px',
                color: '#f87171',
                fontSize: '0.95rem',
                fontWeight: 700,
                boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)'
              }}>
                ⚡ Безплатните опити свършиха! Отключи неограничена мощ и създавай съдържание, което завладява аудиторията.
              </div>
            )}

            {isSubscribed && (
              <div style={{
                background: 'rgba(34, 197, 94, 0.12)',
                border: '1px solid rgba(34, 197, 94, 0.35)',
                borderRadius: '14px',
                padding: '14px',
                textAlign: 'center',
                marginBottom: '24px',
                color: '#4ade80',
                fontSize: '0.9rem',
                fontWeight: 600
              }}>
                🎉 Активен PRO Абонамент с неограничени възможности! ({email})
              </div>
            )}

            {/* GENERATOR DASHBOARD */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '22px',
              padding: '24px 18px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
              marginBottom: '35px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '14px', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ color: '#cbd5e1', fontWeight: 600, fontSize: '0.88rem', wordBreak: 'break-all' }}>👤 {email}</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{
                    display: 'inline-flex',
                    padding: '5px 12px',
                    background: 'rgba(220, 38, 38, 0.15)',
                    border: '1px solid rgba(220, 38, 38, 0.35)',
                    borderRadius: '99px',
                    color: '#f87171',
                    fontSize: '0.75rem',
                    fontWeight: '800'
                  }}>
              {planType === 'admin' ? (
  <span style={{ color: '#ef4444', fontWeight: 'bold' }}>👑 Admin План</span>
) : planType === 'pro' ? (
  <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>⚡ Pro План</span>
) : (
  isSubscribed ? '🔥 Неограничен' : `🔥 Опити: ${generationsLeft}`
)}

                  </span>
                  <button
                    onClick={handleLogout}
                    style={{
                      background: 'none',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#94a3b8',
                      padding: '5px 10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.78rem'
                    }}
                  >
                    Изход
                  </button>
                </div>
              </div>

              <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '5px', fontWeight: 700 }}>ПЛАТФОРМА</label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: '#04060b',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    >
                      <option value="TikTok">TikTok</option>
                      <option value="Instagram Reels">Instagram Reels</option>
                      <option value="YouTube Shorts">YouTube Shorts</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '5px', fontWeight: 700 }}>Тоналност на видеото</label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: '#04060b',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '10px',
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
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '5px', fontWeight: 700 }}>ЕЗИК</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: '#04060b',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '10px',
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
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '5px', fontWeight: 700 }}>ТЕМА НА ВИДЕОТО ИЛИ ОСНОВНА ИДЕЯ</label>
                  <textarea
                    rows="3"
                    placeholder="Напр. 3 грешки в тренировките, които спират растежа ти..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: '#04060b',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '10px',
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
                    padding: '15px',
                    background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    boxShadow: '0 8px 25px rgba(220, 38, 38, 0.4)'
                  }}
                >
                  {loading ? 'AI генерира твоя скрипт...' : '🔥 Генерирай Скрипт'}
                </button>
              </form>

              {error && (
                <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.35)', borderRadius: '10px', color: '#f87171', textAlign: 'center', fontSize: '0.88rem', fontWeight: 600 }}>
                  {error}
                </div>
              )}

              {result && (
                <div style={{ marginTop: '22px', padding: '20px', background: '#04060b', border: '1px solid #ef4444', borderRadius: '14px', boxShadow: '0 0 25px rgba(239,68,68,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                    <strong style={{ color: '#f87171', fontSize: '1rem' }}>✨ Вашият готов скрипт:</strong>
                    <button
                      onClick={() => navigator.clipboard.writeText(result)}
                      style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', padding: '5px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 'bold' }}
                    >
                      Копирай 📋
                    </button>
                  </div>
                  <pre style={{ whiteSpace: 'pre-wrap', color: '#e2e8f0', lineHeight: '1.6', fontFamily: 'inherit', fontSize: '0.9rem', margin: 0 }}>{result}</pre>
                </div>
              )}
            </div>

            {/* PRICING SECTION */}
            {!isSubscribed && (
              <div id="pricing-section">
                <PricingSection STRIPE_STARTER_LINK={STRIPE_STARTER_LINK} STRIPE_PRO_LINK={STRIPE_PRO_LINK} />
              </div>
            )}

          {/* FAQ SECTION */}
<section style={{ maxWidth: '800px', margin: '0 auto 80px auto', padding: '0 16px', color: '#fff' }}>
  <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem', fontWeight: '900' }}>
    Често задавани въпроси
  </h2>
  
  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
    {faqs.map((faq, index) => (
      <div 
        key={index}
        onClick={() => setOpenFaq(openFaq === index ? null : index)}
        style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '16px 18px',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#fff', fontSize: '1rem' }}>
          <span>{faq.question}</span>
          <span>{openFaq === index ? '▲' : '▼'}</span>
        </div>
        {openFaq === index && (
          <div style={{ marginTop: '12px', color: '#94a3b8', fontSize: '0.925rem', lineHeight: '1.5' }}>
            {faq.answer}
          </div>
        )}
      </div>
    ))}
      </div>
    </section>

    {/* FOOTER */}
    <Footer />

  </div>
);
}
