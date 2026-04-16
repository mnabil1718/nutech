import Balance from "@/components/balance"
import Greeting from "@/components/greeting"
import PaymentForm from "@/components/payment-form"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectServiceByCode, selectServices, selectServicesLoading } from "@/store/services/service.selector"
import { fetchServicesThunk } from "@/store/services/service.slice"
import { useEffect } from "react"
import { useParams } from "react-router"

const ServiceDetail = () => {
    const { code } = useParams()
    const dispatch = useAppDispatch()
    const services = useAppSelector(selectServices)
    const isLoading = useAppSelector(selectServicesLoading)
    const service = useAppSelector(selectServiceByCode(code!))

    useEffect(() => {
        if (!services.length) {
            dispatch(fetchServicesThunk())
        }
    }, [])

    return (
        <div>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-10 p-5 max-w-7xl mx-auto">
                <div className="col-span-1 lg:col-span-3">
                    <Greeting />
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <Balance />
                </div>
            </section>
            <section className="p-5 max-w-7xl mx-auto mt-12">
                <h2 className="text-lg text-muted-foreground ">Silahkan masukkan</h2>
                <h1 className="text-3xl font-medium">
                    Nominal Top Up
                </h1>
            </section>
            <section className="p-5 max-w-7xl mx-auto mt-5">
                {
                    service && (
                        <PaymentForm service={service} />
                    )
                }
            </section>
        </div>
    )
}

export default ServiceDetail
