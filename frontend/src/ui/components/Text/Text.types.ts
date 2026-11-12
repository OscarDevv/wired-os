import type { ReactNode } from "react"

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

export type TextVariant = "solid" | "muted" | "mono"

export interface TextProps {
  size?: TextSize
  variant?: TextVariant
  colorPalette?: string
  truncate?: boolean
  children: ReactNode
}
