import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'
import { Field, FieldError } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'

interface PasswordInputProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    placeholder?: string
    id?: string
}

const PasswordInput = <T extends FieldValues>({
    name,
    control,
    placeholder,
    id,
}: PasswordInputProps<T>) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <InputGroup className="p-2 h-auto">
                        <InputGroupInput
                            {...field}
                            id={id ?? name}
                            type={showPassword ? "text" : "password"}
                            placeholder={placeholder}
                            aria-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon>
                            <Lock />
                        </InputGroupAddon>
                        <InputGroupAddon align={"inline-end"}>
                            <Button
                                type="button"
                                variant={"ghost"}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {
                                    showPassword ?
                                        (
                                            <EyeOff />
                                        ) :
                                        (
                                            <Eye />
                                        )
                                }
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    )
}

export default PasswordInput
