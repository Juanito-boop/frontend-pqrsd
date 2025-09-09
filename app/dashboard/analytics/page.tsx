import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"

export default function AnalyticsPage() {
  return (
    <ProtectedRoute requiredRoles={["admin", "operator", "department_head"]}>
      <DashboardLayout>
        <AnalyticsDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
