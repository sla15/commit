import { Network } from 'lucide-react';
import { ICON_OPTIONS } from '../components/admin/IconSelector';

// Helper to get icon component by name
export const getIconComponent = (name: string) => {
    const found = ICON_OPTIONS.find(opt => opt.name === name);
    return found ? found.icon : Network;
};
