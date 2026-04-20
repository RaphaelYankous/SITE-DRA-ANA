import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FloatingButtons } from './components/FloatingButtons';

import Logo from './assets/84f47818-c213-4df3-a772-571c6b4f176c.jfif';
import AbstractImg from './assets/mental_health_abstract.png';
import SobreImg from './assets/IMG_8886.JPG';

// ── Components ────────────────────────────────────────

const FloatingNav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${scrolled ? 'w-[90%] max-w-3xl' : 'w-full max-w-5xl px-6'}`}
    >
      <div className={`flex items-center justify-between px-6 py-4 rounded-full transition-all duration-700 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-white/40' : 'bg-transparent'}`}>
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Logo" className="w-8 h-8 rounded-full border border-black/5 shadow-sm" />
          <span className="font-serif font-medium text-sm tracking-wide text-sage-dark">Dra. Ana Flávia</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[12px] font-medium text-sage-dark/60 tracking-widest uppercase">
          <a href="#sobre" className="hover:text-sage-dark transition-colors">Sobre</a>
          <a href="#atuacao" className="hover:text-sage-dark transition-colors">Atuação</a>
          <a href="#metodologia" className="hover:text-sage-dark transition-colors">Metodologia</a>
        </div>
        <a href="https://wa.me/553199442774" className="bg-sage-dark text-white px-6 py-2.5 rounded-full text-xs font-medium tracking-widest uppercase hover:bg-sage transition-all shadow-md hover:shadow-lg">
          Agendar
        </a>
      </div>
    </motion.div>
  );
};

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-black/10 group">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-8 flex justify-between items-center text-left">
        <span className="font-serif text-xl md:text-2xl font-medium tracking-wide group-hover:opacity-70 transition-opacity">{title}</span>
        <span className="text-2xl font-light opacity-50 group-hover:opacity-100 transition-opacity">{isOpen ? '−' : '+'}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-8 opacity-80 text-base md:text-lg font-light leading-relaxed max-w-2xl">{children}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── App ───────────────────────────────────────────────
const App = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="min-h-screen bg-sand text-charcoal font-sans selection:bg-sage/20 relative">
      <div className="noise-overlay"></div>
      <FloatingButtons />
      <FloatingNav />

      {/* 1. IMMERSIVE TEXTURED HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 bg-[#F7FBF9]">
          <img src={AbstractImg} alt="Background" className="w-full h-full object-cover object-center scale-105 opacity-40 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent"></div>
          {/* Subtle noise texture on top */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center max-w-4xl pt-20">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-3 border border-sage/20 rounded-full px-5 py-2 mb-8 backdrop-blur-md bg-white/40 shadow-sm">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-sage-dark">Psiquiatria · CRM MG 104082</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-sage-dark leading-[1.1] mb-6"
          >
            Cuidado com a sua <span className="italic text-sage">Mente</span><br />e o seu bem-estar.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-sage-dark/70 text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-10"
          >
            Integrando medicina baseada em evidências e acolhimento humano para transformar a sua vida.
          </motion.p>

          <motion.a
            href="#sobre"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-sage font-medium tracking-widest uppercase border-b border-sage/30 pb-1 hover:text-sage-dark hover:border-sage-dark transition-colors text-sm"
          >
            Conheça meu trabalho
          </motion.a>

        </motion.div>
      </section>

      {/* 2. STATEMENT */}
      <section className="py-24 bg-sage-light/30 text-sage-dark border-y border-black/5">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-2xl md:text-4xl text-sage-dark leading-relaxed font-normal"
          >
            "O acompanhamento em saúde mental é um espaço seguro para que cada pessoa compreenda suas emoções e desenvolva ferramentas sólidas para uma vida equilibrada."
          </motion.h2>
        </div>
      </section>

      {/* 3. EDITORIAL SOBRE */}
      <section id="sobre" className="py-32 bg-white text-sage-dark">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative rounded-[24px] overflow-hidden aspect-[3/4] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-black/5"
            >
              <img src={SobreImg} alt="Dra. Ana Flávia" className="w-full h-full object-cover absolute inset-0" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h2 className="font-serif text-4xl lg:text-5xl font-normal mb-8">Dra. Ana Flávia Ribeiro</h2>
              <div className="space-y-6 opacity-80 font-light text-lg leading-relaxed mb-10">
                <p>Sou Médica generalista, com pós-graduação em Psiquiatria em andamento. Minha atuação é inteiramente dedicada à saúde mental, centrada em um acolhimento integral, escuta empática e acompanhamento contínuo.</p>
                <p>Ofereço suporte especializado para transtornos de humor, ansiedade e esgotamento profissional, sempre buscando um olhar atento à individualidade de cada paciente.</p>
              </div>

              <div className="grid grid-cols-2 gap-8 border-t border-sage-dark/20 pt-10">
                <div>
                  <h4 className="font-serif text-xl mb-2">Visão Integrativa</h4>
                  <p className="font-light text-sm opacity-60">Tratamentos que consideram o equilíbrio clínico e mental.</p>
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-2">Acolhimento</h4>
                  <p className="font-light text-sm opacity-60">Um ambiente seguro e ético para o seu desenvolvimento.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. ÁREAS DE ATUAÇÃO (MINIMAL ACCORDION) */}
      <section id="atuacao" className="py-32 bg-sand/40 text-sage-dark">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl lg:text-5xl mb-4">Áreas de Atuação</h2>
            <p className="opacity-70 font-light text-lg">Suporte clínico personalizado focado no seu bem-estar mental.</p>
          </div>

          <div className="border-t border-black/10">
            <Accordion title="Manejo da Ansiedade">
              Cuidado focado na compreensão profunda dos sintomas e na busca por estratégias práticas de alívio e controle emocional no dia a dia, respeitando o seu ritmo.
            </Accordion>
            <Accordion title="Suporte ao Humor">
              Acompanhamento clínico especializado para quadros de desânimo, depressão e instabilidade, visando a recuperação total da sua funcionalidade e vontade de viver.
            </Accordion>
            <Accordion title="Equilíbrio & Burnout">
              Orientação médica direcionada para lidar com o esgotamento mental e o estresse crônico gerado pelo ambiente de trabalho contemporâneo e demandas da vida.
            </Accordion>
            <Accordion title="Telemedicina">
              Atendimento online de excelência, com foco em acessibilidade e conforto, mantendo o mesmo rigor ético, pontualidade e acolhimento do presencial.
            </Accordion>
          </div>
        </div>
      </section>

      {/* 5. METODOLOGIA SAGE */}
      <section id="metodologia" className="py-32 bg-white text-sage-dark border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="relative lg:sticky lg:top-32">
              <h2 className="font-serif text-4xl lg:text-5xl mb-6">Metodologia<br /><span className="italic text-sage">de Cuidado</span></h2>
              <p className="text-lg opacity-80 font-light leading-relaxed max-w-sm">
                Uma prática médica fundamentada na escuta atenta, responsabilidade técnica e no acompanhamento contínuo da sua evolução.
              </p>
            </div>

            <div className="space-y-16">
              <div className="flex gap-8 group">
                <span className="font-serif text-4xl text-sage/30">01</span>
                <div>
                  <h3 className="font-serif text-2xl mb-3">Escuta Empática</h3>
                  <p className="text-base opacity-80 font-light leading-relaxed">Primeiro contato dedicado inteiramente a conhecer a sua história de vida, contexto atual e principais queixas de forma detalhada e sem julgamentos.</p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <span className="font-serif text-4xl text-sage/30">02</span>
                <div>
                  <h3 className="font-serif text-2xl mb-3">Plano Terapêutico</h3>
                  <p className="text-base opacity-80 font-light leading-relaxed">Definição clara de caminhos terapêuticos, orientações práticas e manejo farmacológico quando necessário, para a melhora da sua qualidade de vida.</p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <span className="font-serif text-4xl text-sage/30">03</span>
                <div>
                  <h3 className="font-serif text-2xl mb-3">Acompanhamento</h3>
                  <p className="text-base opacity-80 font-light leading-relaxed">Suporte médico assistido e contínuo para monitorar a sua evolução, ajustar condutas e garantir que o tratamento permaneça eficaz e confortável.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DÚVIDAS */}
      <section className="py-32 bg-sand/30 text-sage-dark">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-4xl">Perguntas Frequentes</h2>
          </div>
          <div className="border-t border-black/10">
            <Accordion title="Como funciona o atendimento médico em saúde mental?">
              É uma consulta médica focada na sua saúde emocional. Avaliamos sintomas físicos e mentais para propor um plano de cuidado integral, utilizando protocolos modernos e uma abordagem profundamente humana.
            </Accordion>
            <Accordion title="Quanto tempo dura a primeira consulta?">
              A consulta inicial é extensa e meticulosa (cerca de 60 minutos), permitindo uma compreensão profunda do seu histórico familiar, de vida e de suas necessidades atuais, sem pressa.
            </Accordion>
            <Accordion title="O atendimento online é seguro e eficaz?">
              Absolutamente. Utilizamos plataformas seguras e éticas, conforme rigorosamente as normas do Conselho Federal de Medicina. A telemedicina já provou ter a mesma eficácia clínica que o atendimento presencial na psiquiatria.
            </Accordion>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="pt-24 pb-10 bg-sand text-sage-dark border-t border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20 items-center">

            <div>
              <h2 className="font-serif text-4xl mb-6">Pronto para encontrar<br />o seu <span className="italic text-sage">equilíbrio?</span></h2>
              <a href="https://wa.me/553199442774" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-sage-dark text-white px-8 py-4 rounded-full text-sm font-medium tracking-widest uppercase hover:bg-sage transition-colors duration-300 shadow-md">
                Agendar Consulta
              </a>
            </div>

            <div className="flex flex-col md:items-end space-y-6">
              <img src={Logo} alt="Logo" className="h-20 w-20 rounded-full border border-black/5 shadow-sm" />
              <div className="text-left md:text-right">
                <p className="font-serif text-2xl mb-1 text-sage-dark">(31) 99444-2774</p>
                <a href="https://www.instagram.com/dra.ana.ribeiro" target="_blank" rel="noopener noreferrer" className="opacity-70 font-light hover:opacity-100 transition-opacity text-sage-dark">@dra.ana.ribeiro</a>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-medium tracking-widest opacity-60 uppercase text-sage-dark">
            <p>© {new Date().getFullYear()} CRM MG 104082. Todos os direitos reservados.</p>
            <p>Design por Raphael Yankous</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;