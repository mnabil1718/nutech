import { z } from 'zod'

export const LoginSchema = z.object({
    email: z.email("Email tidak valid"),
    password: z.string().min(1, "Password tidak boleh kosong"),
});

export type Login = z.infer<typeof LoginSchema>
