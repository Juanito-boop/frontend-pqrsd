"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, Clock, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react"

export function AssignmentWorkflow() {
  const [assignments, setAssignments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data for assignments by department
  useEffect(() => {
    const mockAssignments = [
      {
        department: "Atención al Ciudadano",
        total: 45,
        pending: 12,
        inProgress: 18,
        overdue: 3,
        users: [
          { name: "Ana López", assigned: 8, completed: 15 },
          { name: "Carlos Ruiz", assigned: 4, completed: 12 },
        ],
      },
      {
        department: "Jurídica",
        total: 23,
        pending: 5,
        inProgress: 8,
        overdue: 2,
        users: [{ name: "Legal Team", assigned: 13, completed: 8 }],
      },
      {
        department: "Financiera",
        total: 18,
        pending: 3,
        inProgress: 6,
        overdue: 1,
        users: [{ name: "Pedro Sánchez", assigned: 9, completed: 8 }],
      },
      {
        department: "Sistemas",
        total: 12,
        pending: 2,
        inProgress: 4,
        overdue: 0,
        users: [{ name: "Tech Team", assigned: 6, completed: 6 }],
      },
    ]

    setAssignments(mockAssignments)
    setLoading(false)
  }, [])

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-balance">Flujo de Asignaciones</h1>
        <p className="text-muted-foreground text-pretty">
          Monitoree las asignaciones de PQRSD por departamento y usuario
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Asignadas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.reduce((sum, dept) => sum + dept.total, 0)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.reduce((sum, dept) => sum + dept.pending, 0)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Proceso</CardTitle>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.reduce((sum, dept) => sum + dept.inProgress, 0)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencidas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {assignments.reduce((sum, dept) => sum + dept.overdue, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Alert */}
      {assignments.some((dept) => dept.overdue > 0) && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Hay {assignments.reduce((sum, dept) => sum + dept.overdue, 0)} PQRSD vencidas que requieren atención
            inmediata.
          </AlertDescription>
        </Alert>
      )}

      {/* Department Assignments */}
      <div className="space-y-4">
        {assignments.map((dept, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {dept.department}
                    {dept.overdue > 0 && (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {dept.overdue} Vencidas
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {dept.total} PQRSD asignadas • {dept.users.length} usuario(s)
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Ver Detalles
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Department Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{dept.pending}</div>
                    <div className="text-sm text-muted-foreground">Pendientes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{dept.inProgress}</div>
                    <div className="text-sm text-muted-foreground">En Proceso</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {dept.total - dept.pending - dept.inProgress}
                    </div>
                    <div className="text-sm text-muted-foreground">Completadas</div>
                  </div>
                </div>

                {/* Users */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Usuarios Asignados</h4>
                  {dept.users.map((user, userIndex) => (
                    <div key={userIndex} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.assigned} asignadas • {user.completed} completadas
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{user.assigned} activas</Badge>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {user.completed}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
