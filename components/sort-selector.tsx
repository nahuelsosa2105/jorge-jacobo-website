"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

interface SortSelectorProps {
  currentSort: string
}

export function SortSelector({ currentSort }: SortSelectorProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", e.target.value)
    router.push(`/minorista?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">Ordenar por:</span>
      <select className="border rounded p-1 text-sm" value={currentSort} onChange={handleSortChange}>
        <option value="newest">Más recientes</option>
        <option value="price-low">Precio: menor a mayor</option>
        <option value="price-high">Precio: mayor a menor</option>
        <option value="name-asc">Nombre: A-Z</option>
        <option value="name-desc">Nombre: Z-A</option>
      </select>
    </div>
  )
}
