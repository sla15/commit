import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { Button } from '../../components/ui/Button';
import { Loader2, Save } from 'lucide-react';

interface OurStory {
    id: string;
    heading: string;
    subheading: string;
    paragraph_1: string;
    paragraph_2: string;
    paragraph_3: string;
}

export const OurStoryManager: React.FC = () => {
    const [data, setData] = useState<Partial<OurStory>>({});
    const [loading, setLoading] = useState(true);
    const [saveLoading, setSaveLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data: storyData, error } = await supabase
                .from('our_story')
                .select('*')
                .single();

            if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "Row not found"

            if (storyData) {
                setData(storyData);
            } else {
                // Initialize default data if none exists
                setData({
                    heading: "Our Story",
                    subheading: "From Local Roots to Regional Impact",
                    paragraph_1: "CommIT Enterprise began as a small consultancy in Banjul...",
                    paragraph_2: "",
                    paragraph_3: ""
                });
            }
        } catch (error) {
            console.error('Error fetching story:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaveLoading(true);
        setMessage(null);

        try {
            if (data.id) {
                // Update
                const { error } = await supabase
                    .from('our_story')
                    .update({
                        heading: data.heading,
                        subheading: data.subheading,
                        paragraph_1: data.paragraph_1,
                        paragraph_2: data.paragraph_2,
                        paragraph_3: data.paragraph_3,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', data.id);

                if (error) throw error;
            } else {
                // Create first record
                const { error, data: newData } = await supabase
                    .from('our_story')
                    .insert([{
                        heading: data.heading,
                        subheading: data.subheading,
                        paragraph_1: data.paragraph_1,
                        paragraph_2: data.paragraph_2,
                        paragraph_3: data.paragraph_3
                    }])
                    .select()
                    .single();

                if (error) throw error;
                if (newData) setData(newData);
            }

            setMessage({ type: 'success', text: 'Content saved successfully!' });
        } catch (error) {
            console.error('Error saving story:', error);
            setMessage({ type: 'error', text: 'Failed to save content.' });
        } finally {
            setSaveLoading(false);
        }
    };

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-brand-500" /></div>;

    return (
        <div className="max-w-3xl">
            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-slate-900">Our Story</h1>
                <p className="text-slate-500">Edit the company history and mission text</p>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-xl text-sm border ${message.type === 'success' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
                    }`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Section Heading</label>
                    <input
                        type="text"
                        required
                        value={data.heading || ''}
                        onChange={e => setData({ ...data, heading: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
                        placeholder="e.g., Our Story"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Main Headline</label>
                    <input
                        type="text"
                        required
                        value={data.subheading || ''}
                        onChange={e => setData({ ...data, subheading: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 outline-none font-bold"
                        placeholder="e.g., From Local Roots to Regional Impact"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Paragraph 1</label>
                    <textarea
                        required
                        rows={4}
                        value={data.paragraph_1 || ''}
                        onChange={e => setData({ ...data, paragraph_1: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 outline-none resize-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Paragraph 2</label>
                    <textarea
                        rows={4}
                        value={data.paragraph_2 || ''}
                        onChange={e => setData({ ...data, paragraph_2: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 outline-none resize-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Paragraph 3 (Optional)</label>
                    <textarea
                        rows={4}
                        value={data.paragraph_3 || ''}
                        onChange={e => setData({ ...data, paragraph_3: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 outline-none resize-none"
                    />
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <Button type="submit" disabled={saveLoading} className="gap-2">
                        {saveLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        Save Content
                    </Button>
                </div>
            </form>
        </div>
    );
};
