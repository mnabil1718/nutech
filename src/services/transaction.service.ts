import type { ApiResponse } from "@/types/api.type"
import type { TransactionPayload, TransactionResponse } from "@/types/transaction.type"
import { api } from "./api.service"

export async function createTransaction(payload: TransactionPayload): Promise<ApiResponse<TransactionResponse>> {
    const response = await api.post<ApiResponse<TransactionResponse>>("/transaction", payload)
    return response.data
}
