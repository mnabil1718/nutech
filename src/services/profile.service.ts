import type { ApiResponse } from "@/types/api.type";
import type { User } from "@/types/user.type";
import { api } from "./api.service";


export async function getProfile(): Promise<ApiResponse<User>> {
    const response = await api.get<ApiResponse<User>>("/profile")
    return response.data
}


