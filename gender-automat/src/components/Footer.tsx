import React from 'react';
import './Footer.css';
import { useLanguage } from '../contexts/LanguageContext'; // Importiere den LanguageContext

const Footer: React.FC = () => {
  const { direction } = useLanguage(); // Verwende den LanguageContext

  return (
    <footer className={`footer ${direction === 'rtl' ? 'websiteinhalt-rtl' : ''}`}>
      <div className="footer-content">
        <p>&copy; 2025 Inklusive Tech<span className="highlight">Guides</span>.&nbsp;&nbsp;Alle Rechte vorbehalten.</p> 
        {/* Leerzeichen war auf der Website nicht erkennbar -> &nbsp;&nbsp;*/}
        <p>
          <a href="#impressum">Impressum</a> | <a href="#datenschutz">Datenschutz</a> | <a href="#agb">AGB</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;