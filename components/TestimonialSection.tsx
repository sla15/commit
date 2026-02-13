import React, { useState, useEffect } from 'react';
import { Section } from './ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star, Loader2 } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

interface Testimonial {
   id: string;
   quote: string;
   author: string;
   role: string;
   rating: number;
}

export const TestimonialSection: React.FC = () => {
   const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [direction, setDirection] = useState(0);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchTestimonials = async () => {
         try {
            const { data, error } = await supabase
               .from('testimonials')
               .select('*')
               .order('display_order', { ascending: true });

            if (error) throw error;
            setTestimonials(data || []);
         } catch (error) {
            console.error('Error fetching testimonials:', error);
         } finally {
            setLoading(false);
         }
      };

      fetchTestimonials();
   }, []);

   const slideVariants = {
      enter: (direction: number) => ({
         x: direction > 0 ? 300 : -300,
         opacity: 0,
         scale: 0.95
      }),
      center: {
         zIndex: 1,
         x: 0,
         opacity: 1,
         scale: 1
      },
      exit: (direction: number) => ({
         zIndex: 0,
         x: direction < 0 ? 300 : -300,
         opacity: 0,
         scale: 0.95
      })
   };

   const paginate = (newDirection: number) => {
      if (testimonials.length === 0) return;
      setDirection(newDirection);
      setCurrentIndex((prevIndex) => {
         let nextIndex = prevIndex + newDirection;
         if (nextIndex < 0) nextIndex = testimonials.length - 1;
         if (nextIndex >= testimonials.length) nextIndex = 0;
         return nextIndex;
      });
   };

   const handleDotClick = (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
   };

   if (loading) {
      return (
         <Section bg="white" className="overflow-hidden">
            <div className="flex justify-center p-20">
               <Loader2 className="animate-spin text-brand-500" size={40} />
            </div>
         </Section>
      );
   }

   if (testimonials.length === 0) return null; // Don't show section if no testimonials

   return (
      <Section bg="white" className="overflow-hidden">
         <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
               <h2 className="text-brand-600 font-bold uppercase tracking-[0.2em] text-sm mb-4">Success Stories</h2>
               <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">Trusted by Industry Leaders</h3>
            </motion.div>
         </div>

         <div className="max-w-4xl mx-auto px-4 relative">
            <div className="relative min-h-[400px] md:min-h-[350px]">
               <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                     key={currentIndex}
                     custom={direction}
                     variants={slideVariants}
                     initial="enter"
                     animate="center"
                     exit="exit"
                     transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                     }}
                     className="absolute w-full"
                  >
                     <div className="bg-slate-50 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 relative">
                        <div className="absolute top-8 left-8 text-brand-200">
                           <Quote size={48} className="transform -scale-x-100 opacity-50" />
                        </div>

                        <div className="relative z-10 flex flex-col items-center text-center">
                           <div className="flex gap-1 mb-8 text-yellow-400">
                              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                 <Star key={i} size={20} fill="currentColor" />
                              ))}
                           </div>

                           <blockquote className="text-2xl md:text-3xl font-display leading-relaxed text-slate-800 mb-10">
                              "{testimonials[currentIndex].quote}"
                           </blockquote>

                           <div>
                              <div className="font-bold text-xl text-slate-900 mb-1">{testimonials[currentIndex].author}</div>
                              <div className="text-brand-600 font-medium">{testimonials[currentIndex].role}</div>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-4 mt-8 md:mt-12">
               <button
                  onClick={() => paginate(-1)}
                  className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 transition-all shadow-sm z-20"
                  aria-label="Previous testimonial"
               >
                  <ChevronLeft size={24} />
               </button>

               <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                     <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex ? 'bg-brand-600 w-6' : 'bg-slate-300 hover:bg-brand-300'
                           }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                     />
                  ))}
               </div>

               <button
                  onClick={() => paginate(1)}
                  className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 transition-all shadow-sm z-20"
                  aria-label="Next testimonial"
               >
                  <ChevronRight size={24} />
               </button>
            </div>
         </div>
      </Section>
   );
};