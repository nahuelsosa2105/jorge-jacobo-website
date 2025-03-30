import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Product } from "@/app/types/products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-64">
        <Image 
          src={product.image || "/placeholder.svg"} 
          alt={product.name} 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
      </div>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm font-medium">{product.brand}</p>
          {product.price && (
            <p className="font-semibold">${product.price.toLocaleString()}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/productos/${product.category}/${product.id}`}>VER MÁS</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}