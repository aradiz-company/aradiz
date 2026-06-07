/**
 * aradiz - Site Configuration
 * Configuración centralizada del sitio web
 */

export const siteConfig = {
  name: "aradiz",
  tagline: "Acabados Integrales",
  description:
    "Ejecución profesional de soluciones a medida para proyectos residenciales y comerciales. Desde fabricación hasta instalación, con foco en cumplimiento técnico y eficiencia.",
  url: "https://aradiz.com",
  author: "aradiz Grupo Corporativo",

  // SEO
  keywords: [
    "cortinas técnicas",
    "mobiliario a medida",
    "sistemas de vidrio",
    "instalación profesional",
    "proyectos de interior",
    "obra corporativa",
    "fabricación a medida",
    "soluciones arquitectónicas",
  ] as string[],

  // Contacto
  contact: {
    phone: "+51 981 394 484", // Reemplazar con número real
    email: "contacto@aradiz.com",
    whatsapp: "+51981394484", // Número de WhatsApp sin espacios
    whatsappMessage:
      "¡Hola aradiz! Me gustaría solicitar una cotización para un proyecto.",
    address: "San Isidro, Lima - Perú", // Reemplazar con dirección real
  },

  // Redes sociales (si aplica)
  social: {
    linkedin: "https://www.linkedin.com/in/aradiz",
    instagram: "https://www.instagram.com/aradiz.group/",
    facebook: "https://www.facebook.com/aradiz",
  },

  // Navegación principal
  navigation: [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/servicios" },
    { name: "Proyectos", href: "/proyectos" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
