"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function CTAPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Verificar si ya fue cerrado en la sesión actual
    const isDismissed = sessionStorage.getItem("cta-popup-dismissed");
    if (!isDismissed) {
      // Retardo de 1.5 segundos para no interrumpir el splash screen
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("cta-popup-dismissed", "true");
  };

  const handleContactClick = (e: React.MouseEvent) => {
    if (pathname === "/contacto") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Opcionalmente podemos cerrar el popup al hacer clic en el botón
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={cn(
            "fixed z-40 overflow-hidden rounded-2xl border border-white/10 shadow-2xl p-6",
            // Layout responsivo
            "bottom-24 left-4 right-4 md:left-auto md:right-6 md:bottom-28",
            "max-w-sm w-auto md:w-[360px]",
            "bg-secondary/90 backdrop-blur-md text-white group"
          )}
        >
          {/* Fondo de Océano similar al CTA Section */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/oceano.png"
              alt="Fondo de océano profundo"
              fill
              className="object-cover transition-transform duration-[10s] ease-out group-hover:scale-105"
              priority
            />
            {/* Gradientes para asegurar legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/70 to-secondary/90" />
          </div>

          {/* Botón de Cerrar */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-white/50 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors z-10 cursor-pointer"
            aria-label="Cerrar popup"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Contenido */}
          <div className="relative z-10 flex flex-col gap-3">
            {/* Badge de Descuento */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-[10px] font-bold uppercase tracking-widest text-white/90 shadow-md w-fit">
              <Sparkles className="w-3.5 h-3.5 text-white/80 animate-pulse" />
              <span>¡Descuento exclusivo vía web!</span>
            </div>

            {/* Título */}
            <h3 className="text-lg font-bold leading-tight tracking-tight text-white mt-1">
              ¿Tienes un proyecto en mente?
            </h3>

            {/* Descripción */}
            <p className="text-xs text-white/70 leading-relaxed font-light">
              Conversemos sobre cómo podemos ayudarte a hacerlo realidad. Fabricación, ejecución e instalación con los más altos estándares de calidad.
            </p>

            {/* Botón de Acción */}
            <div className="mt-2">
              <Button
                asChild
                size="sm"
                className="w-full h-10 rounded-full text-xs font-bold tracking-wider transition-all hover:scale-[1.02] duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] bg-white text-primary hover:bg-white/90 border border-white/20 group/btn"
              >
                <Link href="/contacto" onClick={handleContactClick}>
                  Inicia tu proyecto hoy
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover/btn:translate-x-0.5" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
