"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserPlus, AlertCircle } from "lucide-react"

interface AssignmentModalProps {
  request: any
  open: boolean
  onClose: () => void
  onAssign: (updatedRequest: any) => void
}

export function AssignmentModal({ request, open, onClose, onAssign }: AssignmentModalProps) {
  const [selectedDepartment, setSelectedDepartment] = useState(request.assignedDepartment || "")
  const [selectedUser, setSelectedUser] = useState(request.assignedUser || "")
  const [priority, setPriority] = useState(request.priority || "normal")
  const [comments, setComments] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Mock departments and users - in production, fetch from API
  const departments = [
    { id: "1", name: "Atención al Ciudadano" },
    { id: "2", name: "Jurídica" },
    { id: "3", name: "Administrativa" },
    { id: "4", name: "Sistemas" },
    { id: "5", name: "Talento Humano" },
    { id: "6", name: "Financiera" },
    { id: "7", name: "Planeación" },
  ]

  const users = [
    { id: "1", name: "Ana López", department: "Atención al Ciudadano" },
    { id: "2", name: "Pedro Sánchez", department: "Financiera" },
    { id: "3", name: "Legal Team", department: "Jurídica" },
    { id: "4", name: "Tech Team", department: "Sistemas" },
    { id: "5", name: "María García", department: "Administrativa" },
  ]

  const filteredUsers = selectedDepartment ? users.filter((user) => user.department === selectedDepartment) : users

  const handleAssign = async () => {
    if (!selectedDepartment) {
      setError("Debe seleccionar un departamento")
      return
    }

    setLoading(true)
    setError("")

    try {
      // In production, make API call to assign PQRSD
      const updatedRequest = {
        ...request,
        assignedDepartment: selectedDepartment,
        assignedUser: selectedUser,
        priority,
        status: "assigned",
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onAssign(updatedRequest)
    } catch (err) {
      setError("Error al asignar la solicitud")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Asignar PQRSD
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Request Info */}
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">{request.filingNumber}</h4>
            <p className="text-sm text-muted-foreground mb-1">{request.subject}</p>
            <p className="text-sm text-muted-foreground">Ciudadano: {request.citizenName}</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Assignment Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="department">Departamento *</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un departamento" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.name}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="user">Usuario Responsable</Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un usuario (opcional)" />
                </SelectTrigger>
                <SelectContent>
                  {filteredUsers.map((user) => (
                    <SelectItem key={user.id} value={user.name}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Prioridad</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baja</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments">Comentarios de Asignación</Label>
              <Textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Agregue comentarios sobre la asignación (opcional)"
                rows={3}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button onClick={handleAssign} disabled={loading}>
              {loading ? "Asignando..." : "Asignar PQRSD"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
