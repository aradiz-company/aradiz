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
  privacyPolicyUrl = "/privacidad",
  storageKey = "cookie-consent-status",
  texts = {},
}: CookieBannerProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const defaultTexts = {
    title: "Uso de Cookies",
    description: "Utilizamos cookies de terceros para analizar el tráfico de nuestro sitio web.",
    acceptButton: "Aceptar",
    rejectButton: "Rechazar",
    privacyLink: "Política de Privacidad",
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

  const handleAccept = () => {
    localStorage.setItem(storageKey, "accepted");
    // Dispatch the custom event
    const event = new CustomEvent("ga-consent-change", {
      detail: { status: "accepted" },
    });
    window.dispatchEvent(event);
    setVisible(false);
  };

  const handleReject = () => {
    // Save to sessionStorage as requested for rejection
    sessionStorage.setItem(storageKey, "rejected");
    // Dispatch the custom event
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
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-900 border-t border-zinc-800 text-zinc-100 z-50 flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans shadow-lg">
      <div className="flex-1 space-y-1">
        <h4 className="text-sm font-semibold">{defaultTexts.title}</h4>
        <p className="text-xs text-zinc-400">
          {defaultTexts.description}{" "}
          <Link
            href={privacyPolicyUrl}
            className="text-primary hover:underline underline-offset-4"
          >
            {defaultTexts.privacyLink}
          </Link>
          .
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={handleReject}
          type="button"
          className="px-3 py-1.5 text-xs font-medium border border-zinc-700 rounded hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          {defaultTexts.rejectButton}
        </button>
        <button
          onClick={handleAccept}
          type="button"
          className="px-3 py-1.5 text-xs font-medium bg-zinc-100 text-zinc-950 rounded hover:bg-zinc-200 transition-colors cursor-pointer"
        >
          {defaultTexts.acceptButton}
        </button>
      </div>
    </div>
  );
}
