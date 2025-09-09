import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PQRSDManagement } from "@/components/pqrsd/pqrsd-management"

export default function PQRSDPage() {
  return (
    <ProtectedRoute requiredRoles={["admin", "operator", "department_head"]}>
      <DashboardLayout>
        <PQRSDManagement />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
