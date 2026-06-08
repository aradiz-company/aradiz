import Image from "next/image";
import { ReactNode } from "react";

interface SplitSectionProps {
  id?: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  isReversed?: boolean;
  priority?: boolean;
  children: ReactNode;
}

export function SplitSection({
  id,
  title,
  imageSrc,
  imageAlt,
  isReversed = false,
  priority = false,
  children,
}: SplitSectionProps) {
  return (
    <section id={id} className={isReversed ? "bg-card" : "bg-background"}>
      <div className="w-full px-0">
        <div className="grid lg:grid-cols-5 min-h-[600px]">
          {/* Image Section - 40% */}
          <div
            className={`lg:col-span-2 relative ${
              isReversed ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <div className="relative h-full min-h-[400px] lg:min-h-full">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority={priority}
              />
            </div>
          </div>

          {/* Content Panel - 60% */}
          <div
            className={`lg:col-span-3 flex items-center ${
              isReversed
                ? "bg-background text-foreground lg:order-1"
                : "bg-foreground text-background lg:order-2"
            }`}
          >
            <div className="w-full flex flex-col justify-center p-8 py-12 md:p-12 lg:p-16 xl:p-24">
              {/* Content Wrapper */}
              <div className="flex flex-col gap-12">
                <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold leading-tight">
                  {title.split(" ").map((word, idx, arr) =>
                    idx === arr.length - 1 ? (
                      <span
                        key={idx}
                        className="text-background bg-primary inline-block p-2"
                      >
                        {word}
                      </span>
                    ) : (
                      <span key={idx}>{word} </span>
                    ),
                  )}
                </h2>
                {/* We render children below the title */}
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
