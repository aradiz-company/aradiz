import Image from "next/image";

export function OverlaySection() {
  return (
    <section className=" w-full">
      <div className="relative w-full">
        {/* Image Side - Takes left portion */}
        <div className="relative h-[750px] md:h-[700px] xl:h-[600px] w-full">
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-secondary/20 to-accent/20">
            <Image
              src="/images/about/about-work-team.png"
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
  );
}
