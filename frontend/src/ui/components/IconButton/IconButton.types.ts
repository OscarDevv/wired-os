import type { MouseEventHandler, ReactNode } from "react"

export type IconButtonVariant = "solid" | "outline" | "subtle" | "ghost"

export type IconButtonSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

export interface IconButtonProps {
  label: string
  variant?: IconButtonVariant
  size?: IconButtonSize
  colorPalette?: string
  disabled?: boolean
  loading?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
}
