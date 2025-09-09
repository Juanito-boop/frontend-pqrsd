"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Clock, CheckCircle, AlertTriangle, Users, TrendingUp, BarChart3, Eye } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Pqrsd {
  data: Data[]
  total: number
}

interface Stats {
  total: number;
  pendientes: number;
  resueltas: number;
  vencidas: number;
  esteMes: number;
  tiempoPromedio: number;
}

interface Data {
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

export function DashboardOverview() {
  const [recentPQRSD, setRecentPQRSD] = useState<Data[]>([])
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pendientes: 0,
    resueltas: 0,
    vencidas: 0,
    esteMes: 0,
    tiempoPromedio: 0,
  })
  const [loadingStats, setLoadingStats] = useState(true)
  const [loadingTable, setLoadingTable] = useState(true)
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(10)
  const [totalPages, setTotalPages] = useState<number>(1)

  // Fetch stats once
  useEffect(() => {
    const fetchStats = async () => {
      setLoadingStats(true)
      try {
        const token = localStorage.getItem("accessToken")
        const responseStats = await fetch("http://localhost:3001/api/v1/analytics/summary", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        })
        const resultStats: Stats = await responseStats.json()
        setStats(resultStats)
      } catch (error) {
        console.error("Error cargando estadísticas:", error)
      } finally {
        setLoadingStats(false)
      }
    }

    fetchStats()
  }, [])

  // Fetch table data per page (pagination requests)
  useEffect(() => {
    const fetchTable = async () => {
      setLoadingTable(true)
      try {
        const token = localStorage.getItem("accessToken")
        const responsePQRSD = await fetch(`http://localhost:3001/api/v1/pqrsd?page=${page}&limit=${limit}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        })
        const resultPQRSD: Pqrsd = await responsePQRSD.json()
        setRecentPQRSD(resultPQRSD.data)
        if (typeof resultPQRSD.total === 'number') {
          setTotalPages(Math.max(1, Math.ceil(resultPQRSD.total / limit)))
        }
      } catch (error) {
        console.error("Error cargando PQRSD:", error)
      } finally {
        setLoadingTable(false)
      }
    }

    fetchTable()
  }, [page, limit])

  // If both stats and table are still loading, show a simple full placeholder.
  if (loadingStats && loadingTable) {
    return <p className="text-center">Cargando datos...</p>
  }

  const counts = {
    recibida: recentPQRSD.filter(p => p.status === "recibida").length,
    en_proceso: recentPQRSD.filter(p => p.status === "en_proceso").length,
    asignada: recentPQRSD.filter(p => p.status === "asignada").length,
    respondida: recentPQRSD.filter(p => p.status === "respondida").length,
    cerrada: recentPQRSD.filter(p => p.status === "cerrada").length,
  }


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-balance">Resumen del Sistema</h1>
          <p className="text-muted-foreground text-pretty">Vista general del estado de las PQRSD en el sistema</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Ver Analytics Completo
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total PQRSD</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">+{stats.esteMes} este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendientes}</div>
            <p className="text-xs text-muted-foreground">Requieren atención</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resueltas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.resueltas}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.resueltas / stats.total) * 100).toFixed(1)}% del total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencidas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.vencidas}</div>
            <p className="text-xs text-muted-foreground">Requieren atención urgente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Este Mes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.esteMes}</div>
            <p className="text-xs text-muted-foreground">Nuevas solicitudes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.tiempoPromedio === 0 ? "-" : `${stats.tiempoPromedio} días`}
            </div>
            <p className="text-xs text-muted-foreground">Tiempo de respuesta</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent PQRSD */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>PQRSD Recientes</CardTitle>
              <CardDescription>Últimas solicitudes registradas en el sistema</CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link href="/dashboard/pqrsd" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Ver Todas
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto min-h-[600px]">
            <table className="w-full border-collapse border text-sm text-center">
              <thead>
                <tr className="bg-muted">
                  <th className="border px-4 py-2">Recibidas ({counts.recibida})</th>
                  <th className="border px-4 py-2">En Proceso ({counts.en_proceso})</th>
                  <th className="border px-4 py-2">Asignadas ({counts.asignada})</th>
                  <th className="border px-4 py-2">Respondidas ({counts.respondida})</th>
                  <th className="border px-4 py-2">Cerradas ({counts.cerrada})</th>
                </tr>
              </thead>
              <tbody>
                {loadingTable ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-sm text-muted-foreground">Cargando tabla...</td>
                  </tr>
                ) : (
                  <tr>
                    {/* Recibida */}
                    <td className="border px-2 py-2 align-top">
                      {recentPQRSD
                        .filter(p => p.status === "recibida")
                        .map(p => (
                          <div key={p.id} className="mb-2 p-2 border rounded text-left">
                            <p className="font-medium">{p.filingNumber}</p>
                            <p className="text-xs text-muted-foreground">{p.subject}</p>
                          </div>
                        ))}
                    </td>

                    {/* En Proceso */}
                    <td className="border px-2 py-2 align-top">
                      {recentPQRSD
                        .filter(p => p.status === "en_proceso")
                        .map(p => (
                          <div key={p.id} className="mb-2 p-2 border rounded text-left">
                            <p className="font-medium">{p.filingNumber}</p>
                            <p className="text-xs text-muted-foreground">{p.subject}</p>
                          </div>
                        ))}
                    </td>

                    {/* Asignada */}
                    <td className="border px-2 py-2 align-top">
                      {recentPQRSD
                        .filter(p => p.status === "asignada")
                        .map(p => (
                          <div key={p.id} className="mb-2 p-2 border rounded text-left">
                            <p className="font-medium">{p.filingNumber}</p>
                            <p className="text-xs text-muted-foreground">{p.subject}</p>
                          </div>
                        ))}
                    </td>

                    {/* Respondida */}
                    <td className="border px-2 py-2 align-top">
                      {recentPQRSD
                        .filter(p => p.status === "respondida")
                        .map(p => (
                          <div key={p.id} className="mb-2 p-2 border rounded text-left">
                            <p className="font-medium">{p.filingNumber}</p>
                            <p className="text-xs text-muted-foreground">{p.subject}</p>
                          </div>
                        ))}
                    </td>

                    {/* Cerrada */}
                    <td className="border px-2 py-2 align-top">
                      {recentPQRSD
                        .filter(p => p.status === "cerrada")
                        .map(p => (
                          <div key={p.id} className="mb-2 p-2 border rounded text-left">
                            <p className="font-medium">{p.filingNumber}</p>
                            <p className="text-xs text-muted-foreground">{p.subject}</p>
                          </div>
                        ))}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">Página {page} de {totalPages}</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}>
                  Anterior
                </Button>
                <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>
                  Siguiente
                </Button>
              </div>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
