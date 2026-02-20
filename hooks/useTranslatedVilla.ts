// Hook for translating villa content based on selected language
import { useState, useEffect } from 'react';
import { Villa } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { translateWithCache } from '../utils/translationService';

// Helper to extract text from both formats (string or {fr, en} object)
const extractText = (field: string | { fr: string; en: string } | undefined | null, lang: string): string => {
    if (!field) return '';
    if (typeof field === 'string') {
        return field;
    }
    // Safety check for object structure
    if (typeof field === 'object') {
        return (field as any)[lang] || (field as any)['fr'] || '';
    }
    return '';
};

/**
 * Hook to get villa with translated descriptions
 * @param villa - Villa object with French descriptions
 * @returns Villa with descriptions translated to current language
 */
export function useTranslatedVilla(villa: Villa | null): Villa | null {
    const { language } = useLanguage();
    const [translatedVilla, setTranslatedVilla] = useState<Villa | null>(() => {
        if (!villa) return null;
        return {
            ...villa,
            description: extractText(villa.description, 'fr'),
            fullDescription: extractText(villa.fullDescription, 'fr'),
        };
    });
    const [isTranslating, setIsTranslating] = useState(false);

    useEffect(() => {
        if (!villa) {
            setTranslatedVilla(null);
            return;
        }

        // Always normalize descriptions to strings first
        const descriptionText = extractText(villa.description, 'fr');
        const fullDescriptionText = extractText(villa.fullDescription, 'fr');
        const pricingDetailsText = extractText(villa.pricingDetails, 'fr');

        // Translate content
        const translateVilla = async () => {
            setIsTranslating(true);

            try {
                // 1. Content that is natively French (Descriptions, Features, Amenities)
                // We only translate these if language is NOT 'fr'
                const needsNativeTranslation = language !== 'fr';

                // 2. Content that might be mixed/English (Seasonal Prices)
                // We ALWAYS translate these to ensure consistency
                const seasonNames = villa.seasonalPrices?.map(s => typeof s.seasonName === 'string' ? s.seasonName : s.seasonName.name) || [];
                const seasonDates = villa.seasonalPrices?.map(s => s.dates) || [];
                const seasonalTextsToTranslate = [...seasonNames, ...seasonDates];

                const nativeTextsToTranslate = needsNativeTranslation ? [
                    descriptionText,
                    fullDescriptionText,
                    pricingDetailsText,
                    ...(villa.homeFeatures?.map(f => f.title) || []),
                    ...(villa.homeFeatures?.map(f => f.description) || []),
                    ...(villa.amenities?.map(a => a.name) || [])
                ] : [];

                // Combine all promises
                const [translatedSeasonalTexts, translatedNativeTexts] = await Promise.all([
                    Promise.all(seasonalTextsToTranslate.map(t => {
                        if (!t) return '';
                        // Do not translate "Bucket Regatta" or "Bucket" related terms
                        if (t.toLowerCase().includes('bucket') || t.toLowerCase().includes('regatta')) {
                            return t;
                        }
                        return translateWithCache(t, language);
                    })),
                    needsNativeTranslation ? Promise.all(nativeTextsToTranslate.map(t => t ? translateWithCache(t, language) : '')) : Promise.resolve([])
                ]);

                // Reconstruct Seasonal Prices (Always translated)
                const seasonCount = villa.seasonalPrices?.length || 0;
                const translatedSeasonalPrices = villa.seasonalPrices?.map((s, i) => ({
                    ...s,
                    seasonName: (typeof s.seasonName === 'string'
                        ? { _id: '', name: translatedSeasonalTexts[i], order: 0 }
                        : {
                            ...s.seasonName,
                            name: translatedSeasonalTexts[i]
                        }) as any,
                    dates: translatedSeasonalTexts[seasonCount + i]
                }));

                // Reconstruct Native Content (Translated or Original)
                let translatedDescription = descriptionText;
                let translatedFullDescription = fullDescriptionText;
                let translatedPricingDetails = pricingDetailsText;
                let translatedFeatures = villa.homeFeatures;
                let translatedAmenities = villa.amenities;

                if (needsNativeTranslation && translatedNativeTexts.length > 0) {
                    translatedDescription = translatedNativeTexts[0];
                    translatedFullDescription = translatedNativeTexts[1];
                    translatedPricingDetails = translatedNativeTexts[2];

                    const featureCount = villa.homeFeatures?.length || 0;

                    translatedFeatures = villa.homeFeatures?.map((f, i) => ({
                        ...f,
                        title: translatedNativeTexts[3 + i],
                        description: translatedNativeTexts[3 + featureCount + i]
                    }));

                    translatedAmenities = villa.amenities?.map((a, i) => ({
                        ...a,
                        name: translatedNativeTexts[3 + (featureCount * 2) + i]
                    }));
                }

                setTranslatedVilla({
                    ...villa,
                    description: translatedDescription,
                    fullDescription: translatedFullDescription,
                    pricingDetails: translatedPricingDetails,
                    homeFeatures: translatedFeatures || villa.homeFeatures,
                    amenities: translatedAmenities || villa.amenities,
                    seasonalPrices: translatedSeasonalPrices || villa.seasonalPrices
                });

            } catch (error) {
                console.error('[useTranslatedVilla] Translation error:', error);
                // Use normalized French text if translation fails
                setTranslatedVilla({
                    ...villa,
                    description: descriptionText,
                    fullDescription: fullDescriptionText,
                    pricingDetails: pricingDetailsText,
                });
            } finally {
                setIsTranslating(false);
            }
        };

        translateVilla();
    }, [villa?.id, language]); // Stable dependencies to prevent infinite loops

    return translatedVilla;
}

/**
 * Hook variant that also exposes loading state
 */
export function useTranslatedVillaWithStatus(villa: Villa): {
    translatedVilla: Villa;
    isTranslating: boolean;
} {
    const { language } = useLanguage();
    const [translatedVilla, setTranslatedVilla] = useState<Villa>(() => ({
        ...villa,
        description: extractText(villa.description, 'fr'),
        fullDescription: extractText(villa.fullDescription, 'fr'),
    }));
    const [isTranslating, setIsTranslating] = useState(false);

    useEffect(() => {
        // Always normalize descriptions to strings first
        const descriptionText = extractText(villa.description, 'fr');
        const fullDescriptionText = extractText(villa.fullDescription, 'fr');

        // For French, just use normalized strings
        if (language === 'fr') {
            setTranslatedVilla({
                ...villa,
                description: descriptionText,
                fullDescription: fullDescriptionText,
            });
            setIsTranslating(false);
            return;
        }

        const translateVilla = async () => {
            setIsTranslating(true);

            try {
                const [description, fullDescription] = await Promise.all([
                    descriptionText ? translateWithCache(descriptionText, language) : '',
                    fullDescriptionText ? translateWithCache(fullDescriptionText, language) : '',
                ]);

                setTranslatedVilla({
                    ...villa,
                    description,
                    fullDescription,
                });
            } catch (error) {
                console.error('Translation error:', error);
                setTranslatedVilla({
                    ...villa,
                    description: descriptionText,
                    fullDescription: fullDescriptionText,
                });
            } finally {
                setIsTranslating(false);
            }
        };

        translateVilla();
    }, [villa, language]);

    return { translatedVilla, isTranslating };
}
