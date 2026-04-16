import { useAppSelector } from "@/store/hooks"
import { selectIsAuthenticated } from "@/store/auth/auth.selector"
import { Navigate, Outlet } from "react-router"

export const ProtectedRoute = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
