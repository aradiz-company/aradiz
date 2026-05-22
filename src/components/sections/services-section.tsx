"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Armchair, Blinds, PanelTop, Wrench, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/data/services";

// Map of icon names to components for resolving string references
const iconMap: Record<string, LucideIcon> = {
    Armchair,
    Blinds,
    PanelTop,
    Wrench,
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export function ServicesSection() {
    return (
        <section className="py-20 md:py-28 bg-card">
            <div className="container mx-auto px-4 md:px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-semibold uppercase tracking-wider text-primary mb-3 block">
                        Nuestros Servicios
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Soluciones integrales para cada proyecto
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Ofrecemos servicios especializados con enfoque en ejecución,
                        precisión y cumplimiento técnico para proyectos corporativos y residenciales.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {services.map((service) => {
                        const Icon = iconMap[service.icon] || Armchair; // Fallback
                        return (
                            <motion.div key={service.id} variants={itemVariants}>
                                <Link href={`/servicios#${service.id}`}>
                                    <Card className="h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50">
                                        <CardContent className="p-6">
                                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                                                <Icon className="w-7 h-7 text-primary" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                                {service.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {service.description}
                                            </p>
                                            <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                                Ver más
                                                <ArrowRight className="ml-1 h-4 w-4" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
