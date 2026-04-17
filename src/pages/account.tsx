import EditableAvatar from "@/components/editable-avatar"
import ProfileForm from "@/components/profile-form"

const Account = () => {
    return (
        <div>
            <section className="max-w-md mx-auto p-5">
                <div className="w-full flex flex-col pt-12 items-center">
                    <EditableAvatar />
                    <ProfileForm />
                </div>

            </section>
        </div>
    )
}

export default Account
