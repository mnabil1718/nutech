import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getTransactionHistory } from "@/services/transaction.service"
import type { TransactionResponse } from "@/types/transaction.type"
import axios from "axios"

const LIMIT = 5

type TransactionState = {
    records: TransactionResponse[]
    offset: number
    hasMore: boolean
    isLoading: boolean
    error: string | null
}

const initialState: TransactionState = {
    records: [],
    offset: 0,
    hasMore: true,
    isLoading: false,
    error: null,
}

export const fetchTransactionHistoryThunk = createAsyncThunk(
    "transaction/fetchHistory",
    async (offset: number, { rejectWithValue }) => {
        try {
            const res = await getTransactionHistory({ offset, limit: LIMIT })
            return res.data!
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.message ?? "Gagal memuat riwayat"
                )
            }
            return rejectWithValue("Gagal memuat riwayat")
        }
    }
)

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        resetTransactions(state) {
            state.records = []
            state.offset = 0
            state.hasMore = true
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactionHistoryThunk.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchTransactionHistoryThunk.fulfilled, (state, action) => {
                state.isLoading = false
                const { records, limit } = action.payload

                // accumulate — never replace
                state.records = [...state.records, ...records]
                state.offset = state.records.length

                // if returned less than limit, no more pages exist
                state.hasMore = records.length === limit
            })
            .addCase(fetchTransactionHistoryThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
    },
})

export const { resetTransactions } = transactionSlice.actions
export default transactionSlice.reducer
