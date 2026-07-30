"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface SplashScreenProps {
  children: React.ReactNode;
  minDuration?: number; // Minimum display time in ms
}

export function SplashScreen({
  children,
  minDuration = 1000,
}: SplashScreenProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Show splash for minimum duration on every page load
    const timer = setTimeout(() => {
      setIsExiting(true);
      // Wait for exit animation to complete
      setTimeout(() => {
        setShowSplash(false);
      }, 500);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

  if (!showSplash) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Preload content behind splash */}
      <div className="invisible">{children}</div>

      {/* Splash Screen Overlay */}
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-500 ${
          isExiting ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="relative flex flex-col items-center justify-center gap-6">
          {/* Animated rings container */}
          <div className="relative flex items-center justify-center w-32 h-32">
            {/* Center Icon */}
            <Image
              src="/images/brand/logo-icon.svg"
              alt="Aradiz Icon"
              width={64}
              height={64}
              priority
              className="z-10 w-16 h-16 animate-pulse"
            />

            {/* Outer ring - ping effect */}
            <div className="absolute h-28 w-28 rounded-full border-2 border-accent opacity-20 animate-ping" />
          </div>
        </div>
      </div>
    </>
  );
}
