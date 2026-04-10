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
} from '@react-email/components';
import * as React from 'react';

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
  type?: string;
}

export const ContactEmail = ({
  name,
  email,
  message,
  type = 'Demande de contact générale',
}: ContactEmailProps) => (
  <Html>
    <Head />
    <Preview>Nouveau message de {name} sur Sun Beach House</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Nouveau Message - Sun Beach House</Heading>
        <Text style={subheading}>{type}</Text>
        <Hr style={hr} />
        <Section>
          <Text style={label}>De:</Text>
          <Text style={value}>{name} ({email})</Text>
          
          <Text style={label}>Message:</Text>
          <Text style={messageText}>{message}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          Ce message a été envoyé depuis le formulaire de contact de Sun-Beach-House.com
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ContactEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
};

const subheading = {
  color: '#666',
  fontSize: '14px',
  textAlign: 'center' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const label = {
  color: '#8898aa',
  fontSize: '12px',
  fontWeight: 'bold',
  textTransform: 'uppercase' as const,
  padding: '0 48px',
};

const value = {
  color: '#333',
  fontSize: '16px',
  padding: '0 48px',
  marginBottom: '24px',
};

const messageText = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '1.6',
  padding: '24px 48px',
  backgroundColor: '#f9f9f9',
  borderRadius: '4px',
  margin: '0 48px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  textAlign: 'center' as const,
  marginTop: '48px',
};
