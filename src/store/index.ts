import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth/auth.slice"
import profileReducer from "./profile/profile.slice"
import balanceReducer from "./balance/balance.slice"
import servicesReducer from "./services/service.slice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        balance: balanceReducer,
        services: servicesReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store   
