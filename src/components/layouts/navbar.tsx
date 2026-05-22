"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from 'lucide-react';
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { FancyButton } from "@/components/shared/buttons/fancy-button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useScroll } from "@/hooks/use-scroll";

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { isScrolled, isVisible } = useScroll();

    const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
        siteConfig.contact.whatsappMessage
    )}`;

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled
                ? "bg-background/60 backdrop-blur-md border-b border-border/5 shadow-sm"
                : "bg-transparent"
                } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
        >
            <nav className={`mx-auto flex transition-all duration-300 items-center justify-between px-4 md:px-6 ${isScrolled ? "h-16" : "h-20"
                }`}>
                {/* Logo */}
                <Link href="/" className="flex items-center leading-none">
                    <Image
                        src="/images/logo.png"
                        alt="Aradiz"
                        width={160}
                        height={48}
                        className="h-35 w-auto -translate-x-5"
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8">
                    {siteConfig.navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm font-medium transition-colors ${isActive
                                    ? "text-primary"
                                    : "text-black hover:text-primary"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                    <FancyButton asChild variant="secondary" size="sm" showKeys={false}>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Solicitar Cotización
                        </a>
                    </FancyButton>
                </div>

                {/* Mobile Navigation */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="lg:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Abrir menú</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="top" className="h-auto max-h-[80vh] overflow-y-auto bg-black/60 backdrop-blur-md border-none [&>button]:text-white">
                        <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                        <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
                            <nav className="flex flex-col gap-3">
                                {siteConfig.navigation.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`text-sm font-medium transition-colors py-2 ${isActive
                                                ? "text-primary font-semibold"
                                                : "text-background hover:text-primary"
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                            <Button asChild className="w-full">
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center gap-2"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Solicitar Cotización
                                </a>
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    );
}
