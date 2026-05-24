import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Display: Cormorant Garamond — arquitetônico, elegante
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})

// Body: DM Sans — clean, moderno
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
})

// Mono: JetBrains Mono — técnico, preciso
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'SM Empreiteiras — Showroom Arquitetônico',
  description:
    'Visualize e configure seu projeto residencial em 3D. Engenharia de alto padrão, acabamento impecável.',
}

export const viewport: Viewport = {
  themeColor: '#04040A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${jetbrains.variable} font-sans antialiased overflow-x-hidden`}
        style={{ background: '#04040A' }}
      >
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
