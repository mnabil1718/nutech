import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { updateProfileThunk } from "@/store/profile/profile.slice"
import { selectFullName, selectProfile, selectProfileLoading } from "@/store/profile/profile.selector"
import { ProfileSchema, type ProfileSchemaType } from "@/schemas/profile.schema"
import { SubmitButton } from "./submit-button"
import TextInput from "./text-input"
import { toast } from "sonner"
import { AtSign, User } from "lucide-react"
import { Button } from "./ui/button"
import { Skeleton } from "./ui/skeleton"
import { logoutThunk } from "@/store/auth/auth.slice"

const ProfileForm = () => {
    const dispatch = useAppDispatch()
    const profile = useAppSelector(selectProfile)
    const fullName = useAppSelector(selectFullName)
    const isLoading = useAppSelector(selectProfileLoading)
    const [editMode, setEditMode] = useState(false)

    const form = useForm<ProfileSchemaType>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            email: "",
            first_name: "",
            last_name: "",
        },
    })

    useEffect(() => {
        if (profile) {
            form.reset({
                email: profile.email,
                first_name: profile.first_name,
                last_name: profile.last_name,
            })
        }
    }, [profile])

    async function onSubmit(values: ProfileSchemaType) {
        const result = await dispatch(updateProfileThunk(values))
        if (updateProfileThunk.fulfilled.match(result)) {
            setEditMode(false)
            toast.success("Profil berhasil diperbarui")
        } else {
            toast.error(result.payload as string)
        }
    }

    async function handleLogout() {
        dispatch(logoutThunk())
    }

    function cancelEdit() {
        if (profile) {
            form.reset({
                email: profile.email,
                first_name: profile.first_name,
                last_name: profile.last_name,
            })
        }
        setEditMode(false)
    }

    return (
        <>
            <div className="pt-5 pb-7">
                {
                    isLoading ?
                        (
                            <Skeleton className="h-10 max-w-60 w-full rounded" />
                        ) :
                        (
                            <h1 className="text-2xl font-medium">{fullName || "Nama User"}</h1>
                        )
                }
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                <TextInput
                    label="Email"
                    name="email"
                    type="email"
                    control={form.control}
                    placeholder="Email"
                    icon={<AtSign />}
                    readOnly
                />
                <TextInput
                    label="Nama Depan"
                    name="first_name"
                    control={form.control}
                    placeholder="Nama Depan"
                    icon={<User />}
                    readOnly={!editMode}
                />
                <TextInput
                    label="Nama Belakang"
                    name="last_name"
                    control={form.control}
                    placeholder="Nama Belakang"
                    icon={<User />}
                    readOnly={!editMode}
                />

                {
                    editMode && (
                        <>
                            <SubmitButton
                                label="Simpan"
                                isLoading={isLoading}
                                disabled={isLoading}
                                className="mt-5 w-full font-semibold"
                            />
                            <Button
                                variant={"outline"}
                                onClick={cancelEdit}
                                className="h-auto py-3"
                            >
                                Batalkan
                            </Button>
                        </>
                    )
                }

                {
                    !editMode && (
                        <>
                            <Button
                                type="button"
                                onClick={() => setEditMode(true)}
                                className="mt-5 h-auto py-3"
                            >
                                Edit Profil
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleLogout}
                                className="h-auto py-3 border-primary text-primary hover:bg-primary/10"
                            >
                                Logout
                            </Button>
                        </>
                    )
                }
            </form>
        </>
    )
}

export default ProfileForm
