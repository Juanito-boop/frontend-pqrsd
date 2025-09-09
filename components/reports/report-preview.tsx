"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Calendar, BarChart3 } from "lucide-react"

interface ReportPreviewProps {
  open: boolean
  onClose: () => void
  reportData: any
  onDownload: (format: string) => void
}

export function ReportPreview({ open, onClose, reportData, onDownload }: ReportPreviewProps) {
  // Mock preview data
  const previewData = {
    title: "Resumen Mensual - Enero 2024",
    generatedAt: new Date().toLocaleString("es-CO"),
    period: "Enero 2024",
    totalPages: 15,
    sections: [
      {
        title: "Resumen Ejecutivo",
        description: "Métricas principales y KPIs del período",
        metrics: ["1,247 PQRSD totales", "92.3% cumplimiento", "8.5 días promedio"],
      },
      {
        title: "Distribución por Tipo",
        description: "Análisis detallado por categoría de PQRSD",
        metrics: ["34.1% Peticiones", "25.0% Quejas", "18.8% Reclamos"],
      },
      {
        title: "Rendimiento por Departamento",
        description: "Desempeño de cada área organizacional",
        metrics: ["7 departamentos", "345 asignaciones", "320 resoluciones"],
      },
      {
        title: "Análisis de Cumplimiento",
        description: "Cumplimiento de plazos legales y normativos",
        metrics: ["12 PQRSD vencidas", "1,158 resueltas a tiempo", "89 pendientes"],
      },
    ],
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Vista Previa del Reporte
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Report Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{previewData.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {previewData.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {previewData.totalPages} páginas
                    </span>
                    <span>Generado: {previewData.generatedAt}</span>
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => onDownload("pdf")}>
                    <Download className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onDownload("excel")}>
                    <Download className="h-4 w-4 mr-1" />
                    Excel
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Report Sections */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contenido del Reporte</h3>
            {previewData.sections.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        {section.title}
                      </CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                    <Badge variant="outline">Sección {index + 1}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {section.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="p-3 bg-muted rounded-lg text-center">
                        <p className="text-sm font-medium">{metric}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sample Charts Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Visualizaciones Incluidas</CardTitle>
              <CardDescription>Gráficos y tablas que aparecerán en el reporte final</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Gráfico de Barras</p>
                  <p className="text-xs text-muted-foreground">PQRSD por Departamento</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Gráfico Circular</p>
                  <p className="text-xs text-muted-foreground">Distribución por Tipo</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Gráfico de Líneas</p>
                  <p className="text-xs text-muted-foreground">Tendencia Mensual</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Report Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Reporte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">1,247</div>
                  <div className="text-sm text-muted-foreground">Total PQRSD</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">92.3%</div>
                  <div className="text-sm text-muted-foreground">Cumplimiento</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">8.5</div>
                  <div className="text-sm text-muted-foreground">Días Promedio</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">12</div>
                  <div className="text-sm text-muted-foreground">Vencidas</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cerrar Vista Previa
            </Button>
            <Button onClick={() => onDownload("pdf")}>
              <Download className="h-4 w-4 mr-2" />
              Descargar Reporte
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
