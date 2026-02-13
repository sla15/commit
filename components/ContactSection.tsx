import React from 'react';
import { CONTACT_INFO } from '../constants';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ContactSection: React.FC = () => {
    return (
        <footer id="contact" className="relative bg-brand-950 pt-16 pb-8 overflow-hidden border-t border-brand-900 text-brand-100/80">
            {/* Grainy Gradient Background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-600/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-500/10 rounded-full blur-[80px] mix-blend-screen pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <img
                                src="/favicon.png"
                                alt="CommIT Enterprise"
                                className="h-12 w-auto object-contain  opacity-90"
                            />
                        </div>
                        <p className="text-brand-200/70 max-w-sm mb-8 leading-relaxed">
                            Your trusted partner for ICT solutions and project advisory in The Gambia and beyond. Driving digital transformation with integrity.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-white mb-6 text-lg">Quick Links</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/" className="text-brand-200/70 hover:text-brand-400 transition-colors">Overview</Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-brand-200/70 hover:text-brand-400 transition-colors">Services</Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-brand-200/70 hover:text-brand-400 transition-colors">About Us</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-brand-200/70 hover:text-brand-400 transition-colors">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-white mb-6 text-lg">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-brand-200/70">
                                <MapPin className="w-5 h-5 text-brand-500 shrink-0 mt-1" />
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_INFO.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-brand-400 transition-colors"
                                >
                                    {CONTACT_INFO.address}
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-brand-200/70">
                                <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                                <a href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-brand-400 transition-colors">
                                    {CONTACT_INFO.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-brand-200/70">
                                <Mail className="w-5 h-5 text-brand-500 shrink-0" />
                                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-brand-400 transition-colors">{CONTACT_INFO.email}</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-brand-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-brand-200/50 text-sm">
                        &copy; {new Date().getFullYear()} CommIT Enterprise. All rights reserved.
                    </p>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors"
                    >
                        Back to Top <ArrowUp className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </footer>
    );
};