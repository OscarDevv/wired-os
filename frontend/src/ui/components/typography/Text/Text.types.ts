import type { HTMLAttributes, ReactNode } from "react"

type TextAs = "p" | "span" | "div"
type TextVariants = "default" | "terminal" | "terminal-subtle"
type TextColors = "default" | "inherit" | "success" | "error" | "warning"
type TextSizes = "xs" | "sm" | "md" | "lg" | "xl"

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextAs
  variant?: TextVariants
  color?: TextColors
  size?: TextSizes
  children: ReactNode
}
