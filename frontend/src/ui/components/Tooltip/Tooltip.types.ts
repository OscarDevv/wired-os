import type { TooltipRootProps as ChakraTooltipRootProps } from "@chakra-ui/react/tooltip"
import type { ReactNode } from "react"

export type TooltipPlacement = NonNullable<
  ChakraTooltipRootProps["positioning"]
>["placement"]

export type TooltipSize = "sm" | "md" | "lg"

export type TooltipPalette =
  | "primary"
  | "neutral"
  | "success"
  | "warning"
  | "error"
  | "info"

export type TooltipOpenOn = "hover" | "click"

export interface TooltipPaletteStyles {
  bg: string
  color: string
  darkBg: string
  darkColor: string
}

export interface TooltipProps extends ChakraTooltipRootProps {
  content?: ReactNode
  placement?: TooltipPlacement
  size?: TooltipSize
  palette?: TooltipPalette
  openOn?: TooltipOpenOn
}
