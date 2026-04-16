import type { RootState } from ".."
import type { Service } from "@/types/service.type"

export const selectServices = (state: RootState) => state.services.services
export const selectServicesLoading = (state: RootState) => state.services.isLoading
export const selectServiceByCode = (code: string) =>
    (state: RootState) => state.services.services.find((s: Service) => s.service_code === code)
