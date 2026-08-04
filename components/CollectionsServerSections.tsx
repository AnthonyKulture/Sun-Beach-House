import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { translations, Language } from '../i18n/translations';
import { SunStamp } from './Decorations';
import type { Villa } from '../types';

const getT = (lang: string) => translations[(lang as Language)] || translations.fr;

const VILLA_INDEX_TITLE: Record<string, { rent: string; sale: string }> = {
    fr: { rent: 'Toutes nos villas en location', sale: 'Tous nos biens à la vente' },
    en: { rent: 'All our rental villas', sale: 'All our properties for sale' },
    es: { rent: 'Todas nuestras villas en alquiler', sale: 'Todas nuestras propiedades en venta' },
    pt: { rent: 'Todas as nossas villas para alugar', sale: 'Todos os nossos imóveis à venda' },
};

export const CollectionsHero: React.FC<{ mode: 'rent' | 'sale'; lang: string }> = ({ mode, lang }) => {
    const t = getT(lang);
    const heroTitle = mode === 'rent' ? t.collections.vacationRentals : t.collections.propertiesForSale;
    const heroSubtitle = mode === 'rent' ? t.collections.exclusiveSelection : t.collections.investInException;

    return (
        <div className="relative h-[60vh] xl:h-[50vh] min-h-[400px] w-full overflow-hidden flex items-center justify-center">
            <Image
                src={mode === 'rent' ? '/images/optimized-rentals-hero.webp' : '/images/optimized-sales-hero.webp'}
                alt={mode === 'rent' ? 'Villas de location à Saint-Barthélemy' : 'Villas à vendre à Saint-Barthélemy'}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
                quality={85}
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="relative z-10 text-center text-white px-6 animate-slide-up pt-20 xl:pt-0">
                <div className="mb-6 flex justify-center opacity-80 animate-spin-slower" style={{ willChange: 'transform' }}>
                    <SunStamp className="w-20 h-20 text-white" />
                </div>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl italic mb-4">{heroTitle}</h1>
                <p className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] opacity-90">{heroSubtitle}</p>
            </div>
        </div>
    );
};

export const CollectionsIntro: React.FC<{ mode: 'rent' | 'sale'; lang: string }> = ({ mode, lang }) => {
    const t = getT(lang);

    return (
        <section className="bg-sbh-cream max-w-none px-0 pb-24 text-sbh-charcoal">
            <div className="max-w-[900px] mx-auto px-6 md:px-12">
                {mode === 'rent' ? (
                    <>
                        <h2 className="font-serif text-2xl md:text-4xl italic mb-8 leading-tight">
                            {t.collectionsIntro.rent.title}
                        </h2>
                        <p className="font-sans font-light text-base md:text-lg leading-relaxed text-sbh-charcoal/80 mb-12 text-justify">
                            {t.collectionsIntro.rent.p1}
                        </p>

                        <h3 className="font-serif text-xl md:text-2xl italic mb-4">
                            {t.collectionsIntro.rent.processTitle}
                        </h3>
                        <ol className="list-decimal list-inside space-y-3 mb-12 font-sans font-light text-base text-sbh-charcoal/80 marker:text-sbh-green marker:font-serif marker:italic">
                            {t.collectionsIntro.rent.process.map((step, i) => (
                                <li key={i} className="pl-2">{step}</li>
                            ))}
                        </ol>

                        <h3 className="font-serif text-xl md:text-2xl italic mb-4">
                            {t.collectionsIntro.rent.pricingTitle}
                        </h3>
                        <p className="font-sans font-light text-base text-sbh-charcoal/80 leading-relaxed mb-12 text-justify">
                            {t.collectionsIntro.rent.pricing}
                        </p>

                        <h3 className="font-serif text-xl md:text-2xl italic mb-4">
                            {t.collectionsIntro.rent.conciergeTitle}
                        </h3>
                        <p className="font-sans font-light text-base text-sbh-charcoal/80 leading-relaxed text-justify">
                            {t.collectionsIntro.rent.concierge}
                        </p>
                    </>
                ) : (
                    <>
                        <h2 className="font-serif text-2xl md:text-4xl italic mb-8 leading-tight">
                            {t.collectionsIntro.sale.title}
                        </h2>
                        <p className="font-sans font-light text-base md:text-lg leading-relaxed text-sbh-charcoal/80 mb-12 text-justify">
                            {t.collectionsIntro.sale.p1}
                        </p>

                        <h3 className="font-serif text-xl md:text-2xl italic mb-4">
                            {t.collectionsIntro.sale.approachTitle}
                        </h3>
                        <ol className="list-decimal list-inside space-y-3 mb-12 font-sans font-light text-base text-sbh-charcoal/80 marker:text-sbh-green marker:font-serif marker:italic">
                            {t.collectionsIntro.sale.approach.map((step, i) => (
                                <li key={i} className="pl-2">{step}</li>
                            ))}
                        </ol>

                        <h3 className="font-serif text-xl md:text-2xl italic mb-4">
                            {t.collectionsIntro.sale.discretionTitle}
                        </h3>
                        <p className="font-sans font-light text-base text-sbh-charcoal/80 leading-relaxed text-justify">
                            {t.collectionsIntro.sale.discretion}
                        </p>
                    </>
                )}
            </div>
        </section>
    );
};

export const VillaLinkIndex: React.FC<{ mode: 'rent' | 'sale'; lang: string; villas: Villa[] }> = ({ mode, lang, villas }) => {
    const listed = villas
        .filter((v) => v.listingType === mode)
        .sort((a, b) => a.name.localeCompare(b.name));

    if (listed.length === 0) return null;

    const title = (VILLA_INDEX_TITLE[lang] || VILLA_INDEX_TITLE.fr)[mode];

    const itemListLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: title,
        numberOfItems: listed.length,
        itemListElement: listed.map((v, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `https://www.sun-beach-house.com/${lang}/villas/${v.slug || v.id}`,
            name: v.name,
        })),
    };

    return (
        <nav aria-label={title} className="bg-sbh-cream pb-24 text-sbh-charcoal">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
            />
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <h2 className="font-serif text-2xl md:text-3xl italic mb-8">{title}</h2>
                <ul className="columns-2 sm:columns-3 lg:columns-4 gap-8 space-y-2">
                    {listed.map((villa) => (
                        <li key={villa.id} className="break-inside-avoid">
                            <Link
                                href={`/${lang}/villas/${villa.slug || villa.id}`}
                                className="font-sans font-light text-sm text-sbh-charcoal/80 hover:text-sbh-green transition-colors"
                            >
                                {villa.name}
                                {villa.location?.name ? ` — ${villa.location.name}` : ''}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};
