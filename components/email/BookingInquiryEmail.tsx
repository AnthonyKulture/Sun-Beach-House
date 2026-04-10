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

interface BookingInquiryEmailProps {
    villaName: string;
    villaImage?: string;
    location: string;
    arrival: string;
    departure: string;
    guests: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    message?: string;
}

export const BookingInquiryEmail = ({
    villaName,
    villaImage,
    location,
    arrival,
    departure,
    guests,
    customerName,
    customerEmail,
    customerPhone,
    message,
}: BookingInquiryEmailProps) => (
    <Html>
        <Head />
        <Preview>Nouvelle demande de réservation pour {villaName}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>Demande de Réservation</Heading>
                <Text style={subheading}>Hébergement de luxe à St. Barth</Text>
                
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
                    
                    <Hr style={hr} />

                    <Section style={grid}>
                        <div style={column}>
                            <Text style={label}>Arrivée</Text>
                            <Text style={largeValue}>{arrival}</Text>
                        </div>
                        <div style={column}>
                            <Text style={label}>Départ</Text>
                            <Text style={largeValue}>{departure}</Text>
                        </div>
                    </Section>

                    <Section>
                        <Text style={label}>Voyageurs</Text>
                        <Text style={value}>{guests} invités</Text>
                    </Section>

                    <Hr style={hr} />

                    <Section>
                        <Heading as="h3" style={h3}>Coordonnées Client</Heading>
                        <Text style={label}>Nom</Text>
                        <Text style={value}>{customerName}</Text>
                        
                        <Text style={label}>Email</Text>
                        <Text style={value}>{customerEmail}</Text>
                        
                        <Text style={label}>Téléphone</Text>
                        <Text style={value}>{customerPhone}</Text>

                        {message && (
                            <>
                                <Text style={label}>Demandes Spéciales</Text>
                                <Text style={messageTextArea}>{message}</Text>
                            </>
                        )}
                    </Section>
                </Section>

                <Hr style={hr} />
                <Text style={footer}>
                    Sun Beach House - Conciergerie de Prestige à Saint-Barthélemy
                </Text>
            </Container>
        </Body>
    </Html>
);

export default BookingInquiryEmail;

const main = {
    backgroundColor: '#f4f7f6',
    fontFamily: 'Playfair Display, serif, -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '0 0 40px',
    marginBottom: '64px',
    maxWidth: '600px',
    border: '1px solid #e0e0e0',
};

const h1 = {
    color: '#0a2540',
    fontSize: '28px',
    fontWeight: 'normal',
    textAlign: 'center' as const,
    margin: '30px 0 10px',
    fontStyle: 'italic',
};

const h2 = {
    color: '#1a3a3a',
    fontSize: '24px',
    margin: '0',
    fontWeight: 'normal',
};

const h3 = {
    color: '#1a3a3a',
    fontSize: '14px',
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    margin: '20px 0 10px',
};

const subheading = {
    color: '#c29b7a',
    fontSize: '12px',
    textAlign: 'center' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: '3px',
    marginBottom: '30px',
};

const imageSection = {
    padding: '0',
};

const image = {
    borderRadius: '0',
    objectFit: 'cover' as const,
};

const content = {
    padding: '30px 40px',
};

const locationText = {
    color: '#888',
    fontSize: '12px',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    margin: '5px 0 0',
};

const hr = {
    borderColor: '#eee',
    margin: '30px 0',
};

const grid = {
    display: 'flex',
    marginBottom: '20px',
};

const column = {
    width: '50%',
};

const label = {
    color: '#999',
    fontSize: '10px',
    fontWeight: 'bold',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    marginBottom: '4px',
};

const largeValue = {
    color: '#1a3a3a',
    fontSize: '16px',
    margin: '0',
};

const value = {
    color: '#333',
    fontSize: '14px',
    marginBottom: '15px',
    marginTop: '0',
};

const messageTextArea = {
    color: '#333',
    fontSize: '14px',
    lineHeight: '1.6',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '2px',
    fontStyle: 'italic',
};

const footer = {
    color: '#aaa',
    fontSize: '11px',
    textAlign: 'center' as const,
    marginTop: '20px',
    padding: '0 40px',
};
