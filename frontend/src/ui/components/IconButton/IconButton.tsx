import { IconButton as ChakraIconButton } from "@chakra-ui/react/button"
import type { IconButtonProps } from "./IconButton.types.ts"

export function IconButton({
  label,
  variant = "solid",
  size = "md",
  colorPalette = "primary",
  disabled,
  loading,
  onClick,
  children,
}: IconButtonProps) {
  return (
    <ChakraIconButton
      aria-label={label}
      variant={variant}
      size={size}
      colorPalette={colorPalette}
      disabled={disabled}
      loading={loading}
      onClick={onClick}
    >
      {children}
    </ChakraIconButton>
  )
}
