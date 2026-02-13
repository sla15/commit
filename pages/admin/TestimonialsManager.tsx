import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { Button } from '../../components/ui/Button';
import { Plus, Trash2, Edit2, Loader2, Save, X, Star } from 'lucide-react';

interface Testimonial {
    id: string;
    quote: string;
    author: string;
    role: string;
    rating: number;
    display_order: number;
}

export const TestimonialsManager: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<Testimonial>>({});
    const [saveLoading, setSaveLoading] = useState(false);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .order('display_order', { ascending: true });

            if (error) throw error;
            setTestimonials(data || []);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item: Testimonial) => {
        setCurrentItem(item);
        setIsEditing(true);
    };

    const handleCreate = () => {
        setCurrentItem({
            quote: '',
            author: '',
            role: '',
            rating: 5,
            display_order: testimonials.length + 1
        });
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this testimonial?')) return;

        try {
            const { error } = await supabase.from('testimonials').delete().eq('id', id);
            if (error) throw error;
            setTestimonials(testimonials.filter(t => t.id !== id));
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            alert('Failed to delete testimonial');
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaveLoading(true);

        try {
            if (currentItem.id) {
                const { error } = await supabase
                    .from('testimonials')
                    .update({
                        quote: currentItem.quote,
                        author: currentItem.author,
                        role: currentItem.role,
                        rating: currentItem.rating,
                        display_order: currentItem.display_order
                    })
                    .eq('id', currentItem.id);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('testimonials')
                    .insert([{
                        quote: currentItem.quote,
                        author: currentItem.author,
                        role: currentItem.role,
                        rating: currentItem.rating,
                        display_order: currentItem.display_order
                    }]);

                if (error) throw error;
            }

            await fetchTestimonials();
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving testimonial:', error);
            alert('Failed to save testimonial');
        } finally {
            setSaveLoading(false);
        }
    };

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-brand-500" /></div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900">Testimonials</h1>
                    <p className="text-slate-500">Manage client reviews and ratings</p>
                </div>
                <Button onClick={handleCreate} className="gap-2">
                    <Plus size={20} /> Add Testimonial
                </Button>
            </div>

            {isEditing ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 max-w-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">{currentItem.id ? 'Edit Testimonial' : 'New Testimonial'}</h2>
                        <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSave} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Quote</label>
                            <textarea
                                required
                                rows={3}
                                value={currentItem.quote || ''}
                                onChange={e => setCurrentItem({ ...currentItem, quote: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 outline-none resize-none"
                                placeholder="Client feedback..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Author Name</label>
                                <input
                                    type="text"
                                    required
                                    value={currentItem.author || ''}
                                    onChange={e => setCurrentItem({ ...currentItem, author: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Role/Position</label>
                                <input
                                    type="text"
                                    required
                                    value={currentItem.role || ''}
                                    onChange={e => setCurrentItem({ ...currentItem, role: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
                                    placeholder="CEO, Example Corp"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Rating (1-5)</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setCurrentItem({ ...currentItem, rating: star })}
                                        className={`p-2 rounded-lg transition-colors ${(currentItem.rating || 0) >= star ? 'text-yellow-400' : 'text-slate-300'
                                            }`}
                                    >
                                        <Star size={24} fill={(currentItem.rating || 0) >= star ? "currentColor" : "none"} />
                                    </button>
                                ))}
                            </div>
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
                    {testimonials.map((item) => (
                        <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 group hover:border-brand-200 transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-1 text-yellow-400">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <Star key={i} size={16} fill="currentColor" />
                                    ))}
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
                            <p className="text-slate-600 italic mb-4">"{item.quote}"</p>
                            <div>
                                <p className="font-bold text-slate-900">{item.author}</p>
                                <p className="text-sm text-slate-500">{item.role}</p>
                            </div>
                        </div>
                    ))}

                    {testimonials.length === 0 && (
                        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                            <p className="text-slate-500 mb-4">No testimonials found.</p>
                            <Button onClick={handleCreate} variant="outline">Create Testimonial</Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
