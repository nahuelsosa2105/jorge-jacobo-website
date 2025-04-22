import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-8">
      {/* Hero Section */}
      <section className="container">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Juan Jorge Jacobo E Hijos S.A.</h1>
            <p className="text-muted-foreground text-lg">
              Especialistas en ropa de trabajo y calzado de calidad para profesionales.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg">
                <Link href="/contacto">QUIERO CONTACTAR</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <Image
              src="/refe familia industria 2,45x2.png"
              alt="Jorge Jacobo E Hijos"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container">
        <h2 className="text-3xl font-bold tracking-tighter mb-8">PRODUCTOS</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <CategoryCard title="CALZADO" href="/productos/calzado" imageSrc="/fondo-calzado.jpg" />
          <CategoryCard title="TRABAJO" href="/productos/trabajo" imageSrc="/refe familia industria 2,45x2.png" />
          <CategoryCard title="ACCESORIOS" href="/productos/accesorios" imageSrc="/fondo-accesorios.jpg" />
          <CategoryCard title="SEGURIDAD" href="/productos/seguridad" imageSrc="/equipamiento-y-seguridad.jpg" />
        </div>
      </section>

      {/* Brands Section */}
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
          <div className="bg-background p-6 rounded-lg shadow-sm">
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
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="container">
        <h2 className="text-3xl font-bold tracking-tighter mb-8">¿DONDE ESTAMOS?</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <LocationCard title="SUCURSAL CORDOBA" address="Corrientes 473, Centro, X5000ANI Córdoba" />
          <LocationCard title="SUCURSAL RIO CUARTO" address="Corrientes 473, Centro, X5000ANI" />
        </div>
      </section>
    </div>
  )
}

function CategoryCard({ title, href, imageSrc }: { title: string; href: string; imageSrc: string }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <Link href={href} className="text-lg font-semibold hover:underline">
          {title}
        </Link>
      </CardContent>
    </Card>
  )
}

function LocationCard({ title, address }: { title: string; address: string }) {
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
          <p className="text-muted-foreground">351-3804567</p>
        </div>
        <Button variant="outline" className="w-full">
          ¿COMO LLEGAR?
        </Button>
      </CardContent>
    </Card>
  )
}

