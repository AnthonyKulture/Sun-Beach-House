/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { Villa } from '../types';
import { translations } from '../i18n/translations';
import { optimizeImageForPDF } from '../utils/pdfHelpers';
import { translateDate } from '../utils/dateTranslation';


// Define color palette matching design system
const colors = {
    charcoal: '#2D2D2D',
    cream: '#FAF8F3',
    green: '#7FA99B',
    blue: '#4A90A4',
    stone: '#8B7E74',
    white: '#FFFFFF',
    gray: '#6B7280',
};

// Helper function to truncate text with ellipsis
const truncateText = (text: string, maxLength: number): string => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
};

// PDF Styles - Optimized for portrait format with full content
const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.cream,
        padding: 0,
    },
    // Compact Header - Title only
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 30,
        paddingBottom: 20,
        borderBottom: `1px solid #E0E0E0`,
    },
    villaName: {
        fontSize: 24,
        fontFamily: 'Times-Italic',
        color: colors.charcoal,
    },
    // Hero Section - Reduced height
    heroSection: {
        width: '100%',
        height: 220,
        marginBottom: 0,
    },
    heroImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    // Location bar - Compact
    locationBar: {
        backgroundColor: colors.white,
        padding: 10,
        paddingHorizontal: 30,
    },
    locationText: {
        fontSize: 8,
        fontFamily: 'Helvetica',
        color: colors.gray,
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    // Details Grid - No bottom border to save space
    detailsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 18,
        paddingHorizontal: 30,
    },
    detailItem: {
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 7,
        fontFamily: 'Helvetica',
        color: colors.gray,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 18,
        fontFamily: 'Helvetica-Bold',
        color: colors.charcoal,
    },
    // Content Section - Full width for description
    contentSection: {
        padding: 20,
        paddingHorizontal: 30,
        paddingBottom: 15,
    },
    sectionTitle: {
        fontSize: 13,
        fontFamily: 'Times-Italic',
        color: colors.charcoal,
        marginBottom: 8,
    },
    description: {
        fontSize: 8.5,
        fontFamily: 'Helvetica',
        color: colors.gray,
        lineHeight: 1.5,
        textAlign: 'justify',
    },
    // Amenities Section - 2 columns, no limit
    amenitiesSection: {
        paddingHorizontal: 30,
        paddingTop: 15,
        paddingBottom: 80, // Space for footer
        backgroundColor: colors.cream,
    },
    amenitiesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    featureImageSection: {
        marginTop: 40,
        width: '100%',
        height: 300,
        borderRadius: 2,
        overflow: 'hidden',
    },
    featureImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    amenityItem: {
        flexDirection: 'row',
        alignItems: 'center', // Center vertically
        gap: 8,
        width: '48%',
        marginBottom: 12, // Increased spacing
    },
    amenityBullet: {
        fontSize: 14, // Larger bullet
        color: colors.green,
        marginTop: 0,
    },
    amenityLabel: {
        fontSize: 11, // Larger text
        fontFamily: 'Helvetica',
        color: colors.charcoal,
        flex: 1,
        lineHeight: 1.4,
    },
    // Pricing Section - dedicated page
    pricingSection: {
        padding: 30,
        paddingTop: 20,
        paddingBottom: 50, // Space for fixed footer
    },
    priceTable: {
        marginTop: 12,
        gap: 4,
    },
    // Season group header row
    seasonHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 7,
        paddingHorizontal: 12,
        backgroundColor: colors.green,
        marginTop: 6,
    },
    seasonHeaderLabel: {
        fontSize: 9,
        fontFamily: 'Helvetica-Bold',
        color: colors.white,
    },
    seasonHeaderDates: {
        fontSize: 8,
        fontFamily: 'Helvetica',
        color: colors.white,
    },
    // Bedroom sub-row inside a season
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 12,
        backgroundColor: colors.white,
    },
    priceLabel: {
        fontSize: 8.5,
        fontFamily: 'Helvetica',
        color: colors.charcoal,
    },
    priceValue: {
        fontSize: 9,
        fontFamily: 'Helvetica-Bold',
        color: colors.green,
    },
    // Gallery - Portrait format, 2 photos per page
    gallerySection: {
        padding: 30,
        paddingTop: 20,
        paddingBottom: 70,
    },
    galleryGrid: {
        flexDirection: 'column',
        gap: 15,
    },
    galleryImage: {
        width: '100%',
        height: 280,
        objectFit: 'cover',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 18,
        paddingHorizontal: 30,
        backgroundColor: '#C3CBC4',
        height: 30, // Just a visual bar, no text
    },
    footerText: {
        fontSize: 7,
        fontFamily: 'Helvetica',
        color: colors.charcoal,
        lineHeight: 1.5,
    },
});



// Helper to normalize season names to translation keys
const getSeasonTranslationKey = (rawName: string | undefined): keyof import('../i18n/translations').Translations['villa']['seasons'] | null => {
    if (!rawName) return null;
    const lower = rawName.toLowerCase();
    if (lower.includes('low') || lower.includes('basse')) return 'lowSeason';
    if (lower.includes('high') || lower.includes('haute')) return 'highSeason';
    if (lower.includes('summer') || lower.includes('été')) return 'summer';
    if (lower.includes('thanksgiving')) return 'thanksgiving';
    if (lower.includes('christmas') || lower.includes('noël')) return 'christmas';
    if (lower.includes('new year') || lower.includes('nouvel')) return 'newYear';
    return null;
};

/** Splits an array into chunks of a given size (used for gallery pagination) */
function chunkArray<T>(arr: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}

interface VillaBrochurePDFProps {
    villa: Villa;
    /** @deprecated Language is always English — kept for API compatibility with the CMS actions */
    language?: 'fr' | 'en';
    includePricing?: boolean; // Direct control over pricing display
}

export const VillaBrochurePDF: React.FC<VillaBrochurePDFProps> = ({ villa, includePricing = false }) => {
    // Determine if we show seasonal pricing based on includePricing prop and villa type
    const showSeasonalPricing =
        includePricing &&
        villa.listingType === 'rent' &&
        villa.seasonalPrices &&
        villa.seasonalPrices.length > 0;

    const isSale = villa.listingType === 'sale';

    // PDF is always generated in English
    const t = translations['en'];

    // Show all amenities (ensure array exists)
    const displayedAmenities = villa.amenities || [];

    // Get localized description - FULL VERSION (no truncation) (en forced)
    // @ts-ignore - Handle legacy string or new object structure
    const fullDescription = typeof villa.fullDescription === 'object'
        ? (villa.fullDescription['en'] || villa.fullDescription['fr'] || '')
        : (villa.fullDescription || '');

    // Gallery: Split into chunks of 2 for portrait layout
    const galleryPages = chunkArray(villa.galleryImages, 2);

    return (
        <Document>
            {/* PAGE 1: Hero + Description + Amenities */}
            <Page size="A4" style={styles.page}>
                {/* Header - Villa name left */}
                <View style={styles.header}>
                    <Text style={styles.villaName}>{villa.name}</Text>
                </View>

                {/* Hero Image */}
                <View style={styles.heroSection}>
                    <Image
                        src={optimizeImageForPDF(villa.mainImage)}
                        style={styles.heroImage}
                    />
                </View>

                {/* Location */}
                <View style={styles.locationBar}>
                    <Text style={styles.locationText}>
                        {villa.location.name}, Saint-Barthélemy
                    </Text>
                </View>

                {/* Details Grid */}
                <View style={styles.detailsGrid}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Type</Text>
                        <Text style={styles.detailValue}>{villa.propertyType === 'apartment' ? 'Apartment' : 'Villa'}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Guests</Text>
                        <Text style={styles.detailValue}>{villa.guests}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Bedrooms</Text>
                        <Text style={styles.detailValue}>{villa.bedrooms}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Bathrooms</Text>
                        <Text style={styles.detailValue}>{villa.bathrooms}</Text>
                    </View>
                    {isSale && villa.surface && (
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Surface</Text>
                            <Text style={styles.detailValue}>{villa.surface} m²</Text>
                        </View>
                    )}
                </View>

                {/* Description - Full width */}
                <View style={styles.contentSection}>
                    <Text style={styles.sectionTitle}>About</Text>
                    <Text style={styles.description}>{fullDescription}</Text>
                </View>

                {/* Footer */}
                <View style={styles.footer} fixed />
            </Page>

            {/* PAGE 2: Équipements */}
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={{ ...styles.villaName, fontSize: 20 }}>
                        Amenities
                    </Text>
                </View>

                {/* Amenities - 2 columns grid */}
                <View style={styles.amenitiesSection}>
                    {displayedAmenities && displayedAmenities.length > 0 ? (
                        <View style={styles.amenitiesGrid}>
                            {displayedAmenities.map((amenity, index) => {
                                const displayName = amenity.name_en || amenity.name;

                                return (
                                    <View key={index} style={styles.amenityItem}>
                                        <Text style={styles.amenityBullet}>•</Text>
                                        <Text style={styles.amenityLabel}>{displayName}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    ) : (
                        <Text style={styles.description}>No amenities listed</Text>
                    )}
                </View>

                {/* Feature Image if no pricing */}
                {!showSeasonalPricing && villa.galleryImages && villa.galleryImages.length > 0 && (
                    <View style={styles.featureImageSection}>
                        <Image
                            src={optimizeImageForPDF(villa.galleryImages[0])}
                            style={styles.featureImage}
                        />
                    </View>
                )}

                {/* Footer */}
                <View style={styles.footer} fixed />
            </Page>

            {/* PAGE 3 (if pricing): Grille tarifaire – page dédiée, peut s'étendre sur plusieurs pages */}
            {showSeasonalPricing && (
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Text style={{ ...styles.villaName, fontSize: 20 }}>
                            Seasonal Pricing
                        </Text>
                    </View>

                    <View style={styles.pricingSection}>
                        <View style={styles.priceTable}>
                            {villa.seasonalPrices!.map((season, index) => {
                                const normalizedKey = getSeasonTranslationKey(season.seasonName.name);
                                const translatedName = normalizedKey
                                    ? t.villa.seasons[normalizedKey]
                                    : season.seasonName.name;

                                const dateString = translateDate(season.dates, 'en');

                                const sortedPrices = [...(season.prices || [])].sort(
                                    (a, b) => a.bedrooms - b.bedrooms
                                );

                                return (
                                    <View key={index} wrap={false}>
                                        {/* Season header */}
                                        <View style={styles.seasonHeaderRow}>
                                            <Text style={styles.seasonHeaderLabel}>
                                                {translatedName}
                                            </Text>
                                            <Text style={styles.seasonHeaderDates}>
                                                {dateString}
                                            </Text>
                                        </View>

                                        {/* One sub-row per bedroom count */}
                                        {sortedPrices.map((bp, bpIndex) => (
                                            <View key={bpIndex} style={[
                                                styles.priceRow,
                                                bpIndex % 2 === 1 ? { backgroundColor: '#F5F5F0' } : {}
                                            ]}>
                                                <Text style={styles.priceLabel}>
                                                    {bp.bedrooms} bedroom{bp.bedrooms > 1 ? 's' : ''}
                                                </Text>
                                                <Text style={styles.priceValue}>
                                                    {villa.currency === 'EUR' ? '€' : '$'}{bp.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} / {bp.priceUnit === 'night' ? 'night' : 'week'}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                );
                            })}
                        </View>
                        <Text style={{ ...styles.footerText, marginTop: 10, color: colors.gray }}>
                            Prices per week. Service and taxes not included.
                        </Text>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer} fixed />
                </Page>
            )}



            {/* GALLERY PAGES - 2 photos per page in portrait */}
            {galleryPages.map((pageImages, pageIndex) => (
                <Page key={pageIndex} size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Text style={{ ...styles.villaName, fontSize: 20 }}>
                            Photo Gallery
                        </Text>
                    </View>

                    <View style={styles.gallerySection}>
                        <View style={styles.galleryGrid}>
                            {pageImages.map((img, index) => (
                                <Image
                                    key={index}
                                    src={optimizeImageForPDF(img)}
                                    style={styles.galleryImage}
                                />
                            ))}
                        </View>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer} fixed />
                </Page>
            ))}
        </Document>
    );
};
