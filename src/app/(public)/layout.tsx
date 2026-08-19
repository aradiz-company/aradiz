import { Navbar, Footer, WhatsAppButton, GoogleAnalyticsWrapper, CookieBanner, SplashScreen, CTAPopup } from "@/components/layouts";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SplashScreen>
            <div className="cookie-banner-blur-target flex flex-col min-h-screen flex-1">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <WhatsAppButton />
                <CTAPopup />
            </div>
            <GoogleAnalyticsWrapper gaId={process.env.NEXT_PUBLIC_GA_ID} />
            <CookieBanner />
            <Analytics />
            <SpeedInsights />
        </SplashScreen>
    );
}
