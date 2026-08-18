import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Conozca cómo utilizamos las cookies en Aradiz para mejorar su navegación.",
};

export default function CookiesPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mt-16 mb-4 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
          Política de Cookies
        </h1>
        <p className="text-muted-foreground text-lg">
          Transparencia sobre el uso de cookies y tecnologías similares en nuestro sitio web.
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 font-sans text-zinc-800 dark:text-zinc-200">
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-secondary">1. ¿Qué es una Cookie?</h2>
          <p className="leading-relaxed">
            Las cookies son pequeños archivos de texto que se descargan e instalan en su computadora o dispositivo móvil al ingresar a nuestro sitio web. Estas herramientas nos permiten guardar información sobre sus hábitos de navegación o preferencias de visualización (como recordar su idioma o si ya ha tomado una decisión de privacidad) con el fin de optimizar y personalizar su experiencia en visitas futuras.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-secondary">2. ¿Para qué las utilizamos?</h2>
          <p className="leading-relaxed">
            En <strong>{siteConfig.name}</strong> utilizaremos las cookies únicamente con los siguientes fines:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Optimizar la navegación:</strong> Garantizar la carga ágil y correcta de nuestros recursos y garantizar la seguridad del sitio.</li>
            <li><strong>Análisis estadístico:</strong> Conocer información anónima sobre cómo interactúan los usuarios con nuestra web, qué secciones son las más visitadas, y con ello mejorar continuamente la usabilidad de nuestra plataforma.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-secondary">3. Tipos de Cookies en Uso</h2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 dark:bg-zinc-800/50">
                  <th className="p-3 font-semibold text-zinc-950 dark:text-zinc-100">Tipo de Cookie</th>
                  <th className="p-3 font-semibold text-zinc-950 dark:text-zinc-100">Nombre / Proveedor</th>
                  <th className="p-3 font-semibold text-zinc-950 dark:text-zinc-100">Finalidad y Uso</th>
                  <th className="p-3 font-semibold text-zinc-950 dark:text-zinc-100">Vigencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr className="align-top">
                  <td className="p-3 font-semibold">Necesaria (Esencial)</td>
                  <td className="p-3">cookie-consent-status / Aradiz</td>
                  <td className="p-3 text-zinc-600 dark:text-zinc-400">Guarda la decisión del usuario (Aceptar / Rechazar) respecto al uso de cookies de seguimiento en el sitio.</td>
                  <td className="p-3">Persiste 1 año (si acepta) o hasta cerrar navegador (si rechaza)</td>
                </tr>
                <tr className="align-top">
                  <td className="p-3 font-semibold">Rendimiento / Analíticas</td>
                  <td className="p-3">Google Analytics (gtag.js) / Google LLC</td>
                  <td className="p-3 text-zinc-600 dark:text-zinc-400">Recopila datos anónimos de comportamiento (páginas visitadas, procedencia del tráfico, dispositivo) para elaborar reportes internos de rendimiento.</td>
                  <td className="p-3">Hasta 2 años (configurable)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-secondary">4. ¿Cómo Administrar o Revocar su Consentimiento?</h2>
          <p className="leading-relaxed">
            Usted puede modificar su decisión de consentimiento en cualquier momento:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Desde nuestra web:</strong> Al hacer clic en el botón <strong>&quot;Configuración de Cookies&quot;</strong> ubicado en el pie de página (Footer), el almacenamiento de cookies se limpiará de inmediato y se desplegará nuevamente el modal de cookies en la pantalla para que tome una nueva decisión.
            </li>
            <li>
              <strong>Desde la configuración del navegador:</strong> Puede restringir, bloquear o borrar las cookies de este o cualquier otro sitio web mediante la configuración de su navegador web (Chrome, Firefox, Edge, Safari, etc.).
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-secondary">5. Contacto</h2>
          <p className="leading-relaxed">
            Si tiene alguna consulta sobre esta Política de Cookies o sobre el procesamiento de la información, puede escribirnos a{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-primary hover:underline underline-offset-4"
            >
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
