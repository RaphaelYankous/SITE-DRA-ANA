import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOODS, SITE, whatsappLink } from '../data/site';

const ease = [0.22, 1, 0.36, 1];

// "Como você está chegando hoje?": escolha um sentimento, receba uma resposta acolhedora
// e abra o WhatsApp com a frase pronta. Nada é gravado nem enviado antes do clique.
export const CheckIn = () => {
  const [id, setId] = useState(null);
  const mood = MOODS.find((m) => m.id === id);
  const href = whatsappLink(
    mood
      ? `Olá, Dra. Ana! Hoje estou me sentindo ${mood.feeling} e gostaria de agendar uma consulta.`
      : 'Olá, Dra. Ana! Gostaria de agendar uma consulta.',
  );

  return (
    <section id="checkin" aria-labelledby="checkin-title" className="relative overflow-hidden py-24 md:py-36">
      <AnimatePresence>
        {mood && (
          <motion.div
            key={mood.id}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(70% 80% at 50% 50%, ${mood.tint} 0%, transparent 70%)` }}
          />
        )}
      </AnimatePresence>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-gold" />
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#8A6A2E]">Check-in</span>
        </div>
        <h2 id="checkin-title" className="font-display mt-6 text-5xl leading-[1] tracking-tight md:text-7xl">
          Como você está <span className="italic text-gold-gradient">chegando hoje?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg font-light leading-relaxed text-deep/70">
          Escolha o que mais combina com você agora. Não é um teste nem um diagnóstico, só um jeito de começar a conversa.
        </p>

        <div role="group" aria-label="Como você está se sentindo" className="mt-12 flex flex-wrap justify-center gap-3">
          {MOODS.map((m) => (
            <button
              key={m.id}
              type="button"
              aria-pressed={id === m.id}
              onClick={() => setId(m.id)}
              className={`rounded-full border px-6 py-3 text-[12px] font-medium uppercase tracking-[0.18em] transition-all duration-500 ${
                id === m.id
                  ? 'border-deep bg-deep text-cream shadow-[0_12px_30px_-12px_rgba(31,46,39,0.5)]'
                  : 'border-deep/25 text-deep hover:border-gold hover:text-gold'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div aria-live="polite" className="mt-14 min-h-[17rem] md:min-h-[15rem]">
          <AnimatePresence mode="wait">
            {mood && (
              <motion.div
                key={mood.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.6, ease }}
                className="mx-auto max-w-2xl"
              >
                <h3 className="font-display text-3xl italic text-deep md:text-5xl">{mood.title}</h3>
                <p className="mt-5 text-lg font-light leading-relaxed text-deep/75">{mood.text}</p>
                <p className="mt-4 text-sm font-light italic text-[#8A6A2E]">{mood.tip}</p>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-deep px-8 py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-cream transition-colors duration-500 hover:bg-gold"
                >
                  Conversar com a {SITE.shortName}
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
