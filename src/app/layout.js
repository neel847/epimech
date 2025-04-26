// src/app/layout.js
import './globals.css';
import { Toaster } from 'react-hot-toast';

import NextTopLoader from 'nextjs-toploader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlobalRightClickBlocker from '@/components/GlobalRightClickBlocker'; // ✅ import


export const metadata = {
  title: 'Epimech',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Ponomar&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" type="application/manifest+json" />
        <link rel="apple-touch-icon" href="/fav.png" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/fav.png" />
        <meta name="description" content="Epimech - Manufacturers and suppliers of Various High Quality EMD Locomotive Engine Spare Parts - Turbocharger 350, after Cooler, Fan Drive, Compressor, and Water Pump Drive, Diesel locomotive, Electric locomotive, EMD 710, EMD 645 " />
        <meta name="keywords" content="Epimech, Epimech Solutions, EMD Locomotive Engine Spare Parts" />
        <meta name="author" content="Epimech Solutions Pvt. Ltd" />
        <meta name="distribution" content="global" />
        <meta name="robots" content="index,follow" />
        <meta name="copyright" content="Epimech Solutions Pvt. Ltd" />
        <meta httpEquiv="content-language" content="en-us" />
        <link rel="canonical" href="https://epimech.com" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="EMD Locomotive Engine Spare Parts - Suppliers &amp; Manufacturers in India" />
        <meta property="og:description" content="Epimech - Manufacturers and suppliers of Various High Quality EMD Locomotive Engine Spare Parts - Turbocharger 350, after Cooler, Fan Drive, Compressor, and Water Pump Drive, Diesel locomotive, Electric locomotive" />
        <meta property="og:url" content="https://epimech.com" />
        <meta property="og:site_name" content="Epimech" />
        <meta property="article:publisher" content="https://www.facebook.com/Epimechssolutions" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:description" content="Epimech - Manufacturers and suppliers of Various High Quality EMD Locomotive Engine Spare Parts - Turbocharger 350, after Cooler, Fan Drive, Compressor, and Water Pump Drive, Diesel locomotive, Electric locomotive" />
        <meta name="twitter:title" content="EMD Locomotive Engine Spare Parts - Suppliers &amp; Manufacturers in India" />
        <meta name="twitter:site" content="@epimech" />
        <meta name="twitter:creator" content="@epimech" />
        <meta name="format-detection" content="telephone= +91 7777992562" />
        <meta name="geo.placename" content="Gujarat" />
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.position" content="23.0225;72.5714" />
        <meta name="ICBM" content="23.0225, 72.5714" />
        <meta name="City" content="Ahmedabad" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "EPIMECH",
              "alternateName": "EPIMECH Solutions",
              "url": "https://epimech.com/",
              "logo": "https://epimech.com/logo.png",
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+91 7777992562",
                  "contactType": "sales",
                  "areaServed": ["US", "GB", "IN", "IR", "IQ", "IE", "NP", "NZ", "PK", "OM", "RU", "AE", "LK", "KR", "SA", "PE", "MX", "KG", "KW", "KE", "KZ", "HU", "HK", "CA"],
                  "availableLanguage": ["en", "Hindi"]
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+91 7777992562",
                  "contactType": "technical support",
                  "areaServed": ["US", "GB", "IN", "IR", "IQ", "IE", "NP", "NZ", "PK", "OM", "RU", "AE", "LK", "KR", "SA", "PE", "MX", "KG", "KW", "KE", "KZ", "HU", "HK", "CA"],
                  "availableLanguage": ["en", "Hindi"]
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+91 7777992562",
                  "contactType": "package tracking",
                  "areaServed": ["US", "GB", "IN", "IR", "IQ", "IE", "NP", "NZ", "PK", "OM", "RU", "AE", "LK", "KR", "SA", "PE", "MX", "KG", "KW", "KE", "KZ", "HU", "HK", "CA"],
                  "availableLanguage": ["en", "Hindi"]
                }
              ],
              "sameAs": [
                "https://www.facebook.com/epimech",
                "https://twitter.com/epimech",
                "https://www.linkedin.com/company/epimech",
                "https://epimech.com/"
              ]
            })
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PMG00CJ2ZV"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());

          gtag('config', 'G-PMG00CJ2ZV');
        </script>
        <meta name="robots" content="index, follow" />
        <meta name="generator" content="Next.js" />
        <meta charSet="UTF-8" />
      </head>
      <body className="antialiased custom-cursor outline-none">
        <NextTopLoader showSpinner={false} crawlSpeed={200} height={3} />
        <GlobalRightClickBlocker> {/* ✅ Wrap your app with this component */}
          <Toaster />
          <Navbar />
          <div className='pt-16'>
            {/* <CustomCursor /> ⬅ Add this here */}
            {children}
          </div>
          <Footer />
        </GlobalRightClickBlocker>
      </body>
    </html>
  );
}
