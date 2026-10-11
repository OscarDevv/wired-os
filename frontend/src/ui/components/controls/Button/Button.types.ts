import type { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonVariants = "default" | "outline"
type ButtonSizes = "xs" | "sm" | "md" | "lg" | "xl"
type ButtonColors = "default" | "warning" | "error" | "success" | "inherit"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants
  size?: ButtonSizes
  color?: ButtonColors
  children: ReactNode
}
