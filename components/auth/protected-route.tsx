"use client"

import type React from "react"

import { useAuth } from "./auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: string[]
  fallbackPath?: string
}

export function ProtectedRoute({ children, requiredRoles = [], fallbackPath = "/login" }: ProtectedRouteProps) {
  const { user, loading, isAuthenticated, hasRole } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push(fallbackPath)
        return
      }

      if (requiredRoles.length > 0 && !hasRole(requiredRoles)) {
        router.push("/unauthorized")
        return
      }
    }
  }, [loading, isAuthenticated, user, router, requiredRoles, hasRole, fallbackPath])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Verificando autenticación...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAuthenticated || (requiredRoles.length > 0 && !hasRole(requiredRoles))) {
    return null
  }

  return <>{children}</>
}
