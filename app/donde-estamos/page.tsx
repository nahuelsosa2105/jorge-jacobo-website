import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone } from "lucide-react"

export default function LocationsPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-12">¿DONDE ESTAMOS?</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardContent className="p-0">
            <div className="relative h-64">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Mapa Sucursal Córdoba"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">SUCURSAL CORDOBA</h2>
              <div className="flex items-start gap-2 mb-4">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <p className="text-muted-foreground">Corrientes 473, Centro, X5000ANI Córdoba</p>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <p className="text-muted-foreground">351-4245041</p>
              </div>
              <Button variant="outline" className="w-full">
                ¿COMO LLEGAR?
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="relative h-64">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Mapa Sucursal Rio Cuarto"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">SUCURSAL RIO CUARTO</h2>
              <div className="flex items-start gap-2 mb-4">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <p className="text-muted-foreground">Corrientes 473, Centro, X5000ANI</p>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <p className="text-muted-foreground">351-4245041</p>
              </div>
              <Button variant="outline" className="w-full">
                ¿COMO LLEGAR?
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">HORARIOS DE ATENCIÓN</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">SUCURSAL CORDOBA</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Lunes a Viernes</span>
                  <span>9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábados</span>
                  <span>9:00 - 13:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingos</span>
                  <span>Cerrado</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">SUCURSAL RIO CUARTO</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Lunes a Viernes</span>
                  <span>9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábados</span>
                  <span>9:00 - 13:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingos</span>
                  <span>Cerrado</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

