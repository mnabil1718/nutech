import { AuthRedirect } from "@/components/auth-redirect";
import Brand from "@/components/brand";
import PasswordInput from "@/components/password-input";
import { SubmitButton } from "@/components/submit-button";
import TextInput from "@/components/text-input";
import { LoginSchema, type Login as LoginType } from "@/schemas/login.schema";
import { selectAuthError, selectAuthLoading } from "@/store/auth/auth.selector";
import { loginThunk } from "@/store/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Login = () => {
    let navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(selectAuthLoading)
    const authError = useAppSelector(selectAuthError)

    useEffect(() => {
        if (authError) toast.error(authError)
    }, [authError])

    const form = useForm<LoginType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: LoginType) {
        const res = await dispatch(loginThunk(values))

        if (loginThunk.fulfilled.match(res)) {
            toast.success("Berhasil masuk")
            form.reset();
            navigate("/dashboard")
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

                <PasswordInput
                    name="password"
                    control={form.control}
                    placeholder="buat password"
                />

                <SubmitButton
                    label="Masuk"
                    isLoading={isLoading}
                />

                <AuthRedirect
                    href="/registrasi"
                    message="Belum punya akun? registrasi"
                    linkText="di sini"
                    className="text-center text-sm mt-5"
                />
            </form>

        </div>
    )
}

export default Login
