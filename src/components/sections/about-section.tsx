"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
  return (
    <section className="w-full">
      <div className="relative w-full">
        {/* Image Side - Takes full width */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-secondary/10 to-accent/20">
          <Image
            src="/images/home/about-team-home.jpg"
            alt="Sobre aradiz"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-foreground/80" />
        </div>
        <div className="container mx-auto px-4 md:px-6">
          {/* Content Panel - Overlays on right side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full lg:w-[80%] xl:w-[60%] ml-auto top-9 h-full bg-background p-8 md:p-12 lg:p-16 shadow-2xl z-10"
          >
            <div className="max-w-3xl">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary mb-3 block">
                Sobre Nosotros
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-foreground">
                Ejecución profesional para proyectos que demandan{" "}
                <span className="bg-primary text-white px-2">excelencia</span>
              </h2>

              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                    En aradiz convertimos las especificaciones técnicas de
                    nuestros clientes en resultados concretos. Nuestra
                    especialidad es la ejecución profesional — fabricamos e
                    instalamos con precisión, dentro de los plazos y estándares
                    acordados.
                  </p>
                  <p>
                    Nuestro enfoque está en la{" "}
                    <strong className="text-foreground">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
