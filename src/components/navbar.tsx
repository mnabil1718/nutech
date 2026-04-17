import Brand from "@/components/brand"
import { NavLink } from "react-router"

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-20 w-full flex justify-center border-b border-b-foreground/10 backdrop-blur-lg bg-background/50">
            <div className="w-full max-w-7xl flex justify-between items-center p-5">
                <NavLink to={"/"} className="flex items-center gap-2">
                    <Brand />
                    <span className="font-semibold">SIMS PPOB</span>
                </NavLink>

                <div className="text-sm flex items-center w-fit gap-7">
                    <NavLink
                        to={"/topup"}
                        className={({ isActive }) =>
                            isActive ? "text-primary" : "text-foreground"
                        }
                    >
                        Top up
                    </NavLink>

                    <NavLink
                        to={"/transaction"}
                        className={({ isActive }) =>
                            isActive ? "text-primary" : "text-foreground"
                        }
                    >
                        Transaction
                    </NavLink>

                    <NavLink
                        to={"/akun"}
                        className={({ isActive }) =>
                            isActive ? "text-primary" : "text-foreground"
                        }
                    >
                        Akun
                    </NavLink>
                </div>
            </div>
        </nav >
    )
}

export default Navbar
