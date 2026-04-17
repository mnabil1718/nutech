import type { ApiResponse } from "@/types/api.type";
import type { User } from "@/types/user.type";
import { api } from "./api.service";
import type { UpdateProfilePayload } from "@/types/profile.type";


export async function getProfile(): Promise<ApiResponse<User>> {
    const response = await api.get<ApiResponse<User>>("/profile")
    return response.data
}

export async function updateProfile(payload: UpdateProfilePayload): Promise<ApiResponse<User>> {
    const response = await api.put<ApiResponse<User>>("/profile/update", payload)
    return response.data
}

export async function updateProfileImage(file: File): Promise<ApiResponse<User>> {
    const formData = new FormData()
    formData.append("file", file)
    const response = await api.put<ApiResponse<User>>("/profile/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    })
    return response.data
}
