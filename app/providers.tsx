'use client';

import { LanguageProvider } from '@/contexts/LanguageContext';
import { Language } from '@/i18n/types';

export function Providers({ children, locale }: { children: React.ReactNode; locale: Language }) {
    return (
        <LanguageProvider initialLanguage={locale}>
            {children}
        </LanguageProvider>
    );
}
