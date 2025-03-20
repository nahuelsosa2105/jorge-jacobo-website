import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Categorías de productos
const categories = [
  {
    id: "calzado",
    name: "CALZADO",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "trabajo",
    name: "TRABAJO",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "accesorios",
    name: "ACCESORIOS",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "seguridad",
    name: "SEGURIDAD",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "mujer",
    name: "MUJER",
    image: "/placeholder.svg?height=400&width=400",
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

export default function RetailPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-12">TIENDA MINORISTA</h1>

      {/* Categorías */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">PRODUCTOS</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <Card key={category.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <Link href={`/productos/${category.id}`} className="text-lg font-semibold hover:underline">
                  {category.name}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Productos destacados */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">PRODUCTOS DESTACADOS</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt={`Producto destacado ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold">Camisa STD de Trabajo</h3>
                <p className="text-sm text-muted-foreground">Manga Larga</p>
                <Button variant="outline" className="w-full mt-4">
                  VER MÁS
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Marcas */}
      <section className="mb-16">
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
      <section>
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
  )
}

