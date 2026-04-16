import Balance from "@/components/balance"
import Greeting from "@/components/greeting"

const Dashboard = () => {
    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-10 p-5 max-w-7xl mx-auto">
                <div className="col-span-1 lg:col-span-3">
                    <Greeting />
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <Balance />
                </div>
            </div>
        </section>
    )
}

export default Dashboard
