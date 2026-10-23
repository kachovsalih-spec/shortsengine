"use client";
import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [platform, setPlatform] = useState("TikTok");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, audience, platform }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
      } else {
        alert(data.error || "Възникна грешка при генерацията.");
      }
    } catch (err) {
      alert("Грешка при свързване със сървъра.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 py-4 px-6 flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
          ShortsEngine AI 🚀
        </h1>
        <a href="#pricing" className="bg-pink-600 hover:bg-pink-500 text-white font-semibold px-4 py-2 rounded-xl transition">
          Вземи Достъп
        </a>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
          Генерирай вирусни сценарии за Reels, TikTok & Shorts за секунди
        </h2>
        <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Спрете да губите часове в чудене какво да снимате. Вземете готови кукички (hooks), сценарии и B-roll идеи с един клик.
        </p>
      </section>

      {/* Main Generator Interface */}
      <section className="max-w-5xl mx-auto px-4 mb-24">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 grid md:grid-cols-2 gap-8 shadow-2xl">
          {/* Form */}
          <form onSubmit={handleGenerate} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Тема или Продукт</label>
              <input
                type="text"
                required
                placeholder="напр. Автомобилен детайлинг"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Целева публика</label>
              <input
                type="text"
                placeholder="напр. Собственици на коли"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Платформа</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition"
              >
                <option value="TikTok">TikTok</option>
                <option value="Instagram Reels">Instagram Reels</option>
                <option value="YouTube Shorts">YouTube Shorts</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-pink-500/20 disabled:opacity-50"
            >
              {loading ? "Генериране..." : "⚡ Генерирай Сценарий"}
            </button>
          </form>

          {/* Results Output */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col justify-center">
            {result ? (
              <div className="space-y-4 text-left">
                <div>
                  <span className="text-xs uppercase tracking-wider text-pink-400 font-bold">🪝 Hook (Първите 3 сек):</span>
                  <p className="text-lg font-semibold text-white mt-1">{result.hook}</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-purple-400 font-bold">📜 Сценарий:</span>
                  <ul className="list-disc list-inside text-slate-300 text-sm mt-1 space-y-1">
                    {Array.isArray(result.script) && result.script.map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-blue-400 font-bold">🎥 B-roll / Визия:</span>
                  <p className="text-slate-300 text-sm mt-1">{result.b_roll_visual}</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-green-400 font-bold">📢 CTA:</span>
                  <p className="text-slate-300 text-sm mt-1">{result.call_to_action}</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-500">
                Попълни формата вляво и натисни бутона, за да видиш генерирания сценарий тук.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-5xl mx-auto px-4 py-16 border-t border-slate-800 text-center">
        <h2 className="text-3xl font-extrabold mb-4">Избери своя план</h2>
        <p className="text-slate-400 mb-12">Получи неограничен достъп до изкуствения интелект и скалирай съдържанието си.</p>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Pro Plan */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between hover:border-pink-500/50 transition">
            <div>
              <h3 className="text-xl font-bold mb-2">Pro План</h3>
              <p className="text-slate-400 text-sm mb-6">За самостоятелни творци и фрилансъри</p>
              <div className="text-4xl font-black mb-6">€19.99 <span className="text-sm font-normal text-slate-400">/месец</span></div>
              <ul className="text-slate-300 text-sm space-y-3 mb-8 text-left">
                <li>✓ Неограничени сценарии</li>
                <li>✓ Достъп до gpt-4o-mini</li>
                <li>✓ TikTok, Reels & Shorts формати</li>
                <li>✓ Hooks + B-roll идеи</li>
              </ul>
            </div>
            <a
              href="https://buy.stripe.com/3cI9AU3HvfAs89W6TI67S01"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 rounded-xl block transition"
            >
              Купи Pro План
            </a>
          </div>

          {/* Agency Plan */}
          <div className="bg-slate-900 border-2 border-purple-500 rounded-2xl p-8 flex flex-col justify-between shadow-xl shadow-purple-500/10">
            <div>
              <div className="inline-block bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full mb-4">Най-популярен</div>
              <h3 className="text-xl font-bold mb-2">Agency План</h3>
              <p className="text-slate-400 text-sm mb-6">За агенции, бизнеси и екипи</p>
              <div className="text-4xl font-black mb-6">€39.99 <span className="text-sm font-normal text-slate-400">/месец</span></div>
              <ul className="text-slate-300 text-sm space-y-3 mb-8 text-left">
                <li>✓ Всичко от Pro плана</li>
                <li>✓ Приоритетна бързина на генерация</li>
                <li>✓ Неограничени клиентски профили</li>
                <li>✓ VIP 24/7 поддръжка</li>
              </ul>
            </div>
            <a
              href="https://buy.stripe.com/5kQaEY6THag875SaS00"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl block transition"
            >
              Купи Agency План
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 py-16 border-t border-slate-800">
        <h2 className="text-3xl font-extrabold text-center mb-10">Често задавани въпроси (FAQ)</h2>
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h4 className="font-bold text-lg mb-2">Как работи ShortsEngine AI?</h4>
            <p className="text-slate-400 text-sm">Въвеждате вашата ниша или тема, а нашият изкуствен интелект генерира структуриран вирусен сценарий с кукичка, основни изречения и B-roll визуални идеи.</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h4 className="font-bold text-lg mb-2">Мога ли да прекратя абонамента си по всяко време?</h4>
            <p className="text-slate-400 text-sm">Да, няма дългосрочни обвързвания. Можете да се откажете с един клик от вашия Stripe профил.</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h4 className="font-bold text-lg mb-2">За кои платформи са подходящи сценариите?</h4>
            <p className="text-slate-400 text-sm">Сценариите са форматирани специално за кратки вертикални видеа в TikTok, Instagram Reels и YouTube Shorts.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        © 2026 ShortsEngine AI. Всички права запазени.
      </footer>
    </div>
  );
}
