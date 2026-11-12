import { Tabs as ChakraTabs } from "@chakra-ui/react/tabs"
import type { TabsProps, TabsVariant } from "./Tabs.types.ts"

function toRecipeVariant(variant: TabsVariant) {
  return variant === "pill" ? "enclosed" : variant
}

export function Tabs({
  items,
  defaultValue,
  variant = "pill",
  align = "start",
  size = "md",
  colorPalette,
  onValueChange,
}: TabsProps) {
  return (
    <ChakraTabs.Root
      variant={toRecipeVariant(variant)}
      justify={align}
      size={size}
      colorPalette={colorPalette}
      defaultValue={defaultValue ?? items[0]?.value}
      onValueChange={(details) => onValueChange?.(details.value)}
    >
      <ChakraTabs.List>
        {items.map((item) => (
          <ChakraTabs.Trigger
            key={item.value}
            value={item.value}
            rounded={variant === "pill" ? "full" : undefined}
            px={variant === "pill" ? "4" : undefined}
          >
            {item.label}
          </ChakraTabs.Trigger>
        ))}
      </ChakraTabs.List>

      {items.map((item) => (
        <ChakraTabs.Content key={item.value} value={item.value}>
          {item.content}
        </ChakraTabs.Content>
      ))}
    </ChakraTabs.Root>
  )
}
