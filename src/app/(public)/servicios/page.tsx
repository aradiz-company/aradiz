import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { FancyButton } from "@/components/shared/buttons/fancy-button";
import { PageHeroSection } from "@/components/sections";
import { services } from "@/data/services";

export const metadata: Metadata = {
    title: "Servicios",
    description: "Servicios profesionales de cortinas técnicas, mobiliario a medida, sistemas de vidrio e instalación para proyectos corporativos.",
};

export default function ServicesPage() {
    return (
        <>
            <PageHeroSection
                title="Servicios profesionales para proyectos de interior y obra"
                highlightedText="interior y obra"
                description="Ofrecemos servicios especializados con enfoque en ejecución, precisión y cumplimiento técnico para proyectos corporativos."
            />

            {/* Services Details */}
            {services.map((service, index) => {
                const isEven = index % 2 === 0;

                return (
                    <section
                        key={service.id}
                        id={service.id}
                        className={isEven ? "bg-background" : "bg-card"}
                    >
                        <div className="w-full px-0">
                            <div className="grid lg:grid-cols-5 min-h-[600px]">
                                {/* Image Section - 40% */}
                                <div className={`lg:col-span-2 relative ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                                    <div className="relative h-full min-h-[400px] lg:min-h-full">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 40vw"
                                            priority={index === 0}
                                        />
                                    </div>
                                </div>

                                {/* Content Panel - 60% */}
                                <div className={`lg:col-span-3 ${isEven ? "bg-foreground text-background lg:order-2" : "bg-background text-foreground lg:order-1"}`}>
                                    <div className="h-full flex flex-col gap-8 justify-between p-8 py-12 md:p-12 lg:p-16">
                                        {/* Top Content */}
                                        <div>
                                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                                {service.title.split(' ').map((word, idx, arr) => (
                                                    idx === arr.length - 1 ? (
                                                        <span key={idx} className="text-background bg-primary inline-block p-2">{word}</span>
                                                    ) : (
                                                        <span key={idx}>{word} </span>
                                                    )
                                                ))}
                                            </h2>
                                            <p className={`text-base md:text-lg ${isEven ? "text-muted-background" : "text-muted-foreground"} max-w-2xl leading-relaxed`}>
                                                {service.fullDescription}
                                            </p>
                                        </div>

                                        {/* Icons flex wrap */}
                                        <div className="flex flex-wrap gap-6">
                                            {service.features.map((feature) => (
                                                <div key={feature} className="group flex items-center gap-3">
                                                    <CheckCircle className={`w-6 h-6 ${isEven ? "text-accent" : "text-primary"}`} />
                                                    <span className={`text-sm text-center ${isEven ? "text-muted-background" : "text-muted-foreground"} line-clamp-2`}>{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA Button */}
                                        <div>
                                            <FancyButton asChild variant={isEven ? "light" : "primary"} showKeys={false}>
                                                <Link href="/contacto">Consultar sobre este servicio</Link>
                                            </FancyButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                );
            })}

        </>
    );
}
