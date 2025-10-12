import React, { useState } from 'react';
import Navigation from './landing/Navigation';
import Hero from './landing/Hero';
import ImpactSection from './landing/ImpactSection';
import Benefits from './landing/Benefits';
import Dashboard from './landing/Dashboard';
import Testimonials from './landing/Testimonials';
import CTASection from './landing/CTASection';
import Footer from './landing/Footer';
import DemoModal from './landing/DemoModal';

const AppLayout: React.FC = () => {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const openDemoModal = () => {
    setDemoModalOpen(true);
  };

  const closeDemoModal = () => {
    setDemoModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1A] text-white">
      <Navigation 
        language={language} 
        onLanguageToggle={toggleLanguage}
        onDemoClick={openDemoModal}
      />
      
      <Hero 
        language={language}
        onDemoClick={openDemoModal}
      />
      
      <ImpactSection language={language} />
      
      <Benefits language={language} />
      
      <Dashboard language={language} />
      
      <Testimonials language={language} />
      
      <CTASection 
        language={language}
        onDemoClick={openDemoModal}
      />
      
      <Footer language={language} />
      
      <DemoModal 
        isOpen={demoModalOpen}
        onClose={closeDemoModal}
        language={language}
      />
    </div>
  );
};

export default AppLayout;
