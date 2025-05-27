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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({})

    try {
      const response = await fetch("https://formspree.io/f/movenvlz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          // Añadimos un campo para identificar que es del formulario de mayoristas
          form_type: "Formulario de Mayoristas",
        }),
      })

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: "¡Gracias por contactarnos! Un representante se pondrá en contacto contigo lo antes posible.",
        })
        setFormData({ company: "", name: "", email: "", phone: "", message: "" })
      } else {
        const data = await response.json()
        throw new Error(data.error || "Hubo un error al enviar el formulario")
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : "Hubo un error al enviar el formulario",
      })
    } finally {
      setIsSubmitting(false)
    }
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
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white flex items-center gap-2"
              onClick={() =>
                window.open(
                  `https://wa.me/5493513804567?text=${encodeURIComponent("Hola, estoy interesado en realizar un pedido mayorista.")}`,
                  "_blank",
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
                stroke="currentColor"
                strokeWidth="0"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
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
                {submitStatus.message && (
                  <div
                    className={`p-4 mb-6 rounded-md ${submitStatus.success ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}
                  >
                    {submitStatus.message}
                  </div>
                )}

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

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar formulario"}
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
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image src="/bordado.jpg" alt="Personalización" fill className="object-cover" />
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

