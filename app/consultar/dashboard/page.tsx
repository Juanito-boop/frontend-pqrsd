"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CitizenDashboard } from "@/components/citizen/citizen-dashboard"
import { Loader2 } from "lucide-react"

export default function CitizenDashboardPage() {
  const [pqrsdData, setPqrsdData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const data = sessionStorage.getItem("pqrsdData")
    if (data) {
      setPqrsdData(JSON.parse(data))
    } else {
      router.push("/consultar")
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!pqrsdData) {
    return null
  }

  return <CitizenDashboard data={pqrsdData} />
}
