import { Skeleton } from "@/components/ui/skeleton"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectServices, selectServicesLoading } from "@/store/services/service.selector"
import { useEffect } from "react"
import { fetchServicesThunk } from "@/store/services/service.slice"
import { toast } from "sonner"
import { Link } from "react-router"

const Services = () => {
    const dispatch = useAppDispatch()
    const services = useAppSelector(selectServices)
    const isLoading = useAppSelector(selectServicesLoading)

    useEffect(() => {
        if (services.length === 0) {
            dispatch(fetchServicesThunk())
                .unwrap()
                .catch(() => toast.error("Gagal memuat layanan"))
        }
    }, [])

    if (isLoading) return (
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                    <Skeleton className="size-14 rounded-md" />
                    <Skeleton className="h-3 w-16" />
                </div>
            ))}
        </div>
    )

    return (
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-5">
            {services.map((service) => (
                <Link
                    to={`/services/${service.service_code}`}
                    key={service.service_code}
                    className="flex flex-col items-center gap-2 group"
                >
                    <img
                        src={service.service_icon}
                        alt={service.service_name}
                        className="size-14 rounded-md object-cover"
                    />
                    <span className="text-xs text-center leading-tight">
                        {service.service_name}
                    </span>
                </Link>
            ))}
        </div>
    )
}

export default Services
