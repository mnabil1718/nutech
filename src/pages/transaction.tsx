import Balance from "@/components/balance"
import Greeting from "@/components/greeting"
import TransactionHistoryList from "@/components/transaction-history-list"

const Transaction = () => {
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
            <section className="max-w-7xl mx-auto mt-5 p-5">
                <h2 className="font-semibold text-lg mb-7">
                    Semua Transaksi
                </h2>
                <TransactionHistoryList />
            </section>

        </div>
    )
}

export default Transaction
