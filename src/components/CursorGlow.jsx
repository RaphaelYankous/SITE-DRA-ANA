import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Halo dourado + anel que acompanham o mouse (somente dispositivos com mouse).
export const CursorGlow = () => {
  const [enabled] = useState(() => window.matchMedia('(pointer: fine)').matches);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const glowX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.6 });
  const glowY = useSpring(y, { stiffness: 60, damping: 20, mass: 0.6 });
  const ringX = useSpring(x, { stiffness: 400, damping: 30 });
  const ringY = useSpring(y, { stiffness: 400, damping: 30 });

  useEffect(() => {
    if (!enabled) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHovering(!!e.target.closest?.('a, button'));
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none fixed left-0 top-0 z-[5] -ml-[260px] -mt-[260px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(220,197,144,0.38)_0%,transparent_65%)]"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 2.4 : 1, opacity: hovering ? 0.9 : 0.6 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] -ml-3 -mt-3 h-6 w-6 rounded-full border border-gold"
      />
    </>
  );
};
