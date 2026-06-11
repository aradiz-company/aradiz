import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-server';

export async function GET() {
    try {
        const session = await getSession();

        if (!session) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        return NextResponse.json({
            authenticated: true,
            user: {
                email: session.email,
            },
        });
    } catch (error) {
        console.error('Check auth API error:', error);
        return NextResponse.json({ authenticated: false, error: 'Error interno del servidor.' }, { status: 500 });
    }
}
