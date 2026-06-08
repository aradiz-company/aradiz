"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface FeatureListSectionProps {
    title: string;
    description: string;
    features: string[];
    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    itemClassName?: string;
}

export function FeatureListSection({
    title,
    description,
    features,
    className = "py-16",
    titleClassName = "text-foreground",
    descriptionClassName = "text-muted-foreground",
    itemClassName = "text-foreground",
}: FeatureListSectionProps) {
    return (
        <section className={className}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${titleClassName}`}>
                            {title}
                        </h2>
                        <p className={`text-lg ${descriptionClassName}`}>
                            {description}
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {features.map((item, index) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="flex items-start gap-3 p-4 rounded-lg bg-card/50 backdrop-blur-xs border border-border/20"
                            >
                                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                <p className={itemClassName}>{item}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
