import { sql, initDb } from '@/lib/db';
import type { Project } from '@/types/project';

/**
 * Fetches all projects from Vercel Postgres, ordered by the 'order' column
 * @returns Promise<Project[]> - Array of project objects
 */
export async function getProjects(): Promise<Project[]> {
    try {
        // Asegurar que las tablas estén inicializadas
        await initDb();

        const rows = await sql`
            SELECT id, title, category, location, year, image_url, description, featured, "order", created_at, updated_at
            FROM projects
            ORDER BY "order" ASC
        `;

        return rows.map(row => ({
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
    } catch (error) {
        console.error('Error fetching projects from Vercel Postgres:', error);
        throw new Error('Error al cargar los proyectos desde Postgres');
    }
}
