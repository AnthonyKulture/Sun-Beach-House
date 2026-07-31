import { Language, Translations } from './types';
export type { Language, Translations };

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
        magazine: 'Magazine',
    },

    hero: {
        subtitle: 'Saint-Barthélemy',
        location: 'Localisation',
        allIsland: "Toute l'île",
        capacity: 'Capacité',
        people: 'Invités',
        search: 'Rechercher',
        exclusiveCollection: 'Collection Exclusive 2026',
        mainTitle: "L'élégance",
        mainTitleAccent: 'française',
        goButton: 'Valider',
        type: 'Type',
        seasonalRental: 'Location saisonnière',
        sale: 'Vente',
        rooms: 'Pièces',
        ourCollections: 'Nos Collections',
        seasonalRentals: 'Locations saisonnières',
        propertiesForSale: 'Biens à vendre',
        disclaimerText: 'Certaines villas d’exception sont volontairement conservées hors ligne\nafin de préserver la discrétion de leurs propriétaires.\nNotre équipe pourra vous les présenter de manière personnalisée selon vos critères.',
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
        budget: 'Budget',
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
        guestsAbbrev: 'Invités',
        bedroomsAbbrev: 'Ch.',
        weekAbbrev: '/ sem',
        explore: 'Rechercher une villa...',
        propertyType: 'Type de bien',
        allTypes: 'Tous',
        villa: 'Villa',
        apartment: 'Appartement',
        land: 'Terrain',
        commercial: 'Fond de commerce',
        price: 'Prix',
        minPrice: 'Min',
        maxPrice: 'Max',
        landSurfaceMin: 'Surface terrain min (m²)',
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
        bathroom: 'Salle de bain',
        bathrooms: 'Salles de bain',
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
        reserve: 'Vérifier la disponibilité',
        noImmediateCharge: 'Nous vérifions personnellement chaque disponibilité afin de vous garantir une information fiable et des propositions entièrement personnalisées.\nLes villas pouvant être louées en quelques heures, les plannings ne sont pas toujours mis à jour instantanément.',
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
        serviceAndTax: 'Prix par semaine en USD. Service (10%) et taxe de séjour (5%) non inclus.',
        contactUs: 'Contacter',
        selectDate: 'Sélectionner une date',
        valerie: 'Valérie',
        features: 'Caractéristiques',
        amenities: 'Équipements & Services',
        seasonalRates: 'Tarifs Saisonniers',
        persons: 'Personnes',
        interestedProperty: 'Cette propriété vous intéresse ? Contactez notre équipe pour obtenir le dossier complet ou organiser une visite privée.',
        contact: 'Contacter',
        seasons: {
            lowSeason: 'Basse Saison',
            summer: 'Été',
            highSeason: 'Haute Saison',
            thanksgiving: 'Thanksgiving & Bucket',
            christmas: 'Noël',
            newYear: 'Nouvel An',
        },
        video: 'Vidéo',
        morePhotos: '+ {count} photos',
        downloadPdf: 'Télécharger le dossier (pdf)',
        types: {
            villa: 'Villa',
            apartment: 'Appartement',
            land: 'Terrain',
            commercial: 'Fond de commerce',
        },
        surface: 'Habitable',
        landSurface: 'Terrain',
        aboutThisProperty: 'À propos de la villa',
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
        tagline: "L'art de vivre à Saint-Barthélemy.\nUne collection de villas d'exception et un service de conciergerie sur-mesure par Valérie.",
        explore: 'Explorer',
        findUs: 'Nous Trouver',
        newsletter: 'Newsletter',
        newsletterSubtitle: 'Restez informé de nos dernières villas',
        emailPlaceholder: 'Votre email',
        subscribe: "S'inscrire",
        madeWith: 'Made with',
        legalNotice: 'Mentions Légales',
        privacy: 'Confidentialité',
        rights: 'Sun Beach House. Tous droits réservés.',
        home: 'Accueil',
        ourCollections: 'Nos Collections',
        destination: 'Destination',
        concierge: 'Conciergerie',
        about: 'À Propos',
        contact: 'Contact',
        gustavia: 'Gustavia, Saint-Barthélemy',
        bookingConditions: 'Conditions de réservation',
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
        quote: 'Faire de chaque séjour à Saint-Barth un moment unique.',
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
    // French translations for conciergerie page - To be added to translations.ts after services section

    conciergeriePage: {
        title: 'Conciergerie Sun Beach House',
        subtitle: 'L\'art du service sur mesure à Saint-Barthélemy',
        intro: 'Votre séjour à Saint-Barth mérite une attention particulière. Notre service de conciergerie transforme chaque détail en expérience mémorable, du chef privé aux transferts VIP, en passant par les réservations exclusives et les activités sur mesure.',
        cta: 'Demander un devis personnalisé',
        servicesTitle: 'Nos Services',

        chef: {
            title: 'Chefs à Domicile',
            shortDesc: 'Gastronomie sur mesure en villa',
            longDesc: 'Savourez une expérience culinaire d\'exception sans quitter votre villa. Nos chefs privés partenaires créent des menus personnalisés inspirés de la cuisine française et caribéenne.',
            features: [
                'Cuisine gastronomique française et caribéenne',
                'Menus personnalisés selon vos préférences',
                'Service en villa avec dressage élégant',
                'Approvisionnement produits locaux et importés'
            ]
        },

        spa: {
            title: 'Bien-être & Spa',
            shortDesc: 'Soins et massages privés',
            longDesc: 'Transformez votre villa en sanctuaire de bien-être. Nos thérapeutes qualifiés apportent l\'expérience spa directement chez vous, pour un moment de détente absolu.',
            features: [
                'Massages personnalisés (suédois, deep tissue, pierres chaudes)',
                'Soins du visage et du corps haut de gamme',
                'Séances de yoga privées face à la mer'
            ]
        },

        transfer: {
            title: 'Transferts & Chauffeur',
            shortDesc: 'Organisation de vos déplacements',
            longDesc: 'Déplacez-vous en toute élégance et sérénité. Du transfert aéroport aux excursions sur l\'île, nous organisons tous vos déplacements avec des véhicules premium et chauffeurs professionnels.',
            features: [
                'Transferts aéroport / héliport privés',
                'Service de chauffeur à la journée ou demi-journée',
                'Véhicules premium climatisés',
                'Coordination avec vos horaires de vol'
            ]
        },

        reservations: {
            title: 'Réservations',
            shortDesc: 'Accès aux meilleurs restaurants',
            longDesc: 'Accédez aux tables les plus prisées de Saint-Barth. Grâce à notre réseau local, nous vous garantissons une place dans les restaurants les plus exclusifs, même en haute saison.',
            features: [
                'Réservations restaurants étoilés et beach clubs',
                'Tables privilégiées avec vue mer',
                'Recommandations personnalisées selon vos goûts',
                'Organisation d\'événements privés et anniversaires'
            ]
        },

        nautical: {
            title: 'Activités Nautiques',
            shortDesc: 'Yachting et découverte de l\'île',
            longDesc: 'Découvrez Saint-Barth depuis la mer. Louez un yacht pour la journée, partez en excursion vers les îles voisines, ou initiez-vous à la plongée dans les eaux cristallines des Caraïbes.',
            features: [
                'Location de yachts et catamarans avec équipage',
                'Excursions journée vers Anguilla, St Martin',
                'Plongée sous-marine et snorkeling guidés',
                'Sports nautiques : paddle, jet-ski, kitesurf'
            ]
        },

        travel: {
            title: 'Voyage, Transport & Arrivée à Saint-Barth',
            shortDesc: 'Une expérience fluide, élégante et sur mesure',
            intro: 'De votre départ jusqu\'à votre arrivée à Saint-Barth, chaque étape de votre voyage peut être organisée avec soin afin de vous offrir une expérience fluide, confortable et sans stress. En complément de votre séjour, des services de transport et d\'assistance haut de gamme peuvent être proposés sur demande, pour vous permettre d\'arriver et de repartir dans les meilleures conditions possibles.',
            solutionsTitle: 'Solutions de transport sur mesure',
            solutions: [
                'Vols privés (avions et hélicoptères)',
                'Vols réguliers via Saint-Martin (SXM), San Juan (SJU), Antigua (ANU), Pointe-à-Pitre (PTP)',
                'Transferts maritimes privés et charters bateau depuis les îles voisines'
            ],
            partnersNote: 'Ces prestations sont organisées avec des partenaires spécialisés dans le voyage de luxe et sont facturées séparément. Chaque solution est pensée pour optimiser votre temps et vous offrir une arrivée à Saint-Barth en toute sérénité.'
        },

        vip: {
            title: 'Services VIP Aéroport',
            shortDesc: 'Une option premium pour un passage fluide',
            intro: 'Les aéroports de Saint-Martin et de Saint-Barth peuvent être particulièrement fréquentés, notamment en haute saison, les week-ends et pendant les périodes de vacances. Les services VIP aéroport, proposés en option, permettent de transformer votre arrivée ou votre départ en une expérience fluide et confortable.',
            whyTitle: 'Pourquoi choisir un service VIP ?',
            whyItems: [
                'Éviter les longues files d\'attente à l\'immigration',
                'Gagner un temps précieux',
                'Voyager dans un cadre calme et discret',
                'Bénéficier d\'un accompagnement personnalisé'
            ],
            whatIsIt: 'En quoi consiste le service VIP aéroport ?',
            whatIsItDesc: 'Dès votre arrivée, un agent dédié vous accueille et prend en charge l\'ensemble des formalités, afin de vous accompagner en toute simplicité jusqu\'à votre véhicule, votre bateau ou votre avion de correspondance.',
            includedTitle: 'Prestations incluses',
            arrivalTitle: 'À l\'arrivée',
            arrivalItems: [
                'Accueil personnalisé à l\'avion ou au terminal',
                'Passage prioritaire à l\'immigration et aux douanes (fast track)',
                'Assistance et prise en charge des bagages',
                'Accompagnement à travers le terminal',
                'Coordination avec votre chauffeur, transfert maritime ou vol de correspondance'
            ],
            departureTitle: 'Au départ',
            departureItems: [
                'Prise en charge des bagages depuis votre lieu de séjour jusqu\'à l\'aéroport',
                'Enregistrement dédié',
                'Accès prioritaire aux contrôles de sécurité et de passeport',
                'Assistance bagages',
                'Accompagnement jusqu\'à l\'avion ou à la porte d\'embarquement',
                'Accès salon VIP (selon disponibilité)'
            ],
            optionalNote: 'Ce service est entièrement optionnel et facturé en supplément, pour les voyageurs souhaitant un confort optimal et un gain de temps maximal. Disponible notamment à Saint-Martin (SXM), Saint-Barth (SBH), San Juan (SJU) et Antigua (ANU).'
        }
    },

    contact: {
        title: 'Parlons de vous.',
        subtitle: 'Projet de vacances, mariage, anniversaire ou tout autre événement avec conciergerie de luxe.',
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
        confirmRequest: 'Demande de disponibilité',
        fillForm: "Remplissez ce formulaire pour vérifier les disponibilités. Aucune carte bancaire n'est requise à cette étape.",
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
            subtitle: '12:30 PM — Grand Cul-de-sac',
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
        notFound: {
            title: '404',
            subtitle: 'Page Introuvable',
            message: "Désolé, la page que vous recherchez semble s'être envolée vers d'autres horizons. Laissez-nous vous guider vers l'essentiel.",
            backToHome: "Retour à l'Accueil"
        }
    },

    aboutPage: {
        title: "L'Esprit",
        h1: "Valérie Kerckhofs, fondatrice de Sun Beach House",
        byline: "Fondatrice · Saint-Barthélemy depuis 1996",
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
            quote: "Aujourd’hui, mon travail n’est pas seulement un service, c’est une connexion humaine.",
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

    alts: {
        aboutMain: "Terrasse d'une villa de luxe avec vue sur mer à Saint-Barthélemy",
        aboutSecondary: "Expérience bien-être et spa privé en villa à St Barth",
        experienceMorning: "Yoga matinal face à la mer sur une terrasse de villa à St Barth",
        experienceBlue: "Bateau au mouillage dans les eaux turquoise de Saint-Barthélemy",
        experienceGolden: "Coucher de soleil doré sur le port de Gustavia à Saint-Barth",
        villaCardPrefix: "Villa de luxe à Saint-Barth",
    },

    homepageIntro: {
        eyebrow: 'Sun Beach House',
        h2: 'L\'agence indépendante de Valérie Kerckhofs à Saint-Barthélemy',
        body: "Fondée par Valérie Kerckhofs, présente sur l'île depuis 1996, Sun Beach House accompagne une clientèle exigeante pour la location saisonnière et la vente de villas de prestige à Saint-Barthélemy. Notre approche est volontairement à taille humaine : sélection visitée à la main, conciergerie incluse à chaque séjour, et présentation discrète de biens conservés hors-ligne pour les acquéreurs qualifiés. Que vous cherchiez une semaine face à la mer ou un investissement patrimonial sur l'île, vous êtes en contact direct avec une interlocutrice unique — pas un dossier.",
    },

    collectionsIntro: {
        rent: {
            title: "Louer une villa à Saint-Barthélemy avec Sun Beach House",
            p1: "Notre collection de locations saisonnières regroupe des villas sélectionnées à la main, visitées par Valérie, et présentées avec une connaissance intime des quartiers de l'île — de Gustavia à Pointe Milou, de Saint-Jean à Lurin. Chaque proposition que nous vous adressons correspond réellement à votre rythme de séjour, à votre budget, et au caractère que vous recherchez.",
            processTitle: "Comment réserver",
            process: [
                "Vous nous transmettez vos dates, le nombre d'invités et l'esprit recherché (vue mer, marche jusqu'aux restaurants, isolement, capacité famille).",
                "Nous vérifions personnellement chaque disponibilité — les plannings en ligne ne reflètent pas toujours la situation réelle.",
                "Vous recevez sous 24 h une proposition personnalisée avec les villas qui correspondent à votre demande.",
            ],
            pricingTitle: "Tarifs et taxes",
            pricing: "Les prix indiqués sont par semaine, en dollars américains (USD). Un séjour minimum s'applique selon la période. À ces tarifs s'ajoutent les frais de service (10 %) et la taxe de séjour (5 %), conformément à la réglementation locale.",
            conciergeTitle: "Conciergerie incluse",
            concierge: "Toute location réservée via Sun Beach House inclut un accompagnement conciergerie de base : transferts aéroport, mise en place du frigo à l'arrivée, mise en relation avec un chef privé ou un thérapeute spa, et réservation des restaurants les plus prisés. Les prestations à la carte sont facturées séparément.",
        },
        sale: {
            title: "Acheter à Saint-Barthélemy",
            p1: "L'immobilier à Saint-Barthélemy ne ressemble à aucun autre marché : rareté foncière, stabilité juridique française, attrait constant de l'île. Chaque acquisition est une décision patrimoniale autant qu'un projet de vie. Notre sélection regroupe villas, appartements, terrains et fonds de commerce sur l'ensemble de l'île, présentés avec un dossier complet : surfaces, plans, statut juridique et historique.",
            approachTitle: "Notre approche",
            approach: [
                "Compréhension précise de votre projet : résidence personnelle, investissement locatif ou pied-à-terre saisonnier.",
                "Sélection ciblée des biens qui correspondent à vos critères — sans saturation de listings.",
                "Visites organisées sur place ou en visio, avec analyse honnête des forces et limites de chaque propriété.",
                "Accompagnement jusqu'à la signature : notaire, banque locale, fiscalité, et mise en gestion locative si vous le souhaitez.",
            ],
            discretionTitle: "Discrétion",
            discretion: "Une part importante des transactions à Saint-Barth se fait hors-ligne. Si votre projet est confidentiel, contactez-nous directement : certaines opportunités ne sont présentées qu'à des acquéreurs qualifiés, en dehors du site.",
        },
    },

    faq: {
        sectionTitle: "Questions fréquentes",
        conciergerie: [
            {
                q: "Comment fonctionne la facturation des services de conciergerie ?",
                a: "L'accompagnement conciergerie de base est inclus dans toute location réservée via Sun Beach House (transferts simples, mise en place du frigo, mise en relation avec les prestataires). Les prestations à la carte — chef privé, spa, charter bateau, services VIP aéroport — sont facturées séparément, sur devis transparent transmis avant validation.",
            },
            {
                q: "Quel est le délai pour réserver les services ?",
                a: "Nous recommandons de signaler les services souhaités dès la confirmation de votre location. Pour les restaurants les plus prisés (Bonito, L'Isola, Maya's), un chef ou un yacht, un préavis de 2 à 3 semaines garantit la meilleure disponibilité. Pour les services aéroport et transferts, 48 h suffisent.",
            },
            {
                q: "La conciergerie est-elle accessible en dehors d'une location de villa ?",
                a: "Oui. Nos services concierge — réservations, chef à domicile, transferts, activités nautiques — sont accessibles aux résidents et aux propriétaires de l'île, ainsi qu'aux clients en hôtel. Contactez-nous pour un devis personnalisé.",
            },
            {
                q: "Que comprend le service VIP aéroport ?",
                a: "À Saint-Martin (SXM), Saint-Barth (SBH), San Juan (SJU) et Antigua (ANU) : accueil personnalisé à l'avion, fast track immigration et douanes, prise en charge des bagages, accompagnement jusqu'au véhicule, bateau ou vol de correspondance. Service optionnel, facturé en supplément.",
            },
            {
                q: "Organisez-vous le transport jusqu'à Saint-Barth ?",
                a: "Oui. Nous coordonnons les vols privés (avion ou hélicoptère), les vols réguliers via SXM, SJU, ANU ou PTP, et les transferts maritimes privés depuis les îles voisines. Ces prestations sont organisées avec des partenaires spécialisés et facturées séparément.",
            },
        ],
        villa: [
            {
                q: "Quel est le séjour minimum pour une location ?",
                a: "Le séjour minimum varie en fonction de la période de l'année et des exigences de chaque propriétaire :\n\n- Haute saison et basse saison : séjour minimum de 7 nuits. Des courts séjours peuvent exceptionnellement être acceptés sur demande, sous réserve de l'accord du propriétaire.\n- Thanksgiving et Bucket Regatta : séjour minimum de 7 nuits.\n- Période des fêtes (Noël et Nouvel An) : les conditions varient selon les propriétaires. Le séjour minimum est généralement de 7 nuits (pour la semaine de Noël ou la semaine du Nouvel An), mais certains propriétaires exigent un minimum de 10, 12 ou 14 nuits.",
            },
            {
                q: "Que comprend le prix affiché ?",
                a: "Les tarifs sont indiqués par semaine et en dollars américains (USD).\n\nLes prix affichés n’incluent pas la taxe de séjour de 5 % ni les frais de dossier de 10 %, qui seront ajoutés au montant total de la location.\n\nLe tarif de la villa comprend l’occupation de la propriété ainsi que les prestations prévues par le propriétaire : eau, électricité, Wi-Fi et service de ménage quotidien, à l’exception des dimanches et jours fériés. Des prestations de ménage supplémentaires durant ces jours peuvent être organisées sur demande et seront facturées en supplément à la charge du client.\n\nL’accès à la buanderie et l’utilisation des machines à laver ne sont pas inclus dans la location standard. Ce service peut être disponible sur demande uniquement et fera l’objet de frais supplémentaires à la charge du client.\n\nLe prix comprend également notre service de conciergerie personnalisé, disponible avant votre arrivée, pendant toute la durée de votre séjour et jusqu’à votre départ. Notre équipe vous accompagne dans l’organisation de votre séjour et vous assiste notamment pour :\n\n- l’accueil à l’aéroport ou au terminal ferry ;\n- l’organisation de votre arrivée et votre installation dans la villa ;\n- les réservations de restaurants, véhicules, bateaux et activités ;\n- toutes vos demandes personnalisées afin de vous offrir une expérience unique et sur mesure à Saint-Barthélemy.",
            },
            {
                q: "Comment se passe la réservation ?",
                a: "Pour effectuer une demande de réservation, il vous suffit de nous transmettre vos dates d’arrivée et de départ, le nombre de personnes, ainsi que l’ensemble de vos critères et besoins spécifiques.\n\nAfin de vous proposer la villa la plus adaptée, nous vous invitons à nous communiquer un maximum d’informations, notamment :\n\n- le nombre d’adultes et d’enfants ;\n- la présence éventuelle d’enfants en bas âge (âge des enfants afin d’adapter au mieux la sélection des villas) ;\n- la présence ou non d’animaux de compagnie ;\n- vos attentes particulières ou besoins spécifiques.\n\nNotre équipe vérifie personnellement la disponibilité réelle des villas auprès des propriétaires et partenaires, car les calendriers en ligne ne reflètent pas toujours les disponibilités actualisées.\n\nNous revenons ensuite vers vous avec une sélection personnalisée de villas correspondant à vos critères ainsi qu’une proposition détaillée.\n\nAucun paiement n’est demandé et aucun débit n’est effectué tant que vous n’avez pas validé votre choix et confirmé votre réservation.",
            },
            {
                q: "Quelles sont les conditions d’annulation ?",
                a: "Les conditions d’annulation sont précisées dans le contrat de location et peuvent varier selon la villa sélectionnée et la période du séjour.\n\nLes conditions complètes de location et d’annulation vous sont transmises avant toute signature du contrat, afin que vous puissiez en prendre connaissance avant de confirmer votre réservation.\n\nVous pouvez également consulter les conditions générales de location et d’annulation directement sur notre site internet, dans la rubrique dédiée située en bas de page.\n\nPour les séjours durant les périodes premium (fêtes de fin d’année, événements spéciaux, haute saison…), nous recommandons vivement de souscrire une assurance annulation et voyage afin de vous protéger en cas d’imprévu.",
            },
            {
                q: "Le service de conciergerie est-il inclus ?",
                a: "Oui, un service de conciergerie personnalisé est inclus pour toute location réservée via Sun Beach House.\n\nNotre équipe vous accompagne avant votre arrivée, pendant toute la durée de votre séjour et jusqu’à votre départ, afin d’organiser chaque détail et de vous garantir une expérience sereine et sur mesure à Saint-Barthélemy.\n\nAvant votre arrivée, nous préparons votre séjour avec vous et organisons l’ensemble des services nécessaires :\n\n- réservations de restaurants ;\n- organisation des transferts depuis l’aéroport ou le terminal ferry ;\n- réservation de véhicules, sorties bateau et activités ;\n- mise en relation avec des chefs privés, thérapeutes spa, chauffeurs et autres prestataires ;\n- préparation de vos demandes particulières.\n\nNous pouvons également vous proposer une pré-liste de courses avant votre arrivée, afin que vos produits souhaités soient disponibles dans la villa dès votre installation.\n\nÀ votre arrivée, nous assurons votre accueil à la villa, à l’aéroport ou au terminal ferry, et nous vous accompagnons dans votre installation, notamment avec l’assistance pour vos bagages afin de rendre votre arrivée la plus confortable possible.\n\nPendant votre séjour, notre équipe reste disponible pour vous accompagner, répondre à vos demandes et organiser toute prestation complémentaire afin de vous offrir une expérience personnalisée à Saint-Barthélemy.",
            },
            {
                q: "Comment se passe l’arrivée à la villa ?",
                a: "À votre arrivée à Saint-Barthélemy, notre équipe vous accueille personnellement, que ce soit à l’aéroport de Saint-Barth (SBH) ou au terminal ferry, afin de vous accompagner jusqu’à votre villa.\n\nPlusieurs options sont possibles selon votre organisation :\n\n- vous pouvez nous suivre avec votre propre véhicule ou votre voiture de location jusqu’à la villa ;\n- vous pouvez réserver un taxi qui vous conduira directement à la propriété ;\n- vous pouvez également demander la livraison de votre véhicule de location directement à l’aéroport ou au terminal ferry, puis rejoindre la villa en taxi si vous le souhaitez.\n\nUne fois arrivés à la villa, nous vous accueillons sur place pour une visite de la propriété, la présentation des équipements principaux et toutes les informations nécessaires au bon déroulement de votre séjour. Nous prenons le temps de répondre à vos questions et de vous expliquer le fonctionnement de la villa afin que vous puissiez vous installer confortablement dès votre arrivée.\n\nEn cas d’arrivée tardive, un accueil adapté à vos horaires peut être organisé afin de garantir une installation en toute sérénité.",
            },
        ],
    },

    lastUpdated: 'Dernière mise à jour',

    blog: {
        sectionLabel: 'Magazine',
        indexTitle: 'Le Magazine',
        indexSubtitle: "Saint-Barthélemy par Sun Beach House — guides, saisons, services et art de vivre.",
        indexEmpty: 'Les premiers articles arrivent prochainement.',
        readMore: 'Lire l\'article',
        publishedOn: 'Publié le',
        updatedOn: 'Mis à jour le',
        author: 'Par',
        backToIndex: 'Retour au magazine',
        relatedPosts: 'À lire également',
        sourcesTitle: 'Sources',
        relatedVillasTitle: 'Villas mentionnées',
        categoryLabels: {
            'vie-st-barth': 'Vie à Saint-Barth',
            services: 'Services & Conciergerie',
            villas: 'Villas & Propriétés',
            saison: 'Saison & Évènements',
            immobilier: 'Immobilier',
            destinations: 'Destinations & Quartiers',
            guides: 'Guides pratiques',
        },
    },

    cookies: {
        title: "Respect de votre vie privée",
        description: "Nous utilisons des cookies pour optimiser votre expérience, analyser le trafic et personnaliser nos contenus. Votre parcours sur l'île commence par le respect de vos données.",
        accept: "Tout accepter",
        decline: "Tout refuser",
        customize: "Paramètres",
        settings: {
            title: "Paramètres des cookies",
            necessary: {
                title: "Essentiels",
                desc: "Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés."
            },
            analytics: {
                title: "Mesure d'audience",
                desc: "Nous permettent de comprendre comment vous interagissez avec le site pour l'améliorer."
            },
            marketing: {
                title: "Personnalisation",
                desc: "Utilisés pour vous proposer des contenus et services adaptés à vos centres d'intérêts."
            },
            save: "Enregistrer mes choix"
        }
    },

    legalPage: {
        title: 'Mentions Légales',
        metaDescription: "Informations légales concernant l'entreprise Sun Beach House, agence immobilière à Saint-Barthélemy.",
        companyIdentity: {
            title: "1. Identité de l'entreprise",
            companyName: { label: 'Dénomination sociale', value: 'SUN BEACH HOUSE' },
            legalForm: { label: 'Forme Juridique', value: 'Société à responsabilité limitée (SARL)' },
            shareCapital: { label: 'Capital Social', value: '1 000,00 Euros' },
            manager: { label: 'Gérante', value: 'Valérie KERCKHOFS' },
        },
        contactRegistration: {
            title: '2. Coordonnées & Immatriculation',
            headOffice: { label: 'Siège Social', value: '65 RUE DE LA PAIX GUSTAVIA<br />97133 SAINT BARTHELEMY' },
            registration: { label: 'Immatriculation', value: 'RCS Basse-terre 911 920 205', date: "Date d'immatriculation : 29/03/2022" },
            siren: { label: 'SIREN', value: '911 920 205' },
            mainActivity: { label: 'Activité Principale', value: "Agence immobilière ; toutes activités se rapportant directement ou indirectement à l'objet social." },
        },
        hosting: {
            title: '3. Hébergement & Réalisation',
            host: { label: 'Hébergeur / Registrar', name: 'OVH SAS', address: '2 rue Kellermann - 59100 Roubaix - France' },
            realization: { label: 'Réalisation du site', name: 'Kulture Com (Anthony PROFIT)' },
        },
        intellectualProperty: {
            title: '4. Propriété Intellectuelle',
            p1: "L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.",
            p2: "La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.",
        },
    },

    privacyPage: {
        title: 'Politique de Confidentialité',
        metaDescription: 'Politique de confidentialité et protection des données personnelles de Sun Beach House.',
        intro: 'Chez Sun Beach House, nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité détaille la manière dont nous collectons, utilisons et protégeons vos informations.',
        dataCollection: {
            title: '1. Collecte des données',
            intro: 'Nous collectons les informations que vous nous fournissez directement, notamment lorsque vous :',
            items: [
                'Remplissez un formulaire de contact ou de réservation.',
                'Vous inscrivez à notre newsletter.',
                'Nous contactez par email ou téléphone.',
            ],
            details: 'Les données collectées peuvent inclure : votre nom, prénom, adresse email, numéro de téléphone, et toute autre information pertinente pour votre projet immobilier ou de location.',
        },
        dataUsage: {
            title: '2. Utilisation des données',
            intro: 'Vos données sont utilisées pour :',
            items: [
                'Répondre à vos demandes de renseignements et de réservations.',
                'Vous envoyer des informations sur nos services et propriétés (si vous avez accepté de recevoir notre newsletter).',
                'Améliorer nos services et votre expérience sur notre site.',
                'Respecter nos obligations légales et réglementaires.',
            ],
        },
        protectionSharing: {
            title: '3. Protection et Partage',
            text: "Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données contre tout accès, modification, divulgation ou destruction non autorisés. Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées avec des prestataires de confiance uniquement dans le cadre de l'exécution de nos services (ex: gestionnaire de mailing, partenaires de services conciergerie avec votre accord), qui sont tenus de respecter la confidentialité de vos données.",
        },
        cookies: {
            title: '4. Cookies',
            p1: 'Notre site utilise des cookies pour améliorer votre expérience de navigation et analyser le trafic. Nous utilisons la solution Tarteaucitron pour la gestion de votre consentement aux cookies.',
            p2: 'Vous pouvez à tout moment modifier vos préférences en matière de cookies via le panneau de gestion accessible en bas de page.',
        },
        rights: {
            title: '5. Vos Droits',
            p1: "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, d'effacement, et de portabilité de vos données. Vous pouvez également vous opposer au traitement de vos données ou en demander la limitation.",
            p2: 'Pour exercer ces droits, veuillez nous contacter à l\'adresse suivante : valerie@sun-beach-house.com',
        },
        dpo: {
            title: 'Contact DPO',
            text: 'Pour toute question concernant notre politique de confidentialité, vous pouvez nous écrire à : SUN BEACH HOUSE - 65 RUE DE LA PAIX GUSTAVIA 97133 SAINT BARTHELEMY',
        },
    },

    conditionsPage: {
        title: "Conditions de réservation, d'annulation et informations générales",
        metaDescription: "Conditions de réservation, d'annulation et informations générales pour votre séjour à Saint-Barthélemy avec Sun Beach House.",
        booking: {
            title: '1. Conditions de réservation',
            intro: "Un acompte correspondant à 30 % du montant total du séjour (incluant le loyer, les taxes et les frais de dossier) est requis pour confirmer toute réservation. La villa ne pourra être garantie tant que cet acompte n'aura pas été reçu. La réservation sera considérée comme ferme et définitive uniquement après réception du paiement (preuve de virement requise) et signature du contrat de location.",
            nonHoliday: {
                title: 'Réservations hors périodes de fêtes (Noël et Nouvel An)',
                over60: { label: "Réservation effectuée à plus de 60 jours de la date d'arrivée :", desc: "acompte de 30 % à la réservation, solde payable au plus tard 60 jours avant l'arrivée." },
                under60: { label: "Réservation effectuée à 60 jours ou moins de la date d'arrivée :", desc: 'règlement de 100 % du montant total du séjour au moment de la réservation.' },
            },
            holiday: {
                title: 'Réservations pendant les périodes de fêtes (Noël et Nouvel An)',
                over120: { label: "Réservation effectuée à plus de 120 jours de la date d'arrivée :", desc: "acompte de 30 % à la réservation, solde payable au plus tard 90 jours avant l'arrivée." },
                under90: { label: "Réservation effectuée à 90 jours ou moins de la date d'arrivée :", desc: 'règlement de 100 % du montant total du séjour au moment de la réservation.' },
            },
            warning: "En cas de non-paiement du solde dans les délais indiqués, la réservation sera automatiquement annulée et les acomptes versés resteront acquis à l'Agence.",
        },
        cancellation: {
            title: "2. Conditions d'annulation",
            intro: "Toute demande d'annulation doit impérativement être adressée par écrit (email ou courrier).",
            nonHoliday: {
                title: 'Réservations hors périodes de fêtes (Noël et Nouvel An)',
                items: [
                    "Annulation à 61 jours ou plus avant la date d'arrivée : frais équivalents à 30 % du montant total du séjour.",
                    "Annulation entre 60 jours et 31 jours avant la date d'arrivée : frais équivalents à 50 % du montant total du séjour.",
                    "Annulation à 30 jours ou moins avant la date d'arrivée : frais équivalents à 100 % du montant total du séjour.",
                ],
            },
            holiday: {
                title: 'Réservations pendant les périodes de fêtes (Noël et Nouvel An)',
                items: [
                    "Annulation à 91 jours ou plus avant la date d'arrivée : frais équivalents à 30 % du montant total du séjour.",
                    "Annulation entre 90 jours et 61 jours avant la date d'arrivée : frais équivalents à 50 % du montant total du séjour.",
                    "Annulation à 60 jours ou moins avant la date d'arrivée : frais équivalents à 100 % du montant total du séjour.",
                ],
            },
        },
        insurance: {
            title: '3. Assurance voyage',
            p1: "Le Client est vivement encouragé à souscrire une assurance voyage couvrant l'ensemble des risques liés à son séjour : annulation, interruption de voyage, retard de transport, perte ou vol de bagages, ainsi que toute dépense imprévue.",
            p2: "Sun Beach House ne pourra être tenue responsable des aléas liés au transport ou au voyage, incluant notamment les annulations ou retards de vols, pertes de bagages ou tout événement indépendant de sa volonté pouvant impacter le séjour.",
            p3: "Conformément à la réglementation en vigueur, les transferts éventuellement assurés par le personnel sont limités au trajet entre l'aéroport et la villa. Pour tout autre déplacement, des services de taxi ou de location de véhicule pourront être organisés sur demande.",
        },
        touristTax: {
            title: '4. Taxe de séjour',
            p1: 'Une taxe de séjour de 5 % du montant total de la location est applicable.',
            p2: "Cette taxe est collectée pour le compte de la collectivité locale et est payable à l'arrivée.",
        },
        visa: {
            title: "5. Visa et formalités d'entrée",
            p1: "Il appartient au Client de vérifier auprès de son ambassade ou des autorités compétentes les conditions d'entrée à Saint-Barthélemy, notamment en matière de visa, de validité du passeport ou de toute autre formalité administrative.",
            p2: "Sun Beach House décline toute responsabilité en cas de refus d'entrée sur le territoire dû à des documents de voyage non conformes ou incomplets.",
        },
        pricing: {
            title: '6. Tarifs et conditions de séjour',
            priceInfo: 'Les tarifs sont indiqués par semaine et en dollars américains (USD).',
            taxInfo: "Les prix n'incluent pas la taxe de séjour (+5 %) ni les frais de service (+10 %), sauf mention contraire.",
            priceNote: 'Les tarifs peuvent être modifiés sans préavis, conformément aux présentes conditions de réservation.',
            minStay: {
                title: 'Durée minimale de séjour',
                items: [
                    "Séjour minimum : 7 nuits (séjours plus courts possibles sur demande, sous réserve d'acceptation)",
                    'Périodes Thanksgiving et Bucket Regatta : séjour minimum de 7 nuits.',
                    "Saison festive (Noël & Nouvel An) : séjour minimum de 14 nuits (séjours plus courts sur demande, sous réserve d'acceptation).",
                ],
            },
        },
        checkInOut: {
            title: "7. Horaires d'arrivée et de départ",
            checkIn: { label: 'Check-in', value: 'à partir de 15h' },
            checkOut: { label: 'Check-out', value: 'avant 12h (midi)' },
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
        magazine: 'Magazine',
    },

    hero: {
        subtitle: 'Saint-Barthélemy',
        location: 'Location',
        allIsland: 'Entire Island',
        capacity: 'Capacity',
        people: 'Guests',
        search: 'Search',
        exclusiveCollection: 'Exclusive Collection 2026',
        mainTitle: 'French elegance',
        mainTitleAccent: 'in the Caribbean',
        goButton: 'Go',
        type: 'Type',
        seasonalRental: 'Seasonal Rental',
        sale: 'Sale',
        rooms: 'Rooms',
        ourCollections: 'Our Collections',
        seasonalRentals: 'Seasonal Rentals',
        propertiesForSale: 'Properties for Sale',
        disclaimerText: 'Some exceptional villas are intentionally kept offline to preserve their owners\' discretion.\nOur team can present them to you personally according to your criteria.',
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
        budget: 'Budget',
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
        guestsAbbrev: 'Guests',
        bedroomsAbbrev: 'Bdr',
        weekAbbrev: '/ wk',
        explore: 'Search for a villa...',
        propertyType: 'Property type',
        allTypes: 'All',
        villa: 'Villa',
        apartment: 'Apartment',
        land: 'Land',
        commercial: 'Commercial property',
        price: 'Price',
        minPrice: 'Min',
        maxPrice: 'Max',
        landSurfaceMin: 'Min land surface (m²)',
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
        bathroom: 'Bathroom',
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
        reserve: 'Check availability',
        noImmediateCharge: 'We personally verify every availability to guarantee reliable information and fully personalized proposals.\nSince villas can be rented in a matter of hours, schedules are not always updated instantly.',
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
        serviceAndTax: 'Price per week in USD. Service (10%) and tourist tax (5%) not included.',
        contactUs: 'Contact',
        selectDate: 'Select a date',
        valerie: 'Valérie',
        features: 'Features',
        amenities: 'Amenities & Services',
        seasonalRates: 'Seasonal Rates',
        persons: 'Persons',
        interestedProperty: 'Interested in this property? Contact our team to obtain the complete file or organize a private visit.',
        contact: 'Contact',
        seasons: {
            lowSeason: 'Low Season',
            summer: 'Summer',
            highSeason: 'High Season',
            thanksgiving: 'Thanksgiving',
            christmas: 'Christmas',
            newYear: 'New Year',
        },
        video: 'Video',
        morePhotos: '+ {count} photos',
        downloadPdf: 'Download brochure (pdf)',
        types: {
            villa: 'Villa',
            apartment: 'Apartment',
            land: 'Land',
            commercial: 'Commercial property',
        },
        surface: 'Living area',
        landSurface: 'Land',
        aboutThisProperty: 'About the villa',
    },

    map: {
        noVillasWithLocation: 'No villas with location available',
        view: 'View',
    },

    footer: {
        tagline: 'The art of living in St. Barts.\nAn exclusive collection of villas and personalized concierge service by Valérie.',
        explore: 'Explore',
        findUs: 'Find Us',
        newsletter: 'Newsletter',
        newsletterSubtitle: 'Stay informed about our latest villas',
        emailPlaceholder: 'Your email',
        subscribe: 'Subscribe',
        madeWith: 'Made with',
        legalNotice: 'Legal Notice',
        privacy: 'Privacy',
        rights: 'Sun Beach House. All rights reserved.',
        home: 'Home',
        ourCollections: 'Our Collections',
        destination: 'Destination',
        concierge: 'Concierge',
        about: 'About',
        contact: 'Contact',
        gustavia: 'Gustavia, Saint-Barthélemy',
        bookingConditions: 'Booking Conditions',
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
        quote: 'Making every stay in Saint-Barth a unique moment.',
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

    // TODO: Complete English translations for conciergerie page
    conciergeriePage: {
        title: 'Sun Beach House Concierge',
        subtitle: 'The art of tailored service in Saint-Barthélemy',
        intro: 'Your stay in Saint-Barth deserves special attention. Our concierge service transforms every detail into a memorable experience, from private chefs to VIP transfers, exclusive reservations, and bespoke activities.',
        cta: 'Request a personalized quote',
        servicesTitle: 'Our Services',
        chef: {
            title: 'Private Chefs',
            shortDesc: 'Tailored gastronomy at your villa',
            longDesc: 'Savor an exceptional culinary experience without leaving your villa. Our partner private chefs create personalized menus inspired by French and Caribbean cuisine.',
            features: [
                'French and Caribbean gourmet cuisine',
                'Personalized menus according to your preferences',
                'In-villa service with elegant presentation',
                'Local and imported product sourcing'
            ]
        },
        spa: {
            title: 'Wellness & Spa',
            shortDesc: 'Private treatments and massages',
            longDesc: 'Transform your villa into a wellness sanctuary. Our qualified therapists bring the spa experience directly to you for a moment of absolute relaxation.',
            features: [
                'Personalized massages (Swedish, deep tissue, hot stones)',
                'Premium facial and body treatments',
                'Private yoga sessions facing the sea',
                'Temporary spa installations available'
            ]
        },
        transfer: {
            title: 'Transfers & Driver',
            shortDesc: 'Organizing your travels',
            longDesc: 'Travel in elegance and serenity. From airport transfers to island excursions, we organize all your journeys with premium vehicles and professional drivers.',
            features: [
                'Private airport/heliport transfers',
                'Full or half-day driver service',
                'Premium air-conditioned vehicles',
                'Coordination with your flight schedules'
            ]
        },
        reservations: {
            title: 'Reservations',
            shortDesc: 'Access to the best restaurants',
            longDesc: 'Access the most sought-after tables in Saint-Barth. Thanks to our local network, we guarantee you a spot at the most exclusive restaurants, even during high season.',
            features: [
                'Starred restaurants and beach club reservations',
                'Privileged tables with sea views',
                'Personalized recommendations based on your tastes',
                'Private events and birthday organization'
            ]
        },
        nautical: {
            title: 'Water Activities',
            shortDesc: 'Yachting and island discovery',
            longDesc: 'Discover Saint-Barth from the sea. Rent a yacht for the day, take an excursion to neighboring islands, or try diving in the crystal-clear Caribbean waters.',
            features: [
                'Yacht and catamaran rental with crew',
                'Day trips to Anguilla, St Martin',
                'Guided scuba diving and snorkeling',
                'Water sports: paddle, jet-ski, kitesurf'
            ]
        },
        travel: {
            title: 'Travel, Transport & Arrival in Saint-Barth',
            shortDesc: 'A seamless, elegant, and tailored experience',
            intro: 'From your departure to your arrival in Saint-Barth, every step of your journey can be carefully organized to offer you a seamless, comfortable, and stress-free experience. In addition to your stay, premium transport and assistance services can be offered on request.',
            solutionsTitle: 'Tailored transport solutions',
            solutions: [
                'Private flights (planes and helicopters)',
                'Regular flights via Saint-Martin (SXM), San Juan (SJU), Antigua (ANU), Pointe-à-Pitre (PTP)',
                'Private maritime transfers and boat charters from neighboring islands'
            ],
            partnersNote: 'These services are organized with specialized luxury travel partners and are billed separately. Each solution is designed to optimize your time and offer you a serene arrival in Saint-Barth.'
        },
        vip: {
            title: 'VIP Airport Services',
            shortDesc: 'A premium option for smooth passage',
            intro: 'Saint-Martin and Saint-Barth airports can be particularly busy, especially during high season, weekends, and holiday periods. Optional VIP airport services transform your arrival or departure into a smooth and comfortable experience.',
            whyTitle: 'Why choose VIP service?',
            whyItems: [
                'Avoid long immigration queues',
                'Save precious time',
                'Travel in a calm and discreet setting',
                'Benefit from personalized assistance'
            ],
            whatIsIt: 'What is VIP airport service?',
            whatIsItDesc: 'Upon arrival, a dedicated agent welcomes you and handles all formalities, to accompany you seamlessly to your vehicle, boat, or connecting flight.',
            includedTitle: 'Included services',
            arrivalTitle: 'On arrival',
            arrivalItems: [
                'Personalized welcome at the plane or terminal',
                'Priority passage through immigration and customs (fast track)',
                'Baggage assistance and handling',
                'Escort through the terminal',
                'Coordination with your driver, maritime transfer, or connecting flight'
            ],
            departureTitle: 'On departure',
            departureItems: [
                'Baggage handling from your accommodation to the airport',
                'Dedicated check-in',
                'Priority access to security and passport control',
                'Baggage assistance',
                'Escort to the plane or boarding gate',
                'VIP lounge access (subject to availability)'
            ],
            optionalNote: 'This service is entirely optional and charged separately, for travelers seeking optimal comfort and maximum time savings. Available at Saint-Martin (SXM), Saint-Barth (SBH), San Juan (SJU), and Antigua (ANU).'
        }
    },

    contact: {
        title: 'Let\'s talk about you.',
        subtitle: 'Vacation project, wedding, birthday or any other event with luxury concierge.',
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
        notFound: {
            title: '404',
            subtitle: 'Page Not Found',
            message: "Sorry, the page you're looking for seems to have flown to other horizons. Let us guide you to the essential.",
            backToHome: "Back to Home"
        }
    },

    aboutPage: {
        title: 'The Spirit',
        h1: 'Valérie Kerckhofs, founder of Sun Beach House',
        byline: 'Founder · Saint-Barthélemy since 1996',
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
            quote: "Today, my work is not just a service, it's a human connection.",
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

    alts: {
        aboutMain: "Luxury villa terrace with sea view in Saint-Barthélemy",
        aboutSecondary: "Wellness experience and private spa in a St Barth villa",
        experienceMorning: "Morning yoga facing the sea on a villa terrace in St Barth",
        experienceBlue: "Boat anchored in the turquoise waters of Saint-Barthélemy",
        experienceGolden: "Golden sunset over Gustavia harbor in Saint-Barth",
        villaCardPrefix: "Luxury villa in Saint-Barth",
    },

    homepageIntro: {
        eyebrow: 'Sun Beach House',
        h2: "Valérie Kerckhofs' independent agency in Saint-Barthélemy",
        body: "Founded by Valérie Kerckhofs, who has lived on the island since 1996, Sun Beach House serves a discerning clientele for seasonal rentals and luxury property sales in Saint-Barthélemy. Our approach is deliberately personal: every villa is visited and selected by hand, concierge support is included with every stay, and a discreet selection of off-market properties is reserved for qualified buyers. Whether you're looking for a week by the sea or a long-term investment on the island, you'll deal directly with one person — not a file number.",
    },

    collectionsIntro: {
        rent: {
            title: "Renting a villa in Saint-Barthélemy with Sun Beach House",
            p1: "Our seasonal rental collection is hand-picked, personally visited by Valérie, and presented with intimate knowledge of every neighborhood — from Gustavia to Pointe Milou, Saint-Jean to Lurin. Every proposal we send is genuinely tailored to your pace, budget, and the character you're looking for.",
            processTitle: "How booking works",
            process: [
                "Send us your dates, the number of guests, and the kind of stay you want (sea view, walking distance to restaurants, seclusion, family capacity).",
                "We personally verify each availability — online calendars don't always reflect the real situation.",
                "Within 24 hours you receive a personalized selection matching your request.",
            ],
            pricingTitle: "Pricing and taxes",
            pricing: "Rates are quoted per week in US dollars (USD). A minimum stay applies depending on the season. A 10% service fee and a 5% tourist tax are added in accordance with local regulations.",
            conciergeTitle: "Concierge included",
            concierge: "Every rental booked through Sun Beach House includes basic concierge support: airport transfers, fridge stocking on arrival, introductions to private chefs or spa therapists, and reservations at the island's most sought-after restaurants. À la carte services are billed separately.",
        },
        sale: {
            title: "Buying in Saint-Barthélemy",
            p1: "Real estate in Saint-Barthélemy is unlike any other market: scarce land, French legal stability, and constant international demand. Every acquisition is both a lifestyle decision and a long-term asset. Our sales selection covers villas, apartments, land, and commercial properties across the island, each presented with a full file: surfaces, plans, legal status, and history.",
            approachTitle: "Our approach",
            approach: [
                "Clear understanding of your project: primary residence, rental investment, or seasonal pied-à-terre.",
                "Focused selection of properties that actually match your criteria — no listing saturation.",
                "On-site or remote viewings, with an honest review of each property's strengths and limits.",
                "Full support through closing: notary, local banking, taxation, and rental management if you wish.",
            ],
            discretionTitle: "Discretion",
            discretion: "A significant share of transactions on Saint-Barth happens off-market. If your project is confidential, contact us directly — certain opportunities are shown only to qualified buyers, outside the website.",
        },
    },

    faq: {
        sectionTitle: "Frequently asked questions",
        conciergerie: [
            {
                q: "How is concierge service billed?",
                a: "Basic concierge support is included with every rental booked through Sun Beach House (simple transfers, fridge stocking, vendor introductions). À la carte services — private chef, spa, yacht charter, VIP airport services — are billed separately, with a transparent quote sent before you commit.",
            },
            {
                q: "How far in advance should I book services?",
                a: "We recommend flagging the services you want as soon as your rental is confirmed. For the most sought-after restaurants (Bonito, L'Isola, Maya's), a private chef or a yacht, 2-3 weeks' notice secures the best availability. For airport and transfer services, 48 hours is enough.",
            },
            {
                q: "Can I use concierge services without renting a villa?",
                a: "Yes. Our concierge services — reservations, private chef at home, transfers, nautical activities — are available to island residents, second-home owners, and hotel guests. Contact us for a tailored quote.",
            },
            {
                q: "What's included in the VIP airport service?",
                a: "In Saint-Martin (SXM), Saint-Barth (SBH), San Juan (SJU) and Antigua (ANU): personal welcome at the aircraft, fast-track immigration and customs, baggage handling, and escort to your vehicle, boat, or connecting flight. Optional service, billed separately.",
            },
            {
                q: "Do you arrange travel to Saint-Barth?",
                a: "Yes. We coordinate private flights (plane or helicopter), scheduled flights via SXM, SJU, ANU or PTP, and private boat transfers from neighbouring islands. These services are arranged with specialist partners and billed separately.",
            },
        ],
        villa: [
            {
                q: "What is the minimum stay?",
                a: "The minimum stay varies depending on the time of year and the requirements of each owner:\n\n- High season and low season: minimum stay of 7 nights. Short stays may exceptionally be accepted upon request, subject to the owner's approval.\n- Thanksgiving and Bucket Regatta: minimum stay of 7 nights.\n- Festive season (Christmas and New Year): conditions vary by owner. The minimum stay is generally 7 nights (for Christmas week or New Year week), but some owners require a minimum of 10, 12, or 14 nights.",
            },
            {
                q: "What is included in the displayed price?",
                a: "Rates are quoted per week in US dollars (USD).\n\nThe displayed prices do not include the 5% tourist tax or the 10% administrative fee, which will be added to the total rental amount.\n\nThe villa rate includes occupancy of the property as well as the services provided by the owner: water, electricity, Wi-Fi, and daily housekeeping service, except on Sundays and public holidays. Additional housekeeping services during these days can be arranged on request and will be billed separately at the client's expense.\n\nAccess to the laundry room and use of washing machines are not included in the standard rental. This service may be available upon request only and will be subject to additional fees at the client's expense.\n\nThe price also includes our personalized concierge service, available before your arrival, throughout your stay, and until your departure. Our team assists you in organizing your stay, notably with:\n\n- meet and greet at the airport or ferry terminal;\n- organizing your arrival and settling you into the villa;\n- reservations for restaurants, vehicles, boats, and activities;\n- any personalized requests to offer you a unique and tailor-made experience in St. Barts.",
            },
            {
                q: "How does the booking process work?",
                a: "To make a booking request, simply send us your arrival and departure dates, the number of people, as well as all your criteria and specific needs.\n\nIn order to offer you the most suitable villa, we invite you to provide us with as much information as possible, including:\n\n- the number of adults and children;\n- the possible presence of young children (children's ages to better adapt the villa selection);\n- whether or not you have pets;\n- your particular expectations or specific needs.\n\nOur team personally checks the actual availability of the villas with owners and partners, as online calendars do not always reflect up-to-date availability.\n\nWe will then get back to you with a personalized selection of villas matching your criteria along with a detailed proposal.\n\nNo payment is requested and no charge is made until you have validated your choice and confirmed your booking.",
            },
            {
                q: "What are the cancellation conditions?",
                a: "Cancellation conditions are specified in the rental agreement and may vary depending on the selected villa and the period of the stay.\n\nThe complete rental and cancellation conditions are sent to you before any contract is signed, so that you can review them before confirming your booking.\n\nYou can also consult the general rental and cancellation conditions directly on our website, in the dedicated section located at the bottom of the page.\n\nFor stays during premium periods (end-of-year holidays, special events, high season, etc.), we strongly recommend taking out cancellation and travel insurance to protect yourself in case of unforeseen circumstances.",
            },
            {
                q: "Is the concierge service included?",
                a: "Yes, a personalized concierge service is included for any rental booked through Sun Beach House.\n\nOur team assists you before your arrival, throughout your stay, and until your departure, to organize every detail and guarantee you a serene and tailor-made experience in St. Barts.\n\nBefore your arrival, we prepare your stay with you and organize all the necessary services:\n\n- restaurant reservations;\n- organization of transfers from the airport or ferry terminal;\n- vehicle, boat trip, and activity reservations;\n- connections with private chefs, spa therapists, drivers, and other service providers;\n- preparation of your special requests.\n\nWe can also offer you a pre-arrival grocery shopping list, so that your desired products are available in the villa as soon as you arrive.\n\nUpon your arrival, we personally welcome you at the villa, the airport, or the ferry terminal, and assist you in settling in, particularly with luggage assistance to make your arrival as comfortable as possible.\n\nDuring your stay, our team remains available to assist you, respond to your requests, and organize any additional services to offer you a personalized experience in St. Barts.",
            },
            {
                q: "How does the arrival at the villa work?",
                a: "Upon your arrival in St. Barts, our team personally welcomes you, whether at the St. Barts airport (SBH) or the ferry terminal, to accompany you to your villa.\n\nSeveral options are possible depending on your arrangements:\n\n- you can follow us with your own vehicle or rental car to the villa;\n- you can book a taxi that will take you directly to the property;\n- you can also request the delivery of your rental vehicle directly to the airport or ferry terminal, then take a taxi to the villa if you wish.\n\nOnce you arrive at the villa, we welcome you on-site for a tour of the property, presentation of the main amenities, and all the necessary information for a smooth stay. We take the time to answer your questions and explain how the villa works so that you can settle in comfortably as soon as you arrive.\n\nIn the event of a late arrival, a welcome adapted to your schedule can be organized to guarantee a stress-free settling in.",
            },
        ],
    },

    lastUpdated: 'Last updated',

    blog: {
        sectionLabel: 'Magazine',
        indexTitle: 'The Magazine',
        indexSubtitle: 'Saint-Barthélemy by Sun Beach House — guides, seasons, services and lifestyle.',
        indexEmpty: 'New articles are coming soon.',
        readMore: 'Read the article',
        publishedOn: 'Published on',
        updatedOn: 'Updated on',
        author: 'By',
        backToIndex: 'Back to the magazine',
        relatedPosts: 'Also worth reading',
        sourcesTitle: 'Sources',
        relatedVillasTitle: 'Villas mentioned',
        categoryLabels: {
            'vie-st-barth': 'Life in Saint-Barth',
            services: 'Services & Concierge',
            villas: 'Villas & Properties',
            saison: 'Season & Events',
            immobilier: 'Real Estate',
            destinations: 'Destinations & Neighborhoods',
            guides: 'Practical guides',
        },
    },

    cookies: {
        title: "We value your privacy",
        description: "We use cookies to optimize your experience, analyze traffic, and personalize our content. Your journey on the island begins with respect for your data.",
        accept: "Accept all",
        decline: "Decline all",
        customize: "Settings",
        settings: {
            title: "Cookie Settings",
            necessary: {
                title: "Essential",
                desc: "These cookies are necessary for the website to function and cannot be switched off."
            },
            analytics: {
                title: "Analytics",
                desc: "Allow us to understand how you interact with the site to improve it."
            },
            marketing: {
                title: "Personalization",
                desc: "Used to provide you with content and services tailored to your interests."
            },
            save: "Save my choices"
        }
    },

    legalPage: {
        title: 'Legal Notice',
        metaDescription: 'Legal information regarding Sun Beach House, real estate agency in Saint-Barthélemy.',
        companyIdentity: {
            title: '1. Company Identity',
            companyName: { label: 'Company Name', value: 'SUN BEACH HOUSE' },
            legalForm: { label: 'Legal Form', value: 'Limited Liability Company (SARL)' },
            shareCapital: { label: 'Share Capital', value: '1,000.00 Euros' },
            manager: { label: 'Manager', value: 'Valérie KERCKHOFS' },
        },
        contactRegistration: {
            title: '2. Contact & Registration',
            headOffice: { label: 'Head Office', value: '65 RUE DE LA PAIX GUSTAVIA<br />97133 SAINT BARTHELEMY' },
            registration: { label: 'Registration', value: 'RCS Basse-terre 911 920 205', date: 'Registration date: 03/29/2022' },
            siren: { label: 'SIREN', value: '911 920 205' },
            mainActivity: { label: 'Main Activity', value: 'Real estate agency; all activities directly or indirectly related to the corporate purpose.' },
        },
        hosting: {
            title: '3. Hosting & Development',
            host: { label: 'Web Host / Registrar', name: 'OVH SAS', address: '2 rue Kellermann - 59100 Roubaix - France' },
            realization: { label: 'Website Development', name: 'Kulture Com (Anthony PROFIT)' },
        },
        intellectualProperty: {
            title: '4. Intellectual Property',
            p1: 'This entire site is subject to French and international legislation on copyright and intellectual property. All reproduction rights are reserved, including for downloadable documents and iconographic and photographic representations.',
            p2: 'The reproduction of all or part of this site on any electronic medium whatsoever is strictly prohibited without the express permission of the publication director.',
        },
    },

    privacyPage: {
        title: 'Privacy Policy',
        metaDescription: 'Privacy policy and personal data protection of Sun Beach House.',
        intro: 'At Sun Beach House, we attach great importance to the protection of your personal data. This privacy policy details how we collect, use, and protect your information.',
        dataCollection: {
            title: '1. Data Collection',
            intro: 'We collect information you provide directly to us, particularly when you:',
            items: [
                'Fill out a contact or booking form.',
                'Subscribe to our newsletter.',
                'Contact us by email or phone.',
            ],
            details: 'The data collected may include: your first name, last name, email address, phone number, and any other information relevant to your real estate or rental project.',
        },
        dataUsage: {
            title: '2. Data Usage',
            intro: 'Your data is used to:',
            items: [
                'Respond to your enquiries and booking requests.',
                'Send you information about our services and properties (if you have agreed to receive our newsletter).',
                'Improve our services and your experience on our site.',
                'Comply with our legal and regulatory obligations.',
            ],
        },
        protectionSharing: {
            title: '3. Protection and Sharing',
            text: 'We implement appropriate security measures to protect your data against unauthorized access, modification, disclosure or destruction. Your data is never sold to third parties. It may be shared with trusted service providers solely for the performance of our services (e.g., mailing manager, concierge service partners with your consent), who are required to maintain the confidentiality of your data.',
        },
        cookies: {
            title: '4. Cookies',
            p1: 'Our site uses cookies to improve your browsing experience and analyze traffic. We use the Tarteaucitron solution for managing your cookie consent.',
            p2: 'You can change your cookie preferences at any time via the management panel accessible at the bottom of the page.',
        },
        rights: {
            title: '5. Your Rights',
            p1: 'In accordance with the General Data Protection Regulation (GDPR), you have the right to access, rectify, delete, and request portability of your data. You may also object to the processing of your data or request its limitation.',
            p2: 'To exercise these rights, please contact us at: valerie@sun-beach-house.com',
        },
        dpo: {
            title: 'DPO Contact',
            text: 'For any questions regarding our privacy policy, you can write to us at: SUN BEACH HOUSE - 65 RUE DE LA PAIX GUSTAVIA 97133 SAINT BARTHELEMY',
        },
    },

    conditionsPage: {
        title: 'Booking, Cancellation and General Conditions',
        metaDescription: 'Booking conditions, cancellation policy and general information for your stay in Saint-Barthélemy with Sun Beach House.',
        booking: {
            title: '1. Booking Conditions',
            intro: 'A deposit of 30% of the total stay amount (including rent, taxes and administrative fees) is required to confirm any booking. The villa cannot be guaranteed until this deposit has been received. The booking will only be considered firm and final upon receipt of payment (proof of transfer required) and signature of the rental contract.',
            nonHoliday: {
                title: 'Bookings outside holiday periods (Christmas and New Year)',
                over60: { label: 'Booking made more than 60 days before arrival:', desc: '30% deposit at booking, balance payable no later than 60 days before arrival.' },
                under60: { label: 'Booking made 60 days or less before arrival:', desc: '100% of the total stay amount due at the time of booking.' },
            },
            holiday: {
                title: 'Bookings during holiday periods (Christmas and New Year)',
                over120: { label: 'Booking made more than 120 days before arrival:', desc: '30% deposit at booking, balance payable no later than 90 days before arrival.' },
                under90: { label: 'Booking made 90 days or less before arrival:', desc: '100% of the total stay amount due at the time of booking.' },
            },
            warning: 'In case of non-payment of the balance within the indicated deadlines, the booking will be automatically cancelled and deposits paid will be retained by the Agency.',
        },
        cancellation: {
            title: '2. Cancellation Policy',
            intro: 'All cancellation requests must be submitted in writing (email or letter).',
            nonHoliday: {
                title: 'Bookings outside holiday periods (Christmas and New Year)',
                items: [
                    'Cancellation 61 days or more before arrival: fees equivalent to 30% of the total stay amount.',
                    'Cancellation between 60 and 31 days before arrival: fees equivalent to 50% of the total stay amount.',
                    'Cancellation 30 days or less before arrival: fees equivalent to 100% of the total stay amount.',
                ],
            },
            holiday: {
                title: 'Bookings during holiday periods (Christmas and New Year)',
                items: [
                    'Cancellation 91 days or more before arrival: fees equivalent to 30% of the total stay amount.',
                    'Cancellation between 90 and 61 days before arrival: fees equivalent to 50% of the total stay amount.',
                    'Cancellation 60 days or less before arrival: fees equivalent to 100% of the total stay amount.',
                ],
            },
        },
        insurance: {
            title: '3. Travel Insurance',
            p1: 'The Client is strongly encouraged to take out travel insurance covering all risks related to their stay: cancellation, trip interruption, transport delays, loss or theft of luggage, and any unforeseen expenses.',
            p2: 'Sun Beach House cannot be held responsible for travel-related incidents, including flight cancellations or delays, lost luggage, or any event beyond its control that may impact the stay.',
            p3: 'In accordance with current regulations, any transfers provided by staff are limited to the airport-to-villa route. For any other travel, taxi or vehicle rental services can be arranged upon request.',
        },
        touristTax: {
            title: '4. Tourist Tax',
            p1: 'A tourist tax of 5% of the total rental amount is applicable.',
            p2: 'This tax is collected on behalf of the local authority and is payable upon arrival.',
        },
        visa: {
            title: '5. Visa and Entry Requirements',
            p1: 'It is the Client\'s responsibility to check with their embassy or the relevant authorities regarding entry requirements for Saint-Barthélemy, including visa requirements, passport validity, or any other administrative formalities.',
            p2: 'Sun Beach House declines all responsibility in case of entry refusal to the territory due to non-compliant or incomplete travel documents.',
        },
        pricing: {
            title: '6. Rates and Stay Conditions',
            priceInfo: 'Rates are quoted per week in US dollars (USD).',
            taxInfo: 'Prices do not include tourist tax (+5%) or service fees (+10%), unless otherwise stated.',
            priceNote: 'Rates may be modified without prior notice, in accordance with these booking conditions.',
            minStay: {
                title: 'Minimum Stay',
                items: [
                    'Minimum stay: 7 nights (shorter stays possible on request, subject to acceptance)',
                    'Thanksgiving and Bucket Regatta periods: minimum stay of 7 nights.',
                    'Festive season (Christmas & New Year): minimum stay of 14 nights (shorter stays on request, subject to acceptance).',
                ],
            },
        },
        checkInOut: {
            title: '7. Check-in and Check-out Times',
            checkIn: { label: 'Check-in', value: 'from 3:00 PM' },
            checkOut: { label: 'Check-out', value: 'before 12:00 PM (noon)' },
        },
    },
};

import { pt } from './translations-pt';
import { es } from './translations-es';

export const translations: Record<Language, Translations> = {
    fr,
    en,
    pt,
    es,
};
