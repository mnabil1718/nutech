import { useState, useEffect } from "react"
import { getBanners } from "@/services/banner.service"
import type { Banner } from "@/types/banner.type"
import { toast } from "sonner"

export function useBanners() {
    const [banners, setBanners] = useState<Banner[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getBanners()
            .then((res) => setBanners(res.data ?? []))
            .catch(() => toast.error("Gagal memuat banner"))
            .finally(() => setIsLoading(false))
    }, [])

    return { banners, isLoading }
}
