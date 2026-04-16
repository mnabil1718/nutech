
import { Outlet } from "react-router"
import Navbar from "@/components/navbar"

const AppLayout = () => {
    return (
        <div className="w-full min-h-screen">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default AppLayout
