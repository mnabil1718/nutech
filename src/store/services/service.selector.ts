import type { RootState } from ".."

export const selectServices = (state: RootState) => state.services.services
export const selectServicesLoading = (state: RootState) => state.services.isLoading
export const selectServiceByCode = (code: string) => (state: RootState) =>
    state.services.services.find(s => s.service_code === code)
