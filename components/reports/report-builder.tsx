"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, BarChart3, PieChart, LineChart } from "lucide-react"

interface ReportBuilderProps {
  open: boolean
  onClose: () => void
}

export function ReportBuilder({ open, onClose }: ReportBuilderProps) {
  const [reportName, setReportName] = useState("")
  const [reportDescription, setReportDescription] = useState("")
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([])
  const [selectedCharts, setSelectedCharts] = useState<string[]>([])
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const availableMetrics = [
    { id: "total_pqrsd", name: "Total PQRSD", description: "Número total de solicitudes" },
    { id: "by_type", name: "Por Tipo", description: "Distribución por tipo de PQRSD" },
    { id: "by_department", name: "Por Departamento", description: "Distribución por departamento" },
    { id: "by_status", name: "Por Estado", description: "Distribución por estado actual" },
    { id: "response_time", name: "Tiempo de Respuesta", description: "Métricas de tiempo promedio" },
    { id: "overdue_count", name: "PQRSD Vencidas", description: "Cantidad de solicitudes vencidas" },
    { id: "satisfaction", name: "Satisfacción", description: "Índices de satisfacción ciudadana" },
    { id: "trends", name: "Tendencias", description: "Evolución temporal de métricas" },
  ]

  const availableCharts = [
    { id: "bar_chart", name: "Gráfico de Barras", icon: BarChart3 },
    { id: "pie_chart", name: "Gráfico Circular", icon: PieChart },
    { id: "line_chart", name: "Gráfico de Líneas", icon: LineChart },
  ]

  const availableFilters = [
    { id: "date_range", name: "Rango de Fechas", description: "Filtrar por período específico" },
    { id: "department", name: "Departamento", description: "Filtrar por departamento" },
    { id: "pqrsd_type", name: "Tipo de PQRSD", description: "Filtrar por tipo de solicitud" },
    { id: "status", name: "Estado", description: "Filtrar por estado actual" },
    { id: "priority", name: "Prioridad", description: "Filtrar por nivel de prioridad" },
  ]

  const handleMetricToggle = (metricId: string) => {
    setSelectedMetrics((prev) => (prev.includes(metricId) ? prev.filter((id) => id !== metricId) : [...prev, metricId]))
  }

  const handleChartToggle = (chartId: string) => {
    setSelectedCharts((prev) => (prev.includes(chartId) ? prev.filter((id) => id !== chartId) : [...prev, chartId]))
  }

  const handleFilterToggle = (filterId: string) => {
    setSelectedFilters((prev) => (prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]))
  }

  const handleSaveReport = () => {
    const reportConfig = {
      name: reportName,
      description: reportDescription,
      metrics: selectedMetrics,
      charts: selectedCharts,
      filters: selectedFilters,
      createdAt: new Date().toISOString(),
    }

    console.log("Saving custom report:", reportConfig)
    // In production, save to backend
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Constructor de Reportes Personalizados
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
              <CardDescription>Configure los detalles básicos del reporte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reportName">Nombre del Reporte *</Label>
                <Input
                  id="reportName"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="Ej: Reporte Mensual Personalizado"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reportDescription">Descripción</Label>
                <Textarea
                  id="reportDescription"
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder="Descripción del propósito y contenido del reporte"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="metrics" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="metrics">Métricas</TabsTrigger>
              <TabsTrigger value="charts">Gráficos</TabsTrigger>
              <TabsTrigger value="filters">Filtros</TabsTrigger>
            </TabsList>

            <TabsContent value="metrics">
              <Card>
                <CardHeader>
                  <CardTitle>Seleccionar Métricas</CardTitle>
                  <CardDescription>Elija las métricas que desea incluir en el reporte</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableMetrics.map((metric) => (
                      <div key={metric.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <Checkbox
                          id={metric.id}
                          checked={selectedMetrics.includes(metric.id)}
                          onCheckedChange={() => handleMetricToggle(metric.id)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={metric.id} className="font-medium cursor-pointer">
                            {metric.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">{metric.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">Métricas seleccionadas: {selectedMetrics.length}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="charts">
              <Card>
                <CardHeader>
                  <CardTitle>Tipos de Gráficos</CardTitle>
                  <CardDescription>Seleccione los tipos de visualización para sus datos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {availableCharts.map((chart) => (
                      <div
                        key={chart.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedCharts.includes(chart.id)
                            ? "border-primary bg-primary/5"
                            : "border-muted hover:border-primary/50"
                        }`}
                        onClick={() => handleChartToggle(chart.id)}
                      >
                        <div className="flex flex-col items-center text-center space-y-2">
                          <chart.icon className="h-8 w-8 text-primary" />
                          <h4 className="font-medium">{chart.name}</h4>
                          {selectedCharts.includes(chart.id) && (
                            <Badge variant="default" className="text-xs">
                              Seleccionado
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="filters">
              <Card>
                <CardHeader>
                  <CardTitle>Filtros Disponibles</CardTitle>
                  <CardDescription>Configure los filtros que estarán disponibles en el reporte</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {availableFilters.map((filter) => (
                      <div key={filter.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <Checkbox
                          id={filter.id}
                          checked={selectedFilters.includes(filter.id)}
                          onCheckedChange={() => handleFilterToggle(filter.id)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={filter.id} className="font-medium cursor-pointer">
                            {filter.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">{filter.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Vista Previa de Configuración</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Métricas Seleccionadas ({selectedMetrics.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMetrics.map((metricId) => {
                      const metric = availableMetrics.find((m) => m.id === metricId)
                      return (
                        <Badge key={metricId} variant="secondary">
                          {metric?.name}
                        </Badge>
                      )
                    })}
                    {selectedMetrics.length === 0 && (
                      <p className="text-sm text-muted-foreground">Ninguna métrica seleccionada</p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Gráficos Seleccionados ({selectedCharts.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCharts.map((chartId) => {
                      const chart = availableCharts.find((c) => c.id === chartId)
                      return (
                        <Badge key={chartId} variant="secondary">
                          {chart?.name}
                        </Badge>
                      )
                    })}
                    {selectedCharts.length === 0 && (
                      <p className="text-sm text-muted-foreground">Ningún gráfico seleccionado</p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Filtros Disponibles ({selectedFilters.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedFilters.map((filterId) => {
                      const filter = availableFilters.find((f) => f.id === filterId)
                      return (
                        <Badge key={filterId} variant="secondary">
                          {filter?.name}
                        </Badge>
                      )
                    })}
                    {selectedFilters.length === 0 && (
                      <p className="text-sm text-muted-foreground">Ningún filtro seleccionado</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSaveReport} disabled={!reportName || selectedMetrics.length === 0}>
              Guardar Reporte
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
