import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PHASES } from './breathPhases';

// Avisa o resto da página (ex.: BreathingField) sobre o estado do exercício.
const announce = (detail) => window.dispatchEvent(new CustomEvent('breathe', { detail }));

export const Breathe = () => {
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!running) return;
    let p = 0;
    let c = PHASES[0].seconds;
    announce({ running: true, phase: 0 });
    const id = setInterval(() => {
      c -= 1;
      if (c <= 0) {
        p = (p + 1) % PHASES.length;
        c = PHASES[p].seconds;
        setPhase(p);
        announce({ running: true, phase: p });
      }
      setCount(c);
    }, 1000);
    return () => {
      clearInterval(id);
      announce({ running: false });
    };
  }, [running]);

  const current = PHASES[phase];

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-[320px] w-[320px] md:h-[440px] md:w-[440px] items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            animate={running ? { scale: current.scale + i * 0.18, opacity: 0.5 - i * 0.12 } : undefined}
            transition={{ duration: current.seconds, ease: 'easeInOut' }}
            style={running ? undefined : { '--s0': 1 + i * 0.18, '--s1': 1.2 + i * 0.18, opacity: 0.4 - i * 0.1, animationDelay: `${-i * 0.25}s`, animationDuration: '8s' }}
            className={`${running ? '' : 'orb-pulse'} absolute h-[200px] w-[200px] md:h-[270px] md:w-[270px] rounded-full bg-gradient-to-br from-gold-soft to-sage/50`}
          />
        ))}
        <motion.div
          animate={running ? { scale: current.scale } : undefined}
          transition={{ duration: current.seconds, ease: 'easeInOut' }}
          style={running ? undefined : { '--s0': 1, '--s1': 1.12, animationDuration: '8s' }}
          className={`${running ? '' : 'orb-pulse'} relative flex h-[200px] w-[200px] md:h-[270px] md:w-[270px] flex-col items-center justify-center rounded-full bg-cream/90 shadow-[0_20px_60px_-20px_rgba(184,146,74,0.6)] ring-1 ring-gold/50`}
        >
          <span className="font-display text-4xl md:text-5xl text-deep">{running ? current.label : 'Respire'}</span>
          {running && <span className="mt-1 font-display text-2xl text-gold">{count}</span>}
        </motion.div>
      </div>

      <button
        onClick={() => {
          if (!running) { setPhase(0); setCount(PHASES[0].seconds); }
          setRunning((r) => !r);
        }}
        className="mt-10 rounded-full border border-deep/30 bg-cream/70 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-deep transition-colors duration-500 hover:bg-deep hover:text-cream"
      >
        {running ? 'Parar' : 'Começar'}
      </button>
    </div>
  );
};
