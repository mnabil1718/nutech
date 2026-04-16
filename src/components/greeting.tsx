import ProfilePlaceholder from "@/assets/Profile Photo.png"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectProfile, selectProfileLoading } from "@/store/profile/profile.selector"
import { fetchProfileThunk } from "@/store/profile/profile.slice"
import { useEffect } from "react"
import { Skeleton } from "./ui/skeleton"

const Greeting = () => {
    const dispatch = useAppDispatch()
    const profile = useAppSelector(selectProfile)
    const isLoading = useAppSelector(selectProfileLoading)

    useEffect(() => {
        if (!profile) dispatch(fetchProfileThunk())
    }, [])

    function renderProfile(): React.ReactNode {

        if (isLoading) return null

        if (!profile || profile.profile_image.includes("/null")) {
            return <img src={ProfilePlaceholder} className="w-full h-full object-contain" />
        }

        return <img src={profile.profile_image} className="w-full h-full object-contain" />
    }

    return (
        <div className="w-full flex flex-col items-center  md:items-start">
            <div className="relative w-17.5 aspect-square rounded-full bg-border/50 overflow-hidden mb-5">
                {renderProfile()}
            </div>


            <h2 className="text-lg text-muted-foreground ">Selamat Datang,</h2>
            {isLoading || !profile
                ? <Skeleton className="h-9 max-w-56 w-full" />
                : <h1 className="text-3xl font-medium">
                    {profile.first_name} {profile.last_name}
                </h1>
            }
        </div>
    )
}

export default Greeting
