import React from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';

interface FooterProps {
  language: 'es' | 'en';
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const text = language === 'es'
    ? { rights: 'Todos los derechos reservados', privacy: 'Privacidad', terms: 'Términos' }
    : { rights: 'All rights reserved', privacy: 'Privacy', terms: 'Terms' };

  return (
    <footer className="bg-[#0A0F1A] border-t border-[#00E0FF]/20 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img 
              src="https://d64gsuwffb70l.cloudfront.net/68bcd22c981a91b2529a4f20_1760022042369_4bcc9edd.png" 
              alt="Innobiz AI" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h3 className="text-white font-bold text-xl">Innobiz AI</h3>
              <p className="text-gray-400 text-sm">DataSense</p>
            </div>
          </div>
          
          <div className="flex gap-6">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00E0FF] transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00E0FF] transition-colors">
              <Twitter size={24} />
            </a>
            <a href="mailto:jaricapa@innobiz.io" className="text-gray-400 hover:text-[#00E0FF] transition-colors">
              <Mail size={24} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© 2025 Innobiz AI · {text.rights}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#00E0FF] transition-colors">{text.privacy}</a>
            <a href="#" className="hover:text-[#00E0FF] transition-colors">{text.terms}</a>
            <a href="mailto:jaricapa@innobiz.io" className="hover:text-[#00E0FF] transition-colors">jaricapa@innobiz.io</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
