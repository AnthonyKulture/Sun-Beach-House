import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { Villa } from '../types';
import { optimizeImageForPDF } from '../utils/pdfHelpers';

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

// PDF Styles - Optimized for 2 pages max
const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.cream,
        padding: 0,
    },
    // Compact Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        paddingBottom: 20,
        borderBottom: `1px solid #E0E0E0`,
    },
    logoImage: {
        width: 100,
        height: 60,
        objectFit: 'contain',
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
    // Content Section - Reduced padding
    contentSection: {
        padding: 25,
        paddingHorizontal: 30,
        paddingBottom: 70, // Space for footer
        flexDirection: 'row',
        gap: 25,
    },
    leftColumn: {
        flex: 1.2,
    },
    rightColumn: {
        flex: 0.8,
    },
    sectionTitle: {
        fontSize: 14,
        fontFamily: 'Times-Italic',
        color: colors.charcoal,
        marginBottom: 10,
    },
    description: {
        fontSize: 9,
        fontFamily: 'Helvetica',
        color: colors.gray,
        lineHeight: 1.6,
        textAlign: 'justify',
    },
    // Amenities - Compact
    amenitiesList: {
        gap: 7,
    },
    amenityItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 6,
    },
    amenityBullet: {
        fontSize: 10,
        color: colors.green,
        marginTop: 1,
    },
    amenityLabel: {
        fontSize: 9,
        fontFamily: 'Helvetica',
        color: colors.charcoal,
        flex: 1,
        lineHeight: 1.3,
    },
    // Pricing Section - Page 2
    pricingSection: {
        padding: 30,
        paddingTop: 20,
        paddingBottom: 20,
    },
    priceTable: {
        marginTop: 12,
        gap: 5,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: colors.white,
    },
    priceLabel: {
        fontSize: 9,
        fontFamily: 'Helvetica',
        color: colors.charcoal,
    },
    priceValue: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        color: colors.green,
    },
    // Gallery - Compact
    gallerySection: {
        padding: 30,
        paddingTop: 20,
        paddingBottom: 70,
    },
    galleryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    galleryImage: {
        width: '48%',
        height: 140,
        objectFit: 'cover',
    },
    // Compact Footer
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 18,
        paddingHorizontal: 30,
        backgroundColor: '#C3CBC4',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 7,
        fontFamily: 'Helvetica',
        color: colors.charcoal,
        lineHeight: 1.5,
    },
    footerBold: {
        fontSize: 8,
        fontFamily: 'Helvetica-Bold',
        color: colors.charcoal,
    },
});

interface VillaBrochurePDFProps {
    villa: Villa;
    language?: 'fr' | 'en';
}

export const VillaBrochurePDF: React.FC<VillaBrochurePDFProps> = ({ villa, language = 'fr' }) => {
    const pdfOptions = villa.pdfOptions || {};
    const includePrice = pdfOptions.includePrice !== false;
    const isSale = villa.listingType === 'sale';

    // Limit amenities (max 8 for space)
    const displayedAmenities = pdfOptions.highlightedAmenities?.length
        ? villa.amenities.filter(a => pdfOptions.highlightedAmenities?.includes(a.icon)).slice(0, 8)
        : villa.amenities.slice(0, 8);

    // Get localized description
    // @ts-ignore - Handle legacy string or new object structure
    const fullDescription = typeof villa.fullDescription === 'object'
        ? (villa.fullDescription[language] || villa.fullDescription['fr'] || '')
        : (villa.fullDescription || '');

    // Truncate description to fit page 1 (approximately 800 characters)
    const truncatedDescription = truncateText(fullDescription, 800);

    // Gallery: max 4 images
    const galleryImages = villa.galleryImages.slice(0, 4);

    return (
        <Document>
            {/* PAGE 1: Hero + Description + Amenities */}
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.villaName}>{villa.name}</Text>
                    <Image src="/logo-sbh.png" style={styles.logoImage} />
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
                        {villa.location}, Saint-Barthélemy
                    </Text>
                </View>

                {/* Details Grid */}
                <View style={styles.detailsGrid}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Invités</Text>
                        <Text style={styles.detailValue}>{villa.guests}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Chambres</Text>
                        <Text style={styles.detailValue}>{villa.bedrooms}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Salles de Bain</Text>
                        <Text style={styles.detailValue}>{villa.bathrooms}</Text>
                    </View>
                    {isSale && (
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Surface</Text>
                            <Text style={styles.detailValue}>{villa.surface} m²</Text>
                        </View>
                    )}
                </View>

                {/* Main Content - 2 columns */}
                <View style={styles.contentSection}>
                    {/* Left: Description */}
                    <View style={styles.leftColumn}>
                        <Text style={styles.sectionTitle}>À Propos</Text>
                        <Text style={styles.description}>{truncatedDescription}</Text>

                        {villa.viewType && (
                            <View style={{ marginTop: 14 }}>
                                <Text style={styles.sectionTitle}>Vue</Text>
                                <Text style={styles.description}>{villa.viewType}</Text>
                            </View>
                        )}
                    </View>

                    {/* Right: Amenities */}
                    <View style={styles.rightColumn}>
                        <Text style={styles.sectionTitle}>Équipements</Text>
                        <View style={styles.amenitiesList}>
                            {displayedAmenities.map((amenity, index) => (
                                <View key={index} style={styles.amenityItem}>
                                    <Text style={styles.amenityBullet}>•</Text>
                                    <Text style={styles.amenityLabel}>{amenity.label}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer} fixed>
                    <View>
                        <Text style={styles.footerBold}>SUN BEACH HOUSE</Text>
                        <Text style={styles.footerText}>contact@sunbeachhouse.com</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.footerText}>Saint-Barthélemy</Text>
                        <Text style={styles.footerText}>Locations de Luxe</Text>
                    </View>
                </View>
            </Page>

            {/* PAGE 2: Pricing + Gallery */}
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={{ ...styles.villaName, fontSize: 20 }}>Tarifs & Photos</Text>
                    <Image src="/logo-sbh.png" style={styles.logoImage} />
                </View>

                {/* Pricing Section */}
                {includePrice && !isSale && villa.seasonalPrices && villa.seasonalPrices.length > 0 && (
                    <View style={styles.pricingSection}>
                        <Text style={styles.sectionTitle}>Tarifs Saisonniers</Text>
                        <View style={styles.priceTable}>
                            {villa.seasonalPrices.slice(0, 4).map((season, index) => (
                                <View key={index}>
                                    <View style={styles.priceRow}>
                                        <Text style={styles.priceLabel}>
                                            {season.seasonName} ({season.dates})
                                        </Text>
                                        <Text style={styles.priceValue}>
                                            À partir de {season.prices[0]?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                        <Text style={{ ...styles.footerText, marginTop: 10, color: colors.gray }}>
                            Prix par semaine. Service et taxes non inclus.
                        </Text>
                    </View>
                )}

                {includePrice && isSale && villa.salePrice && (
                    <View style={styles.pricingSection}>
                        <Text style={styles.sectionTitle}>Prix</Text>
                        <Text style={{ ...styles.priceValue, fontSize: 22, marginTop: 6 }}>
                            {villa.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €
                        </Text>
                    </View>
                )}

                {/* Gallery */}
                {galleryImages.length > 0 && (
                    <View style={styles.gallerySection}>
                        <Text style={styles.sectionTitle}>Galerie Photos</Text>
                        <View style={styles.galleryGrid}>
                            {galleryImages.map((img, index) => (
                                <Image
                                    key={index}
                                    src={optimizeImageForPDF(img)}
                                    style={styles.galleryImage}
                                />
                            ))}
                        </View>
                    </View>
                )}

                {/* Footer */}
                <View style={styles.footer} fixed>
                    <View>
                        <Text style={styles.footerBold}>SUN BEACH HOUSE</Text>
                        <Text style={styles.footerText}>contact@sunbeachhouse.com</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.footerText}>Saint-Barthélemy</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};
