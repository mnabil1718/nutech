import { z } from "zod";

export const RegisterSchema = z
    .object({
        email: z.email("Email tidak valid"),
        first_name: z.string().min(1, "Nama depan tidak boleh kosong"),
        last_name: z.string().min(1, "Nama belakang tidak boleh kosong"),
        password: z.string().min(8, "Password minimal 8 karakter"),
        confirm_password: z.string().min(1, "Konfirmasi password tidak boleh kosong"),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Password tidak sama",
        path: ["confirm_password"],
    });

export type Register = z.infer<typeof RegisterSchema>

