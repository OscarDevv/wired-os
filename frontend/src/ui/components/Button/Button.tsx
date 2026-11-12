import { Button as ChakraButton } from "@chakra-ui/react/button"
import type { ButtonProps } from "./Button.types.ts"

export function Button({
  variant = "solid",
  size = "md",
  colorPalette = "primary",
  disabled,
  loading,
  loadingText,
  leftIcon,
  rightIcon,
  type = "button",
  onClick,
  children,
}: ButtonProps) {
  return (
    <ChakraButton
      type={type}
      variant={variant}
      size={size}
      colorPalette={colorPalette}
      disabled={disabled}
      loading={loading}
      loadingText={loadingText}
      onClick={onClick}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </ChakraButton>
  )
}
