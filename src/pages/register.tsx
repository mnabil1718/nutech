import { useForm } from "react-hook-form"
import { Link } from "react-router"
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, type Register as RegisterType } from "@/schemas/register.schema"
import { register } from "@/services/auth.service";
import Brand from "@/components/brand";
import TextInput from "@/components/text-input";
import PasswordInput from "@/components/password-input";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState } from "react";
import { SubmitButton } from "@/components/submit-button";
import { AtSign, User } from "lucide-react";
import { AuthRedirect } from "@/components/auth-redirect";


const Register = () => {
    let navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    const form = useForm<RegisterType>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password: ""
        },
    });

    async function onSubmit(values: RegisterType) {
        setLoading(true)
        try {
            await register({
                email: values.email,
                first_name: values.first_name,
                last_name: values.last_name,
                password: values.password,
            });

            form.reset();
            navigate("/login");

        } catch (error) {
            let msg = "Terdapat kesalahan";

            if (axios.isAxiosError(error)) {
                msg = error.response?.data?.message ?? "Registrasi gagal"
            }

            toast.error(msg)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="p-5">
            <div className="flex justify-center items-center gap-3 mb-8">
                <Brand />
                <h1 className="text-2xl font-semibold">SIMS PPOB</h1>
            </div>

            <h2 className="text-center text-3xl font-semibold mb-8">Masuk atau buat akun untuk memulai</h2>

            <form
                id="register-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
            >
                <TextInput
                    name="email"
                    type="email"
                    control={form.control}
                    placeholder="masukkan email anda"
                    icon={<AtSign />}
                />

                <TextInput
                    name="first_name"
                    control={form.control}
                    placeholder="nama depan"
                    icon={<User />}
                />

                <TextInput
                    name="last_name"
                    control={form.control}
                    placeholder="nama belakang"
                    icon={<User />}
                />


                <PasswordInput
                    name="password"
                    control={form.control}
                    placeholder="buat password"
                />

                <PasswordInput
                    name="confirm_password"
                    control={form.control}
                    placeholder="konfirmasi password"
                />

                <SubmitButton
                    label="Registrasi"
                    isLoading={loading}
                />

                <AuthRedirect
                    href="/login"
                    message="Sudah punya akun? login"
                    linkText="di sini"
                    className="text-center text-sm mt-5"
                />
            </form>

        </div>
    )
}

export default Register
