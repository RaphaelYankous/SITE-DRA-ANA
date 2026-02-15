import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Importação das imagens
import Logo from './assets/84f47818-c213-4df3-a772-571c6b4f176c.jfif'; 
import HeroImg from './assets/IMG_8723.JPG'; 
import SobreImg from './assets/IMG_8886.JPG';
import AbordagemImg from './assets/IMG_8843.JPG';

const App = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#F7FBF9] text-slate-800 font-sans selection:bg-[#C5A059]/20 scroll-smooth">
      
      {/* HEADER - Menta Ultra Suave */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed w-full top-0 z-50 bg-[#F0F7F4]/95 backdrop-blur-md border-b border-[#D1E8E2]/50"
      >
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center text-left">
          <div className="flex items-center gap-4">
            <img src={Logo} alt="Logo" className="h-14 w-14 rounded-full border border-[#C5A059]/20 shadow-sm" />
            <div className="flex flex-col text-left">
              <span className="font-serif text-xl font-bold text-slate-900 tracking-tight leading-none">Dra. Ana Flávia Ribeiro</span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#C5A059] font-bold mt-1">Médica • Saúde Mental</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-10 text-[11px] uppercase tracking-widest font-bold text-slate-500">
            {['Sobre', 'Atuação', 'Metodologia', 'Dúvidas', 'Contato'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#C5A059] transition-all underline-offset-8 hover:underline">{item}</a>
            ))}
            <a href="https://wa.me/553199442774" target="_blank" className="bg-[#C5A059] text-white px-8 py-3 rounded-full hover:bg-slate-900 transition-all shadow-lg shadow-[#C5A059]/20">
              Agendar Consulta
            </a>
          </div>
        </nav>
      </motion.header>

      {/* 1. HERO - Foco em Saúde Mental */}
      <section id="inicio" className="relative pt-52 pb-32 overflow-hidden bg-gradient-to-br from-[#F0F7F4] to-white">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="lg:w-1/2 space-y-10 text-left">
            <h1 className="text-6xl lg:text-7xl font-serif text-slate-900 leading-[1.1] tracking-tighter">
              Cuidar da mente é <br /> 
              <span className="text-[#C5A059] italic font-light font-serif">transformar a vida.</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-lg leading-relaxed font-light border-l-4 border-[#C5A059] pl-8 italic">
              Atendimento médico humanizado com foco em saúde mental, integrando ciência e acolhimento para o seu equilíbrio emocional.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <a href="https://wa.me/553199442774" target="_blank" className="bg-[#C5A059] text-white px-10 py-5 rounded-2xl font-bold shadow-xl hover:bg-slate-900 transition-all">
                Iniciar Acompanhamento
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="lg:w-1/2">
            <img src={HeroImg} alt="Dra. Ana Flávia" className="rounded-[60px] shadow-2xl border-[15px] border-white w-full" />
          </motion.div>
        </div>
      </section>

      {/* 2. DIFERENCIAIS */}
      <section className="py-24 bg-white border-y border-slate-50">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center font-light">
          <Feature title="Acolhimento Médico" text="Escuta ativa e empática, focada em compreender a pessoa além dos sintomas." />
          <Feature title="Visão Integrativa" text="Tratamentos que consideram o equilíbrio clínico e o bem-estar mental de forma conjunta." />
          <Feature title="Ética e Sigilo" text="Compromisso absoluto com a privacidade e as melhores práticas da medicina." />
        </div>
      </section>

      {/* 3. SOBRE MIM */}
      <section id="sobre" className="py-40 bg-[#F0F7F4]/50">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center text-left">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 lg:order-1">
             <img src={SobreImg} alt="Dra Ana" className="rounded-[40px] shadow-2xl border-l-[15px] border-[#D1E8E2]" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8 order-1 lg:order-2">
            <h2 className="text-4xl lg:text-5xl font-serif text-slate-900 leading-tight border-b-2 border-[#C5A059] inline-block pb-2">Dra. Ana Flávia Ribeiro</h2>
            <p className="text-lg text-slate-600 leading-relaxed italic border-l-2 border-[#C5A059] pl-6 font-light">
              "Atuo no suporte médico à saúde mental, centrada no acolhimento integral e na escuta sensível."
            </p>
           <p className="text-lg text-slate-600 leading-relaxed italic border-l-2 border-[#C5A059] pl-6 font-light">
              "Sou Médica generalista, com pós-graduação em Psiquiatria em andamento dedicada à saúde mental, centrada no acolhimento integral, escuta empática e acompanhamento contínuo."
            </p>
            <p className="text-slate-600 leading-relaxed font-light">
              Minha missão é construir um espaço seguro para que cada pessoa compreenda suas emoções e desenvolva ferramentas sólidas para uma vida equilibrada. Ofereço suporte especializado para transtornos de humor, ansiedade e esgotamento profissional.
            </p>
            <p className="text-slate-600 leading-relaxed font-light">
              Com uma abordagem personalizada, busco não apenas aliviar sintomas, mas também promover o autoconhecimento e a resiliência emocional. Meu compromisso é caminhar ao lado de cada paciente, respeitando seu ritmo e singularidade, para que juntos possamos alcançar uma saúde mental plena e duradoura.
            </p>
            <p className="text-slate-600 leading-relaxed font-light">
              Acredito que o acompanhamento de saúde mental é uma ferramenta poderosa para transformar vidas, e estou aqui para oferecer o suporte necessário em cada etapa dessa jornada de autodescoberta e cura.
            </p>
            <p className="text-slate-600 leading-relaxed font-light">
              Se você busca um cuidado humanizado, ético e baseado na ciência, estou pronta para te acolher e caminhar junto nessa jornada de equilíbrio emocional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. ÁREAS DE ATUAÇÃO */}
      <section id="atuação" className="py-40 bg-white text-left">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-24">
            <h2 className="text-4xl lg:text-5xl font-serif text-slate-900 mb-6 italic tracking-tight">Foco de Atendimento</h2>
            <p className="text-slate-500 font-light text-xl">Suporte clínico personalizado para o manejo do bem-estar mental.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <TreatmentCard title="Manejo da Ansiedade" desc="Cuidado focado na compreensão dos sintomas e na busca por estratégias de alívio e controle emocional." />
            <TreatmentCard title="Suporte ao Humor" desc="Acompanhamento clínico para quadros de desânimo e instabilidade, visando a recuperação da funcionalidade." />
            <TreatmentCard title="Equilíbrio e Burnout" desc="Orientação médica para lidar com o esgotamento mental e o estresse crônico do cotidiano." />
            <TreatmentCard title="Atendimento Online" desc="Telemedicina com foco em acessibilidade e conforto, mantendo o rigor ético do atendimento presencial." />
          </div>
        </div>
      </section>

      {/* 5. METODOLOGIA - Ajustada para Verde Claro */}
      <section id="metodologia" className="py-32 bg-[#F0F7F4]">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20 items-center text-left">
          <div className="space-y-12">
            <h2 className="text-4xl font-serif italic text-slate-900 leading-tight">Uma prática baseada na responsabilidade</h2>
            <div className="space-y-10">
              <MethodItem num="01" title="Escuta e Acolhimento" desc="Primeiro contato dedicado a conhecer sua história de vida e queixas atuais." />
              <MethodItem num="02" title="Planejamento de Cuidado" desc="Definição de caminhos e orientações para a melhora da qualidade de vida." />
              <MethodItem num="03" title="Acompanhamento" desc="Suporte assistido para monitorar a evolução e o seu bem-estar contínuo." />
            </div>
          </div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
             <img src={AbordagemImg} alt="Abordagem" className="rounded-3xl shadow-2xl border-[10px] border-white" />
          </motion.div>
        </div>
      </section>

      {/* 6. DÚVIDAS FREQUENTES */}
      <section id="duvidas" className="py-40 bg-white text-left">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-serif text-center mb-16 italic tracking-tight text-slate-900 text-center">Dúvidas Frequentes</h2>
          <div className="space-y-4">
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

      {/* 7. FOOTER */}
      <footer id="contato" className="py-24 bg-[#F0F7F4] border-t border-[#D1E8E2]">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12 text-left">
          <div className="max-w-sm space-y-6">
            <img src={Logo} alt="Logo" className="h-20 w-20 rounded-full border border-[#C5A059]/20 shadow-lg" />
            <p className="text-slate-500 text-sm italic font-light leading-relaxed">
              Dra. Ana Flávia Ribeiro | CRM MG 000000 <br />
              Cuidado médico humanizado com foco em saúde mental.
            </p>
          </div>
          <div className="space-y-6">
            <p className="font-bold text-xs uppercase tracking-[0.3em] text-[#C5A059]">Agendamento</p>
            <a href="https://wa.me/553199442774" target="_blank" className="text-2xl font-serif block text-slate-800 underline decoration-[#C5A059]">(31) 99444-2774</a>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest pt-4">© 2026 Dra. Ana Flávia Ribeiro</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// COMPONENTES AUXILIARES
const Feature = ({ title, text }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6">
    <div className="h-1 w-12 bg-[#C5A059] mx-auto md:mx-0" />
    <h3 className="text-xl font-serif text-slate-900 leading-tight">{title}</h3>
    <p className="text-sm text-slate-500 font-light leading-relaxed italic">{text}</p>
  </motion.div>
);

const TreatmentCard = ({ title, desc }) => (
  <motion.div whileHover={{ y: -10 }} className="p-10 bg-[#F7FBF9] rounded-[40px] border border-slate-100 hover:shadow-2xl transition-all duration-500 border-b-4 border-[#C5A059]">
    <h3 className="text-2xl font-serif mb-4 text-slate-900 italic leading-tight">{title}</h3>
    <p className="text-slate-500 font-light leading-relaxed text-sm italic">{desc}</p>
  </motion.div>
);

const MethodItem = ({ num, title, desc }) => (
  <div className="flex gap-8 group">
    <p className="text-4xl font-serif text-[#C5A059]/40 group-hover:text-[#C5A059] transition-colors font-light">{num}</p>
    <div className="text-left">
       <h4 className="text-lg font-bold mb-2 uppercase tracking-tight text-slate-800">{title}</h4>
       <p className="text-sm text-slate-500 font-light leading-relaxed italic">{desc}</p>
    </div>
  </div>
);

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-8 flex justify-between items-center text-left hover:text-[#C5A059] transition-colors">
        <span className="font-bold text-slate-700 uppercase text-xs tracking-widest">{title}</span>
        <span className="text-2xl font-serif text-[#C5A059]">{isOpen ? '−' : '+'}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-8 text-slate-500 text-sm italic leading-relaxed">{children}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;