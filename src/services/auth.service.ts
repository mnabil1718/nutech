import { api } from "./api.service";
import type { RegisterPayload } from "@/types/register.type";
import type { AuthToken, LoginPayload } from "@/types/login.type";
import type { ApiResponse } from "@/types/api.type";

// in case we want to display success message, return the ApiResponse type
export async function register(values: RegisterPayload): Promise<ApiResponse<null>> {
    const response = await api.post<ApiResponse<null>>("/registration", values);
    return response.data;
}

export async function login(values: LoginPayload): Promise<ApiResponse<AuthToken>> {
    const response = await api.post<ApiResponse<AuthToken>>("/login", values)
    return response.data
}

