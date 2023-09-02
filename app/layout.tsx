import ActiveStatus from './components/ActiveStatus'
import AuthContext from './context/AuthContext'
import ToasterContext from './context/ToasterContext'

import './globals.css'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Webloom Messenger',
  description: 'Webloom messenger app for webloom team',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
        <script src="https://app.wotnot.io/chat-widget/7CPKM26GEVoA102959254421VY1grdOi.js" defer></script>
      </body>
    </html>
  )
}
