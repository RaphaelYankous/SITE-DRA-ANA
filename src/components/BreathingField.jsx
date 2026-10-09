import { useEffect, useRef } from 'react';
import { motion, animate, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { PHASES } from './breathPhases';

// Duas "atmosferas" empilhadas (quente e sálvia). A rolagem só troca a opacidade
// entre elas, o que o navegador faz na GPU, sem repintar. Os blobs são gradientes
// radiais estáticos que pulsam via CSS (transform), sem blur nem animação de contorno.
const stops = [0, 0.18, 0.36, 0.52, 0.68, 0.84, 1];
const warmOpacity = [1, 0.7, 0, 0, 1, 0, 1];
const sageOpacity = [0, 0.3, 1, 1, 0, 1, 0];

const grad = (rgb) => `radial-gradient(circle, rgba(${rgb},0.85) 0%, rgba(${rgb},0) 68%)`;

const Blob = ({ rgb, className, delay = '0s' }) => (
  <span className={`blob absolute ${className}`} style={{ background: grad(rgb), animationDelay: delay }} />
);

// Camada fixa que respira atrás de todo o site. Reage à rolagem (cor)
// e ao exercício de respiração (escala), e pausa quando a aba está oculta.
export const BreathingField = () => {
  const root = useRef(null);
  const { scrollYProgress } = useScroll();
  const warm = useTransform(scrollYProgress, stops, warmOpacity);
  const sage = useTransform(scrollYProgress, stops, sageOpacity);
  const scale = useMotionValue(1);

  useEffect(() => {
    let controls;
    const onBreathe = (e) => {
      controls?.stop();
      const { running, phase } = e.detail;
      if (!running) {
        controls = animate(scale, 1, { duration: 1.6, ease: 'easeInOut' });
        return;
      }
      const p = PHASES[phase];
      controls = animate(scale, p.scale === 1 ? 1 : 1.3, { duration: p.seconds, ease: 'easeInOut' });
    };
    const onVisibility = () => root.current?.classList.toggle('field-paused', document.hidden);
    window.addEventListener('breathe', onBreathe);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      controls?.stop();
      window.removeEventListener('breathe', onBreathe);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [scale]);

  return (
    <div ref={root} aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden bg-cream">
      <motion.div style={{ scale }} className="absolute inset-0 will-change-transform">
        {/* Quente: dourado e areia */}
        <motion.div style={{ opacity: warm }} className="absolute inset-0 will-change-[opacity]">
          <Blob rgb="220,197,144" className="-right-[18vw] -top-[18vw] h-[78vw] w-[78vw] md:h-[62vw] md:w-[62vw]" />
          <Blob rgb="230,236,229" delay="-5s" className="-bottom-[22vw] -left-[18vw] h-[84vw] w-[84vw] md:h-[66vw] md:w-[66vw]" />
          <Blob rgb="231,220,200" delay="-9s" className="left-[30vw] top-[34vh] hidden h-[46vw] w-[46vw] md:block" />
        </motion.div>
        {/* Sálvia: verde-névoa */}
        <motion.div style={{ opacity: sage }} className="absolute inset-0 bg-mist/70 will-change-[opacity]">
          <Blob rgb="185,202,189" className="-left-[16vw] -top-[16vw] h-[80vw] w-[80vw] md:h-[60vw] md:w-[60vw]" />
          <Blob rgb="220,197,144" delay="-6s" className="-bottom-[20vw] -right-[16vw] h-[78vw] w-[78vw] md:h-[56vw] md:w-[56vw]" />
          <Blob rgb="203,216,206" delay="-3s" className="right-[26vw] top-[30vh] hidden h-[40vw] w-[40vw] md:block" />
        </motion.div>
      </motion.div>
    </div>
  );
};
