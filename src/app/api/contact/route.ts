import { NextResponse } from 'next/server';
import { sql, initDb } from '@/lib/db';
import { Resend } from 'resend';

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
                html: `
                    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                        <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 20px; border-radius: 8px 8px 0 0; text-align: center; color: #ffffff;">
                            <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.025em;">Nuevo Lead de Contacto</h1>
                            <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Recibido desde la web aradiz.com</p>
                        </div>
                        <div style="padding: 24px 20px;">
                            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 8px 0; font-weight: 600; color: #475569; width: 120px; font-size: 14px; border-b: 1px solid #f1f5f9;">Nombre:</td>
                                    <td style="padding: 8px 0; color: #0f172a; font-size: 14px; border-b: 1px solid #f1f5f9;">${name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: 600; color: #475569; font-size: 14px; border-b: 1px solid #f1f5f9;">Email:</td>
                                    <td style="padding: 8px 0; color: #0f172a; font-size: 14px; border-b: 1px solid #f1f5f9;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: 600; color: #475569; font-size: 14px; border-b: 1px solid #f1f5f9;">Teléfono:</td>
                                    <td style="padding: 8px 0; color: #0f172a; font-size: 14px; border-b: 1px solid #f1f5f9;">${phone || 'No especificado'}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: 600; color: #475569; font-size: 14px; border-b: 1px solid #f1f5f9;">Empresa:</td>
                                    <td style="padding: 8px 0; color: #0f172a; font-size: 14px; border-b: 1px solid #f1f5f9;">${company || 'No especificada'}</td>
                                </tr>
                            </table>
                            <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 0 8px 8px 0;">
                                <h3 style="margin-top: 0; margin-bottom: 8px; color: #1e293b; font-size: 14px; font-weight: 600;">Mensaje:</h3>
                                <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                            </div>
                        </div>
                        <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; text-align: center;">
                            <a href="https://aradiz.com/admin/leads" style="display: inline-block; background-color: #1e3a8a; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">Ver en el Panel de Control</a>
                        </div>
                    </div>
                `
            });

            // 5. Auto-respuesta para el Cliente (solo si no estamos usando el dominio sandbox de Resend)
            if (fromEmail !== 'onboarding@resend.dev') {
                await resend.emails.send({
                    from: `Aradiz <${fromEmail}>`,
                    to: email,
                    subject: 'Hemos recibido tu mensaje - Aradiz',
                    html: `
                        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; color: #334155; line-height: 1.6; border: 1px solid #e2e8f0; border-radius: 8px;">
                            <h2 style="color: #0f172a; margin-top: 0;">¡Hola ${name}! 👋</h2>
                            <p>Gracias por comunicarte con nosotros. Hemos recibido tu mensaje exitosamente.</p>
                            <p>Nuestro equipo revisará tu solicitud y nos pondremos en contacto contigo lo más pronto posible al correo o teléfono que nos proporcionaste.</p>
                            <br/>
                            <p style="margin-bottom: 5px;">Saludos cordiales,</p>
                            <p style="margin-top: 0; font-weight: bold; color: #1e3a8a;">El equipo de Aradiz</p>
                        </div>
                    `
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
