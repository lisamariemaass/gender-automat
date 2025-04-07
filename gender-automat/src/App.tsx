import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import Installation from './components/Installation';
import JavaScriptText from './components/JavaScriptText';
import CSSText from './components/CssText';
import { LanguageProvider } from './contexts/LanguageContext'; // Importiere den LanguageProvider

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/installation" element={<Installation />} />
          <Route path="/javascripttext" element={<JavaScriptText />} />
          <Route path="/csstext" element={<CSSText />} />
        </Routes>
        <Footer />
      </Router>
    </LanguageProvider>
  );
};

export default App;