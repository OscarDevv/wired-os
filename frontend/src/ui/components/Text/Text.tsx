import { Text as ChakraText } from "@chakra-ui/react/text"
import type { TextProps, TextSize, TextVariant } from "./Text.types.ts"

const SIZE_STYLES: Record<TextSize, { textStyle: string }> = {
  xs: { textStyle: "xs" },
  sm: { textStyle: "sm" },
  md: { textStyle: "md" },
  lg: { textStyle: "lg" },
  xl: { textStyle: "xl" },
  "2xl": { textStyle: "2xl" },
}

const VARIANT_STYLES: Record<TextVariant, object> = {
  solid: { color: "white" },
  muted: { color: "whiteAlpha.600" },
  mono: { color: "white", fontFamily: "pMono" },
}

export function Text({
  size = "md",
  variant = "solid",
  colorPalette,
  truncate,
  children,
}: TextProps) {
  return (
    <ChakraText
      textStyle={SIZE_STYLES[size].textStyle}
      colorPalette={colorPalette}
      truncate={truncate}
      {...(colorPalette ? {} : VARIANT_STYLES[variant])}
    >
      {children}
    </ChakraText>
  )
}
