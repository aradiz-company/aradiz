import { Navbar, Footer, WhatsAppButton, GoogleAnalytics, SplashScreen, CTAPopup } from "@/components/layouts";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SplashScreen>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
            <CTAPopup />
            <GoogleAnalytics />
            <Analytics />
            <SpeedInsights />
        </SplashScreen>
    );
}
