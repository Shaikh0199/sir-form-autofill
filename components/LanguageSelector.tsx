import React from 'react';
import { Language } from '../types';

interface Props {
  currentLang: Language;
  setLanguage: (lang: Language) => void;
}

export const LanguageSelector: React.FC<Props> = ({ currentLang, setLanguage }) => {
  const langs = [
    { code: Language.EN, label: 'English' },
    { code: Language.HI, label: 'हिंदी' },
    { code: Language.GU, label: 'ગુજરાતી' },
  ];

  return (
    <div className="flex justify-center space-x-2 mb-6">
      {langs.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentLang === lang.code
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};
