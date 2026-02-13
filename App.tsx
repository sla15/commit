import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { getEntranceOffset } from './utils/animationHelpers';
import { Header } from './components/Header';
import { ContactSection } from './components/ContactSection';
import { ScrollToTop } from './components/ScrollToTop';
import { Skeleton } from './components/ui/Skeleton';
import { DataProvider } from './context/DataContext';

// Lazy load pages for performance
const HomePage = React.lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage').then(module => ({ default: module.ServicesPage })));
const AboutPage = React.lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));

// Admin components (lazy loaded)
const AdminLayout = React.lazy(() => import('./components/admin/AdminLayout').then(module => ({ default: module.AdminLayout })));
const AdminLogin = React.lazy(() => import('./pages/admin/AdminLogin').then(module => ({ default: module.AdminLogin })));
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
const ServicesManager = React.lazy(() => import('./pages/admin/ServicesManager').then(module => ({ default: module.ServicesManager })));
const TestimonialsManager = React.lazy(() => import('./pages/admin/TestimonialsManager').then(module => ({ default: module.TestimonialsManager })));
const OurStoryManager = React.lazy(() => import('./pages/admin/OurStoryManager').then(module => ({ default: module.OurStoryManager })));
const TeamManager = React.lazy(() => import('./pages/admin/TeamManager').then(module => ({ default: module.TeamManager })));
const TimelineManager = React.lazy(() => import('./pages/admin/TimelineManager').then(module => ({ default: module.TimelineManager })));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="max-w-7xl mx-auto px-6 w-full">
      <Skeleton className="h-[60vh] w-full rounded-[3rem]" />
    </div>
  </div>
);

interface PageWrapperProps {
  children?: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="w-full"
  >
    {children}
  </motion.div>
);

const PublicLayout = () => (
  <>
    <Header />
    <main className="flex-grow flex flex-col">
      <Outlet />
    </main>
    <ContactSection />
  </>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
          <Route path="/services" element={<PageWrapper><ServicesPage /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
        </Route>

        {/* Admin Routes Rebranded to /commIT */}
        <Route path="/commIT/login" element={<AdminLogin />} />
        <Route path="/commIT" element={<AdminLayout />}>
          <Route index element={<Navigate to="/commIT/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="services" element={<ServicesManager />} />
          <Route path="testimonials" element={<TestimonialsManager />} />
          <Route path="our-story" element={<OurStoryManager />} />
          <Route path="team" element={<TeamManager />} />
          <Route path="timeline" element={<TimelineManager />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <DataProvider>
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
          <React.Suspense fallback={<LoadingFallback />}>
            <AnimatedRoutes />
          </React.Suspense>
        </div>
      </DataProvider>
    </Router>
  );
}

export default App;