import React from 'react';

interface BenefitsProps {
  language: 'es' | 'en';
}

const Benefits: React.FC<BenefitsProps> = ({ language }) => {
  const benefits = language === 'es'
    ? [
        {
          icon: 'https://d64gsuwffb70l.cloudfront.net/68e7ce28bcc319cf8e49df3a_1760022132845_18aa4c06.webp',
          title: 'Velocidad',
          stat: '75% menos tiempo',
          description: 'Análisis que antes tomaban horas, ahora en minutos.'
        },
        {
          icon: 'https://d64gsuwffb70l.cloudfront.net/68e7ce28bcc319cf8e49df3a_1760022137507_045355b4.webp',
          title: 'Precisión',
          stat: 'Datos claros',
          description: 'Decisiones seguras basadas en inteligencia artificial.'
        },
        {
          icon: 'https://d64gsuwffb70l.cloudfront.net/68e7ce28bcc319cf8e49df3a_1760022138204_a91427f7.webp',
          title: 'Impacto',
          stat: 'Estrategias IA',
          description: 'Basadas en inteligencia, no en intuición.'
        }
      ]
    : [
        {
          icon: 'https://d64gsuwffb70l.cloudfront.net/68e7ce28bcc319cf8e49df3a_1760022132845_18aa4c06.webp',
          title: 'Speed',
          stat: '75% less time',
          description: 'Analysis that took hours, now in minutes.'
        },
        {
          icon: 'https://d64gsuwffb70l.cloudfront.net/68e7ce28bcc319cf8e49df3a_1760022137507_045355b4.webp',
          title: 'Precision',
          stat: 'Clear data',
          description: 'Safe decisions based on artificial intelligence.'
        },
        {
          icon: 'https://d64gsuwffb70l.cloudfront.net/68e7ce28bcc319cf8e49df3a_1760022138204_a91427f7.webp',
          title: 'Impact',
          stat: 'AI Strategies',
          description: 'Based on intelligence, not intuition.'
        }
      ];

  return (
    <section id="benefits" className="py-24 bg-[#1A1F2E]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <div key={i} className="group bg-gradient-to-br from-[#0A0F1A] to-[#1A1F2E] border border-[#00E0FF]/20 rounded-2xl p-8 hover:border-[#947EFF] transition-all hover:shadow-2xl hover:shadow-[#947EFF]/20 hover:-translate-y-2">
              <div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-[#00E0FF]/20 to-[#947EFF]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <img src={benefit.icon} alt={benefit.title} className="w-12 h-12 object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{benefit.title}</h3>
              <div className="text-[#00E0FF] font-semibold text-lg mb-4">{benefit.stat}</div>
              <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
