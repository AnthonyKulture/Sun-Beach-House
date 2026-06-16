import type { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Collections } from '@/components/Collections';
import { CmsService } from '@/services/cms';
import { getAlternates, getOpenGraph } from '@/utils/seo';
import { getNeighborhood, type NeighborhoodLang } from '@/data/neighborhoods';

const LANGS: NeighborhoodLang[] = ['fr', 'en', 'es', 'pt'];
const BASE_URL = 'https://www.sun-beach-house.com';

const asLang = (lang: string): NeighborhoodLang =>
    (LANGS.includes(lang as NeighborhoodLang) ? lang : 'fr') as NeighborhoodLang;

const pageTitle = (name: string, lang: NeighborhoodLang): string => ({
    fr: `Location de villa de luxe à ${name} — Saint-Barth`,
    en: `Luxury villa rental in ${name} — St. Barth`,
    es: `Alquiler de villa de lujo en ${name} — St. Barth`,
    pt: `Aluguel de villa de luxo em ${name} — St. Barth`,
}[lang]);

const fallbackIntro = (name: string, count: number, lang: NeighborhoodLang): string => ({
    fr: `Découvrez notre sélection de ${count} villas de luxe à louer à ${name}, l'un des quartiers les plus prisés de Saint-Barthélemy. Sun Beach House vous accompagne dans le choix de votre séjour d'exception, avec une conciergerie privée sur mesure.`,
    en: `Discover our selection of ${count} luxury villas for rent in ${name}, one of the most sought-after neighborhoods in Saint-Barthélemy. Sun Beach House guides you to your exceptional stay, with bespoke private concierge service.`,
    es: `Descubra nuestra selección de ${count} villas de lujo en alquiler en ${name}, uno de los barrios más codiciados de San Bartolomé. Sun Beach House le acompaña hacia su estancia excepcional, con un servicio de conserjería privada a medida.`,
    pt: `Descubra a nossa seleção de ${count} villas de luxo para alugar em ${name}, um dos bairros mais procurados de Saint-Barthélemy. A Sun Beach House acompanha-o até à sua estadia excecional, com um serviço de concierge privado sob medida.`,
}[lang]);

const labels = (lang: NeighborhoodLang) => ({
    home: { fr: 'Accueil', en: 'Home', es: 'Inicio', pt: 'Início' }[lang],
    rentals: { fr: 'Locations', en: 'Rentals', es: 'Alquileres', pt: 'Aluguéis' }[lang],
    highlightsTitle: { fr: 'Pourquoi ce quartier', en: 'Why this neighborhood', es: 'Por qué este barrio', pt: 'Porquê este bairro' }[lang],
    villasKicker: { fr: 'La collection', en: 'The collection', es: 'La colección', pt: 'A coleção' }[lang],
    villasTitle: (name: string) => ({
        fr: `Nos villas à ${name}`,
        en: `Our villas in ${name}`,
        es: `Nuestras villas en ${name}`,
        pt: `As nossas villas em ${name}`,
    }[lang]),
});

export function neighborhoodMetadata(slug: string, langRaw: string): Metadata {
    const n = getNeighborhood(slug);
    const lang = asLang(langRaw);
    if (!n) return { title: 'Saint-Barthélemy | Sun Beach House' };

    const title = pageTitle(n.name, lang);
    const description = (n.intro[lang] || fallbackIntro(n.name, 0, lang)).slice(0, 160);
    const path = `/location-villa-${n.slug}`;

    return {
        title,
        description,
        alternates: getAlternates(lang, path),
        ...getOpenGraph(lang, path, { title, description, ...(n.heroImage ? { image: n.heroImage } : {}) }),
    };
}

export async function NeighborhoodView({ slug, lang: langRaw }: { slug: string; lang: string }) {
    const n = getNeighborhood(slug);
    if (!n) notFound();

    const lang = asLang(langRaw);
    const villas = await CmsService.getVillasByLocation(n.sanityLocations, 'rent');
    const l = labels(lang);
    const url = `${BASE_URL}/${lang}/location-villa-${n.slug}`;
    const intro = n.intro[lang] || fallbackIntro(n.name, villas.length, lang);
    const highlights = n.highlights[lang] || [];
    const heroImage = n.heroImage || villas[0]?.mainImage || '/images/optimized-destination-hero.jpg';
    const heroSubtitle = {
        fr: `${villas.length} villas d'exception`,
        en: `${villas.length} exceptional villas`,
        es: `${villas.length} villas excepcionales`,
        pt: `${villas.length} villas excecionais`,
    }[lang];

    const placeLd = {
        '@context': 'https://schema.org',
        '@type': 'Place',
        name: `${n.name}, Saint-Barthélemy`,
        description: intro,
        image: heroImage,
        geo: { '@type': 'GeoCoordinates', latitude: n.geo.lat, longitude: n.geo.lng },
        containedInPlace: { '@type': 'Place', name: 'Saint-Barthélemy' },
        url,
    };

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: l.home, item: `${BASE_URL}/${lang}` },
            { '@type': 'ListItem', position: 2, name: l.rentals, item: `${BASE_URL}/${lang}/rentals` },
            { '@type': 'ListItem', position: 3, name: n.name, item: url },
        ],
    };

    const itemListLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: l.villasTitle(n.name),
        numberOfItems: villas.length,
        itemListElement: villas.map((v, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${BASE_URL}/${lang}/villas/${v.slug || v.id}`,
            name: v.name,
        })),
    };

    const faqLd = n.faq.length
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: n.faq.map((f) => ({
                '@type': 'Question',
                name: f.q[lang],
                acceptedAnswer: { '@type': 'Answer', text: f.a[lang] },
            })),
        }
        : null;

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
            {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

            {/* HERO */}
            <section className="relative h-[72vh] min-h-[460px] w-full overflow-hidden flex items-center justify-center">
                <Image
                    src={heroImage}
                    alt={`Villa de luxe à ${n.name}, Saint-Barthélemy`}
                    fill
                    priority
                    sizes="100vw"
                    quality={85}
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-sbh-cream" />
                <div className="relative z-10 text-center text-white px-6 max-w-3xl animate-slide-up">
                    <p className="font-sans text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.35em] sm:tracking-[0.4em] mb-4 sm:mb-6 opacity-90">Saint-Barthélemy</p>
                    <h1 className="font-serif text-2xl sm:text-4xl md:text-6xl italic leading-tight drop-shadow-xl mb-5 sm:mb-6 text-balance">
                        {pageTitle(n.name, lang)}
                    </h1>
                    <div className="w-12 sm:w-16 h-px bg-white/60 mx-auto" />
                    <p className="font-sans text-white/90 mt-5 sm:mt-6 text-xs sm:text-sm md:text-base tracking-[0.15em] uppercase">{heroSubtitle}</p>
                </div>
            </section>

            {/* EDITORIAL */}
            <section className="bg-sbh-cream px-6 md:px-12 py-16 md:py-24">
                <div className="max-w-[1000px] mx-auto">
                    <p className="font-sans text-base md:text-lg leading-relaxed text-sbh-charcoal/80">
                        {intro}
                    </p>

                    {highlights.length > 0 && (
                        <div className="mt-14">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="h-px w-8 bg-sbh-green/40" />
                                <h2 className="font-serif text-2xl italic text-sbh-charcoal">{l.highlightsTitle}</h2>
                            </div>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                {highlights.map((h, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sbh-charcoal/80 font-sans leading-relaxed">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-sbh-green shrink-0" />
                                        <span>{h}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </section>

            {/* VILLAS */}
            <div className="bg-sbh-cream">
                <div className="max-w-[1000px] mx-auto px-6 md:px-12 text-center">
                    <div className="flex items-center justify-center gap-4 mb-3">
                        <span className="h-px w-8 bg-sbh-charcoal/20" />
                        <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-sbh-charcoal/60">{l.villasKicker}</span>
                        <span className="h-px w-8 bg-sbh-charcoal/20" />
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl italic text-sbh-charcoal">{l.villasTitle(n.name)}</h2>
                </div>
            </div>
            <Suspense>
                <Collections mode="rent" initialVillas={villas} hideHero hideLocationFilter />
            </Suspense>
        </>
    );
}
