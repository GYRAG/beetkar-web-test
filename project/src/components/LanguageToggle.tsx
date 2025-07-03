import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ka' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 p-2 rounded-lg bg-warm-100 dark:bg-warm-700 hover:bg-warm-200 dark:hover:bg-warm-600 transition-colors"
      title={language === 'en' ? 'Switch to Georgian' : 'Switch to English'}
    >
      <Languages className="w-5 h-5 text-warm-600 dark:text-warm-400" />
      <span className="text-sm font-medium text-warm-900 dark:text-warm-100">
        {language === 'en' ? 'ქარ' : 'ENG'}
      </span>
    </button>
  );
};