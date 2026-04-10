import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
    Img,
} from '@react-email/components';
import * as React from 'react';

interface SalesInquiryEmailProps {
    villaName: string;
    villaImage?: string;
    location: string;
    price: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    message?: string;
}

export const SalesInquiryEmail = ({
    villaName,
    villaImage,
    location,
    price,
    customerName,
    customerEmail,
    customerPhone,
    message,
}: SalesInquiryEmailProps) => (
    <Html>
        <Head />
        <Preview>Nouvelle demande d&apos;information immobilière pour {villaName}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>Opportunité Immobilière</Heading>
                <Text style={subheading}>Vente de prestige à St. Barth</Text>
                
                {villaImage && (
                    <Section style={imageSection}>
                        <Img
                            src={villaImage}
                            alt={villaName}
                            width="560"
                            style={image}
                        />
                    </Section>
                )}

                <Section style={content}>
                    <Heading as="h2" style={h2}>{villaName}</Heading>
                    <Text style={locationText}>{location}</Text>
                    <Text style={priceText}>Prix de vente: {price}</Text>
                    
                    <Hr style={hr} />

                    <Section>
                        <Heading as="h3" style={h3}>Coordonnées Client</Heading>
                        <Text style={label}>Nom de l&apos;intérêt</Text>
                        <Text style={value}>{customerName}</Text>
                        
                        <Text style={label}>Email</Text>
                        <Text style={value}>{customerEmail}</Text>
                        
                        <Text style={label}>Téléphone</Text>
                        <Text style={value}>{customerPhone}</Text>

                        {message && (
                            <>
                                <Text style={label}>Message du Client</Text>
                                <Text style={messageTextArea}>{message}</Text>
                            </>
                        )}
                    </Section>
                </Section>

                <Hr style={hr} />
                <Text style={footer}>
                    Sun Beach House - Ventes Immobilières d&apos;Exception
                </Text>
            </Container>
        </Body>
    </Html>
);

export default SalesInquiryEmail;

const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: 'Playfair Display, serif, -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '0 0 40px',
    marginBottom: '64px',
    maxWidth: '600px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

const h1 = {
    color: '#1a3a3a',
    fontSize: '26px',
    fontWeight: 'normal',
    textAlign: 'center' as const,
    margin: '30px 0 5px',
    fontStyle: 'italic',
};

const h2 = {
    color: '#1a3a3a',
    fontSize: '22px',
    margin: '0',
    fontWeight: 'normal',
};

const h3 = {
    color: '#1a3a3a',
    fontSize: '13px',
    textTransform: 'uppercase' as const,
    letterSpacing: '1.5px',
    margin: '25px 0 10px',
    borderBottom: '1px solid #f0f0f0',
    paddingBottom: '5px',
};

const subheading = {
    color: '#c29b7a',
    fontSize: '11px',
    textAlign: 'center' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: '4px',
    marginBottom: '35px',
};

const imageSection = {
    padding: '0',
};

const image = {
    borderRadius: '0',
    objectFit: 'cover' as const,
};

const content = {
    padding: '40px',
};

const locationText = {
    color: '#718096',
    fontSize: '13px',
    textTransform: 'uppercase' as const,
    letterSpacing: '1.5px',
    margin: '10px 0 5px',
};

const priceText = {
    color: '#1a3a3a',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '5px 0 0',
};

const hr = {
    borderColor: '#edf2f7',
    margin: '35px 0',
};

const label = {
    color: '#a0aec0',
    fontSize: '11px',
    fontWeight: 'bold',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    marginBottom: '4px',
};

const value = {
    color: '#2d3748',
    fontSize: '15px',
    marginBottom: '20px',
    marginTop: '0',
};

const messageTextArea = {
    color: '#4a5568',
    fontSize: '15px',
    lineHeight: '1.7',
    padding: '25px',
    backgroundColor: '#f8fafc',
    borderRadius: '4px',
    border: '1px solid #edf2f7',
    whiteSpace: 'pre-wrap' as const,
};

const footer = {
    color: '#a0aec0',
    fontSize: '11px',
    textAlign: 'center' as const,
    marginTop: '30px',
};
