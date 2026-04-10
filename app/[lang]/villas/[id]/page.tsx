import type { Metadata } from 'next';
import { VillaDetails } from '@/components/VillaDetails';
import { CmsService } from '@/services/cms';

type Props = {
    params: { id: string, lang: string }
}

import { getAlternates } from '@/utils/seo';

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { id, lang } = params;
    const villa = await CmsService.getVillaById(id);
    
    if (!villa) {
        return {
            title: 'Villa Introuvable | Sun Beach House',
        };
    }

    const locationName = villa.location?.name || 'St. Barth';
    
    const typeLabel: Record<string, string> = {
        fr: villa.listingType === 'sale' ? 'Vente' : 'Location',
        en: villa.listingType === 'sale' ? 'Sale' : 'Rental',
        es: villa.listingType === 'sale' ? 'Venta' : 'Alquiler',
        pt: villa.listingType === 'sale' ? 'Venda' : 'Aluguel',
    };

    const type = typeLabel[lang] || typeLabel.fr;
    const mainTitle = `${villa.name} - ${locationName}, St. Barth | Sun Beach House`;
    
    // Build a richer description
    const amenitiesList = villa.amenities?.slice(0, 3).map(a => a.name).join(', ') || '';
    const featureText = amenitiesList ? `. Équipements: ${amenitiesList}` : '';
    
    const descriptions: Record<string, string> = {
        fr: `${type} de la villa de luxe ${villa.name} à ${locationName}. ${villa.bedrooms} chambres, ${villa.guests} invités${featureText}. Découvrez l'excellence à Saint-Barthélemy with Sun Beach House.`,
        en: `Luxury ${type.toLowerCase()} of villa ${villa.name} in ${locationName}. ${villa.bedrooms} bedrooms, sleeps ${villa.guests}${featureText}. Experience excellence in St. Barth with Sun Beach House.`,
        es: `${type} de la villa de lujo ${villa.name} en ${locationName}. ${villa.bedrooms} habitaciones, ${villa.guests} huéspedes${featureText}. Descubra la excelencia en San Bartolomé con Sun Beach House.`,
        pt: `${type} da villa de luxo ${villa.name} em ${locationName}. ${villa.bedrooms} quartos, ${villa.guests} hóspedes${featureText}. Descubra a excelência em Saint-Barthélemy com a Sun Beach House.`,
    };

    const description = descriptions[lang] || descriptions.fr;

    return {
        title: mainTitle,
        description: description,
        alternates: getAlternates(lang, `/villas/${id}`),
        openGraph: {
            title: `${villa.name} | Sun Beach House St. Barth`,
            description: description,
            images: villa.mainImage ? [villa.mainImage] : [],
            url: `https://sun-beach-house.com/${lang}/villas/${id}`,
        },
    };
}

export default async function VillaPage({ params }: Props) {
    const { id, lang } = params;
    const villa = await CmsService.getVillaById(id);

    if (!villa) return null;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LodgingBusiness',
        'name': villa.name,
        'description': typeof villa.description === 'string' ? villa.description : (villa.description[lang as keyof typeof villa.description] || villa.description.fr || ''),
        'image': villa.mainImage,
        'address': {
            '@type': 'PostalAddress',
            'addressLocality': villa.location?.name || 'St. Barth',
            'addressCountry': 'FR'
        },
        'telephone': '+590690634725',
        'priceRange': villa.listingType === 'rent' ? '$$$$' : '$$$$$',
        'numberOfRooms': villa.bedrooms,
        'occupancy': {
            '@type': 'QuantitativeValue',
            'value': villa.guests
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <VillaDetails villaId={id} />
        </>
    );
}
