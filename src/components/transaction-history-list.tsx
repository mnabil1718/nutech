import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectTransactionHasMore, selectTransactionLoading, selectTransactionOffset, selectTransactionRecords } from "@/store/transaction/transaction.selector"
import { fetchTransactionHistoryThunk, resetTransactions } from "@/store/transaction/transaction.slice"
import { useEffect } from "react"
import { Skeleton } from "./ui/skeleton"
import { Button } from "./ui/button"
import type { TransactionHistory } from "@/types/transaction.type"
import { cn } from "@/lib/utils"
import { formatLocaleDateTime } from "@/utils/date"


const TransactionItem = ({ record }: { record: TransactionHistory }) => {
    const isTopup = record.transaction_type === "TOPUP"
    const date = formatLocaleDateTime(record.created_on)
    return (
        <div className="flex justify-between p-4 border rounded-lg">
            <div className="flex flex-col gap-1">
                <p className={cn(
                    "text-lg font-semibold",
                    isTopup ? "text-emerald-500" : "text-destructive"
                )}>
                    {isTopup ? "+" : "-"} Rp{record.total_amount.toLocaleString("id-ID")}
                </p>

                <p className="text-xs text-muted-foreground">{date}</p>
            </div>
            <div className="text-right">
                <p className="text-sm text-muted-foreground">{record.description}</p>
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
        dispatch(resetTransactions())
        dispatch(fetchTransactionHistoryThunk(0))
    }, [dispatch])

    function loadMore() {
        if (!isLoading && hasMore) {
            dispatch(fetchTransactionHistoryThunk(offset))
        }
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
                return (
                    <TransactionItem key={r.invoice_number} record={r} />
                )
            })
            }

            {
                !isLoading && hasMore && (
                    <div className="flex justify-center">
                        <Button
                            variant={"ghost"}
                            className="text-primary font-semibold w-fit h-auto px-4 py-3 rounded-full"
                            onClick={loadMore}
                        >
                            Show more
                        </Button>
                    </div>
                )
            }
        </div >
    )
}

export default TransactionHistoryList
