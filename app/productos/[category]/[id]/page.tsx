import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getProductById } from "@/lib/products"
import ProductDetail from "./product-detail"

// Componente servidor que carga los datos
export default async function ProductPage({ params }: { params: { category: string; id: string } }) {
  // Obtener el producto desde el servidor
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id)

  // Si no se encuentra el producto, mostrar 404 (esto ocurre en el servidor)
  if (!product) {
    notFound()
  }

  // Renderizar el componente cliente con los datos del producto
  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductDetail product={product} />
    </Suspense>
  )
}

// Componente de carga
function ProductLoading() {
  return (
    <div className="container py-8">
      <div className="flex justify-center items-center h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    </div>
  )
}

