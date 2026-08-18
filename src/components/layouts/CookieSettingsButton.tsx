"use client";

interface CookieSettingsButtonProps {
  className?: string;
  storageKey?: string;
  label?: string;
}

export function CookieSettingsButton({
  className = "hover:text-background transition-colors bg-transparent border-none p-0 cursor-pointer text-left font-sans",
  storageKey = "cookie-consent-status",
  label = "Configuración de Cookies",
}: CookieSettingsButtonProps) {
  const handleReset = () => {
    // Clear storage
    localStorage.removeItem(storageKey);
    sessionStorage.removeItem(storageKey);

    // Dispatch consent change event to notify Banner and GA Wrapper
    const event = new CustomEvent("ga-consent-change", {
      detail: { status: null },
    });
    window.dispatchEvent(event);
  };

  return (
    <button onClick={handleReset} type="button" className={className}>
      {label}
    </button>
  );
}
