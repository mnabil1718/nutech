import type { ApiResponse } from "@/types/api.type"
import type { BalanceData } from "@/types/balance.type"
import { api } from "./api.service"


export async function getBalance(): Promise<ApiResponse<BalanceData>> {
    const response = await api.get<ApiResponse<BalanceData>>("/balance")
    return response.data
}
