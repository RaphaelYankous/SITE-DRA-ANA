import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/84f47818-c213-4df3-a772-571c6b4f176c.jfif';

const NAME = 'Dra. Ana Flávia Ribeiro';
export const INTRO_MS = 2300;

// Abertura em cortina: aparece uma vez por sessão.
export const Preloader = () => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    try { sessionStorage.setItem('intro-seen', '1'); } catch { /* sem storage: ok */ }
    const id = setTimeout(() => {
      setDone(true);
      document.body.style.overflow = '';
    }, INTRO_MS);
    return () => {
      clearTimeout(id);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-deep text-cream"
        >
          {/* O logo "inspira": anéis se expandem e dissolvem, como uma respiração */}
          <div className="relative mb-16 flex h-20 w-20 items-center justify-center">
            {[0, 1].map((i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 2.6, opacity: 0 }}
                transition={{ duration: 1.8, delay: 0.3 + i * 0.5, ease: 'easeOut', repeat: 1 }}
                className="absolute inset-0 rounded-full border border-gold/70"
              />
            ))}
            <motion.img
              src={Logo}
              alt=""
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [0.6, 1.12, 1], opacity: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-20 w-20 rounded-full object-cover ring-1 ring-gold/70"
            />
          </div>
          <p className="mt-8 flex overflow-hidden font-display text-3xl md:text-5xl tracking-wide">
            {NAME.split('').map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.035, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {ch === ' ' ? ' ' : ch}
              </motion.span>
            ))}
          </p>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 h-px w-40 origin-left bg-gold"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-5 text-[10px] uppercase tracking-[0.4em] text-gold-soft"
          >
            Saúde Mental
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
