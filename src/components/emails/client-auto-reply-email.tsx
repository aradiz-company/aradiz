import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Link,
  Hr,
} from '@react-email/components';

interface ClientAutoReplyEmailProps {
  name: string;
}
const baseUrl = 'https://aradiz.com';

export function ClientAutoReplyEmail({ name = "Usuario Prueba" }: ClientAutoReplyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Hemos recibido tu mensaje - aradiz</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src={`${baseUrl}/images/brand/logo-light.png`}
              width="180"
              alt="aradiz"
              style={logo}
            />
          </Section>

          {/* Content */}
          <Section style={content}>
            <Heading style={heading}>¡Hola, {name}! 👋</Heading>
            <Text style={paragraph}>
              Muchas gracias por ponerte en contacto con nosotros. Valoramos mucho tu interés en colaborar con <strong>aradiz</strong>.
            </Text>
            
            <Text style={paragraph}>
              Nuestro equipo ya está revisando tu solicitud y los detalles de tu proyecto. Nos pondremos en contacto contigo a la brevedad posible a través del correo electrónico o número telefónico que nos has proporcionado.
            </Text>
            
            <Text style={signature}>
              Saludos cordiales,<br />
              <span style={{ fontWeight: 'bold', color: '#00313c' }}>El equipo de aradiz</span>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Hr style={hr} />
            <Text style={footerLink}>
              <Link href="https://aradiz.com" style={link}>Visita nuestro sitio web: aradiz.com</Link>
            </Text>
            <Text style={footerText}>
              © {new Date().getFullYear()} aradiz. Todos los derechos reservados.<br />
              Este es un correo automático. Por favor, no respondas directamente a este mensaje.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f4f7f6',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  padding: '40px 0',
};

const container = {
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  maxWidth: '600px',
};

const header = {
  background: 'linear-gradient(135deg, #115e67 0%, #00313c 100%)',
  padding: '40px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
  display: 'block',
};

const content = {
  padding: '40px',
};

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.025em',
  color: '#00313c',
  marginTop: '0',
  marginBottom: '24px',
  fontWeight: '700',
  textAlign: 'center' as const,
};

const paragraph = {
  margin: '0 0 16px 0',
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#2d3748',
};

const signature = {
  marginTop: '32px',
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#718096',
};

const hr = {
  borderColor: '#edf2f7',
  margin: '0 0 24px 0',
};

const footer = {
  padding: '0 40px 30px',
  textAlign: 'center' as const,
};

const footerLink = {
  margin: '0 0 10px 0',
  fontSize: '14px',
  fontWeight: '500',
};

const link = {
  color: '#115e67',
  textDecoration: 'none',
};

const footerText = {
  margin: '0',
  fontSize: '12px',
  color: '#a0aec0',
  lineHeight: '1.5',
};

export default ClientAutoReplyEmail;
