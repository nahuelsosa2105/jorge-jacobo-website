"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function WholesalePage() {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log("Formulario enviado:", formData)
    alert("Gracias por contactarnos. Te responderemos a la brevedad.")
    setFormData({ company: "", name: "", email: "", phone: "", message: "" })
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">TIENDA MAYORISTA</h1>
      <h2 className="text-2xl font-semibold mb-12">EMPRESAS | MAYORISTA</h2>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-8">
          <div>
            <p className="text-lg mb-4">
              Para hacer tu pedido como mayorista te redirigiremos a WhatsApp para poder continuar:
            </p>
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => {
                const whatsappNumber = "+543513804567"
                const whatsappMessage = "Hola, me gustaría obtener información sobre compras mayoristas."
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
                window.open(whatsappUrl, "_blank")
              }}
            >
              Contactar por WhatsApp
            </Button>
          </div>

          <div>
            <p className="text-lg mb-4">
              También puedes completar el siguiente formulario para que uno de nuestros representantes se ponga en
              contacto lo antes posible:
            </p>
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input id="company" name="company" value={formData.company} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Enviar formulario
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">PERSONALIZACIÓN</h3>
            <p className="text-lg mb-6">
              Ofrecemos servicio de personalización, para que todos los productos que nos soliciten tengan el logo de tu
              empresa, y cualquier otra personalización que necesiten.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src="/bordado.jpg"
                  alt="Personalización 1"
                  fill
                  className="object-cover"
                />
              </div>
              {/* <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Personalización 2"
                  fill
                  className="object-cover"
                />
              </div> */}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">BENEFICIOS MAYORISTAS</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Precios especiales para compras al por mayor</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Envíos a todo el país</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Atención personalizada</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Servicio de personalización</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Asesoramiento técnico</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

