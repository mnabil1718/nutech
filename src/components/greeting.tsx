import Profile from "@/assets/Profile Photo.png"

const Greeting = () => {
    return (
        <div className="w-full flex flex-col items-center  md:items-start">
            <div className="relative w-fit mb-5 ">
                <img src={Profile} />
            </div>

            <h2 className="text-lg text-muted-foreground ">Selamat Datang,</h2>
            <h1 className="text-3xl font-medium">Muhammad Nabil</h1>
        </div>
    )
}

export default Greeting
