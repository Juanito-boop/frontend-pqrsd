"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Upload, CheckCircle, AlertCircle } from "lucide-react"

interface FormData {
  pqrsdType: string
  petitionerType: "persona_natural" | "persona_juridica"
  citizenName: string
  citizenEmail: string
  citizenPhone: string
  citizenIdType: string
  citizenIdNumber: string
  organizationName: string
  subject: string
  description: string
  citizenAddress: string   // 👈 nuevo campo
  acceptsDataTreatment: boolean
}

export function PQRSDRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    pqrsdType: "",
    petitionerType: "persona_natural",
    citizenName: "",
    citizenEmail: "",
    citizenPhone: "",
    citizenIdType: "",
    citizenIdNumber: "",
    organizationName: "",
    subject: "",
    description: "",
    citizenAddress: "",       // 👈 inicializado
    acceptsDataTreatment: false,
  })

  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      // Crear un objeto FormData para enviar archivos y datos
      const formDataToSend = new FormData()

      // Agregar cada campo individualmente al FormData
      formDataToSend.append('type', formData.pqrsdType)
      formDataToSend.append('petitionerType', formData.petitionerType)
      formDataToSend.append('petitionerName', formData.citizenName)
      formDataToSend.append('petitionerEmail', formData.citizenEmail)
      formDataToSend.append('petitionerPhone', formData.citizenPhone)
      formDataToSend.append('petitionerAddress', formData.citizenAddress)
      formDataToSend.append('petitionerIdType', formData.citizenIdType)
      formDataToSend.append('petitionerIdNumber', formData.citizenIdNumber)
      formDataToSend.append('subject', formData.subject)
      formDataToSend.append('description', formData.description)

      // Si es persona jurídica, agregar el nombre de la organización
      if (formData.petitionerType === 'persona_juridica' && formData.organizationName) {
        formDataToSend.append('organizationName', formData.organizationName)
      }

      // Agregar cada archivo al FormData
      files.forEach((file) => {
        formDataToSend.append('files', file)
      })

      const response = await fetch("http://34.30.227.130:3000/api/v1/pqrsd/submit", {
        method: "POST",
        // No establecer Content-Type, el navegador lo configurará automáticamente con el boundary correcto
        body: formDataToSend,
      })

      const result = await response.json()

      if (response.ok) {
        setSuccess(`Su solicitud ha sido registrada exitosamente. Número de radicado: ${result.filingNumber}`)
        setFormData({
          pqrsdType: "",
          petitionerType: "persona_natural",
          citizenName: "",
          citizenEmail: "",
          citizenPhone: "",
          citizenIdType: "",
          citizenIdNumber: "",
          organizationName: "",
          subject: "",
          description: "",
          citizenAddress: "",
          acceptsDataTreatment: false,
        })
        setFiles([])
      } else {
        setError(result.message?.join(', ') || result.error || "Error al enviar la solicitud")
      }
    } catch (err) {
      setError("Error de conexión. Intente nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-balance">Registrar Nueva PQRSD</CardTitle>
        <CardDescription className="text-pretty">
          Complete el formulario para enviar su petición, queja, reclamo, sugerencia o denuncia.<br />Todos los campos son requeridos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {typeof error === 'string' ? error : 'An unexpected error occurred'}
              </AlertDescription>
            </Alert>
          )}

          {/* PQRSD Type */}
          <div className="space-y-2">
            <Label htmlFor="pqrsdType">Tipo de PQRSD <span className="text-red-600">*</span></Label>
            <Select value={formData.pqrsdType} onValueChange={(value) => handleInputChange("pqrsdType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione el tipo de solicitud" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="peticion">Petición</SelectItem>
                <SelectItem value="queja">Queja</SelectItem>
                <SelectItem value="reclamo">Reclamo</SelectItem>
                <SelectItem value="sugerencia">Sugerencia</SelectItem>
                <SelectItem value="denuncia">Denuncia</SelectItem>
                <SelectItem value="derecho-de-peticion">Derecho de Petición</SelectItem>
                <SelectItem value="tutela">Tutela</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Petitioner Type */}
          <div className="space-y-3">
            <Label>Tipo de Peticionario <span className="text-red-600">*</span></Label>
            <RadioGroup
              value={formData.petitionerType}
              onValueChange={(value) => handleInputChange("petitionerType", value as "persona_natural" | "persona_juridica")}
              className="flex gap-10"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="persona_natural" className="shadow-sm shadow-gray-400" id="persona_natural" />
                <Label htmlFor="persona_natural">Persona Natural</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="persona_juridica" className="shadow-sm shadow-gray-400" id="persona_juridica" />
                <Label htmlFor="persona_juridica">Persona Jurídica</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="citizenName">Nombre Completo <span className="text-red-600">*</span></Label>
              <Input
                id="citizenName"
                value={formData.citizenName}
                onChange={(e) => handleInputChange("citizenName", e.target.value)}
                placeholder="Nombres y apellidos"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="citizenEmail">Correo Electrónico <span className="text-red-600">*</span></Label>
              <Input
                id="citizenEmail"
                type="email"
                value={formData.citizenEmail}
                onChange={(e) => handleInputChange("citizenEmail", e.target.value)}
                placeholder="correo@ejemplo.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="citizenPhone">Teléfono</Label>
              <Input
                id="citizenPhone"
                value={formData.citizenPhone}
                onChange={(e) => handleInputChange("citizenPhone", e.target.value)}
                placeholder="300 123 4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="citizenAddress">Dirección <span className="text-red-600">*</span></Label>
              <Input
                id="citizenAddress"
                value={formData.citizenAddress}
                onChange={(e) => handleInputChange("citizenAddress", e.target.value)}
                placeholder="Dirección de residencia"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="citizenIdType">Tipo de Documento <span className="text-red-600">*</span></Label>
              <Select
                value={formData.citizenIdType}
                onValueChange={(value) => handleInputChange("citizenIdType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cedula">Cédula de Ciudadanía</SelectItem>
                  <SelectItem value="nit">NIT</SelectItem>
                  <SelectItem value="pasaporte">Pasaporte</SelectItem>
                  <SelectItem value="cedula_extranjeria">Cédula de Extranjería</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="citizenIdNumber">Número de Documento <span className="text-red-600">*</span></Label>
              <Input
                id="citizenIdNumber"
                type="text"
                value={formData.citizenIdNumber}
                onChange={(e) => handleInputChange("citizenIdNumber", e.target.value)}
                placeholder="Número de documento"
                required
                minLength={10}
                pattern="[0-9]{10,}"
                title="Debe ingresar al menos 10 números"
              />
            </div>

            {formData.petitionerType === "persona_juridica" && (
              <div className="space-y-2">
                <Label htmlFor="organizationName">Nombre de la Organización <span className="text-red-600">*</span></Label>
                <Input
                  id="organizationName"
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange("organizationName", e.target.value)}
                  placeholder="Nombre de la empresa u organización"
                  required={formData.petitionerType === "persona_juridica"}
                />
              </div>
            )}
          </div>

          {/* Subject and Description */}
          <div className="space-y-2">
            <Label htmlFor="subject">Asunto <span className="text-red-600">*</span></Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              placeholder="Resumen breve de su solicitud"
              maxLength={500}
              required
            />
            <p className="text-xs text-muted-foreground">{formData.subject.length}/500 caracteres</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción Detallada <span className="text-red-600">*</span></Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describa detalladamente su solicitud, incluyendo fechas, lugares y personas involucradas si aplica"
              rows={6}
              required
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="files">Archivos Adjuntos</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <div className="text-sm text-muted-foreground mb-2">
                  Arrastre archivos aquí o haga clic para seleccionar
                </div>
                <Input
                  id="files"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <Button type="button" variant="outline" onClick={() => document.getElementById("files")?.click()}>
                  Seleccionar Archivos
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Formatos permitidos: PDF, DOC, DOCX, JPG, PNG. Máximo 5MB por archivo.
              </p>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <Label>Archivos seleccionados:</Label>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm">{file.name}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                      Eliminar
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Data Treatment Consent */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="dataConsent"
              checked={formData.acceptsDataTreatment}
              className="shadow-sm shadow-gray-400"
              onCheckedChange={(checked) => handleInputChange("acceptsDataTreatment", checked as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="dataConsent" className="text-sm font-normal leading-relaxed cursor-pointer">
                Acepto el tratamiento de mis datos personales conforme a la Ley 1581 de 2012 <span className="text-red-600">*</span>
              </Label>
              <p className="text-xs text-muted-foreground">
                Sus datos serán utilizados únicamente para la gestión de su solicitud PQRSD
              </p>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading || !formData.acceptsDataTreatment}>
            {loading ? "Enviando..." : "Enviar PQRSD"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
