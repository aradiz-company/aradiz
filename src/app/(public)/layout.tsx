import { Navbar, Footer, WhatsAppButton, GoogleAnalytics, SplashScreen, CTAPopup } from "@/components/layouts";

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
        </SplashScreen>
    );
}
