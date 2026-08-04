import type { Metadata } from 'next';
import Link from 'next/link';
import { VillaDetails } from '@/components/VillaDetails';
import { CmsService } from '@/services/cms';
import { getAlternates, getOpenGraph } from '@/utils/seo';
import { getNeighborhoodBySanityLocation } from '@/data/neighborhoods';
import { redirect, notFound } from 'next/navigation';

export const revalidate = 300;

type Props = {
    params: { id: string, lang: string }
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { id, lang } = params;
    const villa = await CmsService.getVillaByIdOrSlug(id);
    
    if (!villa) {
        return {
            title: 'Villa Introuvable | Sun Beach House',
        };
    }

    const preferredId = villa.slug || villa.id;
    const locationName = villa.location?.name || 'St. Barth';
    
    const typeLabel: Record<string, string> = {
        fr: villa.listingType === 'sale' ? 'Vente' : 'Location',
        en: villa.listingType === 'sale' ? 'Sale' : 'Rental',
        es: villa.listingType === 'sale' ? 'Venta' : 'Alquiler',
        pt: villa.listingType === 'sale' ? 'Venda' : 'Aluguel',
    };

    const type = typeLabel[lang] || typeLabel.fr;
    const mainTitle = villa.location?.name && villa.location.name !== 'St. Barth' ? `${villa.name} - ${villa.location.name}` : villa.name;
    
    // Build a richer description
    const amenitiesList = villa.amenities?.slice(0, 3).map(a => a.name).join(', ') || '';
    const featureText = amenitiesList ? `. Équipements: ${amenitiesList}` : '';
    
    const descriptions: Record<string, string> = {
        fr: `${type} de la villa de luxe ${villa.name} à ${locationName} (St barths). ${villa.bedrooms} chambres, ${villa.guests} invités${featureText}. Découvrez l'excellence à Saint-Barthélemy avec Sun Beach House.`,
        en: `Luxury ${type.toLowerCase()} of villa ${villa.name} in ${locationName} (St barths). ${villa.bedrooms} bedrooms, sleeps ${villa.guests}${featureText}. Experience excellence in St. Barth with Sun Beach House.`,
        es: `${type} de la villa de lujo ${villa.name} en ${locationName} (St barths). ${villa.bedrooms} habitaciones, ${villa.guests} huéspedes${featureText}. Descubra la excelencia en San Bartolomé con Sun Beach House.`,
        pt: `${type} da villa de luxo ${villa.name} em ${locationName} (St barths). ${villa.bedrooms} quartos, ${villa.guests} hóspedes${featureText}. Descubra a excelência em Saint-Barthélemy com a Sun Beach House.`,
    };

    const description = descriptions[lang] || descriptions.fr;

    return {
        title: mainTitle,
        description: description,
        alternates: getAlternates(lang, `/villas/${preferredId}`),
        ...getOpenGraph(lang, `/villas/${preferredId}`, {
            title: `${villa.name} | St-Barth`,
            description,
            ...(villa.mainImage ? { image: villa.mainImage } : {}),
        }),
    };
}

export async function generateStaticParams() {
    const villas = await CmsService.getSitemapData();
    const locales = ['fr', 'en', 'es', 'pt'];
    
    return villas.flatMap((villa) => 
        locales.map((lang) => ({
            id: villa.slug || villa.id,
            lang,
        }))
    );
}

export default async function VillaPage({ params }: Props) {
    const { id, lang } = params;
    const villa = await CmsService.getVillaByIdOrSlug(id);

    if (!villa) {
        notFound();
    }

    // SEO Enforcement: Redirect UUID or legacy slugs to the preferred Sanity slug
    const preferredId = villa.slug || villa.id;
    if (id !== preferredId) {
        redirect(`/${lang}/villas/${preferredId}`);
    }

    const isRental = villa.listingType === 'rent';
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': isRental ? 'VacationRental' : 'RealEstateListing',
        'name': `${villa.name} — Villa de luxe à ${villa.location?.name || 'St. Barth'}`,
        'description': typeof villa.description === 'string' ? villa.description : (villa.description[lang as keyof typeof villa.description] || villa.description.fr || ''),
        'image': [villa.mainImage, ...(villa.galleryImages || [])],
        'address': {
            '@type': 'PostalAddress',
            'addressLocality': villa.location?.name || 'St. Barth',
            'addressRegion': 'Saint-Barthélemy',
            'addressCountry': 'BL'
        },
        'telephone': '+590690634725',
        'url': `https://www.sun-beach-house.com/${lang}/villas/${preferredId}`,
        'brand': {
            '@type': 'Brand',
            'name': 'Sun Beach House'
        },
        'agentOfProperty': { '@id': 'https://www.sun-beach-house.com/#org' },
        'broker': { '@id': 'https://www.sun-beach-house.com/#org' },
        'offers': (isRental ? (villa.pricePerWeek || villa.pricePerNight) : villa.salePrice) ? {
            '@type': 'Offer',
            'priceCurrency': isRental ? (villa.currency || 'USD') : 'EUR',
            'price': isRental ? (villa.pricePerWeek || villa.pricePerNight) : villa.salePrice,
            'url': `https://www.sun-beach-house.com/${lang}/villas/${preferredId}`,
            'availability': 'https://schema.org/InStock'
        } : undefined,
        ...(isRental ? {
            'identifier': preferredId,
            ...(villa.geopoint ? {
                'latitude': villa.geopoint.lat,
                'longitude': villa.geopoint.lng,
            } : {}),
            'containsPlace': {
                '@type': 'Accommodation',
                'additionalType': 'EntirePlace',
                'occupancy': {
                    '@type': 'QuantitativeValue',
                    'value': villa.guests
                },
                'numberOfRooms': villa.bedrooms,
                'numberOfBedrooms': villa.bedrooms,
                'numberOfBathroomsTotal': villa.bathrooms,
                'floorSize': villa.surface ? {
                    '@type': 'QuantitativeValue',
                    'value': villa.surface,
                    'unitCode': 'MTK'
                } : undefined,
                'amenityFeature': villa.amenities?.map(a => ({
                    '@type': 'LocationFeatureSpecification',
                    'name': a.name,
                    'value': true
                })),
            },
        } : {
            'amenityFeature': villa.amenities?.map(a => ({
                '@type': 'LocationFeatureSpecification',
                'name': a.name,
                'value': true
            })),
            'floorSize': villa.surface ? {
                '@type': 'QuantitativeValue',
                'value': villa.surface,
                'unitCode': 'MTK'
            } : undefined,
            'numberOfRooms': villa.bedrooms,
            'occupancy': {
                '@type': 'QuantitativeValue',
                'value': villa.guests
            }
        })
    };

    const collectionSegment = isRental ? 'rentals' : 'sales';
    const collectionLabel: Record<string, string> = {
        fr: isRental ? 'Locations' : 'Ventes',
        en: isRental ? 'Rentals' : 'Sales',
        es: isRental ? 'Alquileres' : 'Ventas',
        pt: isRental ? 'Aluguéis' : 'Vendas',
    };
    const homeLabel: Record<string, string> = {
        fr: 'Accueil', en: 'Home', es: 'Inicio', pt: 'Início',
    };

    const neighborhood = villa.location?.name ? getNeighborhoodBySanityLocation(villa.location.name) : undefined;

    const breadcrumbItems = [
        {
            name: homeLabel[lang] || homeLabel.fr,
            item: `https://www.sun-beach-house.com/${lang}`,
        },
        {
            name: collectionLabel[lang] || collectionLabel.fr,
            item: `https://www.sun-beach-house.com/${lang}/${collectionSegment}`,
        },
        ...(neighborhood && isRental ? [{
            name: neighborhood.name,
            item: `https://www.sun-beach-house.com/${lang}/location-villa-${neighborhood.slug}`,
        }] : []),
        {
            name: villa.name,
            item: `https://www.sun-beach-house.com/${lang}/villas/${preferredId}`,
        },
    ];

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbItems.map((b, i) => ({
            '@type': 'ListItem',
            'position': i + 1,
            'name': b.name,
            'item': b.item,
        })),
    };

    const siblings = neighborhood
        ? (await CmsService.getAllVillas())
            .filter((v) => v.listingType === villa.listingType
                && v.id !== villa.id
                && v.location?.name
                && neighborhood.sanityLocations.includes(v.location.name))
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(0, 8)
        : [];

    const siblingsTitle: Record<string, string> = {
        fr: `Autres villas à ${neighborhood?.name}`,
        en: `More villas in ${neighborhood?.name}`,
        es: `Otras villas en ${neighborhood?.name}`,
        pt: `Outras villas em ${neighborhood?.name}`,
    };
    const hubLabel: Record<string, string> = {
        fr: `Toutes les locations de villas à ${neighborhood?.name}`,
        en: `All villa rentals in ${neighborhood?.name}`,
        es: `Todos los alquileres de villas en ${neighborhood?.name}`,
        pt: `Todos os aluguéis de villas em ${neighborhood?.name}`,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <VillaDetails villaId={villa.id} slug={villa.slug} initialVilla={villa} />
            {neighborhood && (siblings.length > 0 || isRental) && (
                <nav aria-label={siblingsTitle[lang] || siblingsTitle.fr} className="bg-sbh-cream pb-20 text-sbh-charcoal">
                    <div className="max-w-[900px] mx-auto px-6 md:px-12">
                        {siblings.length > 0 && (
                            <>
                                <h2 className="font-serif text-2xl md:text-3xl italic mb-6">{siblingsTitle[lang] || siblingsTitle.fr}</h2>
                                <ul className="columns-2 sm:columns-3 gap-8 space-y-2 mb-8">
                                    {siblings.map((v) => (
                                        <li key={v.id} className="break-inside-avoid">
                                            <Link
                                                href={`/${lang}/villas/${v.slug || v.id}`}
                                                className="font-sans font-light text-sm text-sbh-charcoal/80 hover:text-sbh-green transition-colors"
                                            >
                                                {v.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {isRental && (
                            <Link
                                href={`/${lang}/location-villa-${neighborhood.slug}`}
                                className="font-sans uppercase text-xs tracking-widest text-sbh-green border-b border-sbh-green pb-1 hover:text-sbh-charcoal hover:border-sbh-charcoal transition-colors"
                            >
                                {hubLabel[lang] || hubLabel.fr}
                            </Link>
                        )}
                    </div>
                </nav>
            )}
        </>
    );
}
