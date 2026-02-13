import React from 'react';
import { Section } from './ui/Section';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { shouldRunAnimations } from '../utils/animationState';
import { getEntranceOffset } from '../utils/animationHelpers';
import { getIconComponent } from '../utils/iconHelpers';
import { useData } from '../context/DataContext';
import { Skeleton } from './ui/Skeleton';

export const ServicesSection: React.FC = () => {
  const { services, loading } = useData();

  if (loading) {
    return (
      <Section id="services" className="bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <Skeleton className="h-[60vh] w-full rounded-[3rem]" />
        </div>
      </Section>
    );
  }

  return (
    <Section id="services" className="bg-slate-50/50" overflow="overflow-visible">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.div
          initial={shouldRunAnimations() ? { opacity: 0, y: getEntranceOffset(80, 30) } : undefined}
          whileInView={shouldRunAnimations() ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-brand-600 font-bold uppercase tracking-[0.2em] text-sm mb-4">Core Solutions</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 leading-tight">
            Premium ICT & <br /> Advisory Services
          </h3>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Providing the technical backbone and strategic foresight for sustainable national development.
          </p>
        </motion.div>
      </div>

      {services.length > 0 ? (
        <>
          {/* Mobile: simple stacked cards */}
          <div className="md:hidden px-4 flex flex-col gap-6">
            {services.map((service) => {
              const Icon = getIconComponent(service.icon_name);
              return (
                <div key={service.id} className="group relative bg-white rounded-squircle p-6 shadow-squircle border border-white">
                  <div className="relative z-10 flex flex-col">
                    <div className="w-16 h-16 bg-brand-900 rounded-3xl flex items-center justify-center text-white mb-6 shadow-xl">
                      <Icon size={28} />
                    </div>

                    <h4 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h4>
                    <p className="text-slate-600 mb-6">{service.description}</p>

                    <Link to="/services">
                      <Button variant="secondary" className="w-full justify-between py-4 bg-slate-50 border-slate-100 transition-all rounded-[1.5rem]">
                        <span className="font-bold">Learn More</span>
                        <div className="bg-brand-900 text-white p-2.5 rounded-full">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {services.map((service, index) => {
              const Icon = getIconComponent(service.icon_name);
              return (
                <motion.div
                  key={service.id}
                  initial={shouldRunAnimations() ? { opacity: 0, y: getEntranceOffset(100, 60), scale: 0.95 } : undefined}
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
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-20 h-20 bg-brand-900 rounded-3xl flex items-center justify-center text-white mb-10 shadow-xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                      <Icon size={36} />
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
              );
            })}
          </div>
        </>
      ) : (
        <div className="max-w-4xl mx-auto bg-white rounded-squircle p-12 text-center border border-dashed border-slate-200 shadow-squircle">
          <p className="text-slate-500 italic">Technical solutions are currently being cataloged. Updates coming soon!</p>
        </div>
      )}
    </Section>
  );
};