import { Tooltip as ChakraTooltip } from "@chakra-ui/react/tooltip"
import { useState } from "react"
import type {
  TooltipPalette,
  TooltipPaletteStyles,
  TooltipProps,
  TooltipSize,
} from "./Tooltip.types.ts"

const tooltipPalettes: Record<TooltipPalette, TooltipPaletteStyles> = {
  primary: {
    bg: "{colors.primary.700}",
    color: "white",
    darkBg: "{colors.primary.300}",
    darkColor: "{colors.neutral.900}",
  },
  neutral: {
    bg: "{colors.neutral.700}",
    color: "white",
    darkBg: "{colors.neutral.300}",
    darkColor: "{colors.neutral.900}",
  },
  success: {
    bg: "{colors.success.700}",
    color: "white",
    darkBg: "{colors.success.300}",
    darkColor: "{colors.neutral.900}",
  },
  warning: {
    bg: "{colors.warning.700}",
    color: "white",
    darkBg: "{colors.warning.300}",
    darkColor: "{colors.neutral.900}",
  },
  error: {
    bg: "{colors.error.700}",
    color: "white",
    darkBg: "{colors.error.300}",
    darkColor: "{colors.neutral.900}",
  },
  info: {
    bg: "{colors.info.700}",
    color: "white",
    darkBg: "{colors.info.300}",
    darkColor: "{colors.neutral.900}",
  },
}

const tooltipSizes: Record<TooltipSize, { fontSize: string; px: string; py: string }> = {
  sm: { fontSize: "xs", px: "2", py: "1" },
  md: { fontSize: "sm", px: "3", py: "2" },
  lg: { fontSize: "md", px: "4", py: "2" },
}

export function Tooltip({
  content,
  placement = "top",
  size = "sm",
  palette = "neutral",
  openOn = "hover",
  positioning,
  open,
  onOpenChange,
  children,
  ...rest
}: TooltipProps) {
  const [openState, setOpenState] = useState(false)
  const click = openOn === "click"
  const sizeStyle = tooltipSizes[size]
  const paletteStyle = tooltipPalettes[palette]

  return (
    <ChakraTooltip.Root
      {...rest}
      positioning={positioning ?? { placement }}
      open={click ? openState : open}
      onOpenChange={(details) => {
        if (click && !details.open) {
          setOpenState(false)
        }
        onOpenChange?.(details)
      }}
    >
      <ChakraTooltip.Trigger
        asChild
        onClick={click ? () => setOpenState((value) => !value) : undefined}
      >
        {children}
      </ChakraTooltip.Trigger>
      <ChakraTooltip.Positioner>
        <ChakraTooltip.Content
          bg={paletteStyle.bg}
          color={paletteStyle.color}
          _dark={{ bg: paletteStyle.darkBg, color: paletteStyle.darkColor }}
          fontSize={sizeStyle.fontSize}
          px={sizeStyle.px}
          py={sizeStyle.py}
        >
          {content}
        </ChakraTooltip.Content>
      </ChakraTooltip.Positioner>
    </ChakraTooltip.Root>
  )
}
