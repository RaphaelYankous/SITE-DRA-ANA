import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingButtons } from './components/FloatingButtons';

import Logo from './assets/84f47818-c213-4df3-a772-571c6b4f176c.jfif';
import AbstractImg from './assets/mental_health_abstract.png';
import SobreImg from './assets/IMG_8886.JPG';
import AbordagemImg from './assets/IMG_8843.JPG';

// ── Icons ──────────────────────────────────────────────
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);
const WASmall = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L0 24l6.335-1.507A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.37l-.359-.214-3.721.886.915-3.62-.234-.372A9.818 9.818 0 012.182 12c0-5.42 4.398-9.818 9.818-9.818 5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/>
  </svg>
);

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
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${scrolled ? 'w-[90%] max-w-2xl' : 'w-full max-w-4xl px-6'}`}
    >
      <div className={`flex items-center justify-between px-6 py-4 rounded-full transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-2xl shadow-black/5 border border-white/50' : 'bg-transparent'}`}>
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Logo" className="w-8 h-8 rounded-full border border-[#C5A059]/30" />
          <span className="font-bold text-sm tracking-tight text-slate-800">Dra. Ana Flávia</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[13px] font-bold text-slate-500 uppercase tracking-widest">
          <a href="#sobre" className="hover:text-[#C5A059] transition-colors">Sobre</a>
          <a href="#atuacao" className="hover:text-[#C5A059] transition-colors">Atuação</a>
          <a href="#metodologia" className="hover:text-[#C5A059] transition-colors">Metodologia</a>
        </div>
        <a href="https://wa.me/553199442774" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#C5A059] transition-all">
          Agendar
        </a>
      </div>
    </motion.div>
  );
};

const ExpandingRow = ({ title, text }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
      className="border-b border-slate-200 py-10 relative overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-[#C5A059] transition-transform duration-500 ease-out origin-left ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}></div>
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 px-6">
        <h3 className={`text-4xl md:text-5xl font-bold tracking-tighter transition-colors duration-300 ${isHovered ? 'text-white' : 'text-slate-900'}`}>
          {title}
        </h3>
        <p className={`md:w-1/2 text-lg font-light leading-relaxed transition-colors duration-300 ${isHovered ? 'text-white/90' : 'text-slate-500'}`}>
          {text}
        </p>
      </div>
    </div>
  );
}

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0 group">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-8 flex justify-between items-center text-left hover:text-[#C5A059] transition-colors">
        <span className="font-bold text-slate-900 text-xl tracking-tight">{title}</span>
        <span className="text-3xl font-light text-slate-400 group-hover:text-[#C5A059] transition-colors">{isOpen ? '−' : '+'}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-8 text-slate-500 text-[17px] font-light leading-relaxed">{children}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── App ───────────────────────────────────────────────
const App = () => (
  <div className="min-h-screen bg-[#F7FBF9] text-slate-800 font-sans selection:bg-[#C5A059]/20">
    <FloatingButtons />
    <FloatingNav />

    {/* 1. IMMERSIVE HERO */}
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 mesh-bg overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C5A059]/10 rounded-full blur-[120px] -z-10"></div>
      
      <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white/60 rounded-full px-5 py-2 shadow-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">Médica Psiquiatra · CRM MG 104082</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.1 }}
          className="text-[12vw] sm:text-7xl lg:text-9xl font-bold text-slate-900 tracking-tighter leading-[0.85] uppercase mb-12"
        >
          Cuidar da <span className="text-[#C5A059] block mt-2">Mente</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative w-full max-w-md md:max-w-2xl aspect-[4/5] md:aspect-[16/10] rounded-[40px] md:rounded-[80px] overflow-hidden shadow-2xl shadow-[#435C50]/20 border-4 border-white mx-auto mt-4"
        >
          <img src={AbstractImg} alt="Elementos de Saúde Mental" className="w-full h-full object-cover object-center scale-105" />
          
          {/* Glass floating card inside hero image */}
          <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-[90%] md:w-auto bg-black/10 backdrop-blur-xl border border-white/30 p-6 md:p-8 rounded-3xl text-left shadow-2xl">
            <p className="text-white font-medium text-lg md:text-xl tracking-tight leading-relaxed text-shadow-sm">
              "Integrando ciência e acolhimento para transformar a sua vida e equilibrar o seu bem-estar emocional."
            </p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* 2. INFINITE MARQUEE */}
    <div className="bg-[#435C50] text-[#C5A059] py-6 overflow-hidden flex whitespace-nowrap border-y border-[#C5A059]/20">
      <div className="animate-marquee flex items-center text-2xl md:text-4xl font-bold tracking-tighter uppercase">
        <span className="mx-8">✦</span> Acolhimento Humano <span className="mx-8">✦</span> Medicina Integrativa <span className="mx-8">✦</span> Saúde Mental Plena <span className="mx-8">✦</span> Ética e Sigilo <span className="mx-8">✦</span>
        <span className="mx-8">✦</span> Acolhimento Humano <span className="mx-8">✦</span> Medicina Integrativa <span className="mx-8">✦</span> Saúde Mental Plena <span className="mx-8">✦</span> Ética e Sigilo <span className="mx-8">✦</span>
      </div>
    </div>

    {/* 3. THE BENTO GRID (SOBRE + DIFERENCIAIS) */}
    <section id="sobre" className="py-32 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="mb-20 text-center">
          <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter text-slate-900">Sobre Mim</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* Large Image Block */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-5 md:row-span-2 rounded-[40px] overflow-hidden relative shadow-xl">
            <img src={SobreImg} alt="Dra. Ana Flávia" className="w-full h-full object-cover absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="text-3xl font-bold tracking-tighter mb-2">Dra. Ana Flávia Ribeiro</h3>
              <p className="font-light text-white/80">Médica com foco em Psiquiatria</p>
            </div>
          </motion.div>

          {/* Big Text Block */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="md:col-span-7 bg-[#F7FBF9] rounded-[40px] p-10 md:p-14 border border-slate-100 flex flex-col justify-center">
            <h4 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">O compromisso com a sua saúde plena.</h4>
            <div className="space-y-4 text-[16px] text-slate-600 font-light leading-relaxed">
              <p>Sou Médica generalista, com pós-graduação em Psiquiatria em andamento, dedicada à saúde mental, centrada no acolhimento integral, escuta empática e acompanhamento contínuo.</p>
              <p>Minha missão é construir um espaço seguro para que cada pessoa compreenda suas emoções e desenvolva ferramentas sólidas para uma vida equilibrada. Ofereço suporte especializado para transtornos de humor, ansiedade e esgotamento profissional.</p>
              <p>Acredito que o acompanhamento de saúde mental é uma ferramenta poderosa para transformar vidas.</p>
            </div>
          </motion.div>

          {/* Feature 1 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="md:col-span-4 bg-[#132A23] rounded-[40px] p-10 text-white flex flex-col justify-between">
            <div className="w-12 h-12 rounded-full bg-[#C5A059]/20 flex items-center justify-center mb-8">
              <span className="text-[#C5A059] text-xl">✦</span>
            </div>
            <div>
              <h5 className="text-2xl font-bold tracking-tight mb-2">Visão Integrativa</h5>
              <p className="font-light text-white/60 text-sm">Tratamentos que consideram o equilíbrio clínico e o bem-estar mental em conjunto.</p>
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="md:col-span-3 bg-[#C5A059] rounded-[40px] p-10 text-white flex flex-col justify-center items-center text-center">
            <p className="text-6xl font-bold tracking-tighter mb-2">100+</p>
            <p className="font-bold uppercase tracking-widest text-xs text-white/80">Pacientes Atendidos</p>
          </motion.div>

        </div>
      </div>
    </section>

    {/* 4. ÁREAS DE ATUAÇÃO (HOVER ACCORDION) */}
    <section id="atuacao" className="py-40 bg-[#F7FBF9]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-24 md:flex justify-between items-end">
          <div className="max-w-2xl">
            <h2 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tighter">Áreas de<br/>Atuação</h2>
          </div>
          <p className="text-slate-500 font-light text-xl max-w-sm mt-6 md:mt-0 pb-4">
            Suporte clínico personalizado e focado no manejo do seu bem-estar mental.
          </p>
        </div>

        <div className="border-t border-slate-200">
          <ExpandingRow 
            title="Manejo da Ansiedade" 
            text="Cuidado focado na compreensão profunda dos sintomas e na busca por estratégias práticas de alívio e controle emocional no dia a dia." 
          />
          <ExpandingRow 
            title="Suporte ao Humor" 
            text="Acompanhamento clínico especializado para quadros de desânimo, depressão e instabilidade, visando a recuperação total da sua funcionalidade." 
          />
          <ExpandingRow 
            title="Equilíbrio & Burnout" 
            text="Orientação médica direcionada para lidar com o esgotamento mental e o estresse crônico gerado pelo ambiente de trabalho contemporâneo." 
          />
          <ExpandingRow 
            title="Telemedicina" 
            text="Atendimento online de excelência, com foco em acessibilidade e conforto, mantendo o mesmo rigor ético e acolhimento do presencial." 
          />
        </div>
      </div>
    </section>

    {/* 5. METODOLOGIA DARK */}
    <section id="metodologia" className="py-40 bg-[#435C50] text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 sticky top-32">
            <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-8">Nossa<br/><span className="text-[#C5A059]">Metodologia</span></h2>
            <p className="text-lg text-white/80 font-light leading-relaxed">
              Uma prática médica fundamentada na escuta empática, responsabilidade técnica e no acompanhamento contínuo da sua evolução.
            </p>
          </div>
          <div className="lg:col-span-7 space-y-16">
            
            <div className="flex gap-8 md:gap-12 group">
              <span className="text-6xl md:text-8xl font-bold tracking-tighter text-[#2C4239] group-hover:text-[#C5A059] transition-colors duration-500">01</span>
              <div className="pt-4">
                <h3 className="text-3xl font-bold tracking-tight mb-4">Escuta & Acolhimento</h3>
                <p className="text-lg text-white/70 font-light leading-relaxed">Primeiro contato dedicado inteiramente a conhecer a sua história de vida, contexto atual e principais queixas físicas e emocionais.</p>
              </div>
            </div>

            <div className="flex gap-8 md:gap-12 group">
              <span className="text-6xl md:text-8xl font-bold tracking-tighter text-[#2C4239] group-hover:text-[#C5A059] transition-colors duration-500">02</span>
              <div className="pt-4">
                <h3 className="text-3xl font-bold tracking-tight mb-4">Plano de Cuidado</h3>
                <p className="text-lg text-white/70 font-light leading-relaxed">Definição clara de caminhos terapêuticos e orientações práticas para a melhora contínua da sua qualidade de vida e funcionalidade.</p>
              </div>
            </div>

            <div className="flex gap-8 md:gap-12 group">
              <span className="text-6xl md:text-8xl font-bold tracking-tighter text-[#2C4239] group-hover:text-[#C5A059] transition-colors duration-500">03</span>
              <div className="pt-4">
                <h3 className="text-3xl font-bold tracking-tight mb-4">Acompanhamento</h3>
                <p className="text-lg text-white/70 font-light leading-relaxed">Suporte médico assistido e contínuo para monitorar a sua evolução, ajustar condutas e garantir o seu bem-estar a longo prazo.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    {/* 6. DÚVIDAS */}
    <section className="py-40 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold tracking-tighter text-slate-900">Perguntas Frequentes</h2>
        </div>
        <div>
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
    <footer className="pt-32 pb-10 bg-[#435C50] text-white overflow-hidden relative">
      {/* Big BG Text */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full text-center opacity-[0.02] pointer-events-none select-none">
        <h1 className="text-[25vw] font-bold tracking-tighter leading-none whitespace-nowrap">DRA. ANA FLÁVIA</h1>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
          
          <div>
            <h2 className="text-5xl font-bold tracking-tighter mb-8">Pronto para encontrar<br/>o seu <span className="text-[#C5A059]">equilíbrio?</span></h2>
            <a href="https://wa.me/553199442774" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-[#C5A059] hover:text-white transition-colors duration-300">
              Agendar Consulta Agora
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          </div>

          <div className="flex flex-col md:items-end space-y-8">
            <img src={Logo} alt="Logo" className="h-24 w-24 rounded-full border border-[#C5A059]/40 shadow-2xl" />
            <div className="text-left md:text-right">
              <p className="text-2xl font-bold tracking-tight mb-2">(31) 99444-2774</p>
              <a href="https://www.instagram.com/dra.ana.ribeiro" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#C5A059] transition-colors">@dra.ana.ribeiro</a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold tracking-widest text-white/30 uppercase">
          <p>© {new Date().getFullYear()} CRM MG 104082.</p>
          <p>Design por Raphael Yankous</p>
        </div>
      </div>
    </footer>
  </div>
);

export default App;