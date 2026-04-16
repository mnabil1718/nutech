import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth/auth.slice"
import profileReducer from "./profile/profile.slice"
import balanceReducer from "./balance/balance.slice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        balance: balanceReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store   
