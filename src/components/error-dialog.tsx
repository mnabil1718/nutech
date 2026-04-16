import {
    AlertDialog,
    AlertDialogContent,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"

export type FailedDialogProps = {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    onFailed: () => void,
    onClose: () => void,
    failedText?: string,
    children?: React.ReactNode,
    isLoading?: boolean,

}

const FailedDialog = ({
    open,
    onOpenChange,
    onFailed,
    onClose,
    failedText = "Selesai",
    isLoading = false,
    children,
}: FailedDialogProps) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-sm text-center flex flex-col items-center gap-4">
                {children}
                <div className="flex flex-col w-full gap-2">
                    <Button
                        variant={"destructive"}
                        onClick={onFailed}
                        disabled={isLoading}
                        className="w-full py-2 h-auto font-semibold hover:opacity-80 transition-opacity disabled:opacity-50"
                    >
                        {isLoading ? "Memproses..." : failedText}
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

export default FailedDialog
