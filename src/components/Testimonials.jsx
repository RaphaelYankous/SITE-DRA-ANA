import { motion } from 'framer-motion';

const Star = () => (
  <svg className="w-4 h-4 text-[#C5A059] fill-[#C5A059]" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
);

const Card = ({ text, name, role, highlight }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`p-8 rounded-2xl flex flex-col gap-6 ${highlight ? 'bg-[#C5A059] text-white' : 'bg-[#F7FBF9] border border-slate-200'} transition-all duration-500`}
  >
    <div className="flex gap-1">{[...Array(5)].map((_, i) => <Star key={i} />)}</div>
    <p className={`text-[15px] leading-relaxed font-light tracking-tight ${highlight ? 'text-white/95' : 'text-slate-600'}`}>"{text}"</p>
    <div>
      <p className={`font-semibold text-sm tracking-tight ${highlight ? 'text-white' : 'text-slate-800'}`}>{name}</p>
      <p className={`text-xs mt-1 uppercase tracking-widest font-bold ${highlight ? 'text-white/70' : 'text-slate-400'}`}>{role}</p>
    </div>
  </motion.div>
);

export const Testimonials = () => (
  <section className="py-32 bg-white">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter text-slate-900 mb-4">Pacientes</h2>
        <p className="text-slate-400 font-medium text-lg tracking-tight">Histórias reais de quem encontrou equilíbrio e bem-estar.</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card
          text="A Dra. Ana Flávia mudou minha perspectiva sobre saúde mental. A escuta é genuína e o acompanhamento é feito com muita sensibilidade."
          name="M. S."
          role="Paciente · Belo Horizonte"
        />
        <Card
          text="Depois de meses com burnout severo, encontrei o apoio que precisava. O atendimento é humanizado e o resultado foi transformador."
          name="R. C."
          role="Paciente · Atendimento Online"
          highlight
        />
        <Card
          text="Me sentia perdida com a ansiedade e hoje consigo conduzir minha vida com muito mais equilíbrio. Sou eternamente grata pelo cuidado."
          name="L. A."
          role="Paciente · Belo Horizonte"
        />
      </div>
    </div>
  </section>
);
