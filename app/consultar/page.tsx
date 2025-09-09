import { CitizenLoginForm } from "@/components/citizen/citizen-login-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Info } from "lucide-react"
import Link from "next/link"

export default function ConsultarPage() {
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
                <h1 className="text-2xl font-bold text-balance">Consultar Estado PQRSD</h1>
                <p className="text-muted-foreground text-pretty">
                  Ingrese sus datos para consultar el estado de su solicitud
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
        <div className="flex mx-auto space-y-6">
          {/* Information Card */}
          <Card className="max-w-lg mr-8 hidden md:block">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Información Importante
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Para consultar el estado de su PQRSD necesita:</p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • <strong>Número de radicado:</strong> Código que recibió al registrar su solicitud <br /> (formato:
                  PQRSD-YYYY-NNNNNN)
                </li>
                <li>
                  • <strong>Código de acceso:</strong> Clave de 6 caracteres enviada a su correo electrónico
                </li>
              </ul>
              <div className="p-3 bg-muted rounded-lg mt-4">
                <p className="text-sm text-muted-foreground">
                  <strong>¿No recibió el código de acceso?</strong> Revise su carpeta de spam o correo no deseado. Si
                  aún no lo encuentra, puede solicitar un nuevo código.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Login Form */}
          <CitizenLoginForm />
        </div>
      </main>
    </div>
  )
}
