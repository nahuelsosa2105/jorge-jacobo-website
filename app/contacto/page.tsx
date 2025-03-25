"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
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
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  // Número de WhatsApp con código de país (reemplaza con el número real)
  const whatsappNumber = "+543513804567"
  const whatsappMessage = "Hola, me gustaría obtener más información sobre sus productos."
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-12">CONTACTO</h1>

      {/* Sección de WhatsApp */}
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3">¡Escríbenos por WhatsApp!</h2>
        <p className="text-lg mb-6">¡Nuestro equipo resolverá todas tus dudas!</p>

        <Button
          size="lg"
          className="flex items-center gap-2 py-6 px-8 mx-auto"
          onClick={() => window.open(whatsappUrl, "_blank")}
        >
          <MessageSquare className="h-6 w-6" />
          <span className="text-lg">Contactar por WhatsApp</span>
        </Button>
      </div>

      {/* Formulario de contacto */}
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">¡Completa el Formulario!</h2>
            <p className="text-muted-foreground mb-6">
              ¡Completa el siguiente formulario y alguien de nuestro equipo se pondrá en contacto lo antes posible!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
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
                Enviar mensaje
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

