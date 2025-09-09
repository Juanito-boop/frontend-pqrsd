"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, AlertCircle, Loader2 } from "lucide-react"

export function CitizenLoginForm() {
  const [filingNumber, setFilingNumber] = useState("")
  const [accessCode, setAccessCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(`http://localhost:3001/api/v1/pqrsd/track/${filingNumber}?accessCode=${accessCode}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (response.ok) {
        sessionStorage.setItem("pqrsdData", JSON.stringify(data))
        router.push("/consultar/dashboard")
      } else {
        setError(data.message || "Datos incorrectos. Verifique el número de radicado y código de acceso.")
      }
    } catch (error) {
      setError("Error de conexión. Intente nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Consultar Estado
        </CardTitle>
        <CardDescription>Ingrese los datos de su solicitud para consultar su estado actual</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="filingNumber">Número de Radicado</Label>
            <Input
              id="filingNumber"
              type="text"
              placeholder="PQRSD-2025-000001"
              value={filingNumber}
              onChange={(e) => setFilingNumber(e.target.value)}
              required
              className="font-mono text-start text-lg tracking-wider"
            />
            <p className="text-xs text-muted-foreground">Formato: PQRSD-YYYY-NNNNNN (ejemplo: PQRSD-2025-000015)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accessCode">Código de Acceso</Label>
            <Input
              id="accessCode"
              type="text"
              placeholder="ABC123"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
              maxLength={6}
              required
              className="font-mono text-start text-lg tracking-wider"
            />
            <p className="text-xs text-muted-foreground">Código de 6 caracteres enviado a su correo electrónico</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Consultando...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Consultar Estado
              </>
            )}
          </Button>

          <div className="text-center pt-4">
            <Button variant="link" className="text-sm">
              ¿No recibió el código de acceso?
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
