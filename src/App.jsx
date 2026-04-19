import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { FloatingButtons } from './components/FloatingButtons';
import { Testimonials } from './components/Testimonials';

import Logo from './assets/84f47818-c213-4df3-a772-571c6b4f176c.jfif';
import HeroImg from './assets/IMG_8723.JPG';
import SobreImg from './assets/IMG_8886.JPG';
import AbordagemImg from './assets/IMG_8843.JPG';

// ── Icons ──────────────────────────────────────────────
const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
const IntegrativeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
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

// ── Sub-components ────────────────────────────────────
const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

const Feature = ({ icon, title, text }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4 text-center">
    <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-slate-100 flex items-center justify-center">{icon}</div>
    <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">{title}</h3>
    <p className="text-[15px] text-slate-500 font-light leading-relaxed">{text}</p>
  </motion.div>
);

const TreatmentCard = ({ title, desc }) => (
  <motion.div whileHover={{ y: -4 }} className="p-10 bg-white rounded-3xl border border-slate-100 hover:border-[#C5A059]/30 hover:shadow-xl transition-all duration-500">
    <h3 className="text-2xl font-bold mb-3 text-slate-900 tracking-tight leading-tight">{title}</h3>
    <p className="text-slate-500 font-light leading-relaxed text-[15px]">{desc}</p>
  </motion.div>
);

const MethodItem = ({ num, title, desc, isDark }) => (
  <div className="flex gap-8 group">
    <p className="text-4xl font-bold tracking-tighter text-[#C5A059]/40 group-hover:text-[#C5A059] transition-colors">{num}</p>
    <div className="text-left">
      <h4 className={`text-lg font-bold mb-2 tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>{title}</h4>
      <p className={`text-[15px] font-light leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>{desc}</p>
    </div>
  </div>
);

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-8 flex justify-between items-center text-left hover:text-[#C5A059] transition-colors">
        <span className="font-bold text-slate-700 uppercase text-xs tracking-widest">{title}</span>
        <span className="text-2xl font-medium text-[#C5A059]">{isOpen ? '−' : '+'}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-8 text-slate-500 text-[15px] font-light leading-relaxed">{children}</p>
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
    <Header />

    {/* 1. HERO */}
    <section id="inicio" className="relative pt-48 pb-32 overflow-hidden bg-[#F7FBF9]">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="lg:w-1/2 space-y-10 text-left">

          {/* Badge CRM */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white border border-slate-100 rounded-full px-5 py-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">CRM MG 104082 · Online e Presencial</span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-tighter">
            Cuidar da mente é <br />
            <span className="text-[#C5A059] font-semibold">transformar a vida.</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-[17px] text-slate-500 max-w-lg leading-relaxed font-light border-l-2 border-[#C5A059] pl-6">
            Atendimento médico humanizado com foco em saúde mental, integrando ciência e acolhimento para o seu equilíbrio emocional.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
            <a href="https://wa.me/553199442774" target="_blank" rel="noopener noreferrer" className="bg-[#C5A059] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              Iniciar Acompanhamento
            </a>
            <a href="#sobre" className="px-10 py-4 rounded-full font-bold bg-white border border-slate-200 text-slate-700 hover:border-[#C5A059] hover:text-[#C5A059] transition-all duration-300">
              Saiba Mais
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeInUp} className="flex gap-10 pt-2">
            <div>
              <p className="text-4xl font-bold tracking-tighter text-slate-900">100<span className="text-[#C5A059]">+</span></p>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mt-1">Pacientes</p>
            </div>
            <div className="w-px bg-slate-200" />
            <div>
              <p className="text-4xl font-bold tracking-tighter text-slate-900">3<span className="text-[#C5A059]">+</span></p>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mt-1">Anos de Exp.</p>
            </div>
            <div className="w-px bg-slate-200" />
            <div>
              <p className="text-4xl font-bold tracking-tighter text-slate-900">98<span className="text-[#C5A059]">%</span></p>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mt-1">Satisfação</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="lg:w-1/2">
          <img src={HeroImg} alt="Dra. Ana Flávia" className="rounded-[40px] shadow-2xl shadow-[#132A23]/10 w-full object-cover aspect-[4/5]" />
        </motion.div>
      </div>
    </section>

    {/* 2. DIFERENCIAIS */}
    <section className="py-32 bg-white border-y border-slate-50">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <Feature icon={<HeartIcon />} title="Acolhimento Médico" text="Escuta ativa e empática, focada em compreender a pessoa além dos sintomas." />
        <Feature icon={<IntegrativeIcon />} title="Visão Integrativa" text="Tratamentos que consideram o equilíbrio clínico e o bem-estar mental de forma conjunta." />
        <Feature icon={<ShieldIcon />} title="Ética e Sigilo" text="Compromisso absoluto com a privacidade e as melhores práticas da medicina." />
      </div>
    </section>

    {/* 3. SOBRE */}
    <section id="sobre" className="py-32 bg-[#132A23] text-white">
      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-16 lg:gap-24 items-center text-left">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 lg:order-1 lg:col-span-5">
          <img src={SobreImg} alt="Dra Ana" className="rounded-[32px] shadow-2xl shadow-black/40 w-full max-w-[420px] mx-auto lg:mx-0 object-cover aspect-[4/5]" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8 order-1 lg:order-2 lg:col-span-7">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter text-white leading-tight">Dra. Ana Flávia Ribeiro</h2>
          <p className="text-[17px] text-slate-200 leading-relaxed border-l-2 border-[#C5A059] pl-6 font-medium">
            "Atuo no suporte médico à saúde mental, centrada no acolhimento integral e na escuta sensível."
          </p>
          <p className="text-[17px] text-slate-200 leading-relaxed border-l-2 border-[#C5A059] pl-6 font-medium">
            "Sou Médica generalista, com pós-graduação em Psiquiatria em andamento dedicada à saúde mental, centrada no acolhimento integral, escuta empática e acompanhamento contínuo."
          </p>
          <p className="text-slate-300 leading-relaxed font-light text-[15px]">
            Minha missão é construir um espaço seguro para que cada pessoa compreenda suas emoções e desenvolva ferramentas sólidas para uma vida equilibrada. Ofereço suporte especializado para transtornos de humor, ansiedade e esgotamento profissional.
          </p>
          <p className="text-slate-300 leading-relaxed font-light text-[15px]">
            Com uma abordagem personalizada, busco não apenas aliviar sintomas, mas também promover o autoconhecimento e a resiliência emocional. Meu compromisso é caminhar ao lado de cada paciente, respeitando seu ritmo e singularidade.
          </p>
          <p className="text-slate-300 leading-relaxed font-light text-[15px]">
            Se você busca um cuidado humanizado, ético e baseado na ciência, estou pronta para te acolher e caminhar junto nessa jornada de equilíbrio emocional.
          </p>
        </motion.div>
      </div>
    </section>

    {/* 4. ATUAÇÃO */}
    <section id="atuação" className="py-32 bg-[#F7FBF9] text-left">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tighter">Foco de Atendimento</h2>
          <p className="text-slate-500 font-medium text-lg tracking-tight">Suporte clínico personalizado para o manejo do bem-estar mental.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <TreatmentCard title="Manejo da Ansiedade" desc="Cuidado focado na compreensão dos sintomas e na busca por estratégias de alívio e controle emocional." />
          <TreatmentCard title="Suporte ao Humor" desc="Acompanhamento clínico para quadros de desânimo e instabilidade, visando a recuperação da funcionalidade." />
          <TreatmentCard title="Equilíbrio e Burnout" desc="Orientação médica para lidar com o esgotamento mental e o estresse crônico do cotidiano." />
          <TreatmentCard title="Atendimento Online" desc="Telemedicina com foco em acessibilidade e conforto, mantendo o rigor ético do atendimento presencial." />
        </div>
      </div>
    </section>

    {/* 5. METODOLOGIA */}
    <section id="metodologia" className="py-32 bg-[#132A23] text-white">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20 items-center text-left">
        <div className="space-y-12">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tighter text-white leading-tight">Uma prática baseada na responsabilidade</h2>
          <div className="space-y-10">
            <MethodItem num="01" title="Escuta e Acolhimento" desc="Primeiro contato dedicado a conhecer sua história de vida e queixas atuais." isDark />
            <MethodItem num="02" title="Planejamento de Cuidado" desc="Definição de caminhos e orientações para a melhora da qualidade de vida." isDark />
            <MethodItem num="03" title="Acompanhamento" desc="Suporte assistido para monitorar a evolução e o seu bem-estar contínuo." isDark />
          </div>
        </div>
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <img src={AbordagemImg} alt="Abordagem" className="rounded-[32px] shadow-2xl shadow-black/40 object-cover aspect-square" />
        </motion.div>
      </div>
    </section>

    {/* 6. DEPOIMENTOS */}
    <Testimonials />

    {/* 7. DÚVIDAS */}
    <section id="duvidas" className="py-32 bg-[#F7FBF9] text-left">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter text-center mb-16 text-slate-900">Dúvidas Frequentes</h2>
        <div className="space-y-2">
          <Accordion title="Como funciona o atendimento médico em saúde mental?">
            É uma consulta médica focada na sua saúde emocional. Avaliamos sintomas físicos e mentais para propor um plano de cuidado integral.
          </Accordion>
          <Accordion title="Quanto tempo dura a primeira consulta?">
            A consulta inicial é extensa (cerca de 60 minutos), permitindo uma compreensão profunda do seu histórico e necessidades.
          </Accordion>
          <Accordion title="O atendimento online é seguro?">
            Sim. Utilizamos plataformas seguras e éticas, conforme as normas do Conselho Federal de Medicina.
          </Accordion>
        </div>
      </div>
    </section>

    {/* 8. FOOTER */}
    <footer id="contato" className="pt-24 pb-8 bg-[#0F221C] border-t border-[#1A362D]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20 text-left">
          {/* Coluna 1: Marca */}
          <div className="md:col-span-12 lg:col-span-5 space-y-6 pr-4">
            <img src={Logo} alt="Logo" className="h-20 w-20 rounded-full border border-[#C5A059]/40 shadow-lg" />
            <p className="text-slate-400 text-sm italic font-light leading-relaxed max-w-sm">
              Dra. Ana Flávia Ribeiro | CRM MG 104082<br />
              Cuidado médico humanizado com foco em saúde mental. Acompanhamento contínuo para o seu bem-estar.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="https://www.instagram.com/dra.ana.ribeiro" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-[#132A23] border border-[#1A362D] flex items-center justify-center text-slate-400 hover:border-[#C5A059] hover:text-[#C5A059] transition-all shadow-sm">
                <InstagramIcon />
              </a>
              <a href="https://wa.me/553199442774" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-[#132A23] border border-[#1A362D] flex items-center justify-center text-slate-400 hover:border-[#25D366] hover:text-[#25D366] transition-all shadow-sm">
                <WASmall />
              </a>
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="md:col-span-6 lg:col-span-3 space-y-6">
            <p className="font-bold text-xs uppercase tracking-[0.3em] text-[#C5A059]">Navegação</p>
            <ul className="space-y-4 text-sm font-light text-slate-400">
              <li><a href="#inicio" className="hover:text-[#C5A059] transition-colors">Início</a></li>
              <li><a href="#sobre" className="hover:text-[#C5A059] transition-colors">Sobre Mim</a></li>
              <li><a href="#atuação" className="hover:text-[#C5A059] transition-colors">Áreas de Atuação</a></li>
              <li><a href="#metodologia" className="hover:text-[#C5A059] transition-colors">Metodologia</a></li>
              <li><a href="#duvidas" className="hover:text-[#C5A059] transition-colors">Dúvidas Frequentes</a></li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div className="md:col-span-6 lg:col-span-4 space-y-6">
            <p className="font-bold text-xs uppercase tracking-[0.3em] text-[#C5A059]">Fale Conosco</p>
            <div className="space-y-4">
              <a href="https://wa.me/553199442774" target="_blank" rel="noopener noreferrer" className="text-3xl font-serif block text-white hover:text-[#C5A059] transition-colors">
                (31) 99444-2774
              </a>
              <a href="https://www.instagram.com/dra.ana.ribeiro" target="_blank" rel="noopener noreferrer"
                className="block text-slate-400 text-sm hover:text-[#C5A059] transition-colors font-light">
                @dra.ana.ribeiro
              </a>
              <p className="text-sm font-light text-slate-400 pt-2">
                Atendimento presencial em Belo Horizonte e telemedicina para todo o Brasil.
              </p>
            </div>
          </div>
        </div>

        {/* Barra Inferior */}
        <div className="pt-8 border-t border-[#1A362D] flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-slate-500">
          <p>© {new Date().getFullYear()} Dra. Ana Flávia Ribeiro. Todos os direitos reservados.</p>
          <p>
            Desenvolvido por Raphael Yankous
          </p>
        </div>
      </div>
    </footer>
  </div>
);

export default App;