import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getServices } from "@/services/services.service"
import type { Service } from "@/types/service.type"
import axios from "axios"

type ServicesState = {
    services: Service[]
    isLoading: boolean
    error: string | null
}

const initialState: ServicesState = {
    services: [],
    isLoading: false,
    error: null,
}

export const fetchServicesThunk = createAsyncThunk(
    "services/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getServices()
            return res.data ?? []
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.message ?? "Gagal memuat layanan"
                )
            }
            return rejectWithValue("Gagal memuat layanan")
        }
    }
)

const servicesSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
        clearServices(state) {
            state.services = []
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchServicesThunk.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchServicesThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.services = action.payload
            })
            .addCase(fetchServicesThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
    },
})

export const { clearServices } = servicesSlice.actions
export default servicesSlice.reducer
