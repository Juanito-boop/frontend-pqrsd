import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ReportsSystem } from "@/components/reports/reports-system"

export default function ReportsPage() {
  return (
    <ProtectedRoute requiredRoles={["admin", "operator", "department_head"]}>
      <DashboardLayout>
        <ReportsSystem />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
