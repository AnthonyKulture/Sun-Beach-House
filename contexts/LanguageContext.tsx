import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, Translations } from '../i18n/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'sbh-language';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Always start with 'fr' to match SSR
    const [language, setLanguageState] = useState<Language>('fr');
    const [mounted, setMounted] = useState(false);

    // After hydration, load from localStorage
    useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(STORAGE_KEY) as Language;
            if (stored === 'fr' || stored === 'en') {
                setLanguageState(stored);
            }
        }
    }, []);

    // Persist to localStorage when language changes (only on client)
    useEffect(() => {
        if (mounted && typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, language);
        }
    }, [language, mounted]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    const value: LanguageContextType = {
        language,
        setLanguage,
        t: translations[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
