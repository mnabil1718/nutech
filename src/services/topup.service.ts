import type { TopupData, TopupPayload } from "@/types/topup.type"
import { api } from "./api.service"
import type { ApiResponse } from "@/types/api.type"

export async function topup(payload: TopupPayload): Promise<ApiResponse<TopupData>> {
    const response = await api.post<ApiResponse<TopupData>>("/topup", payload)
    return response.data
}
