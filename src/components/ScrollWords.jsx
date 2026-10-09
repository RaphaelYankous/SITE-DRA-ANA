import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Word = ({ children, range, progress, accent }) => {
  const opacity = useTransform(progress, range, [0.3, 1]);
  return (
    <motion.span style={{ opacity }} className={`inline-block mr-[0.25em] ${accent ? 'italic text-gold-gradient' : ''}`}>
      {children}
    </motion.span>
  );
};

// Texto que "acende" palavra por palavra conforme a rolagem.
// Palavras iniciadas com "_" ganham destaque dourado.
export const ScrollWords = ({ text, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] });
  const words = text.split(' ');

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const accent = w.startsWith('_');
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress} accent={accent}>
            {accent ? w.slice(1) : w}
          </Word>
        );
      })}
    </p>
  );
};
