"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export function CTASection() {
  const pathname = usePathname();

  let title = "¿Listo para iniciar tu proyecto?";
  let description =
    "Trabajemos juntos para hacer realidad tu visión. Contáctanos para una cotización personalizada.";

  if (pathname === "/servicios") {
    title = "¿Necesitas una solución a medida?";
    description =
      "Contáctanos para una consulta personalizada. Analizamos tus necesidades y te ofrecemos la mejor solución técnica.";
  } else if (pathname === "/contacto") {
    title = "Trabajemos juntos en tu próximo proyecto";
    description =
      "Contáctanos para conversar sobre cómo podemos ayudarte a ejecutar tu proyecto con la calidad y profesionalismo que necesitas.";
  }

  const handleContactClick = (e: React.MouseEvent) => {
    if (pathname === "/contacto") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full relative flex items-center justify-center group z-10 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-4"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/90 shadow-2xl">
              <Sparkles className="w-3.5 h-3.5 text-white/80" />
              ¡Descuento exclusivo vía web!
              <Sparkles className="w-3.5 h-3.5 text-white/80" />
            </span>
          </motion.div>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-[1.1] tracking-tight">
            {title}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl mb-8 text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
            {description}
          </p>

          {/* CTA Button */}
          <div className="flex flex-col items-center gap-8">
            <Button
              asChild
              size="lg"
              className="h-14 px-10 rounded-full text-base font-bold tracking-wider transition-all hover:scale-105 duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] bg-white text-secondary hover:bg-white/90 border border-white/20 group"
            >
              <Link href="/contacto" onClick={handleContactClick}>
                Inicia tu proyecto hoy
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
