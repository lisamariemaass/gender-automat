import React, { useState } from 'react';
import '../styles/Header.css';
import logo from '../assets/gender-neutral-red.png';
import { FaSearch } from 'react-icons/fa'; // Importiere die Icons
import { useLanguage } from '../contexts/LanguageContext'; // Importiere den LanguageContext
import { Link } from 'react-router-dom'; // Verwende Link von react-router-dom

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
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <div className="header-text">
          <h1><Link to="/" className="title-link">Inklusive Tech<span className="highlight">Guides</span></Link></h1>
          <h2 className="lato-light">Zukunft der technischen Dokumentation</h2>
        </div>
      </div>
      <nav className={isOpen ? 'open' : ''}>
        <ul>
          <li><Link to="/">Start</Link></li>
          <li className="dropdown">
            <Link to="#guides">Dokumentationen</Link>
            <div className="dropdown-content">
              <Link to="/installation">Installation von Git und GitHub</Link>
              <Link to="/javascripttext">Dokumentation zur Nutzung von JavaScript</Link>
              <Link to="/csstext">Erste Schritte zur Nutzung von CSS</Link>
            </div>
          </li>
          <li><Link to="#about">Über uns</Link></li>
          <li><Link to="#contact">Kontakt</Link></li>
          <li><Link to="#help">Hilfe</Link></li>
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