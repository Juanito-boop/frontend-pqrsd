"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface LoginResult {
  accessToken: string
  user: User
}

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "admin" | "operator" | "analyst"
  departmentId: null | string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  department: null | string
}


interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<LoginResult | null>
  logout: () => void
  loading: boolean
  isAuthenticated: boolean
  hasRole: (roles: string | string[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  const hasRole = (roles: string | string[]) => {
    if (!user) return false
    const roleArray = Array.isArray(roles) ? roles : [roles]
    return roleArray.includes(user.role)
  }

  const login = async (email: string, password: string): Promise<LoginResult | null> => {
    try {
      const response = await fetch("https://34.30.227.130:3000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data: LoginResult = await response.json()

      if (response.ok && data.accessToken && data.user) {
        // Guardar en localStorage
        localStorage.setItem("accessToken", data.accessToken)
        localStorage.setItem("user", JSON.stringify(data.user))

        setUser(data.user)

        return data
      } else {
        return null
      }
    } catch (error) {
      console.error("Error during login:", error)
      return null
    }
  }

  const logout = async () => {
    try {
      await fetch("https://34.30.227.130:3000/api/v1/auth/logout", { method: "POST" })
    } catch (error) {
      console.error("Error during logout:", error)
    } finally {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("user")

      setUser(null)
      router.push("/login")
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("accessToken")
        const userData = localStorage.getItem("user")

        if (token && userData) {
          setUser(JSON.parse(userData))
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
