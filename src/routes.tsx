import { Routes, Route } from "react-router"
import AuthLayout from "@/layouts/auth"
import Register from "@/pages/register"
import Login from "@/pages/login"
import { ProtectedRoute } from "@/components/protected-route"
import Dashboard from "@/pages/dashboard"
import { GuestRoute } from "@/components/guest-route"
import AppLayout from "@/layouts/app"
import Topup from "@/pages/topup"

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/topup" element={<Topup />} />
                    {/* NOTE: protected routes go here */}
                </Route>
            </Route>

            <Route element={<GuestRoute />}>
                <Route element={<AuthLayout />}>
                    <Route path="registrasi" element={<Register />} />
                    <Route path="login" element={<Login />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes
