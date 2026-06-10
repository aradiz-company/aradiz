import { NextResponse } from 'next/server';
import { sql, initDb } from '@/lib/db';
import { Resend } from 'resend';
import { createElement } from 'react';
import { AdminNotificationEmail } from '@/components/emails/admin-notification-email';
import { ClientAutoReplyEmail } from '@/components/emails/client-auto-reply-email';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(request: Request) {
    try {
        await initDb();

        const { name, email, company, phone, message, token } = await request.json();

        // 1. Validar campos requeridos
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Faltan campos requeridos (nombre, email, mensaje)' }, { status: 400 });
        }

        // 2. Validar Turnstile CAPTCHA
        const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
        if (turnstileSecret) {
            try {
                const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `secret=${encodeURIComponent(turnstileSecret)}&response=${encodeURIComponent(token || '')}`,
                });
                const verifyJson = await verifyRes.json();
                if (!verifyJson.success) {
                    return NextResponse.json({ error: 'Verificación de seguridad fallida. Por favor, intenta de nuevo.' }, { status: 400 });
                }
            } catch (err) {
                console.error('Error al verificar Turnstile:', err);
                // Si falla el fetch a Cloudflare, podemos dejar pasar o bloquear. En producción bloqueamos.
                return NextResponse.json({ error: 'No se pudo verificar el captcha.' }, { status: 500 });
            }
        } else {
            console.warn('TURNSTILE_SECRET_KEY no está configurado. Se omite la validación del captcha.');
        }

        // 3. Guardar en Postgres
        await sql`
            INSERT INTO leads (name, email, company, phone, message, status)
            VALUES (${name}, ${email}, ${company || ''}, ${phone || ''}, ${message}, 'nuevo')
        `;

        // 4. Enviar email de notificación con Resend
        const toEmail = process.env.RESEND_TO_EMAIL || process.env.ADMIN_EMAIL || 'admin@aradiz.com';
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

        try {
            // Alerta para el Administrador
            await resend.emails.send({
                from: `Aradiz Web <${fromEmail}>`,
                to: toEmail,
                replyTo: email,
                subject: `Nuevo mensaje de contacto: ${name}`,
                react: createElement(AdminNotificationEmail, { name, email, company, phone, message }),
            });

            // 5. Auto-respuesta para el Cliente (solo si no estamos usando el dominio sandbox de Resend)
            if (fromEmail !== 'onboarding@resend.dev') {
                await resend.emails.send({
                    from: `Aradiz <${fromEmail}>`,
                    to: email,
                    subject: 'Hemos recibido tu mensaje - Aradiz',
                    react: createElement(ClientAutoReplyEmail, { name }),
                });
            } else {
                console.info('Se omite el envío de la auto-respuesta al cliente debido al dominio sandbox de Resend (onboarding@resend.dev).');
            }
        } catch (emailErr) {
            console.error('Error al enviar los correos con Resend:', emailErr);
            // No fallamos la petición completa si falla el email, ya que el lead quedó registrado en la base de datos.
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API Contact error:', error);
        return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
    }
}
