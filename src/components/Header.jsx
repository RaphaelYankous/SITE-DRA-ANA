import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/84f47818-c213-4df3-a772-571c6b4f176c.jfif';

const navLinks = ['Sobre', 'Atuação', 'Metodologia', 'Dúvidas', 'Contato'];

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full top-0 z-50 bg-[#F0F7F4]/95 backdrop-blur-md border-b border-[#D1E8E2]/50"
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src={Logo} alt="Logo" className="h-12 w-12 rounded-full border border-slate-200/50 shadow-sm" />
          <div className="flex flex-col text-left">
            <span className="font-bold text-lg text-slate-900 tracking-tight leading-none">Dra. Ana Flávia</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-slate-500 font-semibold mt-1">Saúde Mental</span>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex items-center space-x-8 text-[11px] uppercase tracking-widest font-bold text-slate-500">
          {navLinks.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#C5A059] transition-all underline-offset-8 hover:underline">{item}</a>
          ))}
          <a href="https://wa.me/553199442774" target="_blank" rel="noopener noreferrer" className="bg-[#C5A059] text-white px-8 py-3 rounded-full hover:bg-slate-900 transition-all shadow-lg shadow-[#C5A059]/20 ml-6">
            Agendar Consulta
          </a>
        </div>

        {/* Hamburger */}
        <button className="lg:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <span className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-[#F0F7F4] border-t border-[#D1E8E2]/50"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-4">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="text-sm uppercase tracking-widest font-bold text-slate-600 hover:text-[#C5A059] transition-colors py-3 border-b border-slate-100"
                >
                  {item}
                </a>
              ))}
              <a
                href="https://wa.me/553199442774"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 bg-[#C5A059] text-white px-8 py-4 rounded-full text-center font-bold text-sm uppercase tracking-widest hover:bg-slate-900 transition-all"
              >
                Agendar Consulta
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
