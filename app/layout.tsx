import type { Metadata } from 'next'
import { Playfair_Display, Inter, Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cofetăria Zaha Sector 2 București | Torturi Personalizate & Prăjituri Artizanale',
  description: 'Cofetăria Zaha din Sector 2 București - torturi personalizate pentru nuntă, botez, aniversare. Prăjituri artizanale, dulciuri de casă, catering evenimente. Șoseaua Ștefan cel Mare 12. Comandă online!',
  keywords: 'cofetărie Sector 2 București, torturi personalizate București, prăjituri artizanale Sector 2, dulciuri de casă București, tort de nuntă București, tort de botez Sector 2, catering evenimente București, Cofetăria Zaha, Șoseaua Ștefan cel Mare, comandă tort online București, prăjituri tradiționale românești, torturi cu fondant București, ecler București, tiramisu Sector 2, papanași București, clătite cu dulceață, comandă online cofetărie București',
  authors: [{ name: 'Cofetăria Zaha Sector 2' }],
  creator: 'Cofetăria Zaha',
  publisher: 'Cofetăria Zaha',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cofetaria-zaha.ro'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Cofetăria Zaha Sector 2 București | Torturi Personalizate & Prăjituri Artizanale',
    description: 'Cofetăria Zaha din Sector 2 București - torturi personalizate pentru nuntă, botez, aniversare. Prăjituri artizanale, dulciuri de casă, catering evenimente. Comandă online!',
    url: 'https://cofetaria-zaha.ro',
    siteName: 'Cofetăria Zaha Sector 2',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cofetăria Zaha Sector 2 București - Torturi Personalizate',
      },
    ],
    locale: 'ro_RO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cofetăria Zaha Sector 2 București | Torturi Personalizate',
    description: 'Cofetăria Zaha din Sector 2 București - torturi personalizate, prăjituri artizanale, dulciuri de casă. Comandă online!',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  other: {
    'geo.region': 'RO-B',
    'geo.placename': 'București',
    'geo.position': '44.4268;26.1025',
    'ICBM': '44.4268, 26.1025',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro" className={`${playfair.variable} ${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#05ddf4" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
              <body className={`${inter.className} antialiased`}>
                {/* Structured Data for Local Business */}
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "Bakery",
                      "name": "Cofetăria Zaha",
                      "description": "Cofetărie Sector 2 București - torturi personalizate, prăjituri artizanale și dulciuri de casă",
                      "url": "https://cofetaria-zaha.ro",
                      "telephone": "+40731195126",
                      "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Șoseaua Ștefan cel Mare 12",
                        "addressLocality": "București",
                        "addressRegion": "Sector 2",
                        "postalCode": "020141",
                        "addressCountry": "RO"
                      },
                      "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": "44.4268",
                        "longitude": "26.1025"
                      },
                      "openingHours": "Mo-Sa 08:00-20:00",
                      "priceRange": "$$",
                      "servedCuisine": "Romanian Pastry",
                      "hasMap": "https://maps.google.com/?q=44.4268,26.1025",
                      "sameAs": [
                        "https://www.facebook.com/cofetariazaha",
                        "https://www.instagram.com/cofetariazaha"
                      ],
                      "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "reviewCount": "150"
                      },
                      "areaServed": {
                        "@type": "City",
                        "name": "București",
                        "containedInPlace": {
                          "@type": "AdministrativeArea",
                          "name": "Sector 2"
                        }
                      }
                    })
                  }}
                />
                <Header />
                <main className="min-h-screen">
                  {children}
                </main>
                <Footer />
              </body>
    </html>
  )
}
