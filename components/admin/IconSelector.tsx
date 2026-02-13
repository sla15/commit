import React from 'react';
import {
    Network,
    Briefcase,
    ShoppingCart,
    Users,
    Server,
    Database,
    Shield,
    Cloud,
    Code,
    Smartphone,
    Globe,
    Wifi,
    Cpu,
    Monitor
} from 'lucide-react';

export const ICON_OPTIONS = [
    { name: 'Network', icon: Network },
    { name: 'Briefcase', icon: Briefcase },
    { name: 'ShoppingCart', icon: ShoppingCart },
    { name: 'Users', icon: Users },
    { name: 'Server', icon: Server },
    { name: 'Database', icon: Database },
    { name: 'Shield', icon: Shield },
    { name: 'Cloud', icon: Cloud },
    { name: 'Code', icon: Code },
    { name: 'Smartphone', icon: Smartphone },
    { name: 'Globe', icon: Globe },
    { name: 'Wifi', icon: Wifi },
    { name: 'Cpu', icon: Cpu },
    { name: 'Monitor', icon: Monitor },
];

interface IconSelectorProps {
    selectedIcon: string;
    onSelect: (iconName: string) => void;
}

export const IconSelector: React.FC<IconSelectorProps> = ({ selectedIcon, onSelect }) => {
    return (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {ICON_OPTIONS.map((item) => (
                <button
                    key={item.name}
                    type="button"
                    onClick={() => onSelect(item.name)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${selectedIcon === item.name
                            ? 'bg-brand-50 border-brand-500 text-brand-600 ring-2 ring-brand-200'
                            : 'border-slate-200 hover:border-brand-200 hover:bg-slate-50 text-slate-600'
                        }`}
                >
                    <item.icon size={24} />
                    <span className="text-xs font-medium truncate w-full text-center">{item.name}</span>
                </button>
            ))}
        </div>
    );
};
