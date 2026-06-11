import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-server';
import { sql } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const { ids } = await request.json();

        if (!Array.isArray(ids)) {
            return NextResponse.json({ error: 'Formato de IDs no válido' }, { status: 400 });
        }

        // Ejecutar las actualizaciones de orden secuencialmente
        for (let i = 0; i < ids.length; i++) {
            const id = parseInt(ids[i], 10);
            if (isNaN(id)) continue;
            
            await sql`
                UPDATE projects
                SET "order" = ${i}
                WHERE id = ${id}
            `;
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API Projects Reorder error:', error);
        return NextResponse.json({ error: 'Error al reordenar proyectos' }, { status: 500 });
    }
}
