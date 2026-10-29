'use client';

import React, { useState } from 'react';

const faqs = [
  {
    question: "Как точно работи ShortsEngine AI?",
    answer: "ShortsEngine AI използва усъвършенствани алгоритми за анализиране на вирусни трендове. Просто въвеждате вашата ниша или тема, а платформата автоматично генерира структуриран сценарий с грабваща кукичка (Hook), основно съдържание, призив към действие (CTA), B-Roll бележки за визуализация и вирусни хаштагове."
  },
  {
    question: "Мога ли да се откажа от абонамента си по всяко време?",
    answer: "Да, абсолютно! Няма обвързващи дългосрочни договорености. Можете да прекратите абонамента си с един клик по всяко време от вашия профил и няма да бъдете таксувани повече."
  },
  {
    question: "Поддържа ли се български език?",
    answer: "Да, ShortsEngine AI поддържа генериране на съдържание на български, английски и над 20 други езика. Можете да създавате видеа за местния пазар или да таргетирате международна публика."
  },
  {
    question: "Каква е разликата между Starter и Pro плана?",
    answer: "Starter планът е идеален за самостоятелни творци с лимит от 100 генерации на месец. Pro планът ви дава НЕОГРАНИЧЕНИ генерации, приоритетна скорост на обработка, B-Roll режисьорски бележки, кликаеми кукички за заглавия и достъп до нашия VIP Discord."
  },
  {
    question: "За кои платформи е подходящо генерираното съдържание?",
    answer: "Форматите са напълно оптимизирани за кратко форматирано видео (Vertical Short-Form Video) за TikTok, Instagram Reels, YouTube Shorts и Facebook Reels."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{ padding: '80px 16px', maxWidth: '800px', margin: '0 auto', color: '#ffffff' }} id="faq-section">
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '12px', background: 'linear-gradient(to right, #ffffff, #9ca3af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Често Задавани Въпроси
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
          Имате въпроси? Ние имаме отговорите.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              style={{
                backgroundColor: '#0f172a',
                border: isOpen ? '1px solid #ef4444' : '1px solid #1e293b',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
            >
              <button
                onClick={() => toggleFaq(index)}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <span>{faq.question}</span>
                <span style={{ 
                  fontSize: '1.2rem', 
                  color: isOpen ? '#ef4444' : '#94a3b8',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  ▼
                </span>
              </button>
              
              {isOpen && (
                <div style={{ padding: '0 24px 20px 24px', color: '#94a3b8', fontSize: '0.925rem', lineHeight: '1.6' }}>
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
