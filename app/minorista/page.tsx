import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { getProducts, getAllBrands, getAllSizes } from "@/lib/products"
import type { ProductCategory, ProductFilter } from "@/app/types/products"
import { SortSelector } from "@/components/sort-selector"

// Categorías de productos
const categories: { id: ProductCategory; name: string }[] = [
  {
    id: "calzados",
    name: "CALZADOS",
  },
  {
    id: "trabajo",
    name: "TRABAJO",
  },
  {
    id: "campo",
    name: "CAMPO",
  },
  {
    id: "seguridad",
    name: "SEGURIDAD",
  },
]

// Marcas
const brands = [
  {
    id: "ombu",
    name: "OMBU",
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "santista",
    name: "SANTISTA",
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "inti",
    name: "INTI",
    image: "/placeholder.svg?height=100&width=200",
  },
]

// Convertimos la función en asíncrona para poder esperar searchParams
export default async function RetailPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Preparar los filtros desde los parámetros de búsqueda
  const filters: ProductFilter = {}

  // Categorías
  if (searchParams.category) {
    filters.category = Array.isArray(searchParams.category)
      ? (searchParams.category as ProductCategory[])
      : [searchParams.category as ProductCategory]
  }

  // Marcas
  if (searchParams.brand) {
    filters.brand = Array.isArray(searchParams.brand) ? searchParams.brand : [searchParams.brand]
  }

  // Tallas
  if (searchParams.size) {
    filters.size = Array.isArray(searchParams.size) ? searchParams.size : [searchParams.size]
  }

  // Precio mínimo
  if (searchParams.minPrice && typeof searchParams.minPrice === "string") {
    filters.minPrice = Number.parseInt(searchParams.minPrice)
  }

  // Precio máximo
  if (searchParams.maxPrice && typeof searchParams.maxPrice === "string") {
    filters.maxPrice = Number.parseInt(searchParams.maxPrice)
  }

  // Obtener la página actual
  const page = searchParams.page && typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1

  // Obtener el orden
  const sort = searchParams.sort && typeof searchParams.sort === "string" ? searchParams.sort : "newest"

  // Obtener todas las marcas y tallas disponibles
  const availableBrands = getAllBrands()
  const availableSizes = getAllSizes()

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-12">TIENDA MINORISTA</h1>

      <div className="grid gap-8 md:grid-cols-[250px_1fr]">
        {/* Sidebar con filtros */}
        <div>
          <ProductFilters
            categories={categories}
            brands={availableBrands}
            sizes={availableSizes}
            initialFilters={filters}
          />
        </div>

        {/* Contenido principal */}
        <div className="space-y-8">
          {/* Productos */}
          <Suspense fallback={<ProductsGridSkeleton />}>
            <ProductsGrid filters={filters} page={page} sort={sort} />
          </Suspense>

          {/* Marcas */}
          <section className="mt-16">
            <h2 className="text-2xl font-semibold mb-8">NUESTRAS MARCAS</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {brands.map((brand) => (
                <div key={brand.id} className="bg-muted p-6 rounded-lg">
                  <Image
                    src={brand.image || "/placeholder.svg"}
                    alt={brand.name}
                    width={150}
                    height={75}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Ubicaciones */}
          <section className="mt-16">
            <h2 className="text-2xl font-semibold mb-8">NUESTRAS TIENDAS</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">SUCURSAL CORDOBA</h3>
                  <p className="text-muted-foreground mb-4">Corrientes 473, Centro, X5000ANI Córdoba</p>
                  <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Mapa Sucursal Córdoba"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Button variant="outline" className="w-full">
                    ¿COMO LLEGAR?
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">SUCURSAL RIO CUARTO</h3>
                  <p className="text-muted-foreground mb-4">Corrientes 473, Centro, X5000ANI</p>
                  <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Mapa Sucursal Rio Cuarto"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Button variant="outline" className="w-full">
                    ¿COMO LLEGAR?
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

// Componente para cargar productos


// Componente para cargar productos
async function ProductsGrid({ 
  filters = {},
  page = 1,
  sort = 'newest'
}: { 
  filters?: ProductFilter,
  page?: number,
  sort?: string
}) {
  const { products, total, pages } = await getProducts(filters, page, 12, sort)
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-muted rounded-lg">
        <h3 className="text-lg font-medium">No se encontraron productos</h3>
        <p className="text-muted-foreground mt-2">Intenta con otros filtros o categorías</p>
      </div>
    )
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Mostrando {products.length} de {total} productos</p>
        <SortSelector currentSort={sort} />
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* Paginación */}
      {pages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {Array.from({ length: pages }).map((_, i) => {
              // Crear una nueva URL con los parámetros actuales
              const url = new URL(window.location.href)
              url.searchParams.set('page', (i + 1).toString())
              
              return (
                <a 
                  key={i} 
                  href={url.toString()}
                  className={`px-4 py-2 rounded ${page === i + 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                >
                  {i + 1}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// Skeleton para carga de productos
function ProductsGridSkeleton() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-8 w-40" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="relative h-64">
              <Skeleton className="h-full w-full" />
            </div>
            <CardContent className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <div className="flex justify-between mt-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-10 w-full mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}