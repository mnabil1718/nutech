import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'
import { Field, FieldError } from '@/components/ui/field'
import type { ReactNode } from 'react'
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group'

interface TextInputProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    placeholder?: string
    icon?: ReactNode
    type?: string
    id?: string
}

const TextInput = <T extends FieldValues>({
    name,
    control,
    placeholder,
    icon,
    type = 'text',
    id,
}: TextInputProps<T>) => {
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
                            type={type}
                            placeholder={placeholder}
                            aria-invalid={fieldState.invalid}
                        />
                        {icon && <InputGroupAddon>{icon}</InputGroupAddon>}
                    </InputGroup>
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    )
}

export default TextInput
