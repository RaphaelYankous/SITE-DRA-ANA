import { motion } from 'framer-motion';

// Imagem que se revela em cortina ao entrar na tela.
export const ImageReveal = ({ src, alt, className = '', imgClass = '', priority = false }) => (
  <motion.div
    initial={{ clipPath: 'inset(100% 0 0 0)' }}
    whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
    className={`overflow-hidden ${className}`}
  >
    <motion.img
      src={src}
      alt={alt}
      loading={priority ? undefined : 'lazy'}
      initial={{ scale: 1.35 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      className={`h-full w-full object-cover ${imgClass}`}
    />
  </motion.div>
);
