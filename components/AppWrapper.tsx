'use client'

import { CartProvider } from '@/app/context/CartContext'
import Header from '@/components/header'

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      {children}
    </CartProvider>
  )
}
