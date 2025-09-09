"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Calendar, User, FileText, Clock, MapPin, Phone, Mail, Award as IdCard, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface PQRSDData {
  id: string
  filingNumber: string
  type: string
  subject: string
  description: string
  petitionerType: string
  petitionerName: string
  petitionerEmail: string
  petitionerPhone: string
  petitionerAddress: string
  petitionerIdType: string
  petitionerIdNumber: string
  priority: string
  status: string
  assignedDepartment: any
  dueDate: string
  responseDate: string | null
  createdAt: string
  updatedAt: string
  comments: any[]
  attachments: any[]
  statusHistory: any[]
}

interface CitizenDashboardProps {
  data: PQRSDData
}

export function CitizenDashboard({ data }: CitizenDashboardProps) {
  const router = useRouter()

  const handleLogout = () => {
    sessionStorage.removeItem("pqrsdData")
    router.push("/consultar")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "recibida":
        return "bg-blue-100 text-blue-800"
      case "en_proceso":
        return "bg-yellow-100 text-yellow-800"
      case "asignada":
        return "bg-purple-100 text-purple-800"
      case "respondida":
        return "bg-green-100 text-green-800"
      case "cerrada":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeLabel = (type: string) => {
    const types = {
      peticion: "Petición",
      queja: "Queja",
      reclamo: "Reclamo",
      sugerencia: "Sugerencia",
      denuncia: "Denuncia",
    }
    return types[type as keyof typeof types] || type
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "baja":
        return "bg-green-100 text-green-800"
      case "media":
        return "bg-yellow-100 text-yellow-800"
      case "alta":
        return "bg-orange-100 text-orange-800"
      case "critica":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-balance">Estado de su PQRSD</h1>
                <p className="text-muted-foreground text-pretty">{data.filingNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-primary hover:text-primary/80 font-medium">
                Inicio
              </Link>
              <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 bg-transparent">
                <LogOut className="h-4 w-4" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Status Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Información General
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Tipo de Solicitud</Label>
                    <p className="text-lg font-semibold">{getTypeLabel(data.type)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Asunto</Label>
                    <p className="text-pretty">{data.subject}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Estado Actual</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(data.status)}>
                        {data.status.replace("_", " ").toUpperCase()}
                      </Badge>
                      <Badge className={getPriorityColor(data.priority)}>Prioridad {data.priority}</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Fecha de Radicación</Label>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(data.createdAt).toLocaleDateString("es-CO", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Fecha Límite de Respuesta</Label>
                    <p className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {new Date(data.dueDate).toLocaleDateString("es-CO", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  {data.assignedDepartment && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Departamento Asignado</Label>
                      <p>{data.assignedDepartment.name}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Petitioner Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Datos del Peticionario
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{data.petitionerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IdCard className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {data.petitionerIdType.toUpperCase()}: {data.petitionerIdNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{data.petitionerEmail}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{data.petitionerPhone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-pretty">{data.petitionerAddress}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Descripción de la Solicitud</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-pretty leading-relaxed">{data.description}</p>
            </CardContent>
          </Card>

          {/* Status History */}
          <Card>
            <CardHeader>
              <CardTitle>Historial de Estados</CardTitle>
              <CardDescription>Seguimiento cronológico de su solicitud</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.statusHistory.map((history, index) => (
                  <div key={history.id} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(history.newStatus)}>
                          {history.newStatus.replace("_", " ").toUpperCase()}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(history.createdAt).toLocaleDateString("es-CO")} -{" "}
                          {new Date(history.createdAt).toLocaleTimeString("es-CO")}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{history.changeReason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comments (if any) */}
          {data.comments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Comentarios y Respuestas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.comments
                    .filter((comment) => !comment.isInternal)
                    .map((comment) => (
                      <div key={comment.id} className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Respuesta oficial</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleDateString("es-CO")}
                          </span>
                        </div>
                        <p className="text-pretty">{comment.comment}</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
