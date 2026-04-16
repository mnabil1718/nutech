import { useState, useEffect } from "react"
import { getServices } from "@/services/services.service"
import type { Service } from "@/types/service.type"
import { toast } from "sonner";


export function useServices() {
    const [services, setServices] = useState<Service[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getServices()
            .then((res) => setServices(res.data ?? []))
            .catch(() => toast.error("Gagal memuat layanan"))
            .finally(() => setIsLoading(false))
    }, [])

    return { services, isLoading }
}
