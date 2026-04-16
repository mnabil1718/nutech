import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import Bg from "@/assets/Background Saldo.png"

const Balance = () => {
    const [showBalance, setShowBalance] = useState(false)

    return (
        <section
            className="flex flex-col h-full justify-between bg-primary text-primary-foreground p-6 rounded-lg"
            style={{
                backgroundImage: `url(${Bg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right center",
                backgroundSize: "auto 100%",
            }}
        >
            <p className="font-medium">Saldo Anda</p>

            <h1 className="font-semibold text-4xl">
                Rp {" "}
                <span>
                    {
                        showBalance ?
                            "5.000.000" :
                            <span className="tracking-wider">• • • • • •</span>
                    }
                </span>
            </h1>

            <button
                onClick={() => setShowBalance(prev => !prev)}
                className="flex items-center gap-2 text-sm font-medium w-fit"
            >
                {showBalance ? "Tutup Saldo" : "Lihat Saldo"}
                {showBalance ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
        </section>
    )
}

export default Balance
