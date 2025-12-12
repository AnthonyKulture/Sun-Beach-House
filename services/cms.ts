
import { Villa } from '../types';
import { VILLAS_DATA } from '../data/villas';

// --- ÉTAPE 1 : INSTALLATION ---
// Installez le client sanity : npm install @sanity/client @sanity/image-url
// Puis décommentez les lignes ci-dessous :

/*
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: 'VOTRE_PROJECT_ID', // À récupérer sur manage.sanity.io
  dataset: 'production',
  useCdn: true, // true pour la rapidité, false pour des données fraîches instantanées
  apiVersion: '2024-03-01',
});

const builder = imageUrlBuilder(client);
*/

export const CmsService = {
  /**
   * Récupère toutes les villas.
   */
  getAllVillas: async (): Promise<Villa[]> => {
    // --- MODE DÉMO (Actuel) ---
    return new Promise((resolve) => {
      setTimeout(() => resolve(VILLAS_DATA), 400);
    });

    // --- MODE RÉEL (À décommenter) ---
    /*
    // La requête GROQ pour récupérer les champs nécessaires
    const query = `*[_type == "villa"] {
      _id,
      name,
      location,
      listingType,
      description,
      fullDescription,
      pricePerNight,
      salePrice,
      bedrooms,
      bathrooms,
      guests,
      surface,
      viewType,
      amenities,
      tags,
      "mainImage": mainImage.asset->url,
      "galleryImages": galleryImages[].asset->url,
      seasonalPrices
    }`;

    const villas = await client.fetch(query);
    
    // Mapping pour s'assurer que _id devient id pour notre front-end
    return villas.map((v: any) => ({
      ...v,
      id: v._id
    }));
    */
  },

  /**
   * Récupère une villa par son ID.
   */
  getVillaById: async (id: string): Promise<Villa | undefined> => {
    // --- MODE DÉMO (Actuel) ---
    return new Promise((resolve) => {
      setTimeout(() => resolve(VILLAS_DATA.find(v => v.id === id)), 300);
    });

    // --- MODE RÉEL (À décommenter) ---
    /*
    const query = `*[_type == "villa" && _id == $id][0] {
      ...,
      "mainImage": mainImage.asset->url,
      "galleryImages": galleryImages[].asset->url
    }`;
    
    const villa = await client.fetch(query, { id });
    if (!villa) return undefined;
    
    return { ...villa, id: villa._id };
    */
  },

  /**
   * Helper pour générer les URLs d'images optimisées
   */
  urlFor: (source: any) => {
    // --- MODE DÉMO ---
    return source;

    // --- MODE RÉEL (À décommenter) ---
    // return builder.image(source).auto('format').fit('max').url();
  }
};
