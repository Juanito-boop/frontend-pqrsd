"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, TrendingDown, FileText, Clock, Users, AlertTriangle, Download, Calendar } from "lucide-react"

export function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("current_month")
  const [loading, setLoading] = useState(true)

  // Mock analytics data
  const [analyticsData, setAnalyticsData] = useState({
    summary: {
      totalPQRSD: 1247,
      thisMonth: 156,
      resolved: 1158,
      pending: 89,
      overdue: 12,
      avgResponseTime: 8.5,
      onTimeRate: 92.3,
      citizenSatisfaction: 4.2,
    },
    monthlyTrend: [
      { month: "Ene", total: 98, resolved: 89, overdue: 5 },
      { month: "Feb", total: 112, resolved: 105, overdue: 3 },
      { month: "Mar", total: 134, resolved: 128, overdue: 4 },
      { month: "Abr", total: 145, resolved: 138, overdue: 6 },
      { month: "May", total: 156, resolved: 148, overdue: 7 },
      { month: "Jun", total: 167, resolved: 159, overdue: 8 },
    ],
    typeDistribution: [
      { name: "Petición", value: 425, percentage: 34.1, color: "#0891b2" },
      { name: "Queja", value: 312, percentage: 25.0, color: "#84cc16" },
      { name: "Reclamo", value: 234, percentage: 18.8, color: "#f59e0b" },
      { name: "Sugerencia", value: 156, percentage: 12.5, color: "#8b5cf6" },
      { name: "Denuncia", value: 89, percentage: 7.1, color: "#ef4444" },
      { name: "Derecho de Petición", value: 31, percentage: 2.5, color: "#06b6d4" },
    ],
    departmentPerformance: [
      { department: "Atención al Ciudadano", assigned: 345, resolved: 320, pending: 25, avgTime: 7.2 },
      { department: "Jurídica", assigned: 234, resolved: 210, pending: 24, avgTime: 12.5 },
      { department: "Administrativa", assigned: 189, resolved: 175, pending: 14, avgTime: 6.8 },
      { department: "Financiera", assigned: 156, resolved: 148, pending: 8, avgTime: 5.9 },
      { department: "Sistemas", assigned: 123, resolved: 118, pending: 5, avgTime: 4.2 },
      { department: "Talento Humano", assigned: 98, resolved: 92, pending: 6, avgTime: 8.1 },
      { department: "Planeación", assigned: 67, resolved: 63, pending: 4, avgTime: 9.3 },
    ],
    responseTimeline: [
      { range: "0-5 días", count: 567, percentage: 45.5 },
      { range: "6-10 días", count: 423, percentage: 33.9 },
      { range: "11-15 días", count: 189, percentage: 15.2 },
      { range: "16-20 días", count: 45, percentage: 3.6 },
      { range: "Más de 20 días", count: 23, percentage: 1.8 },
    ],
    petitionerTypes: [
      { type: "Persona Natural", count: 1089, percentage: 87.3 },
      { type: "Organización", count: 158, percentage: 12.7 },
    ],
  })

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("es-CO").format(num)
  }

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`
  }

  if (loading) {
    return <div>Cargando analytics...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-balance">Dashboard de Analíticas</h1>
          <p className="text-muted-foreground text-pretty">
            Métricas y análisis del comportamiento de PQRSD en tiempo real
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current_month">Mes Actual</SelectItem>
              <SelectItem value="last_month">Mes Anterior</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Año</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total PQRSD</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analyticsData.summary.totalPQRSD)}</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />+{analyticsData.summary.thisMonth} este mes
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Cumplimiento</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(analyticsData.summary.onTimeRate)}</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              +2.1% vs mes anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.summary.avgResponseTime} días</div>
            <div className="flex items-center gap-1 text-xs text-red-600">
              <TrendingDown className="h-3 w-3" />
              +0.3 días vs mes anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PQRSD Vencidas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{analyticsData.summary.overdue}</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingDown className="h-3 w-3" />
              -3 vs mes anterior
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Tendencias</TabsTrigger>
          <TabsTrigger value="types">Por Tipo</TabsTrigger>
          <TabsTrigger value="departments">Por Departamento</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Evolución Mensual de PQRSD</CardTitle>
                <CardDescription>Tendencia de solicitudes recibidas y resueltas</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analyticsData.monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stackId="1"
                      stroke="#0891b2"
                      fill="#0891b2"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="resolved"
                      stackId="2"
                      stroke="#84cc16"
                      fill="#84cc16"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tiempos de Respuesta</CardTitle>
                <CardDescription>Distribución de PQRSD por tiempo de resolución</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.responseTimeline} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="range" type="category" width={80} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#0891b2" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Comparativo de Rendimiento</CardTitle>
              <CardDescription>Evolución de métricas clave en los últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={analyticsData.monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="total" stroke="#0891b2" strokeWidth={2} name="Total Recibidas" />
                  <Line type="monotone" dataKey="resolved" stroke="#84cc16" strokeWidth={2} name="Resueltas" />
                  <Line type="monotone" dataKey="overdue" stroke="#ef4444" strokeWidth={2} name="Vencidas" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="types" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Tipo de PQRSD</CardTitle>
                <CardDescription>Clasificación de solicitudes por categoría</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.typeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} (${percentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analyticsData.typeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalle por Tipo</CardTitle>
                <CardDescription>Estadísticas detalladas por categoría</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.typeDistribution.map((type, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: type.color }} />
                        <div>
                          <p className="font-medium">{type.name}</p>
                          <p className="text-sm text-muted-foreground">{formatPercentage(type.percentage)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatNumber(type.value)}</p>
                        <p className="text-sm text-muted-foreground">solicitudes</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tipo de Peticionario</CardTitle>
              <CardDescription>Clasificación por persona natural vs organización</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {analyticsData.petitionerTypes.map((type, index) => (
                  <div key={index} className="text-center p-6 border rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">{formatNumber(type.count)}</div>
                    <div className="text-lg font-medium mb-1">{type.type}</div>
                    <div className="text-sm text-muted-foreground">{formatPercentage(type.percentage)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento por Departamento</CardTitle>
              <CardDescription>Análisis de carga de trabajo y eficiencia por área</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analyticsData.departmentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="assigned" fill="#0891b2" name="Asignadas" />
                  <Bar dataKey="resolved" fill="#84cc16" name="Resueltas" />
                  <Bar dataKey="pending" fill="#f59e0b" name="Pendientes" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tiempo Promedio por Departamento</CardTitle>
                <CardDescription>Días promedio de resolución</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.departmentPerformance
                    .sort((a, b) => a.avgTime - b.avgTime)
                    .map((dept, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{dept.department}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${(dept.avgTime / 15) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold w-12 text-right">{dept.avgTime} días</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Eficiencia por Departamento</CardTitle>
                <CardDescription>Porcentaje de resolución</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.departmentPerformance
                    .sort((a, b) => (b.resolved / b.assigned) * 100 - (a.resolved / a.assigned) * 100)
                    .map((dept, index) => {
                      const efficiency = (dept.resolved / dept.assigned) * 100
                      return (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{dept.department}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${efficiency}%` }} />
                            </div>
                            <span className="text-sm font-bold w-12 text-right">{formatPercentage(efficiency)}</span>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Cumplimiento de Plazos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {formatPercentage(analyticsData.summary.onTimeRate)}
                  </div>
                  <p className="text-sm text-muted-foreground">PQRSD resueltas a tiempo</p>
                  <div className="mt-4">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Meta: 90%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Tiempo Promedio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {analyticsData.summary.avgResponseTime} días
                  </div>
                  <p className="text-sm text-muted-foreground">Tiempo promedio de respuesta</p>
                  <div className="mt-4">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Meta: ≤ 10 días
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Satisfacción
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    {analyticsData.summary.citizenSatisfaction}/5.0
                  </div>
                  <p className="text-sm text-muted-foreground">Calificación promedio</p>
                  <div className="mt-4">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      Meta: ≥ 4.0
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Indicadores de Gestión</CardTitle>
              <CardDescription>Métricas clave de rendimiento del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {formatNumber(analyticsData.summary.resolved)}
                  </div>
                  <div className="text-sm text-muted-foreground">PQRSD Resueltas</div>
                  <div className="text-xs text-green-600 mt-1">
                    {formatPercentage((analyticsData.summary.resolved / analyticsData.summary.totalPQRSD) * 100)}
                  </div>
                </div>

                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">
                    {formatNumber(analyticsData.summary.pending)}
                  </div>
                  <div className="text-sm text-muted-foreground">PQRSD Pendientes</div>
                  <div className="text-xs text-yellow-600 mt-1">
                    {formatPercentage((analyticsData.summary.pending / analyticsData.summary.totalPQRSD) * 100)}
                  </div>
                </div>

                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1">
                    {formatNumber(analyticsData.summary.overdue)}
                  </div>
                  <div className="text-sm text-muted-foreground">PQRSD Vencidas</div>
                  <div className="text-xs text-red-600 mt-1">
                    {formatPercentage((analyticsData.summary.overdue / analyticsData.summary.totalPQRSD) * 100)}
                  </div>
                </div>

                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {formatNumber(analyticsData.summary.thisMonth)}
                  </div>
                  <div className="text-sm text-muted-foreground">Este Mes</div>
                  <div className="text-xs text-blue-600 mt-1">+12.5% vs anterior</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
