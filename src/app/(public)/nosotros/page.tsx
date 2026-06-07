import { Metadata } from "next";
import Image from "next/image";
import {
  PageHeroSection,
  ValuesSection,
  FeatureListSection,
  MissionVisionSection,
} from "@/components/sections";
import {
  values,
  differentiators,
  brandValues,
  targetAudience,
} from "@/data/values";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Empresa especializada en fabricación, ejecución e instalación de soluciones a medida para proyectos residenciales y comerciales. Enfoque en cumplimiento técnico y eficiencia.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeroSection
        title="Sobre nosotros"
        highlightedText="nosotros"
        description="Somos una empresa especializada en la fabricación, ejecución e instalación de soluciones a medida para proyectos residenciales y comerciales. En aradiz convertimos las especificaciones técnicas de
                    nuestros clientes en resultados concretos. Nuestra
                    especialidad es la ejecución profesional — fabricamos e
                    instalamos con precisión, dentro de los plazos y estándares
                    acordados."
      />



      {/* Section 03 - Misión y Visión */}
      <MissionVisionSection />

      {/* Section 04 - Nuestros Valores */}
      <ValuesSection
        title="Nuestros valores"
        description="Principios que definen quiénes somos y cómo construimos cada proyecto."
        values={brandValues}
        className="py-16 md:py-24 bg-card"
      />

      {/* Section 05 - Cómo trabajamos (antes 'Nuestros Valores') */}
      <ValuesSection
        title="Cómo trabajamos"
        description="Principios que guian nuestra operacion diaria y garantizan la satisfaccion de nuestros clientes."
        values={values}
        className="py-16 md:py-24 bg-background"
      />

      {/* Section 06 - ¿Por qué elegirnos? */}
      <FeatureListSection
        title="¿Por qué elegirnos?"
        description="Características que nos diferencian en el mercado B2B"
        features={differentiators}
        className="py-16 md:py-24 bg-foreground"
        titleClassName="text-background"
        descriptionClassName="text-gray-400"
        itemClassName="text-gray-200"
      />

      {/* Section 07 - A quién servimos */}
      <ValuesSection
        title="Para Quiénes Trabajamos"
        description="Trabajamos con empresas y personas que exigen ejecucion de alto nivel."
        values={targetAudience}
        className="py-16 md:py-24 bg-card"
      />

    </>
  );
}
