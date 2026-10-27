use client';

import React from 'react';

export default function PricingSection() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto text-white" id="pricing">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Изберете вашия план за растеж
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Генерирайте вирусни сценарии за секунди и изградете устойчива публика в TikTok, Instagram и YouTube.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Starter Plan */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col justify-between hover:border-gray-700 transition">
          <div>
            <h3 className="text-xl font-bold mb-2">⚡ Starter План</h3>
            <p className="text-gray-400 text-sm mb-6">Перфектен за начинаещи творци и самостоятелни бизнеси.</p>
            <div className="text-4xl font-black mb-6">
              €19.99 <span className="text-base font-normal text-gray-400">/ месец</span>
            </div>
            <ul className="space-y-4 mb-8 text-gray-300 text-sm">
              <li className="flex items-center gap-2">✓ <strong>100 AI Генерации</strong> на месец</li>
              <li className="flex items-center gap-2">✓ Поддръжка на <strong>TikTok, Reels & Shorts</strong></li>
              <li className="flex items-center gap-2">✓ Формат <strong>Hook-Story-Offer</strong></li>
              <li className="flex items-center gap-2">✓ Готови descriptions & hashtags</li>
              <li className="flex items-center gap-2 text-gray-500">✕ B-Roll & Визуални бележки</li>
              <li className="flex items-center gap-2 text-gray-500">✕ VIP Discord общност</li>
            </ul>
          </div>
          <button className="w-full py-3 px-6 rounded-xl font-bold bg-gray-800 hover:bg-gray-700 transition">
            Започни със Starter
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-gradient-to-b from-red-900/30 to-gray-900 border-2 border-red-500 rounded-2xl p-8 flex flex-col justify-between relative shadow-xl shadow-red-950/40">
          <div className="absolute -top-4 right-6 bg-red-500 text-white text-xs uppercase font-extrabold py-1 px-3 rounded-full tracking-wider">
            Най-популярен
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-red-400">🔥 Pro План</h3>
            <p className="text-gray-300 text-sm mb-6">За сериозни творци, които искат максимална гледаемост.</p>
            <div className="text-4xl font-black mb-6">
              €39.99 <span className="text-base font-normal text-gray-400">/ месец</span>
            </div>
            <ul className="space-y-4 mb-8 text-gray-200 text-sm">
              <li className="flex items-center gap-2">👑 <strong>Неограничени</strong> AI генерации</li>
              <li className="flex items-center gap-2 text-red-400 font-semibold">
                💬 <strong>VIP Discord Общност</strong> (Private Access)
              </li>
              <li className="flex items-center gap-2">
                🎬 <strong>B-Roll & Visual Notes</strong> (режисьорски бележки)
              </li>
              <li className="flex items-center gap-2">
                📌 <strong>3 Thumbnail Hooks</strong> (заглавия за корици)
              </li>
              <li className="flex items-center gap-2">✓ Приоритетна бързина на AI модела</li>
              <li className="flex items-center gap-2">✓ Достъп до нови функции преди всички</li>
            </ul>
          </div>
          <button className="w-full py-3 px-6 rounded-xl font-bold bg-red-600 hover:bg-red-500 transition shadow-lg shadow-red-600/30">
            Вземи Pro + VIP Discord
          </button>
        </div>
      </div>
    </section>
  );
}
