import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

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

interface Service {
    id: string;
    title: string;
    description: string;
    icon_name: string;
    features: string[];
}

interface Testimonial {
    id: string;
    quote: string;
    author: string;
    role: string;
    rating: number;
}

interface DataContextType {
    teamMembers: TeamMember[];
    timelineEvents: TimelineEvent[];
    ourStory: OurStory | null;
    services: Service[];
    testimonials: Testimonial[];
    loading: boolean;
    refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
    const [ourStory, setOurStory] = useState<OurStory | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [teamRes, timelineRes, storyRes, servicesRes, testimonialsRes] = await Promise.all([
                supabase.from('team_members').select('*').order('display_order', { ascending: true }),
                supabase.from('timeline_events').select('*').order('year', { ascending: true }),
                supabase.from('our_story').select('*').single(),
                supabase.from('services').select('*').order('display_order', { ascending: true }),
                supabase.from('testimonials').select('*').order('display_order', { ascending: true })
            ]);

            if (teamRes.data) setTeamMembers(teamRes.data);
            if (timelineRes.data) setTimelineEvents(timelineRes.data);
            if (storyRes.data) setOurStory(storyRes.data);
            if (servicesRes.data) setServices(servicesRes.data);
            if (testimonialsRes.data) setTestimonials(testimonialsRes.data);

        } catch (error) {
            console.error('Error fetching global data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{
            teamMembers,
            timelineEvents,
            ourStory,
            services,
            testimonials,
            loading,
            refreshData: fetchData
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
