import { Network, Briefcase, ShoppingCart, Users, Shield, Award, Lightbulb, CheckCircle, HeartHandshake } from 'lucide-react';
import { ServiceItem, ValueItem } from './types';

export const COMPANY_INFO = {
  name: "CommIT Enterprise",
  tagline: "Empowering Institutions Through Technology",
  overview: "CommIT Enterprise is a Gambian-based ICT and project consulting firm providing technology-driven solutions, infrastructure support, and advisory services to public and private sector clients. The enterprise focuses on delivering practical, scalable, and sustainable solutions aligned with national development priorities.",
  mission: "To empower institutions and businesses through reliable technology solutions and professional project advisory services that drive efficiency and sustainable growth.",
  vision: "To be a trusted ICT and project consulting partner contributing to digital transformation and infrastructure development in The Gambia and the sub-region.",
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'ict',
    title: "ICT & Telecommunications",
    description: "Supply and installation of fiber optic cables, networking equipment, and related telecom infrastructure.",
    icon: Network
  },
  {
    id: 'consulting',
    title: "Project Consulting & Advisory",
    description: "Project structuring, feasibility support, and implementation advisory, including BOT, PPP, and public-sector projects.",
    icon: Briefcase
  },
  {
    id: 'procurement',
    title: "Technology Procurement",
    description: "Sourcing and delivery of ICT hardware, systems, and specialized equipment for government agencies and private organizations.",
    icon: ShoppingCart
  },
  {
    id: 'engagement',
    title: "Public–Private Engagement",
    description: "Preparation of MoUs, contracts, and partnership frameworks for government and institutional collaborations.",
    icon: Users
  }
];

export const VALUES: ValueItem[] = [
  { id: 'integrity', title: "Integrity", description: "We uphold the highest standards of honesty in all our actions.", icon: Shield },
  { id: 'professionalism', title: "Professionalism", description: "Delivering excellence with expert knowledge and discipline.", icon: Award },
  { id: 'innovation', title: "Innovation", description: "Constantly seeking new ways to solve complex problems.", icon: Lightbulb },
  { id: 'accountability', title: "Accountability", description: "Taking full responsibility for our decisions and outcomes.", icon: CheckCircle },
  { id: 'partnership', title: "Partnership", description: "Building strong, lasting relationships for mutual success.", icon: HeartHandshake }
];

export const CONTACT_INFO = {
  email: "scattred@pace-commit.com",
  phone: "+220 212 1289",
  address: "Salagi, 97XP + 24H, Sukuta WCR, The Gambia"
};