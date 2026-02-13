import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { Button } from '../../components/ui/Button';
import { Plus, Trash2, Edit2, Loader2, Save, X, History } from 'lucide-react';

interface TimelineEvent {
    id: string;
    year: string;
    title: string;
    display_order: number;
}

export const TimelineManager: React.FC = () => {
    const [events, setEvents] = useState<TimelineEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<TimelineEvent>>({});
    const [saveLoading, setSaveLoading] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const { data, error } = await supabase
                .from('timeline_events')
                .select('*')
                .order('year', { ascending: true }); // Often chronological, but could use display_order

            if (error) throw error;
            setEvents(data || []);
        } catch (error) {
            console.error('Error fetching timeline events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item: TimelineEvent) => {
        setCurrentItem(item);
        setIsEditing(true);
    };

    const handleCreate = () => {
        setCurrentItem({
            year: new Date().getFullYear().toString(),
            title: '',
            display_order: events.length + 1
        });
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;

        try {
            const { error } = await supabase.from('timeline_events').delete().eq('id', id);
            if (error) throw error;
            setEvents(events.filter(e => e.id !== id));
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Failed to delete event');
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaveLoading(true);

        try {
            if (currentItem.id) {
                // Update
                const { error } = await supabase
                    .from('timeline_events')
                    .update({
                        year: currentItem.year,
                        title: currentItem.title,
                        display_order: currentItem.display_order
                    })
                    .eq('id', currentItem.id);

                if (error) throw error;
            } else {
                // Create
                const { error } = await supabase
                    .from('timeline_events')
                    .insert([{
                        year: currentItem.year,
                        title: currentItem.title,
                        display_order: currentItem.display_order
                    }]);

                if (error) throw error;
            }

            await fetchEvents();
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving event:', error);
            alert('Failed to save event');
        } finally {
            setSaveLoading(false);
        }
    };

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-brand-500" /></div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900">Company Timeline</h1>
                    <p className="text-slate-500">Manage history and milestones</p>
                </div>
                <Button onClick={handleCreate} className="gap-2">
                    <Plus size={20} /> Add Event
                </Button>
            </div>

            {isEditing ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 max-w-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">{currentItem.id ? 'Edit Event' : 'New Event'}</h2>
                        <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSave} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Year</label>
                            <input
                                type="text"
                                required
                                value={currentItem.year || ''}
                                onChange={e => setCurrentItem({ ...currentItem, year: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
                                placeholder="2010"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Title / Milestone</label>
                            <input
                                type="text"
                                required
                                value={currentItem.title || ''}
                                onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
                                placeholder="Founded in Banjul..."
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

                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                            <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                            <Button type="submit" disabled={saveLoading} className="gap-2">
                                {saveLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="space-y-4">
                    {events.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-6 group hover:border-brand-200 transition-all">
                            <div className="w-16 h-16 bg-brand-900 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md shrink-0">
                                {item.year}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {events.length === 0 && (
                        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                            <p className="text-slate-500 mb-4">No timeline events found.</p>
                            <Button onClick={handleCreate} variant="outline">Create Event</Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
