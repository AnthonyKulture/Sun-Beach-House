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
} from '@react-email/components';
import { Villa } from '@/types';
import * as React from 'react';

interface VillaSelectionEmailProps {
    message: string;
    villas: Villa[];
    baseUrl: string;
}

const getDescription = (desc: any) => {
    if (!desc) return '';
    if (typeof desc === 'string') return desc;
    return desc.fr || desc.en || '';
};

export const VillaSelectionEmail = ({
    message,
    villas = [],
    baseUrl = 'https://sun-beach-house.com',
}: VillaSelectionEmailProps) => {
    const previewText = `Votre sélection de villas par Sun-Beach-House`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Body style={main}>
                <Container style={container}>
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
                        <Text style={sectionTitle}>Notre Sélection Exclusive</Text>

                        {villas.map((villa) => {
                            const desc = getDescription(villa.description);
                            const villaUrl = `${baseUrl}/villas/${villa.id}`;

                            return (
                                <Section key={villa.id} style={villaCard}>
                                    {villa.mainImage && (
                                        <Img
                                            src={villa.mainImage}
                                            alt={villa.name}
                                            width="600"
                                            height="338"
                                            style={villaImage}
                                        />
                                    )}
                                    <div style={villaContent}>
                                        <Text style={villaTag}>
                                            {villa.listingType === 'sale' ? 'EN VENTE' : 'À LOUER'}
                                        </Text>
                                        <Text style={villaTitle}>{villa.name}</Text>
                                        <Text style={villaMeta}>
                                            {villa.location?.name} • {villa.bedrooms} chambres
                                        </Text>
                                        <Text style={villaDesc}>
                                            {desc}
                                        </Text>
                                        <Button href={villaUrl} style={ctaButton}>
                                            Découvrir cette propriété
                                        </Button>
                                    </div>
                                </Section>
                            );
                        })}
                    </Section>

                    {/* Signature */}
                    <Section style={{ padding: '20px 0', textAlign: 'left' }}>
                        <Img
                            src={`${baseUrl}/signature.png`}
                            alt="Signature Sun Beach House"
                            width="392"
                            style={{ maxWidth: '392px', height: 'auto', display: 'block', margin: '0' }}
                        />
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default VillaSelectionEmail;

// Styles for React Email
const main = {
    backgroundColor: '#ffffff',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px',
    maxWidth: '640px',
};

const header = {
    backgroundColor: '#0f172a',
    padding: '32px 20px',
    textAlign: 'center' as const,
    borderRadius: '8px 8px 0 0',
};

const logoText = {
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: 'bold',
    fontFamily: 'Georgia, serif',
    margin: '0',
};

const taglineText = {
    color: '#cbd5e1',
    fontSize: '12px',
    letterSpacing: '2px',
    margin: '8px 0 0 0',
};

const messageSection = {
    padding: '10px 0',
};

const paragraph = {
    fontSize: '16px',
    lineHeight: '26px',
    color: '#374151',
    whiteSpace: 'pre-wrap' as const,
};

const divider = {
    borderColor: '#e5e7eb',
    margin: '0',
};

const villasSection = {
    padding: '10px 0 20px',
};

const sectionTitle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#2D2D2D',
    marginTop: '32px',
    marginBottom: '24px',
};

const villaCard = {
    marginBottom: '40px',
    overflow: 'hidden',
};

const villaImage = {
    objectFit: 'cover' as const,
    display: 'block',
    maxWidth: '100%',
};

const villaContent = {
    padding: '24px 0',
};

const villaTag = {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#C3CBC4',
    letterSpacing: '1px',
    margin: '0 0 12px 0',
};

const villaTitle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2D2D2D',
    margin: '0 0 8px 0',
};

const villaMeta = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#A05C4D',
    margin: '0 0 16px 0',
    textTransform: 'uppercase' as const,
};

const villaDesc = {
    fontSize: '14px',
    lineHeight: '22px',
    color: '#6b7280',
    margin: '0 0 24px 0',
};

const ctaButton = {
    backgroundColor: '#1A3C34',
    color: '#F6F5F1',
    padding: '12px 24px',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '14px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block' as const,
};

const footer = {
    backgroundColor: '#f8fafc',
    padding: '32px',
    textAlign: 'center' as const,
    borderRadius: '0 0 8px 8px',
    border: '1px solid #e5e7eb',
    borderTop: 'none',
};

const footerTextBold = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#111827',
    margin: '0 0 4px 0',
};

const footerText = {
    fontSize: '12px',
    color: '#6b7280',
    margin: '0 0 16px 0',
};

const footerNote = {
    fontSize: '12px',
    color: '#9ca3af',
    margin: '0',
};
