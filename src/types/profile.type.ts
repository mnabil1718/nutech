import type { User } from "@/types/user.type"

export type UpdateProfilePayload = Omit<User, "profile_image" | "email">;
