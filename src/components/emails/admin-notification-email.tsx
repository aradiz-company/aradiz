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
  Row,
  Column,
} from '@react-email/components';

interface AdminNotificationEmailProps {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}
const baseUrl = 'https://aradiz.com';

export function AdminNotificationEmail({
  name = "Usuario Prueba",
  email = "prueba@ejemplo.com",
  company = "Empresa Ejemplo",
  phone = "+1 234 567 8900",
  message = "Este es un mensaje de prueba para ver cómo se visualiza el diseño del correo de notificación del administrador. Aquí puedes revisar el formato de los textos y colores.",
}: AdminNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nuevo Lead de Contacto de {name} - aradiz</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src={`${baseUrl}/images/brand/logo-light.png`}
              width="150"
              alt="aradiz"
              style={logo}
            />
          </Section>

          {/* Content */}
          <Section style={content}>
            <Heading style={heading}>Nuevo Lead de Contacto</Heading>
            <Text style={paragraph}>
              Hola Administrador, has recibido un nuevo mensaje a través del formulario de contacto en <strong>aradiz</strong>:
            </Text>
            
            <Section style={dataSection}>
              <Row>
                <Column style={dataLabel}>Nombre:</Column>
                <Column style={dataValue}>{name}</Column>
              </Row>
              <Row>
                <Column style={dataLabel}>Email:</Column>
                <Column style={dataValue}>
                  <Link href={`mailto:${email}`} style={link}>{email}</Link>
                </Column>
              </Row>
              {phone && (
                <Row>
                  <Column style={dataLabel}>Teléfono:</Column>
                  <Column style={dataValue}>{phone}</Column>
                </Row>
              )}
              {company && (
                <Row>
                  <Column style={{...dataLabel, borderBottom: 'none'}}>Empresa:</Column>
                  <Column style={{...dataValue, borderBottom: 'none'}}>{company}</Column>
                </Row>
              )}
            </Section>

            <Section style={messageContainer}>
              <Text style={messageLabel}>Mensaje:</Text>
              <Text style={messageText}>{message}</Text>
            </Section>

            <Section style={buttonContainer}>
              <Link href="https://aradiz.com/admin/leads" style={button}>
                Ver en el Panel de Control
              </Link>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Este correo fue enviado de forma automática desde aradiz.com
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
  background: 'linear-gradient(135deg, #00313c 0%, #115e67 100%)',
  padding: '30px 40px',
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
  fontSize: '22px',
  letterSpacing: '-0.025em',
  color: '#00313c',
  marginTop: '0',
  marginBottom: '24px',
  fontWeight: '700',
  textAlign: 'center' as const,
};

const paragraph = {
  margin: '0 0 24px 0',
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#4a5568',
};

const dataSection = {
  marginBottom: '32px',
  width: '100%',
};

const dataLabel = {
  width: '120px',
  fontWeight: '600',
  color: '#00313c',
  fontSize: '14px',
  padding: '12px 0',
  borderBottom: '1px solid #e2e8f0',
};

const dataValue = {
  color: '#202020',
  fontSize: '14px',
  padding: '12px 0',
  borderBottom: '1px solid #e2e8f0',
};

const link = {
  color: '#115e67',
  textDecoration: 'none',
  fontWeight: '500',
};

const messageContainer = {
  backgroundColor: '#f7fafc',
  borderLeft: '4px solid #115e67',
  padding: '20px',
  borderRadius: '0 8px 8px 0',
  marginBottom: '32px',
};

const messageLabel = {
  margin: '0 0 8px 0',
  color: '#00313c',
  fontSize: '14px',
  fontWeight: '600',
};

const messageText = {
  margin: '0',
  color: '#2d3748',
  fontSize: '14.5px',
  lineHeight: '1.6',
  whiteSpace: 'pre-wrap' as const,
};

const buttonContainer = {
  textAlign: 'center' as const,
};

const button = {
  display: 'inline-block',
  backgroundColor: '#115e67',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '6px',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '14px',
  boxShadow: '0 2px 4px rgba(17, 94, 103, 0.2)',
};

const footer = {
  backgroundColor: '#f7fafc',
  padding: '20px 40px',
  textAlign: 'center' as const,
  borderTop: '1px solid #edf2f7',
};

const footerText = {
  margin: '0',
  fontSize: '12px',
  color: '#a0aec0',
};

export default AdminNotificationEmail;
