export type Language = 'fr' | 'en';

export interface Translations {
    // Navbar
    nav: {
        home: string;
        rentals: string;
        sales: string;
        contact: string;
        collections: string;
        destination: string;
        concierge: string;
        spirit: string;
    };

    // Hero
    hero: {
        subtitle: string;
        location: string;
        allIsland: string;
        capacity: string;
        people: string;
        search: string;
        exclusiveCollection: string;
        mainTitle: string;
        mainTitleAccent: string;
        goButton: string;
    };

    // Collections
    collections: {
        rentals: string;
        sales: string;
        availabilities: string;
        vacationRentals: string;
        exclusiveSelection: string;
        propertiesForSale: string;
        investInException: string;
        from: string;
        to: string;
        guests: string;
        location: string;
        capacityMin: string;
        bedroomsMin: string;
        budgetMax: string;
        amenities: string;
        all: string;
        selected: string;
        properties: string;
        discover: string;
        noProperties: string;
        resetFilters: string;
        list: string;
        map: string;
        unlimited: string;
        perWeek: string;
        perNight: string;
        filters: string;
        guestsAbbrev: string;
        bedroomsAbbrev: string;
        weekAbbrev: string;
    };

    // Villa Details
    villa: {
        back: string;
        exceptional: string;
        opportunity: string;
        salePrice: string;
        perWeek: string;
        perNight: string;
        guests: string;
        bedrooms: string;
        bathrooms: string;
        sleeps: string;
        uniqueExperience: string;
        uniqueProperty: string;
        inHeartOf: string;
        characteristics: string;
        gallery: string;
        location: string;
        amenitiesServices: string;
        seasonalPricing: string;
        priceOnRequest: string;
        fromPrice: string;
        contactAgent: string;
        reserve: string;
        noImmediateCharge: string;
        bestRateGuaranteed: string;
        conciergeIncluded: string;
        arrival: string;
        departure: string;
        travelers: string;
        date: string;
        numberOfPeople: string;
        confirmDates: string;
        yourStay: string;
        otherCollections: string;
        otherOpportunities: string;
        exclusiveAgent: string;
        viewFullscreen: string;
        bedroom: string;
        week: string;
        minStay: string;
        serviceAndTax: string;
        contactUs: string;
        selectDate: string;
        valerie: string;
        features: string;
        amenities: string;
        seasonalRates: string;
        persons: string;
        interestedProperty: string;
        contact: string;
    };

    // Booking
    booking: {
        selectDate: string;
        thankYou: string;
        requestReceived: string;
        staffWillContact: string;
        backToHome: string;
        yourStay: string;
        arrival: string;
        departure: string;
        travelers: string;
        guests: string;
        customQuote: string;
        quoteDescription: string;
        noImmediateCharge: string;
        backToVilla: string;
        confirmRequest: string;
        fillForm: string;
        yourDetails: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        specialRequest: string;
        yourMessage: string;
        preferencesPlaceholder: string;
        finalizeRequest: string;
        termsAgreement: string;
    };

    // Download Brochure
    downloadBrochure: {
        title: string;
        download: string;
        generating: string;
        error: string;
    };

    // Map
    map: {
        noVillasWithLocation: string;
        view: string;
    };

    // Footer
    footer: {
        explore: string;
        findUs: string;
        newsletter: string;
        newsletterSubtitle: string;
        emailPlaceholder: string;
        subscribe: string;
        madeWith: string;
        legalNotice: string;
        privacy: string;
        rights: string;
        home: string;
        ourCollections: string;
        destination: string;
        concierge: string;
        about: string;
        contact: string;
        gustavia: string;
    };

    // Destinations
    destinations: {
        title: string;
        subtitle: string;
        introQuote: string;
        introText: string;
        historyTitle: string;
        historyP1: string;
        historyP2: string;
        historyP3: string;
        historyBadge: string;
        cultureTitle: string;
        cultureP1: string;
        cultureP2: string;
        cultureButton: string;
        neighborhoodsTitle: string;
        neighborhoodsSubtitle: string;
        gustaviaNumber: string;
        gustaviaTitle: string;
        gustaviaDescription: string;
        gustaviaQuote: string;
        gustaviaButton: string;
        saintJeanNumber: string;
        saintJeanTitle: string;
        saintJeanDescription: string;
        saintJeanButton: string;
        corossolNumber: string;
        corossolTitle: string;
        corossolDescription: string;
        corossolQuote: string;
        corossolButton: string;
        pointeMillouNumber: string;
        pointeMillouTitle: string;
        pointeMillouDescription: string;
        ctaTitle: string;
        ctaDescription: string;
        ctaExplore: string;
        ctaContact: string;
    };

    // About
    about: {
        vision: string;
        companyName: string;
        description: string;
        whyTitle: string;
        whyText: string;
        quote: string;
        founder: string;
        welcome: string;
        excellence: string;
        tailored: string;
        conciergeService: string;
        discoverProperties: string;
    };

    // Services
    services: {
        title: string;
        contactButton: string;
        quote: string;
        chef: { title: string; desc: string };
        spa: { title: string; desc: string };
        transfer: { title: string; desc: string };
        reservations: { title: string; desc: string };
        nautical: { title: string; desc: string };
    };

    // Contact
    contact: {
        title: string;
        companyTitle: string;
        privateContact: string;
        name: string;
        email: string;
        message: string;
        send: string;
        phone: string;
    };



    // Villas/Gallery
    villas: {
        exclusive: string;
        discover: string;
        exception: string;
        exploreAll: string;
        perNight: string;
    };

    // Experience
    experience: {
        islandRhythm: string;
        scrollToExplore: string;
        morning: {
            title: string;
            subtitle: string;
            description: string;
        };
        blueInfinity: {
            title: string;
            subtitle: string;
            description: string;
        };
        goldenHour: {
            title: string;
            subtitle: string;
            description: string;
        };
    };

    // Common
    common: {
        loading: string;
        error: string;
        close: string;
        download: string;
        downloadBrochure: string;
        menu: string;
    };

    // About Page
    aboutPage: {
        title: string;
        intro: {
            greeting: string;
            p1: string;
        };
        story: {
            p1: string;
            p2: string;
            p3: string;
        };
        return: {
            p1: string;
            p2: string;
            p3: string;
        };
        philosophy: {
            quote: string;
            intro: string;
            list1: string;
            list2: string;
            list3: string;
            details: string;
            whyTitle: string;
            whyP1: string;
            whyP2: string;
        };
        secret: {
            label: string;
            title: string;
            p1: string;
            p2: string;
            quote: string;
            closing: string;
        };
        conclusion: {
            quote: string;
            text: string;
        };
    };
}

const fr: Translations = {
    nav: {
        home: 'Accueil',
        rentals: 'Locations',
        sales: 'Ventes',
        contact: 'Contact',
        collections: 'Collections',
        destination: 'Destination',
        concierge: 'Conciergerie',
        spirit: "L'Esprit",
    },

    hero: {
        subtitle: 'Saint-Barthélemy',
        location: 'Localisation',
        allIsland: "Toute l'île",
        capacity: 'Capacité',
        people: 'Personnes',
        search: 'Rechercher',
        exclusiveCollection: 'Collection Exclusive 2025',
        mainTitle: "L'élégance",
        mainTitleAccent: 'française',
        goButton: 'Valider',
    },

    collections: {
        rentals: 'Locations',
        sales: 'Ventes',
        availabilities: 'Disponibilités',
        vacationRentals: 'Locations de Vacances',
        exclusiveSelection: 'Une sélection exclusive à St. Barth',
        propertiesForSale: 'Propriétés à Vendre',
        investInException: "Investir dans l'exception",
        from: 'Du',
        to: 'au',
        guests: 'Invités',
        location: 'Localisation',
        capacityMin: 'Capacité Min.',
        bedroomsMin: 'Chambres Min.',
        budgetMax: 'Budget Max',
        amenities: 'Équipements',
        all: 'Tous',
        selected: 'sélectionné(s)',
        properties: 'Propriétés',
        discover: 'Découvrir',
        noProperties: 'Aucune propriété ne correspond à vos critères.',
        resetFilters: 'Réinitialiser les filtres',
        list: 'Liste',
        map: 'Carte',
        unlimited: 'Illimité',
        perWeek: '/ semaine',
        perNight: '/ nuit',
        filters: 'Filtres',
        guestsAbbrev: 'Pers.',
        bedroomsAbbrev: 'Ch.',
        weekAbbrev: '/ sem',
    },

    villa: {
        back: 'Retour',
        exceptional: 'Exceptionnel',
        opportunity: 'Opportunité',
        salePrice: 'Prix de vente',
        perWeek: 'Par Semaine',
        perNight: 'Par Nuit',
        guests: 'Invités',
        bedrooms: 'Chambres',
        bathrooms: 'Bains',
        sleeps: 'Couchages',
        uniqueExperience: 'Une expérience',
        uniqueProperty: 'Une propriété',
        inHeartOf: 'au cœur de',
        characteristics: 'Caractéristiques',
        gallery: 'Galerie',
        location: 'Localisation',
        amenitiesServices: 'Équipements & Services',
        seasonalPricing: 'Tarifs Saisonniers',
        priceOnRequest: 'Prix sur demande',
        fromPrice: 'À partir de',
        contactAgent: "Contacter l'agent",
        reserve: 'Réserver',
        noImmediateCharge: 'Aucun débit immédiat',
        bestRateGuaranteed: 'Meilleur tarif garanti',
        conciergeIncluded: 'Conciergerie incluse',
        arrival: 'Arrivée',
        departure: 'Départ',
        travelers: 'Voyageurs',
        date: 'Date',
        numberOfPeople: 'Nombre de personnes',
        confirmDates: 'Confirmer les dates',
        yourStay: 'Votre Séjour',
        otherCollections: "D'autres collections à découvrir",
        otherOpportunities: "D'autres opportunités à découvrir",
        exclusiveAgent: 'Agent Exclusif',
        viewFullscreen: 'Voir en plein écran',
        bedroom: 'Chambre',
        week: 'semaine',
        minStay: 'Séjour minimum requis selon la période.',
        serviceAndTax: 'Prix par semaine en EUR. Service (10%) et taxe de séjour (5%) non inclus.',
        contactUs: 'Contacter',
        selectDate: 'Sélectionner une date',
        valerie: 'Valérie',
        features: 'Caractéristiques',
        amenities: 'Équipements & Services',
        seasonalRates: 'Tarifs Saisonniers',
        persons: 'Personnes',
        interestedProperty: 'Cette propriété vous intéresse ? Contactez notre équipe pour obtenir le dossier complet ou organiser une visite privée.',
        contact: 'Contacter',
    },

    downloadBrochure: {
        title: 'Télécharger la brochure PDF',
        download: 'Télécharger la Brochure',
        generating: 'Génération...',
        error: 'Erreur lors de la génération du PDF. Veuillez réessayer.',
    },

    map: {
        noVillasWithLocation: 'Aucune villa avec localisation disponible',
        view: 'Voir',
    },

    footer: {
        explore: 'Explorer',
        findUs: 'Nous Trouver',
        newsletter: 'Newsletter',
        newsletterSubtitle: 'Restez informé de nos dernières villas',
        emailPlaceholder: 'Votre email',
        subscribe: "S'inscrire",
        madeWith: 'Made with',
        legalNotice: 'Mentions Légales',
        privacy: 'Confidentialité',
        rights: '© 2025 Sun Beach House. Tous droits réservés.',
        home: 'Accueil',
        ourCollections: 'Nos Collections',
        destination: 'Destination',
        concierge: 'Conciergerie',
        about: 'À Propos',
        contact: 'Contact',
        gustavia: 'Gustavia, Saint-Barthélemy',
    },

    destinations: {
        title: 'Destination',
        subtitle: "L'Art de Vivre au Cœur des Caraïbes",
        introQuote: '"Bienvenue sur le petit caillou le plus prisé des Antilles. Une terre d\'histoire, de caractère et d\'une douceur de vivre inégalée."',
        introText: 'Chez Sun Beach House, nous pensons que pour aimer St Barth, il faut la comprendre. Fondée par Valérie, notre agence ne se contente pas de vous remettre des clés. Nous vous ouvrons les portes d\'une île authentique.',
        historyTitle: 'Entre Suède et Tropiques',
        historyP1: 'Saint-Barthélemy possède un patrimoine historique unique. Découverte par Christophe Colomb, l\'île fut cédée à la Suède en 1784 en échange d\'un droit d\'entrepôt à Göteborg.',
        historyP2: 'Cette période suédoise a laissé une empreinte indélébile, notamment dans le nom de la capitale, Gustavia, et dans l\'architecture de certains bâtiments publics aux soubassements de pierre.',
        historyP3: 'Rétrocédée à la France en 1878, l\'île a su conserver ses traditions tout en s\'ouvrant au monde.',
        historyBadge: 'L\'héritage Suédois',
        cultureTitle: 'Culture & Authenticité',
        cultureP1: 'Loin des clichés, la culture de Saint-Barth est vibrante. C\'est un mélange subtil de traditions marines, de tressage de la paille (le fameux Lataniers de Corossol) et d\'élégance à la française.',
        cultureP2: 'Avec notre conciergerie, nous vous connectons à cette âme. Que ce soit pour un restaurant caché ou une rencontre avec un pêcheur local.',
        cultureButton: 'Découvrir notre conciergerie',
        neighborhoodsTitle: 'Quartiers Emblématiques',
        neighborhoodsSubtitle: 'Où poserez-vous vos valises ?',
        gustaviaNumber: '01. Capitale',
        gustaviaTitle: 'Gustavia',
        gustaviaDescription: 'Le cœur battant de l\'île. Point de rencontre du glamour et de l\'histoire, c\'est ici que les yachts jettent l\'ancre. Flânez dans les rues bordées de boutiques de créateurs ou profitez de la vie nocturne.',
        gustaviaQuote: '"Idéal pour ceux qui aiment tout faire à pied : shopping, dîners festifs et balades sur le port."',
        gustaviaButton: 'Voir les villas à Gustavia',
        saintJeanNumber: '02. Beach Life',
        saintJeanTitle: 'Saint-Jean',
        saintJeanDescription: 'L\'effervescence chic. Quartier mythique abritant la plage où atterrissent les petits avions. Le lieu de rendez-vous pour un déjeuner les pieds dans le sable au Nikki Beach ou à l\'Eden Rock.',
        saintJeanButton: 'Voir les villas à Saint-Jean',
        corossolNumber: '03. Tradition',
        corossolTitle: 'Corossol',
        corossolDescription: 'L\'authenticité préservée. Ce petit village de pêcheurs est le gardien des traditions, où l\'on peut encore voir les dories colorées échouées sur le sable et les femmes tresser le latanier.',
        corossolQuote: '"Un havre de paix pour ceux qui recherchent le calme pittoresque."',
        corossolButton: 'Voir les villas à Corossol',
        pointeMillouNumber: '04. Panorama',
        pointeMillouTitle: 'Pointe Milou',
        pointeMillouDescription: 'Des villas accrochées à la falaise, célèbres pour offrir les plus beaux couchers de soleil de l\'île face à l\'océan Atlantique.',
        ctaTitle: 'Prêt à découvrir St Barth ?',
        ctaDescription: 'Notre expertise locale et notre approche humaine garantissent que votre séjour sera bien plus qu\'une simple location : ce sera votre histoire.',
        ctaExplore: 'Explorer nos villas',
        ctaContact: 'Contacter Valérie',
    },

    about: {
        vision: 'Vision',
        companyName: 'Sun Beach House',
        description: 'Sun Beach House est une agence spécialisée dans la location et la vente de villas à Saint-Barthélemy. Fondée par Valérie, passionnée par l\'île, l\'agence accompagne une clientèle exigeante à la recherche d\'un séjour d\'exception, combinant luxe et authenticité.',
        whyTitle: 'Pourquoi Sun Beach House ?',
        whyText: 'Vous êtes un invité.',
        quote: '"Ce n\'est pas une destination qu\'on consomme."',
        founder: 'Fondatrice',
        welcome: 'Bienvenue chez Sun Beach House.',
        excellence: "L'Excellence",
        tailored: 'sur mesure',
        conciergeService: 'Au-delà de la location, nous proposons un service complet de conciergerie personnalisée. Notre mission : offrir un service haut de gamme et humain, en alliant l\'expertise locale de Valérie à une approche chaleureuse et attentionnée.',
        discoverProperties: 'Découvrir nos biens',
    },

    services: {
        title: 'Conciergerie',
        contactButton: 'Contacter Valérie',
        quote: '"Faire de chaque séjour à Saint-Barth un moment unique."',
        chef: {
            title: 'Chefs à Domicile',
            desc: 'Gastronomie sur mesure en villa',
        },
        spa: {
            title: 'Bien-être & Spa',
            desc: 'Soins et massages privés',
        },
        transfer: {
            title: 'Transferts & Chauffeur',
            desc: 'Organisation de vos déplacements',
        },
        reservations: {
            title: 'Réservations',
            desc: 'Accès aux meilleurs restaurants',
        },
        nautical: {
            title: 'Activités Nautiques',
            desc: 'Yachting et découverte de l\'île',
        },
    },

    contact: {
        title: 'Parlons de vous.',
        companyTitle: 'Sun Beach House',
        privateContact: 'Contact Privé',
        name: 'Nom',
        email: 'Email',
        message: 'Votre Message',
        send: 'Envoyer ma demande',
        phone: 'Téléphone',
    },

    booking: {
        selectDate: 'Sélectionnez une date',
        thankYou: 'Merci, {name}',
        requestReceived: 'Votre demande de réservation pour la {villa} a bien été reçue.',
        staffWillContact: 'Notre équipe de conciergerie va vérifier les disponibilités et reviendra vers vous sous 24h pour finaliser votre séjour.',
        backToHome: "Retour à l'accueil",
        yourStay: 'Votre Séjour',
        arrival: 'Arrivée',
        departure: 'Départ',
        travelers: 'Voyageurs',
        guests: 'Invités',
        customQuote: 'Devis personnalisé',
        quoteDescription: 'Les prix et le devis détaillé vous seront envoyés après réception de votre demande. Notre équipe reviendra vers vous sous 24h avec une proposition personnalisée incluant tous les détails tarifaires et les disponibilités confirmées.',
        noImmediateCharge: 'Aucun débit immédiat. Cette demande ne vous engage à rien. Vous recevrez une proposition détaillée avant toute confirmation.',
        backToVilla: 'Retour à la villa',
        confirmRequest: 'Confirmez votre demande',
        fillForm: "Remplissez ce formulaire pour poser une option sur vos dates. Aucune carte bancaire n'est requise à cette étape.",
        yourDetails: 'Vos Coordonnées',
        firstName: 'Prénom',
        lastName: 'Nom',
        email: 'Email',
        phone: 'Téléphone',
        specialRequest: 'Demande Spéciale (Optionnel)',
        yourMessage: 'Votre message',
        preferencesPlaceholder: "Préférences, heures d'arrivée, allergies...",
        finalizeRequest: 'Finaliser la demande',
        termsAgreement: 'En cliquant sur ce bouton, vous acceptez nos conditions générales de réservation.',
    },

    villas: {
        exclusive: 'Exclusive',
        discover: 'Découvrir',
        exception: 'Exception',
        exploreAll: 'Parcourir toutes les villas',
        perNight: '/ nuit',
    },

    experience: {
        islandRhythm: 'Le Rythme de l\'Île',
        scrollToExplore: 'Scroll to explore',
        morning: {
            title: 'Matin Calme',
            subtitle: '07:00 AM — Flamands',
            description: 'Le soleil se lève doucement sur la baie. Séance de yoga privée sur la terrasse, face à l\'océan qui s\'éveille.',
        },
        blueInfinity: {
            title: 'Bleu Infini',
            subtitle: '12:30 PM — Colombier',
            description: 'Mouillage exclusif dans la réserve naturelle. Baignade dans les eaux turquoises et déjeuner sur le pont.',
        },
        goldenHour: {
            title: 'Golden Hour',
            subtitle: '06:45 PM — Gustavia',
            description: 'L\'heure magique où le ciel s\'embrase. Cocktails signature et ambiance feutrée avant la nuit tropicale.',
        },
    },

    common: {
        loading: 'Chargement...',
        error: 'Erreur',
        close: 'Fermer',
        download: 'Télécharger',
        downloadBrochure: 'Télécharger la brochure',
        menu: 'Menu',
    },

    aboutPage: {
        title: "L'Esprit",
        intro: {
            greeting: "Bienvenue. Je suis Valérie.",
            p1: "Et si vous êtes ici… ce n'est peut-être pas un hasard. Je ne suis pas seulement quelqu'un qui loue des villas à Saint-Barthélemy. Je suis quelqu'un qui connaît cette île par le cœur — pas seulement sur une carte.",
        },
        story: {
            p1: "La première fois que j'ai posé le pied à Saint-Barth, c'était en 1993. J'étais jeune, libre, curieuse… et je suis tombée amoureuse de cette île avant même de comprendre pourquoi.",
            p2: "Ce n'était pas seulement la mer turquoise, les collines sauvages ou les couchers de soleil dorés. C'était autre chose. Une énergie. Une vibration unique, presque magnétique. C'est cette essence que je transmets aujourd'hui à travers Sun Beach House.",
            p3: "En 1996, j'ai posé mes valises ici. Pas en touriste — mais comme quelqu'un qui avait trouvé un morceau d'elle-même. J'ai vécu à Saint-Barth jusqu'en 2001 : une époque où l'île était encore intime, authentique, presque secrète. Une époque que seuls ceux qui l'ont vécue peuvent vraiment comprendre.",
        },
        return: {
            p1: "Puis la vie m'a ramenée à Bruxelles. J'y ai étudié l'immobilier — sans me douter que je préparais, sans le savoir, mon retour.",
            p2: "Dix ans plus tard, l'appel de Saint-Barth est revenu. Pas un simple désir… Un rappel. Parce qu'il existe des lieux qui nous choisissent, même quand nous croyons les avoir quittés.",
            p3: "Revenir n'a pas été simple. Il a fallu reconstruire, retrouver mes repères, redonner du sens à ce retour. Mais je suis restée. Parce que je savais que j'étais exactement là où je devais être, pour bâtir Sun Beach House.",
        },
        philosophy: {
            quote: "Aujourd'hui, mon travail n'est pas une transaction. C'est une rencontre.",
            intro: "Je ne loue pas seulement une villa. Je crée un espace où vous pouvez vivre quelque chose :",
            list1: "des vacances qui transforment",
            list2: "un moment qui marque",
            list3: "une expérience qui reste",
            details: "Je connais les plages secrètes, les sentiers oubliés, les restaurants simples où l'on rit, les spots où le soleil tombe comme de l'or sur la mer. Je connais aussi les subtilités, les saisons, les nuances d'une île que l'on croit connaître… mais que l'on comprend réellement seulement avec le cœur.",
            whyTitle: "Pourquoi Sun Beach House ?",
            whyP1: "Parce qu'ici, vous n'êtes pas un dossier, ni un numéro, ni une réservation. Vous êtes un invité.",
            whyP2: "Je travaille avec respect, avec écoute, avec authenticité. Je crée des liens. Certains clients reviennent chaque année. Certains sont même devenus des amis. Parce qu'ici, il ne s'agit pas seulement de luxe. Il s'agit d'histoires. D'émotions. De connexions vraies.",
        },
        secret: {
            label: "Confidence",
            title: "Et puis… il y a autre chose.",
            p1: "Quelque chose qui naît doucement, presque en secret. Un projet nouveau. Un projet qui n'a rien à voir avec la location de villas… et en même temps, tout à voir avec l'essence profonde de cette île.",
            p2: "Un espace pour se reconnecter, pour ressentir, pour retrouver ce que tant ont perçu ici la première fois : cette énergie pure, simple, originelle. Un lieu ouvert à tous. Un lieu où l'on ne consomme pas l'île — où on la rencontre.",
            quote: "Pour l'instant, ce projet n'a pas encore de nom public. Il mûrit, élégamment, comme un secret que l'on préserve avant de l'offrir au monde.",
            closing: "Si vous venez pour vous retrouver… ce projet vous trouvera.",
        },
        conclusion: {
            quote: "Saint-Barth se vit. Ce n'est pas une destination qu'on consomme.",
            text: "Je suis là pour vous accompagner. Avec simplicité. Avec intégrité. Avec cette connaissance intime que seuls les anciens amoureux de l'île portent en eux.",
        },
    },
};

const en: Translations = {
    nav: {
        home: 'Home',
        rentals: 'Rentals',
        sales: 'Sales',
        contact: 'Contact',
        collections: 'Collections',
        destination: 'Destination',
        concierge: 'Concierge',
        spirit: 'The Spirit',
    },

    hero: {
        subtitle: 'Saint-Barthélemy',
        location: 'Location',
        allIsland: 'Entire Island',
        capacity: 'Capacity',
        people: 'People',
        search: 'Search',
        exclusiveCollection: 'Exclusive Collection 2025',
        mainTitle: 'French elegance',
        mainTitleAccent: 'in the Caribbean',
        goButton: 'Go',
    },

    collections: {
        rentals: 'Rentals',
        sales: 'Sales',
        availabilities: 'Availabilities',
        vacationRentals: 'Vacation Rentals',
        exclusiveSelection: 'An exclusive selection in St. Barth',
        propertiesForSale: 'Properties for Sale',
        investInException: 'Invest in the exceptional',
        from: 'From',
        to: 'to',
        guests: 'Guests',
        location: 'Location',
        capacityMin: 'Min. Capacity',
        bedroomsMin: 'Min. Bedrooms',
        budgetMax: 'Max Budget',
        amenities: 'Amenities',
        all: 'All',
        selected: 'selected',
        properties: 'Properties',
        discover: 'Discover',
        noProperties: 'No properties match your criteria.',
        resetFilters: 'Reset filters',
        list: 'List',
        map: 'Map',
        unlimited: 'Unlimited',
        perWeek: '/ week',
        perNight: '/ night',
        filters: 'Filters',
        guestsAbbrev: 'Ppl',
        bedroomsAbbrev: 'Bdr',
        weekAbbrev: '/ wk',
    },

    villa: {
        back: 'Back',
        exceptional: 'Exceptional',
        opportunity: 'Opportunity',
        salePrice: 'Sale price',
        perWeek: 'Per Week',
        perNight: 'Per Night',
        guests: 'Guests',
        bedrooms: 'Bedrooms',
        bathrooms: 'Bathrooms',
        sleeps: 'Sleeps',
        uniqueExperience: 'A unique experience',
        uniqueProperty: 'A unique property',
        inHeartOf: 'in the heart of',
        characteristics: 'Characteristics',
        gallery: 'Gallery',
        location: 'Location',
        amenitiesServices: 'Amenities & Services',
        seasonalPricing: 'Seasonal Pricing',
        priceOnRequest: 'Price on request',
        fromPrice: 'From',
        contactAgent: 'Contact agent',
        reserve: 'Reserve',
        noImmediateCharge: 'No immediate charge',
        bestRateGuaranteed: 'Best rate guaranteed',
        conciergeIncluded: 'Concierge included',
        arrival: 'Arrival',
        departure: 'Departure',
        travelers: 'Travelers',
        date: 'Date',
        numberOfPeople: 'Number of people',
        confirmDates: 'Confirm dates',
        yourStay: 'Your Stay',
        otherCollections: 'Other collections to discover',
        otherOpportunities: 'Other opportunities to discover',
        exclusiveAgent: 'Exclusive Agent',
        viewFullscreen: 'View fullscreen',
        bedroom: 'Bedroom',
        week: 'week',
        minStay: 'Minimum stay required depending on the period.',
        serviceAndTax: 'Price per week in EUR. Service (10%) and tourist tax (5%) not included.',
        contactUs: 'Contact',
        selectDate: 'Select a date',
        valerie: 'Valérie',
        features: 'Features',
        amenities: 'Amenities & Services',
        seasonalRates: 'Seasonal Rates',
        persons: 'Persons',
        interestedProperty: 'Interested in this property? Contact our team to obtain the complete file or organize a private visit.',
        contact: 'Contact',
    },

    map: {
        noVillasWithLocation: 'No villas with location available',
        view: 'View',
    },

    footer: {
        explore: 'Explore',
        findUs: 'Find Us',
        newsletter: 'Newsletter',
        newsletterSubtitle: 'Stay informed about our latest villas',
        emailPlaceholder: 'Your email',
        subscribe: 'Subscribe',
        madeWith: 'Made with',
        legalNotice: 'Legal Notice',
        privacy: 'Privacy',
        rights: '© 2025 Sun Beach House. All rights reserved.',
        home: 'Home',
        ourCollections: 'Our Collections',
        destination: 'Destination',
        concierge: 'Concierge',
        about: 'About',
        contact: 'Contact',
        gustavia: 'Gustavia, Saint-Barthélemy',
    },

    downloadBrochure: {
        title: 'Download PDF brochure',
        download: 'Download Brochure',
        generating: 'Generating...',
        error: 'Error generating PDF. Please try again.',
    },

    destinations: {
        title: 'Destination',
        subtitle: 'The Art of Living in the Caribbean',
        introQuote: '"Welcome to the most coveted gem of the Antilles. A land of history, character and unparalleled joie de vivre."',
        introText: 'At Sun Beach House, we believe that to love St Barth, you must understand it. Founded by Valérie, our agency doesn\'t just hand you keys. We open the doors to an authentic island.',
        historyTitle: 'Between Sweden and the Tropics',
        historyP1: 'Saint-Barthélemy has a unique historical heritage. Discovered by Christopher Columbus, the island was ceded to Sweden in 1784 in exchange for warehouse rights in Gothenburg.',
        historyP2: 'This Swedish period left an indelible mark, particularly in the name of the capital, Gustavia, and in the architecture of certain public buildings with stone foundations.',
        historyP3: 'Returned to France in 1878, the island has preserved its traditions while opening up to the world.',
        historyBadge: 'The Swedish Legacy',
        cultureTitle: 'Culture & Authenticity',
        cultureP1: 'Far from clichés, Saint-Barth\'s culture is vibrant. It\'s a subtle blend of maritime traditions, straw weaving (the famous Lataniers of Corossol), and French elegance.',
        cultureP2: 'With our concierge service, we connect you to this soul. Whether for a hidden restaurant or a meeting with a local fisherman.',
        cultureButton: 'Discover our concierge service',
        neighborhoodsTitle: 'Iconic Neighborhoods',
        neighborhoodsSubtitle: 'Where will you set down your luggage?',
        gustaviaNumber: '01. Capital',
        gustaviaTitle: 'Gustavia',
        gustaviaDescription: 'The beating heart of the island. Where glamour meets history, this is where yachts drop anchor. Stroll through streets lined with designer boutiques or enjoy the nightlife.',
        gustaviaQuote: '"Ideal for those who love to do everything on foot: shopping, festive dinners and harbor walks."',
        gustaviaButton: 'View villas in Gustavia',
        saintJeanNumber: '02. Beach Life',
        saintJeanTitle: 'Saint-Jean',
        saintJeanDescription: 'Chic effervescence. Legendary neighborhood with the beach where small planes land. The meeting place for a beachfront lunch at Nikki Beach or Eden Rock.',
        saintJeanButton: 'View villas in Saint-Jean',
        corossolNumber: '03. Tradition',
        corossolTitle: 'Corossol',
        corossolDescription: 'Preserved authenticity. This small fishing village is the guardian of traditions, where you can still see colorful dories stranded on the sand and women weaving lataniers.',
        corossolQuote: '"A haven of peace for those seeking picturesque calm."',
        corossolButton: 'View villas in Corossol',
        pointeMillouNumber: '04. Panorama',
        pointeMillouTitle: 'Pointe Milou',
        pointeMillouDescription: 'Villas clinging to the cliff, famous for offering the island\'s most beautiful sunsets over the Atlantic Ocean.',
        ctaTitle: 'Ready to discover St Barth?',
        ctaDescription: 'Our local expertise and human approach ensure that your stay will be much more than a simple rental: it will be your story.',
        ctaExplore: 'Explore our villas',
        ctaContact: 'Contact Valérie',
    },

    about: {
        vision: 'Vision',
        companyName: 'Sun Beach House',
        description: 'Sun Beach House is an agency specialized in renting and selling villas in Saint-Barthélemy. Founded by Valérie, passionate about the island, the agency supports discerning clientele seeking an exceptional stay, combining luxury and authenticity.',
        whyTitle: 'Why Sun Beach House?',
        whyText: 'You are a guest.',
        quote: '"It\'s not a destination to consume."',
        founder: 'Founder',
        welcome: 'Welcome to Sun Beach House.',
        excellence: 'Excellence',
        tailored: 'tailored',
        conciergeService: 'Beyond rentals, we offer a complete personalized concierge service. Our mission: to provide a high-end and human service, combining Valérie\'s local expertise with a warm and attentive approach.',
        discoverProperties: 'Discover our properties',
    },

    services: {
        title: 'Concierge',
        contactButton: 'Contact Valérie',
        quote: '"Making every stay in Saint-Barth a unique moment."',
        chef: {
            title: 'Private Chefs',
            desc: 'Tailor-made gastronomy at your villa',
        },
        spa: {
            title: 'Wellness & Spa',
            desc: 'Private care and massages',
        },
        transfer: {
            title: 'Transfers & Driver',
            desc: 'Organizing your travels',
        },
        reservations: {
            title: 'Reservations',
            desc: 'Access to the best restaurants',
        },
        nautical: {
            title: 'Water Activities',
            desc: 'Yachting and island discovery',
        },
    },

    contact: {
        title: 'Let\'s talk about you.',
        companyTitle: 'Sun Beach House',
        privateContact: 'Private Contact',
        name: 'Name',
        email: 'Email',
        message: 'Your Message',
        send: 'Send my request',
        phone: 'Phone',
    },

    booking: {
        selectDate: 'Select a date',
        thankYou: 'Thank you, {name}',
        requestReceived: 'Your booking request for {villa} has been received.',
        staffWillContact: 'Our concierge team will check availability and get back to you within 24 hours to finalize your stay.',
        backToHome: "Back to Home",
        yourStay: 'Your Stay',
        arrival: 'Arrival',
        departure: 'Departure',
        travelers: 'Travelers',
        guests: 'Guest(s)',
        customQuote: 'Personalized Quote',
        quoteDescription: 'Prices and a detailed quote will be sent to you upon receipt of your request. Our team will get back to you within 24 hours with a personalized proposal including all pricing details and confirmed availability.',
        noImmediateCharge: 'No immediate charge. This request does not commit you to anything. You will receive a detailed proposal before any confirmation.',
        backToVilla: 'Back to Villa',
        confirmRequest: 'Confirm your request',
        fillForm: "Fill out this form to place an option on your dates. No credit card is required at this stage.",
        yourDetails: 'Your Details',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone',
        specialRequest: 'Special Request (Optional)',
        yourMessage: 'Your message',
        preferencesPlaceholder: 'Preferences, arrival times, allergies...',
        finalizeRequest: 'Finalize Request',
        termsAgreement: 'By clicking this button, you agree to our booking terms and conditions.',
    },

    villas: {
        exclusive: 'Exclusive',
        discover: 'Discover',
        exception: 'Exception',
        exploreAll: 'Browse all villas',
        perNight: '/ night',
    },

    experience: {
        islandRhythm: 'The Island Rhythm',
        scrollToExplore: 'Scroll to explore',
        morning: {
            title: 'Peaceful Morning',
            subtitle: '07:00 AM — Flamands',
            description: 'The sun rises gently over the bay. Private yoga session on the terrace, facing the awakening ocean.',
        },
        blueInfinity: {
            title: 'Blue Infinity',
            subtitle: '12:30 PM — Colombier',
            description: 'Exclusive anchorage in the natural reserve. Swimming in turquoise waters and lunch on deck.',
        },
        goldenHour: {
            title: 'Golden Hour',
            subtitle: '06:45 PM — Gustavia',
            description: 'The magical hour when the sky lights up. Signature cocktails and cozy atmosphere before the tropical night.',
        },
    },

    common: {
        loading: 'Loading...',
        error: 'Error',
        close: 'Close',
        download: 'Download',
        downloadBrochure: 'Download brochure',
        menu: 'Menu',
    },

    aboutPage: {
        title: 'The Spirit',
        intro: {
            greeting: "Welcome. I'm Valérie.",
            p1: "And if you're here... maybe it's not by chance. I'm not just someone who rents villas in Saint-Barthélemy. I'm someone who knows this island by heart — not just on a map.",
        },
        story: {
            p1: "The first time I set foot in Saint-Barth was in 1993. I was young, free, curious... and I fell in love with this island before I even understood why.",
            p2: "It wasn't just the turquoise sea, the wild hills, or the golden sunsets. It was something else. An energy. A unique, almost magnetic vibration. This is the essence I now share through Sun Beach House.",
            p3: "In 1996, I settled here. Not as a tourist — but as someone who had found a piece of herself. I lived in Saint-Barth until 2001: a time when the island was still intimate, authentic, almost secret. A time that only those who lived it can truly understand.",
        },
        return: {
            p1: "Then life brought me back to Brussels. I studied real estate there — not knowing I was preparing, unknowingly, for my return.",
            p2: "Ten years later, Saint-Barth's call came back. Not a simple desire... A reminder. Because there are places that choose us, even when we think we've left them.",
            p3: "Coming back wasn't easy. I had to rebuild, find my bearings again, give meaning to this return. But I stayed. Because I knew I was exactly where I needed to be, to build Sun Beach House.",
        },
        philosophy: {
            quote: "Today, my work is not a transaction. It's an encounter.",
            intro: "I don't just rent a villa. I create a space where you can experience something:",
            list1: "vacations that transform",
            list2: "a moment that marks you",
            list3: "an experience that stays",
            details: "I know the secret beaches, the forgotten trails, the simple restaurants where we laugh, the spots where the sun falls like gold on the sea. I also know the subtleties, the seasons, the nuances of an island we think we know... but truly understand only with the heart.",
            whyTitle: "Why Sun Beach House?",
            whyP1: "Because here, you're not a file, a number, or a reservation. You're a guest.",
            whyP2: "I work with respect, with listening, with authenticity. I create connections. Some clients come back every year. Some have even become friends. Because here, it's not just about luxury. It's about stories. Emotions. Real connections.",
        },
        secret: {
            label: "Confidence",
            title: "And then... there's something else.",
            p1: "Something born gently, almost in secret. A new project. A project that has nothing to do with villa rentals... and at the same time, everything to do with the deep essence of this island.",
            p2: "A space to reconnect, to feel, to rediscover what so many perceived here the first time: this pure, simple, original energy. A place open to all. A place where we don't consume the island — where we meet it.",
            quote: "For now, this project has no public name yet. It's maturing, elegantly, like a secret we preserve before offering it to the world.",
            closing: "If you come to find yourself... this project will find you.",
        },
        conclusion: {
            quote: "Saint-Barth is lived. It's not a destination to consume.",
            text: "I'm here to accompany you. With simplicity. With integrity. With this intimate knowledge that only the island's former lovers carry within them.",
        },
    },
};

export const translations: Record<Language, Translations> = {
    fr,
    en,
};
