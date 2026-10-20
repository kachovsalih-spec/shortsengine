'use client';
import React, { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [platform, setPlatform] = useState('TikTok');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, audience, platform }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
      } else {
        alert('Грешка: ' + (data.error || 'Неуспешна генерация'));
      }
    } catch (err) {
      alert('Грешка при свързването със сървъра.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            ShortsEngine AI 🚀
          </h1>
          <p className="text-slate-400 mt-2">Генерирай вирусни сценарии за Reels, TikTok & Shorts за секунди.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleGenerate} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Тема или Продукт</label>
              <input 
                type="text" 
                value={topic} 
                onChange={(e) => setTopic(e.target.value)} 
                placeholder="напр. Автомобилен детайлинг" 
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Целева публика</label>
              <input 
                type="text" 
                value={audience} 
                onChange={(e) => setAudience(e.target.value)} 
                placeholder="напр. Собственици на коли" 
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Платформа</label>
              <select 
                value={platform} 
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="TikTok">TikTok</option>
                <option value="Instagram Reels">Instagram Reels</option>
                <option value="YouTube Shorts">YouTube Shorts</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? '⚡ Генериране...' : '⚡ Генерирай Сценарий'}
            </button>
          </form>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 min-h-[400px]">
            {result ? (
              <div className="space-y-4 text-sm">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-xs uppercase bg-purple-900/50 text-purple-300 px-2 py-1 rounded">Заглавие</span>
                  <h3 className="text-lg font-bold mt-1">{result.title}</h3>
                </div>

                <div className="bg-purple-950/40 p-3 rounded-lg border border-purple-800/40">
                  <span className="text-xs text-purple-400 font-bold uppercase">🎯 Hook (Първи 3 сек):</span>
                  <p className="font-semibold text-white mt-1">"{result.hook}"</p>
                  <p className="text-xs text-slate-400 mt-1">🎥 Кадър: {result.hook_visual}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs text-slate-400 uppercase font-bold">🎬 Сценарий:</span>
                  {result.script_body?.map((item, idx) => (
                    <div key={idx} className="bg-slate-800/50 p-2.5 rounded border border-slate-700/50">
                      <p className="text-xs text-purple-400">{item.timestamp}</p>
                      <p className="text-slate-200 mt-0.5">"{item.spoken_text}"</p>
                      <p className="text-xs text-slate-400 italic mt-1">B-Roll: {item.b_roll_visual}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <span className="text-xs text-pink-400 font-bold uppercase">📣 CTA:</span>
                  <p className="text-slate-300">{result.call_to_action}</p>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 text-center">
                Попълни формата вляво и натисни бутона, за да видиш генерирания сценарий тук.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
