import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Banknote, Check, Wallet, X } from "lucide-react"
import { useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { topupThunk } from "@/store/balance/balance.slice"
import { selectBalanceLoading } from "@/store/balance/balance.selector"
import { TopupSchema, type TopupSchemaType } from "@/schemas/topup.schema"
import { SubmitButton } from "./submit-button"
import TextInput from "./text-input"
import { cn } from "@/lib/utils"
import ConfirmDialog from "./confirm-dialog"
import SuccessDialog from "./success-dialog"
import FailedDialog from "./error-dialog"

type DialogState = "idle" | "confirm" | "success" | "error"

const nominals = [10000, 20000, 50000, 100000, 250000, 500000]

const TopupForm = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoading = useAppSelector(selectBalanceLoading)

    const [dialogState, setDialogState] = useState<DialogState>("idle")
    const [submittedAmount, setSubmittedAmount] = useState<number>(0)

    const form = useForm<TopupSchemaType>({
        resolver: zodResolver(TopupSchema),
        mode: "onChange",
        defaultValues: { amount: "" },
    })

    const amount = form.watch("amount")

    function onSubmit(values: TopupSchemaType) {
        setSubmittedAmount(values.amount as number)
        setDialogState("confirm")
    }

    async function onConfirm() {
        const result = await dispatch(topupThunk(submittedAmount))

        if (topupThunk.fulfilled.match(result)) {
            setDialogState("success")
            form.reset()
        } else {
            setDialogState("error")
        }
    }

    function onClose() {
        setDialogState("idle")
    }

    function onBackToHome() {
        setDialogState("idle")
        navigate("/")
    }

    const formatted = `Rp${submittedAmount.toLocaleString("id-ID")}`

    return (
        <>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 lg:grid-cols-2 gap-5"
            >
                <div className="col-span-1 flex flex-col gap-3">
                    <TextInput
                        name="amount"
                        type="text"
                        control={form.control}
                        placeholder="masukkan nominal Top Up"
                        icon={<Banknote />}
                    />
                    <SubmitButton
                        label="Top up"
                        isLoading={isLoading}
                        disabled={!form.formState.isValid || isLoading}
                        className="w-full font-semibold mt-0!"
                    />
                </div>
                <div className="col-span-1">
                    <div className="grid grid-cols-3 gap-3">
                        {nominals.map(i => (
                            <div
                                key={i}
                                onClick={() => form.setValue("amount", i, {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                    shouldTouch: true,
                                })}
                                className={cn(
                                    "cursor-pointer p-3 flex justify-center items-center border rounded",
                                    amount === i ? "ring-2 ring-primary" : ""
                                )}
                            >
                                Rp {i.toLocaleString("id-ID")}
                            </div>
                        ))}
                    </div>
                </div>
            </form>

            {/* ── Confirm ── */}
            <ConfirmDialog
                open={dialogState === "confirm"}
                onOpenChange={onClose}
                isLoading={isLoading}
                onConfirm={onConfirm}
                onClose={onClose}
                confirmText="Ya, lanjutkan Top Up"

            >
                <div className="size-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-3">
                    <Wallet className="size-8" />
                </div>
                <p className="text-muted-foreground">Anda yakin untuk Top Up sebesar</p>
                <p className="text-3xl font-semibold">{formatted} ?</p>
            </ConfirmDialog>

            {/* ── Success ── */}
            <SuccessDialog
                open={dialogState === "success"}
                onOpenChange={onClose}
                onSuccess={onBackToHome}
                onClose={onClose}
                successText="Kembali ke beranda"
            >
                <div className="size-16 rounded-full bg-chart-3 text-primary-foreground flex items-center justify-center mb-3">
                    <Check className="size-8" />
                </div>
                <p className="text-muted-foreground">Top Up sebesar</p>
                <p className="text-3xl font-semibold">{formatted}</p>
                <p className="text-muted-foreground">berhasil!</p>
            </SuccessDialog>

            {/* ── Error ── */}
            <FailedDialog
                open={dialogState === "error"}
                onOpenChange={onClose}
                onFailed={onBackToHome}
                onClose={onClose}
                failedText="Kembali ke beranda"
            >

                <div className="size-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-3">
                    <X className="size-8" />
                </div>
                <p className="text-muted-foreground">Top Up sebesar</p>
                <p className="text-3xl font-semibold">{formatted}</p>
                <p className="text-muted-foreground">berhasil!</p>
            </FailedDialog>
        </>
    )
}

export default TopupForm
