import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Img,
    Text,
    Button,
    Hr,
    Preview,
    Link,
} from '@react-email/components';
import { Villa } from '@/types';
import * as React from 'react';

interface VillaSelectionEmailProps {
    message: string;
    villas: Villa[];
    baseUrl: string;
    lang?: 'fr' | 'en';
}

const getDescription = (desc: any, lang: 'fr' | 'en') => {
    if (!desc) return '';
    if (typeof desc === 'string') return desc;
    return lang === 'en' ? (desc.en || desc.fr || '') : (desc.fr || desc.en || '');
};

export const VillaSelectionEmail = ({
    message,
    villas = [],
    baseUrl = 'https://www.sun-beach-house.com',
    lang = 'fr',
}: VillaSelectionEmailProps) => {
    const previewText = lang === 'en' ? `Your villa selection by Sun-Beach-House` : `Votre sélection de villas par Sun-Beach-House`;
    const logoUrl = `${baseUrl}/logo-sbh.png`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header */}
                    <Section style={header}>
                        <Link href={baseUrl}>
                            <Img
                                src={logoUrl}
                                alt="Sun Beach House"
                                width="180"
                                style={logo}
                            />
                        </Link>
                        <Text style={taglineText}>
                            {lang === 'en' ? 'EXCLUSIVE VILLA RENTALS & SALES' : 'LOCATIONS & VENTES DE VILLAS D\'EXCEPTION'}
                        </Text>
                    </Section>

                    {/* Message */}
                    {message && (
                        <Section style={messageSection}>
                            <Text style={paragraph}>
                                {message.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line.split(/(\*\*.*?\*\*)/).map((part, j) => {
                                            if (part.startsWith('**') && part.endsWith('**')) {
                                                return <strong key={j}>{part.slice(2, -2)}</strong>;
                                            }
                                            return part;
                                        })}
                                        {i !== message.split('\n').length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </Text>
                        </Section>
                    )}

                    {villas.length > 0 && <Hr style={divider} />}

                    {/* Villas List */}
                    <Section style={villasSection}>
                        <Text style={sectionTitle}>{lang === 'en' ? 'Our Exclusive Selection' : 'Notre Sélection Exclusive'}</Text>

                        {villas.map((villa) => {
                            const desc = getDescription(villa.description, lang);
                            const villaUrl = `${baseUrl}/${lang}/villas/${villa.id}`;

                            return (
                                <Section key={villa.id} style={villaCard}>
                                    {villa.mainImage && (
                                        <Link href={villaUrl}>
                                            <Img
                                                src={villa.mainImage}
                                                alt={villa.name}
                                                width="600"
                                                height="338"
                                                style={villaImage}
                                            />
                                        </Link>
                                    )}
                                    <div style={villaContent}>
                                        <Text style={villaTag}>
                                            {villa.listingType === 'sale' 
                                                ? (lang === 'en' ? 'FOR SALE' : 'EN VENTE') 
                                                : (lang === 'en' ? 'FOR RENT' : 'À LOUER')}
                                        </Text>
                                        <Text style={villaTitle}>{villa.name}</Text>
                                        <Text style={villaMeta}>
                                            {villa.location?.name} • {villa.bedrooms} {lang === 'en' ? 'bedrooms' : 'chambres'}
                                        </Text>
                                        <Text style={villaDesc}>
                                            {desc}
                                        </Text>
                                        <Button href={villaUrl} style={ctaButton}>
                                            {lang === 'en' ? 'Discover this property' : 'Découvrir cette propriété'}
                                        </Button>
                                    </div>
                                </Section>
                            );
                        })}
                    </Section>

                    <Hr style={divider} />

                    {/* Footer / Signature */}
                    <Section style={footer}>
                        <Text style={footerTextBold}>Valérie Kerckhofs</Text>
                        <Text style={footerText}>Sun Beach House St. Barth</Text>
                        <Text style={footerLink}>
                            <Link href={baseUrl} style={{ color: '#1A3C34', textDecoration: 'none' }}>www.sun-beach-house.com</Link>
                        </Text>
                        <Text style={footerContact}>
                            Email: valerie@sun-beach-house.com | Tel: +590 690 63 47 25
                        </Text>
                        
                        <Hr style={{ borderColor: '#f1f1f1', margin: '20px 0' }} />
                        
                        <Text style={footerNote}>
                            {lang === 'en' 
                                ? 'You are receiving this email because a villa selection was specifically prepared for you. To ensure delivery, please add valerie@sun-beach-house.com to your address book.'
                                : 'Vous recevez cet email car une sélection de villas a été spécifiquement préparée pour vous. Pour garantir la réception de nos emails, ajoutez valerie@sun-beach-house.com à vos contacts.'}
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default VillaSelectionEmail;

// Styles for React Email
const main = {
    backgroundColor: '#F6F5F1',
    fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '40px 20px',
    maxWidth: '600px',
    backgroundColor: '#ffffff',
};

const header = {
    padding: '32px 0',
    textAlign: 'center' as const,
};

const logo = {
    margin: '0 auto',
    display: 'block',
};

const taglineText = {
    color: '#1A3C34',
    fontSize: '10px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    margin: '16px 0 0 0',
    textAlign: 'center' as const,
};

const messageSection = {
    padding: '20px 0',
};

const paragraph = {
    fontSize: '16px',
    lineHeight: '26px',
    color: '#2D2D2D',
    whiteSpace: 'pre-wrap' as const,
};

const divider = {
    borderColor: '#E5E7EB',
    margin: '40px 0',
};

const villasSection = {
    padding: '0',
};

const sectionTitle = {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#1A3C34',
    margin: '0 0 32px 0',
    textAlign: 'center' as const,
};

const villaCard = {
    marginBottom: '60px',
};

const villaImage = {
    borderRadius: '8px',
    objectFit: 'cover' as const,
    display: 'block',
    maxWidth: '100%',
};

const villaContent = {
    padding: '24px 0 0 0',
};

const villaTag = {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#A05C4D',
    letterSpacing: '1.5px',
    margin: '0 0 8px 0',
};

const villaTitle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1A3C34',
    margin: '0 0 4px 0',
};

const villaMeta = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#6B7280',
    margin: '0 0 16px 0',
    textTransform: 'uppercase' as const,
};

const villaDesc = {
    fontSize: '15px',
    lineHeight: '24px',
    color: '#4B5563',
    margin: '0 0 24px 0',
};

const ctaButton = {
    backgroundColor: '#1A3C34',
    color: '#F6F5F1',
    padding: '14px 28px',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '14px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block' as const,
};

const footer = {
    padding: '0 0 20px 0',
    textAlign: 'center' as const,
};

const footerTextBold = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1A3C34',
    margin: '0 0 4px 0',
};

const footerText = {
    fontSize: '14px',
    color: '#4B5563',
    margin: '0 0 4px 0',
};

const footerLink = {
    fontSize: '14px',
    margin: '0 0 12px 0',
};

const footerContact = {
    fontSize: '12px',
    color: '#9CA3AF',
    margin: '0',
};

const footerNote = {
    fontSize: '11px',
    lineHeight: '18px',
    color: '#9CA3AF',
    fontStyle: 'italic',
    margin: '0',
};
