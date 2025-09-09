"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, User, Clock, MessageSquare, History, AlertCircle, CheckCircle } from "lucide-react"

interface PQRSDDetailModalProps {
  request: any
  open: boolean
  onClose: () => void
  onUpdate: (updatedRequest: any) => void
}

export function PQRSDDetailModal({ request, open, onClose, onUpdate }: PQRSDDetailModalProps) {
  const [newStatus, setNewStatus] = useState(request.status)
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Mock data for history and comments
  const statusHistory = [
    {
      id: 1,
      previousStatus: null,
      newStatus: "received",
      changedBy: "Sistema",
      comments: "PQRSD registrada automáticamente",
      createdAt: "2024-01-15 10:30:00",
    },
    {
      id: 2,
      previousStatus: "received",
      newStatus: "assigned",
      changedBy: "Ana López",
      comments: "Asignada al departamento de Atención al Ciudadano",
      createdAt: "2024-01-15 14:20:00",
    },
  ]

  const comments = [
    {
      id: 1,
      user: "Ana López",
      comment: "Se requiere información adicional del ciudadano para proceder",
      isInternal: true,
      createdAt: "2024-01-16 09:15:00",
    },
    {
      id: 2,
      user: "Sistema",
      comment: "Respuesta enviada al ciudadano",
      isInternal: false,
      createdAt: "2024-01-16 16:45:00",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "received":
        return "bg-blue-100 text-blue-800"
      case "assigned":
        return "bg-yellow-100 text-yellow-800"
      case "in_progress":
        return "bg-orange-100 text-orange-800"
      case "pending_info":
        return "bg-purple-100 text-purple-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "received":
        return "Recibida"
      case "assigned":
        return "Asignada"
      case "in_progress":
        return "En Proceso"
      case "pending_info":
        return "Pendiente Info"
      case "resolved":
        return "Resuelta"
      case "closed":
        return "Cerrada"
      default:
        return status
    }
  }

  const handleStatusUpdate = async () => {
    if (!newComment.trim()) {
      setError("Debe agregar un comentario al cambiar el estado")
      return
    }

    setLoading(true)
    setError("")

    try {
      // In production, make API call to update status
      const updatedRequest = {
        ...request,
        status: newStatus,
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onUpdate(updatedRequest)
    } catch (err) {
      setError("Error al actualizar el estado")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Detalle de PQRSD - {request.filingNumber}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="comments">Comentarios</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
            <TabsTrigger value="actions">Acciones</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Información del Ciudadano
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <span className="font-medium">Nombre:</span> {request.citizenName}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {request.citizenEmail}
                  </div>
                  <div>
                    <span className="font-medium">Tipo:</span> {request.type}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Estado y Tiempos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Estado:</span>
                    <Badge className={getStatusColor(request.status)}>{getStatusText(request.status)}</Badge>
                  </div>
                  <div>
                    <span className="font-medium">Creada:</span> {request.createdAt}
                  </div>
                  <div>
                    <span className="font-medium">Vence:</span> {request.dueDate}
                  </div>
                  {request.isOverdue && (
                    <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                      <AlertCircle className="h-3 w-3" />
                      Vencida
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Asunto</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{request.subject}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">
                  {request.description ||
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                </p>
              </CardContent>
            </Card>

            {(request.assignedDepartment || request.assignedUser) && (
              <Card>
                <CardHeader>
                  <CardTitle>Asignación</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {request.assignedDepartment && (
                    <div>
                      <span className="font-medium">Departamento:</span> {request.assignedDepartment}
                    </div>
                  )}
                  {request.assignedUser && (
                    <div>
                      <span className="font-medium">Usuario:</span> {request.assignedUser}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="comments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Comentarios y Respuestas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border-l-4 border-primary/20 pl-4 py-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{comment.user}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant={comment.isInternal ? "secondary" : "default"} className="text-xs">
                            {comment.isInternal ? "Interno" : "Público"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                        </div>
                      </div>
                      <p className="text-sm">{comment.comment}</p>
                    </div>
                  ))}

                  {comments.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">No hay comentarios aún</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  Historial de Estados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statusHistory.map((entry) => (
                    <div key={entry.id} className="flex items-start gap-3">
                      <div className="p-1 bg-primary/10 rounded-full mt-1">
                        <CheckCircle className="h-3 w-3 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getStatusColor(entry.newStatus)}>{getStatusText(entry.newStatus)}</Badge>
                          <span className="text-sm text-muted-foreground">por {entry.changedBy}</span>
                          <span className="text-xs text-muted-foreground">{entry.createdAt}</span>
                        </div>
                        {entry.comments && <p className="text-sm text-muted-foreground">{entry.comments}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Actualizar Estado</CardTitle>
                <CardDescription>Cambie el estado de la PQRSD y agregue comentarios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="status">Nuevo Estado</Label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="received">Recibida</SelectItem>
                      <SelectItem value="assigned">Asignada</SelectItem>
                      <SelectItem value="in_progress">En Proceso</SelectItem>
                      <SelectItem value="pending_info">Pendiente Info</SelectItem>
                      <SelectItem value="resolved">Resuelta</SelectItem>
                      <SelectItem value="closed">Cerrada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">Comentario *</Label>
                  <Textarea
                    id="comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Agregue un comentario sobre el cambio de estado"
                    rows={4}
                  />
                </div>

                <Button onClick={handleStatusUpdate} disabled={loading} className="w-full">
                  {loading ? "Actualizando..." : "Actualizar Estado"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
