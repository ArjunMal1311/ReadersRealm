import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getCurrentUser } from './actions/getCurrentUser'
import Navbar from './components/Navbar/Nav'
import { TProvider } from "./components/toast-provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ReadersRealm'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <TProvider />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  )
}
