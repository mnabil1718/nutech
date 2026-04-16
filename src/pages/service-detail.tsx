import Balance from "@/components/balance"
import Greeting from "@/components/greeting"
import PaymentForm from "@/components/payment-form"
import { selectServiceByCode, selectServices, selectServicesLoading } from "@/store/services/service.selector"
import { useParams } from "react-router"

const ServiceDetail = () => {
    const { code } = useParams()

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
            <section className="p-5 max-w-7xl mx-auto mt-5">
                <PaymentForm code={code} />
            </section>
        </div>
    )
}

export default ServiceDetail
