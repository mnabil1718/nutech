import type { User } from "./user.type";

export type LoginPayload = {
    email: string;
    password: string;
}

export type AuthToken = {
    token: string;
}

export type AuthState = {
    token: string | null
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
}

