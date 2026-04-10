export type Language = 'fr' | 'en' | 'pt' | 'es';

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
        type: string;
        seasonalRental: string;
        sale: string;
        rooms: string;
        ourCollections: string;
        seasonalRentals: string;
        propertiesForSale: string;
        disclaimerText: string;
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
        budget: string;
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
        explore: string;
        propertyType: string;
        allTypes: string;
        villa: string;
        apartment: string;
        land: string;
        commercial: string;
        price: string;
        minPrice: string;
        maxPrice: string;
        landSurfaceMin: string;
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
        bathroom: string;
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
        seasons: {
            lowSeason: string;
            summer: string;
            highSeason: string;
            thanksgiving: string;
            christmas: string;
            newYear: string;
        };
        video: string;
        morePhotos: string;
        downloadPdf: string;
        types: {
            villa: string;
            apartment: string;
            land: string;
            commercial: string;
        };
        surface: string;
        landSurface: string;
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
        bookingConditions: string;
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

    // Conciergerie Page
    conciergeriePage: {
        title: string;
        subtitle: string;
        intro: string;
        cta: string;
        servicesTitle: string;

        chef: {
            title: string;
            shortDesc: string;
            longDesc: string;
            features: string[];
        };
        spa: {
            title: string;
            shortDesc: string;
            longDesc: string;
            features: string[];
        };
        transfer: {
            title: string;
            shortDesc: string;
            longDesc: string;
            features: string[];
        };
        reservations: {
            title: string;
            shortDesc: string;
            longDesc: string;
            features: string[];
        };
        nautical: {
            title: string;
            shortDesc: string;
            longDesc: string;
            features: string[];
        };
        travel: {
            title: string;
            shortDesc: string;
            intro: string;
            solutionsTitle: string;
            solutions: string[];
            partnersNote: string;
        };
        vip: {
            title: string;
            shortDesc: string;
            intro: string;
            whyTitle: string;
            whyItems: string[];
            whatIsIt: string;
            whatIsItDesc: string;
            includedTitle: string;
            arrivalTitle: string;
            arrivalItems: string[];
            departureTitle: string;
            departureItems: string[];
            optionalNote: string;
        };
    };

    // Contact
    contact: {
        title: string;
        subtitle: string;
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

    // Alts & SEO
    alts: {
        aboutMain: string;
        aboutSecondary: string;
        experienceMorning: string;
        experienceBlue: string;
        experienceGolden: string;
        villaCardPrefix: string;
    };
}
