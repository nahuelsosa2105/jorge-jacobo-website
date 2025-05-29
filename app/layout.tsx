import './globals.css'
import { Inter } from 'next/font/google'
import AppWrapper from '@/components/AppWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Juan Jorge Jacobo E Hijos S.A.',
  description: 'Sitio Web Oficial',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}
