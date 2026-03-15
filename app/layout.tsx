import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/context/CartContext'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: 'Giggling Paws & Pets - Quality Pet Products & Care',
  description: 'A company designed specifically to enhance the nurturing and loving care between Pets and Pet Parents throughout the world.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
