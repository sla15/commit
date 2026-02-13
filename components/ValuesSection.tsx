import React from 'react';
import { Section } from './ui/Section';
import { VALUES } from '../constants';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getEntranceOffset } from '../utils/animationHelpers';

export const ValuesSection: React.FC = () => {
  return (
    <section id="values" className="relative overflow-hidden rounded-[5rem] mx-6 md:mx-12 lg:mx-24 mb-24 bg-brand-950 min-h-[600px] py-24 px-6 md:px-12 lg:px-24">
      {/* Grainy Gradient Background - FULL WIDTH of the rounded card */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-500/10 rounded-full blur-[80px] mix-blend-screen pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              className="text-brand-400 font-bold uppercase tracking-[0.2em] text-sm mb-4"
            >
              Our Foundation
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: getEntranceOffset(80, 20) }} whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight text-white"
            >
              Built on Professional <br /> Integrity
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: getEntranceOffset(80, 20) }} whileInView={{ opacity: 1, y: 0 }}
              className="text-brand-100/90 text-xl leading-relaxed"
            >
              Our values drive every solution we build and every partnership we cultivate.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, x: 20, y: getEntranceOffset(80, 0) }} whileInView={{ opacity: 1, x: 0, y: 0 }}>
            <Link to="/about" className="group inline-flex items-center gap-4 px-10 py-5 bg-brand-600 hover:bg-brand-500 rounded-3xl transition-all text-white font-bold shadow-2xl shadow-brand-600/30">
              Meet Our Team <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {VALUES.map((value, index) => (
            <motion.div
              key={value.id}
              initial={{ opacity: 0, y: getEntranceOffset(80, 30) }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              whileHover={{ y: -10, borderColor: 'rgba(56, 189, 248, 0.4)' }}
              className="p-10 border border-white/10 rounded-[2.5rem] transition-all duration-500 group"
            >
              <div className="h-1.5 w-14 bg-brand-400 rounded-full mb-8 group-hover:w-20 transition-all duration-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
              <h4 className="text-2xl font-bold mb-5 font-display tracking-tight text-white">{value.title}</h4>
              <p className="text-brand-100/70 text-lg leading-relaxed group-hover:text-white transition-colors">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
