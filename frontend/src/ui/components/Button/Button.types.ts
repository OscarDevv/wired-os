import type { MouseEventHandler, ReactNode } from "react"

export type ButtonVariant = "solid" | "outline" | "subtle" | "ghost"

export type ButtonSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  colorPalette?: string
  disabled?: boolean
  loading?: boolean
  loadingText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  type?: "button" | "submit" | "reset"
  onClick?: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
}
