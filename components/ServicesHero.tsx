import React from 'react';

export const ServicesHero: React.FC = () => {
    return (
        <div className="sticky top-0 h-[50vh] z-0 flex flex-col items-center justify-center text-center bg-brand-950 overflow-hidden pt-20">
            {/* Grainy Gradient Background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/30 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-500/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full relative z-10 pt-10">
                <div className="max-w-4xl mx-auto">
                    <span className="text-brand-300 font-semibold tracking-wider uppercase text-sm mb-4 block">
                        Our Expertise
                    </span>
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
                        Our Services
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                        CommIT Enterprise delivers end-to-end technology solutions. From infrastructure to advisory, we bridge the gap between complex requirements and sustainable implementation.
                    </p>
                </div>
            </div>
        </div>
    );
};
