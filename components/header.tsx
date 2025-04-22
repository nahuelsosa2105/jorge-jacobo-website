"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black text-white">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Juan Jorge Jacobo E Hijos S.A.</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/mayorista" className="text-sm font-medium transition-colors hover:text-primary">
            MAYORISTA
          </Link>
          <Link href="/minorista" className="text-sm font-medium transition-colors hover:text-primary">
            MINORISTA
          </Link>
          <Link href="/quienes-somos" className="text-sm font-medium transition-colors hover:text-primary">
            ¿QUIENES SOMOS?
          </Link>
          <Link href="/contacto" className="text-sm font-medium transition-colors hover:text-primary">
            CONTACTO
          </Link>
        </nav>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "container md:hidden overflow-hidden transition-all duration-300",
          isMenuOpen ? "max-h-64" : "max-h-0",
        )}
      >
        <nav className="flex flex-col space-y-4 py-4">
          <Link
            href="/mayorista"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            MAYORISTA
          </Link>
          <Link
            href="/minorista"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            MINORISTA
          </Link>
          <Link
            href="/quienes-somos"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            ¿QUIENES SOMOS?
          </Link>
          <Link
            href="/contacto"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            CONTACTO
          </Link>
        </nav>
      </div>
    </header>
  )
}

