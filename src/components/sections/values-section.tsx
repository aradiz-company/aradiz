"use client";

import { motion } from "framer-motion";
import { Target, Users, Award, TrendingUp, Crosshair, ShieldCheck, Sparkles, CheckSquare, Building2, Building, PencilRuler, Home, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Map of icon names to components for resolving string references
const iconMap: Record<string, LucideIcon> = {
    Target,
    Users,
    Award,
    TrendingUp,
    Crosshair,
    ShieldCheck,
    Sparkles,
    CheckSquare,
    Building2,
    Building,
    PencilRuler,
    Home,
};

export interface Value {
    icon: string; // Now a string that maps to an icon
    title: string;
    description: string;
}

interface ValuesSectionProps {
    title: string;
    description: string;
    values: Value[];
    className?: string;
}

export function ValuesSection({
    title,
    description,
    values,
    className = "py-16 bg-card",
}: ValuesSectionProps) {
    return (
        <section className={className}>
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {description}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => {
                        const Icon = iconMap[value.icon] || Target; // Fallback to Target
                        return (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Card className="border-border/50">
                                    <CardContent className="p-6">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <h3 className="font-semibold text-foreground mb-2">
                                            {value.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {value.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
