import RetailPageClient from "@/components/retail-page-client"
import { Suspense } from "react"

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <RetailPageClient />
    </Suspense>
  )
}
