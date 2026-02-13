import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { getEntranceOffset } from './utils/animationHelpers';
import { Header } from './components/Header';
import { ContactSection } from './components/ContactSection';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ScrollToTop } from './components/ScrollToTop';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ServicesManager } from './pages/admin/ServicesManager';
import { TestimonialsManager } from './pages/admin/TestimonialsManager';
import { OurStoryManager } from './pages/admin/OurStoryManager';
import { TeamManager } from './pages/admin/TeamManager';
import { TimelineManager } from './pages/admin/TimelineManager';

interface PageWrapperProps {
  children?: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
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

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
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
      <div className="min-h-screen flex flex-col font-sans bg-slate-50">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;