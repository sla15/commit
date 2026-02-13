import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { shouldRunAnimations, markAnimationsPlayed } from '../utils/animationState';
import { getEntranceOffset } from '../utils/animationHelpers';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';
import { RotatingTextContainer, RotatingText } from './animate-ui/primitives/texts/rotating';

// Split the phrases into two arrays for the block layout
const WORDS_TOP = ["Digital", "Tech", "Sustainable"];
const WORDS_BOTTOM = ["Future", "Solutions", "Growth"];

export const Hero: React.FC = () => {
  // Mark animations as played once on mount so they don't restart until reload
  useEffect(() => {
    if (shouldRunAnimations()) {
      // mark immediately so repeated mounts won't replay animations
      markAnimationsPlayed();
    }
  }, []);

  return (
    <div style={{ position: 'relative', clipPath: 'inset(0)' }} className="sticky top-0 min-h-screen flex items-center pt-32 pb-24 overflow-x-hidden overflow-y-visible bg-brand-950 perspective-[2000px] z-0">

      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-brand-950 to-brand-950 opacity-100 z-0"></div>

        {/* Grainy Gradient Background - Standardized */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-600/30 rounded-full blur-[150px] mix-blend-screen pointer-events-none translate-x-1/4 -translate-y-1/4 z-10"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-x-1/4 translate-y-1/4 z-10"></div>

        {/* Premium box grid overlay */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: "linear-gradient(0deg, rgba(255, 255, 255, 0.99) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.81) 1px, transparent 1px)",
            backgroundSize: '18px 18px',
            backgroundPosition: '0 0, 0 0',
            mixBlendMode: 'overlay',
            opacity: 0.08,
            boxShadow: 'inset 0 1px 40px rgb(255, 255, 255)',
            backdropFilter: 'saturate(1.05) blur(0.4px)'
          }}
        ></div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-20 max-w-[90rem] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-40 items-center">

        {/* Left Column: Text Content */}
        <div className="flex flex-col items-start text-left w-full">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-900/50 border border-brand-500/30 backdrop-blur-md mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></div>
            <span className="text-xs font-bold text-brand-200 tracking-widest uppercase">CommIT Enterprise</span>
          </motion.div>

          <div className="relative mb-8">
            <motion.h1
              initial={{ opacity: 0, y: getEntranceOffset(80, 30) }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tight leading-[1.05]"
            >
              Building the <br />
              <div className="flex flex-col items-start mt-2 gap-0">
                {/* First Line of Rotating Text */}
                <span className="text-brand-400 leading-[0.95] block h-[1.1em] overflow-visible">
                  <RotatingTextContainer
                    text={WORDS_TOP}
                    y="130%"
                    duration={4000}
                    delay={0}
                    mainClassName="min-w-[300px]"
                    className="text-brand-400"
                    stiffness={120}
                    damping={25}
                  >
                    <RotatingText />
                  </RotatingTextContainer>
                </span>

                {/* Second Line of Rotating Text */}
                <span className="text-brand-400 leading-[0.95] block h-[1.1em] overflow-visible">
                  <RotatingTextContainer
                    text={WORDS_BOTTOM}
                    y="130%"
                    duration={4000}
                    delay={200}
                    mainClassName="min-w-[300px]"
                    className="text-brand-400"
                    stiffness={120}
                    damping={25}
                  >
                    <RotatingText />
                  </RotatingTextContainer>
                </span>
              </div>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: getEntranceOffset(80, 30) }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-xl border-l-2 border-brand-500 pl-6"
          >
            CommIT Enterprise bridges technology and development with world-class infrastructure, procurement, and advisory services.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: getEntranceOffset(80, 30) }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
          >
            <Link to="/contact">
              <Button
                variant="secondary"
                className="w-full sm:w-auto border-0 px-8 py-4 rounded-2xl font-extrabold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all text-lg transform hover:-translate-y-1"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10 px-8 py-4 rounded-2xl text-lg font-semibold">
                Explore Services
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Visual Composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative h-[600px] lg:h-[800px] w-full flex items-center justify-center lg:justify-end lg:translate-x-48 xl:translate-x-60"
        >
          <div className="relative w-full max-w-lg lg:max-w-none h-full perspective-[1000px]">

            {/* Main Image Frame - Wrapper for Static Rotation */}
            <div
              className="absolute inset-0 rounded-[3rem] shadow-2xl bg-slate-900/50"
              style={{ transform: "rotateY(-5deg) rotateX(2deg)" }}
            >
              {/* Inner Motion Div for Floating Animation */}
              <motion.div
                animate={shouldRunAnimations() ? { y: [0, -15, 0] } : undefined}
                transition={shouldRunAnimations() ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : undefined}
                className="w-full h-full rounded-[3rem] overflow-hidden border border-white/10"
              >
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                  alt="Enterprise Infrastructure"
                  className="w-full h-full object-cover opacity-70 mix-blend-overlay hover:scale-105 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent opacity-60"></div>
              </motion.div>
            </div>

            {/* Floating Card 1: Speed */}
            <motion.div
              animate={shouldRunAnimations() ? { y: [0, -20, 0], x: [0, 10, 0] } : undefined}
              transition={shouldRunAnimations() ? { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 } : undefined}
              className="absolute top-16 -right-4 md:-right-8 lg:-right-12 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-xl w-48 z-10"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-500 rounded-lg text-white shadow-lg shadow-brand-500/30"><Zap size={20} /></div>
                <div>
                  <p className="text-[10px] text-brand-100 uppercase tracking-wider font-bold">Speed</p>
                  <p className="font-bold text-white text-sm">Fiber Optic</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 2: Security */}
            <motion.div
              animate={shouldRunAnimations() ? { y: [0, 20, 0], x: [0, -10, 0] } : undefined}
              transition={shouldRunAnimations() ? { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 } : undefined}
              className="absolute bottom-16 -left-4 md:-left-8 lg:-left-12 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-xl w-56 z-10"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500 rounded-lg text-white shadow-lg shadow-green-500/30"><ShieldCheck size={20} /></div>
                <div>
                  <p className="text-[10px] text-green-100 uppercase tracking-wider font-bold">Security</p>
                  <p className="font-bold text-white text-sm">Enterprise Grade</p>
                </div>
              </div>
              <div className="flex gap-1.5 mt-2 opacity-80">
                <div className="h-1 flex-1 bg-green-400 rounded-full"></div>
                <div className="h-1 flex-1 bg-green-400 rounded-full"></div>
                <div className="h-1 flex-1 bg-green-400/30 rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};