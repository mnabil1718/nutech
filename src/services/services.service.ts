import { api } from "./api.service"
import type { ApiResponse } from "@/types/api.type"
import type { Service } from "@/types/service.type"

export async function getServices(): Promise<ApiResponse<Service[]>> {
    const response = await api.get<ApiResponse<Service[]>>("/services")
    return response.data
}
