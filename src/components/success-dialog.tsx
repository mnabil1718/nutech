import {
    AlertDialog,
    AlertDialogContent,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"

export type SuccessDialogProps = {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    onSuccess: () => void,
    onClose: () => void,
    successText?: string,
    children?: React.ReactNode,
    isLoading?: boolean,

}

const SuccessDialog = ({
    open,
    onOpenChange,
    onSuccess,
    onClose,
    successText = "Selesai",
    isLoading = false,
    children,
}: SuccessDialogProps) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-sm text-center flex flex-col items-center gap-4">
                {children}
                <div className="flex flex-col w-full gap-2">
                    <Button
                        variant={"destructive"}
                        onClick={onSuccess}
                        disabled={isLoading}
                        className="w-full py-2 h-auto font-semibold hover:opacity-80 transition-opacity disabled:opacity-50"
                    >
                        {isLoading ? "Memproses..." : successText}
                    </Button>
                    <Button
                        variant={"ghost"}
                        onClick={onClose}
                        className="w-full py-2 font-semibold text-muted-foreground hover:opacity-80 transition-opacity"
                    >
                        Tutup
                    </Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default SuccessDialog
