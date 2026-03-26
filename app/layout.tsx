import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HireXelence - Specialised in Hiring Excellence',
  description: 'HireXelence is a trusted human resource partner, connecting top talent with leading companies across various industries. Expert recruitment services for your business growth.',
  icons: {
    icon: '/images/hirexelence-logo.png',
    shortcut: '/images/hirexelence-logo.png',
    apple: '/images/hirexelence-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="overflow-x-hidden w-full">
          {children}
        </div>
      </body>
    </html>
  )
}
