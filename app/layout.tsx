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
  title: 'Cofetăria Zaha - Delicii Artizanale în București',
  description: 'Descoperă gusturile autentice ale Cofetăriei Zaha din București. Torturi personalizate, prăjituri artizanale și dulciuri de casă preparate cu pasiune și ingrediente de calitate superioară.',
  keywords: 'cofetărie București, torturi personalizate, prăjituri artizanale, dulciuri de casă, Cofetăria Zaha, Șoseaua Ștefan cel Mare',
  authors: [{ name: 'Cofetăria Zaha' }],
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
    title: 'Cofetăria Zaha - Delicii Artizanale în București',
    description: 'Descoperă gusturile autentice ale Cofetăriei Zaha din București. Torturi personalizate, prăjituri artizanale și dulciuri de casă.',
    url: 'https://cofetaria-zaha.ro',
    siteName: 'Cofetăria Zaha',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cofetăria Zaha - Delicii Artizanale',
      },
    ],
    locale: 'ro_RO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cofetăria Zaha - Delicii Artizanale în București',
    description: 'Descoperă gusturile autentice ale Cofetăriei Zaha din București.',
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
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
