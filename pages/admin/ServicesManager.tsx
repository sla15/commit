import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { Button } from '../../components/ui/Button';
import { Plus, Trash2, Edit2, Loader2, Save, X, Move } from 'lucide-react';
import { IconSelector, ICON_OPTIONS } from '../../components/admin/IconSelector';
import { Network } from 'lucide-react';
import { getIconComponent } from '../../utils/iconHelpers';

interface Service {
    id: string;
    title: string;
    description: string;
    icon_name: string;
    display_order: number;
}

export const ServicesManager: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentService, setCurrentService] = useState<Partial<Service>>({});
    const [saveLoading, setSaveLoading] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .order('display_order', { ascending: true });

            if (error) throw error;
            setServices(data || []);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (service: Service) => {
        setCurrentService(service);
        setIsEditing(true);
    };

    const handleCreate = () => {
        setCurrentService({
            title: '',
            description: '',
            icon_name: 'Network',
            display_order: services.length + 1
        });
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;

        try {
            const { error } = await supabase.from('services').delete().eq('id', id);
            if (error) throw error;
            setServices(services.filter(s => s.id !== id));
        } catch (error) {
            console.error('Error deleting service:', error);
            alert('Failed to delete service');
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaveLoading(true);

        try {
            if (currentService.id) {
                // Update
                const { error } = await supabase
                    .from('services')
                    .update({
                        title: currentService.title,
                        description: currentService.description,
                        icon_name: currentService.icon_name,
                        display_order: currentService.display_order
                    })
                    .eq('id', currentService.id);

                if (error) throw error;
            } else {
                // Create
                const { error } = await supabase
                    .from('services')
                    .insert([{
                        title: currentService.title,
                        description: currentService.description,
                        icon_name: currentService.icon_name,
                        display_order: currentService.display_order
                    }]);

                if (error) throw error;
            }

            await fetchServices();
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving service:', error);
            alert('Failed to save service');
        } finally {
            setSaveLoading(false);
        }
    };

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-brand-500" /></div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900">Services</h1>
                    <p className="text-slate-500">Manage your service offerings</p>
                </div>
                <Button onClick={handleCreate} className="gap-2">
                    <Plus size={20} /> Add Service
                </Button>
            </div>

            {isEditing ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 max-w-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">{currentService.id ? 'Edit Service' : 'New Service'}</h2>
                        <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSave} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Service Title</label>
                            <input
                                type="text"
                                required
                                value={currentService.title || ''}
                                onChange={e => setCurrentService({ ...currentService, title: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
                                placeholder="e.g., ICT Consulting"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                            <textarea
                                required
                                rows={4}
                                value={currentService.description || ''}
                                onChange={e => setCurrentService({ ...currentService, description: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 outline-none resize-none"
                                placeholder="Brief description of the service..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Icon</label>
                            <IconSelector
                                selectedIcon={currentService.icon_name || 'Network'}
                                onSelect={icon => setCurrentService({ ...currentService, icon_name: icon })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Display Order</label>
                            <input
                                type="number"
                                required
                                value={currentService.display_order || 0}
                                onChange={e => setCurrentService({ ...currentService, display_order: parseInt(e.target.value) })}
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
                <div className="grid grid-cols-1 gap-4">
                    {services.map((service) => {
                        const Icon = getIconComponent(service.icon_name);
                        return (
                            <div key={service.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 group hover:border-brand-200 transition-all">
                                <div className="p-3 bg-brand-50 text-brand-600 rounded-lg">
                                    <Icon size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-slate-900">{service.title}</h3>
                                    <p className="text-sm text-slate-500 line-clamp-1">{service.description}</p>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(service)}
                                        className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service.id)}
                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    {services.length === 0 && (
                        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                            <p className="text-slate-500 mb-4">No services found. Add your first service!</p>
                            <Button onClick={handleCreate} variant="outline">Create Service</Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
