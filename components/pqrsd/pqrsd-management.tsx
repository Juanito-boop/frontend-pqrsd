"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Eye, UserPlus, Clock, AlertTriangle } from "lucide-react"
import { PQRSDDetailModal } from "./pqrsd-detail-modal"
import { AssignmentModal } from "./assignment-modal"

interface PQRSDRequest {
  id: string
  filingNumber: string
  type: string
  subject: string
  description: string
  petitionerType: string
  petitionerName: string
  petitionerEmail: string
  petitionerAccessCode?: string
  petitionerPhone: string
  petitionerAddress: string
  petitionerIdType: string
  petitionerIdNumber: string
  priority: string
  status: "recibida" | "en_proceso" | "asignada" | "respondida" | "cerrada"
  assignedDepartmentId: any
  assignedUserId: any
  dueDate: string
  responseDate: any
  createdAt: string
  updatedAt: string
  assignedDepartment: any
  assignedUser: any
}

const mockData = [{
  "filingNumber": "error: undefined method `first' for nil:NilClass",
  "type": "error: undefined method `first' for nil:NilClass",
  "subject": "duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque",
  "description": "Sed ante. Vivamus tortor. Duis mattis egestas metus.",
  "petitionerType": "error: undefined method `first' for nil:NilClass",
  "petitionerName": "Daune Gration",
  "petitionerEmail": "dgration0@examiner.com",
  "petitionerAccessCode": "error: undefined method `first' for nil:NilClass",
  "petitionerPhone": "765-911-8250",
  "petitionerAddress": "93405 Magdeline Road",
  "petitionerIdType": "error: undefined method `first' for nil:NilClass",
  "petitionerIdNumber": 3359538181,
  "priority": "error: undefined method `first' for nil:NilClass",
  "status": "error: undefined method `first' for nil:NilClass",
  "assignedDepartmentId": "error: undefined method `first' for nil:NilClass",
  "assignedUserId": "error: undefined method `first' for nil:NilClass",
  "dueDate": "12/13/2022",
  "responseDate": "11/3/2022",
  "createdAt": "6/1/2022",
  "updatedAt": "7/17/2022",
  "assignedDepartment": "error: undefined method `first' for nil:NilClass",
  "assignedUser": "error: undefined method `first' for nil:NilClass"
}, {
  "filingNumber": "error: undefined method `first' for nil:NilClass",
  "type": "error: undefined method `first' for nil:NilClass",
  "subject": "viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac",
  "description": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.",
  "petitionerType": "error: undefined method `first' for nil:NilClass",
  "petitionerName": "Carlie Ruit",
  "petitionerEmail": "cruit1@sohu.com",
  "petitionerAccessCode": "error: undefined method `first' for nil:NilClass",
  "petitionerPhone": "578-503-3006",
  "petitionerAddress": "7 Stang Parkway",
  "petitionerIdType": "error: undefined method `first' for nil:NilClass",
  "petitionerIdNumber": 3458160699,
  "priority": "error: undefined method `first' for nil:NilClass",
  "status": "error: undefined method `first' for nil:NilClass",
  "assignedDepartmentId": "error: undefined method `first' for nil:NilClass",
  "assignedUserId": "error: undefined method `first' for nil:NilClass",
  "dueDate": "1/4/2022",
  "responseDate": "5/20/2022",
  "createdAt": "11/4/2022",
  "updatedAt": "9/6/2022",
  "assignedDepartment": "error: undefined method `first' for nil:NilClass",
  "assignedUser": "error: undefined method `first' for nil:NilClass"
}, {
  "filingNumber": "error: undefined method `first' for nil:NilClass",
  "type": "error: undefined method `first' for nil:NilClass",
  "subject": "ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien",
  "description": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
  "petitionerType": "error: undefined method `first' for nil:NilClass",
  "petitionerName": "Hercule Ambrosoli",
  "petitionerEmail": "hambrosoli2@europa.eu",
  "petitionerAccessCode": "error: undefined method `first' for nil:NilClass",
  "petitionerPhone": "792-228-3539",
  "petitionerAddress": "452 Starling Way",
  "petitionerIdType": "error: undefined method `first' for nil:NilClass",
  "petitionerIdNumber": 4774018239,
  "priority": "error: undefined method `first' for nil:NilClass",
  "status": "error: undefined method `first' for nil:NilClass",
  "assignedDepartmentId": "error: undefined method `first' for nil:NilClass",
  "assignedUserId": "error: undefined method `first' for nil:NilClass",
  "dueDate": "5/15/2022",
  "responseDate": "5/22/2022",
  "createdAt": "7/2/2022",
  "updatedAt": "7/27/2022",
  "assignedDepartment": "error: undefined method `first' for nil:NilClass",
  "assignedUser": "error: undefined method `first' for nil:NilClass"
}, {
  "filingNumber": "error: undefined method `first' for nil:NilClass",
  "type": "error: undefined method `first' for nil:NilClass",
  "subject": "varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia",
  "description": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
  "petitionerType": "error: undefined method `first' for nil:NilClass",
  "petitionerName": "Pattin Ricardou",
  "petitionerEmail": "pricardou3@vistaprint.com",
  "petitionerAccessCode": "error: undefined method `first' for nil:NilClass",
  "petitionerPhone": "410-747-7212",
  "petitionerAddress": "53859 Namekagon Court",
  "petitionerIdType": "error: undefined method `first' for nil:NilClass",
  "petitionerIdNumber": 3973944236,
  "priority": "error: undefined method `first' for nil:NilClass",
  "status": "error: undefined method `first' for nil:NilClass",
  "assignedDepartmentId": "error: undefined method `first' for nil:NilClass",
  "assignedUserId": "error: undefined method `first' for nil:NilClass",
  "dueDate": "10/3/2022",
  "responseDate": "8/13/2022",
  "createdAt": "6/22/2022",
  "updatedAt": "5/17/2022",
  "assignedDepartment": "error: undefined method `first' for nil:NilClass",
  "assignedUser": "error: undefined method `first' for nil:NilClass"
}, {
  "filingNumber": "error: undefined method `first' for nil:NilClass",
  "type": "error: undefined method `first' for nil:NilClass",
  "subject": "vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra",
  "description": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  "petitionerType": "error: undefined method `first' for nil:NilClass",
  "petitionerName": "Wolfgang McIlheran",
  "petitionerEmail": "wmcilheran4@usgs.gov",
  "petitionerAccessCode": "error: undefined method `first' for nil:NilClass",
  "petitionerPhone": "662-244-8862",
  "petitionerAddress": "507 Tennyson Center",
  "petitionerIdType": "error: undefined method `first' for nil:NilClass",
  "petitionerIdNumber": 5049233487,
  "priority": "error: undefined method `first' for nil:NilClass",
  "status": "error: undefined method `first' for nil:NilClass",
  "assignedDepartmentId": "error: undefined method `first' for nil:NilClass",
  "assignedUserId": "error: undefined method `first' for nil:NilClass",
  "dueDate": "12/30/2022",
  "responseDate": "6/5/2022",
  "createdAt": "2/16/2022",
  "updatedAt": "5/17/2022",
  "assignedDepartment": "error: undefined method `first' for nil:NilClass",
  "assignedUser": "error: undefined method `first' for nil:NilClass"
}]

export function PQRSDManagement() {
  const [requests, setRequests] = useState<PQRSDRequest[]>([])
  const [total, setTotal] = useState(0)
  const [vencidas, setVencidas] = useState(0)
  const [filteredRequests, setFilteredRequests] = useState<PQRSDRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<PQRSDRequest | null>(null)
  const [assignmentRequest, setAssignmentRequest] = useState<PQRSDRequest | null>(null)

  useEffect(() => {
    const fetchPQRSDData = async () => {
      try {
        const token = localStorage.getItem("accessToken")
        const page = 1
        const limit = 10
        const responsePQRSD = await fetch(`http://34.30.227.130:3000/api/v1/pqrsd?page=${page}&limit=${limit}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        })
        setLoading(false)
        if (responsePQRSD.ok) {
          const data = await responsePQRSD.json()
          const total = data.total
          const vencidas = data.vencidas
          setTotal(total)
          setVencidas(vencidas)
          setRequests(data.data || [])
        } else {
          console.error('Failed to fetch PQRSD data:', responsePQRSD.statusText)
        }
      } catch (error) {
        console.error('Error fetching PQRSD data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPQRSDData()
  }, [])

  useEffect(() => {
    let filtered = requests

    if (searchTerm) {
      filtered = filtered.filter(
        (req) =>
          req.filingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.petitionerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.subject.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((req) => req.status === statusFilter)
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((req) => req.type === typeFilter)
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((req) => req.priority === priorityFilter)
    }

    setFilteredRequests(filtered)
  }, [requests, searchTerm, statusFilter, typeFilter, priorityFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "recibida":
        return "bg-blue-100 text-blue-800"
      case "asignada":
        return "bg-yellow-100 text-yellow-800"
      case "en_proceso":
        return "bg-orange-100 text-orange-800"
      case "respondida":
        return "bg-green-100 text-green-800"
      case "cerrada":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "recibida":
        return "Recibida"
      case "asignada":
        return "Asignada"
      case "en_proceso":
        return "En Proceso"
      case "respondida":
        return "Respondida"
      case "cerrada":
        return "Cerrada"
      default:
        return status
    }
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

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "baja":
        return "Baja"
      case "media":
        return "Normal"
      case "alta":
        return "Alta"
      case "critica":
        return "Critica"
      default:
        return priority
    }
  }

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-balance">Gestión de PQRSD</h1>
        <p className="text-muted-foreground text-pretty">Administre y asigne solicitudes de PQRSD</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros y Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por radicado, nombre o asunto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="recibida">Recibida</SelectItem>
                <SelectItem value="asignada">Asignada</SelectItem>
                <SelectItem value="en_proceso">En Proceso</SelectItem>
                <SelectItem value="respondida">Respondida</SelectItem>
                <SelectItem value="cerrada">Cerrada</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="peticion">Petición</SelectItem>
                <SelectItem value="queja">Queja</SelectItem>
                <SelectItem value="reclamo">Reclamo</SelectItem>
                <SelectItem value="sugerencia">Sugerencia</SelectItem>
                <SelectItem value="denuncia">Denuncia</SelectItem>
                <SelectItem value="derecho-de-peticion">Derecho de Peticion</SelectItem>
                <SelectItem value="tutela">Tutela</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las prioridades</SelectItem>
                <SelectItem value="baja">Baja</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="critica">Critica</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
                setTypeFilter("all")
                setPriorityFilter("all")
              }}
            >
              Limpiar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando {filteredRequests.length} de {total} solicitudes
        </p>
        <div className="flex items-center gap-2">
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            {vencidas} Vencidas
          </Badge>
        </div>
      </div>

      {/* PQRSD List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className={`${request.status === "cerrada" ? "border-red-200 bg-red-50/50" : ""}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{request.filingNumber}</h3>
                    <Badge className={getStatusColor(request.status)}>{getStatusText(request.status)}</Badge>
                    <Badge className={getPriorityColor(request.priority)}>{getPriorityText(request.priority)}</Badge>
                    <Badge variant="outline">{request.type}</Badge>
                    {request.status === "cerrada" && (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Vencida
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm font-medium">{request.subject}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Ciudadano:</span> {request.petitionerName}
                    </div>
                    <div>
                      <span className="font-medium">Creada:</span> {request.createdAt.toString().split("T")[0]}
                    </div>
                    <div>
                      <span className="font-medium">Vence:</span> {request.dueDate.toString().split("T")[0]}
                    </div>
                    <div>
                      <span className="font-medium">Asignada a:</span> {request.assignedDepartment || "Sin asignar"}
                    </div>
                  </div>

                  {request.assignedUser && (
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Usuario:</span> {request.assignedUser}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setAssignmentRequest(request)}>
                    <UserPlus className="h-4 w-4 mr-1" />
                    Asignar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredRequests.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No se encontraron solicitudes que coincidan con los filtros.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Detail Modal */}
      {selectedRequest && (
        <PQRSDDetailModal
          request={selectedRequest}
          open={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onUpdate={(updatedRequest) => {
            setRequests((prev) => prev.map((r) => (r.id === updatedRequest.id ? updatedRequest : r)))
            setSelectedRequest(null)
          }}
        />
      )}

      {/* Assignment Modal */}
      {assignmentRequest && (
        <AssignmentModal
          request={assignmentRequest}
          open={!!assignmentRequest}
          onClose={() => setAssignmentRequest(null)}
          onAssign={(updatedRequest) => {
            setRequests((prev) => prev.map((r) => (r.id === updatedRequest.id ? updatedRequest : r)))
            setAssignmentRequest(null)
          }}
        />
      )}
    </div>
  )
}
