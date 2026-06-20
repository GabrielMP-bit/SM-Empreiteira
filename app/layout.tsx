import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Fonte geométrica próxima da identidade da logo SM.
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
})

// Mono: JetBrains Mono — técnico, preciso
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

const themeCss = `
:root {
  --surface-hero: linear-gradient(180deg, #04040A 0%, #06060C 100%);
  --surface-showroom: #06060A;
  --surface-features: linear-gradient(180deg, #09090E 0%, #07070C 100%);
  --surface-process: #07070C;
  --surface-cta: linear-gradient(180deg, #07070C 0%, #050508 100%);
  --surface-footer: #050508;
  --card-soft: rgba(255,255,255,0.016);
  --card-soft-strong: rgba(255,255,255,0.025);
  --subtle-border: rgba(255,255,255,0.05);
  --nav-bg-scrolled: rgba(6,6,10,0.92);
  --nav-bg-top: linear-gradient(180deg, rgba(4,4,10,0.75), transparent);
  --nav-border: rgba(255,255,255,0.05);
  --bottom-nav-bg: rgba(6,6,10,0.90);
  --hero-glow: rgba(201,162,39,0.055);
  --grid-line: rgba(201,162,39,0.30);
  --viewer-bg: #06070D;
  --viewer-grid: rgba(201,162,39,0.18);
}

html.light {
  color-scheme: light;
  --gold: #F6A623;
  --gold-2: #FFB547;
  --gold-3: #FFD27A;
  --ink: #0B4F93;
  --ink-2: #EAF3FF;
  --ink-3: #D9EAFB;
  --background: #F7FAFF;
  --foreground: #0B4F93;
  --card-bg: rgba(255,255,255,0.88);
  --primary: #F6A623;
  --primary-foreground: #0B4F93;
  --border: rgba(11,79,147,0.14);
  --ring: #F6A623;
  --surface-hero: linear-gradient(180deg, #FFFFFF 0%, #EAF4FF 100%);
  --surface-showroom: linear-gradient(180deg, #F8FBFF 0%, #EDF6FF 100%);
  --surface-features: linear-gradient(180deg, #EDF6FF 0%, #F8FBFF 100%);
  --surface-process: #F8FBFF;
  --surface-cta: linear-gradient(180deg, #F8FBFF 0%, #EAF4FF 100%);
  --surface-footer: #FFFFFF;
  --card-soft: rgba(255,255,255,0.72);
  --card-soft-strong: rgba(255,255,255,0.86);
  --subtle-border: rgba(11,79,147,0.14);
  --nav-bg-scrolled: rgba(255,255,255,0.88);
  --nav-bg-top: linear-gradient(180deg, rgba(255,255,255,0.82), transparent);
  --nav-border: rgba(11,79,147,0.12);
  --bottom-nav-bg: rgba(255,255,255,0.90);
  --hero-glow: rgba(246,166,35,0.18);
  --grid-line: rgba(11,79,147,0.12);
  --viewer-bg: #F4F8FF;
  --viewer-grid: rgba(11,79,147,0.12);
}

html.light [class*="text-white"] { color: rgba(11,79,147,0.70) !important; }
html.light .text-white\\/90,
html.light .text-white\\/88,
html.light .text-white\\/85,
html.light .text-white\\/80,
html.light .text-white\\/76,
html.light .text-white\\/72,
html.light .text-white\\/70 { color: rgba(11,79,147,0.92) !important; }
html.light .text-white\\/60,
html.light .text-white\\/55,
html.light .text-white\\/50,
html.light .text-white\\/48,
html.light .text-white\\/46,
html.light .text-white\\/42,
html.light .text-white\\/40,
html.light .text-white\\/36,
html.light .text-white\\/35,
html.light .text-white\\/34 { color: rgba(11,79,147,0.66) !important; }
html.light .text-white\\/30,
html.light .text-white\\/28,
html.light .text-white\\/25,
html.light .text-white\\/22,
html.light .text-white\\/20,
html.light .text-white\\/15 { color: rgba(11,79,147,0.46) !important; }
html.light [class*="border-white"] { border-color: rgba(11,79,147,0.14) !important; }
html.light [class*="bg-white/"] { background-color: rgba(11,79,147,0.04) !important; }
.brand-logo-card { background: rgba(255,255,255,0.02); }
.brand-logo-light { display: none; }
.brand-logo-dark { display: block; }
html.light .brand-logo-card { background: rgba(255,255,255,0.95); }
html.light .brand-logo-light { display: block; }
html.light .brand-logo-dark { display: none; }
`

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
        className={`${montserrat.variable} ${jetbrains.variable} font-sans antialiased overflow-x-hidden`}
        style={{ background: 'var(--background)' }}
      >
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
