import type { InputHTMLAttributes } from "react"

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "disabled"
> {
  label?: string
  helperText?: string
  errorText?: string
  invalid?: boolean
  disabled?: boolean
  size?: "xs" | "sm" | "md" | "lg"
  variant?: "outline" | "subtle" | "flushed"
}
