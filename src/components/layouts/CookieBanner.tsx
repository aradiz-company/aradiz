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
    rejectButton?: string;
    privacyLink?: string;
  };
}

export function CookieBanner({
  privacyPolicyUrl = "/politica-de-cookies",
  storageKey = "cookie-consent-status",
  texts = {},
}: CookieBannerProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const defaultTexts = {
    title: "USO DE COOKIES",
    description: "Utilizamos cookies de terceros para analizar el tráfico de nuestro sitio web y brindarte una mejor experiencia.",
    acceptButton: "Aceptar",
    rejectButton: "Rechazar",
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
        setVisible(true);
      }
    };

    window.addEventListener("ga-consent-change", handleConsentChange);
    return () => {
      window.removeEventListener("ga-consent-change", handleConsentChange);
    };
  }, []);

  // Add/remove class from body to apply blur effect to layout elements
  useEffect(() => {
    if (mounted && visible) {
      document.body.classList.add("cookie-banner-active");
    } else {
      document.body.classList.remove("cookie-banner-active");
    }
    return () => {
      document.body.classList.remove("cookie-banner-active");
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

  if (!mounted || !visible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 inset-x-0 p-6 bg-white text-zinc-900 rounded-t-2xl z-[100] shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.1),_0_8px_10px_-6px_rgba(0,0,0,0.1)] flex flex-col gap-4 font-sans md:max-w-md md:mx-auto md:bottom-6 md:rounded-2xl border border-zinc-200">
      <div className="space-y-2">
        <h4 className="text-base font-bold tracking-wide uppercase text-zinc-950">
          {defaultTexts.title}
        </h4>
        <p className="text-xs text-zinc-600 leading-relaxed">
          {defaultTexts.description}{" "}
          Habilita todas las cookies haciendo clic en Aceptar o rechaza su uso. Conoce más en nuestra{" "}
          <Link
            href={privacyPolicyUrl}
            className="text-zinc-950 font-medium underline underline-offset-2 hover:text-zinc-800"
          >
            {defaultTexts.privacyLink}
          </Link>
          .
        </p>
      </div>
      <div className="flex items-center gap-3 mt-1">
        <button
          onClick={handleReject}
          type="button"
          className="flex-1 px-4 py-2.5 text-xs font-semibold border border-zinc-300 rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer text-center text-zinc-900"
        >
          {defaultTexts.rejectButton}
        </button>
        <button
          onClick={handleAccept}
          type="button"
          className="flex-1 px-4 py-2.5 text-xs font-semibold bg-zinc-950 text-white rounded-lg hover:bg-zinc-850 transition-colors cursor-pointer text-center"
        >
          {defaultTexts.acceptButton}
        </button>
      </div>
    </div>
  );
}
