"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ProductFilters } from "@/components/product-filters"
import { Filter, SlidersHorizontal } from "lucide-react"
import type { ProductCategory, ProductFilter } from "@/app/types/products"

interface MobileFiltersProps {
  categories: { id: ProductCategory; name: string }[]
  brands: string[]
  sizes: string[]
  initialFilters?: ProductFilter
}

export function MobileFilters({ categories, brands, sizes, initialFilters = {} }: MobileFiltersProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          <Filter className="h-4 w-4" />
          <span>Filtros</span>
          <SlidersHorizontal className="h-4 w-4 ml-auto" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85vw] sm:w-[350px] pt-6">
        <SheetHeader className="mb-5">
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>Filtra los productos por categoría, marca, talla y más.</SheetDescription>
        </SheetHeader>
        <div className="overflow-y-auto max-h-[calc(100vh-120px)] pb-8">
          <ProductFilters
            categories={categories}
            brands={brands}
            sizes={sizes}
            initialFilters={initialFilters}
            onFilterApplied={() => setOpen(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
