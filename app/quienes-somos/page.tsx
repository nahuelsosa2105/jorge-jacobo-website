import Image from "next/image"
import { MapPin, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">¿QUIENES SOMOS?</h1>

      <div className="grid gap-8 md:grid-cols-2 items-center mb-16">
        <div>
          <p className="text-lg mb-4">
            En JUAN JORGE JACOBO E HIJOS SA, somos fabricantes y vendedores oficiales de la reconocida marca OMBU, lo que nos permite ofrecer productos que provienen directamente de fábrica,
             garantizando la autenticidad, calidad y durabilidad que caracteriza a la marca. Contamos con licencia oficial para la fabricación y comercialización,
              lo que nos convierte en un referente confiable dentro del rubro de la indumentaria y el calzado laboral. 
              Nuestra propuesta combina funcionalidad, estilo y seguridad,
             pensada para acompañarte en las exigencias del trabajo diario sin dejar de lado la comodidad.
          </p>
          <p className="text-lg">
            Además de nuestra tienda online, donde podés encontrar descripciones detalladas,
             también podés visitarnos en nuestros dos locales físicos en Córdoba Capital y Villa María,
             donde brindamos atención personalizada y asesoramiento especializado.
          </p>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image src="/INICIO-QUIENES-SOMOS.jpg" alt="Nuestra empresa" fill className="object-cover" />
        </div>
      </div>

      {/* <div className="grid gap-8 md:grid-cols-2 items-center">
        <div className="relative h-[400px] rounded-lg overflow-hidden md:order-last">
          <Image src="/pexels-sylvain-lelong-289676095-14252238.jpg" alt="Nuestro equipo" fill className="object-cover" />
        </div>
        <div>
          <p className="text-lg mb-4">
            Pellentesque ultricies mi sed eleifend tempus. In lobortis nunc eget eros vehicula, ut cursus nisi cursus.
            Praesent convallis, nunc in sagittis rhoncus, justo nibh porttitor nisl, a malesuada eros lectus facilisis
            lectus.
          </p>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consectetur libero augue, id rutrum justo
            bibendum tincidunt. Nullam auctor lacinia risus vitae malesuada. Suspendisse accumsan enim quis odio
            maximus, eget placerat velit rutrum.
          </p>
        </div>
      </div> */}

      <div className="mt-16 bg-muted p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">NUESTRAS MARCAS</h2>
        <div className="flex flex-wrap justify-center gap-8">
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
      </div>

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
  )

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



}

