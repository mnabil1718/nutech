import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
    isLoading: boolean;
    label?: string;
    loadingLabel?: string;
    className?: string;
    disabled?: boolean;
}

export function SubmitButton({
    isLoading,
    label = "Registrasi",
    loadingLabel = "Memproses...",
    disabled,
    className
}: SubmitButtonProps) {
    return (
        <Button
            size="lg"
            variant="default"
            className={cn("p-3! h-auto mt-7", className)}
            type="submit"
            disabled={disabled ?? isLoading}
        >
            {isLoading ? (
                <>
                    <LoaderCircle className="animate-spin mr-2" />
                    {loadingLabel}
                </>
            ) : (
                label
            )}
        </Button>
    );
}
