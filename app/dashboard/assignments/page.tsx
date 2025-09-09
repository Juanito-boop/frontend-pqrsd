import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AssignmentWorkflow } from "@/components/assignments/assignment-workflow"

export default function AssignmentsPage() {
  return (
    <ProtectedRoute requiredRoles={["admin", "operator", "department_head"]}>
      <DashboardLayout>
        <AssignmentWorkflow />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
