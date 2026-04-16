import { api } from "./api.service"
import type { ApiResponse } from "@/types/api.type"
import type { Banner } from "@/types/banner.type"

export async function getBanners(): Promise<ApiResponse<Banner[]>> {
    const response = await api.get<ApiResponse<Banner[]>>("/banner")
    return response.data
}
