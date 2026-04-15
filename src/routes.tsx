import { Routes, Route } from "react-router"
import AuthLayout from "@/layouts/auth"
import Register from "@/pages/register"

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="registrasi" element={<Register />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes
