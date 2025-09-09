import { PQRSDRegistrationForm } from "@/components/pqrsd/pqrsd-registration-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Clock, FileText, Users, Search } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
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
                <h1 className="text-2xl font-bold text-balance">Sistema PQRSD</h1>
                <p className="text-muted-foreground text-pretty">
                  Peticiones, Quejas, Reclamos, Sugerencias y Denuncias
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/ayuda" className="text-primary hover:text-primary/80 font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Ayuda
              </Link>
              <Link
                href="/consultar"
                className="bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                Consultar Estado
              </Link>
              <Link
                href="/login"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Acceso Funcionarios
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Information Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Tipos de PQRSD
                </CardTitle>
                <CardDescription>Seleccione el tipo de solicitud que mejor describa su caso</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium">Petición</h4>
                    <p className="text-sm text-muted-foreground">Solicitud de información o actuación administrativa</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium">Queja</h4>
                    <p className="text-sm text-muted-foreground">Manifestación de protesta o inconformidad</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium">Reclamo</h4>
                    <p className="text-sm text-muted-foreground">Solicitud de corrección de situación particular</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium">Sugerencia</h4>
                    <p className="text-sm text-muted-foreground">Propuesta de mejoramiento de procesos</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium">Denuncia</h4>
                    <p className="text-sm text-muted-foreground">Puesta en conocimiento de conductas irregulares</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium">Derecho de Petición</h4>
                    <p className="text-sm text-muted-foreground">Mecanismo para solicitar información o requerir acciones a entidades públicas o privadas</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium">Tutela</h4>
                    <p className="text-sm text-muted-foreground">Acción para la protección inmediata de derechos fundamentales</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Tiempos de Respuesta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Peticiones, Quejas, Reclamos</span>
                    <span className="text-sm font-medium">15 días</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sugerencias</span>
                    <span className="text-sm font-medium">15 días</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Denuncias</span>
                    <span className="text-sm font-medium">30 días</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Tutelas</span>
                    <span className="text-sm font-medium">10 días</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Protección de Datos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-pretty">
                  Sus datos personales serán tratados conforme a la Ley 1581 de 2012 de Protección de Datos Personales y
                  únicamente serán utilizados para la gestión de su solicitud.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-2">
            <PQRSDRegistrationForm />
          </div>
        </div>
      </main>
    </div>
  )
}
