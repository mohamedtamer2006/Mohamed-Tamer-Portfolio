import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import { ScrollProgress, SparkCursor } from '@/components/sparks'
import { ThemeProvider } from '@/components/theme-provider'
import { AnalyticsTracker } from '@/components/analytics-tracker'
import './globals.css'

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mohamed Tamer — AI / ML / Software Engineer',
  description:
    'I design and build AI-powered products: RAG systems, ML models, and production-ready FastAPI backends. Available for freelance projects and internships.',
  generator: 'v0.app',
  keywords: [
    'Mohamed Tamer',
    'AI Engineer',
    'ML Engineer',
    'Software Engineer',
    'RAG',
    'FastAPI',
    'Upwork freelancer',
    'Cairo University',
  ],
  openGraph: {
    title: 'Mohamed Tamer — AI / ML / Software Engineer',
    description: 'RAG systems, ML models, and production-ready backends. Let’s build something heroic.',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f4ef' },
    { media: '(prefers-color-scheme: dark)', color: '#060a14' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bebas.variable} ${inter.variable}`}>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <AnalyticsTracker />
          <ScrollProgress />
          <SparkCursor />
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
