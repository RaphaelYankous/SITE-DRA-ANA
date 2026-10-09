import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { FloatingButtons } from './components/FloatingButtons';
import { Preloader, INTRO_MS } from './components/Preloader';
import { CursorGlow } from './components/CursorGlow';
import { ScrollWords } from './components/ScrollWords';
import { Breathe } from './components/Breathe';
import { BreathingField } from './components/BreathingField';
import { HorizontalAreas } from './components/HorizontalAreas';
import { ThreadSteps } from './components/DrawPath';
import { Gallery } from './components/Gallery';
import { ImageReveal } from './components/ImageReveal';

import Logo from './assets/84f47818-c213-4df3-a772-571c6b4f176c.jfif';
import RetratoImg from './assets/ana-retrato.webp';
import SobreImg from './assets/ana-sobre.webp';
import OnlineImg from './assets/ana-online.webp';

const WHATSAPP = `https://wa.me/553199442774?text=${encodeURIComponent('Olá, Dra. Ana! Gostaria de agendar uma consulta.')}`;
const ease = [0.22, 1, 0.36, 1];

// ── Helpers ───────────────────────────────────────────

const Reveal = ({ children, delay = 0, y = 32, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.9, delay, ease }}
    className={className}
  >
    {children}
  </motion.div>
);

const Eyebrow = ({ children, className = '' }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <span className="h-px w-10 bg-gold" />
    <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#8A6A2E]">{children}</span>
  </div>
);

const Arrow = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16m0 0l-6-6m6 6l-6 6" />
  </svg>
);

// Botão "magnético": é atraído levemente pelo cursor.
const CTA = ({ children, href = WHATSAPP, variant = 'solid', className = '' }) => {
  const styles = {
    solid: 'bg-deep text-cream hover:bg-gold shadow-[0_12px_30px_-12px_rgba(31,46,39,0.5)]',
    ghost: 'border border-deep/25 text-deep hover:border-deep hover:bg-deep/5',
  };
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 200, damping: 15 });
  const y = useSpring(my, { stiffness: 200, damping: 15 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.a
      href={href}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-[12px] font-medium uppercase tracking-[0.2em] transition-colors duration-500 ${styles[variant]} ${className}`}
    >
      {children}
      <span className="transition-transform duration-500 group-hover:translate-x-1"><Arrow /></span>
    </motion.a>
  );
};

// Selo giratório com texto circular.
const SpinBadge = () => (
  <div className="spin-slow h-28 w-28 md:h-32 md:w-32">
    <svg viewBox="0 0 120 120" className="h-full w-full">
      <defs>
        <path id="circ" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
      </defs>
      <text fontSize="9.5" className="fill-deep font-sans uppercase" style={{ fontWeight: 500 }}>
        <textPath href="#circ" textLength="284" lengthAdjust="spacing">Escuta · Cuidado · Acolhimento · Equilíbrio ·</textPath>
      </text>
    </svg>
  </div>
);

// Anel de progresso no canto: mostra quanto da página foi percorrido e "respira".
const ScrollRing = () => {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <div className="fixed bottom-8 left-8 z-[60] hidden md:block" aria-hidden="true">
      <div className="relative flex h-14 w-14 items-center justify-center">
        <svg viewBox="0 0 56 56" className="absolute inset-0 -rotate-90">
          <circle cx="28" cy="28" r="25" fill="none" stroke="rgba(31,46,39,0.12)" strokeWidth="1.5" />
          <motion.circle cx="28" cy="28" r="25" fill="none" stroke="#B8924A" strokeWidth="2" strokeLinecap="round" style={{ pathLength }} />
        </svg>
        <span style={{ '--s0': 0.7, '--s1': 1.15, '--o0': 0.5, '--o1': 1 }} className="orb-pulse h-3 w-3 rounded-full bg-gold" />
      </div>
    </div>
  );
};

// Barra de ação fixa no celular, aparece depois de rolar um pouco.
const MobileBar = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          className="fixed bottom-6 left-4 right-28 z-50 flex items-center justify-center gap-3 rounded-full bg-deep px-6 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-cream shadow-[0_15px_40px_-10px_rgba(31,46,39,0.6)] md:hidden"
        >
          Agendar consulta
        </motion.a>
      )}
    </AnimatePresence>
  );
};

// ── Navegação ─────────────────────────────────────────

const links = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Atuação', href: '#atuacao' },
  { label: 'Método', href: '#metodologia' },
  { label: 'Online', href: '#online' },
  { label: 'Dúvidas', href: '#duvidas' },
];

const FloatingNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease }}
      className="fixed top-4 md:top-6 left-0 right-0 z-50 px-4"
    >
      <div className={`mx-auto transition-all duration-700 ${scrolled ? 'max-w-4xl' : 'max-w-6xl'}`}>
        <div
          className={`flex items-center justify-between rounded-full px-5 md:px-7 py-3 transition-all duration-700 ${
            scrolled || open
              ? 'bg-cream/90 backdrop-blur-md border border-gold/25 shadow-[0_10px_40px_-15px_rgba(31,46,39,0.25)]'
              : 'border border-transparent'
          }`}
        >
          <a href="#top" className="flex items-center gap-3">
            <img src={Logo} alt="Logo Dra. Ana Flávia" className="w-9 h-9 rounded-full object-cover ring-1 ring-gold/50" />
            <span className="font-display text-xl font-medium text-deep tracking-wide">Dra. Ana Flávia</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-[11px] uppercase tracking-[0.22em] text-deep/60 hover:text-gold transition-colors duration-300">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block rounded-full bg-deep px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-cream hover:bg-gold transition-colors duration-500"
            >
              Agendar
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              aria-expanded={open}
              className="md:hidden flex flex-col gap-1.5 p-2"
            >
              <span className={`block h-px w-6 bg-deep transition-all duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`block h-px w-6 bg-deep transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-px w-6 bg-deep transition-all duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-3 rounded-3xl bg-cream/95 border border-gold/25 p-6 flex flex-col shadow-xl"
            >
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl text-deep py-3 border-b border-deep/10"
                >
                  {l.label}
                </a>
              ))}
              <CTA className="mt-6">Agendar consulta</CTA>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

// ── Accordion (FAQ) ───────────────────────────────────

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-deep/12">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="group w-full py-7 md:py-9 flex items-center gap-5 md:gap-10 text-left"
      >
        <span className="font-display text-2xl md:text-4xl flex-1 text-deep group-hover:text-gold transition-colors duration-500">
          {title}
        </span>
        <span className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${isOpen ? 'bg-deep border-deep' : 'border-deep/25 group-hover:border-gold'}`}>
          <span className={`absolute h-px w-4 ${isOpen ? 'bg-cream' : 'bg-deep'}`} />
          <span className={`absolute h-4 w-px bg-deep transition-transform duration-500 ${isOpen ? 'scale-y-0' : ''}`} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="overflow-hidden"
          >
            <p className="pb-9 text-base md:text-lg font-light leading-relaxed max-w-3xl text-deep/70">{children}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── App ───────────────────────────────────────────────

const credentials = ['Medicina', 'Pós-graduação em Psiquiatria', 'Saúde Mental', 'Telemedicina', 'Belo Horizonte', 'Acolhimento Integral'];

const METHOD_STEPS = [
  ['01', 'Escuta Empática', 'Primeiro contato dedicado a conhecer a sua história de vida, o contexto atual e as principais queixas, de forma detalhada e sem julgamentos.'],
  ['02', 'Plano Terapêutico', 'Definição clara de caminhos terapêuticos, orientações práticas e manejo farmacológico quando necessário, para a melhora da sua qualidade de vida.'],
  ['03', 'Acompanhamento', 'Suporte médico contínuo para monitorar a sua evolução, ajustar condutas e garantir que o tratamento permaneça eficaz e confortável.'],
];

const App = () => {
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 700], [0, 60]);

  // A abertura em cortina aparece só na primeira visita da sessão.
  const [intro] = useState(() => {
    if (window.location.search.includes('skipintro')) return false;
    try { return !sessionStorage.getItem('intro-seen'); } catch { return true; }
  });
  const t = intro ? INTRO_MS / 1000 - 0.3 : 0;

  // Inclinação 3D do retrato conforme o mouse.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 20 });
  const heroRef = useRef(null);
  const onHeroMove = (e) => {
    const r = heroRef.current.getBoundingClientRect();
    tiltX.set((e.clientX - r.left) / r.width - 0.5);
    tiltY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onHeroLeave = () => { tiltX.set(0); tiltY.set(0); };

  return (
    <div id="top" className="relative min-h-screen text-deep font-sans overflow-x-clip">
      {intro && <Preloader />}
      <BreathingField />
      <ScrollRing />
      <CursorGlow />
      <div className="grain" />
      <FloatingButtons />
      <MobileBar />
      <FloatingNav />

      <main className="relative z-10">
        {/* 1. HERO */}
        <section ref={heroRef} onMouseMove={onHeroMove} onMouseLeave={onHeroLeave} className="relative">
          <div className="relative mx-auto max-w-6xl px-6 pt-32 md:pt-36 pb-20 md:pb-28 grid lg:grid-cols-12 gap-10 lg:gap-6 items-center min-h-screen">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: t + 0.2 }}>
                <Eyebrow>Medicina · Saúde Mental</Eyebrow>
              </motion.div>

              <h1 className="mt-6">
                {/* A palavra "inspira": o espaçamento entre as letras se expande */}
                <motion.span
                  initial={{ opacity: 0, letterSpacing: '-0.07em', filter: 'blur(14px)' }}
                  animate={{ opacity: 1, letterSpacing: '0.005em', filter: 'blur(0px)' }}
                  transition={{ duration: 2.4, delay: t + 0.2, ease }}
                  className="block font-display italic text-gold-gradient text-[5.2rem] sm:text-[8rem] lg:text-[10.5rem] leading-[0.95] pb-2"
                >
                  Respire.
                </motion.span>
                <span className="block overflow-hidden mt-4">
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, delay: t + 1.1, ease }}
                    className="block font-display text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.1] text-deep"
                  >
                    Cuidar da mente é um ato de coragem.
                  </motion.span>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: t + 1.5, ease }}
                className="mt-8 max-w-md text-lg font-light leading-relaxed text-deep/70"
              >
                Medicina baseada em evidências e acolhimento humano, com atendimento presencial em Belo Horizonte e online.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: t + 1.65, ease }}
                className="mt-10 flex flex-col sm:flex-row gap-4"
              >
                <CTA>Agendar consulta</CTA>
                <CTA href="#sobre" variant="ghost">Conheça a Dra. Ana</CTA>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, delay: t + 0.4, ease }}
              style={{ rotateX, rotateY, transformPerspective: 1100 }}
              className="lg:col-span-5 order-1 lg:order-2 relative mx-auto w-full max-w-sm lg:max-w-none"
            >
              <motion.div style={{ y: photoY }} className="relative aspect-[3/4]">
                <img src={RetratoImg} alt="Dra. Ana Flávia Ribeiro, médica" className="absolute inset-0 h-full w-full object-cover object-top" fetchPriority="high" />
              </motion.div>
              <div className="absolute bottom-2 left-0 md:-left-6 bg-cream border border-gold/40 px-6 py-4 shadow-xl">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#8A6A2E]">CRM-MG</p>
                <p className="font-display text-3xl text-deep leading-none mt-1">104082</p>
              </div>
              <div className="absolute -top-4 right-0 md:-right-8 flex items-center justify-center rounded-full bg-cream shadow-lg ring-1 ring-gold/40">
                <SpinBadge />
                <span className="absolute text-gold text-xl">◆</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. FAIXA */}
        <div className="relative border-y border-gold/25 bg-cream/60 py-6 overflow-hidden">
          <div className="marquee-track flex w-max">
            {[...credentials, ...credentials, ...credentials, ...credentials].map((c, i) => (
              <span key={i} className="flex items-center whitespace-nowrap font-display text-2xl italic text-deep/70">
                <span className="px-10">{c}</span>
                <span className="text-gold text-sm">◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* 3. SOBRE */}
        <section id="sobre" className="relative py-28 md:py-40">
          <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-12 gap-14 lg:gap-20 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <Reveal><Eyebrow>Sobre</Eyebrow></Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display mt-6 text-5xl md:text-7xl leading-[1] tracking-tight">
                  Dra. Ana Flávia <span className="italic text-gold-gradient">Ribeiro</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2} className="mt-10 space-y-6 text-lg font-light leading-relaxed text-deep/75 max-w-xl">
                <p>Médica generalista, com pós-graduação em Psiquiatria em andamento. Minha atuação é inteiramente dedicada à saúde mental, centrada em acolhimento integral, escuta empática e acompanhamento contínuo.</p>
                <p>Ofereço suporte especializado para transtornos de humor, ansiedade e esgotamento profissional, sempre com um olhar atento à individualidade de cada paciente.</p>
              </Reveal>
              <Reveal delay={0.3} className="mt-12 grid sm:grid-cols-2 gap-px bg-deep/10 border border-deep/10 max-w-xl">
                {[
                  ['Visão Integrativa', 'Tratamentos que consideram o equilíbrio clínico e mental.'],
                  ['Acolhimento', 'Um ambiente seguro e ético para o seu desenvolvimento.'],
                ].map(([title, d]) => (
                  <div key={title} className="bg-cream/80 p-7">
                    <h3 className="font-display text-2xl mb-2">{title}</h3>
                    <p className="text-sm font-light text-deep/65 leading-relaxed">{d}</p>
                  </div>
                ))}
              </Reveal>
            </div>

            <Reveal className="lg:col-span-6 order-1 lg:order-2 relative">
              <ImageReveal
                src={SobreImg}
                alt="Dra. Ana Flávia Ribeiro sentada em poltrona"
                className="aspect-[4/5] bg-sand shadow-[0_30px_60px_-30px_rgba(31,46,39,0.35)]"
              />
              <div className="absolute -top-4 -right-4 h-28 w-28 border-t border-r border-gold hidden md:block" />
              <div className="absolute -bottom-4 -left-4 h-28 w-28 border-b border-l border-gold hidden md:block" />
            </Reveal>
          </div>
        </section>

        {/* 4. CITAÇÃO */}
        <section id="filosofia" className="relative py-28 md:py-44 overflow-hidden">
          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <Eyebrow className="justify-center">Filosofia de cuidado</Eyebrow>
            <span aria-hidden="true" className="mt-10 block font-display text-[7rem] italic leading-[0.6] text-gold">“</span>
            <ScrollWords
              text="O acompanhamento em saúde mental é um espaço seguro para compreender suas emoções e construir _ferramentas _sólidas para uma vida equilibrada."
              className="mt-2 font-display text-3xl md:text-5xl lg:text-[3.4rem] leading-[1.25] font-normal text-deep text-balance"
            />
            <div className="hairline mx-auto mt-14 w-40" />
          </div>
        </section>

        {/* 5. ATUAÇÃO (rolagem horizontal no desktop) */}
        <HorizontalAreas />

        {/* 6. METODOLOGIA */}
        <section id="metodologia" className="relative py-28 md:py-40">
          <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-12 gap-14">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Reveal>
                  <Eyebrow>Método</Eyebrow>
                  <h2 className="font-display mt-6 text-5xl md:text-7xl leading-[1] tracking-tight">
                    Metodologia <span className="italic text-gold-gradient">de cuidado</span>
                  </h2>
                  <p className="mt-8 text-lg font-light leading-relaxed text-deep/75 max-w-sm">
                    Uma prática médica fundamentada na escuta atenta, na responsabilidade técnica e no acompanhamento contínuo da sua evolução.
                  </p>
                </Reveal>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ThreadSteps steps={METHOD_STEPS} />
            </div>
          </div>
        </section>

        {/* 7. ATENDIMENTO ONLINE */}
        <section id="online" className="relative py-28 md:py-40 overflow-hidden">
          <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-12 gap-14 lg:gap-20 items-center">
            <Reveal className="lg:col-span-5 relative">
              <ImageReveal
                src={OnlineImg}
                alt="Dra. Ana Flávia em atendimento online"
                imgClass="object-top"
                className="aspect-[4/5] rounded-t-[999px] rounded-b-[2px] bg-sand shadow-[0_30px_60px_-30px_rgba(31,46,39,0.35)]"
              />
            </Reveal>
            <div className="lg:col-span-7">
              <Reveal><Eyebrow>Atendimento online</Eyebrow></Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display mt-6 text-5xl md:text-7xl leading-[1] tracking-tight">
                  Cuidado de qualidade, <span className="italic text-gold-gradient">onde você estiver.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2} className="mt-8 text-lg font-light leading-relaxed text-deep/75 max-w-xl">
                <p>Consultas por vídeo, com o mesmo rigor ético, pontualidade e acolhimento do presencial, em plataformas seguras e seguindo as normas do Conselho Federal de Medicina.</p>
              </Reveal>
              <Reveal delay={0.3} className="mt-10 grid sm:grid-cols-3 gap-6 max-w-xl">
                {[['Sem deslocamento', 'Atenda de casa'], ['Plataforma segura', 'Sigilo médico'], ['Mesmo cuidado', 'Do presencial']].map(([title, d]) => (
                  <div key={title} className="border-t border-gold pt-4">
                    <p className="font-display text-2xl leading-tight">{title}</p>
                    <p className="text-sm font-light text-deep/65 mt-1">{d}</p>
                  </div>
                ))}
              </Reveal>
              <Reveal delay={0.4} className="mt-12">
                <CTA>Agendar online</CTA>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 8. GALERIA (aparece quando houver fotos em src/assets/gallery) */}
        <Gallery />

        {/* 9. RESPIRE (imersivo: o fundo da página respira junto) */}
        <section id="respire" className="relative flex min-h-screen items-center py-24">
          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <Reveal>
              <Eyebrow className="justify-center">Uma pausa</Eyebrow>
              <h2 className="font-display mt-6 text-5xl md:text-7xl leading-[1] tracking-tight">
                Antes de continuar, <span className="italic text-gold-gradient">respire.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-md text-lg font-light leading-relaxed text-deep/75">
                Um minuto só para você. Acompanhe o ritmo do círculo e sinta a página respirar junto.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-10">
              <Breathe />
            </Reveal>
          </div>
        </section>

        {/* 10. FAQ */}
        <section id="duvidas" className="relative py-28 md:py-40">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal className="mb-16 text-center">
              <Eyebrow className="justify-center">Dúvidas</Eyebrow>
              <h2 className="font-display mt-6 text-5xl md:text-6xl tracking-tight">
                Perguntas <span className="italic text-gold-gradient">frequentes</span>
              </h2>
            </Reveal>
            <div className="border-t border-deep/12">
              <Accordion title="Como funciona o atendimento médico em saúde mental?">
                É uma consulta médica focada na sua saúde emocional. Avaliamos sintomas físicos e mentais para propor um plano de cuidado integral, com protocolos modernos e uma abordagem profundamente humana.
              </Accordion>
              <Accordion title="Quanto tempo dura a primeira consulta?">
                A consulta inicial é extensa e meticulosa (cerca de 60 minutos), permitindo uma compreensão profunda do seu histórico familiar, de vida e de suas necessidades atuais, sem pressa.
              </Accordion>
              <Accordion title="O atendimento online é seguro e eficaz?">
                Sim. Utilizamos plataformas seguras e éticas, seguindo as normas do Conselho Federal de Medicina. A telemedicina tem demonstrado eficácia clínica comparável ao atendimento presencial em psiquiatria.
              </Accordion>
            </div>
          </div>
        </section>

        {/* 11. CTA FINAL + FOOTER */}
        <footer className="relative overflow-hidden pt-28 md:pt-40 pb-24 md:pb-10">
          <div className="relative mx-auto max-w-6xl px-6">
            <Reveal className="text-center max-w-4xl mx-auto">
              <Eyebrow className="justify-center">Primeiro passo</Eyebrow>
              <h2 className="font-display mt-8 text-6xl md:text-8xl leading-[0.98] tracking-tight">
                Pronto para encontrar o seu <span className="italic text-gold-gradient">equilíbrio?</span>
              </h2>
              <div className="mt-12">
                <CTA>Agendar consulta</CTA>
              </div>
            </Reveal>

            <div className="hairline mt-28 mb-14" />

            <div className="grid md:grid-cols-3 gap-10 items-start">
              <div className="flex items-center gap-4">
                <img src={Logo} alt="Logo" className="h-14 w-14 rounded-full object-cover ring-1 ring-gold/50" />
                <div>
                  <p className="font-display text-2xl">Dra. Ana Flávia Ribeiro</p>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#8A6A2E]">Saúde Mental</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-deep/50 mb-3">Contato</p>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="font-display text-3xl hover:text-gold transition-colors">(31) 99444-2774</a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-deep/50 mb-3">Instagram</p>
                <a href="https://www.instagram.com/dra.ana.ribeiro" target="_blank" rel="noopener noreferrer" className="font-display text-3xl hover:text-gold transition-colors">@dra.ana.ribeiro</a>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-deep/10 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-deep/50">
              <p>© {new Date().getFullYear()} · Dra. Ana Flávia Ribeiro · CRM-MG 104082</p>
              <p>Design por Raphael Yankous</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
