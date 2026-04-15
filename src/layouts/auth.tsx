import { Outlet } from "react-router"
import Illustration from '@/assets/Illustrasi Login.png'

const AuthLayout = () => {
    return (
        <div className="flex w-full h-screen">
            <div className="basis-full md:basis-1/2 flex justify-center items-center">
                <Outlet />
            </div>

            <div className="relative hidden md:flex md:basis-1/2">
                <img
                    src={Illustration}
                    className="w-full h-full object-cover"
                    alt="Login Illustration"
                />
            </div>
        </div>
    )
}

export default AuthLayout
