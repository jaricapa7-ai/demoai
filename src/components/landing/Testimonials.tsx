import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface TestimonialsProps {
  language: 'es' | 'en';
}

const Testimonials: React.FC<TestimonialsProps> = ({ language }) => {
  const [current, setCurrent] = useState(0);
  
  const testimonials = language === 'es'
    ? [
        { text: 'Nuestra rentabilidad aumentó 18% en 3 meses con DataSense.', author: 'María González', role: 'CEO, TechCorp' },
        { text: 'La velocidad de análisis cambió completamente nuestra toma de decisiones.', author: 'Carlos Ruiz', role: 'CFO, InnovaGroup' },
        { text: 'DataSense nos dio claridad donde antes solo había incertidumbre.', author: 'Ana Martínez', role: 'Directora, StartupLab' }
      ]
    : [
        { text: 'Our profitability increased 18% in 3 months with DataSense.', author: 'María González', role: 'CEO, TechCorp' },
        { text: 'Analysis speed completely changed our decision-making process.', author: 'Carlos Ruiz', role: 'CFO, InnovaGroup' },
        { text: 'DataSense gave us clarity where before there was only uncertainty.', author: 'Ana Martínez', role: 'Director, StartupLab' }
      ];

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-gradient-to-br from-[#0A0F1A] via-[#1A1F2E] to-[#0A0F1A] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#00E0FF 1px, transparent 1px), linear-gradient(90deg, #00E0FF 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={24} className="text-[#00E0FF] fill-[#00E0FF]" />
            ))}
          </div>
          
          <blockquote className="text-2xl md:text-3xl text-white font-light mb-8 leading-relaxed min-h-[120px] flex items-center justify-center">
            "{testimonials[current].text}"
          </blockquote>
          
          <div className="text-[#00E0FF] font-semibold text-lg mb-1">{testimonials[current].author}</div>
          <div className="text-gray-400">{testimonials[current].role}</div>
          
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prev} className="p-2 rounded-full border border-[#00E0FF]/30 text-[#00E0FF] hover:bg-[#00E0FF]/10 transition-all">
              <ChevronLeft size={24} />
            </button>
            <button onClick={next} className="p-2 rounded-full border border-[#00E0FF]/30 text-[#00E0FF] hover:bg-[#00E0FF]/10 transition-all">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
