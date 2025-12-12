import React from 'react';

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
  seasonName: string; // e.g. "High Season"
  dates: string; // e.g. "Jan 9 - Apr 15"
  prices: BedroomPrice[]; // Array of prices based on bedroom count opened
}

export interface Villa {
  id: string;
  name: string;
  location: string; // e.g., "Flamands", "Toiny"
  description: string; // Short description for card
  fullDescription: string; // Long storytelling text
  pricePerNight?: number; // Optional, for rentals (base price for display)
  salePrice?: number; // Optional, for sales
  listingType: 'rent' | 'sale'; // New discriminator
  seasonalPrices?: SeasonalPrice[]; // Array of seasonal pricing (rentals only)
  bedrooms: number;
  bathrooms: number;
  guests: number; // For sale: occupancy potential
  surface: number; // m2
  viewType: string; // e.g. "Océan", "Jardin Tropical"
  mainImage: string;
  galleryImages: string[]; // Array of image URLs
  amenities: Amenity[];
  tags: string[];
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
  guests: number;
  price: number;
  amenities: string[];
}

export enum Section {
  HERO = 'hero',
  VILLAS = 'villas',
  ABOUT = 'about',
  SERVICES = 'services',
  CONTACT = 'contact'
}