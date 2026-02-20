import React from 'react';

export interface Equipment {
  _id: string;
  name: string;  // En français, traduit par Google Translate API
  name_en?: string; // Nom anglais optionnel (override admin)
  icon: string;  // Code de l'icône Lucide React
}

export interface Season {
  _id: string;
  name: string;  // En français, traduit par Google Translate API
  name_en?: string; // Nom anglais optionnel (override admin)
  order: number;
}

export interface Location {
  _id: string;
  name: string;  // En français, traduit par Google Translate API
  order: number;
}

// DEPRECATED: Kept for backward compatibility during migration
export interface Amenity {
  icon: string; // Name of the Lucide icon
  label: string;
}

export interface BedroomPrice {
  bedrooms: number;
  price: number;
}

export interface SeasonalPrice {
  id: string;
  seasonName: Season; // Reference to Season document
  dates: string; // French format, auto-translated to English on frontend
  prices: BedroomPrice[]; // Array of prices based on bedroom count opened
}


export interface Amenity {
  _id: string;
  name: string;
  name_en?: string;
  icon: string;
}

export interface SeasonName {
  _id: string;
  name: string;
  name_en?: string;
}

export interface HomeFeature {
  title: string;
  description: string;
}

export interface Villa {
  id: string;
  name: string;
  location: Location; // Reference to Location document
  description: string | { fr: string; en: string }; // Transition: accepts both formats
  fullDescription: string | { fr: string; en: string }; // Transition: accepts both formats
  pricePerNight?: number; // Optional, for rentals (base price for display if no weekly)
  pricePerWeek?: number; // Optional, preferred for rentals
  salePrice?: number; // Optional, for sales
  listingType: 'rent' | 'sale'; // New discriminator
  propertyType?: 'villa' | 'apartment' | 'land'; // villa, apartment or land
  seasonalPrices?: SeasonalPrice[]; // Array of seasonal pricing (rentals only)
  bedrooms: number;
  bathrooms: number;
  guests: number; // For sale: occupancy potential
  surface?: number; // m2 - Optional now
  landSurface?: number; // m2 - Optional, land surface area
  homeFeatures?: HomeFeature[]; // Room and space details
  mainImage: string;
  galleryImages: string[]; // Array of image URLs
  videoUrl?: string; // YouTube/Vimeo URL
  videoFileUrl?: string; // Sanity uploaded video URL
  amenities: Equipment[]; // Array of Equipment references
  tags: string[];
  featuredOnHomepage?: boolean; // Whether to show on homepage
  homepageOrder?: number; // Position on homepage (1-4)
  pricingDetails?: string; // Additional pricing info
  geopoint?: {
    lat: number;
    lng: number;
  }; // GPS coordinates for map
  privateInfo?: string; // Internal notes (not displayed on site)
  brochurePdfUrl?: string; // URL of the uploaded PDF brochure
}


export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface BookingParams {
  villaId: string;
  arrival: string;
  departure: string;
  guests: number;
}

export interface SalesInquiryParams {
  villaId: string;
}

export interface FilterState {
  location: string;
  bedrooms: number;
  minPrice?: number;
  price: number; // maxPrice
  amenities: string[];
  name?: string;
  propertyType?: string;
  landSurface?: number; // min land surface
}

export enum Section {
  HERO = 'hero',
  VILLAS = 'villas',
  ABOUT = 'about',
  SERVICES = 'services',
  CONTACT = 'contact'
}