import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchProfileThunk, updateProfileImageThunk } from "@/store/profile/profile.slice"
import { selectProfile, selectProfileLoading } from "@/store/profile/profile.selector"
import { ProfileImageSchema } from "@/schemas/profile.schema"
import { toast } from "sonner"
import { Pencil } from "lucide-react"
import ProfilePlaceholder from "@/assets/Profile Photo.png"
import { Button } from "./ui/button"

const EditableAvatar = () => {
    const dispatch = useAppDispatch()
    const profile = useAppSelector(selectProfile)
    const isLoading = useAppSelector(selectProfileLoading)
    const inputRef = useRef<HTMLInputElement>(null)
    const [preview, setPreview] = useState<string | null>(null)

    useEffect(() => {
        if (!profile) {
            dispatch(fetchProfileThunk())
        }
    }, [])

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        const result = ProfileImageSchema.safeParse({ image: file })
        if (!result.success) {

            toast.error(result.error.issues[0].message)
            e.target.value = ""
            return
        }

        setPreview(URL.createObjectURL(file))

        const thunkResult = await dispatch(updateProfileImageThunk(file))
        if (updateProfileImageThunk.rejected.match(thunkResult)) {
            toast.error(thunkResult.payload as string)
            setPreview(null)
        } else {
            toast.success("Foto profil berhasil diperbarui")
        }
    }


    return (
        <div className="relative size-32 mx-auto">
            <div className="relative w-full h-full bg-muted/50 rounded-full overflow-hidden">
                {
                    !isLoading && (
                        <img
                            src={preview ?? profile?.profile_image ?? ProfilePlaceholder}
                            alt="avatar"
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.src = ProfilePlaceholder }}
                        />
                    )
                }
            </div>

            <Button
                variant={"outline"}
                size={"icon-sm"}
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={isLoading}
                className="absolute bottom-0 right-0 size-7 rounded-full flex items-center justify-center"
            >
                <Pencil />
            </Button>

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    )
}

export default EditableAvatar
