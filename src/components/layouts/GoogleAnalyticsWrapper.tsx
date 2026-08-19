"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "./google-analytics";

interface GoogleAnalyticsWrapperProps {
  gaId?: string;
  storageKey?: string;
}

export function GoogleAnalyticsWrapper({
  gaId,
  storageKey = "cookie-consent-status",
}: GoogleAnalyticsWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    // Initial check on client mount
    const localConsent = localStorage.getItem(storageKey);
    setHasConsent(localConsent === "accepted");

    // Listen to real-time changes
    const handleConsentChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ status: "accepted" | "rejected" | null }>;
      if (customEvent.detail) {
        setHasConsent(customEvent.detail.status === "accepted");
      }
    };

    window.addEventListener("ga-consent-change", handleConsentChange);
    return () => {
      window.removeEventListener("ga-consent-change", handleConsentChange);
    };
  }, [storageKey]);

  if (!mounted || !hasConsent) {
    return null;
  }

  return <GoogleAnalytics gaId={gaId} />;
}
