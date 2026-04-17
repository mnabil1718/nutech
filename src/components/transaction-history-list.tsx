import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectTransactionHasMore, selectTransactionLoading, selectTransactionOffset, selectTransactionRecords } from "@/store/transaction/transaction.selector"
import { fetchTransactionHistoryThunk } from "@/store/transaction/transaction.slice"
import { useEffect } from "react"
import { Skeleton } from "./ui/skeleton"
import { Button } from "./ui/button"


const TransactionItem = ({ record }: { record: Transaction }) => {
    const isTopup = record.transaction_type === "TOPUP"
    const date = new Date(record.created_on).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })

    return (
        <div className="flex items-center justify-between py-4 border-b last:border-0">
            <div className="flex flex-col gap-1">
                <p className={cn(
                    "text-lg font-semibold",
                    isTopup ? "text-green-500" : "text-destructive"
                )}>
                    {isTopup ? "+" : "-"}Rp{record.total_amount.toLocaleString("id-ID")}
                </p>
                <p className="text-sm text-muted-foreground">{record.description}</p>
            </div>
            <div className="text-right">
                <p className="text-xs text-muted-foreground">{date}</p>
                <p className="text-xs text-muted-foreground">{record.invoice_number}</p>
            </div>
        </div>
    )
}

const TransactionHistoryList = () => {
    const dispatch = useAppDispatch()
    const records = useAppSelector(selectTransactionRecords)
    const isLoading = useAppSelector(selectTransactionLoading)
    const hasMore = useAppSelector(selectTransactionHasMore)
    const offset = useAppSelector(selectTransactionOffset)

    useEffect(() => {
        if (!records.length) dispatch(fetchTransactionHistoryThunk(0))
    }, [])

    function loadMore() {
        dispatch(fetchTransactionHistoryThunk(offset))
    }
    return (
        <div className="flex flex-col gap-5">
            {isLoading && Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-md" />
            ))}

            {!isLoading && records.length === 0 && (
                <p className="text-center text-muted-foreground py-8 text-sm">
                    Belum ada riwayat transaksi
                </p>
            )}

            {records.map(r => {

            })
                <> a</>
            }

{
    !isLoading && hasMore && (
        <Button variant={"ghost"} className="text-primary font-semibold">
            Show more
        </Button>
    )
}
        </div >
    )
}

export default TransactionHistoryList
