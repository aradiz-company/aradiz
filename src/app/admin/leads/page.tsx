'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Mail, Phone, Building2, Trash2, CheckCircle2, Inbox } from 'lucide-react';
import type { Lead } from '@/types/lead';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
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

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const fetchLeads = async () => {
        try {
            const res = await fetch('/api/admin/leads');
            if (!res.ok) throw new Error('Error al obtener leads');
            const data = await res.json();
            const leadsData = data.map((lead: any) => ({
                ...lead,
                createdAt: new Date(lead.createdAt),
                updatedAt: new Date(lead.updatedAt),
            })) as Lead[];
            setLeads(leadsData);
        } catch (error) {
            console.error('Error fetching leads:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const updateStatus = async (id: string, newStatus: Lead['status']) => {
        try {
            const res = await fetch('/api/admin/leads', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, status: newStatus }),
            });
            if (!res.ok) throw new Error('Error al actualizar estado');
            setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
        } catch (error) {
            console.error('Error updating lead status:', error);
        }
    };

    const handleDelete = async () => {
        if (!leadToDelete) return;
        setSubmitting(true);
        try {
            const res = await fetch(`/api/admin/leads?id=${leadToDelete.id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Error al eliminar lead');
            setLeads(leads.filter(lead => lead.id !== leadToDelete.id));
            setDeleteDialogOpen(false);
            setLeadToDelete(null);
        } catch (error) {
            console.error('Error deleting lead:', error);
            alert('Error al eliminar el lead');
        } finally {
            setSubmitting(false);
        }
    };

    const getStatusBadge = (status: Lead['status']) => {
        switch (status) {
            case 'nuevo':
                return <Badge className="bg-blue-500 hover:bg-blue-600">Nuevo</Badge>;
            case 'leído':
                return <Badge variant="secondary">Leído</Badge>;
            case 'respondido':
                return <Badge className="bg-green-500 hover:bg-green-600">Respondido</Badge>;
            case 'archivado':
                return <Badge variant="outline">Archivado</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Leads de Contacto</h1>
                    <p className="text-muted-foreground mt-1">
                        {leads.length} mensaje{leads.length !== 1 ? 's' : ''} recibidos
                    </p>
                </div>
            </div>

            {leads.length === 0 ? (
                <Card className="border-2 border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Inbox className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No hay leads registrados aún</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {leads.map((lead) => (
                        <Card key={lead.id} className={lead.status === 'nuevo' ? 'border-primary/20 bg-primary/2' : ''}>
                            <CardHeader className="pb-2">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-semibold">{lead.name}</h3>
                                            {getStatusBadge(lead.status)}
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {format(lead.createdAt as Date, "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {lead.status === 'nuevo' ? (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => updateStatus(lead.id, 'leído')}
                                                className="hidden sm:flex"
                                            >
                                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                                Marcar leído
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => updateStatus(lead.id, 'nuevo')}
                                                className="hidden sm:flex text-muted-foreground"
                                            >
                                                <Inbox className="w-4 h-4 mr-2" />
                                                Marcar no leído
                                            </Button>
                                        )}
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="text-muted-foreground hover:text-destructive"
                                            onClick={() => {
                                                setLeadToDelete(lead);
                                                setDeleteDialogOpen(true);
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid md:grid-cols-3 gap-4 py-2 border-y border-border/50">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Mail className="w-4 h-4 text-muted-foreground" />
                                        <a href={`mailto:${lead.email}`} className="hover:underline text-primary">
                                            {lead.email}
                                        </a>
                                    </div>
                                    {lead.phone && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Phone className="w-4 h-4 text-muted-foreground" />
                                            <a href={`tel:${lead.phone}`} className="hover:underline">
                                                {lead.phone}
                                            </a>
                                        </div>
                                    )}
                                    {lead.company && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Building2 className="w-4 h-4 text-muted-foreground" />
                                            <span>{lead.company}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="bg-muted/50 p-4 rounded-lg">
                                    <p className="text-sm whitespace-pre-wrap">{lead.message}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar este lead?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción eliminará permanentemente la información de contacto de &quot;{leadToDelete?.name}&quot;.
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
