"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/app/context/CartContext"; // Importamos el hook del carrito

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, removeItem } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black text-white">
      <div className="container flex h-16 items-center justify-between relative">
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

          {/* Icono carrito desktop */}
          <button
            onClick={toggleCart}
            aria-label="Toggle cart"
            className="relative ml-4 p-2 hover:text-primary transition-colors"
          >
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full px-2 text-xs">
                {totalItems}
              </span>
            )}
          </button>
        </nav>

        {/* Iconos menu y carrito mobile */}
        <div className="flex items-center md:hidden space-x-4">
          <button
            onClick={toggleCart}
            aria-label="Toggle cart"
            className="relative p-2 hover:text-primary transition-colors"
          >
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full px-2 text-xs">
                {totalItems}
              </span>
            )}
          </button>

          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "container md:hidden overflow-hidden transition-all duration-300",
          isMenuOpen ? "max-h-64" : "max-h-0"
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

      {/* Panel carrito */}
      {isCartOpen && (
        <div className="fixed top-16 right-4 z-50 w-80 max-h-[70vh] overflow-auto bg-white text-black rounded shadow-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Carrito</h2>
          {cartItems.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            <ul className="space-y-2">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Cantidad: {item.quantity}
                      {item.size && ` - Talle: ${item.size}`}
                      {item.color && ` - Color: ${item.color}`}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:underline ml-2"
                    aria-label={`Eliminar ${item.name} del carrito`}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
          <Button
            onClick={() => {
              setIsCartOpen(false);
              window.location.href = "/carrito";
            }}
            className="mt-4 w-full"
          >
            Ver carrito completo
          </Button>
          <button
            onClick={() => setIsCartOpen(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>
      )}
    </header>
  );
}
