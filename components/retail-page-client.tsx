"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { getProducts, getAllBrands, getAllSizes } from "@/lib/products"
import type { ProductCategory, ProductFilter } from "@/app/types/products"
import { MobileFilters } from "@/components/mobile-filters"
import { MapPin, Phone } from "lucide-react"

const categories: { id: ProductCategory; name: string }[] = [
  { id: "calzados", name: "CALZADOS" },
  { id: "trabajo", name: "TRABAJO" },
  { id: "campo", name: "CAMPO" },
  { id: "seguridad", name: "SEGURIDAD" },
]

const staticBrands = [
  { id: "ombu", name: "OMBU", image: "/ombu-logo.jpg" },
  { id: "santista", name: "SANTISTA", image: "/placeholder.svg?height=100&width=200" },
  { id: "inti", name: "INTI", image: "/placeholder.svg?height=100&width=200" },
]

export default function RetailPageClient() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)

  const availableBrands = getAllBrands()
  const availableSizes = getAllSizes()

  const filters = useMemo(() => {
    const f: ProductFilter = {}

    const category = searchParams.getAll("category")
    if (category.length > 0) f.category = category as ProductCategory[]

    const brand = searchParams.getAll("brand")
    if (brand.length > 0) f.brand = brand

    const size = searchParams.getAll("size")
    if (size.length > 0) f.size = size

    const minPrice = searchParams.get("minPrice")
    if (minPrice) f.minPrice = Number.parseInt(minPrice)

    const maxPrice = searchParams.get("maxPrice")
    if (maxPrice) f.maxPrice = Number.parseInt(maxPrice)

    return f
  }, [searchParams])

  const page = useMemo(() => {
    const p = searchParams.get("page")
    return p ? Number.parseInt(p) : 1
  }, [searchParams])

  const sort = useMemo(() => searchParams.get("sort") || "newest", [searchParams])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-12">TIENDA MINORISTA</h1>

      <div className="md:hidden mb-6">
        <MobileFilters categories={categories} brands={availableBrands} sizes={availableSizes} initialFilters={filters} />
      </div>

      <div className="grid gap-8 md:grid-cols-[250px_1fr]">
        <div className="hidden md:block">
          <ProductFilters categories={categories} brands={availableBrands} sizes={availableSizes} initialFilters={filters} />
        </div>

        <div className="space-y-8">
          {isLoading ? <ProductsGridSkeleton /> : <ClientProductsGrid filters={filters} page={page} sort={sort} />}

          <section className="container bg-muted py-12 rounded-lg">
                  <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">NUESTRAS MARCAS</h2>
                  <div className="flex flex-wrap justify-center gap-12">
                    <div className="bg-background p-6 rounded-lg shadow-sm">
                      <Image
                        src="/ombu-logo.jpg"
                        alt="OMBU"
                        width={150}
                        height={75}
                        className="object-contain"
                      />
                    </div>
                    {/* <div className="bg-background p-6 rounded-lg shadow-sm">
                      <Image
                        src="/placeholder.svg?height=100&width=200"
                        alt="SANTISTA"
                        width={150}
                        height={75}
                        className="object-contain"
                      />
                    </div>
                    <div className="bg-background p-6 rounded-lg shadow-sm">
                      <Image
                        src="/placeholder.svg?height=100&width=200"
                        alt="INTI"
                        width={150}
                        height={75}
                        className="object-contain"
                      />
                    </div> */}
                  </div>
                </section>

          <section className="mt-12 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-8">NUESTRAS TIENDAS</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <StoreCard
                title="SUCURSAL CÓRDOBA"
                address="Corrientes 473, Centro, X5000ANI Córdoba"
                phone="351-3804567"
                mapsUrl="https://maps.app.goo.gl/w7K5brAgAg2X8x3s6"
              />
              <StoreCard
                title="SUCURSAL VILLA MARÍA"
                address="José Ingenieros 340, X5900 Villa María, Córdoba"
                phone="353-4534674"
                mapsUrl="https://maps.app.goo.gl/QCXA5aCAJfCg52Xv8"
              />
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

function ClientProductsGrid({
  filters = {},
  page = 1,
  sort = "newest",
}: {
  filters?: ProductFilter
  page?: number
  sort?: string
}) {
  const [productsData, setProductsData] = useState<{ products: any[]; total: number; pages: number }>({
    products: [],
    total: 0,
    pages: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const data = await getProducts(filters, page, 12, sort)
        setProductsData(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [filters, page, sort])

  if (loading) return <ProductsGridSkeleton />

  if (productsData.products.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 bg-muted rounded-lg">
        <h3 className="text-lg font-medium">No se encontraron productos</h3>
        <p className="text-muted-foreground mt-2">Intenta con otros filtros o categorías</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
        <p className="text-sm sm:text-base text-muted-foreground">
          Mostrando {productsData.products.length} de {productsData.total} productos
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm">Ordenar por:</span>
          <select
            className="border rounded p-1 text-sm"
            defaultValue={sort}
            onChange={(e) => {
              const url = new URL(window.location.href)
              url.searchParams.set("sort", e.target.value)
              window.location.href = url.toString()
            }}
          >
            <option value="newest">Más recientes</option>
            <option value="price-low">Precio: menor a mayor</option>
            <option value="price-high">Precio: mayor a menor</option>
            <option value="name-asc">Nombre: A-Z</option>
            <option value="name-desc">Nombre: Z-A</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {productsData.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {productsData.pages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: productsData.pages }).map((_, i) => {
              const url = new URL(window.location.href)
              url.searchParams.set("page", (i + 1).toString())
              return (
                <a
                  key={i}
                  href={url.toString()}
                  className={`px-3 sm:px-4 py-2 rounded text-sm sm:text-base ${page === i + 1 ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
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

function StoreCard({
  title,
  address,
  phone,
  mapsUrl,
}: {
  title: string
  address: string
  phone: string
  mapsUrl: string
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>

        <div className="flex items-start gap-2 mb-4">
          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
          <p className="text-muted-foreground">{address}</p>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <Phone className="h-5 w-5 text-muted-foreground" />
          <p className="text-muted-foreground">{phone}</p>
        </div>

        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button variant="outline" className="w-full">
            ¿CÓMO LLEGAR?
          </Button>
        </a>
      </CardContent>
    </Card>
  )
}

function ProductsGridSkeleton() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-6 w-36 sm:w-48" />
        <Skeleton className="h-8 w-32 sm:w-40" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="relative h-56 sm:h-64">
              <Skeleton className="h-full w-full" />
            </div>
            <CardContent className="p-4">
              <Skeleton className="h-5 sm:h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <div className="flex justify-between mt-2">
                <Skeleton className="h-4 w-16 sm:w-20" />
                <Skeleton className="h-4 w-12 sm:w-16" />
              </div>
              <Skeleton className="h-9 sm:h-10 w-full mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
