"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface CTASectionProps {
  title?: string;
  description?: string;
  leadIn?: string;
  footerText?: string;
  className?: string;
  variant?: "default" | "brochure";
}

export function CTASection({
  title = "¿Tienes un proyecto en mente?",
  description = "Conversemos sobre cómo podemos ayudarte a hacerlo realidad. Fabricación, ejecución e instalación con los más altos estándares de calidad.",
  leadIn = "",
  footerText = "",
  className = "",
  variant = "brochure",
}: CTASectionProps) {
  const pathname = usePathname();

  const handleContactClick = (e: React.MouseEvent) => {
    if (pathname === "/contacto") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section
      className={cn(
        "py-24 md:py-36 relative overflow-hidden flex items-center justify-center min-h-[60vh] group",
        className,
      )}
    >
      {/* Background Logic */}
      {variant === "brochure" ? (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/oceano.png"
              alt="Fondo de océano profundo"
              fill
              className="object-cover object-[center_30%] transition-transform duration-[10s] ease-out group-hover:scale-105"
              priority
            />
            {/* Overlay to ensure legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-transparent to-secondary/40" />

            <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-secondary/40" />
          </div>
        </>
      ) : (
        /* Animated Fluid Waves (Legacy) */
        <div className="absolute inset-0 opacity-[0.45] pointer-events-none overflow-hidden bg-secondary">
          <motion.div
            animate={{ x: ["0%", "-5%", "0%"], y: ["0%", "3%", "0%"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 w-[120%] -left-[10%] h-full flex items-end"
          >
            <svg
              className="w-full h-auto min-h-[50%]"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#085a66"
                fillOpacity="0.5"
                d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
            </svg>
          </motion.div>
          {/* ... keeping other layers for legacy ... */}
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
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
            className="flex justify-center mb-8"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/90 shadow-2xl">
              <Sparkles className="w-3.5 h-3.5 text-white/80" />
              ¡Descuento exclusivo vía web!
              <Sparkles className="w-3.5 h-3.5 text-white/80" />
            </span>
          </motion.div>

          {/* Lead-in / Origen */}
          {variant === "brochure" && leadIn && (
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.4em" }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="block text-xs md:text-sm font-bold text-white/80 mb-6 uppercase tracking-[0.4em]"
            >
              {leadIn}
            </motion.span>
          )}

          {/* Title */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-[1.1] tracking-tight">
            {title}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl mb-12 text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
            {description}
          </p>

          {/* CTA Button */}
          <div className="flex flex-col items-center gap-8">
            <Button
              asChild
              size="lg"
              className="h-14 px-10 rounded-full text-base font-bold tracking-wider transition-all hover:scale-105 duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] bg-white text-primary hover:bg-white/90 border border-white/20 group"
            >
              <Link href="/contacto" onClick={handleContactClick}>
                Inicia tu proyecto hoy
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            {/* Footer Text / Slogan */}
            {variant === "brochure" && footerText && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="pt-8 w-full max-w-xs"
              >
                <div className="h-px w-12 bg-white/30 mx-auto mb-4" />
                <p className="text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-white/70">
                  {footerText}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
