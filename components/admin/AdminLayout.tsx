import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import {
    LayoutDashboard,
    Briefcase,
    Users,
    History,
    MessageSquare,
    BookOpen,
    LogOut,
    Menu,
    X,
    Settings
} from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            navigate('/commIT/login');
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    const menuItems = [
        { path: '/commIT/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/commIT/services', icon: Briefcase, label: 'Services' },
        { path: '/commIT/team', icon: Users, label: 'Team Members' },
        { path: '/commIT/testimonials', icon: MessageSquare, label: 'Testimonials' },
        { path: '/commIT/timeline', icon: History, label: 'Timeline' },
        { path: '/commIT/our-story', icon: BookOpen, label: 'Our Story' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-brand-950 text-white transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <div className="p-6 border-b border-brand-900 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-3 group">
                        <img
                            src="/favicon.png"
                            alt="/commit"
                            className="h-8 w-auto object-contain"
                        />
                        <span className="text-xl font-bold font-display tracking-tight text-white italic">
                            /commit
                        </span>
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-brand-200 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-brand-800 text-white shadow-lg shadow-brand-900/20'
                                    : 'text-brand-100/70 hover:bg-brand-900 hover:text-white'
                                    }`}
                            >
                                <item.icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}

                    <div className="pt-8 mt-8 border-t border-brand-900">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-950/30 transition-colors"
                        >
                            <LogOut size={20} />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 relative">
                <div className="lg:hidden p-4 sticky top-0 z-30 bg-slate-50/80 backdrop-blur-md">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 text-slate-600 hover:bg-slate-200 rounded-lg"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
