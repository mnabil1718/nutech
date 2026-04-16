import { Eye, EyeOff } from "lucide-react"
import { useEffect, useState } from "react"
import Bg from "@/assets/Background Saldo.png"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectBalance, selectBalanceLoading } from "@/store/balance/balance.selector"
import { fetchBalanceThunk } from "@/store/balance/balance.slice"
import { Skeleton } from "./ui/skeleton"

const Balance = () => {
    const dispatch = useAppDispatch()
    const amount = useAppSelector(selectBalance)
    const isLoading = useAppSelector(selectBalanceLoading)
    const [showBalance, setShowBalance] = useState(false)

    useEffect(() => {
        if (amount === null) dispatch(fetchBalanceThunk())
    }, [])

    const formatted = amount?.toLocaleString("id-ID")

    function renderBalance(): React.ReactNode {
        if (isLoading) {
            return <Skeleton className="w-36 h-8 rounded opacity-50" />
        }

        if (amount !== null && showBalance) {
            return <span>{formatted}</span>
        }

        if (amount !== null && !showBalance) {
            return <span className="tracking-wider">• • • • • •</span>
        }

        return <span>0</span>
    }

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

            <div className="flex items-center gap-3 font-semibold text-4xl">
                Rp {" "}

                {renderBalance()}
            </div>

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
