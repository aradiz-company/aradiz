import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import {
  HeroSection,
  ServicesSection,
  AboutSection,
} from "@/components/sections";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} | ${siteConfig.tagline}`,
  },
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
    </>
  );
}
