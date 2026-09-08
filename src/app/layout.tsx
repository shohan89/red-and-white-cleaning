import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SITE } from "@/config/site";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Post-Construction & Commercial Cleaning in Southern Ontario`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Licensed and insured post-construction and commercial cleaning services for contractors, property managers, and developers across Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London, and Brantford, Ontario.",
  keywords: [
    "post construction cleaning Southern Ontario",
    "commercial cleaning Kitchener",
    "cleaning services for contractors Ontario",
    "post construction cleaning Waterloo",
    "commercial cleaning Cambridge Ontario",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | Post-Construction & Commercial Cleaning`,
    description:
      "Licensed and insured post-construction and commercial cleaning in Southern Ontario. Serving contractors, property managers, and developers.",
    images: [{ url: "/images/og/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Commercial Cleaning Southern Ontario`,
    description: "Post-construction and commercial cleaning in Southern Ontario.",
  },
  icons: {
    icon: [{ url: "/images/logo.jpg", type: "image/jpeg" }],
    shortcut: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} h-full scroll-smooth`}
    >
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${SITE.gtmId}');`}
        </Script>
        {/* End Google Tag Manager */}
        <link rel="preload" as="image" href="/images/hero-bg.webp" fetchPriority="high" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${SITE.gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
