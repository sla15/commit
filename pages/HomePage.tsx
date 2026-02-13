import React from 'react';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { ApproachSection } from '../components/ApproachSection';
import { ValuesSection } from '../components/ValuesSection';
import { TestimonialSection } from '../components/TestimonialSection';
import { Video, ShieldCheck, Server, Database } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="relative overflow-x-hidden">
      {/* Decorative Elements - Placeholders for PNGs */}
      <div className="absolute top-32 right-4 md:right-20 z-10 pointer-events-none animate-pulse">
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-slate-100 transform rotate-12">
          <Video size={40} className="text-brand-600" />
        </div>
      </div>

      <div className="absolute top-[800px] left-4 md:left-20 z-10 pointer-events-none">
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-slate-100 transform -rotate-6">
          <ShieldCheck size={40} className="text-brand-600" />
        </div>
      </div>

      <div className="absolute bottom-[20%] right-4 md:right-10 z-10 pointer-events-none">
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-slate-100 transform rotate-3">
          <Database size={40} className="text-brand-600" />
        </div>
      </div>

      <Hero />
      <AboutSection />
      <ServicesSection />
      <TestimonialSection />
      <ApproachSection />
      <ValuesSection />
    </div>
  );
};