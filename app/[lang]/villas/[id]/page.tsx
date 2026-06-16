import type { Metadata } from 'next';
import { VillaDetails } from '@/components/VillaDetails';
import { CmsService } from '@/services/cms';
import { getAlternates, getOpenGraph } from '@/utils/seo';
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

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': homeLabel[lang] || homeLabel.fr,
                'item': `https://www.sun-beach-house.com/${lang}`,
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': collectionLabel[lang] || collectionLabel.fr,
                'item': `https://www.sun-beach-house.com/${lang}/${collectionSegment}`,
            },
            {
                '@type': 'ListItem',
                'position': 3,
                'name': villa.name,
                'item': `https://www.sun-beach-house.com/${lang}/villas/${preferredId}`,
            },
        ],
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
        </>
    );
}
