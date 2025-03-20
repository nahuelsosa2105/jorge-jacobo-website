import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Definir las categorías válidas
const validCategories = ["calzado", "trabajo", "accesorios", "seguridad", "mujer"]

// Datos de ejemplo para productos
const products = [
  {
    id: 1,
    name: "Camisa STD de Trabajo",
    description: "Manga Larga",
    category: "trabajo",
    image: "/placeholder.svg?height=400&width=400",
    price: 15000,
  },
  {
    id: 2,
    name: "Camisa STD de Trabajo",
    description: "Manga Larga",
    category: "trabajo",
    image: "/placeholder.svg?height=400&width=400",
    price: 15000,
  },
  {
    id: 3,
    name: "Camisa STD de Trabajo",
    description: "Manga Larga",
    category: "trabajo",
    image: "/placeholder.svg?height=400&width=400",
    price: 15000,
  },
  {
    id: 4,
    name: "Camisa STD de Trabajo",
    description: "Manga Larga",
    category: "trabajo",
    image: "/placeholder.svg?height=400&width=400",
    price: 15000,
  },
  {
    id: 5,
    name: "Camisa STD de Trabajo",
    description: "Manga Larga",
    category: "trabajo",
    image: "/placeholder.svg?height=400&width=400",
    price: 15000,
  },
  {
    id: 6,
    name: "Camisa STD de Trabajo",
    description: "Manga Larga",
    category: "trabajo",
    image: "/placeholder.svg?height=400&width=400",
    price: 15000,
  },
]

// Datos de ejemplo para filtros
const brands = ["OMBU", "SANTISTA", "INTI", "MARCA 4", "MARCA 5"]
const sizes = ["38", "39", "40", "41", "42"]

export default function CategoryPage({ params }: { params: { category: string } }) {
  // Verificar si la categoría es válida
  if (!validCategories.includes(params.category)) {
    notFound()
  }

  // Filtrar productos por categoría
  const categoryProducts = products.filter((product) => product.category === params.category)

  // Convertir la primera letra a mayúscula para el título
  const categoryTitle = params.category.charAt(0).toUpperCase() + params.category.slice(1)

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">{categoryTitle.toUpperCase()}</h1>

      <div className="grid gap-8 md:grid-cols-[250px_1fr]">
        {/* Sidebar con filtros */}
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-4">CATEGORÍA</h3>
            <div className="space-y-2">
              {validCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={`category-${category}`} defaultChecked={category === params.category} />
                  <Label htmlFor={`category-${category}`} className="capitalize">
                    {category}
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
                  <Checkbox id={`brand-${brand}`} />
                  <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">TALLE</h3>
            <div className="space-y-2">
              {sizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox id={`size-${size}`} />
                  <Label htmlFor={`size-${size}`}>{size}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Listado de productos */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative h-64">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="outline" className="w-full">
                  VER MÁS
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

