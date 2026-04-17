import { Routes, Route } from "react-router"
import AuthLayout from "@/layouts/auth"
import Register from "@/pages/register"
import Login from "@/pages/login"
import { ProtectedRoute } from "@/components/protected-route"
import Dashboard from "@/pages/dashboard"
import { GuestRoute } from "@/components/guest-route"
import AppLayout from "@/layouts/app"
import Topup from "@/pages/topup"
import ServiceDetail from "./pages/service-detail"
import Transaction from "./pages/transaction"
import Account from "./pages/account"

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/topup" element={<Topup />} />
                    <Route path="/services/:code" element={<ServiceDetail />} />
                    <Route path="/transaction" element={<Transaction />} />
                    <Route path="/akun" element={<Account />} />
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
