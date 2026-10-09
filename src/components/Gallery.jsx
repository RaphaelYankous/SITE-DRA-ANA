import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Basta colocar fotos otimizadas (.webp/.jpg) em src/assets/gallery/ — elas entram sozinhas.
const files = import.meta.glob('./../assets/gallery/*.{webp,jpg,jpeg,png}', { eager: true, import: 'default' });
const images = Object.keys(files).sort().map((k) => files[k]);

const SPEEDS = [-70, 50, -30, 70, -50, 30];
const ASPECTS = ['aspect-[3/4]', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[4/5]'];

const Item = ({ src, i, progress }) => {
  const y = useTransform(progress, [0, 1], [SPEEDS[i % SPEEDS.length], -SPEEDS[i % SPEEDS.length]]);
  return (
    <motion.div style={{ y }} className={i % 2 ? 'md:mt-24' : ''}>
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className={`${ASPECTS[i % ASPECTS.length]} overflow-hidden rounded-[2px] bg-sand shadow-[0_30px_60px_-30px_rgba(31,46,39,0.35)]`}
      >
        <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
      </motion.div>
    </motion.div>
  );
};

export const Gallery = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  if (images.length < 3) return null;

  return (
    <section ref={ref} id="galeria" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#8A6A2E]">Momentos</span>
          </div>
          <h2 className="mt-6 font-display text-5xl tracking-tight md:text-7xl">
            Um olhar <span className="italic text-gold-gradient">de perto</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-8">
          {images.map((src, i) => <Item key={src} src={src} i={i} progress={scrollYProgress} />)}
        </div>
      </div>
    </section>
  );
};
