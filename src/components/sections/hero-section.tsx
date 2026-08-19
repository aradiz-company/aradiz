"use client";

// import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
// import { FancyButton } from "@/components/shared/buttons/fancy-button";

import { useState, useEffect, useCallback } from "react";

// Slides del carrusel — cada uno tiene imagen y titular propio
const slides = [
  {
    image: "/images/home/hero-slide-1.png",
    prefix: "Ejecución profesional de",
    highlight: "soluciones a medida",
    suffix: "para proyectos residenciales y comerciales",
  },
  {
    image: "/images/home/hero-slide-2.png",
    prefix: "Fabricación e instalación de",
    highlight: "mobiliario exclusivo",
    suffix: "que transforma cada rincón de tu espacio",
  },
  {
    image: "/images/home/hero-slide-3.png",
    prefix: "Control solar y confort térmico con",
    highlight: "cortinas técnicas",
    suffix: "de alta precisión y elegancia",
  },
  {
    image: "/images/home/hero-slide-4.png",
    prefix: "Arquitectura transparente con",
    highlight: "sistemas de vidrio",
    suffix: "para espacios modernos y seguros",
  },
];

const carouselImages = slides.map((s) => s.image);

export function HeroSection() {
  const [offset, setOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Duplicamos las imágenes para crear el efecto infinito
  const infiniteImages = [
    ...carouselImages,
    ...carouselImages,
    ...carouselImages,
  ];

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setOffset((prev) => prev - 1);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setOffset((prev) => prev + 1);
  }, [isTransitioning]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      // Calculate the target offset to bring the desired image to the "active" position.
      // The active image is at carouselImages.length + currentImageIndex.
      // We want to move to carouselImages.length + index.
      // So, the new offset should be -(index - currentImageIndex).
      // Let's find the current active image index first.
      const currentActiveIndex =
        (carouselImages.length - (offset % carouselImages.length)) %
        carouselImages.length;
      const targetOffset = offset - (index - currentActiveIndex);
      setOffset(targetOffset);
    },
    [isTransitioning, offset],
  );

  const handleAnimationComplete = useCallback(() => {
    setIsTransitioning(false);

    // Saltar cuando completamos un ciclo completo
    // Si avanzamos más allá del segundo set, volver al segundo set
    if (offset <= -carouselImages.length) {
      setOffset(offset + carouselImages.length);
    }
    // Si retrocedemos más allá del segundo set, avanzar al segundo set
    else if (offset >= carouselImages.length) {
      setOffset(offset - carouselImages.length);
    }
  }, [offset]);

  // Índice activo calculado a partir del offset
  const currentActiveIndex =
    (((carouselImages.length - (offset % carouselImages.length)) %
      carouselImages.length) +
      carouselImages.length) %
    carouselImages.length;

  // Auto-play del carrusel
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative flex items-end justify-start overflow-hidden [--slide-width:100vw] shadow-2xl">
      {/* Carousel - solo los slides */}
      <div className="h-dvh relative z-10 overflow-hidden">
        {/* Track del carrusel - Contiene TODAS las imágenes duplicadas */}
        <motion.div
          className="flex h-full"
          animate={{
            x: `calc(${offset - carouselImages.length} * var(--slide-width))`,
          }}
          transition={
            isTransitioning
              ? {
                  type: "spring",
                  stiffness: 100,
                  damping: 50,
                }
              : {
                  duration: 0, // Salto instantáneo
                }
          }
          onAnimationComplete={handleAnimationComplete}
        >
          {/* Renderizar imágenes duplicadas */}
          {infiniteImages.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="relative overflow-hidden shrink-0"
              style={{
                width: `var(--slide-width)`,
              }}
            >
              <div
                className="h-full w-full bg-center bg-cover"
                style={{
                  backgroundImage: `url("${image}")`,
                }}
                role="img"
                aria-label={`Slide ${(index % carouselImages.length) + 1}`}
              />
            </div>
          ))}
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-r from-background/50 lg:from-background/90 via-background/50 lg:via-transparent to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-background/90 via-transparent to-transparent" />
      </div>

      {/* Contenido overlay - separado del carrusel, siempre 100vw */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="mx-auto h-full px-4 md:px-6 relative flex flex-col justify-end items-start pb-16">
          {/* Contenido de texto */}
          <div className="max-w-md 2xl:max-w-xl pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentActiveIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-4xl sm:text-5xl 2xl:text-7xl font-extrabold tracking-tighter text-foreground mb-8 leading-[1.1]"
              >
                {slides[currentActiveIndex].prefix}{" "}
                <span className="text-secondary/90">
                  {slides[currentActiveIndex].highlight}
                </span>{" "}
                {slides[currentActiveIndex].suffix}
              </motion.h1>
            </AnimatePresence>

            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <FancyButton asChild variant="dark" showKeys={false}>
                <Link href="/proyectos">Ver Proyectos</Link>
              </FancyButton>
            </motion.div> */}
          </div>

          {/* Indicadores de slides */}
          <div className="absolute bottom-10 left-0 flex gap-2 cursor-pointer pointer-events-auto px-4 md:px-6">
            {carouselImages.map((_image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentActiveIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-foreground/30 hover:bg-foreground/50"
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>

          {/* Controles de navegación */}
          <div className="absolute bottom-6 right-0 flex gap-2 text-background pointer-events-auto px-4 md:px-6">
            <button
              onClick={prevSlide}
              className="p-4 rounded-full bg-foreground/80 backdrop-blur-sm hover:bg-foreground/70 transition-colors cursor-pointer"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-4 rounded-full bg-foreground/80 backdrop-blur-sm hover:bg-foreground/70 transition-colors cursor-pointer"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
