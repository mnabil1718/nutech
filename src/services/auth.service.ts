import type { RegisterPayload } from "@/types/auth.type";
import { api } from "./api.service";

export async function register(values: RegisterPayload): Promise<void> {
    return await api.post("/registration", values);
}

