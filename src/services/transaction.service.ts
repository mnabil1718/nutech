import type { ApiResponse } from "@/types/api.type"
import type { TransactionHistoryPayload, TransactionHistoryResponse, TransactionPayload, TransactionResponse } from "@/types/transaction.type"
import { api } from "./api.service"

export async function createTransaction(payload: TransactionPayload): Promise<ApiResponse<TransactionResponse>> {
    const response = await api.post<ApiResponse<TransactionResponse>>("/transaction", payload)
    return response.data
}


export async function getTransactionHistory(params: TransactionHistoryPayload): Promise<ApiResponse<TransactionHistoryResponse>> {
    const response = await api.get<ApiResponse<TransactionHistoryResponse>>("/transaction/history", { params })

    return response.data
} 
