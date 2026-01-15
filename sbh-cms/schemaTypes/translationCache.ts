import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'translationCache',
    title: 'Translation Cache',
    type: 'document',
    fields: [
        defineField({
            name: 'sourceText',
            title: 'Source Text (French)',
            type: 'text',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'targetLang',
            title: 'Target Language',
            type: 'string',
            options: {
                list: [
                    { title: 'English', value: 'en' },
                    { title: 'Portuguese', value: 'pt' },
                    { title: 'Spanish', value: 'es' },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'translatedText',
            title: 'Translated Text',
            type: 'text',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'timestamp',
            title: 'Translation Date',
            type: 'datetime',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'textHash',
            title: 'Text Hash (for indexing)',
            type: 'string',
            description: 'SHA-256 hash of source text for fast lookups',
        }),
    ],
    preview: {
        select: {
            sourceText: 'sourceText',
            targetLang: 'targetLang',
            translatedText: 'translatedText',
        },
        prepare({ sourceText, targetLang, translatedText }) {
            const preview = sourceText?.substring(0, 50) + (sourceText?.length > 50 ? '...' : '');
            const translated = translatedText?.substring(0, 50) + (translatedText?.length > 50 ? '...' : '');
            return {
                title: `${preview} → ${targetLang?.toUpperCase()}`,
                subtitle: translated,
            };
        },
    },
});
