'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { TranslationContext } from '@/hooks/use-translation';

const defaultLang = 'id';
const languages = [defaultLang, 'en'];

type Dictionary = Record<string, string>;

const getDictionary = async (lang: string): Promise<Dictionary> => {
  try {
    return await import(`@/locales/${lang}.json`).then((module) => module.default);
  } catch (error) {
    console.warn(`Could not load dictionary for ${lang}, falling back to default.`);
    return await import(`@/locales/${defaultLang}.json`).then((module) => module.default);
  }
};

export const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState(defaultLang);
  const [dictionary, setDictionary] = useState<Dictionary>({});

  useEffect(() => {
    try {
        const storedLang = localStorage.getItem('pacitan-explorer-lang');
        if (storedLang && languages.includes(storedLang)) {
          setLanguageState(storedLang);
        }
    } catch (error) {
        console.warn("Cannot access local storage, using default language.");
    }
  }, []);

  useEffect(() => {
    getDictionary(language).then(setDictionary);
  }, [language]);

  const setLanguage = useCallback((lang: string) => {
    if (languages.includes(lang)) {
      setLanguageState(lang);
      try {
        localStorage.setItem('pacitan-explorer-lang', lang);
      } catch (error) {
        console.warn("Cannot access local storage, language preference will not be saved.");
      }
    }
  }, []);

  const t = useCallback((key: string): string => {
    return dictionary[key] || key;
  }, [dictionary]);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};
