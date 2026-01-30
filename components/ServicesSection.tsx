import React, { useEffect, useRef, useState } from 'react';
import { markAnimationsPlayed } from '../utils/animationState';
import { Section } from './ui/Section';
import { SERVICES } from '../constants';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { shouldRunAnimations } from '../utils/animationState';

// Mobile stacking helper component
const MobileStackingCards: React.FC<{ services: typeof SERVICES }> = ({ services }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sentinelRefs = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) return;

    let ticking = false;

    const observer = new IntersectionObserver((entries) => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        let bestIdx = -1;
        let bestRatio = 0;
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.index);
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestIdx = idx;
          }
        });
        if (bestIdx !== -1) {
          setActiveIndex(bestIdx);
        }
        ticking = false;
      });
    }, { threshold: [0.4] });

    sentinelRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleTap = () => {
    if (activeIndex === services.length - 1) {
      setActiveIndex(-1);
      containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="w-full" onClick={handleTap}>
      {services.map((service, idx) => {
        const isActive = idx === activeIndex;
        const isStacked = idx < activeIndex;
        const stackedOffset = isStacked ? Math.min((activeIndex - idx) * 18, 96) : 0;
        const rotation = isStacked ? -Math.min((activeIndex - idx) * 3, 12) : 0;

        return (
          <div key={service.id} className="min-h-[100vh] flex items-center justify-center px-6 relative">
            {/* sentinel at top of each viewport block */}
            <div ref={(el) => (sentinelRefs.current[idx] = el!)} data-index={idx} className="absolute inset-x-0 top-[40vh] h-0 pointer-events-none" />

            {/* Card: original (hidden when stacked) */}
            <div className={`w-full max-w-3xl ${isStacked ? 'invisible' : 'visible'}`}>
              <div className="relative bg-white rounded-squircle p-8 shadow-squircle border border-white">
                <div className="w-16 h-16 bg-brand-900 rounded-3xl flex items-center justify-center text-white mb-6 shadow-xl">
                  <service.icon size={28} />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h4>
                <p className="text-slate-600">{service.description}</p>
              </div>
            </div>

            {/* Stacked fixed copy */}
            {isStacked && (
              <div
                className="pointer-events-auto fixed left-1/2 transform -translate-x-1/2 transition-transform duration-300"
                style={{
                  top: '50%',
                  transform: `translate(-50%, calc(-50% - ${stackedOffset}px)) rotate(${rotation}deg)`,
                  zIndex: 200 - (activeIndex - idx),
                  width: 'min(92%, 720px)'
                }}
                onClick={() => {
                  if (activeIndex === services.length - 1) {
                    setActiveIndex(-1);
                    containerRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <div className="relative bg-white rounded-squircle p-8 shadow-squircle border border-white">
                  <div className="w-16 h-16 bg-brand-900 rounded-3xl flex items-center justify-center text-white mb-6 shadow-xl">
                    <service.icon size={28} />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h4>
                  <p className="text-slate-600">{service.description}</p>
                </div>
              </div>
            )}

            {/* Active fixed centered card */}
            {isActive && (
              <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl pointer-events-none z-50">
                <div className="relative bg-white rounded-squircle p-8 shadow-squircle border border-white">
                  <div className="w-16 h-16 bg-brand-900 rounded-3xl flex items-center justify-center text-white mb-6 shadow-xl">
                    <service.icon size={28} />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h4>
                  <p className="text-slate-600">{service.description}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const ServicesSection: React.FC = () => {
  return (
    <Section id="services" className="bg-slate-50/50" overflow="overflow-visible">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.div
          initial={shouldRunAnimations() ? { opacity: 0, y: 30 } : undefined}
          whileInView={shouldRunAnimations() ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-brand-600 font-bold uppercase tracking-[0.2em] text-sm mb-4">Core Solutions</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 leading-tight">
            Premium ICT & <br/> Advisory Services
          </h3>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Providing the technical backbone and strategic foresight for sustainable national development.
          </p>
        </motion.div>
      </div>

      {/* Mobile stacking behavior: render a tall container on small screens where each card will stick to center as you scroll.
          On larger screens we keep the original grid. */}
      <div className="md:hidden">
        <MobileStackingCards services={SERVICES} />
      </div>

      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.id}
            initial={shouldRunAnimations() ? { opacity: 0, y: 60, scale: 0.95 } : undefined}
            whileInView={shouldRunAnimations() ? { opacity: 1, y: 0, scale: 1 } : undefined}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ 
              duration: 0.7, 
              delay: index * 0.15,
              type: "spring",
              stiffness: 60,
              damping: 20
            }}
            className="group relative bg-white rounded-squircle p-10 md:p-14 shadow-squircle border border-white flex flex-col h-full hover:shadow-glow transition-all duration-700 overflow-hidden"
          >
            {/* Hover visual: Subtle gradient light */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-20 h-20 bg-brand-900 rounded-3xl flex items-center justify-center text-white mb-10 shadow-xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                <service.icon size={36} />
              </div>
              
              <h4 className="text-3xl font-bold text-slate-900 mb-5 group-hover:text-brand-700 transition-colors font-display tracking-tight">
                {service.title}
              </h4>
              
              <p className="text-slate-600 leading-relaxed mb-12 flex-grow text-lg font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                {service.description}
              </p>

              <Link to="/services">
                <Button variant="secondary" className="w-full justify-between py-6 bg-slate-50 border-slate-100 group-hover:bg-brand-50 group-hover:border-brand-200 transition-all rounded-[1.5rem] group-hover:shadow-lg">
                  <span className="font-bold">Learn More</span>
                  <div className="bg-brand-900 text-white p-2.5 rounded-full group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};