"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
  const title = "Ejecución profesional para proyectos que demandan excelencia";
  const parts = title.split(" ");

  return (
    <section id="about" className="w-full bg-background">
      <div className="w-full px-0">
        <div className="grid lg:grid-cols-5 min-h-[560px]">
          {/* Imagen - 40% */}
          <div className="lg:col-span-2 relative">
            <div className="relative h-full min-h-[320px] lg:min-h-full">
              <Image
                src="/images/about/about-work-team2.png"
                alt="Sobre aradiz"
                fill
                className="object-cover object-[70%]"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/6 to-black/10" />
            </div>
          </div>

          {/* Panel de contenido - 60% */}
          <div className="lg:col-span-3 flex items-center bg-foreground text-background">
            <div className="w-full flex flex-col justify-center p-8 py-12 md:p-12 lg:p-16 xl:p-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="max-w-3xl">
                  <span className="text-sm font-semibold uppercase tracking-wider text-accent mb-3 block">
                    Sobre Nosotros
                  </span>

                  <h2 className="text-3xl xl:text-4xl font-bold mb-6 leading-tight">
                    {parts.slice(0, parts.length - 1).join(" ")}{" "}
                    <span className="bg-primary text-white px-2">
                      {parts[parts.length - 1]}
                    </span>
                  </h2>

                  <div className="space-y-4 text-base xl:text-lg text-background leading-relaxed">
                    <p>
                      En aradiz convertimos las especificaciones técnicas de
                      nuestros clientes en resultados concretos. Nuestra
                      especialidad es la ejecución profesional — fabricamos e
                      instalamos con precisión, dentro de los plazos y
                      estándares acordados.
                    </p>
                    <p>
                      Nuestro enfoque está en la <strong>fabricación e
                      instalación</strong> de cortinas técnicas, mobiliario a
                      medida en melamina, sistemas de vidrio y otras soluciones
                      para proyectos corporativos y residenciales.
                    </p>
                    <p>
                      Entendemos las necesidades del mercado B2B y nos
                      posicionamos como un socio confiable para la ejecución
                      técnica de proyectos que demandan precisión,
                      profesionalismo y resultados garantizados.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
