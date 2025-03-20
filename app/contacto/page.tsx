"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, MessageSquare } from "lucide-react"

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

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-12">CONTACTO</h1>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Información de contacto */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6">¡Escríbenos por WhatsApp!</h2>
            <p className="text-lg mb-4">¡Nuestro equipo resolverá todas tus dudas!</p>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consectetur libero augue, id rutrum justo
              bibendum tincidunt. Nullam auctor lacinia risus vitae malesuada. Suspendisse accumsan enim quis odio
              maximus, eget placerat velit rutrum.
            </p>
          </div>

          <div className="grid gap-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Teléfono</h3>
                  <p className="text-sm text-muted-foreground">351-4245041</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Dirección</h3>
                  <p className="text-sm text-muted-foreground">Corrientes 473, Centro, Córdoba</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-sm text-muted-foreground">info@jorgejacobohijos.com</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">+54 351 4245041</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div>
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
    </div>
  )
}

