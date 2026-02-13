import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { Button } from '../../components/ui/Button';
import { Plus, Trash2, Edit2, Loader2, Save, X, Linkedin, Twitter, Facebook, Mail } from 'lucide-react';
import { ImageUpload } from '../../components/admin/ImageUpload';

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

export const TeamManager: React.FC = () => {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<TeamMember>>({});
    const [saveLoading, setSaveLoading] = useState(false);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const { data, error } = await supabase
                .from('team_members')
                .select('*')
                .order('display_order', { ascending: true });

            if (error) throw error;
            setMembers(data || []);
        } catch (error) {
            console.error('Error fetching team members:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item: TeamMember) => {
        setCurrentItem(item);
        setIsEditing(true);
    };

    const handleCreate = () => {
        setCurrentItem({
            name: '',
            role: '',
            bio: '',
            image_url: '',
            display_order: members.length + 1
        });
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this team member?')) return;

        try {
            const { error } = await supabase.from('team_members').delete().eq('id', id);
            if (error) throw error;
            setMembers(members.filter(m => m.id !== id));
        } catch (error) {
            console.error('Error deleting team member:', error);
            alert('Failed to delete team member');
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaveLoading(true);

        try {
            const memberData = {
                name: currentItem.name,
                role: currentItem.role,
                bio: currentItem.bio,
                image_url: currentItem.image_url,
                linkedin_url: currentItem.linkedin_url || null,
                twitter_url: currentItem.twitter_url || null,
                facebook_url: currentItem.facebook_url || null,
                email: currentItem.email || null,
                display_order: currentItem.display_order
            };

            if (currentItem.id) {
                // Update
                const { error } = await supabase
                    .from('team_members')
                    .update(memberData)
                    .eq('id', currentItem.id);

                if (error) throw error;
            } else {
                // Create
                const { error } = await supabase
                    .from('team_members')
                    .insert([memberData]);

                if (error) throw error;
            }

            await fetchMembers();
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving team member:', error);
            alert('Failed to save team member');
        } finally {
            setSaveLoading(false);
        }
    };

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-brand-500" /></div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900">Team Members</h1>
                    <p className="text-slate-500">Manage your team profiles</p>
                </div>
                <Button onClick={handleCreate} className="gap-2">
                    <Plus size={20} /> Add Member
                </Button>
            </div>

            {isEditing ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 max-w-4xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">{currentItem.id ? 'Edit Team Member' : 'New Team Member'}</h2>
                        <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Profile Photo</label>
                                <ImageUpload
                                    bucket="team-photos"
                                    currentImage={currentItem.image_url}
                                    onUpload={(url) => setCurrentItem({ ...currentItem, image_url: url })}
                                    onRemove={() => setCurrentItem({ ...currentItem, image_url: '' })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={currentItem.name || ''}
                                    onChange={e => setCurrentItem({ ...currentItem, name: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
                                    placeholder="e.g., Jane Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Role / Title</label>
                                <input
                                    type="text"
                                    required
                                    value={currentItem.role || ''}
                                    onChange={e => setCurrentItem({ ...currentItem, role: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
                                    placeholder="e.g., Senior Engineer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Short Bio</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={currentItem.bio || ''}
                                    onChange={e => setCurrentItem({ ...currentItem, bio: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 outline-none resize-none"
                                    placeholder="Brief description of experience and expertise..."
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Social Links & Contact</h3>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                    <Linkedin size={16} className="text-[#0077b5]" /> LinkedIn URL
                                </label>
                                <input
                                    type="url"
                                    value={currentItem.linkedin_url || ''}
                                    onChange={e => setCurrentItem({ ...currentItem, linkedin_url: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
                                    placeholder="https://linkedin.com/in/..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                    <Twitter size={16} className="text-[#1da1f2]" /> Twitter URL
                                </label>
                                <input
                                    type="url"
                                    value={currentItem.twitter_url || ''}
                                    onChange={e => setCurrentItem({ ...currentItem, twitter_url: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
                                    placeholder="https://twitter.com/..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                    <Facebook size={16} className="text-[#1877f2]" /> Facebook URL
                                </label>
                                <input
                                    type="url"
                                    value={currentItem.facebook_url || ''}
                                    onChange={e => setCurrentItem({ ...currentItem, facebook_url: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
                                    placeholder="https://facebook.com/..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                    <Mail size={16} className="text-slate-600" /> Email Address
                                </label>
                                <input
                                    type="email"
                                    value={currentItem.email || ''}
                                    onChange={e => setCurrentItem({ ...currentItem, email: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
                                    placeholder="mailto:..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Display Order</label>
                                <input
                                    type="number"
                                    required
                                    value={currentItem.display_order || 0}
                                    onChange={e => setCurrentItem({ ...currentItem, display_order: parseInt(e.target.value) })}
                                    className="w-32 px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2 flex justify-end gap-3 pt-6 border-t border-slate-100">
                            <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                            <Button type="submit" disabled={saveLoading} className="gap-2">
                                {saveLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                Save Member
                            </Button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {members.map((member) => (
                        <div key={member.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-all">
                            <div className="h-48 bg-slate-100 relative">
                                {member.image_url ? (
                                    <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <Plus size={48} />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(member)}
                                        className="p-2 bg-white/90 text-slate-600 hover:text-brand-600 rounded-lg shadow-sm"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(member.id)}
                                        className="p-2 bg-white/90 text-slate-600 hover:text-red-600 rounded-lg shadow-sm"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-lg text-slate-900">{member.name}</h3>
                                <p className="text-brand-600 text-sm font-medium uppercase tracking-wide mb-3">{member.role}</p>
                                <p className="text-slate-500 text-sm line-clamp-3 mb-4">{member.bio}</p>

                                <div className="flex gap-2">
                                    {member.linkedin_url && <Linkedin size={16} className="text-slate-400" />}
                                    {member.twitter_url && <Twitter size={16} className="text-slate-400" />}
                                    {member.facebook_url && <Facebook size={16} className="text-slate-400" />}
                                    {member.email && <Mail size={16} className="text-slate-400" />}
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={handleCreate}
                        className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 hover:border-brand-300 hover:bg-brand-50 transition-all group min-h-[300px]"
                    >
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-brand-500 shadow-sm mb-4 transition-colors">
                            <Plus size={32} />
                        </div>
                        <span className="font-bold text-slate-600 group-hover:text-brand-700">Add Team Member</span>
                    </button>
                </div>
            )}
        </div>
    );
};
