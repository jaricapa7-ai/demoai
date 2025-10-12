import React, { useState } from 'react';
import { X, Mail, CheckCircle } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'es' | 'en';
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose, language }) => {
  const { addDemoRequest } = useAppContext();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    company: '', 
    phone: '', 
    message: '' 
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDemoRequest(formData);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setFormData({ name: '', email: '', company: '', phone: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Error submitting demo request:', error);
    } finally {
      setLoading(false);
    }
  };

  const text = language === 'es' 
    ? { 
        title: 'Solicita tu Demo Personalizada', 
        name: 'Nombre completo', 
        email: 'Email corporativo', 
        company: 'Empresa', 
        phone: 'Teléfono',
        message: 'Cuéntanos sobre tu negocio',
        submit: 'Solicitar Demo', 
        success: '¡Solicitud Enviada!',
        successMsg: 'Revisa tu email para la confirmación. Te contactaremos en 24h.' 
      }
    : { 
        title: 'Request Your Personalized Demo', 
        name: 'Full name', 
        email: 'Corporate email', 
        company: 'Company', 
        phone: 'Phone',
        message: 'Tell us about your business',
        submit: 'Request Demo', 
        success: 'Request Sent!',
        successMsg: 'Check your email for confirmation. We\'ll contact you within 24h.' 
      };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#0A0F1A] border border-[#00E0FF]/30 rounded-2xl p-8 max-w-lg w-full mx-4 relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-[#00E0FF] transition-colors">
          <X size={24} />
        </button>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 mb-6">
              <Mail className="text-[#00E0FF]" size={28} />
              <h3 className="text-2xl font-bold text-white">{text.title}</h3>
            </div>
            <input type="text" placeholder={text.name} required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full mb-4 px-4 py-3 bg-[#1A1F2E] border border-[#00E0FF]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00E0FF] transition-colors" />
            <input type="email" placeholder={text.email} required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full mb-4 px-4 py-3 bg-[#1A1F2E] border border-[#00E0FF]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00E0FF] transition-colors" />
            <input type="text" placeholder={text.company} required value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full mb-4 px-4 py-3 bg-[#1A1F2E] border border-[#00E0FF]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00E0FF] transition-colors" />
            <input type="tel" placeholder={text.phone} required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full mb-4 px-4 py-3 bg-[#1A1F2E] border border-[#00E0FF]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00E0FF] transition-colors" />
            <textarea placeholder={text.message} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={3} className="w-full mb-6 px-4 py-3 bg-[#1A1F2E] border border-[#00E0FF]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00E0FF] transition-colors resize-none" />
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#00E0FF] to-[#947EFF] text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-[#00E0FF]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Enviando...' : text.submit}
            </button>
          </form>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="text-[#00E0FF] mx-auto mb-4" size={64} />
            <p className="text-[#00E0FF] text-2xl font-bold mb-2">{text.success}</p>
            <p className="text-gray-400">{text.successMsg}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoModal;
