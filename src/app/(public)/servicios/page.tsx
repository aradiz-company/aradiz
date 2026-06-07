import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { FancyButton } from "@/components/shared/buttons/fancy-button";
import { PageHeroSection, SplitSection } from "@/components/sections";
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
                    <SplitSection
                        key={service.id}
                        id={service.id}
                        title={service.title}
                        imageSrc={service.image}
                        imageAlt={service.title}
                        isReversed={!isEven}
                        priority={index === 0}
                    >
                        <p className={`text-base md:text-lg ${isEven ? "text-muted-background" : "text-muted-foreground"} max-w-2xl leading-relaxed`}>
                            {service.fullDescription}
                        </p>

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
                    </SplitSection>
                );
            })}

        </>
    );
}
