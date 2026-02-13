import React from 'react';
import { Link } from 'react-router-dom';
import {
    Briefcase,
    Users,
    MessageSquare,
    History,
    BookOpen,
    ArrowRight
} from 'lucide-react';

interface DashboardCardProps {
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    path: string;
}

export const AdminDashboard: React.FC = () => {
    const cards = [
        {
            title: 'Services',
            description: 'Manage service offerings and descriptions',
            icon: Briefcase,
            bgClass: 'bg-blue-50',
            textClass: 'text-blue-600',
            path: '/admin/services'
        },
        {
            title: 'Team Members',
            description: 'Update team profiles and photos',
            icon: Users,
            bgClass: 'bg-emerald-50',
            textClass: 'text-emerald-600',
            path: '/admin/team'
        },
        {
            title: 'Testimonials',
            description: 'Manage client reviews and ratings',
            icon: MessageSquare,
            bgClass: 'bg-amber-50',
            textClass: 'text-amber-600',
            path: '/admin/testimonials'
        },
        {
            title: 'Timeline',
            description: 'Update company history and milestones',
            icon: History,
            bgClass: 'bg-purple-50',
            textClass: 'text-purple-600',
            path: '/admin/timeline'
        },
        {
            title: 'Our Story',
            description: 'Edit company mission and vision text',
            icon: BookOpen,
            bgClass: 'bg-rose-50',
            textClass: 'text-rose-600',
            path: '/admin/our-story'
        }
    ];

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-500 mt-2">Welcome back. Select a section to manage content.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card) => (
                    <Link
                        key={card.path}
                        to={card.path}
                        className="block bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className={`p-3 rounded-xl ${card.bgClass} ${card.textClass}`}>
                                <card.icon size={24} />
                            </div>
                            <div className="p-2 rounded-full bg-slate-50 text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                                <ArrowRight size={20} />
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{card.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};
