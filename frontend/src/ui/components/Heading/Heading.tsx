import { Heading as ChakraHeading } from "@chakra-ui/react/heading"
import type { HeadingProps, HeadingVariant } from "./Heading.types.ts"

const VARIANT_STYLES: Record<HeadingVariant, object> = {
  solid: { color: "white" },
  muted: { color: "whiteAlpha.700" },
  underline: {
    color: "white",
    textDecoration: "underline",
    textDecorationColor: "whiteAlpha.400",
  },
}

export function Heading({
  as = "h2",
  size = "xl",
  variant = "solid",
  colorPalette,
  children,
}: HeadingProps) {
  return (
    <ChakraHeading
      as={as}
      size={size}
      colorPalette={colorPalette}
      {...(colorPalette ? {} : VARIANT_STYLES[variant])}
    >
      {children}
    </ChakraHeading>
  )
}
