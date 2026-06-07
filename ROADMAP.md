# Roadmap de Mejoras Arquitectónicas, Seguridad y SEO (aradiz Grupo Corporativo)

Este documento detalla las 5 fases de migración e integración necesarias para establecer un stack "top-tier" nativo en Vercel (Postgres + Blob), manteniendo el panel de administración propio, solucionando vulnerabilidades críticas y optimizando la presencia digital.

---

## Fase 1: Migración del Core a Vercel, Resend y Seguridad
**Objetivo:** Reemplazar Firebase por el ecosistema de Vercel, manteniendo el panel de control y asegurando el formulario.
*   **Acciones a realizar:**
    1.  **Limpieza:** Eliminar dependencias de Firebase (`firebase`, `firebase-admin`).
    2.  **Base de Datos & Storage:** Integrar **Vercel Postgres** (`@vercel/postgres`) y **Vercel Blob** (`@vercel/blob`).
    3.  **Mailing & Captcha:** Integrar `resend` y Cloudflare Turnstile.
    4.  **Autenticación Simple:** Sustituir Firebase Auth por un sistema de sesión ligera (ej. `next-auth` o JWT) con credenciales de administrador mediante variables de entorno (al ser solo 1 o 2 usuarios).
    5.  **Refactor del Admin:** Conectar la gestión de "Leads" y "Proyectos" del panel actual a Vercel Postgres, y la subida de imágenes a Vercel Blob.

## Fase 2: Analíticas Modernas y Privacidad
**Objetivo:** Implementar métricas sin perjudicar la experiencia del usuario ni incumplir normativas.
*   **Acciones a realizar:**
    1.  Integrar **Vercel Web Analytics** en el proyecto (evitando el banner invasivo de cookies).
    2.  Configurar eventos personalizados (ej. `generate_lead` al enviar el formulario con éxito).

## Fase 3: Despliegue CI/CD en Vercel
**Objetivo:** Establecer un flujo de desarrollo continuo sin fricciones.
*   **Acciones a realizar:**
    1.  Vincular el repositorio de GitHub con el proyecto en **Vercel** para tener "Previews" automáticos en cada Pull Request.
    2.  Configurar todas las variables de entorno de Postgres, Blob, Resend y Turnstile en el panel de Vercel.

## Fase 4: SEO Estructurado Avanzado (JSON-LD Schema Markup)
**Objetivo:** Mejorar la forma en que Google entiende y muestra el negocio en los resultados de búsqueda (Rich Snippets).
*   **Acciones a realizar:**
    1.  Generar e inyectar un script `application/ld+json` con el esquema de `LocalBusiness` u `Organization`.

## Fase 5: SEO Social (Metadatos de Open Graph Image)
**Objetivo:** Profesionalizar la apariencia del enlace del sitio al compartirlo en redes sociales (WhatsApp, LinkedIn, Facebook).
*   **Acciones a realizar:**
    1.  Definir la propiedad `images` dentro del objeto `openGraph` y `twitter` apuntando al logotipo principal.
