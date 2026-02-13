import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ValueItem {
  id: string;
  title: string;
  description?: string;
  icon: LucideIcon;
}

export interface NavItem {
  label: string;
  href: string;
}