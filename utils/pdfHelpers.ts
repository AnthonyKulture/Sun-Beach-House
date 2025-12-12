import { Villa } from '../types';

/**
 * Optimizes an image URL from Sanity CDN for PDF export
 * Appends query parameters to resize and compress the image
 */
export function optimizeImageForPDF(imageUrl: string): string {
    if (!imageUrl) return imageUrl;

    // Check if it's a Sanity CDN URL
    if (imageUrl.includes('cdn.sanity.io')) {
        // Add Sanity Image API parameters
        const separator = imageUrl.includes('?') ? '&' : '?';
        return `${imageUrl}${separator}w=1200&q=80&fm=jpg&fit=max`;
    }

    return imageUrl;
}

/**
 * Generates a descriptive filename for the PDF brochure
 */
export function generatePDFFileName(villa: Villa): string {
    const slug = villa.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[àáâãäå]/g, 'a')
        .replace(/[èéêë]/g, 'e')
        .replace(/[ìíîï]/g, 'i')
        .replace(/[òóôõö]/g, 'o')
        .replace(/[ùúûü]/g, 'u')
        .replace(/[ç]/g, 'c')
        .replace(/[^a-z0-9-]/g, '');

    return `villa-${slug}-brochure.pdf`;
}

/**
 * Estimates the PDF file size based on content
 * Returns size in MB (approximate)
 */
export function calculateEstimatedPDFSize(villa: Villa): number {
    const imageCount = Math.min(
        1 + (villa.galleryImages?.length || 0),
        6 // Max images we'll include
    );

    // Rough estimate: 400KB per optimized image + 100KB for text/styling
    const estimatedSizeMB = (imageCount * 0.4) + 0.1;

    return Math.round(estimatedSizeMB * 10) / 10; // Round to 1 decimal
}

/**
 * Gets the appropriate amenity icons for PDF (limited set)
 * Maps from icon names to unicode symbols for PDF rendering
 */
export function getAmenitySymbol(iconName: string): string {
    const symbols: Record<string, string> = {
        'Wifi': '📶',
        'Wind': '❄️',
        'Waves': '🌊',
        'ChefHat': '👨‍🍳',
        'Car': '🚗',
        'Droplets': '🏊',
        'Sun': '☀️',
        'Coffee': '☕',
        'Flower2': '🌺',
        'Speaker': '🔊',
        'Dumbbell': '💪',
        'Tv': '📺',
        'Shield': '🔒',
        'Utensils': '🍖',
        'ShoppingBag': '🛍️',
        'Martini': '🍸',
        'Music': '🎵',
        'Key': '🔑',
        'Star': '⭐'
    };

    return symbols[iconName] || '•';
}
