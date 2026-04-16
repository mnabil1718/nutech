import Balance from "@/components/balance"
import BannerCarousel from "@/components/banner-carousel"
import Greeting from "@/components/greeting"
import Services from "@/components/services"

const Dashboard = () => {
    return (
        <div>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-10 p-5 max-w-7xl mx-auto">
                <div className="col-span-1 lg:col-span-3">
                    <Greeting />
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <Balance />
                </div>
            </section>
            <section className="max-w-7xl mx-auto mt-10">
                <Services />
            </section>
            <section className="mt-16">
                <BannerCarousel />
            </section>
        </div>
    )
}

export default Dashboard
