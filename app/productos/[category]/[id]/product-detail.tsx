"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Product } from "@/app/types/products"
import { useCart } from "@/app/context/CartContext"

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const { addItem } = useCart()
  const router = useRouter()

  const generateWhatsAppLink = () => {
    const phoneNumber = "+5493513804567"
    let message = `Hola, estoy interesado en el producto: ${product.name}`
    if (product.price) message += `\nPrecio: $${product.price.toLocaleString()}`
    if (selectedSize) message += `\nTalle seleccionado: ${selectedSize}`
    if (selectedColor) message += `\nColor seleccionado: ${selectedColor}`
    message += `\nReferencia: ${product.id}`
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  }

  const handleContactClick = () => {
    const whatsappUrl = generateWhatsAppLink()
    window.open(whatsappUrl, "_blank")
  }

  const handleAddToCart = () => {
    if ((product.sizes?.length && !selectedSize) || (product.colors?.length && !selectedColor)) {
      alert("Por favor selecciona un talle y/o color.")
      return
    }

    if (!product.price) {
      alert("Este producto no tiene un precio definido.")
      return
    }

    if (!product.image) {
      alert("Este producto no tiene una imagen definida.")
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize ?? undefined,
      color: selectedColor ?? undefined,
      quantity: 1,
    })
    alert("Producto agregado al carrito")
  }

  return (
    <div className="container py-8">
      {/* Botón para volver */}
      <Button
  onClick={() => router.push("/minorista")}
  className="mb-6 bg-black text-white hover:bg-zinc-800 transition duration-200 transform hover:scale-105"
>
  ← Volver
</Button>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Galería */}
        <div className="space-y-4">
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <Image
              src={product.images?.[0] || product.image}
              alt={product.name}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <div key={index} className="relative h-24 overflow-hidden rounded-lg border cursor-pointer">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Vista ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 16vw"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-lg">{product.description}</p>
            {product.price && <p className="text-2xl font-bold mt-2">${product.price.toLocaleString()}</p>}
          </div>

          {(product.sizes ?? []).length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">TALLE</h3>
              <div className="flex flex-wrap gap-2">
                {(product.sizes ?? []).map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    className="h-10 w-10"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {(product.colors ?? []).length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">COLOR</h3>
              <div className="flex flex-wrap gap-2">
                {(product.colors ?? []).map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Detalles</TabsTrigger>
              <TabsTrigger value="features">Características</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="p-4 border rounded-md mt-2">
              <p>{product.description}</p>
            </TabsContent>
            <TabsContent value="features" className="p-4 border rounded-md mt-2">
              {(product.features ?? []).length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {(product.features ?? []).map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              ) : (
                <p>No hay características específicas disponibles para este producto.</p>
              )}
            </TabsContent>
          </Tabs>

          {/* Botones */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Button
              size="lg"
              className="w-full bg-primary text-white"
              onClick={handleAddToCart}
            >
              AGREGAR AL CARRITO
            </Button>

            <Button
              size="lg"
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white flex items-center gap-2 justify-center"
              onClick={handleContactClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M12 0C5.37 0 0 5.373 0 12c0 2.12.554 4.105 1.52 5.832L0 24l6.334-1.658C8.09 23.44 9.997 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.507 17.59c-.229.643-1.336 1.207-1.847 1.284-.473.07-1.063.1-1.714-.112-2.79-.887-4.61-3.272-4.746-3.428-.14-.156-1.134-1.504-1.134-2.87 0-1.367.716-2.041.968-2.304.229-.238.61-.347.968-.347.118 0 .229.006.33.012.289.012.434.02.626.489.229.577.778 1.991.846 2.134.07.141.117.306.023.489-.094.183-.14.283-.276.437-.141.165-.296.37-.425.497-.141.14-.288.294-.125.577.164.283.725 1.2 1.555 1.942 1.067.951 1.97 1.25 2.254 1.39.283.141.45.118.615-.07.164-.188.708-.825.898-1.106.188-.282.377-.235.63-.141.252.094 1.596.752 1.87.888.276.141.46.212.528.33.07.118.07.683-.158 1.325z" />
              </svg>
              CONTACTAR PARA COMPRAR
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
