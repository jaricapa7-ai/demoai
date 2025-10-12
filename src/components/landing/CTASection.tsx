import React from 'react';
import { Sparkles } from 'lucide-react';

interface CTASectionProps {
  language: 'es' | 'en';
  onDemoClick: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ language, onDemoClick }) => {
  const text = language === 'es'
    ? {
        title: '¿Listo para transformar tu negocio con IA?',
        subtitle: 'Únete a las empresas que ya están tomando decisiones más inteligentes',
        cta: 'Solicita tu demo personalizada',
        note: 'Innobiz AI · Estrategia impulsada por datos'
      }
    : {
        title: 'Ready to transform your business with AI?',
        subtitle: 'Join companies already making smarter decisions',
        cta: 'Request your personalized demo',
        note: 'Innobiz AI · Data-driven strategy'
      };

  return (
    <section className="py-24 bg-gradient-to-r from-[#0A0F1A] via-[#1A1F2E] to-[#0A0F1A] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00E0FF]/5 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="flex justify-center mb-6">
          <Sparkles size={48} className="text-[#00E0FF] animate-pulse" />
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          {text.title}
        </h2>
        
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          {text.subtitle}
        </p>
        
        <button onClick={onDemoClick} className="px-12 py-5 bg-gradient-to-r from-[#00E0FF] to-[#947EFF] text-white font-bold text-lg rounded-lg hover:shadow-2xl hover:shadow-[#00E0FF]/50 transform hover:scale-105 transition-all">
          {text.cta}
        </button>
        
        <p className="mt-8 text-gray-500 text-sm">{text.note}</p>
      </div>
    </section>
  );
};

export default CTASection;
