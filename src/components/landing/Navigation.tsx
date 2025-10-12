import React, { useState, useEffect } from 'react';
import { Globe, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
  language: 'es' | 'en';
  onLanguageToggle: () => void;
  onDemoClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ language, onLanguageToggle, onDemoClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const text = language === 'es'
    ? { demo: 'Demo', features: 'Características', contact: 'Contacto', admin: 'Admin' }
    : { demo: 'Demo', features: 'Features', contact: 'Contact', admin: 'Admin' };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#0A0F1A]/95 backdrop-blur-lg shadow-lg shadow-[#00E0FF]/10' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src="https://d64gsuwffb70l.cloudfront.net/68bcd22c981a91b2529a4f20_1760022042369_4bcc9edd.png" 
            alt="Innobiz AI" 
            className="w-10 h-10 object-contain"
          />
          <span className="text-white font-bold text-xl">Innobiz AI</span>
        </div>
        
        <div className="flex items-center gap-6">
          <button onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-[#00E0FF] transition-colors hidden md:block">
            {text.features}
          </button>
          <button onClick={() => window.location.href = 'mailto:jaricapa@innobiz.io'} className="text-gray-300 hover:text-[#00E0FF] transition-colors hidden md:block">
            {text.contact}
          </button>
          <button onClick={() => navigate('/login')} className="flex items-center gap-2 text-gray-300 hover:text-[#00E0FF] transition-colors">
            <Lock size={18} />
            <span className="text-sm font-semibold">{text.admin}</span>
          </button>
          <button onClick={onLanguageToggle} className="flex items-center gap-2 text-gray-300 hover:text-[#00E0FF] transition-colors">
            <Globe size={20} />
            <span className="text-sm font-semibold">{language.toUpperCase()}</span>
          </button>
          <button onClick={onDemoClick} className="px-6 py-2 bg-gradient-to-r from-[#00E0FF] to-[#947EFF] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00E0FF]/50 transition-all">
            {text.demo}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
