import { motion, useScroll, useTransform } from 'framer-motion';

// Fundo fixo e estático: duas atmosferas (quente e sálvia) com gradientes suaves e baixos
// em contraste. A rolagem só troca a opacidade entre elas (GPU, sem repintar).
const stops = [0, 0.18, 0.36, 0.52, 0.68, 0.84, 1];
const warmOpacity = [1, 0.7, 0, 0, 1, 0, 1];
const sageOpacity = [0, 0.3, 1, 1, 0, 1, 0];

const warm = `
  radial-gradient(120% 70% at 100% 0%, rgba(220,197,144,0.28) 0%, transparent 60%),
  radial-gradient(90% 60% at 0% 100%, rgba(230,236,229,0.9) 0%, transparent 65%)`;
const sage = `
  radial-gradient(110% 70% at 0% 0%, rgba(203,216,206,0.6) 0%, transparent 60%),
  radial-gradient(90% 60% at 100% 100%, rgba(220,197,144,0.2) 0%, transparent 65%)`;

export const BreathingField = () => {
  const { scrollYProgress } = useScroll();
  const warmO = useTransform(scrollYProgress, stops, warmOpacity);
  const sageO = useTransform(scrollYProgress, stops, sageOpacity);

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 bg-cream">
      <motion.div style={{ opacity: warmO, background: warm }} className="absolute inset-0 will-change-[opacity]" />
      <motion.div style={{ opacity: sageO, background: sage }} className="absolute inset-0 will-change-[opacity]" />
    </div>
  );
};
