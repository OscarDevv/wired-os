import type { ReactNode } from "react"

export type HeadingSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"

export type HeadingVariant = "solid" | "muted" | "underline"

export interface HeadingProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  size?: HeadingSize
  variant?: HeadingVariant
  colorPalette?: string
  children: ReactNode
}
