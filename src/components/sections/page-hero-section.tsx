"use client";

import { motion } from "framer-motion";

interface PageHeroSectionProps {
  title: string;
  highlightedText?: string;
  description: string;
  className?: string;
  id?: string;
}

// Subcomponent for the architectural grid background
function ArchitecturalGrid() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="absolute top-0 right-0 h-full w-full max-w-[50%] pointer-events-none hidden lg:block"
      aria-hidden="true"
    >
      {/* Subtle gradient masks so it fades out towards the left and bottom to blend with the background */}
      <div className="absolute inset-0 bg-linear-to-l from-transparent via-background/50 to-background z-10" />
      <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10" />

      <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 400"
        preserveAspectRatio="xMaxYMid slice"
        className="stroke-(--aradiz-primary)/20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Fine background grid */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          d="M0 40 L600 40 M0 80 L600 80 M0 120 L600 120 M0 160 L600 160 M0 200 L600 200 M0 240 L600 240 M0 280 L600 280 M0 320 L600 320 M0 360 L600 360 M40 0 L40 400 M80 0 L80 400 M120 0 L120 400 M160 0 L160 400 M200 0 L200 400 M240 0 L240 400 M280 0 L280 400 M320 0 L320 400 M360 0 L360 400 M400 0 L400 400 M440 0 L440 400 M480 0 L480 400 M520 0 L520 400 M560 0 L560 400"
          strokeWidth="0.5"
          className="stroke-(--aradiz-primary)/10"
        />
        
        {/* Structural bold lines (Isometric/Perspective feel) */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
          d="M120 80 L480 80 L480 320 L120 320 Z M200 160 L560 160 L560 400 M480 80 L560 160 M480 320 L560 400 M120 320 L200 400 M200 160 L200 400"
          strokeWidth="1.5"
        />

        {/* Nodes / intersections */}
        {[
          [120, 80], [480, 80], [480, 320], [120, 320],
          [200, 160], [560, 160], [560, 400], [200, 400]
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 + i * 0.1, duration: 0.5 }}
            cx={cx}
            cy={cy}
            r="3"
            className="fill-(--aradiz-primary)/40 stroke-none"
          />
        ))}

        {/* Diagonal accents */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
          d="M160 120 L240 120 L240 200"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </svg>
    </motion.div>
  );
}

export function PageHeroSection({
  title,
  highlightedText,
  description,
  className = "mt-15",
  id,
}: PageHeroSectionProps) {
  // Split title to insert highlighted text if provided
  const renderTitle = () => {
    if (!highlightedText) {
      return title;
    }

    // Find the highlighted text in the title
    const parts = title.split(highlightedText);
    return (
      <>
        {parts[0]}
        <span className="text-(--aradiz-primary)">{highlightedText}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section id={id} className={`relative py-20 bg-background overflow-hidden ${className}`}>
      <ArchitecturalGrid />
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            {renderTitle()}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
