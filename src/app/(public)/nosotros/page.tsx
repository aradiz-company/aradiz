import { Metadata } from "next";
import Image from "next/image";
import {
  PageHeroSection,
  ValuesSection,
  FeatureListSection,
  CTASection,
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

      {/* Section 02 - Nuestra forma de trabajo */}
      <section className=" w-full">
        <div className="relative w-full">
          {/* Image Side - Takes left portion */}
          <div className="relative h-[750px] md:h-[700px] xl:h-[600px] w-full">
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-secondary/20 to-accent/20">
              <Image
                src="/images/about/about-us.jpg"
                alt="Equipo de aradiz trabajando en proyecto"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content Panel - Overlays on right side */}
            <div className="absolute top-0 right-0 w-full md:w-[75%] lg:w-[70%] xl:w-[60%] h-full bg-foreground text-background py-20 p-8 md:p-12 lg:p-16 flex flex-col justify-center md:translate-x-0">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Nuestra forma de{" "}
                  <span className="bg-primary text-white px-2 py-1">
                    trabajo
                  </span>
                </h2>

                <div className="space-y-4 text-base md:text-lg text-gray-300 leading-relaxed">
                  
                  <p>
                    Nuestro enfoque está en la{" "}
                    <strong className="text-white">
                      fabricación e instalación
                    </strong>{" "}
                    de cortinas técnicas, mobiliario a medida en melamina,
                    sistemas de vidrio y otras soluciones para proyectos
                    corporativos y residenciales.
                  </p>
                  <p>
                    Entendemos las necesidades del mercado B2B y nos
                    posicionamos como un socio confiable para la ejecución
                    técnica de proyectos que demandan precisión, profesionalismo
                    y resultados garantizados.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Section 08 - CTA Final */}
      <CTASection />
    </>
  );
}
