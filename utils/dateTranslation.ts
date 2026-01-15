// Helper function to translate French date strings to other languages
// Handles formats like "15 Avr - 30 Avr" → "Apr 15 - Apr 30" (EN), "Abr 15 - Abr 30" (PT/ES)

import { Language } from '../i18n/translations';

const monthTranslations: Record<'en' | 'pt' | 'es', Record<string, string>> = {
    en: {
        'Jan': 'Jan', 'Fév': 'Feb', 'Mar': 'Mar', 'Avr': 'Apr',
        'Mai': 'May', 'Juin': 'Jun', 'Juil': 'Jul', 'Août': 'Aug',
        'Sep': 'Sep', 'Oct': 'Oct', 'Nov': 'Nov', 'Déc': 'Dec',
        // Variations
        'Janv': 'Jan', 'Févr': 'Feb', 'Avril': 'Apr', 'Juillet': 'Jul',
        'Aout': 'Aug', 'Sept': 'Sep', 'Octobre': 'Oct',
        'Novembre': 'Nov', 'Décembre': 'Dec', 'Decembre': 'Dec'
    },
    pt: {
        'Jan': 'Jan', 'Fév': 'Fev', 'Mar': 'Mar', 'Avr': 'Abr',
        'Mai': 'Mai', 'Juin': 'Jun', 'Juil': 'Jul', 'Août': 'Ago',
        'Sep': 'Set', 'Oct': 'Out', 'Nov': 'Nov', 'Déc': 'Dez',
        // Variations
        'Janv': 'Jan', 'Févr': 'Fev', 'Avril': 'Abr', 'Juillet': 'Jul',
        'Aout': 'Ago', 'Sept': 'Set', 'Octobre': 'Out',
        'Novembre': 'Nov', 'Décembre': 'Dez', 'Decembre': 'Dez'
    },
    es: {
        'Jan': 'Ene', 'Fév': 'Feb', 'Mar': 'Mar', 'Avr': 'Abr',
        'Mai': 'May', 'Juin': 'Jun', 'Juil': 'Jul', 'Août': 'Ago',
        'Sep': 'Sep', 'Oct': 'Oct', 'Nov': 'Nov', 'Déc': 'Dic',
        // Variations
        'Janv': 'Ene', 'Févr': 'Feb', 'Avril': 'Abr', 'Juillet': 'Jul',
        'Aout': 'Ago', 'Sept': 'Sep', 'Octubre': 'Oct',
        'Novembre': 'Nov', 'Décembre': 'Dic', 'Decembre': 'Dic'
    }
};

export const translateDate = (frenchDate: string, targetLang: Language): string => {
    // No translation needed for French
    if (!frenchDate || targetLang === 'fr') return frenchDate;

    let result = frenchDate;
    const translations = monthTranslations[targetLang as 'en' | 'pt' | 'es'];

    if (!translations) return frenchDate;

    // Replace each French month with target language equivalent
    Object.entries(translations).forEach(([fr, target]) => {
        const regex = new RegExp(fr, 'gi');
        result = result.replace(regex, target);
    });

    // Convert "15 Apr - 30 Apr" to "Apr 15 - Apr 30" (swap day and month) for EN/PT/ES
    result = result.replace(/(\d{1,2})\s+([A-Za-z]+)/g, '$2 $1');

    return result;
};

// Backward compatibility: keep old function name
export const translateDateToEnglish = (frenchDate: string): string => {
    return translateDate(frenchDate, 'en');
};
