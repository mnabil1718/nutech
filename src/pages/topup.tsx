import Balance from "@/components/balance"
import Greeting from "@/components/greeting"
import TopupForm from "@/components/topup-form"

const Topup = () => {
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
            <section className="p-5 max-w-7xl mx-auto mt-12">
                <h2 className="text-lg text-muted-foreground ">Silahkan masukkan</h2>
                <h1 className="text-3xl font-medium">
                    Nominal Top Up
                </h1>
            </section>
            <section className="p-5 max-w-7xl mx-auto mt-5">
                <TopupForm />
            </section>
        </div>
    )
}

export default Topup
