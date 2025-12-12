import { Villa } from '../types';

export const VILLAS_DATA: Villa[] = [
  {
    id: '1',
    name: 'Villa Océane',
    location: 'Flamands',
    listingType: 'rent',
    description: 'Front de mer & Design',
    fullDescription: "Posée sur le sable blanc de la baie des Flamands, la Villa Océane incarne le rêve absolu de Saint-Barth. Cette propriété d'exception, aux lignes épurées et contemporaines, efface les frontières entre intérieur et extérieur. Le salon baigné de lumière s'ouvre intégralement sur une terrasse en bois exotique et une piscine à débordement qui semble se déverser dans la mer des Caraïbes. \n\nChaque chambre est une suite privée offrant une vue imprenable sur l'horizon, décorée avec des matériaux nobles : lin naturel, bois flotté et pierre de lave. Le soir, le clapotis des vagues berce vos dîners sous les étoiles. Un service de majordome est inclus pour répondre à vos moindres désirs, du petit-déjeuner face au lever du soleil aux cocktails exclusifs au crépuscule.",
    pricePerNight: 1200,
    seasonalPrices: [
      { 
        id: 's1', 
        seasonName: 'Low Season', 
        dates: 'Apr 15 - 30 & Oct 15 - Dec 16', 
        prices: [
          { bedrooms: 2, price: 15000 },
          { bedrooms: 3, price: 18000 },
          { bedrooms: 4, price: 22000 }
        ]
      },
      { 
        id: 's2', 
        seasonName: 'Summer', 
        dates: 'May 1 - Aug 31', 
        prices: [
          { bedrooms: 2, price: 12000 },
          { bedrooms: 3, price: 15000 },
          { bedrooms: 4, price: 18000 }
        ]
      },
      { 
        id: 's3', 
        seasonName: 'High Season', 
        dates: 'Jan 9 - Apr 15', 
        prices: [
          { bedrooms: 4, price: 35000 }
        ]
      },
      { 
        id: 's4', 
        seasonName: 'Thanksgiving & Bucket', 
        dates: 'Nov & Mar', 
        prices: [
          { bedrooms: 4, price: 40000 }
        ]
      },
      { 
        id: 's5', 
        seasonName: 'Christmas', 
        dates: 'Dec 17 - Dec 26', 
        prices: [
          { bedrooms: 4, price: 65000 }
        ]
      },
      { 
        id: 's6', 
        seasonName: 'New Year', 
        dates: 'Dec 27 - Jan 8', 
        prices: [
          { bedrooms: 4, price: 85000 }
        ]
      }
    ],
    bedrooms: 4,
    bathrooms: 4,
    guests: 8,
    surface: 350,
    viewType: 'Panoramique Océan',
    mainImage: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop'
    ],
    amenities: [
      { icon: 'Waves', label: 'Accès Plage Direct' },
      { icon: 'Wind', label: 'Climatisation' },
      { icon: 'ChefHat', label: 'Cuisine Gourmet' },
      { icon: 'Wifi', label: 'Wifi Haut Débit' },
      { icon: 'Car', label: 'Parking Privé' },
      { icon: 'Droplets', label: 'Piscine Chauffée' }
    ],
    tags: ['Front de mer', 'Contemporain']
  },
  {
    id: '2',
    name: 'Casa Nopal',
    location: 'Toiny',
    listingType: 'rent',
    description: 'Authenticité & Sauvage',
    fullDescription: "Nichée sur les hauteurs sauvages de la côte de Toiny, Casa Nopal est un sanctuaire de paix pour les amoureux de nature et d'intimité. Inspirée par l'architecture traditionnelle des cases créoles mais revisitée avec une touche bohème-chic, cette villa offre une retraite loin de l'agitation. \n\nLe jardin tropical, peuplé de cactus centenaires et de palmiers, abrite une piscine en pierre naturelle cachée des regards. L'intérieur joue la carte de l'authenticité avec des murs chaulés, des charpentes apparentes et une collection d'artisanat local. C'est le point de départ idéal pour les surfeurs ou ceux qui cherchent à se reconnecter avec les éléments. Le vent des alizés rafraîchit naturellement les pièces de vie ouvertes.",
    pricePerNight: 950,
    seasonalPrices: [
      { 
        id: 's1', 
        seasonName: 'Low Season', 
        dates: 'Apr 15 - 30 & Oct 15 - Dec 16', 
        prices: [
          { bedrooms: 1, price: 6000 },
          { bedrooms: 2, price: 8000 },
          { bedrooms: 3, price: 10000 }
        ]
      },
      { 
        id: 's2', 
        seasonName: 'Summer', 
        dates: 'May 1 - Aug 31', 
        prices: [
          { bedrooms: 1, price: 5000 },
          { bedrooms: 2, price: 7000 },
          { bedrooms: 3, price: 9000 }
        ]
      },
      { 
        id: 's3', 
        seasonName: 'High Season', 
        dates: 'Jan 9 - Apr 15', 
        prices: [
          { bedrooms: 3, price: 16000 }
        ]
      },
      { 
        id: 's4', 
        seasonName: 'Thanksgiving & Bucket', 
        dates: 'Nov & Mar', 
        prices: [
          { bedrooms: 3, price: 18000 }
        ]
      },
      { 
        id: 's5', 
        seasonName: 'Christmas', 
        dates: 'Dec 17 - Dec 26', 
        prices: [
          { bedrooms: 3, price: 28000 }
        ]
      },
      { 
        id: 's6', 
        seasonName: 'New Year', 
        dates: 'Dec 27 - Jan 8', 
        prices: [
          { bedrooms: 3, price: 35000 }
        ]
      }
    ],
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
    surface: 220,
    viewType: 'Océan & Mornes',
    mainImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573046772719-75f10b80985c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800&auto=format&fit=crop'
    ],
    amenities: [
      { icon: 'Sun', label: 'Solarium' },
      { icon: 'Wind', label: 'Ventilation Naturelle' },
      { icon: 'Coffee', label: 'Machine Espresso' },
      { icon: 'Wifi', label: 'Wifi' },
      { icon: 'Flower2', label: 'Jardin Tropical' },
      { icon: 'Speaker', label: 'Sonos System' }
    ],
    tags: ['Authenticité', 'Charme']
  },
  {
    id: '3',
    name: 'The Dune',
    location: 'Saline',
    listingType: 'rent',
    description: 'Architecture & Luxe',
    fullDescription: "À quelques pas de la mythique plage de Saline, The Dune est une prouesse architecturale. Conçue par un architecte de renom, cette villa ultra-luxueuse se fond dans le paysage dunaire grâce à ses toits végétalisés et ses structures en bois gris. L'immense pièce à vivre, aux volumes cathédrale, accueille des œuvres d'art contemporain et du mobilier de designer.\n\nL'espace extérieur est conçu comme un resort privé : piscine miroir de 20 mètres, salle de fitness vitrée face à la végétation, et un cinéma en plein air pour vos soirées. Les six suites offrent une indépendance totale, chacune disposant de sa propre terrasse et douche extérieure. Le summum du luxe décontracté, pieds nus dans le sable.",
    pricePerNight: 2500,
    seasonalPrices: [
      { 
        id: 's1', 
        seasonName: 'Low Season', 
        dates: 'Apr 15 - 30 & Oct 15 - Dec 16', 
        prices: [
          { bedrooms: 4, price: 25000 },
          { bedrooms: 5, price: 30000 },
          { bedrooms: 6, price: 35000 }
        ]
      },
      { 
        id: 's2', 
        seasonName: 'Summer', 
        dates: 'May 1 - Aug 31', 
        prices: [
          { bedrooms: 4, price: 20000 },
          { bedrooms: 5, price: 25000 },
          { bedrooms: 6, price: 30000 }
        ]
      },
      { 
        id: 's3', 
        seasonName: 'High Season', 
        dates: 'Jan 9 - Apr 15', 
        prices: [
          { bedrooms: 6, price: 55000 }
        ]
      },
      { 
        id: 's4', 
        seasonName: 'Thanksgiving & Bucket', 
        dates: 'Nov & Mar', 
        prices: [
          { bedrooms: 6, price: 65000 }
        ]
      },
      { 
        id: 's5', 
        seasonName: 'Christmas', 
        dates: 'Dec 17 - Dec 26', 
        prices: [
          { bedrooms: 6, price: 110000 }
        ]
      },
      { 
        id: 's6', 
        seasonName: 'New Year', 
        dates: 'Dec 27 - Jan 8', 
        prices: [
          { bedrooms: 6, price: 150000 }
        ]
      }
    ],
    bedrooms: 6,
    bathrooms: 6,
    guests: 12,
    surface: 600,
    viewType: 'Dunes & Salines',
    mainImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop'
    ],
    amenities: [
      { icon: 'Dumbbell', label: 'Salle de Fitness' },
      { icon: 'Tv', label: 'Cinéma Plein Air' },
      { icon: 'Droplets', label: 'Piscine 20m' },
      { icon: 'ChefHat', label: 'Cuisine Pro' },
      { icon: 'Shield', label: 'Sécurité 24/7' },
      { icon: 'Utensils', label: 'BBQ Gaz' }
    ],
    tags: ['Architecture', 'Iconique']
  },
  {
    id: '4',
    name: 'Refuge Solaire',
    location: 'Gustavia',
    listingType: 'rent',
    description: 'Vue Port & Sunset',
    fullDescription: "Surplombant le port iconique de Gustavia, le Refuge Solaire offre le spectacle le plus prisé de l'île : le coucher de soleil sur les yachts et la mer des Caraïbes. Située à quelques minutes à pied des boutiques de luxe et des meilleurs restaurants, cette villa combine l'effervescence de la ville et le calme absolu d'une propriété privée.\n\nLe style est résolument 'Riviera', mêlant le blanc immaculé à des touches de bleu profond et de terre cuite. La terrasse principale est le lieu de vie par excellence, avec ses multiples salons et son bar extérieur. Idéale pour ceux qui veulent vivre Saint-Barth intensément, jour et nuit, tout en profitant d'un confort 5 étoiles.",
    pricePerNight: 1800,
    seasonalPrices: [
      { 
        id: 's1', 
        seasonName: 'Low Season', 
        dates: 'Apr 15 - 30 & Oct 15 - Dec 16', 
        prices: [
          { bedrooms: 3, price: 15000 },
          { bedrooms: 4, price: 18000 },
          { bedrooms: 5, price: 21000 }
        ]
      },
      { 
        id: 's2', 
        seasonName: 'Summer', 
        dates: 'May 1 - Aug 31', 
        prices: [
          { bedrooms: 3, price: 12000 },
          { bedrooms: 4, price: 15000 },
          { bedrooms: 5, price: 18000 }
        ]
      },
      { 
        id: 's3', 
        seasonName: 'High Season', 
        dates: 'Jan 9 - Apr 15', 
        prices: [
          { bedrooms: 5, price: 32000 }
        ]
      },
      { 
        id: 's4', 
        seasonName: 'Thanksgiving & Bucket', 
        dates: 'Nov & Mar', 
        prices: [
          { bedrooms: 5, price: 38000 }
        ]
      },
      { 
        id: 's5', 
        seasonName: 'Christmas', 
        dates: 'Dec 17 - Dec 26', 
        prices: [
          { bedrooms: 5, price: 60000 }
        ]
      },
      { 
        id: 's6', 
        seasonName: 'New Year', 
        dates: 'Dec 27 - Jan 8', 
        prices: [
          { bedrooms: 5, price: 80000 }
        ]
      }
    ],
    bedrooms: 5,
    bathrooms: 5,
    guests: 10,
    surface: 400,
    viewType: 'Port & Sunset',
    mainImage: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=800&auto=format&fit=crop'
    ],
    amenities: [
      { icon: 'ShoppingBag', label: 'Proche Commerces' },
      { icon: 'Martini', label: 'Bar Extérieur' },
      { icon: 'Sunset', label: 'Sunset View' },
      { icon: 'Wifi', label: 'Fibre Optique' },
      { icon: 'Music', label: 'Sound System' },
      { icon: 'Key', label: 'Concierge' }
    ],
    tags: ['Vue Panoramique', 'Luxe']
  },
  // ITEMS FOR SALE
  {
    id: 'sale-1',
    name: 'Villa Horizon',
    location: 'Lorient',
    listingType: 'sale',
    salePrice: 8500000,
    description: 'Potentiel & Vue',
    fullDescription: "Opportunité rare sur les hauteurs de Lorient. Cette villa de style colonial offre l'une des vues les plus spectaculaires sur la baie de Lorient et les îles environnantes. Située sur un terrain de 2000m² constructible, elle représente un investissement idéal pour un projet de rénovation ou d'agrandissement.\n\nLa structure actuelle comprend 3 chambres et de larges varangues ouvertes sur la mer. Le jardin mature abrite des flamboyants et des manguiers centenaires. Le calme y est absolu, à seulement 5 minutes des commerces et de la plage de surf.",
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
    surface: 250,
    viewType: 'Baie de Lorient',
    mainImage: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
       'https://images.unsplash.com/photo-1560518883-ce09059ee971?q=80&w=800&auto=format&fit=crop',
       'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800&auto=format&fit=crop'
    ],
    amenities: [
        { icon: 'Flower2', label: 'Grand Jardin' },
        { icon: 'Car', label: 'Garage Double' },
        { icon: 'Sun', label: 'Exposition Sud' },
        { icon: 'Wifi', label: 'Potentiel Agrandissement' }
    ],
    tags: ['Investissement', 'Vue Mer']
  },
  {
    id: 'sale-2',
    name: 'Estate St. Barth',
    location: 'Gouverneur',
    listingType: 'sale',
    salePrice: 22000000,
    description: 'Domaine Privé',
    fullDescription: "L'adresse la plus exclusive de l'île. À quelques pas de la plage immaculée de Gouverneur, ce domaine privé s'étend sur plus d'un hectare de végétation luxuriante. La propriété principale, signée par un architecte international, se compose de plusieurs pavillons indépendants reliés par des chemins de bois dans la jungle tropicale.\n\nMatériaux bruts, béton banché, bois précieux et verre dominent cette construction ultra-contemporaine. La piscine à débordement de 30 mètres est une pièce maîtresse. Une propriété trophée pour collectionneur d'immobilier d'exception, offrant une intimité totale sans aucun vis-à-vis.",
    bedrooms: 7,
    bathrooms: 8,
    guests: 14,
    surface: 900,
    viewType: 'Mer & Nature',
    mainImage: 'https://images.unsplash.com/photo-1600596542815-3ad19c6f9855?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'
    ],
    amenities: [
        { icon: 'Shield', label: 'Domaine Sécurisé' },
        { icon: 'Droplets', label: 'Piscine Olympique' },
        { icon: 'Dumbbell', label: 'Spa Privé' },
        { icon: 'Car', label: 'Héliport' }
    ],
    tags: ['Exception', 'Prestige']
  }
];