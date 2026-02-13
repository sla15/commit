import React from 'react';
import { motion, Variants } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  bg?: 'white' | 'light' | 'dark';
  overflow?: string;
}

export const Section: React.FC<SectionProps> = ({ children, id, className = "", bg = 'white', overflow = "overflow-hidden" }) => {
  const bgStyles = {
    white: "bg-white",
    light: "bg-slate-50/50",
    dark: "bg-brand-950 text-white"
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  return (
    <section
      id={id}
      className={`relative py-24 px-6 md:px-12 lg:px-24 ${overflow} ${bgStyles[bg]} ${className}`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};