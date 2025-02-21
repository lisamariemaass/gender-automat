import React, { useState } from 'react';
import './Header.css';
import logo from '../assets/gender-neutral-white.png';
import { FaSearch } from 'react-icons/fa'; // Importiere die Icons
import { useLanguage } from '../contexts/LanguageContext'; // Importiere den LanguageContext

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { direction } = useLanguage(); // Verwende den LanguageContext

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`lato-regular ${isOpen ? 'expanded' : ''} ${direction === 'rtl' ? 'websiteinhalt-rtl' : ''}`}>
      <div className="logo-title-container">
        <button className={`menu-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar one"></span>
          <span className="bar two"></span>
          <span className="bar three"></span>
        </button>
        <img src={logo} alt="Logo" />
        <div className="header-text">
          <h1>Inklusive Tech<span className="highlight">Guides</span></h1>
          <h2 className="lato-light">Zukunft der technischen Dokumentation</h2>
        </div>
      </div>
      <nav className={isOpen ? 'open' : ''}>
        <ul>
          <li><a href="#home">Startseite</a></li>
          <li><a href="#guides">Dokumentationen</a></li>
          <li><a href="#about">Über uns</a></li>
          <li><a href="#contact">Kontakt</a></li>
          <li><a href="#help">Hilfe</a></li>
        </ul>
        <div className="search-container">
          <button className="search-button">
            <input type="text" placeholder="Ich suche nach" className="search-input" />
            <FaSearch className="search-icon" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;