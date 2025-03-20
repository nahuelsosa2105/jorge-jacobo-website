import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos de ejemplo para un producto
const product = {
  id: 1,
  name: "Camisa STD de Trabajo",
  description: "Manga Larga",
  category: "trabajo",
  brand: "OMBU",
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  price: 15000,
  sizes: ["38", "39", "40", "41", "42"],
  colors: ["Azul", "Negro", "Gris"],
  details:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consectetur libero augue, id rutrum justo bibendum tincidunt. Nullam auctor lacinia risus vitae malesuada.",
  features: ["100% algodón", "Resistente al desgaste", "Doble costura", "Bolsillos frontales"],
}

export default function ProductPage({ params }: { params: { category: string; id: string } }) {
  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Galería de imágenes */}
        <div className="space-y-4">
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <div key={index} className="relative h-24 overflow-hidden rounded-lg border cursor-pointer">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Vista ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-lg">{product.description}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">TALLE</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <Button key={size} variant="outline" className="h-10 w-10">
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">COLOR</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <Button key={color} variant="outline">
                  {color}
                </Button>
              ))}
            </div>
          </div>

          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Detalles</TabsTrigger>
              <TabsTrigger value="features">Características</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="p-4 border rounded-md mt-2">
              <p>{product.details}</p>
            </TabsContent>
            <TabsContent value="features" className="p-4 border rounded-md mt-2">
              <ul className="list-disc pl-5 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>

          <Button size="lg" className="w-full">
            CONTACTAR PARA COMPRAR
          </Button>
        </div>
      </div>
    </div>
  )
}

