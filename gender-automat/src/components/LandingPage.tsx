import React, { useState } from 'react';
import '../styles/LandingPage.css';
import earth2 from '../assets/earth2.jpg';
import coding from '../assets/coding.jpg';
import hands from '../assets/hands.jpg';
import { Link } from 'react-router-dom'; // Verwende Link von react-router-dom

const LandingPage: React.FC = () => {
  const [showCards, setShowCards] = useState(false);

  const handleButtonClick = () => {
    setShowCards(true);
  };

  const handleCloseButtonClick = () => {
    setShowCards(false);
  };

  return (
    <div id="home" className="page-container">
      <div className="landing-page">
        <h2>Wilkommen!</h2>
        <div className="intro-text">
          <p>Technische Dokumentation erreicht uns Menschen im 21. Jahrhundert überall. Ob es sich um klassische Gebrauchsanweisungen oder um kontextabhängige Online-Hilfen handelt, immer waren Experten für technische Dokumentation am Werk.</p>
          <p>In ganz unterschiedlichen Publikationsformen werden heutzutage technische Inhalte so aufbereitet, dass der Nutzer in seiner aktuellen Situation optimal unterstützt wird.</p>
          <p>Als Spezialist für technische Dokumentation unterstützt Inklusive TechGuides seine Kunden in allen Phasen der technischen Dokumentation – von der Konzeption bis zum fertigen Informationsprodukt.</p>
          <p>Wir verstehen uns als leistungsfähiger Partner unserer Auftraggeber auf dem Gebiet der Erstellung von technischer Dokumentation aller Art.</p>
          <p>Egal, ob Sie ein erfahrener Techniker oder ein neugieriger Anwender sind, unsere detaillierten Schritt-für-Schritt-Anleitungen helfen Ihnen, Ihre technischen Herausforderungen zu meistern und Ihre Projekte erfolgreich umzusetzen.</p>
          <p>Entdecken Sie unsere umfangreiche Sammlung an hilfreichen Ressourcen und machen Sie sich mit den neuesten Technologien vertraut.</p>
        </div>
        {!showCards && (
          <button className="discover-button" onClick={handleButtonClick}>
            Entdecke Dokumentationen <span className="arrow">→</span>
          </button>
        )}
        <div className={`card-container ${showCards ? 'show' : 'hide'}`}>
          <div className="card">
            <img src={earth2} alt="Installation einer Software" />
            <h3>Installation von Git und GitHub</h3>
            <p>Eine Schritt-für-Schritt-Anleitung zur Installation von Git und GitHub</p>
            <Link to="/installation">Mehr erfahren</Link>
          </div>
          <div className="card">
            <img src={coding} alt="Dokumentation zur Nutzung von JavaScript" />
            <h3>Dokumentation zur Nutzung von JavaScript</h3>
            <p>Einführung in die weit verbreitete Programmiersprache.</p>
            <Link to="/javascripttext">Mehr erfahren</Link>
          </div>
          <div className="card">
            <img src={hands} alt="Erstellen eines neuen Dokuments im CMS" />
            <h3>Erste Schritte zur Nutzung von CSS</h3>
            <p>Eine Anleitung zur Erstellung eines neuen Dokuments im Content-Management-System.</p>
            <Link to="/csstext">Mehr erfahren</Link>
          </div>
        </div>
        {showCards && (
          <button className="close-button" onClick={handleCloseButtonClick}>
            Dokumentationen schließen
          </button>
        )}
      </div>
    </div>
  );
};

export default LandingPage;