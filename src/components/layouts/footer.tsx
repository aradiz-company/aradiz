import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { services } from "@/data/services";
import { CTASection } from "@/components/sections";
import { CookieSettingsButton } from "./CookieSettingsButton";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="relative bg-black text-background overflow-hidden flex flex-col min-h-screen">
        {/* Shared Background for CTA and Footer */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            src="/images/common/bg-ocean.png"
            alt="Fondo de océano profundo"
            fill
            sizes="100vw"
            className="object-cover object-center animate-ocean-drift"
            priority
          />
          {/* Overlays to ensure legibility while keeping the ocean visible */}
          <div className="absolute inset-0 bg-linear-to-b from-secondary via-black/70 to-black" />
        </div>

        {/* Global CTA Section - Flex to center it vertically */}
        <div className="flex-1 flex flex-col justify-center relative z-10 border-b border-white/10">
          <CTASection />
        </div>

        {/* Main Footer Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 py-12 md:py-16 mt-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Brand Column */}
            <div className="space-y-6">
              <Link href="/" className="flex flex-col leading-none">
                <Image
                  src="/images/brand/logo-light.svg"
                  alt="Aradiz"
                  width={140}
                  height={48}
                  className="h-10 w-auto object-left mr-auto"
                />
              </Link>

              <div className="flex gap-4">
                <Link
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider">
                Navegación
              </h4>
              <nav className="flex flex-col gap-2">
                {siteConfig.navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider">
                Servicios
              </h4>
              <nav className="flex flex-col gap-2">
                {services.map((service) => (
                  <Link
                    key={service.id}
                    href={`/servicios#${service.id}`}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {service.title}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider">
                Contacto
              </h4>
              <div className="flex flex-col gap-2 text-sm text-background/70">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-background transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="hover:text-background transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
                <p className="flex items-center gap-2">
                  {siteConfig.contact.address}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 3 2"
                    className="w-4 h-auto shrink-0 rounded-[2px] shadow-sm"
                    aria-label="Bandera de Perú"
                  >
                    <rect width="1" height="2" fill="#D91023" />
                    <rect width="1" height="2" x="1" fill="#FFFFFF" />
                    <rect width="1" height="2" x="2" fill="#D91023" />
                  </svg>
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-background/10" />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-background/60">
            <p>
              © {currentYear} {siteConfig.name}. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6">
              <Link
                href="/privacidad"
                className="hover:text-background transition-colors"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/politica-de-cookies"
                className="hover:text-background transition-colors"
              >
                Política de Cookies
              </Link>
              <Link
                href="/terminos"
                className="hover:text-background transition-colors"
              >
                Términos de Uso
              </Link>
              <CookieSettingsButton />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
