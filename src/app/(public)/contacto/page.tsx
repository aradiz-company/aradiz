import { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { PageHeroSection, ContactFormSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para conversar sobre tu proyecto. Ofrecemos soluciones profesionales en cortinas técnicas, mobiliario a medida y sistemas de vidrio.",
};

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
    },
    {
      icon: Phone,
      label: "Teléfono",
      value: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phone}`,
    },
    {
      icon: MapPin,
      label: "Ubicación",
      value: siteConfig.contact.address,
      href: null,
    },
  ];

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    siteConfig.contact.whatsappMessage,
  )}`;

  return (
    <>
      <PageHeroSection
        title="Conversemos sobre tu proyecto"
        highlightedText="proyecto"
        description="Estamos listos para ayudarte. Completa el formulario y nos pondremos en contacto contigo a la brevedad."
        className="max-w-3xl"
      />

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Información de contacto
              </h2>
              <div className="space-y-6 mb-8">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <div key={info.label} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-foreground font-medium hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-foreground font-medium">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <Card className="bg-secondary text-secondary-foreground border-0">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">¿Prefieres WhatsApp?</h3>
                  <p className="text-sm text-secondary-foreground/80 mb-4">
                    Contáctanos directamente y recibe una respuesta inmediata.
                  </p>
                  <Button asChild variant="light" size="sm" className="w-full">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Abrir WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <ContactFormSection className="lg:col-span-3 -translate-y-16" />
          </div>
        </div>
      </section>

    </>
  );
}
