"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface CookieBannerProps {
  privacyPolicyUrl?: string;
  storageKey?: string;
  texts?: {
    title?: string;
    description?: string;
    acceptButton?: string;
    configButton?: string;
    privacyLink?: string;
  };
}

export function CookieBanner({
  privacyPolicyUrl = "/privacidad",
  storageKey = "cookie-consent-status",
  texts = {},
}: CookieBannerProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);

  const defaultTexts = {
    title: "USO DE COOKIES",
    description: "Utilizamos cookies de terceros para analizar el tráfico de nuestro sitio web y brindarte una mejor experiencia.",
    acceptButton: "Aceptar",
    configButton: "Configurar",
    privacyLink: "política de cookies",
    ...texts,
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const localConsent = localStorage.getItem(storageKey);
    const sessionConsent = sessionStorage.getItem(storageKey);

    if (!localConsent && !sessionConsent) {
      setVisible(true);
    }
  }, [storageKey]);

  useEffect(() => {
    const handleConsentChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ status: "accepted" | "rejected" | null }>;
      if (customEvent.detail && customEvent.detail.status === null) {
        setShowConfig(false);
        setVisible(true);
      }
    };

    window.addEventListener("ga-consent-change", handleConsentChange);
    return () => {
      window.removeEventListener("ga-consent-change", handleConsentChange);
    };
  }, []);

  // Lock body scrolling when modal is active
  useEffect(() => {
    if (mounted && visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted, visible]);

  const handleAccept = () => {
    localStorage.setItem(storageKey, "accepted");
    const event = new CustomEvent("ga-consent-change", {
      detail: { status: "accepted" },
    });
    window.dispatchEvent(event);
    setVisible(false);
  };

  const handleReject = () => {
    sessionStorage.setItem(storageKey, "rejected");
    const event = new CustomEvent("ga-consent-change", {
      detail: { status: "rejected" },
    });
    window.dispatchEvent(event);
    setVisible(false);
  };

  const handleSaveConfig = () => {
    if (analyticsConsent) {
      handleAccept();
    } else {
      handleReject();
    }
  };

  if (!mounted || !visible) {
    return null;
  }

  return (
    <>
      {/* Backdrop Blur Overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

      {/* Banner / Bottom Sheet Modal */}
      <div className="fixed bottom-0 inset-x-0 p-6 bg-white text-zinc-900 rounded-t-2xl z-50 shadow-2xl flex flex-col gap-4 font-sans md:max-w-md md:mx-auto md:bottom-6 md:rounded-2xl border border-zinc-200">
        {!showConfig ? (
          <>
            <div className="space-y-2">
              <h4 className="text-base font-bold tracking-wide uppercase text-zinc-950">
                {defaultTexts.title}
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {defaultTexts.description}{" "}
                Habilita todas las cookies haciendo clic en Aceptar o configura su uso desde la opción Configurar. Conoce más en nuestra{" "}
                <Link
                  href={privacyPolicyUrl}
                  className="text-zinc-950 font-medium underline underline-offset-2 hover:text-zinc-800"
                >
                  {defaultTexts.privacyLink}
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2">
              <button
                onClick={() => setShowConfig(true)}
                type="button"
                className="flex-1 px-4 py-2.5 text-xs font-semibold border border-zinc-300 rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer text-center text-zinc-900"
              >
                {defaultTexts.configButton}
              </button>
              <button
                onClick={handleAccept}
                type="button"
                className="flex-1 px-4 py-2.5 text-xs font-semibold bg-zinc-950 text-white rounded-lg hover:bg-zinc-850 transition-colors cursor-pointer text-center"
              >
                {defaultTexts.acceptButton}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <h4 className="text-base font-bold tracking-wide uppercase text-zinc-950">
                Configurar Cookies
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Gestiona tus preferencias de consentimiento para las cookies de este sitio web.
              </p>
            </div>

            <div className="space-y-3 my-2 border-y border-zinc-100 py-3">
              {/* Necessary Cookies (Always Active) */}
              <div className="flex items-start justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <p className="font-semibold text-zinc-950">Necesarias</p>
                  <p className="text-zinc-500 text-[10px] leading-normal">
                    Requeridas para el funcionamiento básico y seguridad del sitio.
                  </p>
                </div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase bg-zinc-100 px-2 py-0.5 rounded">
                  Siempre activas
                </span>
              </div>

              {/* Performance/Analytics Cookies */}
              <label className="flex items-start justify-between gap-3 text-xs cursor-pointer select-none">
                <div className="space-y-0.5">
                  <p className="font-semibold text-zinc-950">Rendimiento / Analíticas</p>
                  <p className="text-zinc-500 text-[10px] leading-normal">
                    Permite recopilar datos anónimos de navegación para analizar y mejorar el rendimiento de la web (Google Analytics).
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsConsent}
                  onChange={(e) => setAnalyticsConsent(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-900 mt-0.5 cursor-pointer accent-zinc-950"
                />
              </label>
            </div>

            <div className="flex flex-col gap-2 mt-1">
              <div className="flex gap-2">
                <button
                  onClick={handleReject}
                  type="button"
                  className="flex-1 px-3 py-2 text-xs font-semibold border border-zinc-300 rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer text-center text-zinc-600"
                >
                  Rechazar todo
                </button>
                <button
                  onClick={handleSaveConfig}
                  type="button"
                  className="flex-1 px-3 py-2 text-xs font-semibold border border-zinc-950 bg-zinc-950 text-white rounded-lg hover:bg-zinc-850 transition-colors cursor-pointer text-center"
                >
                  Guardar selección
                </button>
              </div>
              <button
                onClick={handleAccept}
                type="button"
                className="w-full px-3 py-2 text-xs font-semibold border border-zinc-200 bg-zinc-100 text-zinc-900 rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer text-center"
              >
                Aceptar todo
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
