import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-server';
import { sql, initDb } from '@/lib/db';
import { put, del } from '@vercel/blob';

// Ensure database is initialized
async function ensureDb() {
    await initDb();
}

// GET all projects ordered by order
export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        await ensureDb();

        const rows = await sql`
            SELECT id, title, category, location, year, image_url, description, featured, "order", created_at, updated_at
            FROM projects
            ORDER BY "order" ASC
        `;

        const projects = rows.map(row => ({
            id: String(row.id),
            title: row.title,
            category: row.category,
            location: row.location,
            year: row.year,
            imageUrl: row.image_url,
            description: row.description,
            featured: row.featured,
            order: row.order ?? 0,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        }));

        return NextResponse.json(projects);
    } catch (error) {
        console.error('API Projects GET error:', error);
        return NextResponse.json({ error: 'Error al obtener proyectos' }, { status: 500 });
    }
}

// POST create project
export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        await ensureDb();

        const formData = await request.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const category = formData.get('category') as string;
        const location = formData.get('location') as string;
        const year = formData.get('year') as string;
        const featured = formData.get('featured') === 'true';
        const imageFile = formData.get('image') as File | null;

        if (!title || !description || !category || !location || !year) {
            return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
        }

        let imageUrl = '';
        if (imageFile && imageFile.size > 0) {
            const filename = `projects/${Date.now()}_${imageFile.name}`;
            const blob = await put(filename, imageFile, { access: 'public' });
            imageUrl = blob.url;
        }

        // Get current max order
        const countRes = await sql`SELECT COALESCE(MAX("order"), -1) as max_order FROM projects`;
        const nextOrder = (countRes[0]?.max_order ?? -1) + 1;

        const result = await sql`
            INSERT INTO projects (title, category, location, year, image_url, description, featured, "order")
            VALUES (${title}, ${category}, ${location}, ${year}, ${imageUrl}, ${description}, ${featured}, ${nextOrder})
            RETURNING id
        `;

        return NextResponse.json({ success: true, id: result[0]?.id });
    } catch (error) {
        console.error('API Projects POST error:', error);
        return NextResponse.json({ error: 'Error al crear proyecto' }, { status: 500 });
    }
}

// PUT update project
export async function PUT(request: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        await ensureDb();

        const formData = await request.formData();
        const id = formData.get('id') as string;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const category = formData.get('category') as string;
        const location = formData.get('location') as string;
        const year = formData.get('year') as string;
        const featured = formData.get('featured') === 'true';
        const imageFile = formData.get('image') as File | null;
        const currentImageUrl = formData.get('currentImageUrl') as string || '';

        if (!id || !title || !description || !category || !location || !year) {
            return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
        }

        let imageUrl = currentImageUrl;

        // If new image file is uploaded
        if (imageFile && imageFile.size > 0) {
            // Delete old image if it is a Vercel Blob URL
            if (currentImageUrl && currentImageUrl.includes('public.blob.vercel-storage.com')) {
                try {
                    await del(currentImageUrl);
                } catch (err) {
                    console.warn('Could not delete old Vercel Blob image:', err);
                }
            }

            const filename = `projects/${Date.now()}_${imageFile.name}`;
            const blob = await put(filename, imageFile, { access: 'public' });
            imageUrl = blob.url;
        }

        await sql`
            UPDATE projects
            SET title = ${title},
                description = ${description},
                category = ${category},
                location = ${location},
                year = ${year},
                image_url = ${imageUrl},
                featured = ${featured},
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ${parseInt(id, 10)}
        `;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API Projects PUT error:', error);
        return NextResponse.json({ error: 'Error al actualizar proyecto' }, { status: 500 });
    }
}

// DELETE project
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
            return NextResponse.json({ error: 'Falta el id del proyecto' }, { status: 400 });
        }

        // Get project image url first to delete it
        const projectRes = await sql`SELECT image_url FROM projects WHERE id = ${parseInt(id, 10)}`;
        if (projectRes.length > 0) {
            const imageUrl = projectRes[0].image_url;
            if (imageUrl && imageUrl.includes('public.blob.vercel-storage.com')) {
                try {
                    await del(imageUrl);
                } catch (err) {
                    console.warn('Could not delete Vercel Blob image:', err);
                }
            }
        }

        await sql`DELETE FROM projects WHERE id = ${parseInt(id, 10)}`;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API Projects DELETE error:', error);
        return NextResponse.json({ error: 'Error al eliminar proyecto' }, { status: 500 });
    }
}
