import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { login as loginService } from "@/services/auth.service"
import type { AuthState } from "@/types/login.type"
import type { LoginPayload } from "@/types/login.type"
import axios from "axios"
import { clearProfile } from "../profile/profile.slice"
import { clearBalance } from "../balance/balance.slice"


export const loginThunk = createAsyncThunk(
    "auth/login",
    async (payload: LoginPayload, { rejectWithValue }) => {
        try {
            const res = await loginService(payload)
            return res.data!.token
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.message ?? "Login gagal"
                )
            }

            return rejectWithValue("Login gagal")
        }
    }
)

export const logoutThunk = createAsyncThunk(
    "auth/logout",
    async (_, { dispatch }) => {
        localStorage.removeItem("token")
        dispatch(clearProfile())
        dispatch(clearBalance())
    })


const initialState: AuthState = {
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
    isLoading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuth(state) {
            state.token = null
            state.isAuthenticated = false
            state.error = null
            localStorage.removeItem("token")
        },
    },
    extraReducers: (builder) => {
        // Login
        builder
            .addCase(loginThunk.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.token = action.payload
                state.isAuthenticated = true
                localStorage.setItem("token", action.payload)
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })

        // Logout
        builder
            .addCase(logoutThunk.fulfilled, (state) => {
                state.token = null
                state.isAuthenticated = false
            })
    },
})

export const { clearAuth } = authSlice.actions
export default authSlice.reducer
