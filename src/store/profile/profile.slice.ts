import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getProfile } from "@/services/profile.service"
import type { User } from "@/types/user.type"
import axios from "axios"

type ProfileState = {
    data: User | null
    isLoading: boolean
    error: string | null
}

const initialState: ProfileState = {
    data: null,
    isLoading: false,
    error: null,
}

export const fetchProfileThunk = createAsyncThunk(
    "profile/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getProfile()
            return res.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.message ?? "Gagal memuat profil"
                )
            }
            return rejectWithValue("Gagal memuat profil")
        }
    }
)

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        clearProfile(state) {
            state.data = null
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileThunk.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchProfileThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchProfileThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
    },
})

export const { clearProfile } = profileSlice.actions
export default profileSlice.reducer
