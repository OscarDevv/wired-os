import { Input as ChakraInput } from "@chakra-ui/react/input"
import { Field } from "@chakra-ui/react/field"
import type { InputProps } from "./Input.types.ts"

export function Input({
  label,
  helperText,
  errorText,
  invalid = false,
  disabled = false,
  size = "md",
  variant = "outline",
  ...rest
}: InputProps) {
  return (
    <Field.Root invalid={invalid} disabled={disabled}>
      {label && <Field.Label>{label}</Field.Label>}

      <ChakraInput size={size} variant={variant} {...rest} />

      {helperText && !invalid && <Field.HelperText>{helperText}</Field.HelperText>}
      {errorText && invalid && <Field.ErrorText>{errorText}</Field.ErrorText>}
    </Field.Root>
  )
}
