import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext'; // Importiere den LanguageProvider

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="App">
        <Header />
        {/* Weitere Komponenten hier */}
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;