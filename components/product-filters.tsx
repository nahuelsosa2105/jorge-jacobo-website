"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import type { ProductCategory, ProductFilter } from "@/app/types/products"

interface ProductFiltersProps {
  categories: { id: ProductCategory; name: string }[]
  brands: string[]
  sizes: string[]
  initialFilters?: ProductFilter
  onFilterApplied?: () => void // Callback para cuando se aplica un filtro (útil para cerrar el menú móvil)
}

export function ProductFilters({
  categories,
  brands,
  sizes,
  initialFilters = {},
  onFilterApplied,
}: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<ProductFilter>(initialFilters)

  // Usamos useRef para evitar actualizaciones infinitas
  const isInitialMount = useRef(true)
  const prevSearchParams = useRef(searchParams)

  // Inicializar filtros desde URL solo en el montaje inicial
  useEffect(() => {
    if (isInitialMount.current) {
      const urlFilters: ProductFilter = {}

      // Categorías
      const categoryParam = searchParams.getAll("category")
      if (categoryParam.length > 0) {
        urlFilters.category = categoryParam as ProductCategory[]
      }

      // Marcas
      const brandParam = searchParams.getAll("brand")
      if (brandParam.length > 0) {
        urlFilters.brand = brandParam
      }

      // Tallas
      const sizeParam = searchParams.getAll("size")
      if (sizeParam.length > 0) {
        urlFilters.size = sizeParam
      }

      // Precio mínimo
      const minPriceParam = searchParams.get("minPrice")
      if (minPriceParam) {
        urlFilters.minPrice = Number.parseInt(minPriceParam)
      }

      // Precio máximo
      const maxPriceParam = searchParams.get("maxPrice")
      if (maxPriceParam) {
        urlFilters.maxPrice = Number.parseInt(maxPriceParam)
      }

      setFilters(urlFilters)
      isInitialMount.current = false
    }
  }, [searchParams])

  // Función para actualizar los filtros
  const updateFilters = useCallback(
    (newFilters: ProductFilter) => {
      setFilters(newFilters)

      // Construir nueva URL con los filtros
      const params = new URLSearchParams()

      // Añadir categorías
      if (newFilters.category && newFilters.category.length > 0) {
        newFilters.category.forEach((cat) => params.append("category", cat))
      }

      // Añadir marcas
      if (newFilters.brand && newFilters.brand.length > 0) {
        newFilters.brand.forEach((brand) => params.append("brand", brand))
      }

      // Añadir tallas
      if (newFilters.size && newFilters.size.length > 0) {
        newFilters.size.forEach((size) => params.append("size", size))
      }

      // Añadir precio mínimo
      if (newFilters.minPrice !== undefined) {
        params.set("minPrice", newFilters.minPrice.toString())
      }

      // Añadir precio máximo
      if (newFilters.maxPrice !== undefined) {
        params.set("maxPrice", newFilters.maxPrice.toString())
      }

      // Mantener la página actual si existe
      const page = searchParams.get("page")
      if (page) {
        params.set("page", page)
      }

      // Mantener el orden actual si existe
      const sort = searchParams.get("sort")
      if (sort) {
        params.set("sort", sort)
      }

      // Actualizar la URL
      router.push(`/minorista?${params.toString()}`)

      // Llamar al callback si existe
      if (onFilterApplied) {
        onFilterApplied()
      }
    },
    [router, searchParams, onFilterApplied],
  )

  // Manejadores para cada tipo de filtro
  const handleCategoryChange = (category: ProductCategory, checked: boolean) => {
    const newCategories = [...(filters.category || [])]

    if (checked) {
      if (!newCategories.includes(category)) {
        newCategories.push(category)
      }
    } else {
      const index = newCategories.indexOf(category)
      if (index !== -1) {
        newCategories.splice(index, 1)
      }
    }

    updateFilters({ ...filters, category: newCategories.length > 0 ? newCategories : undefined })
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = [...(filters.brand || [])]

    if (checked) {
      if (!newBrands.includes(brand)) {
        newBrands.push(brand)
      }
    } else {
      const index = newBrands.indexOf(brand)
      if (index !== -1) {
        newBrands.splice(index, 1)
      }
    }

    updateFilters({ ...filters, brand: newBrands.length > 0 ? newBrands : undefined })
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = [...(filters.size || [])]

    if (checked) {
      if (!newSizes.includes(size)) {
        newSizes.push(size)
      }
    } else {
      const index = newSizes.indexOf(size)
      if (index !== -1) {
        newSizes.splice(index, 1)
      }
    }

    updateFilters({ ...filters, size: newSizes.length > 0 ? newSizes : undefined })
  }

  const handleClearFilters = () => {
    updateFilters({})
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Filtros</h3>
          <Button variant="ghost" size="sm" onClick={handleClearFilters} className="h-8 text-sm">
            Limpiar
          </Button>
        </div>
        <Separator className="my-4" />
      </div>

      <div>
        <h3 className="font-semibold mb-4">CATEGORÍA</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={filters.category?.includes(category.id) || false}
                onCheckedChange={(checked) => handleCategoryChange(category.id, checked === true)}
              />
              <Label htmlFor={`category-${category.id}`} className="capitalize cursor-pointer">
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">MARCA</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brand?.includes(brand) || false}
                onCheckedChange={(checked) => handleBrandChange(brand, checked === true)}
              />
              <Label htmlFor={`brand-${brand}`} className="cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">TALLE</h3>
        <div className="space-y-2">
          {sizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={filters.size?.includes(size) || false}
                onCheckedChange={(checked) => handleSizeChange(size, checked === true)}
              />
              <Label htmlFor={`size-${size}`} className="cursor-pointer">
                {size}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
