import {
    AlertDialog,
    AlertDialogContent,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"

export type ConfirmDialogProps = {
    open: boolean,
    isLoading: boolean,
    onOpenChange: (open: boolean) => void,
    onConfirm: () => void,
    onClose: () => void,
    confirmText?: string,
    children?: React.ReactNode,
}

const ConfirmDialog = ({
    open,
    onOpenChange,
    onConfirm,
    onClose,
    confirmText = "Konfirmasi",
    isLoading = false,
    children,
}: ConfirmDialogProps) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-sm text-center flex flex-col items-center gap-4">
                {children}
                <div className="flex flex-col w-full gap-2">
                    <Button
                        variant={"destructive"}
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="w-full py-2 h-auto font-semibold hover:opacity-80 transition-opacity disabled:opacity-50"
                    >
                        {isLoading ? "Memproses..." : confirmText}
                    </Button>
                    <Button
                        variant={"ghost"}
                        onClick={onClose}
                        className="w-full py-2 font-semibold text-muted-foreground hover:opacity-80 transition-opacity"
                    >
                        Batalkan
                    </Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmDialog
