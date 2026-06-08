"use client";

import { motion } from "framer-motion";

export function MissionVisionSection() {
  return (
    <section className="pb-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nuestra razón de ser
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Propósito y dirección que guían cada proyecto que ejecutamos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-10 bg-foreground text-background border border-border/50 rounded-2xl flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-1 bg-primary" />
              <h3 className="text-xl md:text-2xl font-bold text-background uppercase tracking-wider">
                Misión
              </h3>
            </div>
            <p className="text-lg text-gray-300  leading-relaxed flex-grow">
              Ejecutar con precisión técnica la fabricación e instalación de
              acabados a medida, siendo el socio estratégico de confianza para
              todo proyecto — corporativo o residencial — que demande calidad,
              cumplimiento y resultados garantizados.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-10 bg-card rounded-2xl flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-1 bg-primary" />
              <h3 className="text-xl md:text-2xl font-bold text-foreground uppercase tracking-wider">
                Visión
              </h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed flex-grow">
              Consolidarnos como la empresa referente en fabricación e
              instalación de acabados a medida en el mercado peruano, con
              presencia en las principales ciudades del país y un equipo técnico
              de excelencia capaz de ejecutar proyectos de alta escala y
              complejidad.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
