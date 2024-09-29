import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Suspense } from 'react'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Git me up - GitHub Data Visualization',
  description: 'A GitHub data visualization app that tracks user activity and commit history.',
  keywords: 'GitHub, data visualization, commit history, user activity, open source',
  authors: [{ name: 'Inhye Jeong', url: 'https://github.com/InhyeJeong' }],
  openGraph: {
    title: 'Git me up - GitHub Data Visualization',
    description: 'A GitHub data visualization app that tracks user activity and commit history.',
    url: 'https://git-me-up-rho.vercel.app',
    siteName: 'Git me up',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  )
}
