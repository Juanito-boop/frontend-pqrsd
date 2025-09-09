import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  FileText,
  Search,
  Users,
  BarChart3,
  Settings,
  Clock,
  AlertCircle,
  CheckCircle,
  User,
  Building,
  Download,
} from "lucide-react"
import Link from "next/link"

export default function AyudaPage() {
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
                <h1 className="text-2xl font-bold text-balance">Guía de Usuario - Sistema PQRSD</h1>
                <p className="text-muted-foreground text-pretty">
                  Aprenda a usar todas las funcionalidades del sistema
                </p>
              </div>
            </div>
            <Link href="/" className="text-primary hover:text-primary/80 font-medium">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Contenido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a href="#ciudadanos" className="block text-sm hover:text-primary transition-colors">
                  1. Para Ciudadanos
                </a>
                <a href="#seguimiento" className="block text-sm hover:text-primary transition-colors">
                  2. Seguimiento de Solicitudes
                </a>
                <a href="#administradores" className="block text-sm hover:text-primary transition-colors">
                  3. Para Administradores
                </a>
                <a href="#asignacion" className="block text-sm hover:text-primary transition-colors">
                  4. Gestión y Asignación
                </a>
                <a href="#reportes" className="block text-sm hover:text-primary transition-colors">
                  5. Reportes y Analytics
                </a>
                <a href="#roles" className="block text-sm hover:text-primary transition-colors">
                  6. Roles y Permisos
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Ciudadanos Section */}
            <section id="ciudadanos">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-6 w-6 text-primary" />
                    1. Cómo Registrar una PQRSD (Ciudadanos)
                  </CardTitle>
                  <CardDescription>
                    Guía paso a paso para presentar su petición, queja, reclamo, sugerencia o denuncia
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                          1
                        </span>
                        Acceda al Formulario
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        En la página principal, encontrará el formulario de registro de PQRSD. No necesita crear una
                        cuenta para presentar su solicitud.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                          2
                        </span>
                        Complete sus Datos
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Ingrese su información personal: nombre completo, documento de identidad, teléfono, email y
                        dirección.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                          3
                        </span>
                        Seleccione el Tipo
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Elija entre Petición, Queja, Reclamo, Sugerencia o Denuncia según corresponda a su caso.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                          4
                        </span>
                        Describa su Solicitud
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Escriba de manera clara y detallada su solicitud. Incluya fechas, lugares y personas
                        involucradas.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Tipos de PQRSD y Tiempos de Respuesta
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>
                            <Badge variant="outline">Petición</Badge>
                          </span>
                          <span className="font-medium">15 días hábiles</span>
                        </div>
                        <div className="flex justify-between">
                          <span>
                            <Badge variant="outline">Queja</Badge>
                          </span>
                          <span className="font-medium">15 días hábiles</span>
                        </div>
                        <div className="flex justify-between">
                          <span>
                            <Badge variant="outline">Reclamo</Badge>
                          </span>
                          <span className="font-medium">15 días hábiles</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>
                            <Badge variant="outline">Sugerencia</Badge>
                          </span>
                          <span className="font-medium">15 días hábiles</span>
                        </div>
                        <div className="flex justify-between">
                          <span>
                            <Badge variant="outline">Denuncia</Badge>
                          </span>
                          <span className="font-medium">30 días hábiles</span>
                        </div>
                        <div className="flex justify-between">
                          <span>
                            <Badge variant="outline">Tutela</Badge>
                          </span>
                          <span className="font-medium">10 días hábiles</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Seguimiento Section */}
            <section id="seguimiento">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-6 w-6 text-primary" />
                    2. Seguimiento de Solicitudes
                  </CardTitle>
                  <CardDescription>Cómo consultar el estado de su PQRSD usando el número de radicado</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Número de Radicado
                    </h4>
                    <p className="text-sm text-green-700">
                      Al enviar su PQRSD, recibirá un número de radicado único (ej: PQRSD-2024-001234). Guarde este
                      número para hacer seguimiento a su solicitud.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="bg-yellow-100 p-2 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-yellow-600" />
                      </div>
                      <h4 className="font-semibold">En Proceso</h4>
                      <p className="text-sm text-muted-foreground">Su solicitud está siendo revisada</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="bg-blue-100 p-2 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold">Asignada</h4>
                      <p className="text-sm text-muted-foreground">Asignada a la dependencia competente</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="bg-green-100 p-2 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold">Resuelta</h4>
                      <p className="text-sm text-muted-foreground">Su solicitud ha sido respondida</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Administradores Section */}
            <section id="administradores">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-6 w-6 text-primary" />
                    3. Panel Administrativo
                  </CardTitle>
                  <CardDescription>
                    Acceso y navegación del dashboard para funcionarios y administradores
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Acceso al Sistema</h4>
                    <p className="text-sm text-blue-700">
                      Los funcionarios deben iniciar sesión con sus credenciales institucionales. Contacte al
                      administrador del sistema para obtener acceso.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Dashboard Principal</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Resumen de PQRSD pendientes</li>
                        <li>• Alertas de vencimiento</li>
                        <li>• Métricas del mes actual</li>
                        <li>• Acceso rápido a funciones</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Navegación</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>
                          • <strong>PQRSD:</strong> Gestión de solicitudes
                        </li>
                        <li>
                          • <strong>Asignaciones:</strong> Distribución por dependencias
                        </li>
                        <li>
                          • <strong>Analytics:</strong> Métricas y estadísticas
                        </li>
                        <li>
                          • <strong>Reportes:</strong> Generación de informes
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Asignación Section */}
            <section id="asignacion">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-6 w-6 text-primary" />
                    4. Gestión y Asignación de PQRSD
                  </CardTitle>
                  <CardDescription>Cómo asignar, gestionar y dar seguimiento a las solicitudes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Proceso de Asignación</h4>
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">
                            1
                          </span>
                          <div>
                            <p className="font-medium">Revisar Solicitud</p>
                            <p className="text-sm text-muted-foreground">Analizar el tipo y contenido de la PQRSD</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">
                            2
                          </span>
                          <div>
                            <p className="font-medium">Seleccionar Dependencia</p>
                            <p className="text-sm text-muted-foreground">Asignar a la dependencia competente</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">
                            3
                          </span>
                          <div>
                            <p className="font-medium">Establecer Prioridad</p>
                            <p className="text-sm text-muted-foreground">Definir urgencia y fecha límite</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Estados de Seguimiento</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Recibida</Badge>
                          <span className="text-sm">Solicitud registrada en el sistema</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="default">En Proceso</Badge>
                          <span className="text-sm">Siendo revisada por la dependencia</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Pendiente Info</Badge>
                          <span className="text-sm">Requiere información adicional</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-600">Resuelta</Badge>
                          <span className="text-sm">Respuesta enviada al ciudadano</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Alertas de Vencimiento
                    </h4>
                    <p className="text-sm text-amber-700">
                      El sistema genera alertas automáticas 3 días antes del vencimiento. Las PQRSD vencidas aparecen
                      destacadas en rojo en el dashboard.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Reportes Section */}
            <section id="reportes">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-primary" />
                    5. Analytics y Reportes
                  </CardTitle>
                  <CardDescription>Generación de informes y análisis de métricas del sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Dashboard de Analytics</h4>
                      <ul className="text-sm space-y-2 text-muted-foreground">
                        <li>
                          • <strong>Métricas en tiempo real:</strong> Volumen mensual, tipos de PQRSD
                        </li>
                        <li>
                          • <strong>Rendimiento por dependencia:</strong> Tiempos de respuesta
                        </li>
                        <li>
                          • <strong>Tendencias:</strong> Comparativas mensuales y anuales
                        </li>
                        <li>
                          • <strong>Indicadores de cumplimiento:</strong> Porcentaje de respuestas a tiempo
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Tipos de Reportes</h4>
                      <ul className="text-sm space-y-2 text-muted-foreground">
                        <li>
                          • <strong>Reporte Mensual:</strong> Resumen ejecutivo del período
                        </li>
                        <li>
                          • <strong>Reporte por Dependencia:</strong> Desempeño específico
                        </li>
                        <li>
                          • <strong>Reporte de Cumplimiento:</strong> Indicadores normativos
                        </li>
                        <li>
                          • <strong>Reporte Personalizado:</strong> Filtros y criterios específicos
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Exportación de Reportes
                    </h4>
                    <p className="text-sm text-green-700">
                      Todos los reportes pueden exportarse en formato PDF para presentaciones ejecutivas o Excel para
                      análisis detallados. Los reportes incluyen gráficos y tablas dinámicas.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Roles Section */}
            <section id="roles">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-6 w-6 text-primary" />
                    6. Roles y Permisos del Sistema
                  </CardTitle>
                  <CardDescription>Descripción de los diferentes niveles de acceso y funcionalidades</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-red-600">Administrador</Badge>
                        <span className="font-semibold">Acceso Total</span>
                      </div>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Gestión completa de usuarios y roles</li>
                        <li>• Configuración del sistema y dependencias</li>
                        <li>• Acceso a todos los reportes y analytics</li>
                        <li>• Supervisión general del sistema</li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-blue-600">Coordinador</Badge>
                        <span className="font-semibold">Gestión Operativa</span>
                      </div>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Asignación de PQRSD a dependencias</li>
                        <li>• Supervisión de tiempos de respuesta</li>
                        <li>• Generación de reportes operativos</li>
                        <li>• Gestión de alertas y escalamientos</li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-green-600">Operador</Badge>
                        <span className="font-semibold">Gestión de Solicitudes</span>
                      </div>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Procesamiento de PQRSD asignadas</li>
                        <li>• Actualización de estados y comentarios</li>
                        <li>• Comunicación con ciudadanos</li>
                        <li>• Consulta de reportes básicos</li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">Consulta</Badge>
                        <span className="font-semibold">Solo Lectura</span>
                      </div>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Consulta de PQRSD y estados</li>
                        <li>• Visualización de reportes básicos</li>
                        <li>• Acceso a métricas generales</li>
                        <li>• Sin permisos de modificación</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Contact Section */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">¿Necesita Ayuda Adicional?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Si tiene preguntas adicionales sobre el uso del sistema o necesita soporte técnico, contacte al
                  administrador del sistema de su organización.
                </p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <strong>Soporte Técnico:</strong> soporte@sistema-pqrsd.gov.co
                  </div>
                  <div>
                    <strong>Teléfono:</strong> (601) 123-4567
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
