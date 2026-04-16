import { useServices } from "@/hooks/use-services"
import { Skeleton } from "@/components/ui/skeleton"

const Services = () => {
    const { services, isLoading } = useServices()

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
                <button
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
                </button>
            ))}
        </div>
    )
}

export default Services
