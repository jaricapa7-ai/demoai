import React from 'react';
import { TrendingUp, BarChart3, PieChart } from 'lucide-react';

interface DashboardProps {
  language: 'es' | 'en';
}

const Dashboard: React.FC<DashboardProps> = ({ language }) => {
  const text = language === 'es'
    ? {
        title: 'Inteligencia que trabaja para ti',
        subtitle: 'DataSense interpreta tus datos financieros y predice tu margen operativo',
        features: [
          'Análisis predictivo en tiempo real',
          'Integración con tus sistemas actuales',
          'Reportes automáticos personalizados'
        ]
      }
    : {
        title: 'Intelligence that works for you',
        subtitle: 'DataSense interprets your financial data and predicts your operating margin',
        features: [
          'Real-time predictive analysis',
          'Integration with your current systems',
          'Customized automated reports'
        ]
      };

  return (
    <section className="py-24 bg-gradient-to-b from-[#1A1F2E] to-[#0A0F1A]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {text.title}
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {text.subtitle}
            </p>
            <div className="space-y-4">
              {text.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="mt-1 w-6 h-6 rounded-full bg-gradient-to-r from-[#00E0FF] to-[#947EFF] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    {i === 0 && <TrendingUp size={14} className="text-white" />}
                    {i === 1 && <BarChart3 size={14} className="text-white" />}
                    {i === 2 && <PieChart size={14} className="text-white" />}
                  </div>
                  <p className="text-gray-300 text-lg">{feature}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF] to-[#947EFF] rounded-2xl blur-3xl opacity-20"></div>
            <img 
              src="https://d64gsuwffb70l.cloudfront.net/68e7ce28bcc319cf8e49df3a_1760022131271_cf40e5a2.webp" 
              alt="DataSense Dashboard" 
              className="relative rounded-2xl shadow-2xl border border-[#00E0FF]/30 hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
