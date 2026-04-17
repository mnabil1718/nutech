import { z } from "zod"

const MAX_SIZE = 100 * 1024 // 100 KB 
const ACCEPTED  = ["image/jpeg", "image/png"]

export const ProfileSchema = z.object({
    email: z.email("Email tidak valid"),
    first_name: z.string().min(1, "Nama depan harus diisi"),
    last_name: z.string().min(1, "Nama belakang harus diisi"),
})


export const ProfileImageSchema = z.object({
    image: z
        .instanceof(File, { message: "Harus berupa file" })
        .refine((f) => f.size <= MAX_SIZE, "Ukuran maksimal foto adalah 100KB")
        .refine((f) => ACCEPTED.includes(f.type), "Format harus JPG atau PNG"),
})

export type ProfileImageSchemaType = z.infer<typeof ProfileImageSchema>
export type ProfileSchemaType = z.infer<typeof ProfileSchema>
