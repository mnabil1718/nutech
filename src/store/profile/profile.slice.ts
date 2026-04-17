import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { getProfile, updateProfile, updateProfileImage } from "@/services/profile.service"
import type { User } from "@/types/user.type"
import axios from "axios"
import type { UpdateProfilePayload } from "@/types/profile.type"

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

export const updateProfileThunk = createAsyncThunk(
    "profile/update",
    async (payload: UpdateProfilePayload, { rejectWithValue }) => {
        try {
            const res = await updateProfile(payload)
            return res.data!
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message ?? "Gagal memperbarui profil")
            }
            return rejectWithValue("Gagal memperbarui profil")
        }
    }
)

export const updateProfileImageThunk = createAsyncThunk(
    "profile/updateImage",
    async (file: File, { rejectWithValue }) => {
        try {
            const res = await updateProfileImage(file)
            return res.data!
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message ?? "Gagal memperbarui foto")
            }
            return rejectWithValue("Gagal memperbarui foto")
        }
    }
)

const upsertProfile = (state: ProfileState, action: PayloadAction<User>) => {
    state.isLoading = false
    state.data = action.payload
}


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
            .addCase(updateProfileThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(updateProfileThunk.fulfilled, upsertProfile)
            .addCase(updateProfileThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string
            })
            .addCase(updateProfileImageThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(updateProfileImageThunk.fulfilled, upsertProfile)
            .addCase(updateProfileImageThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string
            })
    },
})

export const { clearProfile } = profileSlice.actions
export default profileSlice.reducer
