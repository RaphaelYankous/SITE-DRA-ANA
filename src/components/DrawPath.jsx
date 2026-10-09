import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Step = ({ n, title, text, progress, at }) => {
  const dot = useTransform(progress, [at - 0.06, at], ['rgba(184,146,74,0)', 'rgba(184,146,74,1)']);
  const num = useTransform(progress, [at - 0.06, at], ['rgba(184,146,74,0.35)', 'rgba(184,146,74,1)']);
  return (
    <div className="relative pb-24 pl-16 last:pb-0 md:pl-24">
      <motion.span
        style={{ backgroundColor: dot }}
        className="absolute left-5 top-5 h-4 w-4 -translate-x-1/2 rounded-full border border-gold bg-cream md:top-8"
      />
      <motion.span style={{ color: num }} className="block font-display text-6xl leading-none md:text-8xl">{n}</motion.span>
      <h3 className="mt-3 font-display text-3xl md:text-4xl">{title}</h3>
      <p className="mt-4 max-w-xl text-lg font-light leading-relaxed text-deep/70">{text}</p>
    </div>
  );
};

// Lista de passos ligados por um fio ondulado que se desenha com a rolagem.
export const ThreadSteps = ({ steps }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.65', 'end 0.55'] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 30 });
  const last = steps.length - 1;

  return (
    <div ref={ref} className="relative">
      <svg className="absolute bottom-0 left-0 top-0 h-full w-10" viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M20,0 C42,110 -2,220 20,330 S42,550 20,660 S-2,880 20,1000"
          fill="none"
          stroke="rgba(31,46,39,0.12)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d="M20,0 C42,110 -2,220 20,330 S42,550 20,660 S-2,880 20,1000"
          fill="none"
          stroke="#B8924A"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: progress }}
        />
      </svg>
      {steps.map(([n, title, text], i) => (
        <Step key={n} n={n} title={title} text={text} progress={progress} at={0.1 + (0.8 * i) / last} />
      ))}
    </div>
  );
};
