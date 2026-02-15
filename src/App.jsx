import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Imagens em src/assets/
import Logo from './assets/84f47818-c213-4df3-a772-571c6b4f176c.jfif'; 
import HeroImg from './assets/IMG_8723.jpg'; 
import SobreImg from './assets/IMG_8886.jpg';
import AbordagemImg from './assets/IMG_8843.jpg';

const App = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-800 font-sans selection:bg-[#C5A059]/20 scroll-smooth">
      
      {/* HEADER ESTRUTURADO */}
      <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#D1E8E2]">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center text-left">
          <div className="flex items-center gap-4">
            <img src={Logo} alt="Logo" className="h-14 w-14 rounded-full border border-[#C5A059]/20" />
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-slate-900 tracking-tight leading-none">Dra. Ana Flávia Ribeiro</span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A059] font-bold mt-1">Psiquiatria & Saúde Mental</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-10 text-[11px] uppercase tracking-widest font-bold text-slate-500">
            {['Sobre', 'Tratamentos', 'Metodologia', 'Dúvidas', 'Contato'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#C5A059] transition-all underline-offset-8 hover:underline">{item}</a>
            ))}
            <a href="https://wa.me/553199442774" target="_blank" className="bg-[#C5A059] text-white px-8 py-3 rounded-full hover:bg-slate-900 transition-all shadow-lg shadow-[#C5A059]/20">
              Agendar Consulta
            </a>
          </div>
        </nav>
      </header>

      {/* 1. HERO - IMPACTO TÉCNICO */}
      <section id="inicio" className="relative pt-52 pb-32 overflow-hidden bg-gradient-to-br from-[#D1E8E2]/30 to-white">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} className="lg:w-1/2 space-y-10 text-left">
            <h1 className="text-6xl lg:text-7xl font-serif text-slate-900 leading-[1.1] tracking-tighter">
              Cuidar da mente é <br /> 
              <span className="text-[#C5A059] italic font-light">transformar a vida.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-lg leading-relaxed font-light border-l-4 border-[#C5A059] pl-8">
              Psiquiatria humanizada pautada pelo rigor científico e pelo acolhimento necessário para sua jornada de equilíbrio emocional em Belo Horizonte e online.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <a href="https://wa.me/553199442774" className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold shadow-2xl hover:bg-[#C5A059] transition-all">
                Iniciar Tratamento
              </a>
              <div className="flex items-center gap-4 px-6 py-4 bg-white/50 rounded-2xl border border-white">
                <div className="h-3 w-3 bg-[#C5A059] rounded-full animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-600">Atendimento disponível</span>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="lg:w-1/2 relative">
            <img src={HeroImg} alt="Dra Ana Flávia" className="rounded-[60px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border-[15px] border-white w-full" />
            <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-3xl shadow-xl max-w-xs border-b-8 border-[#C5A059] hidden md:block">
               <p className="text-slate-500 italic font-serif text-lg leading-relaxed">"Saúde mental é equilíbrio, não a ausência de desafios."</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. DIFERENCIAIS CLÍNICOS (Conteúdo de Valor) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 text-left">
          <Feature title="Medicina Baseada em Evidências" text="Protocolos clínicos fundamentados nos mais recentes estudos da neurociência mundial." />
          <Feature title="Abordagem Integrativa" text="Visão holística que considera fatores biológicos, psicológicos e sociais do paciente." />
          <Feature title="Sigilo e Ética Médica" text="Acompanhamento assistido com total privacidade e profissionalismo inegociável." />
        </div>
      </section>

      {/* 3. SOBRE - NARRATIVA PROFISSIONAL */}
      <section id="sobre" className="py-40 bg-[#D1E8E2]/10">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1">
             <img src={SobreImg} alt="Dra Ana" className="rounded-[40px] shadow-2xl border-l-[15px] border-[#C5A059]" />
          </div>
          <div className="space-y-8 text-left order-1 lg:order-2">
            <h2 className="text-4xl lg:text-5xl font-serif text-slate-900 leading-tight">Dra. Ana Flávia Ribeiro</h2>
            <p className="text-lg text-slate-600 leading-relaxed italic">
              "Sou médica dedicada à saúde mental, com atuação centrada no acolhimento integral, escuta empática e acompanhamento contínuo."
            </p>
            <p className="text-slate-600 leading-relaxed font-light">
              Meu trabalho é construir um espaço seguro, leve e humano para que cada pessoa possa compreender suas emoções e desenvolver ferramentas para uma vida mais equilibrada. Ofereço suporte especializado para transtornos de humor, ansiedade e esgotamento profissional.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
               <div className="border-t border-[#C5A059] pt-4"><p className="text-2xl font-serif text-slate-900">+500</p><p className="text-[10px] uppercase font-bold text-slate-400">Pacientes Acolhidos</p></div>
               <div className="border-t border-[#C5A059] pt-4"><p className="text-2xl font-serif text-slate-900">100%</p><p className="text-[10px] uppercase font-bold text-slate-400">Compromisso Ético</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRATAMENTOS DETALHADOS */}
      <section id="tratamentos" className="py-40">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-24">
            <h2 className="text-4xl lg:text-5xl font-serif text-slate-900 mb-8 italic">Áreas de Especialidade</h2>
            <p className="text-slate-500 font-light text-xl">Diagnóstico preciso e suporte terapêutico para diversas condições clínicas.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left text-sm leading-relaxed">
            <TreatmentCard title="Ansiedade e Pânico" desc="Controle de crises e manejo de sintomas crônicos para a retomada da sua funcionalidade." />
            <TreatmentCard title="Depressão e Humor" desc="Tratamento clínico focado na remissão de sintomas e estabilidade do humor a longo prazo." />
            <TreatmentCard title="Esgotamento (Burnout)" desc="Apoio especializado para a recuperação do estresse crônico e exaustão emocional." />
            <TreatmentCard title="Acompanhamento Online" desc="Telemedicina segura e ética, proporcionando suporte onde você estiver." />
          </div>
        </div>
      </section>

      {/* 5. METODOLOGIA - A JORNADA (Conteúdo Denso) */}
      <section id="metodologia" className="py-32 bg-[#2D332F] text-white overflow-hidden">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-12 text-left">
            <h2 className="text-4xl font-serif">O que esperar do acompanhamento?</h2>
            <div className="space-y-10">
              <MethodItem num="01" title="Acolhimento Inicial" desc="Escuta qualificada para compreender sua história e necessidades clínicas imediatas." />
              <MethodItem num="02" title="Planejamento Terapêutico" desc="Definição conjunta de metas, intervenções e estilo de vida para o tratamento." />
              <MethodItem num="03" title="Monitoramento Contínuo" desc="Suporte assistido entre consultas para ajustes rápidos e segurança do paciente." />
            </div>
          </div>
          <div className="relative">
             <img src={AbordagemImg} alt="Atendimento" className="rounded-3xl opacity-80 shadow-2xl grayscale" />
          </div>
        </div>
      </section>

      {/* 6. DÚVIDAS FREQUENTES (Accordion) */}
      <section id="duvidas" className="py-40 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-left">
          <h2 className="text-4xl font-serif mb-20 italic text-center">Perguntas Frequentes</h2>
          <div className="space-y-4">
             <Accordion title="Quanto tempo dura a primeira consulta?">
                A consulta inicial é extensa (60 a 90 minutos), focada em uma avaliação completa do seu histórico biológico e emocional.
             </Accordion>
             <Accordion title="O atendimento online é seguro?">
                Sim. Utilizamos plataformas criptografadas autorizadas pelo CFM para garantir total sigilo e proteção dos seus dados.
             </Accordion>
          </div>
        </div>
      </section>

      {/* FOOTER - SÓBRIO */}
      <footer id="contato" className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm space-y-6 text-left">
            <img src={Logo} alt="Logo" className="h-20 w-20 rounded-full border border-[#C5A059]/20 shadow-lg" />
            <p className="text-slate-400 text-sm font-light leading-relaxed italic">Saúde mental pautada na ciência e no acolhimento humano. Dra. Ana Flávia Ribeiro | Belo Horizonte, MG.</p>
          </div>
          <div className="space-y-6 text-left">
            <p className="font-bold text-xs uppercase tracking-[0.3em] text-[#C5A059]">Agendamento Direto</p>
            <a href="tel:+553199442774" className="text-2xl font-serif block text-slate-800 underline decoration-[#C5A059]">(31) 99444-2774</a>
            <a href="https://wa.me/553199442774" className="bg-[#C5A059] text-white px-8 py-3 rounded-xl font-bold inline-block shadow-xl shadow-[#C5A059]/30">WhatsApp</a>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-24 pt-10 border-t border-slate-50 text-[10px] text-slate-400 uppercase tracking-widest text-center font-bold">
          © 2026 Dra. Ana Flávia Ribeiro • CRM MG 000000 • Conteúdo Informativo
        </div>
      </footer>

    </div>
  );
};

// COMPONENTES AUXILIARES
const Feature = ({ title, text }) => (
  <div className="space-y-6">
    <div className="h-1 w-12 bg-[#C5A059]" />
    <h3 className="text-xl font-serif text-slate-900 leading-tight">{title}</h3>
    <p className="text-sm text-slate-500 font-light leading-relaxed italic">{text}</p>
  </div>
);

const TreatmentCard = ({ title, desc }) => (
  <div className="p-12 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:border-[#D1E8E2] transition-all duration-500">
    <h3 className="text-xl font-serif mb-4 text-[#C5A059]">{title}</h3>
    <p className="text-slate-600 font-light">{desc}</p>
  </div>
);

const MethodItem = ({ num, title, desc }) => (
  <div className="flex gap-8 group">
    <p className="text-4xl font-serif text-[#C5A059]/40 group-hover:text-[#C5A059] transition-colors">{num}</p>
    <div>
       <h4 className="text-lg font-bold mb-2">{title}</h4>
       <p className="text-sm text-slate-400 font-light leading-relaxed">{desc}</p>
    </div>
  </div>
);

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-8 flex justify-between items-center text-left hover:text-[#C5A059] transition-colors">
        <span className="font-bold text-slate-700 tracking-tight">{title}</span>
        <span className="text-2xl font-serif text-[#C5A059]">{isOpen ? '−' : '+'}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-8 text-slate-500 leading-relaxed text-sm italic">{children}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;