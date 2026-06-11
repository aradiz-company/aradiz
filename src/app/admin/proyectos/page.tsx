'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Loader2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { ProjectCard } from '@/components/admin/ProjectCard';
import { ProjectDialog } from '@/components/admin/ProjectDialog';
import type { Project } from '@/types/project';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// dnd-kit imports
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable wrapper for ProjectCard
function SortableProjectCard({
    project,
    onEdit,
    onDelete,
}: {
    project: Project;
    onEdit: (project: Project) => void;
    onDelete: (project: Project) => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: project.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <ProjectCard
            ref={setNodeRef}
            style={style}
            project={project}
            onEdit={onEdit}
            onDelete={onDelete}
            dragHandleProps={{ ...attributes, ...listeners }}
            isDragging={isDragging}
        />
    );
}

export default function ProyectosPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
    const [submitting, setSubmitting] = useState(false);

    // dnd-kit sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Fetch projects ordered by 'order' field
    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/admin/projects');
            if (!res.ok) throw new Error('Error al obtener proyectos');
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // Handle drag end - save new order to Postgres
    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = projects.findIndex((p) => p.id === active.id);
            const newIndex = projects.findIndex((p) => p.id === over.id);

            const newProjects = arrayMove(projects, oldIndex, newIndex);
            setProjects(newProjects);

            try {
                const res = await fetch('/api/admin/projects/reorder', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ids: newProjects.map(p => p.id) }),
                });
                if (!res.ok) throw new Error('Error al guardar el nuevo orden');
            } catch (error) {
                console.error('Error updating order:', error);
                // Revert on error
                fetchProjects();
            }
        }
    };

    // Handle create/edit
    const handleSubmit = async (formData: FormData) => {
        setSubmitting(true);
        try {
            const id = formData.get('id') as string | null;
            const method = id ? 'PUT' : 'POST';

            const res = await fetch('/api/admin/projects', {
                method,
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Error al guardar el proyecto');
            }

            await fetchProjects();
            setDialogOpen(false);
            setSelectedProject(null);
        } catch (error: any) {
            console.error('Error saving project:', error);
            alert(error.message || 'Error al guardar el proyecto');
        } finally {
            setSubmitting(false);
        }
    };

    // Handle delete
    const handleDelete = async () => {
        if (!projectToDelete) return;

        setSubmitting(true);
        try {
            const res = await fetch(`/api/admin/projects?id=${projectToDelete.id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Error al eliminar el proyecto');
            }

            await fetchProjects();
            setDeleteDialogOpen(false);
            setProjectToDelete(null);
        } catch (error: any) {
            console.error('Error deleting project:', error);
            alert(error.message || 'Error al eliminar el proyecto');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (project: Project) => {
        setSelectedProject(project);
        setDialogOpen(true);
    };

    const handleDeleteClick = (project: Project) => {
        setProjectToDelete(project);
        setDeleteDialogOpen(true);
    };

    const handleCreate = () => {
        setSelectedProject(null);
        setDialogOpen(true);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Gestión de Proyectos</h1>
                    <p className="text-muted-foreground mt-1">
                        {projects.length} proyecto{projects.length !== 1 ? 's' : ''} en total
                        <span className="ml-2 text-xs">(Arrastra para reordenar)</span>
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" asChild>
                        <Link href="/proyectos" target="_blank">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Ver Vista Pública
                        </Link>
                    </Button>
                    <Button onClick={handleCreate}>
                        <Plus className="w-4 h-4 mr-2" />
                        Nuevo Proyecto
                    </Button>
                </div>
            </div>

            {projects.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground mb-4">No hay proyectos aún</p>
                    <Button onClick={handleCreate}>
                        <Plus className="w-4 h-4 mr-2" />
                        Crear Primer Proyecto
                    </Button>
                </div>
            ) : (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={projects.map((p) => p.id)}
                        strategy={rectSortingStrategy}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <SortableProjectCard
                                    key={project.id}
                                    project={project}
                                    onEdit={handleEdit}
                                    onDelete={handleDeleteClick}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            )}

            <ProjectDialog
                key={selectedProject ? `edit-${selectedProject.id}` : 'create'}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSubmit={handleSubmit}
                project={selectedProject}
                loading={submitting}
            />

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. El proyecto &quot;{projectToDelete?.title}&quot; será eliminado permanentemente.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={submitting}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={submitting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Eliminando...
                                </>
                            ) : (
                                'Eliminar'
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
