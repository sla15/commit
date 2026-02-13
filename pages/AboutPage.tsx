import React, { useEffect, useState } from 'react';
import { Section } from '../components/ui/Section';
import { VALUES, COMPANY_INFO } from '../constants';
import { motion, Variants } from 'framer-motion';
import { Linkedin, Twitter, Mail, Facebook } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import { Skeleton } from '../components/ui/Skeleton';
import { AboutHero } from '../components/AboutHero';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  linkedin_url?: string;
  twitter_url?: string;
  facebook_url?: string;
  email?: string;
  display_order: number;
}

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  display_order: number;
}

interface OurStory {
  heading: string;
  subheading: string;
  paragraph_1: string;
  paragraph_2: string;
  paragraph_3: string;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const AboutPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [ourStory, setOurStory] = useState<OurStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamRes, timelineRes, storyRes] = await Promise.all([
          supabase.from('team_members').select('*').order('display_order', { ascending: true }),
          supabase.from('timeline_events').select('*').order('year', { ascending: true }),
          supabase.from('our_story').select('*').single()
        ]);

        if (teamRes.error) throw teamRes.error;
        if (timelineRes.error) throw timelineRes.error;

        setTeamMembers(teamRes.data || []);
        setTimelineEvents(timelineRes.data || []);
        setOurStory(storyRes.data || null);

      } catch (error) {
        console.error('Error fetching about page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="pt-20">
        <div className="h-[60vh] flex flex-col items-center justify-center bg-slate-50 space-y-6">
          <Skeleton className="h-20 w-3/4 max-w-2xl" />
          <Skeleton className="h-6 w-1/2 max-w-xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-4">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-40 w-full" />
          </div>
          <div className="space-y-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-6">
                <Skeleton className="w-20 h-20 rounded-2xl flex-shrink-0" />
                <Skeleton className="h-20 w-full rounded-2xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AboutHero />

      {/* Content Wrapper (Relative to scroll over hero) */}
      <div className="relative z-10 bg-white shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.15)] rounded-t-[3rem] md:rounded-t-[5rem] -mt-12 md:-mt-16">

        {/* Our Story */}
        <Section bg="white" className="rounded-t-[5rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.h2 variants={fadeInUp} className="text-brand-600 font-bold uppercase tracking-widest text-sm">
                {ourStory?.heading || "Our Story"}
              </motion.h2>
              <motion.h3 variants={fadeInUp} className="text-3xl md:text-4xl font-display font-bold text-slate-900">
                {ourStory?.subheading || "From Local Roots to Regional Impact"}
              </motion.h3>
              <motion.div variants={fadeInUp} className="prose prose-lg text-slate-600">
                <p>{ourStory?.paragraph_1 || "CommIT Enterprise began with a vision to bridge the digital divide..."}</p>
                {ourStory?.paragraph_2 && <p>{ourStory.paragraph_2}</p>}
                {ourStory?.paragraph_3 && <p>{ourStory.paragraph_3}</p>}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative pl-4"
            >
              {/* Timeline - New Design */}
              <div className="absolute left-[3.5rem] top-8 bottom-8 w-0.5 bg-brand-100 hidden md:block" />
              <div className="space-y-10">
                {(timelineEvents.length > 0 ? timelineEvents : [
                  { id: '1', year: '2018', title: 'Founded with a mission to serve the public sector.', display_order: 1 },
                  { id: '2', year: '2020', title: 'Expanded operations to include strategic consulting.', display_order: 2 },
                  { id: '3', year: '2023', title: 'Recognized as a leading ICT provider in the region.', display_order: 3 }
                ]).map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col md:flex-row gap-6 group relative"
                  >
                    <div className="flex-shrink-0 z-10 mx-auto md:mx-0">
                      <div className="w-20 h-20 bg-brand-950 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg group-hover:scale-105 group-hover:bg-brand-600 transition-all duration-300 border-4 border-white">
                        {event.year}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 group-hover:shadow-md transition-shadow relative">
                        {/* Arrow for desktop */}
                        <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 bg-white border-l border-b border-slate-100 transform rotate-45 hidden md:block"></div>
                        <h4 className="text-lg md:text-xl font-medium text-slate-800 leading-relaxed relative z-10">{event.title}</h4>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Mission & Values (Combined Split Section) */}
        <Section bg="light">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column: Mission & Vision */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4">Our Mission & Vision</h2>
                <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-8">
                  Driving Sustainable Growth
                </h3>
                <div className="space-y-8">
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <h4 className="text-xl font-bold text-brand-700 mb-3">Our Mission</h4>
                    <p className="text-slate-600 text-lg leading-relaxed">{COMPANY_INFO.mission}</p>
                  </div>
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <h4 className="text-xl font-bold text-brand-700 mb-3">Our Vision</h4>
                    <p className="text-slate-600 text-lg leading-relaxed">{COMPANY_INFO.vision}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Core Values */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-brand-950 p-10 md:p-14 rounded-[3rem] text-white overflow-hidden relative"
            >
              {/* Grainy Gradient Background */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/30 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-500/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

              <h3 className="text-3xl font-display font-bold mb-10 relative z-10">Our Core Values</h3>
              <div className="space-y-8 relative z-10">
                {VALUES.map((value, index) => (
                  <div key={value.title} className="flex gap-5 group">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-300 flex-shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                      <value.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                      <p className="text-brand-100/80 text-sm leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Team Section with Flip Cards */}
        <Section bg="white" className="rounded-b-[5rem]">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4">Leadership</h2>
            <h3 className="text-4xl font-display font-bold text-slate-900 mb-6">Meet the Team</h3>
            <p className="text-xl text-slate-600 leading-relaxed">
              Our diverse team of experts brings together decades of experience in technology, strategy, and project management to deliver exceptional results for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="group w-full h-[450px] [perspective:1000px] cursor-pointer"
                onMouseEnter={() => { if (window.matchMedia('(hover: hover)').matches) setActiveCardId(member.id); }}
                onMouseLeave={() => { if (window.matchMedia('(hover: hover)').matches) setActiveCardId(null); }}
                onClick={() => { if (!window.matchMedia('(hover: hover)').matches) setActiveCardId(activeCardId === member.id ? null : member.id); }}
              >
                <div className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${activeCardId === member.id ? '[transform:rotateY(180deg)]' : ''}`}>

                  {/* Front Side */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 bg-white">
                    <div className="h-full flex flex-col">
                      <div className="flex-grow relative bg-slate-200 overflow-hidden">
                        {member.image_url ? (
                          <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                            <span className="text-6xl font-display font-bold opacity-20">{member.name.charAt(0)}</span>
                          </div>
                        )}
                        {/* Brand Overlay */}
                        <div className="absolute inset-0 bg-brand-900/40 mix-blend-multiply"></div>
                        {/* Gradient overlay for text readability at bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                        <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                          <h4 className="text-2xl font-bold mb-1">{member.name}</h4>
                          <p className="text-brand-300 font-medium uppercase tracking-wide text-sm">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-[2rem] overflow-hidden bg-brand-950 text-white p-10 flex flex-col justify-center text-center shadow-xl">
                    <div className="w-20 h-20 mx-auto bg-brand-600 rounded-full flex items-center justify-center mb-6 text-3xl font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <h4 className="text-2xl font-bold mb-2">{member.name}</h4>
                    <p className="text-brand-400 font-medium mb-6 uppercase text-sm tracking-widest">{member.role}</p>
                    <p className="text-slate-300 leading-relaxed mb-8 text-sm line-clamp-5">
                      {member.bio}
                    </p>

                    <div className="flex justify-center gap-4 mt-auto">
                      {member.linkedin_url && (
                        <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-500 transition-colors">
                          <Linkedin size={18} />
                        </a>
                      )}
                      {member.twitter_url && (
                        <a href={member.twitter_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-500 transition-colors">
                          <Twitter size={18} />
                        </a>
                      )}
                      {member.facebook_url && (
                        <a href={member.facebook_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-500 transition-colors">
                          <Facebook size={18} />
                        </a>
                      )}
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-500 transition-colors">
                          <Mail size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
};