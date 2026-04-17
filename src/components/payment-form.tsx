import { useMemo, useEffect } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Banknote, Check, Wallet, X } from "lucide-react"
import { useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchBalanceThunk, topupThunk, transactionThunk } from "@/store/balance/balance.slice"
import { selectBalanceLoading } from "@/store/balance/balance.selector"
import { fetchServicesThunk } from "@/store/services/service.slice"
import {
    selectServiceByCode,
    selectServices,
    selectServicesLoading,
} from "@/store/services/service.selector"
import { TopupSchema, type TopupSchemaType } from "@/schemas/topup.schema"
import { SubmitButton } from "./submit-button"
import TextInput from "./text-input"
import ConfirmDialog from "./confirm-dialog"
import SuccessDialog from "./success-dialog"
import FailedDialog from "./error-dialog"
import { Skeleton } from "@/components/ui/skeleton"

type DialogState = "idle" | "confirm" | "success" | "error"

const PaymentForm = ({ code }: { code: string | undefined }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isBalanceLoading = useAppSelector(selectBalanceLoading)
    const services = useAppSelector(selectServices)
    const isServicesLoading = useAppSelector(selectServicesLoading)

    const serviceSelector = useMemo(() => selectServiceByCode(code!), [code])
    const service = useAppSelector(serviceSelector)

    useEffect(() => {
        if (!services.length) dispatch(fetchServicesThunk())
    }, [])

    const [dialogState, setDialogState] = useState<DialogState>("idle")
    const [submittedAmount, setSubmittedAmount] = useState<number>(0)

    const form = useForm<TopupSchemaType>({
        resolver: zodResolver(TopupSchema),
        mode: "onChange",
        defaultValues: { amount: "" },
    })

    useEffect(() => {
        if (service) {
            form.setValue("amount", service.service_tariff, {
                shouldValidate: true,
            })
        }
    }, [service])

    function onSubmit(values: TopupSchemaType) {
        setSubmittedAmount(values.amount as number)
        setDialogState("confirm")
    }

    async function onConfirm() {
        const result = await dispatch(transactionThunk(code!))

        if (transactionThunk.fulfilled.match(result)) {
            dispatch(fetchBalanceThunk())
            setDialogState("success")
        } else {
            setDialogState("error")
        }
    }

    function onClose() { setDialogState("idle") }

    function onBackToHome() {
        setDialogState("idle")
        navigate("/")
    }

    const formatted = `Rp${submittedAmount.toLocaleString("id-ID")}`

    if (isServicesLoading) return (
        <div>
            <h2 className="text-lg text-muted-foreground">Pembayaran</h2>
            <div className="flex items-center gap-3 mb-10">
                <Skeleton className="size-8 rounded-lg" />
                <Skeleton className="h-6 w-40" />
            </div>
            <Skeleton className="h-12 w-full mt-2" />
            <Skeleton className="h-12 w-full" />
        </div>
    )

    if (!service) return <div>Service not found</div>

    return (
        <>

            <h2 className="text-lg text-muted-foreground">Pembayaran</h2>
            <div className="flex items-center gap-3 mb-10">
                <img
                    src={service.service_icon}
                    alt={service.service_name}
                    className="size-8"
                />
                <h1 className="text-xl font-medium">{service.service_name}</h1>
            </div>


            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-5"
            >
                <TextInput
                    name="amount"
                    type="text"
                    control={form.control}
                    readOnly={true}
                    placeholder="masukkan nominal pembayaran"
                    icon={<Banknote />}
                />
                <SubmitButton
                    label="Bayar"
                    isLoading={isBalanceLoading}
                    disabled={!form.formState.isValid || isBalanceLoading}
                    className="w-full font-semibold mt-0!"
                />
            </form>

            {/* ── Confirm ── */}
            <ConfirmDialog
                open={dialogState === "confirm"}
                onOpenChange={onClose}
                isLoading={isBalanceLoading}
                onConfirm={onConfirm}
                onClose={onClose}
                confirmText="Ya, lanjutkan bayar"
            >
                <div className="size-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-3">
                    <Wallet className="size-8" />
                </div>
                <p className="text-muted-foreground">Beli {service.service_name} senilai</p>
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
                <p className="text-muted-foreground">Pembayaran {service.service_name} sebesar</p>
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
                <p className="text-muted-foreground">Pembayaran {service.service_name} sebesar</p>
                <p className="text-3xl font-semibold">{formatted}</p>
                <p className="text-muted-foreground">gagal!</p>
            </FailedDialog>
        </>
    )
}

export default PaymentForm
