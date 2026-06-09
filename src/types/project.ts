export interface Project {
    id: string;
    title: string;
    category: string;
    location: string;
    year: string;
    imageUrl: string; // Vercel Blob URL
    description: string;
    featured?: boolean; // Optional: highlight certain projects
    order?: number; // Optional: manual ordering
    createdAt: Date;
    updatedAt: Date;
}

export interface ProjectFormData {
    id?: string;
    title: string;
    description: string;
    category: string;
    location: string;
    year: string;
    image?: File | null;
    currentImageUrl?: string;
}
