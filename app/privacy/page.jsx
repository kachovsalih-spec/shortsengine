export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-white">Политика за поверителност</h1>
      <p className="mb-4 text-sm text-gray-400">Последна промяна: 2026 г.</p>
      
      <section className="mb-6 space-y-3">
        <h2 className="text-xl font-semibold text-white">1. Събиране на информация</h2>
        <p>Събираме само необходимата информация за предоставяне на услугата: вашия имейл адрес при регистрация и данни за вашия профил през Supabase Authentication.</p>
      </section>

      <section className="mb-6 space-y-3">
        <h2 className="text-xl font-semibold text-white">2. Обработка на плащания</h2>
        <p>Информация за вашите кредитни/дебитни карти НЕ се съхранява на нашите сървъри. Всички плащания се обработват директно от Stripe при спазване на най-високите стандарти за сигурност (PCI-DSS).</p>
      </section>

      <section className="mb-6 space-y-3">
        <h2 className="text-xl font-semibold text-white">3. Защита на данните</h2>
        <p>Ние не продаваме и не споделяме вашите лични данни с трети страни за маркетингови цели.</p>
      </section>

      <section className="mb-6 space-y-3">
        <h2 className="text-xl font-semibold text-white">4. Контакт с нас</h2>
        <p>За въпроси относно вашите данни или сайта, можете да се свържете с нас на поддръжката на ShortsEngine AI.</p>
      </section>
    </div>
  );
}
