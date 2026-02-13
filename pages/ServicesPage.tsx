import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getEntranceOffset } from '../utils/animationHelpers';
import { Section } from '../components/ui/Section';
import { SERVICES } from '../constants';
import { Button } from '../components/ui/Button';
import { ChevronRight } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import { getIconComponent } from '../utils/iconHelpers';
import { Skeleton } from '../components/ui/Skeleton';
import { ServicesHero } from '../components/ServicesHero';

interface Service {
    id: string;
    title: string;
    description: string;
    icon_name: string;
    features: string[];
}

export const ServicesPage: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data, error } = await supabase
                    .from('services')
                    .select('*')
                    .order('created_at', { ascending: true });

                if (error) throw error;
                setServices(data || []);
            } catch (error) {
                console.error('Error fetching services:', error);
                // Fallback to constants if DB fails
                setServices(SERVICES.map(s => ({
                    id: s.id,
                    title: s.title,
                    description: s.description,
                    icon_name: 'Server', // Default fallback
                    features: s.features
                })));
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) {
        return (
            <div>
                <div className="h-[50vh] flex flex-col items-center justify-center bg-slate-50 space-y-6">
                    <Skeleton className="h-16 w-3/4 max-w-xl" />
                    <Skeleton className="h-6 w-1/2 max-w-lg" />
                </div>
                <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
                    {[1, 2].map(i => (
                        <div key={i} className="flex flex-col md:flex-row gap-12 text-center md:text-left items-center">
                            <Skeleton className="w-full md:w-1/2 h-64 rounded-3xl" />
                            <div className="w-full md:w-1/2 space-y-4">
                                <Skeleton className="h-10 w-3/4" />
                                <Skeleton className="h-24 w-full" />
                                <Skeleton className="h-40 w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            <ServicesHero />

            <div className="relative z-10 bg-white shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.15)] rounded-t-[3rem] md:rounded-t-[5rem] -mt-12 md:-mt-16 min-h-screen">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-32 space-y-32">
                    {services.map((service, index) => {
                        const Icon = getIconComponent(service.icon_name);
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: getEntranceOffset(100, 50) }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className={`flex flex-col md:flex-row gap-16 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="flex-1">
                                    <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-700 mb-6">
                                        <Icon size={32} />
                                    </div>
                                    <h2 className="text-3xl font-bold font-display text-slate-900 mb-6">{service.title}</h2>
                                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                        {service.description}
                                    </p>
                                    <Button variant="outline" className="gap-2">
                                        Request Consultation <ChevronRight className="w-4 h-4" />
                                    </Button>
                                    <ul className="space-y-3 mt-6">
                                        {(service.features || []).map((feature, i) => (
                                            <li key={i} className="flex items-center text-slate-600">
                                                <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-3" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex-1 w-full">
                                    <div className="aspect-[4/3] rounded-3xl bg-slate-100 border border-slate-200 shadow-xl overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/10 to-brand-500/10 opacity-50"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Icon size={120} className="text-slate-200/50" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="py-24">
                    <section className="relative overflow-hidden rounded-[5rem] mx-6 md:mx-12 lg:mx-24 mb-24 bg-brand-950 py-32 text-center">
                        {/* Grainy Gradient Background - FULL WIDTH of the rounded card */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-500/10 rounded-full blur-[80px] mix-blend-screen pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

                        <div className="max-w-7xl mx-auto px-6 relative z-10">
                            <h2 className="text-4xl font-bold mb-6 text-white font-display">Ready to Transform Your Infrastructure?</h2>
                            <p className="text-brand-100/90 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                                Contact our team today to discuss how our services can align with your organizational goals.
                            </p>
                            <Button variant="secondary" size="lg" onClick={() => (window.location.href = '/#contact')} className="px-12 py-5 rounded-3xl shadow-2xl">
                                Get in Touch <ChevronRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
