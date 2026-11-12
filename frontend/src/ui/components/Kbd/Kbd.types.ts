import type { KbdProps as ChakraKbdProps } from "@chakra-ui/react/kbd"

export type KbdPalette = "primary" | "neutral" | "success" | "warning" | "error" | "info"

export interface KbdPaletteStyles {
  solidBg: string
  outlinedColor: string
  outlinedBorder: string
}

export interface KbdProps extends Omit<ChakraKbdProps, "variant"> {
  variant?: "solid" | "outlined"
  palette?: KbdPalette
}
