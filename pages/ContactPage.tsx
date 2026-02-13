import React, { useState } from 'react';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { CONTACT_INFO } from '../constants';
import { Mail, Phone, MapPin, MessageSquare, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getEntranceOffset } from '../utils/animationHelpers';
import { supabase } from '../utils/supabaseClient';

export const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            console.log('Sending data:', formData);
            const { data, error } = await supabase.functions.invoke('send-contact-email', {
                body: formData
            });

            if (error) throw error;

            setSuccess(true);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                subject: 'General Inquiry',
                message: ''
            });
        } catch (err: any) {
            console.error('Error sending email:', err);
            setError(err.message || 'Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Header Section */}
            <section className="sticky top-0 h-[60vh] z-0 bg-brand-950 flex flex-col items-center justify-center text-center overflow-hidden pt-20">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/30 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-500/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full relative z-10 pt-10">
                    <div className="max-w-4xl mx-auto">
                        <span className="text-brand-300 font-semibold tracking-wider uppercase text-sm mb-4 block">
                            Get in Touch
                        </span>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
                            Let's Discuss Your Project
                        </h1>
                        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                            Whether you need strategic advisory, infrastructure procurement, or a partnership framework, our team is ready to assist.
                        </p>
                    </div>
                </div>
            </section>

            <Section className="relative z-10 bg-white shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.15)] rounded-t-[5rem] -mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                    {/* Contact Info Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20, y: getEntranceOffset(80, 0) }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 h-fit"
                    >
                        <h3 className="text-2xl font-bold text-slate-900 mb-8 font-display">Contact Information</h3>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">Our Office</h4>
                                    <p className="text-slate-600 leading-relaxed">{CONTACT_INFO.address}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">Phone</h4>
                                    <p className="text-slate-600">{CONTACT_INFO.phone}</p>
                                    <p className="text-sm text-slate-400 mt-1">Available Mon-Fri, 9am-5pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">Email</h4>
                                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-slate-600 hover:text-brand-600 transition-colors">
                                        {CONTACT_INFO.email}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Map */}
                        <div className="mt-12 rounded-2xl overflow-hidden h-64 shadow-inner border border-slate-200">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3881.238293236072!2d-16.717278888921857!3d13.397566205341013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec29935733710e3%3A0xb60468aaf09169ae!2sCommIT!5e0!3m2!1sen!2sgm!4v1769715366131!5m2!1sen!2sgm"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="CommIT Enterprise Location"
                            ></iframe>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: getEntranceOffset(80, 20) }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-brand-50 rounded-full text-brand-600">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 font-display">Send us a Message</h3>
                                <p className="text-slate-500">We usually respond within 24 hours.</p>
                            </div>
                        </div>

                        {success ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800">Message Sent!</h3>
                                <p className="text-slate-600 max-w-md">
                                    Thank you for contacting us. We have received your message and will get back to you shortly.
                                </p>
                                <Button onClick={() => setSuccess(false)} variant="outline" className="mt-6">
                                    Send Another Message
                                </Button>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3">
                                        <AlertCircle size={20} />
                                        <p>{error}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">First Name</label>
                                        <input
                                            name="firstName"
                                            type="text"
                                            required
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all duration-300"
                                            placeholder="Jane"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Last Name</label>
                                        <input
                                            name="lastName"
                                            type="text"
                                            required
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all duration-300"
                                            placeholder="Cooper"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Email Address</label>
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all duration-300"
                                            placeholder="jane@example.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Phone Number (Optional)</label>
                                        <input
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all duration-300"
                                            placeholder="+220 ..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Subject</label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all duration-300 text-slate-600"
                                    >
                                        <option>General Inquiry</option>
                                        <option>ICT Supply & Infrastructure</option>
                                        <option>Project Consulting</option>
                                        <option>Public-Private Partnership</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Message</label>
                                    <textarea
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={6}
                                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all duration-300 resize-none"
                                        placeholder="Tell us about your project requirements..."
                                    ></textarea>
                                </div>

                                <div className="pt-4">
                                    <Button disabled={loading} className="w-full md:w-auto px-10 gap-2">
                                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Send Message'}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </div>
            </Section>
        </div>
    );
};