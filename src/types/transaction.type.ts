export type TransactionPayload = { service_code: string }
export type TransactionResponse = {
    invoice_number: string
    service_code: string
    service_name: string
    transaction_type: string
    total_amount: number
    created_on: string
}

export type TransactionHistoryPayload = {
    offset: number;
    limit: number;
}

export type TransactionHistoryResponse = {
    offset: number;
    limit: number;
    records: TransactionResponse[]
}
