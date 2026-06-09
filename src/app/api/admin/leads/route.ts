import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-server';
import { sql, initDb } from '@/lib/db';

async function ensureDb() {
    await initDb();
}

// GET all leads
export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        await ensureDb();

        const rows = await sql`
            SELECT id, name, email, company, phone, message, status, created_at, updated_at
            FROM leads
            ORDER BY created_at DESC
        `;

        const leads = rows.map(row => ({
            id: String(row.id),
            name: row.name,
            email: row.email,
            company: row.company || '',
            phone: row.phone || '',
            message: row.message || '',
            status: row.status,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        }));

        return NextResponse.json(leads);
    } catch (error) {
        console.error('API Leads GET error:', error);
        return NextResponse.json({ error: 'Error al obtener leads' }, { status: 500 });
    }
}

// PUT update lead status
export async function PUT(request: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        await ensureDb();

        const { id, status } = await request.json();

        if (!id || !status) {
            return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
        }

        await sql`
            UPDATE leads
            SET status = ${status},
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ${parseInt(id, 10)}
        `;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API Leads PUT error:', error);
        return NextResponse.json({ error: 'Error al actualizar lead' }, { status: 500 });
    }
}

// DELETE lead
export async function DELETE(request: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        await ensureDb();

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Falta el id del lead' }, { status: 400 });
        }

        await sql`DELETE FROM leads WHERE id = ${parseInt(id, 10)}`;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API Leads DELETE error:', error);
        return NextResponse.json({ error: 'Error al eliminar lead' }, { status: 500 });
    }
}
