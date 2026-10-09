import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const AREAS = [
  {
    n: '01',
    title: 'Manejo da Ansiedade',
    text: 'Cuidado focado na compreensão profunda dos sintomas e na busca por estratégias práticas de alívio e controle emocional no dia a dia, respeitando o seu ritmo.',
    orb: 'from-gold-soft via-sand to-cream',
  },
  {
    n: '02',
    title: 'Suporte ao Humor',
    text: 'Acompanhamento clínico especializado para quadros de desânimo, depressão e instabilidade, visando a recuperação da sua funcionalidade e da vontade de viver.',
    orb: 'from-mist via-sage/40 to-cream',
  },
  {
    n: '03',
    title: 'Equilíbrio & Burnout',
    text: 'Orientação médica direcionada para lidar com o esgotamento mental e o estresse crônico gerado pelo ambiente de trabalho contemporâneo e pelas demandas da vida.',
    orb: 'from-sand via-gold/40 to-cream',
  },
  {
    n: '04',
    title: 'Telemedicina',
    text: 'Atendimento online de excelência, com foco em acessibilidade e conforto, mantendo o mesmo rigor ético, pontualidade e acolhimento do presencial.',
    orb: 'from-sage/40 via-mist to-cream',
  },
];

const Orb = ({ className, delay = 0 }) => (
  <div className="relative flex h-[260px] w-[260px] items-center justify-center md:h-[min(46vh,420px)] md:w-[min(46vh,420px)]">
    {[1.35, 1.15, 1].map((s, i) => (
      <span
        key={i}
        aria-hidden="true"
        style={{ '--s0': s * 0.9, '--s1': s * 1.05, opacity: 0.4 + i * 0.2, animationDelay: `${-(delay + i * 0.4)}s` }}
        className={`orb-pulse absolute inset-0 rounded-full bg-gradient-to-br ${className}`}
      />
    ))}
  </div>
);

const Eyebrow = ({ children }) => (
  <div className="flex items-center gap-4">
    <span className="h-px w-10 bg-gold" />
    <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#8A6A2E]">{children}</span>
  </div>
);

// Desktop: seção "presa" na tela, painéis deslizam na horizontal com a rolagem.
// Celular: lista vertical simples.
export const HorizontalAreas = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const x = useTransform(smooth, [0, 1], ['0%', `-${(100 * (AREAS.length - 1)) / AREAS.length}%`]);
  const bar = useTransform(smooth, [0, 1], [0.1, 1]);

  return (
    <section id="atuacao" className="relative">
      {/* Desktop */}
      <div ref={ref} className="relative hidden md:block" style={{ height: `${AREAS.length * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute left-0 right-0 top-28 z-10 mx-auto flex max-w-6xl items-end justify-between px-6">
            <div>
              <Eyebrow>Atuação</Eyebrow>
              <h2 className="mt-4 font-display text-4xl tracking-tight">
                Áreas de <span className="italic text-gold-gradient">cuidado</span>
              </h2>
            </div>
            <div className="hidden w-48 lg:block">
              <div className="h-px w-full bg-deep/15">
                <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-gold" />
              </div>
              <p className="mt-3 text-right text-[10px] uppercase tracking-[0.3em] text-deep/50">Role →</p>
            </div>
          </div>

          <motion.div style={{ x, width: `${AREAS.length * 100}vw` }} className="flex h-full will-change-transform">
            {AREAS.map((a, i) => (
              <div key={a.n} className="flex h-full w-screen shrink-0 items-center px-6 pt-24">
                <div className="mx-auto grid w-full max-w-6xl grid-cols-12 items-center gap-10">
                  <div className="col-span-7">
                    <span className="font-display text-[9rem] leading-none text-gold/35 lg:text-[12rem]">{a.n}</span>
                    <h3 className="mt-2 font-display text-6xl leading-[1] tracking-tight lg:text-7xl">{a.title}</h3>
                    <p className="mt-8 max-w-lg text-lg font-light leading-relaxed text-deep/70">{a.text}</p>
                  </div>
                  <div className="col-span-5 flex justify-center">
                    <Orb className={a.orb} delay={i * 1.2} />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Celular */}
      <div className="mx-auto max-w-xl px-6 py-24 md:hidden">
        <Eyebrow>Atuação</Eyebrow>
        <h2 className="mt-5 font-display text-5xl leading-[1] tracking-tight">
          Áreas de <span className="italic text-gold-gradient">cuidado</span>
        </h2>
        <div className="mt-14 space-y-20">
          {AREAS.map((a, i) => (
            <motion.div
              key={a.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start"
            >
              <Orb className={a.orb} delay={i} />
              <span className="mt-6 font-display text-6xl leading-none text-gold/50">{a.n}</span>
              <h3 className="mt-2 font-display text-4xl leading-tight">{a.title}</h3>
              <p className="mt-4 font-light leading-relaxed text-deep/70">{a.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
