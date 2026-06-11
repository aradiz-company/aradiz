import { NextResponse } from 'next/server';
import { signJWT } from '@/lib/auth-server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            return NextResponse.json(
                { error: 'Las credenciales de administración de variables de entorno no están configuradas.' },
                { status: 500 }
            );
        }

        if (email === adminEmail && password === adminPassword) {
            const token = await signJWT({ email, role: 'admin' });
            const cookieStore = await cookies();
            cookieStore.set('admin_session', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 2, // 2 horas
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { error: 'Email o contraseña incorrectos.' },
            { status: 401 }
        );
    } catch (error) {
        console.error('Login API error:', error);
        return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
    }
}
