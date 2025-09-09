"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  FileText,
  Download,
  Calendar,
  Clock,
  BarChart3,
  Users,
  Building,
  TrendingUp,
  Settings,
  Play,
  Eye,
  Plus,
} from "lucide-react"
import { ReportBuilder } from "./report-builder"
import { ReportPreview } from "./report-preview"

export function ReportsSystem() {
  const [selectedReportType, setSelectedReportType] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [loading, setLoading] = useState(false)
  const [showBuilder, setShowBuilder] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [previewData, setPreviewData] = useState(null)

  // Predefined report templates
  const reportTemplates = [
    {
      id: "monthly_summary",
      name: "Resumen Mensual",
      description: "Reporte completo de PQRSD del mes con todas las métricas",
      icon: Calendar,
      category: "Gestión",
      frequency: "Mensual",
    },
    {
      id: "department_performance",
      name: "Rendimiento por Departamento",
      description: "Análisis detallado del desempeño de cada departamento",
      icon: Building,
      category: "Rendimiento",
      frequency: "Semanal",
    },
    {
      id: "compliance_report",
      name: "Reporte de Cumplimiento",
      description: "Cumplimiento de plazos legales y normatividad vigente",
      icon: FileText,
      category: "Cumplimiento",
      frequency: "Mensual",
    },
    {
      id: "citizen_satisfaction",
      name: "Satisfacción del Ciudadano",
      description: "Análisis de satisfacción y calidad del servicio",
      icon: Users,
      category: "Calidad",
      frequency: "Trimestral",
    },
    {
      id: "trend_analysis",
      name: "Análisis de Tendencias",
      description: "Evolución y tendencias de PQRSD en el tiempo",
      icon: TrendingUp,
      category: "Análisis",
      frequency: "Mensual",
    },
    {
      id: "overdue_report",
      name: "Reporte de Vencimientos",
      description: "PQRSD vencidas y próximas a vencer",
      icon: Clock,
      category: "Alertas",
      frequency: "Semanal",
    },
  ]

  // Recent reports
  const recentReports = [
    {
      id: 1,
      name: "Resumen Mensual - Enero 2024",
      type: "monthly_summary",
      generatedAt: "2024-02-01 09:30:00",
      generatedBy: "Ana López",
      status: "completed",
      size: "2.3 MB",
    },
    {
      id: 2,
      name: "Rendimiento Departamentos - Semana 4",
      type: "department_performance",
      generatedAt: "2024-01-28 16:45:00",
      generatedBy: "Sistema Automático",
      status: "completed",
      size: "1.8 MB",
    },
    {
      id: 3,
      name: "Cumplimiento Legal - Diciembre 2023",
      type: "compliance_report",
      generatedAt: "2024-01-05 11:20:00",
      generatedBy: "Pedro Sánchez",
      status: "completed",
      size: "3.1 MB",
    },
  ]

  // Scheduled reports
  const scheduledReports = [
    {
      id: 1,
      name: "Resumen Mensual Automático",
      template: "monthly_summary",
      frequency: "Mensual",
      nextRun: "2024-02-01 08:00:00",
      recipients: ["admin@pqrsd.gov.co", "director@pqrsd.gov.co"],
      active: true,
    },
    {
      id: 2,
      name: "Alertas de Vencimiento",
      template: "overdue_report",
      frequency: "Semanal",
      nextRun: "2024-01-22 07:00:00",
      recipients: ["operaciones@pqrsd.gov.co"],
      active: true,
    },
  ]

  const handleGenerateReport = async () => {
    if (!selectedReportType || !selectedPeriod) {
      return
    }

    setLoading(true)

    try {
      // Simulate report generation
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // In production, make API call to generate report
      const reportData = {
        type: selectedReportType,
        period: selectedPeriod,
        department: selectedDepartment,
        generatedAt: new Date().toISOString(),
      }

      setPreviewData(reportData)
      setShowPreview(true)
    } catch (error) {
      console.error("Error generating report:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadReport = (reportId: number, format: string) => {
    // In production, trigger download from API
    console.log(`Downloading report ${reportId} in ${format} format`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completado"
      case "processing":
        return "Procesando"
      case "failed":
        return "Error"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-balance">Sistema de Reportes</h1>
          <p className="text-muted-foreground text-pretty">
            Genere reportes personalizados y programe informes automáticos
          </p>
        </div>
        <Button onClick={() => setShowBuilder(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Crear Reporte Personalizado
        </Button>
      </div>

      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="generate">Generar Reporte</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="scheduled">Programados</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Generar Nuevo Reporte
              </CardTitle>
              <CardDescription>Seleccione los parámetros para generar un reporte personalizado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reportType">Tipo de Reporte *</Label>
                  <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="period">Período *</Label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current_month">Mes Actual</SelectItem>
                      <SelectItem value="last_month">Mes Anterior</SelectItem>
                      <SelectItem value="current_quarter">Trimestre Actual</SelectItem>
                      <SelectItem value="last_quarter">Trimestre Anterior</SelectItem>
                      <SelectItem value="current_year">Año Actual</SelectItem>
                      <SelectItem value="custom">Período Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Departamento (Opcional)</Label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos los departamentos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los departamentos</SelectItem>
                      <SelectItem value="atencion_ciudadano">Atención al Ciudadano</SelectItem>
                      <SelectItem value="juridica">Jurídica</SelectItem>
                      <SelectItem value="administrativa">Administrativa</SelectItem>
                      <SelectItem value="sistemas">Sistemas</SelectItem>
                      <SelectItem value="talento_humano">Talento Humano</SelectItem>
                      <SelectItem value="financiera">Financiera</SelectItem>
                      <SelectItem value="planeacion">Planeación</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedPeriod === "custom" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Fecha Inicio</Label>
                    <Input type="date" id="startDate" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Fecha Fin</Label>
                    <Input type="date" id="endDate" />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <Button variant="outline" disabled={loading}>
                  Vista Previa
                </Button>
                <Button onClick={handleGenerateReport} disabled={loading || !selectedReportType || !selectedPeriod}>
                  {loading ? "Generando..." : "Generar Reporte"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {loading && (
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                Generando reporte... Este proceso puede tomar algunos minutos dependiendo del volumen de datos.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <template.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{template.category}</Badge>
                          <Badge variant="outline">{template.frequency}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedReportType(template.id)
                        // Switch to generate tab
                      }}
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Usar
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Vista Previa
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Historial de Reportes
              </CardTitle>
              <CardDescription>Reportes generados recientemente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{report.name}</h4>
                        <Badge className={getStatusColor(report.status)}>{getStatusText(report.status)}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Generado: {report.generatedAt}</span>
                        <span>Por: {report.generatedBy}</span>
                        <span>Tamaño: {report.size}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleDownloadReport(report.id, "pdf")}>
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDownloadReport(report.id, "excel")}>
                        <Download className="h-4 w-4 mr-1" />
                        Excel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Reportes Programados
                  </CardTitle>
                  <CardDescription>Configuración de reportes automáticos</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Programado
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReports.map((scheduled) => (
                  <div key={scheduled.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{scheduled.name}</h4>
                        <Badge variant={scheduled.active ? "default" : "secondary"}>
                          {scheduled.active ? "Activo" : "Inactivo"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Frecuencia:</span> {scheduled.frequency}
                        </div>
                        <div>
                          <span className="font-medium">Próxima ejecución:</span> {scheduled.nextRun}
                        </div>
                        <div>
                          <span className="font-medium">Destinatarios:</span> {scheduled.recipients.length}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Enviar a:</span> {scheduled.recipients.join(", ")}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        Editar
                      </Button>
                      <Button size="sm" variant="outline">
                        {scheduled.active ? "Pausar" : "Activar"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Report Builder Modal */}
      {showBuilder && <ReportBuilder open={showBuilder} onClose={() => setShowBuilder(false)} />}

      {/* Report Preview Modal */}
      {showPreview && previewData && (
        <ReportPreview
          open={showPreview}
          onClose={() => setShowPreview(false)}
          reportData={previewData}
          onDownload={(format) => console.log(`Downloading in ${format} format`)}
        />
      )}
    </div>
  )
}
