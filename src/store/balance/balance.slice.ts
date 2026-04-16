import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getBalance } from "@/services/balance.service"
import axios from "axios"

type BalanceState = {
    amount: number | null
    isLoading: boolean
    error: string | null
}

const initialState: BalanceState = {
    amount: null,
    isLoading: false,
    error: null,
}

export const fetchBalanceThunk = createAsyncThunk(
    "balance/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getBalance()
            return res.data!.balance
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.message ?? "Gagal memuat saldo"
                )
            }
            return rejectWithValue("Gagal memuat saldo")
        }
    }
)

const balanceSlice = createSlice({
    name: "balance",
    initialState,
    reducers: {
        clearBalance(state) {
            state.amount = null
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBalanceThunk.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchBalanceThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.amount = action.payload
            })
            .addCase(fetchBalanceThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
    },
})

export const { clearBalance } = balanceSlice.actions
export default balanceSlice.reducer
