import React from 'react';

interface HeroProps {
  language: 'es' | 'en';
  onDemoClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ language, onDemoClick }) => {
  const text = language === 'es'
    ? {
        title: 'Transforma tus datos en decisiones inteligentes',
        subtitle: 'La nueva generación de analítica impulsada por IA',
        cta1: 'Solicita Demo',
        cta2: 'Explora DataSense'
      }
    : {
        title: 'Transform your data into intelligent decisions',
        subtitle: 'The new generation of AI-powered analytics',
        cta1: 'Request Demo',
        cta2: 'Explore DataSense'
      };

  const scrollToSection = () => {
    document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A0F1A] via-[#0D1B2A] to-[#0A0F1A]">
      <div className="absolute inset-0 opacity-30">
        <img 
          src="https://d64gsuwffb70l.cloudfront.net/68e7ce28bcc319cf8e49df3a_1760022132041_a2894bd8.webp" 
          alt="Neural Network" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0F1A]/50 to-[#0A0F1A]"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="mb-8 flex justify-center animate-pulse">
          <img 
            src="https://d64gsuwffb70l.cloudfront.net/68bcd22c981a91b2529a4f20_1760022042369_4bcc9edd.png" 
            alt="Innobiz AI" 
            className="w-32 h-32 object-contain drop-shadow-[0_0_30px_rgba(0,224,255,0.5)]"
          />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
          {text.title.split(' ').map((word, i) => (
            <span key={i} className={i >= text.title.split(' ').length - 2 ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#00E0FF] to-[#947EFF]' : ''}>
              {word}{' '}
            </span>
          ))}
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light tracking-wide">
          {text.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={onDemoClick} className="px-8 py-4 bg-gradient-to-r from-[#00E0FF] to-[#947EFF] text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-[#00E0FF]/50 transform hover:scale-105 transition-all">
            {text.cta1}
          </button>
          <button onClick={scrollToSection} className="px-8 py-4 bg-transparent border-2 border-[#00E0FF] text-[#00E0FF] font-semibold rounded-lg hover:bg-[#00E0FF]/10 transition-all">
            {text.cta2}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
