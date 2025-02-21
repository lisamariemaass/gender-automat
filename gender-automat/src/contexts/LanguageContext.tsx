import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextProps {
  language: string;
  direction: 'ltr' | 'rtl';
  setLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

  useEffect(() => {
    const userLanguage = navigator.language;
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    const lang = rtlLanguages.some((rtlLang) => userLanguage.startsWith(rtlLang)) ? 'rtl' : 'ltr';
    setLanguage(userLanguage);
    setDirection(lang);
  }, []);

 /* Manuell die Sprache auf Hebräisch setzen für Testzwecke
  useEffect(() => {
    setLanguage('he');
    setDirection('rtl');
  }, []);
*/

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};