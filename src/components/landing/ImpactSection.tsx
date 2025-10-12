import React from 'react';

interface ImpactSectionProps {
  language: 'es' | 'en';
}

const ImpactSection: React.FC<ImpactSectionProps> = ({ language }) => {
  const text = language === 'es'
    ? {
        tagline: 'Menos análisis, más decisiones.',
        description: 'DataSense analiza tus métricas, cruza ventas y gastos, y te entrega rentabilidad neta en minutos.'
      }
    : {
        tagline: 'Less analysis, more decisions.',
        description: 'DataSense analyzes your metrics, cross-references sales and expenses, and delivers net profitability in minutes.'
      };

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0A0F1A] to-[#1A1F2E] overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #00E0FF 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E0FF] via-[#947EFF] to-[#00E0FF] animate-pulse">
            {text.tagline}
          </span>
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
          {text.description}
        </p>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { value: '75%', label: language === 'es' ? 'Menos tiempo' : 'Less time' },
            { value: '3min', label: language === 'es' ? 'Análisis completo' : 'Full analysis' },
            { value: '99%', label: language === 'es' ? 'Precisión' : 'Accuracy' }
          ].map((stat, i) => (
            <div key={i} className="bg-[#0A0F1A]/50 backdrop-blur-sm border border-[#00E0FF]/30 rounded-xl p-8 hover:border-[#00E0FF] transition-all hover:shadow-lg hover:shadow-[#00E0FF]/20">
              <div className="text-5xl font-bold text-[#00E0FF] mb-2">{stat.value}</div>
              <div className="text-gray-400 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
