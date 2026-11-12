import { Kbd as ChakraKbd } from "@chakra-ui/react/kbd"

import type { KbdPalette, KbdPaletteStyles, KbdProps } from "./Kbd.types.ts"

const palettes: Record<KbdPalette, KbdPaletteStyles> = {
  primary: {
    solidBg: "{colors.primary.700}",
    outlinedColor: "{colors.primary.300}",
    outlinedBorder: "{colors.primary.600}",
  },
  neutral: {
    solidBg: "{colors.neutral.700}",
    outlinedColor: "{colors.neutral.300}",
    outlinedBorder: "{colors.neutral.600}",
  },
  success: {
    solidBg: "{colors.success.700}",
    outlinedColor: "{colors.success.300}",
    outlinedBorder: "{colors.success.600}",
  },
  warning: {
    solidBg: "{colors.warning.700}",
    outlinedColor: "{colors.warning.300}",
    outlinedBorder: "{colors.warning.600}",
  },
  error: {
    solidBg: "{colors.error.700}",
    outlinedColor: "{colors.error.300}",
    outlinedBorder: "{colors.error.600}",
  },
  info: {
    solidBg: "{colors.info.700}",
    outlinedColor: "{colors.info.300}",
    outlinedBorder: "{colors.info.600}",
  },
}

export function Kbd({ variant = "solid", palette = "neutral", children, ...rest }: KbdProps) {
  const colors = palettes[palette]

  const variantStyle =
    variant === "solid"
      ? { bg: colors.solidBg, color: "white" }
      : {
          bg: "transparent",
          color: colors.outlinedColor,
          borderWidth: "1px",
          borderColor: colors.outlinedBorder,
        }

  return (
    <ChakraKbd variant="plain" {...variantStyle} {...rest}>
      {children}
    </ChakraKbd>
  )
}
